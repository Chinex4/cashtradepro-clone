import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { maskEmail } from '../../functions/helper';
import useFetchLoggedInUser from '../../hooks/useFetchedLoggedInUser';

const schema = Yup.object().shape({
	currentPassword: Yup.string().required('Current password is required'),
	newPassword: Yup.string().min(6).required('New password is required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
		.required('Please confirm new password'),
	emailCode: Yup.string().required('Verification code is required'),
});

export default function ChangePassword() {
	const navigate = useNavigate();
	const [showCurrent, setShowCurrent] = useState(false);
	const [showNew, setShowNew] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [sendingCode, setSendingCode] = useState(false);
	const { user: fetchedUser, error, loading } = useFetchLoggedInUser();
	const email = fetchedUser?.message?.userDetails.email ?? '';

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onChange',
	});

	const onSubmit = (data) => {
		console.log('Submitted data:', data);
		// Handle password change logic here
	};
const createdAt = new Date().toLocaleString("en-US", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
	const handleGetCode = () => {
		setSendingCode(true);
		setTimeout(() => setSendingCode(false), 2000);
	};

	return (
		<div className='max-w-xl mx-auto text-white px-4 py-6'>
			{/* Go Back */}
			<button
				onClick={() => navigate(-1)}
				className='mb-4 flex items-center text-gray-300 hover:text-white'>
				<ArrowLeft
					className='mr-2'
					size={15}
				/>
				<span className='text-sm'>Back</span>
			</button>

			<h2 className='text-2xl font-bold mb-4'>Change login password</h2>

			<div className='bg-blue-900 text-sm text-blue-200 p-3 rounded-md mb-6'>
				For fund safety, withdrawals prohibited within 24 hours after changing
				login password.
			</div>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className='space-y-6'>
				{/* Current Password */}
				<div>
					<label className='block text-sm mb-1'>Login Password</label>
					<div className='relative'>
						<input
							type={showCurrent ? 'text' : 'password'}
							{...register('currentPassword')}
							placeholder='Please enter your current password'
							className='w-full bg-zinc-900 border outline-0 focus:border-newGreen border-gray-700 px-4 py-2 rounded-md text-sm pr-10'
						/>
						<button
							type='button'
							className='absolute right-3 top-2.5 text-gray-400'
							onClick={() => setShowCurrent((prev) => !prev)}>
							{showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
						</button>
					</div>
					{errors.currentPassword && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.currentPassword.message}
						</p>
					)}
				</div>

				{/* New Password */}
				<div>
					<label className='block text-sm mb-1'>New login password</label>
					<div className='relative'>
						<input
							type={showNew ? 'text' : 'password'}
							{...register('newPassword')}
							placeholder='Please enter a new password'
							className='w-full bg-zinc-900 border outline-0 focus:border-newGreen border-gray-700 px-4 py-2 rounded-md text-sm pr-10'
						/>
						<button
							type='button'
							className='absolute right-3 top-2.5 text-gray-400'
							onClick={() => setShowNew((prev) => !prev)}>
							{showNew ? <EyeOff size={15} /> : <Eye size={15} />}
						</button>
					</div>
					{errors.newPassword && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.newPassword.message}
						</p>
					)}
				</div>

				{/* Confirm Password */}
				<div>
					<label className='block text-sm mb-1'>
						Confirm new login password
					</label>
					<div className='relative'>
						<input
							type={showConfirm ? 'text' : 'password'}
							{...register('confirmPassword')}
							placeholder='Please re-enter your new password'
							className='w-full bg-zinc-900 border outline-0 focus:border-newGreen border-gray-700 px-4 py-2 rounded-md text-sm pr-10'
						/>
						<button
							type='button'
							className='absolute right-3 top-2.5 text-gray-400'
							onClick={() => setShowConfirm((prev) => !prev)}>
							{showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
						</button>
					</div>
					{errors.confirmPassword && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.confirmPassword.message}
						</p>
					)}
				</div>

				{/* Email Verification */}
			<div>
  <h3 className='font-semibold text-base mb-2'>Security Verification</h3>
  <label className='block text-sm mb-1'>
    Email Verification ({maskEmail(email)})
  </label>

  <div className='relative'>
    <input
      type='text'
      {...register('emailCode')}
      placeholder='Enter code'
      className='w-full bg-zinc-900 border border-gray-700 outline-none focus:border-newGreen text-sm text-white px-4 py-2 pr-24 rounded-md'
    />
    <button
      type='button'
      onClick={handleGetCode}
      className='absolute right-3 top-1/2 -translate-y-1/2 text-lime-400 text-sm hover:text-lime-300'
    >
      {sendingCode ? 'Sending...' : 'Get code'}
    </button>
  </div>

  {errors.emailCode && (
    <p className='text-red-500 text-sm mt-1'>
      {errors.emailCode.message}
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
					}`}>
					Submit
				</button>
			</form>
		</div>
	);
}
