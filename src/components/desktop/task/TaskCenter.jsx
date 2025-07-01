import React, { useState } from "react";
import bgImage from "/mobile/task-img.webp"; // Make sure the path is correct
import mysteryBox from "/mystery-box.webp"; // Add this icon to match image
import { Link } from "react-router-dom";

const rewards = [
  "Up to 20 USDT",
  "Up to 30 USDT",
  "Up to 50 USDT",
  "Up to 100 USDT",
  "Up to 200 USDT",
];

const TaskCenter = () => {
  const [tab, setTab] = useState("in-progress");

  return (
    <div
      className="min-h-screen bg-cover text-white px-4 py-10"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-1">Task Center</h1>
        <p className="text-gray-400 mb-6">
          Complete daily tasks to unlock amazing rewards!
        </p>
        {/* Tabs */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            className={`text-sm font-semibold ${
              tab === "in-progress" ? "text-lime-400" : "text-gray-400"
            }`}
            onClick={() => setTab("in-progress")}
          >
            In Progress
          </button>
          <span className="text-gray-600">|</span>
          <button
            className={`text-sm font-semibold ${
              tab === "completed" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setTab("completed")}
          >
            Completed
          </button>
        </div>
        {/* In Progress Content */}
        {tab === "in-progress" && (
          <div className="space-y-6">
            {/* 1. Dual Box: First Futures Trade + First-Time Deposit */}
            <div className="grid md:grid-cols-2 gap-6">
              {["First Futures Trade", "First-Time Deposit"].map(
                (title, idx) => (
                  <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 hover:border-lime-400 transition duration-200">
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Complete{" "}
                      {title === "First Futures Trade"
                        ? "any futures trade of any amount"
                        : "a net deposit of 100 USDT within the period"}{" "}
                      to unlock rewards up to 20 USDT.
                    </p>
                    <div className="flex items-center justify-between bg-zinc-800 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <img src={mysteryBox} className="size-20" alt="box" />
                        <div>
                          <div className="text-xl font-bold">Up to 20 USDT</div>
                          <div className="text-xs text-gray-400">
                            Futures Bonus Mystery Box
                          </div>
                        </div>
                      </div>
                      <Link
                        to={
                          title === "First Futures Trade"
                            ? "/contract-trade/BTC-USDT"
                            : "/assets/deposit"
                        }
                        className="border border-white rounded px-4 py-2 text-sm hover:bg-white hover:text-black transition"
                      >
                        {title === "First Futures Trade"
                          ? "Trade now"
                          : "Deposit now"}
                      </Link>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* 2. Futures Volume Challenge */}
            <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 hover:border-lime-400 transition duration-200">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">
                  🔥 Futures Volume Challenge{" "}
                  <span className="text-lime-400 text-sm ml-2 underline cursor-pointer">
                    Rules →
                  </span>
                </h3>
                <Link
                  to={"/contract-trade/BTC-USDT"}
                  className="border border-white rounded px-4 py-1 text-sm hover:bg-white hover:text-black"
                >
                  Trade now
                </Link>
              </div>
              <p className="text-sm text-gray-400">
                The more you trade, the more rewards you can win—up to 409,950
                USDT in total, plus chances to win a Tesla, Rolex, and other
                prizes!
              </p>
              <div className="flex flex-wrap justify-between gap-2 mt-6">
                {rewards.map((reward, idx) => (
                  <div
                    key={idx}
                    className="flex-1 min-w-[120px] bg-zinc-800 p-3 rounded text-center text-xs"
                  >
                    <img src={mysteryBox} className="mx-auto w-6 mb-1" />
                    <div className="font-semibold">{reward}</div>
                    <div className="text-gray-500 text-[11px]">
                      Mystery Box Rewards
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Current Trading Volume:{" "}
                <span className="text-white">0.00 USDT</span>; Reach 10,000 USDT
                in trading volume to unlock another mystery box reward worth up
                to 20 USDT!
              </p>
            </div>

            {/* 3. 24-Week Check-In Challenge */}
            <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 hover:border-lime-400 transition duration-200">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">
                  🔥 24-Week Trading Check-In Challenge{" "}
                  <span className="text-lime-400 text-sm ml-2 underline cursor-pointer">
                    Rules →
                  </span>
                </h3>
                <Link
                  to={"/contract-trade/BTC-USDT"}
                  className="border border-white rounded px-4 py-1 text-sm hover:bg-white hover:text-black"
                >
                  Trade now
                </Link>
              </div>
              <p className="text-sm text-gray-400">
                Achieve a weekly futures volume ≥ 20,000 USDT to complete weekly
                check-in. Check in for 24 weeks for a chance to win an iPhone!
              </p>
              <div className="flex flex-wrap justify-between gap-2 mt-6">
                {[
                  "Up to 10 USDT",
                  "Up to 10 USDT",
                  "Up to 50 USDT",
                  "Up to 200 USDT",
                ].map((reward, idx) => (
                  <div
                    key={idx}
                    className="flex-1 min-w-[120px] bg-zinc-800 p-3 rounded text-center text-xs"
                  >
                    <img src={mysteryBox} className="mx-auto w-6 mb-1" />
                    <div className="font-semibold">{reward}</div>
                    <div className="text-gray-500 text-[11px]">
                      Mystery Box Rewards
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Consecutive Check-in Weeks:{" "}
                <span className="text-white">0 weeks</span>
              </p>
            </div>
          </div>
        )}
        {/* Completed Tab */}
        {tab === "completed" && (
          <div className="text-gray-400 text-center py-20">
            No completed tasks yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCenter;
