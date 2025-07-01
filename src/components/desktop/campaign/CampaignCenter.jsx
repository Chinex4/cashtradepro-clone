import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import campaignTrophy from "/mobile/act-center.webp";
import campaignImg1 from "/campaigns/campaign-1.webp";
import campaignImg2 from "/campaigns/campaign-2.webp";

const ongoingCampaigns = [
  {
    id: 1,
    title: "Trade Futures, Win Big! Up to $225,000",
    subtitle:
      "New Users Enjoy Double Pools, Existing Users Join the Festivities!",
    endTime: "2025/07/07",
    image: campaignImg1,
    highlight: "$225,000",
  },
];

const pastCampaigns = [
  {
    id: 2,
    title: `Bitunix Valentine's Day Special Event – Romance Blitz`,
    endTime: "2025/02/19",
    image: campaignImg2,
    icon: "📢",
  },
];

const CampaignCard = ({ campaign, icon, highlight }) => (
  <div className="relative overflow-hidden rounded-xl shadow-md">
    <img src={campaign.image} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
      <div className="text-xs text-white mb-1">
        {icon && <span className="mr-1">{icon}</span>}
        {campaign.subtitle || campaign.title}
      </div>
      <h3 className="text-xl font-bold">
        {icon && <span className="mr-1">{icon}</span>}
        {campaign.title.includes(highlight) ? (
          <span>
            {campaign.title.split(highlight)[0]}
            <span className="text-lime-400">{highlight}</span>
            {campaign.title.split(highlight)[1]}
          </span>
        ) : (
          campaign.title
        )}
      </h3>
      {campaign.subtitle && (
        <p className="text-sm text-white mt-1">{campaign.subtitle}</p>
      )}

      <div className="flex items-center justify-between text-xs text-white/80 mt-3">
        <div className="flex items-center gap-1">
          <Clock size={14} />
          End Time: {campaign.endTime}
        </div>
        <Link
          to="/"
          className="font-semibold hover:underline flex items-center gap-1"
        >
          Learn More →
        </Link>
      </div>
    </div>
  </div>
);

const CampaignCenter = () => {
  const [activeTab, setActiveTab] = useState("ongoing");
  const isAuthenticated = !!localStorage.getItem("accessToken");

  return (
    <div
      className="bg-black text-white px-4 py-10 md:py-24 flex items-center justify-center bg-cover"
      style={{ backgroundImage: `url(${campaignTrophy})` }}
    >
      <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-10 items-center">
        {/* Left Section */}
        <div className="w-full lg:w-[45%]">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Campaign Center
          </h1>
          <p className="text-gray-400 mb-6">
            Enter the campaign, receive rewards and start your crypto journey!
          </p>

          {/* Tabs */}
          <div className="flex items-center space-x-4 mb-8">
            <button
              className={`text-sm font-semibold ${
                activeTab === "ongoing" ? "text-lime-400" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("ongoing")}
            >
              Ongoing Campaigns
            </button>
            <span className="text-gray-500">|</span>
            <button
              className={`text-sm font-semibold ${
                activeTab === "past" ? "text-lime-400" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("past")}
            >
              Past Campaigns
            </button>
          </div>

          {/* Content Area */}
          {isAuthenticated ? (
            <div className="space-y-6">
              {activeTab === "ongoing" &&
                ongoingCampaigns.map((c) => (
                  <CampaignCard
                    key={c.id}
                    campaign={c}
                    highlight={c.highlight}
                  />
                ))}

              {activeTab === "past" &&
                pastCampaigns.map((c) => (
                  <CampaignCard key={c.id} campaign={c} icon={c.icon} />
                ))}
            </div>
          ) : (
            <div className="text-center md:text-left">
              <p className="text-sm font-semibold mb-1">
                Exciting activities are happening all around!
              </p>
              <p className="text-gray-400 mb-4">Log in and enter now!</p>
              <button className="border border-white rounded-full px-5 py-2 text-sm hover:bg-white hover:text-black transition">
                Log in
              </button>
            </div>
          )}
        </div>

        {/* Right Image Section */}
        {/* <div className="w-full lg:w-[50%] flex justify-center">
          <img
            src={campaignTrophy}
            alt="Trophy"
            className="w-full max-w-[500px] rounded-lg"
          />
        </div> */}
      </div>
    </div>
  );
};

export default CampaignCenter;
