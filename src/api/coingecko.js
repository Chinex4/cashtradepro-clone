import axios from 'axios';

const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;
const PRO_API_BASE = 'https://pro-api.coingecko.com/api/v3';
const FREE_API_BASE = 'https://api.coingecko.com/api/v3';

const isValidMarkets = (data) => Array.isArray(data) && data.length > 0;

export async function getCoinMarkets(params, { validate = isValidMarkets } = {}) {
	// Try Pro API first
	try {
		const proResponse = await axios.get(`${PRO_API_BASE}/coins/markets`, {
			params,
			headers: API_KEY
				? {
						'x-cg-pro-api-key': API_KEY,
					}
				: undefined,
		});
		if (validate(proResponse.data)) return proResponse.data;
	} catch (proError) {
		// Fall back to free API
	}

	const freeResponse = await axios.get(`${FREE_API_BASE}/coins/markets`, {
		params,
	});
	if (!validate(freeResponse.data)) {
		throw new Error('Invalid CoinGecko API data');
	}
	return freeResponse.data;
}
