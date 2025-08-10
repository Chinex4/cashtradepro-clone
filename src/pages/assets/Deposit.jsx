import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Copy, ChevronRight, Search, Info } from "lucide-react";
import { showSuccess, showPromise } from "../../utils/toast";
import DepositConfirmModal from "../../components/ui/modals/DepositConfirmModal";
import FAQ from "../../components/FAQ";
import api from "../../api/axiosInstance";
import useCoinUsdValue from "../../hooks/useCoinPrice"; // <-- pricing hook

// ---------- helpers ----------
const toArray = (val) => {
  if (val == null) return [];
  if (Array.isArray(val)) return val;
  try {
    const parsed = typeof val === "string" ? JSON.parse(val) : val;
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    return [val];
  }
};
const byIndex = (maybeArr, idx) => {
  const arr = toArray(maybeArr);
  if (!arr.length) return "";
  const i = Math.min(Math.max(idx ?? 0, 0), arr.length - 1);
  return arr[i];
};
const mask = (s) => {
  if (!s) return "—";
  if (s.length <= 8) return "****";
  return `${s.slice(0, 4)}****${s.slice(-4)}`;
};

export default function Deposit() {
  const [searchParams] = useSearchParams();

  // Backend list (used for coin dropdown)
  const [coins, setCoins] = useState([]); // each row from API
  // Fast lookup keyed by SYMBOL (uppercase)
  const [walletMap, setWalletMap] = useState({}); // { [SYM]: { image,name,networks,addresses,mins,confs,contracts } }

  // UI selection
  const [selectedCoin, setSelectedCoin] = useState(null); // a row from backend
  const [selectedNetworkIdx, setSelectedNetworkIdx] = useState(null);

  // Dropdown states
  const [coinOpen, setCoinOpen] = useState(false);
  const [coinSearch, setCoinSearch] = useState("");
  const [netOpen, setNetOpen] = useState(false);
  const [netSearch, setNetSearch] = useState("");

  // Popular chips (fixed)
  const popular = ["TETHER", "BITCOIN", "ETHEREUM"];

  // Copy modal
  const [showModal, setShowModal] = useState(false);

  // “Deposit to” UI
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [depositAccount, setDepositAccount] = useState("Spot Account"); // or 'Futures Account'
  const [depositInfoOpen, setDepositInfoOpen] = useState(false);
  const accountMenuRef = useRef(null);

  // ===== NEW: Amount inputs + price hook =====
  const [amountUsd, setAmountUsd] = useState(""); // user enters USD
  const [amountCoin, setAmountCoin] = useState(""); // computed coin

  // ===== Fetch all from backend once =====
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/user/getCoins");
        const rows = res?.data?.message?.userDetails || [];

        setCoins(rows);

        const map = {};
        for (const r of rows) {
          const sym = (r.coin_id || "").toString().trim().toUpperCase();
          if (!sym) continue;

          map[sym] = {
            image: r.img_link || "",
            name: r.name || sym,
            networks: toArray(r.network).map(String), // e.g. ["Tron (TRC-20)", "Ethereum (ERC-20)"]
            addresses: toArray(r.deposit_address), // e.g. ["TSVt1X...", "0x..."]
            mins: toArray(r.min_deposit), // e.g. ["50", "50"] or numbers
            confs: toArray(r.confirmations_required), // e.g. ["1","12"]
            contracts: toArray(r.contract_address), // e.g. ["TXYZ...","0x..."]
            symbol: sym,
          };
        }
        setWalletMap(map);
      } catch (e) {
        console.error("/user/getCoins failed", e);
      }
    })();
  }, []);

  // ===== Autoselect via ?symbol= =====
  useEffect(() => {
    const symbol = searchParams.get("symbol");
    if (!symbol || !coins.length) return;
    const symUp = symbol.toUpperCase();
    const row = coins.find(
      (c) => (c.symbol || c.coin_id || "").toUpperCase() === symUp
    );
    if (row) {
      setSelectedCoin(row);
      setSelectedNetworkIdx(null); // force choose network
      setCoinOpen(false);
      setNetOpen(false);
    }
  }, [coins, searchParams]);

  // ========= derived data =========
  const filteredCoins = useMemo(() => {
    const term = coinSearch.trim().toLowerCase();
    if (!term) return coins;
    return coins.filter((c) => {
      const sym = (c.symbol || c.coin_id || "").toLowerCase();
      const nm = (c.name || "").toLowerCase();
      return sym.includes(term) || nm.includes(term);
    });
  }, [coins, coinSearch]);

  const symUpper = (selectedCoin?.coin_id || "").toUpperCase();
  const wallet = symUpper ? walletMap[symUpper] : null;

  // RENAMED to avoid collisions
  const coinNetworks = wallet?.networks || [];

  const hasChosenNetwork =
    selectedCoin &&
    coinNetworks.length > 0 &&
    selectedNetworkIdx !== null &&
    selectedNetworkIdx >= 0 &&
    selectedNetworkIdx < coinNetworks.length;

  // Values by network index
  const address = hasChosenNetwork
    ? byIndex(wallet?.addresses, selectedNetworkIdx)
    : "";
  const minRaw = hasChosenNetwork
    ? byIndex(wallet?.mins, selectedNetworkIdx)
    : "";
  const confRaw = hasChosenNetwork
    ? byIndex(wallet?.confs, selectedNetworkIdx)
    : "";
  const contractRaw = hasChosenNetwork
    ? byIndex(wallet?.contracts, selectedNetworkIdx)
    : "";

  // Display strings
  const symbolRight = symUpper || "";
  const minDisplay =
    minRaw !== "" && minRaw !== null && minRaw !== undefined
      ? `${minRaw} ${symbolRight}`
      : "—";
  const confDisplay =
    confRaw !== "" && confRaw !== null && confRaw !== undefined
      ? `${confRaw} block confirmations`
      : "—";
  const contractDisplay = contractRaw ? mask(contractRaw) : "—";

  const coinImg = wallet?.image || ""; // prefer backend image only

  // ========= handlers =========
  const pickCoin = (row) => {
    setSelectedCoin(row);
    setSelectedNetworkIdx(null);
    setCoinOpen(false);
    setNetOpen(false);
  };

  const handlePopularPick = (SYMBOL) => {
    const row = coins.find((c) => (c.coin_id || "").toUpperCase() === SYMBOL);
    if (row) pickCoin(row);
  };

  const handleCopy = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    showSuccess("Copied");
    setShowModal(true);
  };

  // RENAMED to avoid duplicate identifier error
  const filteredCoinNetworks = useMemo(() => {
    const term = netSearch.trim().toLowerCase();
    if (!term) return coinNetworks;
    return coinNetworks.filter((n) => n.toLowerCase().includes(term));
  }, [coinNetworks, netSearch]);

  const canShowDetails = Boolean(selectedCoin) && hasChosenNetwork;

  // Nice UX: auto-select the only network; clear when none
  useEffect(() => {
    if (coinNetworks.length === 1) setSelectedNetworkIdx(0);
    if (coinNetworks.length === 0) setSelectedNetworkIdx(null);
  }, [coinNetworks.length]);

  // Label for the button per your rules
  const networkLabel =
    coinNetworks.length === 0
      ? "No network for this coin"
      : selectedNetworkIdx === null
      ? coinNetworks.length > 1
        ? "Select network"
        : coinNetworks[0]
      : coinNetworks[selectedNetworkIdx] ??
        (coinNetworks.length > 1 ? "Select network" : coinNetworks[0]);

  // ===== pricing hook (USD -> coin amount) =====
  const {
    usdValue: coinEquivalent,
    price,
    loading: priceLoading,
  } = useCoinUsdValue(symUpper, amountUsd);

  useEffect(() => {
    if (
      coinEquivalent != null &&
      coinEquivalent !== undefined &&
      coinEquivalent !== "NaN"
    ) {
      setAmountCoin(coinEquivalent);
    } else {
      setAmountCoin("");
    }
  }, [coinEquivalent]);
  const createdAt = new Date().toLocaleString("en-US", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  // ===== form submit with showPromise =====
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canShowDetails) return;
    if (!(Number(amountUsd) > 0) || !(Number(amountCoin) > 0)) return;

    const payload = {
      symbol: symUpper,
      network: wallet.networks[selectedNetworkIdx],
      address,
      amount_usd: Number(amountUsd),
      coin_amount: Number(amountCoin),
      account: depositAccount,
      price_usd: price ?? null,
      createdAt,
    };

    const req = api.post("/user/deposit", payload);
    await showPromise(req, {
      loading: "Creating deposit…",
      success: "Deposit created",
      error: "Failed to create deposit",
    });
  };

  // Close account menu on outside click
  useEffect(() => {
    function onClick(event) {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setAccountMenuOpen(false);
      }
    }
    if (accountMenuOpen) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [accountMenuOpen]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:mt-8 text-white grid grid-cols-1 md:grid-cols-12 gap-3">
      <form onSubmit={onSubmit} className="col-span-1 md:col-span-8 order-1">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
          Deposit Cryptos
        </h2>
        {/* ====================== 1) SELECT COIN — ALWAYS AT THE TOP ====================== */}
        <div className="mb-4">
          <label className="block text-sm mb-2">Select coin</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setCoinOpen((v) => !v)}
              className="w-full bg-[#161616] border border-gray-800 rounded-2xl px-4 py-4 flex items-center justify-between hover:border-gray-700 focus:outline-none"
              style={{
                boxShadow: coinOpen ? "0 0 0 2pxlime-400inset" : undefined,
              }}
            >
              <div className="flex items-center gap-3">
                {selectedCoin ? (
                  <>
                    {coinImg ? (
                      <img
                        src={coinImg}
                        alt=""
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-700" />
                    )}
                    <div className="text-left">
                      <div className="font-semibold">
                        {(
                          selectedCoin.symbol ||
                          selectedCoin.coin_id ||
                          ""
                        ).toUpperCase()}{" "}
                        <span className="text-gray-400">
                          {selectedCoin.name || ""}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <span className="text-gray-400">Select coin</span>
                )}
              </div>

              <ChevronRight
                className={`w-4 h-4 transition ${coinOpen ? "rotate-90" : ""}`}
              />
            </button>

            {coinOpen && (
              <div className="absolute z-30 mt-2 w-full max-h-96 overflow-auto rounded-2xl border border-gray-800 bg-[#0b0b0b] shadow-xl">
                <div className="flex items-center gap-2 p-3 border-b border-gray-800">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    value={coinSearch}
                    onChange={(e) => setCoinSearch(e.target.value)}
                    placeholder="Search coin..."
                    className="w-full bg-transparent outline-none text-sm placeholder-gray-500"
                  />
                </div>
                <ul className="py-1">
                  {filteredCoins.map((row, i) => {
                    const sym = (row.coin_id || "").toUpperCase();
                    const img = walletMap[sym]?.image || "";
                    const active =
                      (selectedCoin?.coin_id || "") === (row.coin_id || "");
                    return (
                      <li
                        key={`${sym}-${i}`}
                        onClick={() => pickCoin(row)}
                        className={`px-4 py-3 cursor-pointer flex items-center gap-3 hover:bg-black ${
                          active ? "bg-black/60" : ""
                        }`}
                      >
                        {img ? (
                          <img
                            src={img}
                            alt=""
                            className="w-5 h-5 rounded-full"
                          />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-gray-700" />
                        )}
                        <span className="text-sm">
                          <span className="font-semibold">{sym}</span>{" "}
                          {/* <span className='text-gray-400'>{row.name || ''}</span> */}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          {/* Popular chips */}
          <div className="flex gap-2 flex-wrap mt-3">
            {popular.map((SYMBOL) => {
              const row = coins.find(
                (c) => (c.coin_id || "").toUpperCase() === SYMBOL
              );
              if (!row) return null;
              const img = row?.img_link || "";

              const active =
                (selectedCoin?.coin_id || "").toUpperCase() === SYMBOL;
              return (
                <button
                  key={SYMBOL}
                  type="button"
                  onClick={() => handlePopularPick(SYMBOL)}
                  className={`px-3 py-1 rounded-xl bg-[#161616] border text-sm ${
                    active
                      ? "border-lime-400 text-lime-400"
                      : "border-transparent text-white"
                  } flex items-center gap-2 hover:border-gray-700`}
                >
                  {img ? (
                    <img src={img} alt="" className="w-4 h-4 rounded-full" />
                  ) : (
                    <div className="w-4 h-4 bg-gray-700 rounded-full" />
                  )}
                  {SYMBOL}
                </button>
              );
            })}
          </div>
        </div>

        {/* ====================== 2) SELECT NETWORK — only after a coin is chosen ====================== */}
        {selectedCoin && wallet?.networks?.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm mb-2">Select network</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setNetOpen((v) => !v)}
                className="w-full bg-[#161616] border border-gray-800 rounded-2xl px-4 py-4 flex items-center justify-between hover:border-gray-700 focus:outline-none"
                style={{
                  boxShadow: netOpen ? "0 0 0 2pxlime-400inset" : undefined,
                }}
              >
                <div className="text-left text-sm">{networkLabel}</div>

                <ChevronRight
                  className={`w-4 h-4 transition ${netOpen ? "rotate-90" : ""}`}
                />
              </button>

              {netOpen && (
                <div className="absolute z-30 mt-2 w-full max-h-96 overflow-auto rounded-2xl border border-gray-800 bg-[#0b0b0b] shadow-xl">
                  <div className="flex items-center gap-2 p-3 border-b border-gray-800">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                      value={netSearch}
                      onChange={(e) => setNetSearch(e.target.value)}
                      placeholder="Search network..."
                      className="w-full bg-transparent outline-none text-sm placeholder-gray-500"
                    />
                  </div>
                  <ul className="py-1">
                    {filteredCoinNetworks.map((label) => {
                      const idx = coinNetworks.findIndex((n) => n === label);
                      const active = idx === selectedNetworkIdx;

                      return (
                        <li
                          key={label}
                          onClick={() => {
                            setSelectedNetworkIdx(idx >= 0 ? idx : 0);
                            setNetOpen(false);
                          }}
                          className={`px-4 py-3 cursor-pointer hover:bg-black ${
                            active ? "bg-black/60" : ""
                          }`}
                        >
                          {label}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ====================== 3) AMOUNT — only after a coin is chosen ====================== */}
        {selectedCoin && (
          <div className="mb-6 grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm mb-2">Amount (USD)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                value={amountUsd}
                onChange={(e) => setAmountUsd(e.target.value)}
                placeholder="0.00"
                className="w-full bg-[#161616] border border-gray-800 rounded-2xl px-4 py-3 focus:outline-none focus:ring-0"
              />
              {/* unit price helper */}
              {/* {price && symUpper && (
               <div className='text-xs text-gray-400 mt-1'>
                 1 {symUpper} ≈ $
                 {Number(price).toLocaleString(undefined, {
                   maximumFractionDigits: 6,
                 })}
               </div>
             )} */}
            </div>

            <div>
              <label className="block text-sm mb-2">
                Amount ({symUpper || "COIN"})
              </label>
              <input
                type="number"
                min="0"
                step="0.000001"
                inputMode="decimal"
                value={amountCoin}
                readOnly
                title="Calculated from USD"
                placeholder={priceLoading ? "Calculating…" : "0.000000"}
                className="w-full bg-[#161616] border border-gray-800 rounded-2xl px-4 py-3 focus:outline-none focus:ring-0 opacity-90 cursor-not-allowed"
              />
            </div>
          </div>
        )}

        {/* ====================== Guidance while hidden ====================== */}
        {!canShowDetails && (
          <div className="text-white/60 text-sm mt-2 mb-6">
            {selectedCoin
              ? wallet?.networks?.length
                ? selectedNetworkIdx === null
                  ? "Select a network to view deposit details."
                  : ""
                : "No networks available for this coin yet."
              : "Select a coin to continue."}
          </div>
        )}

        {/* ====================== 4) DETAILS — coin + network picked ====================== */}
        {canShowDetails && (
          <>
            <div className="text-sm text-gray-300 mb-2">Details</div>

            {/* Details card */}
            <div className="bg-[#161616] border border-gray-800 rounded-2xl p-4 md:p-5 mb-4">
              <div className="flex items-start gap-4">
                {/* QR via QuickChart (rounded) */}
                <div className="p-2 bg-black/60 rounded-xl">
                  <img
                    src={`https://quickchart.io/qr?text=${encodeURIComponent(
                      address || ""
                    )}`}
                    alt="QR"
                    className="w-[84px] h-[84px] object-contain rounded-lg"
                  />
                </div>

                {/* Address */}
                <div className="flex-1 min-w-0">
                  <div className="text-gray-400 text-sm">Deposit address</div>
                  <div className="text-white text-base font-semibold break-all mt-1">
                    {address}
                  </div>
                </div>

                {/* Copy - outlined pill */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm border border-gray-700 hover:bg-black"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/10 my-4" />

              {/* Deposit to row */}
              <div className="flex items-center justify-between">
                <div className="relative flex items-center gap-2">
                  <span className="text-gray-300 text-sm">Deposit to</span>
                  {/* Info icon tooltip */}
                  <div
                    className="relative"
                    onMouseEnter={() => setDepositInfoOpen(true)}
                    onMouseLeave={() => setDepositInfoOpen(false)}
                  >
                    <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1b1b1b] border border-gray-700 cursor-default">
                      <Info className="w-3.5 h-3.5 text-gray-400" />
                    </div>

                    {depositInfoOpen && (
                      <div className="absolute z-40 mt-2 w-[360px] rounded-lg bg-[#2a2a2a] text-white text-sm p-4 shadow-xl border border-black/20">
                        Funds will be automatically transferred to your selected
                        account after deposit.
                      </div>
                    )}
                  </div>
                </div>

                {/* Account dropdown trigger */}
                <div className="relative" ref={accountMenuRef}>
                  <button
                    type="button"
                    onClick={() => setAccountMenuOpen((v) => !v)}
                    className="inline-flex items-center gap-2 text-sm"
                  >
                    {depositAccount}{" "}
                    <ChevronRight
                      className={`w-4 h-4 ${
                        accountMenuOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {/* Account dropdown panel */}
                  {accountMenuOpen && (
                    <div className="absolute right-0 top-8 z-40 w-[320px] rounded-2xl bg-[#0f0f0f] border border-gray-800 shadow-2xl p-3">
                      {/* Spot */}
                      <div
                        onClick={() => {
                          setDepositAccount("Spot Account");
                          setAccountMenuOpen(false);
                        }}
                        className="cursor-pointer rounded-xl p-3 hover:bg-black/40"
                      >
                        <div
                          className={`${
                            depositAccount.includes("Spot") && "text-lime-400"
                          } font-semibold`}
                        >
                          Spot Account
                        </div>
                        <div className="text-gray-300 text-sm mt-1">
                          As the default account, it can be used for spot
                          trading, withdrawal, etc.
                        </div>
                        <div className="h-px bg-white/10 my-3" />
                      </div>

                      {/* Futures */}
                      <div
                        onClick={() => {
                          setDepositAccount("Futures Account");
                          setAccountMenuOpen(false);
                        }}
                        className="cursor-pointer rounded-xl p-3 hover:bg-black/40"
                      >
                        <div
                          className={`${
                            depositAccount.includes("Futures") &&
                            "text-lime-400"
                          } font-semibold`}
                        >
                          Futures Account
                        </div>
                        <div className="text-gray-300 text-sm mt-1">
                          Funds can be used for USDT-M Futures trading.
                        </div>
                      </div>

                      <div className="text-[13px] text-[#f59e0b] mt-3 px-3 pb-1">
                        Assets can be transferred between accounts at zero cost
                        at any time.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Info card (labels left, values right) */}
            <div className="bg-[#161616] border border-gray-800 rounded-2xl p-4 md:p-5">
              <div className="space-y-4">
                {/* Row 1: Min deposit */}
                <div className="flex items-center justify-between">
                  <div className="text-gray-300 text-[15px]">Min. deposit</div>
                  <div className="text-white text-[15px] font-medium">
                    {minDisplay}
                  </div>
                </div>

                {/* Row 2: Confirmations */}
                <div className="flex items-center justify-between">
                  <div className="text-gray-300 text-[15px]">
                    Deposit confirmations
                  </div>
                  <div className="text-white text-[15px] font-medium">
                    {confDisplay}
                  </div>
                </div>

                {/* Row 3: Contract Address — commented out per request */}
                {/*
               <div className='flex items-center justify-between'>
                 <div className='text-gray-300 text-[15px] flex items-center gap-1'>
                   Contract Address <Info className='w-4 h-4 text-gray-500' />
                 </div>
                 <div className='text-white text-[15px] font-medium'>
                   {contractDisplay}
                 </div>
               </div>
               */}
              </div>
            </div>

            {/* Submit */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={
                  !canShowDetails ||
                  !(Number(amountUsd) > 0) ||
                  !(Number(amountCoin) > 0)
                }
                className="w-full md:w-auto rounded-xl px-6 py-3 border border-lime-400 text-lime-400 hover:bg-lime-400/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Make deposit
              </button>
            </div>

            {/* Copy modal */}
            {showModal && (
              <DepositConfirmModal
                address={address}
                onClose={() => setShowModal(false)}
              />
            )}
          </>
        )}
      </form>

      <div className="mt-8 md:mt-0 col-span-1 md:col-span-4 order-2">
        <FAQ />
      </div>

      {/* ====================== Records + FAQ (unchanged) ====================== */}
      <div className="mt-10 col-span-1 md:col-span-12 md:col-start-1 md:row-start-2 order-3">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-lg font-semibold">Deposit records</h3>
          <button
            type="button"
            className="text-xs text-gray-400 flex items-center gap-1 hover:text-white transition"
          >
            More <ChevronRight size={14} />
          </button>
        </div>

        <div className="w-full overflow-x-auto rounded-md">
          <table className="w-full min-w-[700px] text-left">
            <thead className="text-xs text-gray-500 border-b border-gray-800">
              <tr>
                <th className="py-2 px-3">Time</th>
                <th className="py-2 px-3">Coin</th>
                <th className="py-2 px-3">Received amount</th>
                <th className="py-2 px-3">Type</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="6" className="text-center py-10">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <svg
                      className="w-10 h-10 mb-3 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 4h16v16H4z" />
                      <path d="M9 9h6M9 13h6M9 17h6" />
                    </svg>
                    <p className="text-sm">No Data</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
