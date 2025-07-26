import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Smartphone,
  Mail,
  Lock,
  EyeOff,
  LogOut,
  Settings,
  Upload,
  ChevronDown,
  Copy,
  Eye,
  ChevronRight,
} from "lucide-react";
import useFetchLoggedInUser from "../../hooks/useFetchedLoggedInUser";
import { maskEmail } from "../../functions/helper";
import { showSuccess } from "../../utils/toast";
import { useState } from "react";
import WithdrawalSecurity from "./WithdrawalSecurity";
import SecurityLevelBar from "./SecurityLevelBar";

const Security = () => {
  const { user: fetchedUser, error, loading } = useFetchLoggedInUser();
  const email = fetchedUser?.message?.userDetails.email ?? "";
  const uid = fetchedUser?.message?.userDetails.uid ?? "";
  const is2FAEnabled = fetchedUser?.message?.userDetails.is2FAEnabled ?? "";
  const [showUID, setShowUID] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(uid);
    showSuccess("UID copied!");
  };
  const securityLevel = "low";
  return (
    <div className="p-4 md:p-8 text-white max-w-6xl">
      <div className="bg-[#111] p-4 md:p-6 rounded-lg border border-[#222] mb-6">
        <div className="flex items-center gap-4 mb-4">
          <img
            src="/user-icon.svg"
            alt="Profile"
            className="w-12 h-12 rounded-full border border-[#333]"
          />
          <div>
            <p className="font-semibold text-sm md:text-base">
              {maskEmail(email)}
            </p>
            <div>
              <span className="bg-green-700 text-xs px-2 py-1 rounded">
                Regular User
              </span>
              <p className="text-[14px] text-white/70 mt-2 flex items-center gap-3">
                <span>UID: {showUID ? uid : "*******"}</span>
                <div classname="inline-flex items-center gap-2">
                  <button
                    onClick={() => setShowUID(!showUID)}
                    className="cursor-pointer inline text-white hover:text-lime-400"
                  >
                    {showUID ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <Copy
                    onClick={handleCopy}
                    size={14}
                    className="ml-1 inline cursor-pointer text-white hover:text-lime-400"
                  />
                </div>
              </p>
            </div>
          </div>
        </div>

        <SecurityLevelBar level={securityLevel} />
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Verification Methods</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-[#1A1A1A] hover:bg-black/80 transition-all duration-300 p-4 rounded-lg border border-[#333]">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-lime-400" />
              <div>
                <p className="font-semibold text-sm">Google Authenticator</p>
                <p className="text-xs text-white/35">
                  Protect your account and transactions.
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              {is2FAEnabled && (
                <Link
                  to={"/account/security/bind-google-auth"}
                  className="text-stone-400 border border-stone-400 text-xs px-3 py-1 rounded"
                >
                  Disable
                </Link>
              )}
              <Link
                to={"/account/security/bind-google-auth"}
                className="text-lime-400 border border-lime-400 text-xs px-3 py-1 rounded"
              >
                Set up
              </Link>
            </div>
          </div>

          <div className="flex justify-between items-center bg-[#1A1A1A] hover:bg-black/80 transition-all duration-300 p-4 rounded-lg border border-[#333]">
            <div className="flex items-center gap-3">
              <Smartphone className="text-lime-400" />
              <div>
                <p className="font-semibold text-sm">Mobile Verification</p>
                <p className="text-xs text-white/35">
                  Protect your account and transactions.
                </p>
              </div>
            </div>
            <Link
              to={"/account/security/bind-mobile"}
              className="text-lime-400 border border-lime-400 text-xs px-3 py-1 rounded"
            >
              Set up
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row justify-between lg:items-center bg-[#1A1A1A] hover:bg-black/80 transition-all duration-300 p-4 rounded-lg border border-[#333]">
            <div className="flex items-center gap-3">
              <Mail className="text-lime-400" />
              <div>
                <p className="font-semibold text-sm">Email Verification</p>
                <p className="text-white/35 text-xs">
                  Protect your account and transactions.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
              <span>{maskEmail(email)} |</span>
              <Link
                to="/account/security/modify-email"
                className="text-lime-400 hover:text-lime-300 cursor-pointer "
              >
                Change
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Password</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-[#1A1A1A] hover:bg-black/80 transition-all duration-300 p-4 rounded-lg border border-[#333]">
            <div className="flex items-center gap-3">
              <Lock className="text-lime-400" />
              <div>
                <p className="font-semibold text-sm">Login Password</p>
                <p className="text-xs text-white/35">Protect your account</p>
              </div>
            </div>
            <Link
              to="/account/security/modify-password"
              className="text-lime-400 text-xs underline cursor-pointer"
            >
              Change
            </Link>
          </div>

          <div className="flex justify-between items-center bg-[#1A1A1A] hover:bg-black/80 transition-all duration-300 p-4 rounded-lg border border-[#333]">
            <div className="flex items-center gap-3">
              <EyeOff className="text-lime-400" />
              <div>
                <p className="font-semibold text-sm">Anti-Phishing Code</p>
                <p className="text-xs text-white/35">
                  Included in all official Cashtradepro emails.
                </p>
              </div>
            </div>
            <Link
              to={"/account/security/set-phish-code"}
              className="text-lime-400 border cursor-pointer border-lime-400 text-xs px-3 py-1 rounded"
            >
              Set up
            </Link>
          </div>
        </div>
      </div>

      <WithdrawalSecurity />

      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Account Activity</h2>
        <div className="space-y-4">
          <Link
            to="/account/security/device-management"
            className="flex justify-between items-center bg-[#1A1A1A] hover:bg-black/80 transition-all duration-300 p-4 rounded-lg border border-[#333]"
          >
            <div className="flex items-center gap-3">
              <Settings className="text-lime-400" />
              <div>
                <p className="font-semibold text-sm">Device Management</p>
                <p className="text-xs text-white/35">
                  Manage authorized devices
                </p>
              </div>
            </div>
            <ChevronRight className="text-lime-400 hover:text-lime-300 size-6" />
          </Link>

          <button className="w-full flex justify-between items-center bg-[#1A1A1A] hover:bg-black/80 transition-all duration-300 p-4 rounded-lg border border-[#333]">
            <div className="flex items-center gap-3">
              <LogOut className="text-lime-400" />
              <div>
                <p className="font-semibold text-sm text-left">
                  Account Activity
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-xs text-white/35">Suspicious activity?</p>
                  <Link
                    to="/account/security/disable-account"
                    className="text-xs text-lime-400 underline"
                  >
                    Disable account
                  </Link>
                </div>
              </div>
            </div>
            <Link to="/account/security/account-activity">
              <ChevronRight className="text-lime-400 hover:text-lime-300 size-6" />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Security;
