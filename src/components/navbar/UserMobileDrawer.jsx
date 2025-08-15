import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Copy, X, PauseCircle } from "lucide-react";
import { maskEmail } from "../../functions/helper";
import { useState } from "react";
const UserMobileDrawer = ({
  isUserOpen,
  setIsUserOpen,
  isAuthenticated,
  email,
  uid,
  showUID,
  setShowUID,
  showBalance,
  setShowBalance,
  selectedCurrency,
  setSelectedCurrency,
  handleCopy,
  handleLogout,
}) => {
  if (!isUserOpen || !isAuthenticated) return null;
  // const [email] = useState('astauchiha234@gmail.com')

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className='fixed top-0 right-0 h-full w-full md:w-72 bg-black text-white p-4 z-50 lg:hidden overflow-y-auto no-scrollbar'
    >
      <div className='flex justify-between items-center mb-6'>
        <Link
          to='/'
          className='text-lime-400 font-bold text-xl italic flex items-center gap-1'
          onClick={() => setIsUserOpen(false)}
        >
          <div className='bg-lime-400 rounded-full p-1'></div> Cashtradepro
        </Link>
        <button onClick={() => setIsUserOpen(false)}>
          <X size={24} />
        </button>
      </div>

      <ul className='flex flex-col gap-4'>
        <li className='flex gap-3 items-center'>
          <img
            src='/user-icon.svg'
            alt='user'
            className='size-9 rounded-full'
          />
          <div>
            <p className='text-sm font-semibold'>{maskEmail(email)}</p>
            <div className='flex items-center gap-2 mt-1 text-[11px] text-gray-400'>
              <span>UID {showUID ? uid : "*******"}</span>
              <button
                onClick={() => setShowUID(!showUID)}
                className='text-white hover:text-emerald-400'
              >
                {showUID ?
                  <EyeOff size={12} />
                : <Eye size={12} />}
              </button>
              <button
                onClick={handleCopy}
                className='text-white hover:text-emerald-400'
              >
                <Copy size={12} />
              </button>
            </div>
          </div>
        </li>

        <li>
          <Link
            to='/service/vipservice'
            onClick={() => setIsUserOpen(false)}
            className='flex justify-between items-center bg-[#1d1d1f] border border-white/10 rounded-md px-3 py-2'
          >
            <span className='text-white/80 font-semibold'>VIP 0</span>
            <img src='/vip.svg' alt='vip-badge' className='size-6' />
          </Link>
        </li>

        <li className='hover:bg-[#121212]/80 px-4 py-3'>
          <Link
            to='/assets/overview'
            className='block'
            onClick={() => setIsUserOpen(false)}
          >
            <div className='flex justify-between items-center'>
              <p className='font-semibold flex gap-2 items-center'>
                <img src='/assetss.svg' alt='' />
                <span>Total Assets</span>
              </p>
              <button
                type='button'
                onClick={(e) => {
                  e.preventDefault();
                  setShowBalance((prev) => !prev);
                }}
              >
                {showBalance ?
                  <Eye size={16} className='text-gray-400' />
                : <EyeOff size={16} className='text-gray-400' />}
              </button>
            </div>
            <p className='text-2xl mb-2 flex items-center gap-2'>
              {showBalance ? "0" : "****"}
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className='text-sm bg-[#121212] text-white border-none rounded outline-none'
              >
                <option value='USDT'>USDT</option>
                <option value='BTC'>BTC</option>
              </select>
            </p>
            <p className='text-xs text-white/30'>=A$0.00</p>
          </Link>
        </li>

        {/* <li className='flex items-center gap-4 w-full'>
          <Link
            to='/activity/act-center'
            onClick={() => setIsUserOpen(false)}
            className='btn btn-sm border flex-1 border-neutral/20 mb-2'
          >
            Campaign Center
          </Link>
          <Link
            to='/activity/task-center'
            onClick={() => setIsUserOpen(false)}
            className='btn btn-sm border flex-1 border-neutral/20 mb-2'
          >
            Task Center
          </Link>
        </li> */}

        {[
          { path: "/dashboard", label: "Dashboard" },
        ].map(({ path, label, percentage }) => (
          <li key={path}>
            <Link
              to={path}
              onClick={() => setIsUserOpen(false)}
              className='flex justify-between'
            >
              <span>{label}</span>
            </Link>
          </li>
        ))}

        <li>
          <button className='text-red-400' onClick={handleLogout}>
            Log out
          </button>
        </li>
      </ul>
    </motion.div>
  );
};

export default UserMobileDrawer;
