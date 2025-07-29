import React, { useState, Fragment, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { showPromise, showSuccess } from '../../utils/toast';
import { useNavigate } from 'react-router-dom';
import GoBack from '../../components/ui/GoBack';
import axiosInstance from '../../api/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { generateGoogleAuthOtp } from '../../redux/user/userThunk';
import { verifyGoogleAuthOtp } from '../../redux/user/userThunk';
import VerifyEmailModal2FA from '../../components/modals/VerifyEmaiModal2FA';
import useFetchLoggedInUser from '../../hooks/useFetchedLoggedInUser';

const BindGoogleAuthenticator = () => {
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [secret, setSecret] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { user: fetchedUser, error, loading } = useFetchLoggedInUser();
  const userEmail = fetchedUser?.message?.userDetails.email ?? '';

  useEffect(() => {
    axiosInstance.get('/user/generate2fa').then((res) => {
      setSecret(res.data.message);
    });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(secret.secret).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
    showSuccess('Copied to clipboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code) return;

    try {
      await showPromise(
        axiosInstance.post('/user/verify2fa', { token: code }),
        {
          loading: 'Verifying 2FA code...',
          success: () => {
            // showSuccess(
            //   'Google Auth verification is pending. Please verify email.',
            // );
            setShowEmailModal(true); // now open modal AFTER 2FA success
            return ;
          },
          error: 'Invalid verification code or failed to link.',
        },
      );
    } catch (err) {
      console.error('Verification error', err);
    }
  };

  const handleEmailOtpVerified = async () => {
    setShowEmailModal(false);
    navigate('/account/security');
    showSuccess('Google Authenticator successfully bound to your account');
  };

  return (
    <div className='max-w-3xl mx-auto text-white px-4 py-8'>
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
        <h3 className='font-semibold mb-2 text-left'>
          2. Configure and backup the key.
        </h3>
        <p className='text-sm text-gray-300 mb-2 text-left'>
          Open Google Authenticator and scan the QR code or manually enter the
          key below to add the verification token.
        </p>
        <p className='text-sm text-red-500 font-medium mb-4 text-left'>
          In case you lose Google Authenticator, you can recover it using the
          provided key. Keep the key safe and do not share it with anyone.
        </p>

        <div className='flex gap-4'>
          <img
            src={secret?.qr}
            alt='Qrcode'
            className='w-32 h-32 sm:w-40 sm:h-40'
          />
          <div className='flex flex-col justify-center'>
            <p className='font-semibold text-lg tracking-wider'>
              {secret?.secret}
            </p>
            <button
              onClick={handleCopy}
              className='text-green-400 text-sm mt-1 flex items-center gap-1 cursor-pointer'
            >
              {copied ? (
                <>
                  <Check className='w-4 h-4' /> Copied
                </>
              ) : (
                'Copy the key'
              )}
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
          <div className='relative w-full mb-4'>
            <input
              type='text'
              inputMode='numeric'
              pattern='[0-9]*'
              placeholder='Enter code'
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/, ''))}
              maxLength={6}
              className='w-full p-2 pr-10 rounded bg-[#1f1f1f] text-white border focus:border-newGreen active:border-newGreen border-gray-600 outline-0'
            />
            {code && (
              <button
                type='button'
                onClick={() => setCode('')}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none'
              >
                <X className='w-4 h-4' />
              </button>
            )}
          </div>

          <button
            type='submit'
            disabled={!code || isVerifying}
            className={`w-full py-2 rounded ${
              code
                ? 'bg-newGreen text-black'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isVerifying ? 'Processing...' : 'Verify 2FA Code'}
          </button>
        </form>
      </div>

      {/* Email OTP Modal */}
      {userEmail && (
        <VerifyEmailModal2FA
          isOpen={showEmailModal}
          setIsOpen={setShowEmailModal}
          userEmail={userEmail}
          onResend={() => {
            const createdAt = new Date().toLocaleString('en-US', {
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            });
            dispatch(generateGoogleAuthOtp({ email: userEmail, createdAt }));
          }}
          onSuccess={handleEmailOtpVerified}
        />
      )}
    </div>
  );
};

export default BindGoogleAuthenticator;
