import { useState } from "react";
import DashboardShell from "../../../layout/DashboardShell";

/* ---------------- shared UI bits ---------------- */
function Panel({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl border border-zinc-800 bg-[#0F0F0F] p-4 sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}
function SectionTitle({ children }) {
  return <h3 className="mb-6 text-xl font-semibold text-white">{children}</h3>;
}
function Label({ children }) {
  return (
    <div className="mb-2 text-center text-[13px] font-semibold text-lime-400">
      {children}
    </div>
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
function Pill({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border px-4 py-2 text-sm font-semibold transition-colors
        ${
          active
            ? "border-lime-400 text-white shadow-[0_0_0_1px_rgba(0,255,255,0.25)_inset]"
            : "border-transparent text-zinc-300 hover:text-white"
        }`}
    >
      {children}
    </button>
  );
}

/* ---------------- page ---------------- */
export default function Withdrawal() {
  const [method, setMethod] = useState("BTC");

  // form state
  const [btcAddr, setBtcAddr] = useState("");
  const [ethAddr, setEthAddr] = useState("");
  const [amountCrypto, setAmountCrypto] = useState("");
  const [bankAmount, setBankAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");

  function submitCrypto(kind) {
    if (!amountCrypto || Number(amountCrypto) <= 0)
      return alert("Enter withdrawal amount");
    const addr = kind === "BTC" ? btcAddr : ethAddr;
    if (!addr) return alert(`Enter a valid ${kind} address`);
    // TODO: call your API
    alert(
      `${kind} withdrawal submitted:\nAmount: ${amountCrypto}\nAddress: ${addr}`
    );
    setAmountCrypto("");
    setBtcAddr("");
    setEthAddr("");
  }

  function submitBank() {
    if (!bankAmount || Number(bankAmount) <= 0)
      return alert("Enter withdrawal amount");
    if (!bankName) return alert("Enter bank name");
    if (!bankAccount) return alert("Enter account number");
    // TODO: call your API
    alert(
      `Bank withdrawal submitted:\nAmount: ${bankAmount}\nBank: ${bankName}\nAccount: ${bankAccount}`
    );
    setBankAmount("");
    setBankName("");
    setBankAccount("");
  }

  return (
    <DashboardShell>
      <Panel className="max-w-6xl mx-auto">
        {/* top selector */}
        <div className="mb-8 flex flex-col items-center gap-4">
          <div className="text-center text-[15px] font-semibold text-lime-400">
            Choose your desired method of withdrawal.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Pill active={method === "BTC"} onClick={() => setMethod("BTC")}>
              Bitcoin Withdrawal Method
            </Pill>
            <Pill active={method === "ETH"} onClick={() => setMethod("ETH")}>
              Ethereum Withdrawal Method
            </Pill>
            <Pill active={method === "BANK"} onClick={() => setMethod("BANK")}>
              Bank withdrawal Method
            </Pill>
          </div>
        </div>

        {/* BTC */}
        {method === "BTC" && (
          <div className="mx-auto max-w-5xl">
            <SectionTitle>Bitcoin Withdrawal Method</SectionTitle>

            <div className="space-y-6">
              <div>
                <Label>
                  Destination Address (Please double check this address)
                </Label>
                <Input
                  placeholder="Enter Bitcoin Address"
                  value={btcAddr}
                  onChange={(e) => setBtcAddr(e.target.value)}
                />
              </div>

              <div>
                <Label>Withdrawal Amount</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.0001"
                  placeholder="Amount to be Withdrawn"
                  value={amountCrypto}
                  onChange={(e) => setAmountCrypto(e.target.value)}
                />
              </div>

              <PrimaryButton onClick={() => submitCrypto("BTC")}>
                Withdraw
              </PrimaryButton>
            </div>
          </div>
        )}

        {/* ETH */}
        {method === "ETH" && (
          <div className="mx-auto max-w-5xl">
            <SectionTitle>Ethereum Withdrawal Method</SectionTitle>

            <div className="space-y-6">
              <div>
                <Label>
                  Destination Address (Please double check this address)
                </Label>
                <Input
                  placeholder="Enter Ethereum Address"
                  value={ethAddr}
                  onChange={(e) => setEthAddr(e.target.value)}
                />
              </div>

              <div>
                <Label>Withdrawal Amount</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.0001"
                  placeholder="Amount to be Withdrawn"
                  value={amountCrypto}
                  onChange={(e) => setAmountCrypto(e.target.value)}
                />
              </div>

              <PrimaryButton onClick={() => submitCrypto("ETH")}>
                Withdraw
              </PrimaryButton>
            </div>
          </div>
        )}

        {/* BANK */}
        {method === "BANK" && (
          <div className="mx-auto max-w-5xl">
            <SectionTitle>Bank withdrawal Method</SectionTitle>

            <div className="space-y-6">
              <div>
                <Label>Withdrawal Amount</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Amount to be Withdrawn"
                  value={bankAmount}
                  onChange={(e) => setBankAmount(e.target.value)}
                />
              </div>

              <div>
                <Label>Bank Name</Label>
                <Input
                  placeholder="Bank Name"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>

              <div>
                <Label>Account Number</Label>
                <Input
                  placeholder="Account Number"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                />
              </div>

              <PrimaryButton onClick={submitBank}>Withdraw</PrimaryButton>
            </div>
          </div>
        )}
      </Panel>
    </DashboardShell>
  );
}
