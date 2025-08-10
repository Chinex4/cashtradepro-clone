import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronRight, IdCard } from "lucide-react";
import FAQ from "../../components/FAQ";
import { showSuccess } from "../../utils/toast";
import api from "../../api/axiosInstance";

// helpers
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
const upper = (s) => (s || "").toString().trim().toUpperCase();

const POPULAR = ["USDT", "BTC", "ETH", "PUMP.FUN"];

export default function Withdraw() {
  const [searchParams] = useSearchParams();

  // Tabs
  const [tab, setTab] = useState("onchain"); // "onchain" | "internal"

  // Backend list
  const [coins, setCoins] = useState([]); // rows from backend
  const [coinMap, setCoinMap] = useState({}); // {SYM: {image,name,networks,withdrawFees}}

  // Coin search dropdown (used on BOTH tabs)
  const [searchInput, setSearchInput] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [coinOpen, setCoinOpen] = useState(false);
  const coinBoxRef = useRef(null); // wraps input + dropdown

  // Networks for selected coin (on‑chain only)
  const [availableNetworks, setAvailableNetworks] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState(null);

  // Address + recipient picker
  const [withdrawalAddress, setWithdrawalAddress] = useState("");
  const [showRecipientDropdown, setShowRecipientDropdown] = useState(false);

  // Amount
  const [withdrawAmount, setWithdrawAmount] = useState("");

  // Recipient (show on BOTH tabs)
  const [recipientType, setRecipientType] = useState("email");
  const [recipientValue, setRecipientValue] = useState("");

  // ===== Fetch coins from backend =====
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/user/getCoins");
        const rows = res?.data?.message?.userDetails || [];
        setCoins(rows);

        const map = {};
        for (const r of rows) {
          const sym = upper(r.symbol || r.coin_id);
          if (!sym) continue;
          const image = r.img_link || "";
          const name = r.name || sym;
          const networks = toArray(r.network).map(String);
          const rawFees = toArray(r.withdraw_fee).length
            ? toArray(r.withdraw_fee)
            : toArray(r.withdrawal_fee).length
            ? toArray(r.withdrawal_fee)
            : toArray(r.network_fee);
          const withdrawFees = rawFees.map(String);

          map[sym] = {
            image,
            name,
            networks,
            withdrawFees,
            displaySymbol: sym,
          };
        }
        setCoinMap(map);
      } catch (e) {
        console.error("/user/getCoins failed", e);
      }
    })();
  }, []);

  // Preselect via ?symbol=
  useEffect(() => {
    const symbolQ = upper(searchParams.get("symbol"));
    if (!symbolQ || !coins.length) return;
    const row =
      coins.find((c) => upper(c.symbol) === symbolQ) ||
      coins.find((c) => upper(c.coin_id) === symbolQ);
    if (row) handleCoinSelect(row, { close: false });
  }, [coins, searchParams]);

  // Close dropdown on outside click or Esc
  useEffect(() => {
    const onDown = (e) => {
      if (e.key === "Escape") {
        setCoinOpen(false);
        return;
      }
      if (!coinOpen) return;
      if (coinBoxRef.current && !coinBoxRef.current.contains(e.target)) {
        setCoinOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onDown);
    };
  }, [coinOpen]);

  // Filtered list for the shared search dropdown
  const filteredCoins = useMemo(() => {
    const term = searchInput.trim().toLowerCase();
    if (!term) return coins;
    return coins.filter((c) => {
      const sym = (c.symbol || c.coin_id || "").toLowerCase();
      const nm = (c.name || "").toLowerCase();
      return sym.includes(term) || nm.includes(term);
    });
  }, [coins, searchInput]);

  // Coin selection handler
  const handleCoinSelect = (row, opts = { close: true }) => {
    setSelectedCoin(row);
    const sym = upper(row.symbol || row.coin_id);
    const m = coinMap[sym];

    const nets = m?.networks || [];
    setAvailableNetworks(nets);
    setSelectedNetwork(nets[0] || null);

    setSearchInput(m?.name || sym); // mirror choice in input
    if (opts.close) setCoinOpen(false); // close dropdown on select
  };

  // Popular helpers
  const findByPopularSymbol = (SYMBOL) =>
    coins.find(
      (c) =>
        upper(c.symbol) === upper(SYMBOL) || upper(c.coin_id) === upper(SYMBOL)
    );

  // Fees / received
  const symUpper = upper(selectedCoin?.symbol || selectedCoin?.coin_id);
  const currentIndex =
    availableNetworks.findIndex((n) => n === selectedNetwork) ?? -1;

  const feeTextFromBackend =
    currentIndex >= 0
      ? (coinMap[symUpper]?.withdrawFees?.[currentIndex] || "").trim() || "--"
      : "--";

  const networkFeeText = tab === "internal" ? "No fee" : feeTextFromBackend;

  const parsedFee = useMemo(() => {
    if (tab === "internal") return 0;
    const raw = feeTextFromBackend;
    if (!raw || raw === "--") return 0;
    const num = parseFloat(String(raw).split(" ")[0]);
    return isNaN(num) ? 0 : num;
  }, [feeTextFromBackend, tab]);

  const receivedAmount = useMemo(() => {
    const amt = parseFloat(withdrawAmount || "0");
    if (!(amt > 0)) return "--";
    if (tab === "internal") return amt.toString();
    const sameAsset =
      feeTextFromBackend &&
      symUpper &&
      feeTextFromBackend.toUpperCase().includes(symUpper);
    const net = sameAsset ? amt - parsedFee : amt;
    return +(net < 0 ? 0 : net).toFixed(8);
  }, [withdrawAmount, parsedFee, feeTextFromBackend, symUpper, tab]);

  // Disabled states
  const onchainDisabled =
    !selectedCoin || !selectedNetwork || !withdrawalAddress || !withdrawAmount;
  const internalDisabled =
    !selectedCoin || !recipientValue || !(parseFloat(withdrawAmount) > 0);
  const withdrawDisabled =
    tab === "onchain" ? onchainDisabled : internalDisabled;

  return (
    <>
      <div className=" gap-3 max-w-7xl mx-auto text-[11px] grid grid-cols-1 md:grid-cols-12">
        <div className="col-span-1 md:col-span-8 p-4 md:p-6 lg:p-8 text-white max-w-7xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
            Withdrawal
          </h2>

          {/* Tabs */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setTab("onchain")}
              className={`px-4 py-2 rounded ${
                tab === "onchain"
                  ? "bg-[#111] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              On-chain withdrawal
            </button>
            <button
              onClick={() => setTab("internal")}
              className={`px-4 py-2 rounded ${
                tab === "internal"
                  ? "bg-[#111] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Internal transfer
            </button>
          </div>

          {/* Coin (same search dropdown for BOTH tabs) */}
          <div className="mb-4 relative" ref={coinBoxRef}>
            <label className="text-sm mb-1 block">Coin</label>
            <div className="relative">
              <input
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setCoinOpen(true); // open as user types
                }}
                onFocus={() => setCoinOpen(true)}
                placeholder="Select coin"
                className="w-full bg-[#1A1A1A] border border-gray-700 px-3 py-2 rounded"
              />
              {coinOpen && filteredCoins.length > 0 && (
                <ul className="absolute z-10 bg-[#111] border border-gray-700 w-full mt-1 rounded max-h-60 overflow-auto">
                  {filteredCoins.map((row) => {
                    const sym = upper(row.symbol || row.coin_id);
                    const img = coinMap[sym]?.image || row.img_link || "";
                    const nm = row.name || sym;
                    return (
                      <li
                        key={sym}
                        onClick={() => handleCoinSelect(row, { close: true })}
                        className="px-3 py-2 hover:bg-black cursor-pointer flex items-center gap-2"
                      >
                        {img ? (
                          <img
                            src={img}
                            alt=""
                            className="w-5 h-5 rounded-full"
                          />
                        ) : (
                          <span className="w-5 h-5 rounded-full bg-gray-700 inline-block" />
                        )}
                        {nm} ({sym})
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* Popular chips */}
          <div className="flex gap-2 flex-wrap mb-6">
            {POPULAR.map((symbol) => {
              const row = findByPopularSymbol(symbol);
              if (!row) return null;

              const sym = upper(row.symbol || row.coin_id);
              const img = coinMap[sym]?.image || row.img_link || "";
              const active =
                upper(selectedCoin?.symbol || selectedCoin?.coin_id) === sym;

              return (
                <button
                  key={symbol}
                  onClick={() => handleCoinSelect(row, { close: true })}
                  className={`px-3 py-1 rounded bg-[#111] border text-sm ${
                    active
                      ? "border-lime-400 text-lime-400"
                      : "border-gray-700 text-gray-300"
                  } flex items-center gap-1`}
                >
                  {img ? (
                    <img src={img} className="w-4 h-4 rounded-full" />
                  ) : (
                    <span className="w-4 h-4 rounded-full bg-gray-700 inline-block" />
                  )}
                  {symbol}
                </button>
              );
            })}
          </div>

          {/* Network (ON‑CHAIN only) */}
          {tab === "onchain" && availableNetworks.length > 0 && (
            <div className="mb-4">
              <label className="text-sm block mb-1">Network</label>
              <select
                className="w-full bg-[#1A1A1A] border border-gray-700 px-3 py-2 rounded"
                value={selectedNetwork || ""}
                onChange={(e) => setSelectedNetwork(e.target.value)}
              >
                <option value="">Select network</option>
                {availableNetworks.map((net) => (
                  <option key={net} value={net}>
                    {net}
                  </option>
                ))}
              </select>
            </div>
          )}
          {/* Recipient (BOTH tabs) */}
          <div className="mb-1 flex gap-4">
            {["email", "mobile", "uid"].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setRecipientType(t);
                  setRecipientValue("");
                }}
                className={`px-3 py-1 rounded ${
                  recipientType === t
                    ? "bg-[#111] text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {t === "uid" ? "uid" : t[0].toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <div className="mb-4">
            <input
              className="w-full bg-[#1A1A1A] border border-gray-700 px-3 py-2 rounded"
              type={recipientType === "email" ? "email" : "text"}
              placeholder={
                recipientType === "email"
                  ? "Enter email address"
                  : recipientType === "mobile"
                  ? "Enter mobile number"
                  : "Enter uid"
              }
              value={recipientValue}
              onChange={(e) => setRecipientValue(e.target.value)}
            />
          </div>

          {/* Withdrawal address + recipient picker button */}
          <div className="mb-0">
            <label className="text-sm block mb-1">Withdrawal address</label>
            <div className="relative">
              <input
                className="w-full bg-[#1A1A1A] border border-gray-700 px-3 py-2 rounded pr-12"
                type="text"
                value={withdrawalAddress}
                placeholder="Enter withdrawal address"
                onChange={(e) => setWithdrawalAddress(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowRecipientDropdown((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 hover:bg-[#151515]"
                title="Select recipient"
              >
                <IdCard size={18} />
              </button>
            </div>
          </div>

          {showRecipientDropdown && (
            <div className="bg-[#0E0E0E] border border-gray-800 rounded mb-6 mt-3">
              <div className="px-4 py-3 text-lg font-semibold">
                Select recipient
              </div>
              <div className="px-4">
                <div className="bg-blue-900/60 text-blue-200 text-xs md:text-sm rounded px-3 py-3 mb-4">
                  Quick withdrawal disabled. Security verification required for
                  all withdrawals.{" "}
                  <button className="text-lime-400 underline underline-offset-2">
                    Enable
                  </button>
                </div>
              </div>
              <div className="px-4 pb-4">
                <button
                  type="button"
                  className="w-full bg-lime-400 text-black font-medium rounded py-3"
                  onClick={() => showSuccess("Add address")}
                >
                  Add address
                </button>
              </div>
            </div>
          )}

          {/* Amount */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <label className="text-sm block mb-1">Withdrawal amount</label>
              <button
                type="button"
                className="text-lime-400 text-xs"
                onClick={() => setWithdrawAmount("")}
              >
                All
              </button>
            </div>
            <input
              className="w-full bg-[#1A1A1A] border border-gray-700 px-3 py-2 rounded"
              type="number"
              placeholder={tab === "onchain" ? "Minimum: --" : "Minimum: 0"}
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />
          </div>

          {/* Info */}
          <div className="text-sm text-gray-300 mb-6 space-y-3">
            <p>
              Withdrawal available : <span className="text-white">--</span>
            </p>
            <p>
              24-hour withdrawal limit :{" "}
              <span className="text-lime-400">500,000.00/ 500,000 USDT</span>
            </p>
            <p>
              Received amount :{" "}
              <span className="text-lime-400">
                {receivedAmount} {symUpper || ""}
              </span>
            </p>
            <p>
              Network fee : <span className="text-white">{networkFeeText}</span>
            </p>
          </div>

          <button
            disabled={withdrawDisabled}
            onClick={() =>
              showSuccess(
                tab === "onchain"
                  ? "Withdrawal submitted"
                  : "Internal transfer submitted"
              )
            }
            className={`w-full border px-4 py-2 rounded transition-colors ${
              withdrawDisabled
                ? "border-gray-800 bg-[#0b0b0b] text-gray-600 cursor-not-allowed"
                : "border-gray-700 text-gray-300 hover:bg-black"
            }`}
          >
            Withdraw
          </button>
        </div>

        <div className="col-span-1 md:col-span-4">
			<FAQ />
		</div>
      </div>

      {/* Records (unchanged) */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-lg font-semibold">
            Withdrawal records
          </h3>
          <button className="text-xs text-gray-400 flex items-center gap-1 hover:text-white transition">
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
                <td colSpan={6} className="text-center py-10">
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
    </>
  );
}
