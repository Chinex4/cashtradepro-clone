import React from 'react';

const InviteFriends = () => {
	return (
		<div className='bg-black text-white px-4 py-16'>
			<div className='max-w-7xl mx-auto text-center'>
				{/* Heading */}
				<h2 className='text-3xl md:text-4xl font-bold mb-3'>
					Invite friends and earn exclusive rewards
				</h2>
				<p className='text-gray-400 text-lg mb-6'>
					Earn up to <span className='text-lime-400 font-semibold'>20%</span>{' '}
					commission for every referral's trade
				</p>

				{/* CTA Button */}
				<button className='bg-lime-400 text-black px-6 py-2 font-semibold rounded-md hover:bg-lime-300'>
					Invite now
				</button>

				{/* Grid Illustration + Steps */}
				<div className='mt-16 max-w-6xl mx-auto bg-zinc-900 border border-zinc-700 rounded-xl px-6 py-10 grid md:grid-cols-3 gap-6 items-start text-left'>
					{/* Step 1 */}
					<div className='flex flex-col items-center text-center'>
						<div className='bg-lime-400 p-3 rounded-full mb-4'>
							<svg
								width='32'
								height='32'
								fill='black'
								viewBox='0 0 24 24'>
								<path d='M3 6h18v2H3V6zm0 5h12v2H3v-2zm0 5h8v2H3v-2z' />
							</svg>
						</div>
						<h4 className='font-semibold text-lg mb-1'>Share links</h4>
						<p className='text-gray-400 text-sm'>
							Invite friends to register on Cashtradepro
						</p>
					</div>

					{/* Step 2 */}
					<div className='flex flex-col items-center text-center'>
						<div className='bg-lime-400 p-3 rounded-full mb-4'>
							<svg
								width='32'
								height='32'
								fill='black'
								viewBox='0 0 24 24'>
								<path d='M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
							</svg>
						</div>
						<h4 className='font-semibold text-lg mb-1'>
							Friends accept invitations
						</h4>
						<p className='text-gray-400 text-sm'>
							Complete registration and trade
						</p>
					</div>

					{/* Step 3 */}
					<div className='flex flex-col items-center text-center'>
						<div className='bg-lime-400 p-3 rounded-full mb-4'>
							<svg
								width='32'
								height='32'
								fill='black'
								viewBox='0 0 24 24'>
								<path d='M16 6V4H8v2H2v2h20V6h-6zM4 20h16v-2H4v2zm0-6h16v-2H4v2z' />
							</svg>
						</div>
						<h4 className='font-semibold text-lg mb-1'>Start earning</h4>
						<p className='text-gray-400 text-sm'>
							Share commission every time they trade
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InviteFriends;
