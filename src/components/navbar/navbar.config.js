// components/navbar/navbar.config.js
import { RiP2pFill } from "react-icons/ri";
import { BsWallet } from "react-icons/bs";
import { TbTargetArrow } from "react-icons/tb";
import {
  MdOutlineCurrencyExchange,
  MdScreenSearchDesktop,
} from "react-icons/md";

export const navLinks = [
  {
    name: "Buy Crypto",
    dropdown: true,
    dropdownItems: [
      { text: "P2P Trading", path: "/p2p/p2p-trading", icon: RiP2pFill },
      { text: "Third Party", path: "/trade/third-party", icon: BsWallet },
    ],
  },
  {
    name: "Markets",
    dropdown: true,
    dropdownItems: [
      {
        text: "Opportunities",
        path: "/markets/opportunities",
        icon: TbTargetArrow,
      },
      { text: "Marketplace", path: "/markets", icon: MdScreenSearchDesktop },
    ],
  },
  { name: "Futures", path: "/contract-trade/BTC-USDT", dropdown: false },
  {
    name: "Convert",
    dropdown: true,
    dropdownItems: [
      {
        text: "Convert",
        path: "/flash-exchange",
        icon: MdOutlineCurrencyExchange,
      },
    ],
  },
  {
    name: "Earn",
    dropdown: true,
    dropdownItems: [
      {
        text: "Flexible/Fixed Term",
        path: "/earn/financial-management",
        icon: MdOutlineCurrencyExchange,
      },
    ],
    badge: "NEW",
  },
  { name: "Copy Trading", path: "/copy-trading/square" },
  { name: "Campaign Center", path: "/activity/act-center", badge: "NEW" },
  { name: "Task Center", path: "/activity/task-center", badge: "NEW" },
  { name: "Referral", path: "/referral" },
];

export const notifications = [
  {
    id: 1,
    type: "New Listings",
    title: "🔥 Civic (CVC) Gets Listed on Bitunix!",
    content:
      "The CVC/USDT trading pair will be available on both the spot and perpetual futures markets…",
    date: "2025-05-16 10:32:30",
  },
  {
    id: 2,
    type: "Latest",
    title: "Notice on Adjustment to Risk Limits of BABY/USDT Perpetual…",
    content:
      "Bitunix will update the risk limits for BABY/USDT perpetual futures trading pair at 10:00 on May 16, 2025 (UTC)…",
    date: "2025-05-16 08:58:55",
  },
  {
    id: 3,
    type: "New Listings",
    title: "🚀 NEXPACE (NXPC) Gets Listed on Bitunix!",
    content:
      "The NXPC/USDT trading pair will be available on both the spot and perpetual futures markets…",
    date: "2025-05-15 08:54:55",
  },
  {
    id: 4,
    type: "New Listings",
    title: "📢 Privasea AI (PRAI) Gets Listed on Bitunix!",
    content:
      "Privasea AI (PRAI) is getting listed with the PRAI/USDT trading pair on the spot market…",
    date: "2025-05-15 08:37:52",
  },
  {
    id: 5,
    type: "Price Alert",
    title: "🔔 BTC crossed $70,000!",
    content: "Bitcoin price surged past $70,000. Check your portfolio now!",
    date: "2025-05-15 07:25:00",
  },
];
