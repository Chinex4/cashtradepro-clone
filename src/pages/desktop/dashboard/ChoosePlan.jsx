import DashboardShell from "../../../layout/DashboardShell";

export default function ChoosePlan() {
  const plans = [
    {
      name: "SILVER PLAN",
      range: "$10,000 - $99,999",
      trades: "+5 Trades per Week",
      instant: "+ instant trading",
      leverage: "leverage upto 2x",
      key: "silver",
    },
    {
      name: "GOLD PLAN",
      range: "$100,000 - $199,999",
      trades: "+10 Trades per Week",
      instant: "+ instant trading",
      leverage: "leverage upto 2x AND 5x",
      key: "gold",
    },
    {
      name: "DIAMOND PLAN",
      range: "$200,000 - $299,999",
      trades: "+15 Trades per Week",
      instant: "+ instant trading",
      leverage: "leverage upto 2x, 5x AND 10x",
      key: "diamond",
    },
    {
      name: "PLATINUM PLAN",
      range: "$300,000 - UNLIMITED AMOUNT",
      trades: "+20 Trades per Week",
      instant: "+ instant trading",
      leverage: "leverage upto 2x, 5x, 10x AND 20x",
      key: "platinum",
    },
  ];

  function joinPlan(key) {
    // TODO: replace with your API / navigation
    alert(`Joined ${key} plan (stub).`);
  }

  return (
    <DashboardShell>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((p) => (
          <PlanCard key={p.key} {...p} onJoin={() => joinPlan(p.key)} />
        ))}
      </div>
    </DashboardShell>
  );
}

/* ---------------- UI pieces ---------------- */

function PlanCard({ name, range, trades, instant, leverage, onJoin }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#0F0F0F] p-6 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
      <div className="space-y-1 text-zinc-200">
        <div className="text-sm font-extrabold tracking-wide text-zinc-100">
          {name}
        </div>
        <div className="text-sm text-zinc-300">{range}</div>
        <div className="text-sm text-zinc-300">{trades}</div>
        <div className="text-sm text-zinc-300">{instant}</div>
        <div className="text-sm text-zinc-300">{leverage}</div>
      </div>

      <button
        onClick={onJoin}
        className="mt-6 w-full rounded-md border border-lime-400/80 bg-transparent px-4 py-3 text-sm font-semibold text-white hover:bg-lime-400/10"
      >
        JOIN PLAN
      </button>
    </div>
  );
}
