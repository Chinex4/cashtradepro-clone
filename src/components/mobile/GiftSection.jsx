import React from "react";
import {
  FaCopy,
  FaUserFriends,
  FaBullhorn,
  FaTasks,
  FaUsers,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TradeNowButton from "../ui/TradeNowButton";
import SmallTradeNowButton from "../ui/SmallTradeNowButton";

const GiftsSection = () => {
  const quickActions = [
    {
      label: "Copy",
      path: "/copy-trading/square",
      icon: <img className='size-8' src='/mobile/copyy.webp' alt='copyy' />,
    },
    {
      label: "Invite",
      path: "/referral",
      icon: <img className='size-8' src='/mobile/invite.webp' alt='invite' />,
    },
    {
      label: "Campaign",
      path: "/activity/act-center",
      icon: (
        <img className='size-8' src='/mobile/campaign.webp' alt='campaign' />
      ),
    },
    {
      label: "Task",
      path: "/activity/task-center",
      icon: <img className='size-8' src='/mobile/task.webp' alt='task' />,
    },
    // { label: 'Community', path: '/copy-traing/square', icon: <FaUsers size={20} /> },
  ];

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = !!user;

  return (
    <section className='bg-black pt-6 pb-12 px-4 flex flex-col items-center overflow-hidden'>
      {/* Top Logo/Graphic Placeholder */}
      <div>
        <img
          width={150}
          src='https://static.Cashtradepro.com/web/Cashtradepro-assets/homeindex-guide-banner2.CPBBsizT.svg'
          alt=''
        />
      </div>
      {/* Main Heading */}
      <h1 className='text-white text-2xl font-bold mb-2 text-center'>
        $5,500 Newcomers Gifts
      </h1>

      {/* Subtitle link */}
      <Link
        to='/assets/rewards'
        className='text-lime-400 text-sm underline mb-6 hover:text-lime-500 transition'
      >
        Unlock Newcomers Rewards
      </Link>

      {isAuthenticated ?
        <div className="mb-4">
          <SmallTradeNowButton />
        </div>
      : <Link to='/login'>
          <button className='bg-lime-400 hover:bg-lime-500 text-black font-semibold py-3 px-8 rounded-full text-sm mb-8'>
            Sign up / Log in
          </button>
        </Link>
      }

      {/* Quick Actions */}
      <div className='grid grid-cols-4 gap-4 max-w-xs'>
        {quickActions.map((action, index) => (
          <Link
            to={action.path}
            key={index}
            className='flex flex-col items-center gap-1 text-gray-400 hover:text-lime-400 transition'
          >
            <div className='p-2 bg-[#121212] rounded-full'>{action.icon}</div>
            <span className='text-xs'>{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Slower spin animation */}
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default GiftsSection;
