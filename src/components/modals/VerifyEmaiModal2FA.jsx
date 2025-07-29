import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyLoginOtp } from "../../redux/auth/authThunk";
import { verifyEmailOtp } from "../../redux/auth/authThunk"; 
import { Toaster } from "react-hot-toast";

const VerifyEmailModal2FA = ({
  isOpen,
  setIsOpen,
  userEmail,
  onResend,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.verifyLoading);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const createdAt = new Date().toISOString();

  useEffect(() => {
    if (!isOpen) {
      setOtp("");
      setCooldown(0);
    }
  }, [isOpen]);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleVerify = async () => {
    const otp = otpArray.join("");
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    setError("");

    try {
      await dispatch(
        verifyEmailOtp({ email: userEmail, otp, createdAt, navigate })
      ).unwrap();

      // ✅ Trigger callback after successful email OTP verification
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Email OTP verification failed:", err);
      setError("Verification failed. Please try again.");
    }
  };

  const handleResend = () => {
    if (cooldown === 0) {
      onResend();
      setCooldown(60);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsOpen(true)}
      >
        <Toaster position="top-center" />
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70" />
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
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                <Dialog.Title className="text-xl font-bold text-black mb-2">
                  Security Verification
                </Dialog.Title>

                <div className="border-t border-gray-200 mb-4" />

                <p className="text-sm text-gray-800 mb-4">
                  Email Verification (
                  {userEmail.replace(
                    /(.{2})(.*)(@.*)/,
                    (_, a, b, c) => a + "*".repeat(b.length) + c
                  )}
                  )
                </p>

                {/* OTP input with Get Code */}
                <div className="relative mb-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    className="w-full py-3 pl-4 pr-24 border rounded-md text-gray-900 text-sm bg-gray-100 focus:outline-none"
                    placeholder="Enter code"
                  />
                  <button
                    type="button"
                    disabled={cooldown > 0}
                    onClick={handleResend}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm font-medium text-black bg-transparent disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    {cooldown > 0 ? `Resend in ${cooldown}s` : "Get code"}
                  </button>
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={otp.length < 6 || loading}
                  className={`w-full py-3 rounded-md font-medium text-white ${
                    otp.length < 6
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-black hover:bg-gray-900"
                  }`}
                >
                  {loading ? "Verifying..." : "Verify"}
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default VerifyEmailModal2FA;
