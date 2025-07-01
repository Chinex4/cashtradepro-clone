import { useState, useEffect, Fragment } from "react";
import { Tab } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setOrderField, setMarginMode } from "../../../redux/trade/tradeSlice";
import axiosInstance from "../../../api/axiosInstance";
import { showError, showPromise } from "../../../utils/toast"; // your toast utils
import ConfirmTradeModal from "../../modals/ConfirmTradeModal";
import AssetModeModal from "../../modals/AssetModeModal";
import { resetOrder } from "../../../redux/trade/tradeSlice";
import { setMarginModalOpen } from "../../../redux/trade/tradeSlice";
import { Link } from "react-router-dom";
import TransferModal from "../../modals/TransferModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TradePanel = ({ livePrice, loading }) => {
  const [price, setPrice] = useState(livePrice);
  const [quantity, setQuantity] = useState("");
  const [orderType, setOrderType] = useState("Limit");
  const [isManualPrice, setIsManualPrice] = useState(false);
  const [effectiveTime, setEffectiveTime] = useState("GTC");
  const dispatch = useDispatch();
  const { order, marginMode } = useSelector((state) => state.trade);
  const [sliderValue, setSliderValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedSide, setSelectedSide] = useState(null);
  const maxBTC = 0.005; // mock available BTC
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  useEffect(() => {
    if (!isManualPrice && livePrice) setPrice(livePrice);
  }, [livePrice, isManualPrice]);

  useEffect(() => {
    const q = parseFloat(quantity);
    if (q && maxBTC) {
      const percent = Math.min((q / maxBTC) * 100, 100);
      setSliderValue(percent);
    }
  }, [quantity]);

  const handlePriceChange = (type) => {
    const val = parseFloat(price);
    if (!val || isNaN(val)) return;
    const newPrice = type === "plus" ? val + 0.1 : val - 0.1;
    setPrice(newPrice.toFixed(1));
    setIsManualPrice(true);
  };

  const handleSliderChange = (e) => {
    const val = e.target.value;
    setSliderValue(val);
    const newQty = ((val / 100) * maxBTC).toFixed(4);
    setQuantity(newQty);
  };

  const validateAndConfirm = (side) => {
    const qty = parseFloat(quantity);
    if (!qty || qty === 0) return showError("Quantity is required");
    if (qty < 0.0001) return showError("Minimum quantity is 0.0001 BTC");

    setSelectedSide(side);
    setShowModal(true);

    dispatch(
      setOrderField({ price, quantity, orderType, effectiveTime, side })
    );
  };

  const submitTrade = async () => {
    setShowModal(false);
    const payload = { ...order };
    await showPromise(axiosInstance.post("/trade", payload), {
      loading: "Placing order...",
      success: "Order placed!",
      error: "Failed to place order",
    });
    dispatch(resetOrder());
    setQuantity("");
    setSliderValue(0);
  };

  const handleMarginModeChange = async () => {
    const newMode = marginMode === "Single" ? "Multi" : "Single";
    await showPromise(
      axiosInstance.post("/user/margin-mode", { mode: newMode }),
      {
        loading: "Switching mode...",
        success: `Switched to ${newMode}-Asset Mode`,
        error: "Failed to switch mode",
      }
    );
    dispatch(setMarginMode(newMode));
  };

  const renderPanel = () => (
    <>
      {/* Order Type */}
      <div className="flex justify-between text-xs">
        {["Limit", "Market", "Trigger"].map((type) => (
          <button
            key={type}
            onClick={() => setOrderType(type)}
            className={classNames(
              "pb-1",
              orderType === type
                ? "border-b-2 border-white font-semibold"
                : "text-gray-400"
            )}
          >
            {type}
          </button>
        ))}
      </div>
      {/* Available */}
      <div className="text-xs text-gray-400">
        Available <span className="float-right text-white">0.0000 USDT</span>
      </div>
      {/* Price */}
      <div className="flex items-center bg-[#0f0f0f] px-3 py-2 rounded overflow-hidden">
        <input
          type="number"
          value={price}
          onChange={(e) => {
            setIsManualPrice(true);
            setPrice(e.target.value);
          }}
          className="bg-transparent flex-1 min-w-0 text-[16px] font-semibold outline-none"
        />
        <div className="flex flex-col gap-[2px] ml-2">
          <button onClick={() => handlePriceChange("plus")}>+</button>
          <button onClick={() => handlePriceChange("minus")}>−</button>
        </div>
        <span className="text-[10px] text-yellow-300 ml-2">Last</span>
        <span className="text-[10px] text-gray-400 ml-1">USDT</span>
      </div>
      {/* Quantity */}
      <div className="space-y-1">
        <label className="text-[11px] text-gray-400">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full bg-[#0f0f0f] px-3 py-1.5 rounded outline-none text-sm"
          placeholder="0"
        />
      </div>
      {/* Slider */}
      <div>
        <input
          type="range"
          className="w-full accent-accent"
          min={0}
          max={100}
          value={sliderValue}
          onChange={(e) => {
            const val = e.target.value;
            setSliderValue(val);
            const newQty = ((val / 100) * maxBTC).toFixed(4); // assume maxBTC available
            setQuantity(newQty);
          }}
        />
        <div className="flex justify-between text-[10px] text-gray-500 mt-1">
          {["0%", "25%", "50%", "75%", "100%"].map((v) => (
            <span key={v}>{v}</span>
          ))}
        </div>
      </div>
      {/* TP/SL */}
      <div className="flex items-center gap-2">
        <input type="checkbox" id="tp" />
        <label htmlFor="tp" className="text-[11px] text-gray-300">
          TP / SL
        </label>
      </div>
      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          className="flex-1 bg-green-500 hover:bg-green-600 py-2 rounded text-sm font-semibold disabled:opacity-40"
          disabled={!price || !quantity}
          onClick={() => validateAndConfirm("long")} // instead of submitTrade
        >
          Open long
        </button>
        <button
          className="flex-1 bg-red-500 hover:bg-red-600 py-2 rounded text-sm font-semibold disabled:opacity-40"
          disabled={!price || !quantity}
          // In the Open Long / Open Short buttons
          onClick={() => validateAndConfirm("short")}
        >
          Open short
        </button>
      </div>
      {/* Cost/Max Info */}
      <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-400">
        {[1, 2].map((i) => (
          <div key={i}>
            <div className="flex justify-between">
              <span>Cost</span>
              <span className="text-white">0.0 USDT</span>
            </div>
            <div className="flex justify-between">
              <span>Max</span>
              <span className="text-white">0.0 BTC</span>
            </div>
          </div>
        ))}
      </div>
      {/* Effective Time Dropdown */}
      <div className="text-xs">
        <label className="block mb-1 text-gray-400">Effective Time</label>
        <div className="relative">
          <select
            className="w-full bg-[#0f0f0f] py-2 px-3 rounded appearance-none text-white"
            value={effectiveTime}
            onChange={(e) => setEffectiveTime(e.target.value)}
          >
            <option>GTC</option>
            <option>IOC</option>
            <option>FOK</option>
          </select>
          <ChevronDown className="absolute top-2.5 right-3 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
      {/* VIP Info */}
      <div className="bg-[#0f0f0f] p-3 rounded text-[11px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-[10px]">
            VIP
          </div>
          <span className="text-gray-400">VIP 0</span>
        </div>
        <div className="text-right">
          <div>
            Maker <span className="text-white">0.0000%</span>
          </div>
          <div>
            Taker <span className="text-white">0.0000%</span>
          </div>
        </div>
      </div>
      {/* Margin Info */}
      <div className="text-[11px] space-y-1">
        <div className="text-white font-semibold">Margin</div>
        <div className="text-gray-300">USDT · Cross</div>
        <div className="flex justify-between">
          <span className="text-gray-400">Margin Rate</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-white">0.0%</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Maintenance Margin</span>
          <span className="text-white">0.0</span>
        </div>
      </div>
      {/* Mode Button */}
      <button
        className="text-center py-2 border border-accent w-full block cursor-pointer"
        onClick={() => dispatch(setMarginModalOpen(true))}
      >
        {marginMode === "Single" ? "Single-Asset Mode" : "Multi-Assets Mode"}
      </button>
      {/* Asset & Info Section */}
      <div className="mt-4 text-[12px] space-y-2">
        <div className="flex justify-between font-semibold">
          <span>Assets</span>
          <span>USDT</span>
        </div>
        <div className="text-gray-400 space-y-1">
          <div className="flex justify-between">
            <span className="underline">Currency Equity</span>
            <span className="text-white">0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Available Margin</span>
            <span className="text-white">0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Position Margin</span>
            <span className="text-white">0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Unrealized PnL</span>
            <span className="text-white">0.0</span>
          </div>
          <div className="flex justify-between text-orange-500">
            <span>
              Futures Bonus{" "}
              <span className="bg-black border text-xs px-1 ml-1">💲</span>
            </span>
            <span>0.0</span>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <Link
            to={"/assets/deposit"}
            className="w-full border border-gray-600 py-1 rounded cursor-pointer text-center"
          >
            Deposit
          </Link>
          <button onClick={() => setIsTransferOpen(true)} className="w-full border border-gray-600 py-1 rounded cursor-pointer text-center">
            Transfer
          </button>
        </div>
        <div className="mt-4">
          <span className="font-semibold">Futures Information</span>{" "}
          <ChevronDown className="inline w-4 h-4 text-gray-400" />
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="text-white text-[12px] space-y-3">
        <div className="flex gap-2">
          <div className="flex-1 bg-black border border-gray-700 px-2 py-1.5 text-center rounded cursor-pointer">
            Cross
          </div>
          <div className="flex-1 flex justify-between items-center bg-black border border-gray-700 px-2 py-1.5 rounded">
            <span className="text-green-500">20X</span>
            <span className="text-red-500">20X</span>
          </div>
        </div>

        <Tab.Group>
          <Tab.List className="flex">
            {["Open", "Close"].map((label) => (
              <Tab key={label} as={Fragment}>
                {({ selected }) => (
                  <button
                    className={classNames(
                      "w-1/2 py-1.5 border text-xs",
                      selected
                        ? label === "Open"
                          ? "bg-green-500 text-white font-bold"
                          : "bg-red-500 text-white font-bold"
                        : "bg-transparent text-white border-gray-600"
                    )}
                  >
                    {label}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel className="space-y-3 pt-2">{renderPanel()}</Tab.Panel>
            <Tab.Panel className="space-y-3 pt-2">{renderPanel()}</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <ConfirmTradeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={submitTrade}
      />

      <AssetModeModal
        isOpen={useSelector((state) => state.trade.marginModalOpen)}
      />

      {/* TRANSFER MODAL */}
      <TransferModal
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
      />
    </>
  );
};

export default TradePanel;
