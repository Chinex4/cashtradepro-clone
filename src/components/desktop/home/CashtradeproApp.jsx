import React, { useEffect, useState } from 'react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const CashtradeproApp = () => {
	const [deferredPrompt, setDeferredPrompt] = useState(null);

	useEffect(() => {
		const handleBeforeInstallPrompt = (e) => {
			e.preventDefault();
			setDeferredPrompt(e);

			// Show toast banner when ready
			toast(
				(t) => (
					<div className='text-sm'>
						<p className='mb-2 font-medium'>Install Cashtradepro App?</p>
						<div className='flex gap-2'>
							<button
								onClick={() => {
									e.prompt();
									e.userChoice.then(() => toast.dismiss(t.id));
								}}
								className='bg-black text-white text-xs px-3 py-1 rounded hover:opacity-80'>
								Install
							</button>
							<button
								onClick={() => toast.dismiss(t.id)}
								className='border border-black text-black text-xs px-3 py-1 rounded hover:bg-gray-100'>
								Maybe later
							</button>
						</div>
					</div>
				),
				{
					duration: 5000,
					position: 'bottom-center',
					style: {
						background: '#000',
						border: '1px solid #000',
						color: '#fff',
					},
				}
			);
		};

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
		return () =>
			window.removeEventListener(
				'beforeinstallprompt',
				handleBeforeInstallPrompt
			);
	}, []);

	const handleAndroidInstall = () => {
		const ua = navigator.userAgent || navigator.vendor || window.opera;

		if (/android/i.test(ua)) {
			if (deferredPrompt) {
				deferredPrompt.prompt();
				deferredPrompt.userChoice.then((choiceResult) => {
					if (choiceResult.outcome === 'accepted') {
						console.log('User accepted A2HS');
					}
					setDeferredPrompt(null);
				});
			} else {
				alert(
					'To install, tap the browser menu and choose "Add to Home screen".'
				);
			}
		} else if (/iPad|iPhone|iPod/.test(ua)) {
			return;
		} else {
			alert('To bookmark this site, press Ctrl+D (or Cmd+D on Mac).');
		}
	};

	return (
		<>
			<Toaster />
			<section className='bg-lime-400 w-full flex items-center justify-center'>
				<div className='container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8'>
					{/* LEFT TEXT BLOCK */}
					<div className='text-black space-y-8 h-full flex flex-col justify-center'>
						<h1 className='text-3xl text-center md:text-left md:text-5xl font-bold leading-tight'>
							Your Crypto <br />
							Exchange, Anytime, <br />
							Anywhere: <br />
							<span className='text-black'>Start Trading Today!</span>
						</h1>

						{/* Illustration on mobile */}
						<div className='flex md:hidden justify-center pt-4'>
							<img
								src='/svgIcons/laptop-phone.webp'
								alt='Cashtradepro Devices'
								className='w-full max-w-xs object-contain'
							/>
						</div>

						{/* QR & Buttons */}
						<div className='flex flex-col lg:flex-row lg:items-center gap-6'>
							<div className='space-y-5 w-full'>
								{/* App Store */}
								<a
									// href='#'
									className='flex items-center justify-center gap-2 bg-black text-white px-4 py-3 rounded shadow hover:opacity-80 text-sm w-full lg:max-w-[200px] lg:mx-0'>
									<FaApple className='text-xl' />
									App Store
								</a>

								{/* Playstore + APK */}
								<div className='flex flex-col sm:flex-row gap-3 w-full'>
									{/* Google Play - Disabled */}
									<div className='flex-1 bg-white border border-black px-4 py-2 rounded shadow text-sm opacity-50 cursor-not-allowed lg:max-w-[200px]'>
										<div className='flex flex-col items-center justify-center h-full'>
											<span className='flex items-center justify-center gap-2'>
												<FaGooglePlay className='text-green-600 text-xl' />
												Google Play
											</span>
											<span className='text-[8px] text-right w-full'>
												Coming soon...
											</span>
										</div>
									</div>

									{/* Android APK - Install Handler */}
									<button
										onClick={handleAndroidInstall}
										className='flex-1 bg-white border border-black px-4 py-2 rounded shadow text-sm font-semibold text-center cursor-pointer flex items-center justify-center lg:max-w-[200px]'>
										Android APK
									</button>
								</div>
							</div>
						</div>
					</div>

					{/* RIGHT ILLUSTRATION BLOCK (Desktop only) */}
					<div className='hidden md:flex justify-center'>
						<img
							src='/svgIcons/laptop-phone.webp'
							alt='Cashtradepro Devices'
							className='w-full max-w-md object-contain'
						/>
					</div>
				</div>
			</section>
		</>
	);
};

export default CashtradeproApp;
