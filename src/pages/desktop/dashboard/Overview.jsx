import { useMemo, useState } from "react";
import DashboardShell from "../../../layout/DashboardShell";
import TVChart from "../../../components/dashboard/tradingview/TVChart";
import PairPicker from "../../../components/dashboard/PairPicker";

/* ---------- helpers ---------- */
function Panel({ className = "", children }) {
  return (
    <div
      className={`rounded-xl border border-zinc-800 bg-[#0F0F0F] p-3 sm:p-4 ${className}`}
    >
      {children}
    </div>
  );
}
function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-[#0F0F0F] p-4">
      <div className="text-[11px] uppercase tracking-wide text-zinc-400">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
      <div className="mt-3 h-1.5 w-28 rounded bg-lime-400/30">
        <div className="h-1.5 w-1/2 rounded bg-lime-400" />
      </div>
    </div>
  );
}
function TickerRow({ code, price, chgPct, chg, up = false }) {
  return (
    <div className="grid grid-cols-12 items-center border-b border-zinc-900/60 px-3 py-2 text-sm">
      <div className="col-span-5 flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-zinc-600" />
        <span className="text-zinc-200">{code}</span>
      </div>
      <div className="col-span-3 text-zinc-300">{price}</div>
      <div className={`col-span-2 ${up ? "text-emerald-400" : "text-red-400"}`}>
        {chgPct}
      </div>
      <div className={`col-span-2 ${up ? "text-emerald-400" : "text-red-400"}`}>
        {chg}
      </div>
    </div>
  );
}
function Tab({ children, active = false }) {
  return (
    <button
      type="button"
      className={`-mb-px border-b px-3 py-3 text-sm ${
        active
          ? "border-lime-400 text-white"
          : "border-transparent text-zinc-400 hover:text-zinc-200"
      }`}
    >
      {children}
    </button>
  );
}

export default function Overview() {
  // default chart pair
  const [selected, setSelected] = useState({
    code: "AAPL",
    label: "Apple Inc",
    tvSymbol: "NASDAQ:AAPL",
  });
  const [pickerOpen, setPickerOpen] = useState(false);

  // sample pairs (extend/replace with your API list)
  const pairs = useMemo(
    () => [
      { code: "AAPL", label: "Apple Inc", tvSymbol: "NASDAQ:AAPL" },
      { code: "TSLA", label: "Tesla, Inc.", tvSymbol: "NASDAQ:TSLA" },
      { code: "MSFT", label: "Microsoft Corp", tvSymbol: "NASDAQ:MSFT" },
      {
        code: "BTCUSDT",
        label: "Bitcoin / Tether",
        tvSymbol: "BINANCE:BTCUSDT",
      },
      {
        code: "ETHUSDT",
        label: "Ethereum / Tether",
        tvSymbol: "BINANCE:ETHUSDT",
      },
      { code: "EURUSD", label: "Euro / US Dollar", tvSymbol: "FX:EURUSD" },
      { code: "XAUUSD", label: "Gold / US Dollar", tvSymbol: "OANDA:XAUUSD" },
    ],
    []
  );

  return (
    <DashboardShell>
      {/* Top stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard label="Deposit" value="$5,000.00" />
        <StatCard label="Profit" value="$493,524.79" />
        <StatCard label="Total Balance" value="$378,524.79" />
      </section>

      {/* Chart + Ticker */}
      <section className="mt-4 grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Chart */}
        <Panel className="xl:col-span-2">
          <div className="flex items-center justify-between px-1 pb-2 text-[11px] text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="text-zinc-300">{selected.label}</span>
              <span className="rounded bg-zinc-800/60 px-1.5 py-0.5 text-zinc-400">
                D
              </span>
            </div>
            <span>Cboe One</span>
          </div>

          <TVChart symbol={selected.tvSymbol} interval="D" height={420} />

          <div className="mt-2 text-[11px] text-zinc-400">
            {selected.label} · Daily · (TradingView)
          </div>
        </Panel>

        {/* Watchlist */}
        <Panel>
          <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-800 px-3 py-2">
            <span className="uppercase tracking-wide">Ticker</span>
            <span>7,801 matches</span>
          </div>
          <div className="h-[420px] overflow-y-auto">
            <TickerRow
              code="AEDAUD"
              price="0.41856"
              chgPct="+0.01%"
              chg="+0.00006"
              up
            />
            <TickerRow
              code="AEDBRX"
              price="1.4725"
              chgPct="+0.31%"
              chg="+0.0045"
              up
            />
            <TickerRow
              code="AEDCAD"
              price="0.37574"
              chgPct="-0.02%"
              chg="-0.00008"
            />
            <TickerRow
              code="AEDCHF"
              price="0.21946"
              chgPct="-0.00%"
              chg="-0.00001"
            />
            <TickerRow
              code="AEDEUR"
              price="0.23350"
              chgPct="-0.01%"
              chg="-0.00003"
            />
            <TickerRow
              code="AEDGBP"
              price="0.20082"
              chgPct="+0.00%"
              chg="+0.00001"
              up
            />
            <TickerRow
              code="AEDHKD"
              price="2.1292"
              chgPct="+0.02%"
              chg="+0.0005"
              up
            />
            <TickerRow
              code="AEDINR"
              price="23.837"
              chgPct="+0.01%"
              chg="+0.003"
              up
            />
            <TickerRow
              code="AEDJPY"
              price="40.218"
              chgPct="-0.01%"
              chg="-0.003"
            />
            <TickerRow
              code="AEDKRW"
              price="377.81"
              chgPct="+0.00%"
              chg="+0.01"
              up
            />
            <TickerRow
              code="AEDKWD"
              price="0.083878"
              chgPct="+0.31%"
              chg="+0.000257"
              up
            />
          </div>
        </Panel>
      </section>

      {/* Trading pair selector bar */}
      <section className="mt-4">
        <Panel>
          <div className="h-16 w-full flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/30 px-4">
            <span className="text-xs sm:text-sm text-zinc-300">
              Choose Trading Pairs
              <span className="ml-2 rounded bg-zinc-800/60 px-2 py-0.5 text-zinc-400">
                Current: <span className="text-zinc-200">{selected.code}</span>
              </span>
            </span>

            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-transparent px-3 py-1.5 text-xs text-zinc-200 hover:border-lime-400 hover:text-white"
            >
              Choose Trading Pairs
              <svg
                width="14"
                height="14"
                viewBox="0 0 20 20"
                className="opacity-70"
              >
                <path fill="currentColor" d="M5.5 7.5L10 12l4.5-4.5z" />
              </svg>
            </button>
          </div>
        </Panel>
      </section>

      {/* Orders */}
      <section className="mt-4">
        <Panel>
          <div className="flex items-center gap-6 border-b border-zinc-800 px-4">
            <Tab active>Open orders</Tab>
            <Tab>Closed orders</Tab>
            <Tab>Order history</Tab>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs sm:text-sm">
              <thead className="text-zinc-400">
                <tr className="border-b border-zinc-800">
                  {[
                    "SN",
                    "AMOUNT",
                    "SYMBOL",
                    "TRADE PAIR",
                    "TRADE TYPE",
                    "TIME INTERVAL",
                    "TRADE LEVERAGE",
                    "TRADE ID",
                    "TRADE DATE",
                    "TRADE STATUS",
                    "PAYOUT",
                    "ACTION",
                  ].map((h) => (
                    <th
                      key={h}
                      className="whitespace-nowrap px-4 py-3 text-left font-medium"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(6)].map((_, i) => (
                  <tr key={i} className="border-b border-zinc-900/70">
                    {Array.from({ length: 12 }).map((__, j) => (
                      <td key={j} className="px-4 py-3 text-zinc-300">
                        —
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </section>

      {/* Pair picker modal */}
      <PairPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onPick={(p) => setSelected(p)}
        pairs={pairs}
      />
    </DashboardShell>
  );
}
