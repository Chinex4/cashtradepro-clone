import { ArrowRight, Info, UserCog } from 'lucide-react';

const vipLevels = [
	{
		level: 'VIP 0',
		spotVolume: '100,000.00',
		futuresVolume: '1,000,000.00',
		balance: '1,000.00',
		spotFees: '0.0800% / 0.1000%',
		futuresFees: '0.0200% / 0.0400%',
	},
	{
		level: 'VIP 1',
		spotVolume: '500,000.00',
		futuresVolume: '2,000,000.00',
		balance: '2,000.00',
		spotFees: '0.0700% / 0.0900%',
		futuresFees: '0.0150% / 0.0300%',
	},
	{
		level: 'VIP 2',
		spotVolume: '1,000,000.00',
		futuresVolume: '5,000,000.00',
		balance: '5,000.00',
		spotFees: '0.0600% / 0.0800%',
		futuresFees: '0.0125% / 0.0250%',
	},
	{
		level: 'VIP 3',
		spotVolume: '2,000,000.00',
		futuresVolume: '8,000,000.00',
		balance: '10,000.00',
		spotFees: '0.0500% / 0.0700%',
		futuresFees: '0.0100% / 0.0200%',
	},
	{
		level: 'VIP 4',
		spotVolume: '4,000,000.00',
		futuresVolume: '20,000,000.00',
		balance: '20,000.00',
		spotFees: '0.0400% / 0.0600%',
		futuresFees: '0.0080% / 0.0150%',
	},
	{
		level: 'VIP 5',
		spotVolume: '8,000,000.00',
		futuresVolume: '50,000,000.00',
		balance: '30,000.00',
		spotFees: '0.0300% / 0.0500%',
		futuresFees: '0.0070% / 0.0125%',
	},
	{
		level: 'VIP 6',
		spotVolume: '12,000,000.00',
		futuresVolume: '100,000,000.00',
		balance: '50,000.00',
		spotFees: '0.0200% / 0.0400%',
		futuresFees: '0.0060% / 0.0100%',
	},
	{
		level: 'VIP 7',
		spotVolume: '20,000,000.00',
		futuresVolume: '150,000,000.00',
		balance: '80,000.00',
		spotFees: '0.0150% / 0.0350%',
		futuresFees: '0.0055% / 0.0090%',
	},
	{
		level: 'VIP 8',
		spotVolume: '40,000,000.00',
		futuresVolume: '200,000,000.00',
		balance: '100,000.00',
		spotFees: '0.0100% / 0.0250%',
		futuresFees: '0.0050% / 0.0080%',
	},
];

const VipService = () => {
	return (
		<div className='text-white p-6 space-y-10'>
			<h2 className='text-2xl font-semibold'>VIP Service</h2>

			{/* User Level Info */}
			<div className='bg-[#1a1a1a] p-6 rounded-xl border border-gray-700 grid grid-cols-1 md:grid-cols-4 gap-6'>
				<div className='space-y-1'>
					<p className='text-sm'>Current Level</p>
					<p className='text-xl font-bold'>Regular User</p>
				</div>
				<div>
					<p className='text-sm mb-1'>30-day Futures Trading Volume</p>
					<p className='text-lg font-semibold'>0.00 USDT</p>
					<p className='text-xs text-gray-400'>VIP 0</p>
				</div>
				<div>
					<p className='text-sm mb-1'>30-day Spot Trading Volume</p>
					<p className='text-lg font-semibold'>0.00 USDT</p>
					<p className='text-xs text-gray-400'>VIP 0</p>
				</div>
				<div>
					<p className='text-sm mb-1'>Balance</p>
					<p className='text-lg font-semibold'>0.00 USDT</p>
					<p className='text-xs text-gray-400'>VIP 0</p>
				</div>
			</div>

			{/* Note */}
			<p className='text-sm text-gray-400 leading-relaxed'>
				To upgrade to <span className='text-white font-semibold'>VIP 1</span>,
				you need either a spot trading volume of{' '}
				<span className='text-lime-400 font-semibold'>100,000.00 USDT</span>, a
				futures trading volume of{' '}
				<span className='text-lime-400 font-semibold'>1,000,000.00 USDT</span>,
				or a balance of{' '}
				<span className='text-lime-400 font-semibold'>1,000.00 USDT</span>.
				<br />
				<br />
				The cumulative 30-day trading volume and balance are updated at 00:00
				(UTC). You’ll automatically enjoy the corresponding rates at your new
				level.
			</p>

			{/* Label Headers */}
			<div className='flex items-center gap-8 text-sm text-gray-400'>
				<div className='flex items-center gap-2'>
					<Info size={16} /> <span>Exclusive VIP rates</span>
				</div>
				<div className='flex items-center gap-2'>
					<UserCog size={16} /> <span>Exclusive Account Manager</span>
				</div>
			</div>

			{/* VIP Level Table */}
			<div className='overflow-x-auto'>
				<table className='w-full text-sm border border-gray-700'>
					<thead className='bg-[#1a1a1a] text-gray-400 border-b border-gray-700'>
						<tr>
							<th className='p-3 text-left'>VIP Level</th>
							<th className='p-3 text-left'>
								30-day Spot Trading Volume (USDT)
							</th>
							<th className='p-3 text-left'>
								30-day Futures Trading Volume (USDT)
							</th>
							<th className='p-3 text-left'>Balance (USDT)</th>
							<th className='p-3 text-left'>Spot Trading Fees (maker/taker)</th>
							<th className='p-3 text-left'>
								Futures Trading Fees (maker/taker)
							</th>
						</tr>
					</thead>
					<tbody>
						{vipLevels.map((row) => (
							<tr
								key={row.level}
								className='border-b border-gray-800 hover:bg-[#121212]'>
								<td className='p-3'>{row.level}</td>
								<td className='p-3'>{row.spotVolume}</td>
								<td className='p-3'>{row.futuresVolume}</td>
								<td className='p-3'>{row.balance}</td>
								<td className='p-3'>{row.spotFees}</td>
								<td className='p-3'>{row.futuresFees}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Apply Section */}
			<div className='text-sm mt-6 text-gray-300'>
				<p className='mb-2'>
					<span className='text-lime-400 font-medium'>
						Apply for Instant VIP Status?
					</span>
				</p>
				<p>
					VIP users of other exchanges can instantly get a better VIP level on
					Cashtradepro. Simply send an email with your Cashtradepro UID & a screenshot
					showing your 30 day trading volume on other exchanges to{' '}
					<a
						href='mailto:vip@Cashtradepro.com'
						className='text-lime-400 underline'>
						vip@Cashtradepro.com
					</a>
				</p>
			</div>
		</div>
	);
};

export default VipService;
