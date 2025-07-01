import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const steps = [
	{
		title: 'Create your Bitunix account',
		iconColor: 'bg-lime-400',
		arrow: true,
		route: '/register',
		icon: '/begin-journey/create2.svg',
		illustration: '/begin-journey/create1.svg',
	},
	{
		title: 'Deposit funds',
		iconColor: 'bg-black',
		arrow: true,
		route: '/assets/deposit',
		icon: '/begin-journey/trading2.svg',
		illustration: '/begin-journey/deposit1.svg',
	},
	{
		title: 'Start trading',
		iconColor: 'bg-black',
		arrow: true,
		route: '/contract-trade/BTC-USDT',
		icon: '/begin-journey/deposit2.svg',
		illustration: '/begin-journey/trading1.svg',
	},
];

const BeginJourney = () => {
	const [hoveredIndex, setHoveredIndex] = useState(0); // Default to first step

	return (
		<section className='flex flex-col items-center justify-center py-8 md:py-16 px-4 overflow-hidden'>
			<h2 className='text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-14 text-left md:text-center leading-tight'>
				Begin Your Cryptocurrency Journey Effortlessly
			</h2>

			<div className='border border-stone-900/50 rounded-xl p-0 md:p-6 flex flex-col lg:flex-row items-center gap-10 max-w-6xl w-full shadow-lg'>
				{/* Left Illustration */}
				<div className='hidden md:flex justify-center w-full lg:w-1/2'>
					<img
						src={steps[hoveredIndex]?.illustration}
						alt='cryptojourney'
						className='w-64 transition-all duration-300'
					/>
				</div>

				{/* Steps */}
				<div className='flex flex-col w-full lg:w-1/2 gap-6'>
					{steps.map((step, index) => (
						<Link
							key={index}
							to={step.route}
							onMouseEnter={() => setHoveredIndex(index)}
							className='flex items-center justify-between p-4 rounded-lg border-b border-gray-800 hover:bg-[#1e1e1e] transition transform hover:scale-[1.02] group'>
							<div className='flex items-center gap-4'>
								<div
									className={`rounded-full p-3 transition-colors duration-300 ${
										index === 0 ? 'bg-lime-400' : 'bg-black'
									}`}>
									<img
										src={step.icon}
										alt=''
										className={`w-10 transition-colors duration-300 ${
											hoveredIndex === index ? 'filter brightness-125' : ''
										}`}
									/>
								</div>
								<span
									className={`text-sm md:text-base transition-colors duration-300 ${
										hoveredIndex === index ? 'text-lime-400' : 'text-white'
									}`}>
									{step.title}
								</span>
							</div>
							{/* Chevron only on hover */}
							{step.arrow && (
								<div
									className={`text-lime-400 transition-opacity duration-300 ${
										hoveredIndex === index
											? 'opacity-100 translate-x-0'
											: 'opacity-0 -translate-x-2'
									}`}>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										viewBox='0 0 24 24'
										className='h-5 w-5'>
										<path d='M9 5l7 7-7 7' />
									</svg>
								</div>
							)}
						</Link>
					))}
				</div>
			</div>

			{/* Get Started Button */}
			<Link to='/register'>
				<button className='w-full md:w-auto mt-12 bg-lime-400 hover:bg-lime-500 text-black font-semibold py-3 px-8 rounded-md text-base animate-pulse hover:animate-none transition'>
					Get Started
				</button>
			</Link>
		</section>
	);
};

export default BeginJourney;
