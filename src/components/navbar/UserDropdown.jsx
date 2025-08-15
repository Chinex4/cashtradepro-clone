import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Copy, Eye, EyeOff } from "lucide-react";
import { maskEmail } from "../../functions/helper";

const UserDropdown = ({
  handleLogout,
  handleCopy,
  email,
  uid,
  showUID,
  setShowUID,
  selectedImage = "/avatar/a1.png", // Default image if not provided
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown and trigger navigation
  const handleClose = (callback) => () => {
    setIsOpen(false);
    callback?.();
  };

  return (
    <div ref={dropdownRef} className="relative hidden md:block">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="btn btn-ghost btn-sm"
      >
        <img src={selectedImage} alt="User" className="size-4 rounded-full" />
      </button>

      {isOpen && (
        <ul className="absolute right-0 mt-2 p-4 space-y-4 shadow border border-stone-800 bg-[#121212] text-white rounded-box w-72 z-50">
          {/* User Header */}
          <li className="flex gap-3 items-center">
            <img
              src={selectedImage}
              alt="user"
              className="size-9 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold">{maskEmail(email)}</p>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400">
                <span>UID {showUID ? uid : "*******"}</span>
                <button
                  onClick={() => setShowUID(!showUID)}
                  className="text-white hover:text-emerald-400"
                >
                  {showUID ? <EyeOff size={12} /> : <Eye size={12} />}
                </button>
                <button
                  onClick={() => {
                    handleCopy();
                    setIsOpen(false);
                  }}
                  className="text-white hover:text-emerald-400"
                >
                  <Copy size={12} />
                </button>
              </div>
            </div>
          </li>

          {/* VIP Badge */}
          <li>
            <Link
              to="/service/vipservice"
              onClick={handleClose()}
              className="flex justify-between items-center bg-[#1d1d1f] border border-white/10 rounded-md px-3 py-2"
            >
              <span className="text-white/80 font-semibold">VIP 0</span>
              <img src="/vip.svg" alt="vip-badge" className="size-6" />
            </Link>
          </li>

          <hr className="border-gray-700 my-2" />

          <li>
            <Link to="/dashboard" onClick={handleClose()}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/assets/rewards" onClick={handleClose()}>
              My Rewards
            </Link>
          </li>
          <li className="flex items-center justify-between">
            <Link to="/account/security" onClick={handleClose()}>
              Security
            </Link>
            <span className="w-2 h-2 bg-red-500 rounded-full" />
          </li>
          <li>
            <Link to="/account/identity-verification" onClick={handleClose()}>
              Verification
            </Link>
          </li>
          <li>
            <Link to="/referral" onClick={handleClose()}>
              Referral Hub
            </Link>
          </li>
          <li>
            <Link to="/account/settings" onClick={handleClose()}>
              Settings
            </Link>
          </li>
          <li>
            <Link to="/api" onClick={handleClose()}>
              API
            </Link>
          </li>

          <hr className="border-gray-700 my-2" />

          <li>
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="text-red-400 hover:text-red-300 w-full text-left"
            >
              Log out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserDropdown;
