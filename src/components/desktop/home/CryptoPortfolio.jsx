import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;
const CACHE_KEY = 'cached_coin_data';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const CryptoPortfolio = () => {
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [hoveredRow, setHoveredRow] = useState(null);

	useEffect(() => {
		const fetchCoins = async () => {
			try {
				setLoading(true);

				// Check localStorage for cached data
				const cached = localStorage.getItem(CACHE_KEY);
				if (cached) {
					const { data, timestamp } = JSON.parse(cached);
					if (Date.now() - timestamp < CACHE_DURATION) {
						setCoins(data);
						setLoading(false);
						return;
					}
				}

				// Fetch from API
				const response = await fetch(
					'https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false',
					{
						headers: {
							'x-cg-pro-api-key': API_KEY,
						},
					}
				);

				if (!response.ok) throw new Error('API error');
				const data = await response.json();
				setCoins(data);

				// Cache result
				localStorage.setItem(
					CACHE_KEY,
					JSON.stringify({ data, timestamp: Date.now() })
				);
			} catch (err) {
				console.error('Failed to fetch coins:', err);
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		fetchCoins();
	}, []);

	const splitCoins = () => {
		const distribution = [13, 13, 12, 12];
		let start = 0;
		return distribution.map((count) => {
			const slice = coins.slice(start, start + count);
			start += count;
			return Array(10).fill(slice).flat(); // Duplicate x10
		});
	};

	const rows = coins.length > 0 ? splitCoins() : [];

	return (
		<section className='relative flex flex-col items-center justify-center px-16 py-12 overflow-hidden max-w-7xl mx-auto'>
			<h2 className='text-white text-3xl md:text-4xl font-bold mb-10 text-center'>
				Build Your Cryptocurrency Portfolio
			</h2>

			{/* Gradient Overlays */}
			<div className='pointer-events-none absolute top-0 left-16 h-full w-32 z-20 bg-gradient-to-r from-black via-black/70 to-transparent' />
			<div className='pointer-events-none absolute top-0 right-16 h-full w-32 z-20 bg-gradient-to-l from-black via-black/70 to-transparent' />

			{loading ? (
				<div className='text-white py-10'>Loading coins...</div>
			) : error ? (
				<div className='text-red-500 py-10'>Failed to load coin data.</div>
			) : (
				<div className='space-y-6 w-full'>
					{rows.map((rowCoins, rowIdx) => (
						<div
							key={rowIdx}
							onMouseEnter={() => setHoveredRow(rowIdx)}
							onMouseLeave={() => setHoveredRow(null)}
							className='overflow-hidden w-full'>
							<div
								className={`min-w-[300%] flex gap-8 whitespace-nowrap ${
									hoveredRow === rowIdx ? '' : 'animate-scroll-left'
								}`}>
								{rowCoins.map((coin, index) => (
									<div
										key={index}
										className='group flex items-center gap-3 px-8 border border-gray-300/50 py-4 rounded-full hover:bg-lime-400 hover:text-black hover:scale-110 transition-all duration-300 cursor-pointer flex-shrink-0'>
										<img
											src={coin.image}
											alt={coin.name}
											loading='lazy'
											className='h-8 w-8 object-contain rounded-full'
											onError={(e) => {
												e.currentTarget.src =
													'https://via.placeholder.com/32?text=?';
											}}
										/>
										<span className='text-white group-hover:text-black text-sm font-medium'>
											{coin.symbol.toUpperCase()}
										</span>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			)}

			<Link to={'/contract-trade/BTC-USDT'} className='mt-14 bg-lime-400 hover:bg-lime-500 text-black font-semibold py-3 px-6 rounded-md text-sm z-20'>
				Trade Now with $10
			</Link>
		</section>
	);
};

export default CryptoPortfolio;
