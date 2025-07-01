import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useSelector } from "react-redux";

const ConfirmTradeModal = ({ isOpen, onClose, onConfirm }) => {
  const { price, quantity, side, orderType } = useSelector(
    (state) => state.trade
  );

  const isLong = side === "long";
  const markPrice = 107560.9;
  const estLiqPrice = isLong ? 108007.5 : 107098.2;
  const fee = isLong ? "0.00215122" : "0.00215097";

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
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded bg-[#111] p-5 text-left align-middle shadow-xl transition-all text-white space-y-3">
                <Dialog.Title className="text-lg font-bold">
                  Confirm
                </Dialog.Title>

                <div className="text-sm text-gray-400">
                  BTCUSDT · Cross ·{" "}
                  <span className={isLong ? "text-green-500" : "text-red-500"}>
                    {isLong ? "Open Long" : "Open Short"} · 20X
                  </span>
                </div>

                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>Type</span>
                    <span>{orderType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Open Price</span>
                    <span>{price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Price</span>
                    <span>{markPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mark Price</span>
                    <span>{markPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity (BTC)</span>
                    <span>{quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Margin (USDT)</span>
                    <span>0.5378</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Margin Rate</span>
                    <span>0.00%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. Liq. Price</span>
                    <span>{estLiqPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline text-blue-400">
                      Estimated Fee (Maker)
                    </span>
                    <span>{fee} USDT</span>
                  </div>
                </div>

                <button
                  className="w-full py-2 bg-lime-400 hover:bg-lime-500 text-black font-bold rounded"
                  onClick={onConfirm}
                >
                  Confirm
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConfirmTradeModal;
