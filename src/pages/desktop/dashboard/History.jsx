import { useState, useMemo } from "react";
import DashboardShell from "../../../layout/DashboardShell";

/* ---------- helpers (panel + table primitives) ---------- */
function Panel({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl border border-zinc-800 bg-[#0F0F0F] p-3 sm:p-4 ${className}`}
    >
      {children}
    </div>
  );
}
function Tabs({ value, onChange, items }) {
  return (
    <div className="flex flex-wrap gap-8 border-b border-zinc-800 px-3 sm:px-4">
      {items.map((t) => {
        const active = value === t.key;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`relative py-3 text-sm font-medium ${
              active ? "text-white" : "text-zinc-300 hover:text-zinc-100"
            }`}
            type="button"
          >
            {t.label}
            <span
              className={`absolute -bottom-px left-0 h-0.5 rounded-full transition-all ${
                active ? "w-full bg-lime-400" : "w-0 bg-transparent"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
function Th({ children, className = "" }) {
  return (
    <th
      className={`whitespace-nowrap px-4 py-3 text-left text-zinc-400 font-medium ${className}`}
    >
      {children}
    </th>
  );
}
function Td({ children, className = "" }) {
  return <td className={`px-4 py-3 text-zinc-200 ${className}`}>{children}</td>;
}

/* ---------- page ---------- */
export default function History() {
  const [tab, setTab] = useState("deposit");

  // demo data (replace with API results)
  const depositRows = useMemo(
    () => [
      {
        sn: 1,
        amount: "$ 4,000.00",
        coin: "0.0340 Btc",
        method: "Bitcoin",
        wallet: "",
        id: "#M7QlACWzUT",
        status: "Pending",
        date: "2025-08-14 12:16:14",
      },
      {
        sn: 2,
        amount: "$ 500.00",
        coin: "0.0063 Btc",
        method: "Bitcoin",
        wallet: "",
        id: "#qaec2SEIZu",
        status: "Pending",
        date: "2025-04-10 11:04:03",
      },
      {
        sn: 3,
        amount: "$ 2,000.00",
        coin: "0.0197 Btc",
        method: "Bitcoin",
        wallet: "",
        id: "#9c7tegnskw",
        status: "Declined",
        date: "2025-01-28 19:53:32",
      },
      {
        sn: 4,
        amount: "$ 45,089.21",
        coin: "0.4427 Btc",
        method: "Bitcoin",
        wallet: "",
        id: "#9YdASXJ1H3",
        status: "Approved",
        date: "2025-01-28 19:02:26",
      },
    ],
    []
  );

  const bankRows = useMemo(() => [], []); // empty like screenshot

  const cryptoRows = useMemo(
    () => [
      {
        sn: 1,
        amount: "$ 80,000.00",
        date: "2025-08-08 15:30:45",
        mode: "Bitcoin Withdrawal",
        id: "#6jKJo3J9lS",
        status: "Pending",
        wallet: "jshdjjhhhhhdfjdhhuhdfdhfd",
      },
    ],
    []
  );

  const earningRows = useMemo(
    () => [
      {
        sn: 1,
        amount: "$27,105.00",
        type: "Profit",
        tx: "#wDz5RvGT7K",
        status: "Approved",
        date: "2025-07-23 10:46:19",
      },
      {
        sn: 2,
        amount: "$42,915.00",
        type: "Profit",
        tx: "#xpl2y8z9O1",
        status: "Approved",
        date: "2025-07-23 10:45:18",
      },
      {
        sn: 3,
        amount: "$51,404.00",
        type: "Profit",
        tx: "#YASJnxrVqp",
        status: "Approved",
        date: "2025-07-23 10:42:27",
      },
      {
        sn: 4,
        amount: "$34,116.00",
        type: "Profit",
        tx: "#io9trVm7IQ",
        status: "Approved",
        date: "2025-07-23 10:37:17",
      },
      {
        sn: 5,
        amount: "$38,194.00",
        type: "Profit",
        tx: "#kEWitDpsYN",
        status: "Approved",
        date: "2025-07-23 10:32:40",
      },
      {
        sn: 6,
        amount: "$44,937.00",
        type: "Profit",
        tx: "#YFw2C5mdrW",
        status: "Approved",
        date: "2025-07-23 10:30:49",
      },
      {
        sn: 7,
        amount: "$127,410.00",
        type: "Profit",
        tx: "#DRVJpYghv5",
        status: "Approved",
        date: "2025-07-22 07:56:49",
      },
      {
        sn: 8,
        amount: "$27,441.00",
        type: "Profit",
        tx: "#c50LKCYf3b",
        status: "Approved",
        date: "2025-07-18 16:13:53",
      },
      {
        sn: 9,
        amount: "$57,316.00",
        type: "Profit",
        tx: "#0F9wkSERel",
        status: "Approved",
        date: "2025-03-06 16:15:52",
      },
    ],
    []
  );

  const planRows = useMemo(() => [], []); // empty like screenshot

  return (
    <DashboardShell>
      <Panel>
        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={setTab}
          items={[
            { key: "deposit", label: "Total Deposit History" },
            { key: "bank", label: "Total Bank Withdrawal History" },
            { key: "crypto", label: "Total Crypto Withdrawal History" },
            { key: "earning", label: "Total Earning History" },
            { key: "plan", label: "Plan Subscription" },
          ]}
        />

        {/* Content */}
        <div className="mt-6">
          {tab === "deposit" && <DepositTable rows={depositRows} />}
          {tab === "bank" && <BankTable rows={bankRows} />}
          {tab === "crypto" && <CryptoTable rows={cryptoRows} />}
          {tab === "earning" && <EarningTable rows={earningRows} />}
          {tab === "plan" && <PlanTable rows={planRows} />}
        </div>
      </Panel>
    </DashboardShell>
  );
}

/* ---------- tables ---------- */

function DepositTable({ rows }) {
  return (
    <>
      <h3 className="px-4 pb-3 text-base font-semibold text-white">
        Total Deposit History
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="border-b border-zinc-800">
            <tr>
              <Th>Sn</Th>
              <Th>Amount</Th>
              <Th>Coin Value</Th>
              <Th>Deposit Method</Th>
              <Th>Wallet</Th>
              <Th>Deposit Id</Th>
              <Th>Deposit Status</Th>
              <Th>Date of Deposit</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id ?? r.sn} className="border-b border-zinc-900/60">
                <Td>{r.sn}</Td>
                <Td>{r.amount}</Td>
                <Td>{r.coin}</Td>
                <Td>{r.method}</Td>
                <Td>{r.wallet || ""}</Td>
                <Td className="text-zinc-300">{r.id}</Td>
                <Td className={statusClass(r.status)}>{r.status}</Td>
                <Td className="text-zinc-300">{r.date}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function BankTable({ rows }) {
  return (
    <>
      <h3 className="px-4 pb-3 text-base font-semibold text-white">
        Total Bank Withdrawal History
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-[1100px] w-full text-sm">
          <thead className="border-b border-zinc-800">
            <tr>
              <Th>Sn</Th>
              <Th>Withdrawal ID</Th>
              <Th>Account Name</Th>
              <Th>Account Number</Th>
              <Th>Bank Name</Th>
              <Th>Country</Th>
              <Th>Amount</Th>
              <Th>Date of Withdrawal</Th>
              <Th>Narration</Th>
              <Th>Withdrawal Status</Th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <Td className="py-6 text-center text-zinc-500" colSpan={10}>
                  No records
                </Td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id ?? r.sn} className="border-b border-zinc-900/60">
                  <Td>{r.sn}</Td>
                  <Td>{r.id}</Td>
                  <Td>{r.accountName}</Td>
                  <Td>{r.accountNumber}</Td>
                  <Td>{r.bank}</Td>
                  <Td>{r.country}</Td>
                  <Td>{r.amount}</Td>
                  <Td>{r.date}</Td>
                  <Td>{r.narration}</Td>
                  <Td className={statusClass(r.status)}>{r.status}</Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function CryptoTable({ rows }) {
  return (
    <>
      <h3 className="px-4 pb-3 text-base font-semibold text-white">
        Total Crypto Withdrawal History
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="border-b border-zinc-800">
            <tr>
              <Th>Sn</Th>
              <Th>Amount</Th>
              <Th>Date of Withdrawal</Th>
              <Th>Payment Mode</Th>
              <Th>Withdrawal ID</Th>
              <Th>Withdrawal Status</Th>
              <Th>Wallet</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id ?? r.sn} className="border-b border-zinc-900/60">
                <Td>{r.sn}</Td>
                <Td>{r.amount}</Td>
                <Td>{r.date}</Td>
                <Td>{r.mode}</Td>
                <Td className="text-zinc-300">{r.id}</Td>
                <Td className={statusClass(r.status)}>{r.status}</Td>
                <Td className="truncate max-w-[280px]">{r.wallet}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function EarningTable({ rows }) {
  return (
    <>
      <h3 className="px-4 pb-3 text-base font-semibold text-white">
        Total Earning History
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="border-b border-zinc-800">
            <tr>
              <Th>Sn</Th>
              <Th>Amount</Th>
              <Th>Type</Th>
              <Th>Transaction Id</Th>
              <Th>Transaction Status</Th>
              <Th>Date of Transaction</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.tx ?? r.sn} className="border-b border-zinc-900/60">
                <Td>{r.sn}</Td>
                <Td>{r.amount}</Td>
                <Td>{r.type}</Td>
                <Td className="text-zinc-300">{r.tx}</Td>
                <Td className={statusClass(r.status)}>{r.status}</Td>
                <Td className="text-zinc-300">{r.date}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function PlanTable({ rows }) {
  return (
    <>
      <h3 className="px-4 pb-3 text-base font-semibold text-white">
        Total Plan Subscription
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full text-sm">
          <thead className="border-b border-zinc-800">
            <tr>
              <Th>Sn</Th>
              <Th>Amount</Th>
              <Th>Coin Value</Th>
              <Th>Deposit Method</Th>
              <Th>Wallet</Th>
              <Th>Deposit Plan</Th>
              <Th>Deposit Id</Th>
              <Th>Deposit Status</Th>
              <Th>Date of Deposit</Th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <Td className="py-6 text-center text-zinc-500" colSpan={9}>
                  No records
                </Td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id ?? r.sn} className="border-b border-zinc-900/60">
                  <Td>{r.sn}</Td>
                  <Td>{r.amount}</Td>
                  <Td>{r.coin}</Td>
                  <Td>{r.method}</Td>
                  <Td>{r.wallet}</Td>
                  <Td>{r.plan}</Td>
                  <Td className="text-zinc-300">{r.id}</Td>
                  <Td className={statusClass(r.status)}>{r.status}</Td>
                  <Td className="text-zinc-300">{r.date}</Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ---------- utils ---------- */

function statusClass(status) {
  if (!status) return "text-zinc-300";
  const s = status.toLowerCase();
  if (s.includes("approve")) return "text-emerald-400";
  if (s.includes("decline") || s.includes("reject")) return "text-red-400";
  if (s.includes("pending")) return "text-amber-300";
  return "text-zinc-300";
}
