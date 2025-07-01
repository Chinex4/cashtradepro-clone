import React from 'react';

const CopyTradingSection = () => {
	return (
		<div className='bg-black text-white px-4 py-10'>
			<div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
				{/* Text */}
				<div>
					<h2 className='text-3xl font-bold mb-2'>Copy Trading</h2>
					<p className='text-gray-400 mb-6'>
						Become a lead trader to earn{' '}
						<span className='text-white font-semibold'>10%</span> share of your
						followers profits.
					</p>
					<div className='flex gap-4 flex-wrap'>
						<button className='bg-lime-400 text-black px-4 py-2 font-semibold rounded-md hover:bg-lime-300'>
							Become a lead trader
						</button>
						<button className='border border-gray-500 text-white px-4 py-2 rounded-md text-sm hover:bg-zinc-800'>
							⬈ Tutorial
						</button>
					</div>
				</div>

				{/* Image */}
				<div className='flex justify-center md:justify-end'>
					<img
						src='/mobile/copy.webp'
						alt='Copy Trading'
						className='max-h-52'
					/>
				</div>
			</div>

			{/* Footer ticker */}
			<div className='max-w-7xl mx-auto mt-8 bg-zinc-900 py-3 px-4 text-sm text-gray-300 flex items-center gap-2 overflow-hidden'>
				<span className='text-lime-400'>🗞</span>
				<span className='whitespace-nowrap animate-marquee'>
					Cashtradepro Copy Trading Expands – More Pairs, More Opportunities!
				</span>
			</div>
		</div>
	);
};

export default CopyTradingSection;
