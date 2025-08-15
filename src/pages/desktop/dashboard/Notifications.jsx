import DashboardShell from "../../../layout/DashboardShell";
import { Bell } from "lucide-react";
import { useMemo } from "react";

/* ---------- small building blocks ---------- */
function Panel({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl border border-zinc-800 bg-[#0F0F0F] p-4 sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}
function Item({ title, body, date }) {
  return (
    <div className="py-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-zinc-100">{title}</div>
          <div className="mt-1 text-sm leading-relaxed text-zinc-400">
            {body}
          </div>
        </div>
        <div className="whitespace-nowrap pt-1 text-xs text-zinc-500">
          {date}
        </div>
      </div>
    </div>
  );
}

/* ---------- page ---------- */
export default function Notifications() {
  // Replace with API results later
  const items = useMemo(
    () => [
      {
        title: "Deposit initiated",
        body: "Your deposit of $1.5 has been received and is currently awaiting approval. you will be notified once the approval process is complete.",
        date: "2025-08-14",
      },
      {
        title: "Deposit initiated",
        body: "Your deposit of $4000 has been received and is currently awaiting approval. you will be notified once the approval process is complete.",
        date: "2025-08-14",
      },
      {
        title: "Crypto Withdrawal Confirmation",
        body: "You just withdrew 80000 from your account, using Bitcoin Withdrawal to this wallet jshdjjnhhhhndhdfjdhhu… your transaction is awaiting approval.",
        date: "2025-08-08",
      },
      {
        title: "Congratulations On Your Trade Profit!",
        body: "We are pleased to inform you that you gained a profit of $27105.64.",
        date: "2025-07-23",
      },
      {
        title: "Congratulations On Your Trade Profit!",
        body: "We are pleased to inform you that you gained a profit of $42915.06.",
        date: "2025-07-23",
      },
      {
        title: "Congratulations On Your Trade Profit!",
        body: "We are pleased to inform you that you gained a profit of $51404.27.",
        date: "2025-07-23",
      },
      {
        title: "Congratulations On Your Trade Profit!",
        body: "We are pleased to inform you that you gained a profit of $34116.74.",
        date: "2025-07-23",
      },
      {
        title: "Congratulations On Your Trade Profit!",
        body: "We are pleased to inform you that you gained a profit of $38194.06.",
        date: "2025-07-23",
      },
      {
        title: "Congratulations On Your Trade Profit!",
        body: "We are pleased to inform you that you gained a profit of $44937.02.",
        date: "2025-07-23",
      },
      {
        title: "Congratulations On Your Trade Profit!",
        body: "We are pleased to inform you that you gained a profit of $127410.93.",
        date: "2025-07-22",
      },
    ],
    []
  );

  return (
    <DashboardShell>
      <Panel className="mx-auto max-w-6xl">
        {/* header */}
        <div className="mb-1 flex items-center gap-2 text-white">
          <Bell size={18} className="text-lime-400" />
          <span className="font-semibold">Notifications</span>
        </div>
        <div className="mb-4 text-sm text-zinc-400">
          Stay updated with all the important activities in your account.
        </div>

        {/* list */}
        <div className="divide-y divide-zinc-800">
          {items.map((n, i) => (
            <Item key={i} {...n} />
          ))}
        </div>

        {/* footer button */}
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            className="rounded-md border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 hover:border-lime-400 hover:text-white"
            onClick={() => console.log("load more...")}
          >
            See More
          </button>
        </div>
      </Panel>
    </DashboardShell>
  );
}
