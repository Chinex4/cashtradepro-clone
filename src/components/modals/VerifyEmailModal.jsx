import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyEmailOtp } from "../../redux/auth/authThunk"; 
import { Toaster } from "react-hot-toast";

const VerifyEmailModal = ({ isOpen, setIsOpen, userEmail, onResend }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.verifyLoading);
  const [otpArray, setOtpArray] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(100);
  const createdAt = new Date().toLocaleString("en-US", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  useEffect(() => {
    if (!isOpen) setOtpArray(new Array(6).fill(""));
  }, [isOpen]);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otpArray];
    newOtp[index] = value;
    setOtpArray(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otp = otpArray.join("");
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit code");
      return;
    }
    setError("");
    await dispatch(
      verifyEmailOtp({ email: userEmail, otp, createdAt, navigate })
    ).unwrap();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50'
        onClose={() => setIsOpen(true)}
      >
        <Toaster position='top-center' />
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-70' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-xl bg-black p-6 text-left align-middle shadow-xl transition-all'>
                <div className='flex items-center gap-2 mb-6'>
                  <Dialog.Title
                    as='h3'
                    className='text-xl font-bold text-white'
                  >
                    Verification
                  </Dialog.Title>
                </div>

                <p className='text-sm text-gray-300 mb-1'>
                  We have sent a message containing a{" "}
                  <span className='font-semibold text-white'>
                    6-digit verification code
                  </span>{" "}
                  to:{" "}
                  <span className='text-white underline'>
                    {userEmail.replace(
                      /(.{2})(.*)(@.*)/,
                      (_, a, b, c) => a + "*".repeat(b.length) + c
                    )}
                  </span>
                </p>
                <p className='text-xs text-gray-400 mb-6'>
                  If you can't find the verification code from [Cashtradepro] in your
                  inbox, please check your spam folder and move it back to the
                  inbox.
                </p>

                {/* OTP Inputs */}
                <div className='flex justify-between gap-2 mb-3'>
                  {otpArray.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (inputRefs.current[idx] = el)}
                      type='text'
                      inputMode='numeric'
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/, "");
                        handleChange(idx, val);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace") {
                          if (otpArray[idx]) {
                            const newOtp = [...otpArray];
                            newOtp[idx] = "";
                            setOtpArray(newOtp);
                          } else if (idx > 0) {
                            inputRefs.current[idx - 1]?.focus();
                          }
                        }
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        const paste = e.clipboardData
                          .getData("text")
                          .replace(/\D/g, "")
                          .slice(0, 6);
                        if (paste.length) {
                          const newOtp = [...otpArray];
                          for (let i = 0; i < 6; i++) {
                            newOtp[i] = paste[i] || "";
                          }
                          setOtpArray(newOtp);
                          const nextIndex = paste.length >= 6 ? 5 : paste.length;
                          inputRefs.current[nextIndex]?.focus();
                        }
                      }}
                      className='w-12 h-14 text-center text-white text-xl bg-[#121212] border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400'
                    />
                  ))}
                </div>

                {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}

                {/* Resend */}
                <div className='text-left text-sm mb-6 text-gray-400'>
                  {cooldown > 0 ? (
                    <>Resend {cooldown}s</>
                  ) : (
                    <button
                      onClick={() => {
                        if (cooldown === 0) {
                          onResend();
                          setCooldown(100);
                        }
                      }}
                      className='text-lime-400 hover:underline'
                    >
                      Resend
                    </button>
                  )}
                </div>

                {/* Submit */}
                <button
                  type='button'
                  onClick={handleVerify}
                  disabled={otpArray.some((d) => d.trim() === "") || loading}
                  className={`w-full py-3 rounded-md font-medium transition ${
                    otpArray.some((d) => d.trim() === "")
                      ? "bg-lime-400/30 text-black cursor-not-allowed"
                      : "bg-lime-400 hover:bg-lime-500 text-black"
                  }`}
                >
                  {loading ? (
                    <div className='flex items-center justify-center gap-2'>
                      <svg
                        className='animate-spin h-4 w-4 text-black'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                        ></circle>
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8v8H4z'
                        ></path>
                      </svg>
                      Verifying...
                    </div>
                  ) : (
                    "Access Cashtradepro"
                  )}
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default VerifyEmailModal;
