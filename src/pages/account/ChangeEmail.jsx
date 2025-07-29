import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { showPromise } from '../../utils/toast';
import useFetchLoggedInUser from '../../hooks/useFetchedLoggedInUser';
import { maskEmail } from '../../functions/helper';

const schema = Yup.object().shape({
  newEmail: Yup.string()
    .email('Invalid email')
    .required('New email is required'),
  newEmailCode: Yup.string()
    .length(6, 'Code must be 6 digits')
    .required('Code is required'),
  currentEmailCode: Yup.string()
    .length(6, 'Code must be 6 digits')
    .required('Code is required'),
});

export default function ChangeEmail() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { user: fetchedUser } = useFetchLoggedInUser();
  const email = fetchedUser?.message?.userDetails.email ?? '';
  const navigate = useNavigate();

  const [newEmailCooldown, setNewEmailCooldown] = useState(0);
  const [currentEmailCooldown, setCurrentEmailCooldown] = useState(0);

  // Cooldown timer effects
  useEffect(() => {
    if (newEmailCooldown > 0) {
      const interval = setInterval(() => {
        setNewEmailCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [newEmailCooldown]);

  useEffect(() => {
    if (currentEmailCooldown > 0) {
      const interval = setInterval(() => {
        setCurrentEmailCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentEmailCooldown]);

  const sendNewEmailCode = () => {
    const newEmail = watch('newEmail');
    if (!newEmail) return;

    const payload = {
      emailType: 'new',
      email: newEmail,
    };

    showPromise(axiosInstance.post('/user/generateChangeEmailOtp', payload), {
      loading: 'Sending OTP...',
      success: 'OTP sent to new email!',
      error: 'Failed to send OTP',
    });
    setNewEmailCooldown(60);
  };

  const sendCurrentEmailCode = () => {
    const payload = {
      emailType: 'current',
      email,
    };

    showPromise(axiosInstance.post('/user/generateChangeEmailOtp', payload), {
      loading: 'Sending OTP...',
      success: 'OTP sent to current email!',
      error: 'Failed to send OTP',
    });
    setCurrentEmailCooldown(60);
  };

  const onSubmit = (data) => {
    const payload = {
      currentEmailCode: data.currentEmailCode,
      newEmail: data.newEmail,
      newEmailCode: data.newEmailCode,
    };

    showPromise(axiosInstance.post('/user/verifyChangeEmailOtp', payload), {
      loading: 'Verifying...',
      success: 'Email changed successfully!',
      error: 'Verification failed',
    });
  };

  return (
    <div className='max-w-xl mx-auto text-white px-4 py-6'>
      <button
        onClick={() => navigate(-1)}
        className='mb-4 flex items-center text-gray-300 hover:text-white'
      >
        <ArrowLeft className='mr-2' size={18} />
        <span className='text-sm'>Back</span>
      </button>

      <h2 className='text-2xl font-bold mb-4'>Change email</h2>

      <div className='bg-blue-900 text-sm text-blue-200 p-3 rounded-md mb-6'>
        For fund safety, withdrawals prohibited within 24 hours after changing
        email.
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        {/* New Email */}
        <div>
          <label className='block text-sm mb-1'>New email</label>
          <input
            type='email'
            {...register('newEmail')}
            placeholder='Enter new email'
            className='w-full bg-zinc-900 border border-gray-700 px-4 py-2 rounded-md text-sm'
          />
          {errors.newEmail && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.newEmail.message}
            </p>
          )}
        </div>

        {/* New Email Code */}
        <div>
          <label className='block text-sm mb-1'>New email code</label>
          <div className='flex'>
            <input
              type='text'
              maxLength={6}
              {...register('newEmailCode')}
              placeholder='Enter code'
              className='flex-1 bg-zinc-900 border border-gray-700 px-4 py-2 rounded-l-md text-sm'
            />
            <button
              type='button'
              onClick={sendNewEmailCode}
              disabled={newEmailCooldown > 0}
              className={`bg-zinc-800 border border-l-0 border-gray-700 px-4 py-2 text-sm rounded-r-md ${
                newEmailCooldown > 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-lime-400 hover:text-lime-300'
              }`}
            >
              {newEmailCooldown > 0
                ? `Retry in ${newEmailCooldown}s`
                : 'Get code'}
            </button>
          </div>
          {errors.newEmailCode && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.newEmailCode.message}
            </p>
          )}
        </div>

        {/* Current Email Code */}
        <div>
          <h3 className='font-semibold text-xl mb-2'>Security Verification</h3>
          <label className='block text-sm mb-1'>
            Email Verification ({maskEmail(email)})
          </label>
          <div className='flex'>
            <input
              type='text'
              maxLength={6}
              {...register('currentEmailCode')}
              placeholder='Enter code'
              className='flex-1 bg-zinc-900 border border-gray-700 px-4 py-2 rounded-l-md text-sm'
            />
            <button
              type='button'
              onClick={sendCurrentEmailCode}
              disabled={currentEmailCooldown > 0}
              className={`bg-zinc-800 border border-l-0 border-gray-700 px-4 py-2 text-sm rounded-r-md ${
                currentEmailCooldown > 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-lime-400 hover:text-lime-300'
              }`}
            >
              {currentEmailCooldown > 0
                ? `Retry in ${currentEmailCooldown}s`
                : 'Get code'}
            </button>
          </div>
          {errors.currentEmailCode && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.currentEmailCode.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type='submit'
          disabled={!isValid}
          className={`w-full py-2 rounded-md font-semibold ${
            !isValid
              ? 'bg-zinc-700 text-gray-400 cursor-not-allowed'
              : 'bg-lime-500 hover:bg-lime-600 text-black'
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
