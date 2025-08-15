import { useMemo, useState } from "react";
import DashboardShell from "../../../layout/DashboardShell";
import QRCode from "react-qr-code"; // npm i react-qr-code

/* ---------------- helpers ---------------- */
function Panel({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl border border-zinc-800 bg-[#0F0F0F] p-4 sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}
function Label({ children, className = "" }) {
  return (
    <label
      className={`mb-2 block text-sm font-medium text-zinc-300 ${className}`}
    >
      {children}
    </label>
  );
}
function Input(props) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-zinc-700 bg-zinc-900/40 px-4 py-3 text-zinc-100 placeholder-zinc-500 outline-none focus:border-lime-400 ${
        props.className || ""
      }`}
    />
  );
}
function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="w-full appearance-none rounded-lg border border-zinc-700 bg-zinc-900/40 px-4 py-3 pr-9 text-zinc-100 outline-none focus:border-lime-400"
    >
      {children}
    </select>
  );
}
function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex w-full items-center justify-center rounded-lg border border-lime-400/70 px-4 py-3 font-semibold text-white hover:bg-lime-400/10 ${className}`}
    >
      {children}
    </button>
  );
}
function Subtle({ children }) {
  return (
    <div className="text-center text-[13px] text-zinc-400">{children}</div>
  );
}

/* ---------------- page ---------------- */
export default function Deposit() {
  const [step, setStep] = useState("form"); // form | address | upload
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("BTC");

  // you can fetch these from your API/DB instead
  const methods = useMemo(
    () => ({
      BTC: {
        label: "Bitcoin",
        symbol: "BTC",
        address: "bc1qyc6awuvr5nexample", // <- replace with your live address
        rateUSD: 68000, // used only to show approx coin value
      },
      ETH: {
        label: "Ethereum",
        symbol: "ETH",
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // example
        rateUSD: 3500,
      },
      USDT_TRC20: {
        label: "USDT (TRC20)",
        symbol: "USDT",
        address: "TQS1exampleTRONuK5k2f6F", // example TRON address
        rateUSD: 1,
      },
    }),
    []
  );

  const selected = methods[method];
  const coinValue =
    Number(amount) > 0 && selected?.rateUSD
      ? (Number(amount) / selected.rateUSD).toFixed(4)
      : "0.0000";

  /* ------------ handlers ------------ */
  function handleSubmit(e) {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return alert("Enter a valid amount");
    if (!selected) return alert("Choose a method");
    setStep("address");
  }

  function copyToClipboard(text) {
    if (!navigator?.clipboard) return;
    navigator.clipboard.writeText(text).then(() => {
      // replace with your toast util if you want
      console.log("Copied");
    });
  }

  function handleUpload(e) {
    e.preventDefault();
    // TODO: send file to backend
    alert("Proof uploaded. We’ll review and update your balance.");
    // you can redirect to /dashboard/history here
    setStep("form");
    setAmount("");
  }

  return (
    <DashboardShell>
      {step === "form" && (
        <Panel className="max-w-5xl mx-auto">
          <h2 className="mb-8 text-center text-xl font-semibold text-lime-400">
            Fund Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* amount */}
            <div>
              <Label>Amount</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {/* method */}
            <div>
              <Label>Deposit Method</Label>
              <div className="relative">
                <Select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="BTC">Bitcoin</option>
                  <option value="ETH">Ethereum</option>
                  <option value="USDT_TRC20">USDT (TRC20)</option>
                </Select>
                {/* chevron */}
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-60"
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                >
                  <path fill="currentColor" d="M5.5 7.5L10 12l4.5-4.5z" />
                </svg>
              </div>
            </div>

            <PrimaryButton type="submit">Fund Now</PrimaryButton>
          </form>
        </Panel>
      )}

      {step === "address" && (
        <Panel className="max-w-6xl mx-auto">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 sm:p-6">
            <div className="mb-4 text-center text-[13px] font-semibold text-cyan-300">
              Preferred Deposit Amount ${amount || "0"} with a value of{" "}
              {coinValue} {selected.symbol.toLowerCase()}
            </div>
            <Subtle>
              Please send your payment to one of the below listed
              crypto‑currency addresses.
            </Subtle>

            <div className="mx-auto mt-8 max-w-3xl rounded-xl bg-[#0F0F0F] p-6">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-center">
                {/* coin icon placeholder */}
                <div className="grid h-32 w-32 place-items-center rounded-full bg-orange-500/90 text-white text-4xl font-black">
                  ₿
                </div>

                <div className="text-center sm:text-left">
                  <div className="mb-3 text-lg font-bold tracking-wide text-white">
                    {selected.label.toUpperCase()} ADDRESS
                  </div>

                  {/* address + copy */}
                  <div className="mb-2 flex items-center gap-2">
                    <div className="truncate rounded-md border border-zinc-700 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-200 max-w-[420px]">
                      {selected.address}
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(selected.address)}
                      className="rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
                    >
                      Copy
                    </button>
                  </div>

                  <div className="mb-4 text-[12px] text-zinc-400">
                    Scan to Copy Wallet Details
                  </div>

                  <div className="mx-auto sm:mx-0 w-[180px] rounded-md bg-white p-3">
                    <QRCode value={selected.address} size={160} />
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => setStep("upload")}
                      className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                      Confirm Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Big dark frame like your screenshot */}
            <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950/40 p-6" />
          </div>
        </Panel>
      )}

      {step === "upload" && (
        <Panel className="max-w-6xl mx-auto">
          <h2 className="mb-8 text-center text-xl font-semibold text-lime-400">
            Upload Proof of Payment
          </h2>
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <input
                type="file"
                accept="image/*,application/pdf"
                className="block w-full rounded-lg border border-zinc-700 bg-zinc-900/40 px-4 py-3 text-zinc-100 file:mr-4 file:rounded-md file:border-0 file:bg-zinc-800 file:px-4 file:py-2 file:text-sm file:text-zinc-200 hover:file:bg-zinc-700"
                required
              />
            </div>

            <PrimaryButton type="submit">Upload Payment</PrimaryButton>
          </form>
        </Panel>
      )}
    </DashboardShell>
  );
}
