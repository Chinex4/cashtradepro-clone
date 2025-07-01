import { useState, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ChevronRight,
  Eye,
  EyeOff,
  ChevronDown,
  Wallet,
  // ArrowsUpDown,
} from "lucide-react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { toast } from "react-hot-toast";
import FAQ from "../../components/FAQ";
import TransferModal from "../../components/modals/TransferModal";

const quickLinks = [
  {
    text: "Deposit",
    icon: (
      <img src="/new/power.png" alt="deposit" className="size-5 md:size-8" />
    ),
    route: "/assets/deposit",
  },
  {
    text: "Buy Crypto",
    icon: (
      <img
        src="/new/currency.png"
        alt="buy crypto"
        className="size-5 md:size-8"
      />
    ),
    route: "/trade/third-party",
  },
  {
    text: "Withdraw",
    icon: (
      <img src="/new/trade.png" alt="withdraw" className="size-5 md:size-8" />
    ),
    route: "/assets/withdraw",
  },
  {
    text: "Transfer",
    icon: (
      <img
        src="/new/exchange.png"
        alt="transfer"
        className="size-5 md:size-8"
      />
    ),
    route: "",
  },
  {
    text: "View Wallets",
    icon: <Wallet className="size-5 md:size-10" />,
    route: "/assets/view-wallets",
  },
];

const currencies = ["USDT", "BTC"];

const Overview = () => {
  const [showAmount, setShowAmount] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [fromAccount, setFromAccount] = useState("Spot Account");
  const [toAccount, setToAccount] = useState("Futures Account");
  const [selectedCoin, setSelectedCoin] = useState("USDT");
  const [amount, setAmount] = useState("");

  const accounts = [
    { name: "Spot Account", path: "spot-account" },
    { name: "Futures Account", path: "futures-account" },
    { name: "Earn Account", path: "earn-account" },
    { name: "Copy Account", path: "copy-account" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT COLUMN */}
      <div className="lg:col-span-2 space-y-6">
        {/* Total Assets */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm text-gray-400">Total Assets</h3>
            <button onClick={() => setShowAmount(!showAmount)}>
              {showAmount ? (
                <Eye className="w-5 h-5 text-gray-400" />
              ) : (
                <EyeOff className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <div className="text-4xl font-bold">
              {showAmount ? "0.00" : "****"}
            </div>
            <Listbox value={selectedCurrency} onChange={setSelectedCurrency}>
              <div className="relative">
                <Listbox.Button className="flex items-center text-xs bg-transparent border border-gray-600 rounded px-2 py-0.5 text-white">
                  {selectedCurrency}
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 w-full rounded bg-[#1A1A1A] border border-gray-600 shadow-lg z-10">
                    {currencies.map((currency) => (
                      <Listbox.Option
                        key={currency}
                        value={currency}
                        className="cursor-pointer px-3 py-1 text-xs text-white hover:bg-gray-700"
                      >
                        {currency}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          <div className="text-xs text-gray-500">
            ≈ {showAmount ? "$0.00" : "****"}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-5 text-center text-sm">
          {quickLinks.map((action) =>
            action.text === "Transfer" ? (
              <button
                key={action.text}
                onClick={() => setIsTransferOpen(true)}
                className="flex flex-col items-center gap-1 focus:outline-none"
              >
                <span>{action.icon}</span>
                <span className="text-xs">{action.text}</span>
              </button>
            ) : (
              <Link
                to={action.route}
                key={action.text}
                className="flex flex-col items-center gap-1"
              >
                <span>{action.icon}</span>
                <span className="text-xs">{action.text}</span>
              </Link>
            )
          )}
        </div>

        {/* Assets Account */}
        <div className="bg-[#1A1A1A] rounded-xl p-4 space-y-4">
          <h3 className="font-semibold text-base lg:text-lg">Assets account</h3>
          {accounts.map((item) => (
            <NavLink
              to={`/assets/${item.path}`}
              key={item.name}
              className="text-xs flex items-center justify-between border-b border-[#333] pt-4 pb-2 last:border-none"
            >
              <span>{item.name}</span>
              <span className="flex items-center gap-2">
                <span className="text-gray-400">
                  {showAmount ? `0.00 ${selectedCurrency} ≈ $0.00` : "****"}
                </span>
                <ChevronRight className="w-4 h-4" />
              </span>
            </NavLink>
          ))}
        </div>

        {/* Deposits & Withdrawals */}
        <div className="bg-[#1A1A1A] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-base lg:text-lg">
              Deposits & Withdrawals
            </h3>
            <Link to="#" className="text-sm text-gray-300">
              View More
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center text-center text-gray-500 text-sm py-8">
            <svg
              className="w-10 h-10 mb-2 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path d="M4 4h16v16H4z" />
              <path d="M9 9h6M9 13h6M9 17h6" />
            </svg>
            <p>No Data</p>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="space-y-6">
        {/* Fund Wallet */}
        <div>
          <h3 className="font-semibold text-base lg:text-lg mb-3">
            Fund your wallet
          </h3>
          <div className="bg-[#1A1A1A] rounded-lg p-4 space-y-4">
            {/* On-chain */}
            <div className="flex justify-between items-center">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-lime-500 font-bold text-xl">₮</span>
                </div>
                <div>
                  <span className="text-xs bg-lime-400 text-black px-2 py-0.5 rounded mb-1 inline-block">
                    I have cryptos
                  </span>
                  <p className="text-sm font-semibold">Deposit on-chain</p>
                  <p className="text-xs text-gray-400">
                    Deposit your existing assets via blockchain
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>

            {/* Buy crypto */}
            <div className="flex justify-between items-center">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-black"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded mb-1 inline-block">
                    I don't have crypto assets
                  </span>
                  <p className="text-sm font-semibold">Buy crypto</p>
                  <p className="text-xs text-gray-400">
                    Buy crypto including USDT directly with ease.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h3 className="font-semibold text-2xl lg:text-lg">
            Frequently asked questions
          </h3>
          <FAQ showHeader={false} />
        </div>
      </div>

      {/* TRANSFER MODAL */}
      <TransferModal
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
      />
    </div>
  );
};

export default Overview;
