import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserAgreementModal from '../../components/UserAgreement';
import Policy from '../../components/Policy';
import { useDispatch, useSelector } from 'react-redux';
import { resendOtp, signupUser, verifyEmailOtp } from '../../redux/auth/authThunk';
import VerifyEmailModal from '../../components/modals/VerifyEmailModal'; // adjust path

const Signup = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isAgreementOpen, setAgreementOpen] = useState(false);
	const [isPolicyOpen, setPolicyOpen] = useState(false);
	const [showVerifyModal, setShowVerifyModal] = useState(false);
	  const createdAt = new Date().toLocaleString("en-US", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
	const [userEmail, setUserEmail] = useState('');

	// Add to validation schema
	const schema = Yup.object().shape({
		name: Yup.string().required('Full name is required'),
		email: Yup.string().email('Invalid email').required('Email is required'),
		password: Yup.string()
			.min(6, 'Minimum 6 characters')
			.required('Password is required'),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password'), null], 'Passwords must match')
			.required('Please confirm your password'),
		agreement: Yup.boolean().oneOf([true], 'You must accept the terms'),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const dispatch = useDispatch();
	const loading = useSelector((state) => state.auth.loading);

	const onSubmit = async ({
		agreement: _,
		confirmPassword,
		...cleanedData
	}) => {
		const createdAt = new Date().toLocaleString('en-US', {
			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		});

		const dataWithTimestamp = {
			...cleanedData,
			createdAt,
		};

		// Dispatch and wait
		const response = await dispatch(signupUser(dataWithTimestamp)).unwrap();

		// If successful, show modal
		if (response?.message.email) {
			setUserEmail(response.message.email);
			setShowVerifyModal(true);
		}
	};

	return (
		<>
			<div className='grid grid-cols-1 lg:grid-cols-2 min-h-screen'>
				{/* Left side image/marketing */}
				<div className='hidden lg:flex items-center justify-center bg-black text-white px-8'>
					<div className='text-center flex flex-col-reverse'>
						<img
							src='/mobile/signup-img.webp' // Update your image path
							alt='Cashtradepro vending'
							className='max-w-md mx-auto mb-6'
						/>
						<p className='text-lime-400 text-lg font-semibold'>
							Avail 8000+ USDT Worth of <br />
							Newcomer Rewards
						</p>
						<h2 className='text-3xl font-bold mb-2'>
							Exclusive for newcomers!
						</h2>
					</div>
				</div>

				{/* Right side form */}
				<div className='md:bg-white bg-black flex md:items-center justify-center px-6 py-12'>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='w-full max-w-md space-y-6'>
						<h2 className='text-4xl font-bold md:text-black text-white'>
							Sign up
						</h2>

						{/* Name */}
						<div>
							<label className='block text-sm md:text-gray-700 text-gray-300 mb-1'>
								Full Name
							</label>
							<input
								type='text'
								{...register('name')}
								className={`w-full px-4 py-2 border rounded-md md:bg-white bg-transparent md:text-black text-white ${
									errors.name ? 'border-red-500' : 'border-gray-300'
								}`}
								placeholder='Enter your full name'
							/>
							{errors.name && (
								<p className='text-red-500 text-sm mt-1'>
									{errors.name.message}
								</p>
							)}
						</div>
						{/* Email */}
						<div>
							<label className='block text-sm md:text-gray-700 text-gray-300 mb-1'>
								Email
							</label>
							<input
								type='email'
								{...register('email')}
								className={`w-full px-4 py-2 border rounded-md md:bg-white bg-transparent md:text-black text-white ${
									errors.email ? 'border-red-500' : 'border-gray-300'
								}`}
								placeholder='Enter email address'
							/>
							{errors.email && (
								<p className='text-red-500 text-sm mt-1'>
									{errors.email.message}
								</p>
							)}
						</div>

						{/* Password */}
						<div>
							<label className='block text-sm md:text-gray-700 text-gray-300 mb-1'>
								Password
							</label>
							<div className='relative'>
								<input
									type={showPassword ? 'text' : 'password'}
									{...register('password')}
									className={`w-full px-4 py-2 border rounded-md md:bg-white bg-transparent md:text-black text-white ${
										errors.password ? 'border-red-500' : 'border-gray-300'
									}`}
									placeholder='Please Enter Your Password'
								/>
								<button
									type='button'
									onClick={() => setShowPassword(!showPassword)}
									className='absolute right-3 top-2 text-gray-500'>
									{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>
							{errors.password && (
								<p className='text-red-500 text-sm mt-1'>
									{errors.password.message}
								</p>
							)}
						</div>

						{/* Confirm Password */}
						<div>
							<label className='block text-sm md:text-gray-700 text-gray-300 mb-1'>
								Confirm Password
							</label>
							<div className='relative'>
								<input
									type={showConfirmPassword ? 'text' : 'password'}
									{...register('confirmPassword')}
									className={`w-full px-4 py-2 border rounded-md md:bg-white bg-transparent md:text-black text-white ${
										errors.confirmPassword
											? 'border-red-500'
											: 'border-gray-300'
									}`}
									placeholder='Confirm your password'
								/>
								<button
									type='button'
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className='absolute right-3 top-2 text-gray-500'>
									{showConfirmPassword ? (
										<EyeOff size={18} />
									) : (
										<Eye size={18} />
									)}
								</button>
							</div>
							{errors.confirmPassword && (
								<p className='text-red-500 text-sm mt-1'>
									{errors.confirmPassword.message}
								</p>
							)}
						</div>

						{/* Referral Code */}
						<div>
							<label className='block text-sm md:text-gray-700 text-gray-300 mb-1'>
								Referral Code <span className='text-gray-400'>(Optional)</span>
							</label>
							<input
								type='text'
								{...register('referral')}
								className='w-full px-4 py-2 border border-gray-300 rounded-md md:bg-white bg-transparent md:text-black text-white'
								placeholder='Enter code if any'
							/>
						</div>

						{/* Agreement */}
						<div className='text-sm md:text-black text-gray-300 flex items-start gap-2'>
							<input
								type='checkbox'
								{...register('agreement')}
								className='mt-1'
							/>
							<p>
								I have read and agree to the{' '}
								<button
									onClick={() => setAgreementOpen(true)}
									className='underline text-lime-400'>
									Cashtradepro User Agreement
								</button>{' '}
								and{' '}
								<button
									onClick={() => setPolicyOpen(true)}
									className='underline text-lime-400'>
									Cashtradepro Privacy Policy
								</button>
								.
							</p>
						</div>
						{errors.agreement && (
							<p className='text-red-500 text-sm'>{errors.agreement.message}</p>
						)}

						{/* Modal */}
						<UserAgreementModal
							isOpen={isAgreementOpen}
							onClose={() => setAgreementOpen(false)}
						/>
						<Policy
							isOpen={isPolicyOpen}
							onClose={() => setPolicyOpen(false)}
						/>

						{/* Submit */}
						<button
							type='submit'
							disabled={loading}
							className={`w-full bg-lime-500 hover:bg-lime-600 text-white md:text-black font-medium py-2 rounded-md hover:opacity-90 ${
								loading && 'opacity-60 cursor-not-allowed'
							}`}>
							{loading ? (
								<div className='flex items-center justify-center gap-2'>
									<svg
										className='animate-spin h-4 w-4 text-white md:text-black'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'>
										<circle
											className='opacity-25'
											cx='12'
											cy='12'
											r='10'
											stroke='currentColor'
											strokeWidth='4'></circle>
										<path
											className='opacity-75'
											fill='currentColor'
											d='M4 12a8 8 0 018-8v8H4z'></path>
									</svg>
									Signing up...
								</div>
							) : (
								'Sign up'
							)}
						</button>

						{/* Footer */}
						<div className='text-sm md:text-gray-500 text-gray-400 text-center'>
							Already have an account?{' '}
							<Link
								to='/login'
								className='underline text-white md:text-lime-400 font-semibold'>
								Log in
							</Link>
						</div>
					</form>
				</div>
			</div>
			<VerifyEmailModal
				isOpen={showVerifyModal}
				setIsOpen={setShowVerifyModal}
				userEmail={userEmail}
				onVerify={(otp) => {
					dispatch(verifyEmailOtp({ email: userEmail, otp, role: 'user' }));
				}}
				onResend={() => {
					dispatch(resendOtp({ email: userEmail, createdAt }));
				}}
			/>
		</>
	);
};

export default Signup;
