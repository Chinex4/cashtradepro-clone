import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MarketsSection from '../../components/desktop/opportunities/MarketsSection';
import { useNavigate } from 'react-router-dom';

const TABS = ['Favorites', 'Futures', 'Spot'];

const starOutline = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		viewBox='0 0 24 24'
		className='w-5 h-5 text-white'>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.43 4.405a1 1 0 00.95.69h4.631c.969 0 1.371 1.24.588 1.81l-3.75 2.678a1 1 0 00-.364 1.118l1.43 4.405c.3.921-.755 1.688-1.54 1.118l-3.75-2.678a1 1 0 00-1.176 0l-3.75 2.678c-.785.57-1.84-.197-1.54-1.118l1.43-4.405a1 1 0 00-.364-1.118L2.98 9.832c-.783-.57-.38-1.81.588-1.81h4.63a1 1 0 00.951-.69l1.43-4.405z'
		/>
	</svg>
);

const starFilled = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		fill='#facc15'
		viewBox='0 0 24 24'
		className='w-5 h-5 text-yellow-400'>
		<path d='M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
	</svg>
);

export default function MarketsPage() {
	const [activeTab, setActiveTab] = useState('Futures');
	const [marketData, setMarketData] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const fetchMarketData = async () => {
		try {
			setLoading(true);

			const orderParam =
				activeTab === 'Spot' ? 'volume_desc' : 'open_interest_btc_desc';

			const res = await axios.get(
				'https://api.coingecko.com/api/v3/coins/markets',
				{
					params: {
						vs_currency: 'usd',
						order: orderParam,
						per_page: 50,
						page: 1,
					},
				}
			);
			setMarketData(res.data);
		} catch (error) {
			console.error('Error fetching market data', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (activeTab !== 'Favorites') {
			fetchMarketData();
		}

		const saved = localStorage.getItem('Cashtradepro-favorites');
		if (saved) setFavorites(JSON.parse(saved));
	}, [activeTab]);

	const toggleFavorite = (id) => {
		let updated = [...favorites];
		if (favorites.includes(id)) {
			updated = updated.filter((fav) => fav !== id);
		} else {
			updated.push(id);
		}
		setFavorites(updated);
		localStorage.setItem('Cashtradepro-favorites', JSON.stringify(updated));
	};

	const displayedData =
		activeTab === 'Favorites'
			? marketData.filter((coin) => favorites.includes(coin.id))
			: marketData;

	return (
		<>
			<MarketsSection />
			<div className='max-w-7xl mx-auto bg-black text-white min-h-screen p-4 pb-28'>
				{/* Tabs */}
				<div className='flex gap-6 text-white text-sm mb-4 border-b border-white/10'>
					{TABS.map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab)}
							className={`pb-2 border-b-2 ${
								activeTab === tab
									? 'border-white text-white font-semibold'
									: 'border-transparent text-gray-400'
							}`}>
							{tab}
						</button>
					))}
				</div>

				{/* Header (visible on md+) */}
				<div className='hidden md:grid grid-cols-6 gap-2 text-sm text-white/60 mb-3 px-2'>
					<span>Trading Pair</span>
					<span>Last Price</span>
					<span>24H Change</span>
					<span>24H High</span>
					<span>24H Low</span>
					<span>24H Volume</span>
				</div>

				{/* List */}
				{loading ? (
					<div className='flex justify-center mt-20'>
						<div className='animate-spin rounded-full h-8 w-8 border-t-4 border-lime-400 border-solid'></div>
					</div>
				) : (
					<div className='space-y-3'>
						{displayedData.map((coin) => (
							<div
								key={coin.id}
								className='bg-[#111] rounded-md px-3 py-3 text-sm'
								onClick={() =>
									navigate(`/contract-trade/${coin.symbol.toUpperCase()}-USDT`)
								}>
								{/* Mobile View */}
								<div className='flex md:hidden justify-between items-center'>
									<div className='flex items-center gap-2'>
										<button onClick={() => toggleFavorite(coin.id)}>
											{favorites.includes(coin.id) ? starFilled : starOutline}
										</button>
										<img
											src={coin.image}
											alt={coin.symbol}
											className='w-6 h-6 rounded-full'
										/>
										<span className='font-medium'>
											{coin.symbol.toUpperCase()}USDT
										</span>
									</div>
									<div className='text-right'>
										<div>${coin.current_price.toLocaleString()}</div>
										<div
											className={`${
												coin.price_change_percentage_24h >= 0
													? 'text-green-400'
													: 'text-red-500'
											}`}>
											{coin.price_change_percentage_24h?.toFixed(2)}%
										</div>
									</div>
								</div>

								{/* Desktop View */}
								<div className='hidden md:grid grid-cols-6 items-center gap-2'>
									<div className='flex items-center gap-2'>
										<button onClick={() => toggleFavorite(coin.id)}>
											{favorites.includes(coin.id) ? starFilled : starOutline}
										</button>
										<img
											src={coin.image}
											alt={coin.symbol}
											className='w-6 h-6 rounded-full'
										/>
										<span className='font-medium'>
											{coin.symbol.toUpperCase()}USDT
										</span>
									</div>
									<div>${coin.current_price.toLocaleString()}</div>
									<div
										className={`${
											coin.price_change_percentage_24h >= 0
												? 'text-green-400'
												: 'text-red-500'
										}`}>
										{coin.price_change_percentage_24h?.toFixed(2)}%
									</div>
									<div>${coin.high_24h?.toLocaleString()}</div>
									<div>${coin.low_24h?.toLocaleString()}</div>
									<div>${coin.total_volume?.toLocaleString()}</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
}
