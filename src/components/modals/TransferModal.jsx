import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { X } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import { showPromise } from "../../utils/toast";
import SearchableCoinInput from "../ui/SearchableCoinInput";

const accounts = ["Spot Account", "Futures Account"];

const TransferModal = ({ isOpen, onClose, preselectedCoin = null }) => {
  const [fromAccount, setFromAccount] = useState(accounts[0]);
  const [toAccount, setToAccount] = useState(accounts[1]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [amount, setAmount] = useState("");

  // Load coin when modal is opened
  useEffect(() => {
    if (isOpen && preselectedCoin) {
      console.log(preselectedCoin);
      setSelectedCoin(preselectedCoin);
    }
  }, [isOpen, preselectedCoin]);

  const handleSwap = () => {
    setFromAccount(toAccount);
    setToAccount(fromAccount);
  };

  const handleSubmit = async () => {
    if (!amount || parseFloat(amount) <= 0 || !selectedCoin) return;

    await showPromise(
      axiosInstance.post("/user/transferFunds", {
        from: fromAccount,
        to: toAccount,
        coin: selectedCoin.symbol,
        amount,
      }),
      {
        loading: "Transferring...",
        success: "Transfer successful!",
        error: "Transfer failed.",
      }
    );

    setAmount("");
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#121212] p-6 text-left align-middle shadow-xl transition-all text-white">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title className="text-lg font-bold">
                    Transfer
                  </Dialog.Title>
                  <button onClick={onClose}>
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* From / To with Swap */}
                <div className="bg-[#1D1D1D] border border-gray-700 rounded-xl p-4 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">From</span>
                    <span className="text-white font-medium">
                      {fromAccount}
                    </span>
                  </div>
                  <hr className="border-gray-700 my-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">To</span>
                    <span className="text-white font-medium">{toAccount}</span>
                  </div>
                  <div className="flex justify-center mt-2">
                    <button
                      className="size-8 flex justify-center items-center rounded-full bg-[#2E2E2E] hover:bg-[#444]"
                      onClick={handleSwap}
                    >
                      <img src="/new/swap.png" alt="swap" className="size-5" />
                    </button>
                  </div>
                </div>

                {/* Coin Input (Searchable) */}
                <SearchableCoinInput
                  selectedCoin={selectedCoin}
                  setSelectedCoin={setSelectedCoin}
                />

                {/* Amount Input */}
                <div className="mb-4 text-[10px]">
                  <div className="flex justify-between text-[10px] text-white mb-1">
                    <span>Quantity</span>
                    <span>
                      0.00000000 {selectedCoin?.symbol?.toUpperCase() || ""}
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Please enter the transfer amount"
                      className="w-full bg-[#1D1D1D] text-white border border-gray-700 rounded px-3 py-2"
                    />
                    <span className="absolute right-3 top-2.5 text-gray-400">
                      {selectedCoin?.symbol?.toUpperCase()}
                    </span>
                    <button
                      type="button"
                      className="absolute right-14 top-2.5 text-lime-400"
                      onClick={() => setAmount("0.00000000")}
                    >
                      All
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="button"
                  className="w-full bg-gray-700 hover:bg-gray-600 text-sm py-2 rounded disabled:opacity-50"
                  disabled={!amount || !selectedCoin}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TransferModal;
