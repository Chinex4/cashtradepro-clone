import DashboardShell from "../../../layout/DashboardShell";
import {
  ChevronDown,
  Filter,
  SlidersHorizontal,
  ListFilter,
} from "lucide-react";
import { useMemo } from "react";

export default function Market() {
  const rows = useMemo(
    () =>
      [
        {
          ticker: "ETHUSDT.P",
          price: "4,584.85",
          chgPct: "+0.88%",
          chg: "40.04",
          high: "4,596.00",
          low: "4,535.27",
          vol: "348.31K",
          volUsd: "46.64B",
          volChg: "25.85%",
          tech: "↗︎ Buy",
          exchange: "BINANCE",
          up: true,
        },
        {
          ticker: "PENDLEUSDT",
          price: "5.486",
          chgPct: "-2.16%",
          chg: "-0.121",
          high: "5.652",
          low: "5.344",
          vol: "3.04B",
          volUsd: "45.89B",
          volChg: "5.07%",
          tech: "↗︎ Buy",
          exchange: "WEEX",
          up: false,
        },
        {
          ticker: "BTCUSDT.P",
          price: "118,315.9",
          chgPct: "+0.06%",
          chg: "73.7",
          high: "118,433.4",
          low: "117,970.7",
          vol: "5.53K",
          volUsd: "28.77B",
          volChg: "18.80%",
          tech: "↗︎ Buy",
          exchange: "BINANCE",
          up: true,
        },
        {
          ticker: "SOLUSDT.P",
          price: "193.11",
          chgPct: "+0.36%",
          chg: "0.70",
          high: "193.93",
          low: "191.87",
          vol: "1.54M",
          volUsd: "11.3B",
          volChg: "20.91%",
          tech: "↗︎ Buy",
          exchange: "BINANCE",
          up: true,
        },
        {
          ticker: "ETHUSDC.P",
          price: "4,590.66",
          chgPct: "+0.88%",
          chg: "40.01",
          high: "4,601.27",
          low: "4,541.11",
          vol: "59.9K",
          volUsd: "7.58B",
          volChg: "5.61%",
          tech: "↗︎ Buy",
          exchange: "BINANCE",
          up: true,
        },
        // add more items as needed...
      ].concat(
        Array.from({ length: 20 }).map((_, i) => ({
          ticker: i % 2 ? "BTCUSDT.P" : "ETHUSDT.P",
          price: i % 2 ? "118,350.0" : "4,585.19",
          chgPct: i % 3 ? "+0.08%" : "+0.86%",
          chg: i % 2 ? "89.1" : "39.19",
          high: i % 2 ? "118,458.8" : "4,596.05",
          low: i % 2 ? "117,979.9" : "4,534.60",
          vol: i % 2 ? "2.46K" : "155.38K",
          volUsd: i % 2 ? "16.08B" : "19.88B",
          volChg: i % 2 ? "10.98%" : "30.41%",
          tech: i % 2 ? "↗︎ Strong Buy" : "↗︎ Buy",
          exchange: i % 2 ? "BYBIT" : "BYBIT",
          up: true,
        }))
      ),
    []
  );

  return (
    <DashboardShell>
      <section className="space-y-4">
        <Panel>
          {/* Toolbar */}
          <div className="flex items-center justify-between px-2 pb-3">
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800/60">
                Overview <ChevronDown size={16} className="opacity-70" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800/60">
                <ListFilter size={16} />
                <span className="hidden sm:inline">Columns</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800/60">
                General <ChevronDown size={16} className="opacity-70" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200 hover:border-lime-400 hover:text-white">
                Filters <SlidersHorizontal size={16} />
              </button>
            </div>
          </div>

          {/* Scroll container with sticky header */}
          <div className="overflow-auto rounded-lg border border-zinc-800">
            <table className="min-w-[1100px] w-full text-sm">
              <thead className="sticky top-0 z-10 bg-zinc-950">
                <tr className="text-zinc-400">
                  <Th className="w-[28%]">
                    <div className="flex items-center justify-between">
                      <span>TICKER</span>
                      <span className="text-[11px] text-zinc-500">
                        56039 MATCHES
                      </span>
                    </div>
                  </Th>
                  <Th>PRICE</Th>
                  <Th>CHG %</Th>
                  <Th>CHG</Th>
                  <Th>HIGH</Th>
                  <Th>LOW</Th>
                  <Th>VOL</Th>
                  <Th>VOL 24H USD</Th>
                  <Th>VOL 24H CHG %</Th>
                  <Th>TECHNICAL RATING</Th>
                  <Th>EXCHANGE</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr
                    key={i}
                    className="border-t border-zinc-900/70 hover:bg-zinc-900/30"
                  >
                    <Td>
                      <div className="flex items-center gap-3">
                        <span className="relative grid h-5 w-5 place-items-center">
                          <span className="h-5 w-5 rounded-full bg-zinc-700/40" />
                          <span className="absolute h-2.5 w-2.5 rounded-full bg-lime-400/30" />
                        </span>
                        <button className="text-lime-400 hover:underline">
                          {r.ticker}
                        </button>
                      </div>
                    </Td>
                    <Td>{r.price}</Td>
                    <Td className={r.up ? "text-emerald-400" : "text-red-400"}>
                      {r.chgPct}
                    </Td>
                    <Td className={r.up ? "text-emerald-400" : "text-red-400"}>
                      {r.chg}
                    </Td>
                    <Td>{r.high}</Td>
                    <Td>{r.low}</Td>
                    <Td>{r.vol}</Td>
                    <Td>{r.volUsd}</Td>
                    <Td className="text-emerald-400">{r.volChg}</Td>
                    <Td>
                      <span
                        className={`rounded px-2 py-0.5 text-xs ${
                          r.tech.includes("Strong")
                            ? "border border-emerald-500/30 text-emerald-400"
                            : "border border-emerald-500/20 text-emerald-400"
                        }`}
                      >
                        {r.tech}
                      </span>
                    </Td>
                    <Td className="text-zinc-300">{r.exchange}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </section>
    </DashboardShell>
  );
}

/* ---------------- helpers ---------------- */

function Panel({ children }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-[#0F0F0F] p-3 sm:p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
      {children}
    </div>
  );
}

function Th({ children, className = "" }) {
  return (
    <th
      className={`whitespace-nowrap px-3 py-3 text-left font-medium border-b border-zinc-800 ${className}`}
    >
      {children}
    </th>
  );
}

function Td({ children, className = "" }) {
  return <td className={`px-3 py-2 text-zinc-200 ${className}`}>{children}</td>;
}
