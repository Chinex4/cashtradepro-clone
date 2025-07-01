import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMarginMode,
  setMarginModalOpen,
} from "../../redux/trade/tradeSlice";
import { showPromise } from "../../utils/toast";
import axiosInstance from "../../api/axiosInstance";

const AssetModeModal = ({ isOpen }) => {
  const dispatch = useDispatch();
  const { marginMode } = useSelector((state) => state.trade);
  const [selectedMode, setSelectedMode] = useState(marginMode); // track selected card

  useEffect(() => {
    // sync selectedMode when modal is opened
    if (isOpen) setSelectedMode(marginMode);
  }, [isOpen, marginMode]);

  const handleSwitch = async () => {
    if (selectedMode === marginMode) {
      dispatch(setMarginModalOpen(false));
      return;
    }

    await showPromise(
      axiosInstance.post("/user/margin-mode", { mode: selectedMode }),
      {
        loading: "Switching mode...",
        success: `Switched to ${selectedMode}-Asset Mode`,
        error: "Failed to switch mode",
      }
    );
    dispatch(setMarginMode(selectedMode));
    dispatch(setMarginModalOpen(false));
  };

  const selectableCard = (label, description, bullets) => {
    const isActive = selectedMode === label;
    return (
      <div
        onClick={() => setSelectedMode(label)}
        className={`p-3 border rounded cursor-pointer transition-all ${
          isActive ? "border-lime-400 bg-[#1a1a1a]" : "border-gray-700"
        }`}
      >
        <h3 className="text-sm font-bold mb-1">{description}</h3>
        <ul className="list-disc ml-5 space-y-1 text-gray-300">
          {bullets.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => dispatch(setMarginModalOpen(false))}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-[#111] p-6 text-left align-middle shadow-xl transition-all text-white space-y-5">
                <Dialog.Title className="text-lg font-bold">
                  Asset Mode
                </Dialog.Title>

                <div className="space-y-4 text-xs">
                  {selectableCard("Single", "Single-Asset Mode", [
                    "Cross-asset futures trading is not supported.",
                    "Profit and loss offset each other within same margin assets.",
                    "Both cross and isolated margin modes are supported.",
                  ])}
                  {selectableCard("Multi", "Multi-Assets Mode", [
                    "Cross-asset trading is supported.",
                    "PnL offset across positions with different margin assets.",
                    "Only cross margin mode is supported.",
                  ])}
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    className="flex-1 bg-gray-700 py-2 rounded"
                    onClick={() => dispatch(setMarginModalOpen(false))}
                  >
                    Cancel
                  </button>
                  <button
                    className={`flex-1 py-2 rounded font-bold ${
                      selectedMode !== marginMode
                        ? "bg-lime-400 text-black"
                        : "bg-gray-600 text-white"
                    }`}
                    onClick={handleSwitch}
                  >
                    {selectedMode === marginMode ? "Selected" : "Confirm"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AssetModeModal;
