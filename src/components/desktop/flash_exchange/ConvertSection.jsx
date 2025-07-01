import React, { useEffect, useState } from 'react';
import axios from 'axios';

const availableCoins = [
	{ id: 'tether', symbol: 'USDT' },
	{ id: 'bitcoin', symbol: 'BTC' },
	{ id: 'ethereum', symbol: 'ETH' },
	{ id: 'litecoin', symbol: 'LTC' },
];

const ConvertSection = () => {
	const [payCoin, setPayCoin] = useState('tether');
	const [receiveCoin, setReceiveCoin] = useState('bitcoin');
	const [payAmount, setPayAmount] = useState('');
	const [convertedAmount, setConvertedAmount] = useState('');
	const [prices, setPrices] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPrices = async () => {
			try {
				setLoading(true);
				const res = await axios.get(
					'https://api.coingecko.com/api/v3/simple/price',
					{
						params: {
							ids: availableCoins.map((c) => c.id).join(','),
							vs_currencies: 'usd',
						},
					}
				);
				setPrices(res.data);
			} catch (error) {
				console.error('Price fetch failed', error);
			} finally {
				setLoading(false);
			}
		};

		fetchPrices();
	}, []);

	useEffect(() => {
		calculateConversion();
	}, [payAmount, payCoin, receiveCoin, prices]);

	const calculateConversion = () => {
		if (!payAmount || isNaN(payAmount)) {
			setConvertedAmount('');
			return;
		}

		const payPrice = prices[payCoin]?.usd;
		const receivePrice = prices[receiveCoin]?.usd;

		if (payPrice && receivePrice) {
			const usdValue = parseFloat(payAmount) * payPrice;
			const receiveValue = usdValue / receivePrice;
			setConvertedAmount(receiveValue.toFixed(8));
		}
	};

	const handleSwap = () => {
		const temp = payCoin;
		setPayCoin(receiveCoin);
		setReceiveCoin(temp);
		setPayAmount('');
		setConvertedAmount('');
	};

	const getSymbol = (id) => availableCoins.find((c) => c.id === id)?.symbol;

	return (
		<div className='bg-black text-white px-4 pt-20 py-10 flex flex-col items-center'>
			<h2 className='text-3xl font-bold mb-1'>Convert</h2>
			<p className='text-gray-400 mb-6 text-sm'>
				0 Fee · No Slippage · More Token Pairs
			</p>

			<div className='bg-[#0d0d0d] border border-zinc-700 rounded-lg p-6 w-full max-w-md'>
				{/* Pay Section */}
				<div className='mb-4'>
					<div className='flex justify-between text-sm text-gray-400 mb-1'>
						<span>Pay</span>
						<span>
							Balance: 0{' '}
							<span className='text-lime-400 cursor-pointer'>Max</span>
						</span>
					</div>
					<div className='bg-zinc-800 rounded-md p-3 flex items-center justify-between'>
						<select
							value={payCoin}
							onChange={(e) => setPayCoin(e.target.value)}
							className='bg-transparent text-white outline-none'>
							{availableCoins.map((coin) => (
								<option
									key={coin.id}
									value={coin.id}>
									{coin.symbol}
								</option>
							))}
						</select>
						<input
							type='number'
							min='0'
							placeholder='0.00'
							className='bg-transparent text-right w-1/2 outline-none'
							value={payAmount}
							onChange={(e) => setPayAmount(e.target.value)}
						/>
					</div>
				</div>

				{/* Swap Button */}
				<div className='flex justify-center my-2'>
					<button
						onClick={handleSwap}
						className='w-10 h-10 bg-zinc-800 rounded-full border border-zinc-600 text-xl'>
						⬇
					</button>
				</div>

				{/* Receive Section */}
				<div className='mb-4'>
					<div className='flex justify-between text-sm text-gray-400 mb-1'>
						<span>Receive</span>
						<span>&nbsp;</span>
					</div>
					<div className='bg-zinc-800 rounded-md p-3 flex items-center justify-between'>
						<select
							value={receiveCoin}
							onChange={(e) => setReceiveCoin(e.target.value)}
							className='bg-transparent text-white outline-none'>
							{availableCoins.map((coin) => (
								<option
									key={coin.id}
									value={coin.id}>
									{coin.symbol}
								</option>
							))}
						</select>
						<div className='text-right w-1/2'>
							{convertedAmount ? (
								<span>{convertedAmount}</span>
							) : (
								<span className='text-gray-500'>0.00</span>
							)}
						</div>
					</div>
				</div>

				{/* Convert Button */}
				<button
					disabled={!payAmount || parseFloat(payAmount) <= 0}
					className={`w-full mt-4 py-2 rounded-md font-semibold ${
						payAmount
							? 'bg-lime-500 text-black'
							: 'bg-zinc-700 text-gray-500 cursor-not-allowed'
					}`}>
					Convert
				</button>

				{/* Footer */}
				<div className='text-center text-gray-400 text-sm mt-4 underline cursor-pointer'>
					🧾 Conversion Records
				</div>
			</div>
		</div>
	);
};

export default ConvertSection;
