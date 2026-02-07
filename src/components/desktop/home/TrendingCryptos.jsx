import { ChevronRight } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { Link, useNavigate } from 'react-router-dom';
import { getCoinMarkets } from '../../../api/coingecko';

const CACHE_KEY = 'coingecko_trending_data';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export default function TrendingCryptos() {
	const [activeTab, setActiveTab] = useState('Popular Futures');
	const [cryptoData, setCryptoData] = useState({
		'Popular Futures': [],
		'Popular Spot': [],
		Gainers: [],
	});
	const [loading, setLoading] = useState(true);
	const [lastUpdated, setLastUpdated] = useState(Date.now());
	const navigate = useNavigate();

	const tabs = ['Popular Futures', 'Popular Spot', 'Gainers'];

	useEffect(() => {
		async function fetchCryptoData() {
			try {
				setLoading(true);

				// Check cache
				const cached = localStorage.getItem(CACHE_KEY);
				if (cached) {
					const { data, timestamp } = JSON.parse(cached);
					if (Date.now() - timestamp < CACHE_DURATION) {
						setCryptoData(data);
						setLastUpdated(timestamp);
						setLoading(false);
						return;
					}
				}

				const [futures, spot, gainers] = await Promise.all([
					getCoinMarkets({
						vs_currency: 'usd',
						order: 'open_interest_desc',
						per_page: 5,
						page: 1,
						sparkline: true,
					}),
					getCoinMarkets({
						vs_currency: 'usd',
						order: 'volume_desc',
						per_page: 5,
						page: 1,
						sparkline: true,
					}),
					getCoinMarkets({
						vs_currency: 'usd',
						order: 'price_change_percentage_24h_desc',
						per_page: 5,
						page: 1,
						sparkline: true,
					}),
				]);

				const result = {
					'Popular Futures': futures,
					'Popular Spot': spot,
					Gainers: gainers,
				};

				// Update state and cache
				setCryptoData(result);
				setLastUpdated(Date.now());
				localStorage.setItem(
					CACHE_KEY,
					JSON.stringify({ data: result, timestamp: Date.now() })
				);
			} catch (error) {
				console.error('Failed to fetch crypto data', error);
			} finally {
				setLoading(false);
			}
		}

		fetchCryptoData();

		const intervalId = setInterval(fetchCryptoData, 30000);
		return () => clearInterval(intervalId);
	}, []);

	const displayedData = useMemo(() => {
		return cryptoData[activeTab] || [];
	}, [cryptoData, activeTab]);

	return (
		<div className='bg-black p-4 md:p-6 rounded-lg'>
			{/* Header */}
			<div className='hidden md:flex justify-between items-center mb-6'>
				<h2 className='text-3xl lg:text-4xl font-bold text-white'>
					Trending Cryptocurrencies
				</h2>
				<Link to={'/markets'} href='#' className='text-sm text-white hover:underline flex items-center'>
					View More <ChevronRight className='ml-1' />
				</Link>
			</div>

			{/* Tabs */}
			<div className='flex gap-4 md:gap-6 mb-6 overflow-x-auto scrollbar-hide'>
				{tabs.map((tab) => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`text-sm md:text-lg whitespace-nowrap ${
							activeTab === tab
								? 'text-white font-bold'
								: 'text-neutral hover:text-white transition-colors'
						}`}>
						{tab}
					</button>
				))}
			</div>

			{/* Table Head */}
			<div className='hidden md:grid grid-cols-7 text-white/50 text-xs mb-3'>
				<div>Trading Pairs</div>
				<div>Last Price</div>
				<div>24H Change</div>
				<div>24H High</div>
				<div>24H Volume</div>
				<div>Chart</div>
				<div></div>
			</div>

			{/* Data Rows */}
			{loading ? (
				<div className='flex justify-center items-center py-10'>
					<div className='animate-spin rounded-full h-12 w-12 border-t-4 border-lime-400 border-solid'></div>
				</div>
			) : (
				<div className='space-y-4'>
					{displayedData.map((crypto) => {
						const isUp = crypto.price_change_percentage_24h >= 0;
						return (
							<div
								key={crypto.id}
								className='grid grid-cols-3 md:grid-cols-7 items-center text-white text-sm p-3 rounded-lg hover:bg-[#1b1b1b] transition'>
								{/* Coin Info */}
								<div className='flex items-center gap-2'>
									<img
										src={crypto.image}
										alt={crypto.name}
										className='size-6 rounded-full'
									/>
									{crypto.symbol.toUpperCase()}USDT
								</div>

								<div className='text-xs md:text-sm text-right md:text-left'>
									${crypto.current_price.toLocaleString()}
								</div>

								<div className='text-right md:text-left'>
									<span
										className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
											isUp ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
										}`}>
										{crypto.price_change_percentage_24h?.toFixed(2)}%
									</span>
								</div>

								<div className='hidden md:block text-xs'>
									${crypto.high_24h?.toLocaleString()}
								</div>

								<div className='hidden md:block text-xs'>
									${crypto.total_volume?.toLocaleString()}
								</div>

								<div className='hidden md:block w-24 h-8'>
									<Sparklines data={crypto.sparkline_in_7d?.price}>
										<SparklinesLine
											style={{
												stroke: isUp ? '#22c55e' : '#ef4444',
												fill: 'none',
												strokeWidth: 2,
											}}
										/>
									</Sparklines>
								</div>

								<div className='hidden md:block'>
									<button onClick={() => navigate(`/contract-trade/${crypto.symbol.toUpperCase()}-USDT`)} className='bg-[#171717] px-4 py-1 rounded text-white text-xs hover:bg-lime-400 hover:text-black'>
										Trade
									</button>
								</div>
							</div>
						);
					})}
				</div>
			)}

			{/* Timestamp */}
			<div className='text-right text-white/50 text-xs mt-4'>
				Last updated {Math.floor((Date.now() - lastUpdated) / 1000)}s ago
			</div>
		</div>
	);
}
