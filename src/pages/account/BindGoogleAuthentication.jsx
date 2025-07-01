import React, { useState, Fragment, useEffect } from "react";
import { ChevronLeft, Check } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { showSuccess } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import GoBack from "../../components/ui/GoBack";
import { Dialog, Transition } from "@headlessui/react";
import axiosInstance from "../../api/axiosInstance";

const BindGoogleAuthenticator = () => {
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState("");
  const [secret, setSecret] = useState("");

  useEffect(() => {
    axiosInstance.get("/generate-2fa").then((res) => {
      setSecret(res.data.message.secret); // Optionally show or store for backup
    });
  }, []);
  const qrValue = `otpauth://totp/YourAppName?secret=${secret}&issuer=YourApp`;

  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(secret).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
    showSuccess("Backup Key Copied");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code) return;
    setIsModalOpen(true);
  };

  const confirmVerification = async () => {
    setIsVerifying(true);
    try {
      const res = await axiosInstance.post("/2fa/verify", { token: code });
      if (res.data.success) {
        setVerifyMessage("✅ Code verified successfully!");
        showSuccess("Google Authenticator linked!");
        setTimeout(() => {
          setIsModalOpen(false);
          navigate("/dashboard"); // or wherever appropriate
        }, 2000);
      } else {
        setVerifyMessage("❌ Invalid verification code.");
      }
    } catch (err) {
      console.error(err);
      setVerifyMessage("❌ Error verifying the code.");
    }
    setIsVerifying(false);
  };

  return (
    <div className='max-w-3xl mx-auto text-white px-4 py-8'>
      {/* Header */}
      <GoBack />
      <h2 className='text-2xl lg:text-3xl font-semibold mb-2'>
        Bind Google Authenticator
      </h2>

      {/* Step 1 */}
      <div className='mb-6'>
        <h3 className='font-semibold mb-2'>1. Download Google Authenticator</h3>
        <p className='text-sm text-gray-300 mb-3'>
          iOS: search "Authenticator" in the App Store to download
          <br />
          Android: Search "Google Authenticator" in the App Store or browser.
        </p>
        <div className='flex gap-4'>
          <a
            href='https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2'
            target='_blank'
            rel='noopener noreferrer'
            className='border border-gray-600 rounded-md px-4 py-2'
          >
            ▶ Google Play
          </a>
          <a
            href='https://apps.apple.com/app/google-authenticator/id388497605'
            target='_blank'
            rel='noopener noreferrer'
            className='border border-gray-600 rounded-md px-4 py-2'
          >
             App Store
          </a>
        </div>
      </div>

      {/* Step 2 */}
      <div className='mb-6'>
        <h3 className='font-semibold mb-2'>2. Configure and backup the key.</h3>
        <p className='text-sm text-gray-300 mb-2'>
          Open Google Authenticator and scan the QR code or manually enter the
          key below to add the verification token.
        </p>
        <p className='text-sm text-red-500 font-medium mb-3'>
          In case you lose Google Authenticator, you can recover it using the
          provided key. Keep the key safe and do not share it with anyone.
        </p>
        <div className='flex items-center gap-3 mb-2'>
          <QRCodeCanvas value={qrValue} size={128} />
          <div>
            <p className='mt-3 font-semibold'>{secret}</p>
            <button
              onClick={handleCopy}
              className='text-green-400 text-sm mt-1 flex items-center gap-1'
            >
              {copied ?
                <>
                  <Check className='w-4 h-4' /> Copied
                </>
              : "Copy the key"}
            </button>
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div>
        <h3 className='font-semibold mb-2'>
          3. Enter Google Authenticator code to verify
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Enter code'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className='w-full p-2 rounded bg-[#1f1f1f] text-white border border-gray-600 mb-4'
          />
          <button
            type='submit'
            disabled={!code}
            className={`w-full py-2 rounded ${
              code ?
                "bg-white text-black"
              : "bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </form>
      </div>

      {/* Headless UI Modal */}
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={setIsModalOpen}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-50 transition-opacity' />
          </Transition.Child>

          <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='scale-95 opacity-0'
              enterTo='scale-100 opacity-100'
              leave='ease-in duration-200'
              leaveFrom='scale-100 opacity-100'
              leaveTo='scale-95 opacity-0'
            >
              <Dialog.Panel className='bg-[#1f1f1f] p-6 rounded-lg max-w-md w-full text-white border border-gray-700 shadow-lg'>
                <Dialog.Title className='text-lg font-medium mb-2'>
                  Confirm 2FA Code
                </Dialog.Title>
                <p className='text-sm text-gray-300 mb-4'>
                  Are you sure you want to verify this code?
                </p>

                {verifyMessage && (
                  <p className='text-sm mb-4'>{verifyMessage}</p>
                )}

                <div className='flex justify-end gap-3'>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className='px-4 py-2 bg-gray-600 text-white rounded'
                    disabled={isVerifying}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmVerification}
                    className='px-4 py-2 bg-white text-black rounded'
                    disabled={isVerifying}
                  >
                    {isVerifying ? "Verifying..." : "Confirm"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default BindGoogleAuthenticator;
