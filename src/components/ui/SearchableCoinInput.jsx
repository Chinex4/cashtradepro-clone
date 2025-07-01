import { useEffect, useRef, useState } from "react";

const SearchableCoinInput = ({ selectedCoin, setSelectedCoin }) => {
  const [coins, setCoins] = useState([]);
  const [searchInput, setSearchInput] = useState({ name: selectedCoin?.name ?? '', image: selectedCoin?.image ?? '' });
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&x_cg_pro_api_key=${
            import.meta.env.VITE_COINGECKO_API_KEY
          }`
        );
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        console.error("Failed to fetch coins:", err);
      }
    };

    fetchCoins();
  }, []);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchInput.name.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchInput.name.toLowerCase())
  );

  const handleCoinSelect = (coin) => {
    setSelectedCoin(coin);
    setSearchInput({ name: coin.name, image: coin.image });
    setIsInputFocused(false);
    inputRef.current?.blur(); // force blur
  };

  return (
    <div className="mb-4 relative text-[10px]">
      <label className="text-[10px] mb-1 block">Select coin</label>
      <div className="relative">
        {searchInput.image && (
          <img
            src={searchInput.image}
            alt={searchInput.name}
            className="absolute left-2 top-[8px] w-5 h-5 pointer-events-none"
          />
        )}
        <input
          ref={inputRef}
          value={`${searchInput.name}`}
          onChange={(e) =>
            setSearchInput({ name: e.target.value, image: searchInput.image })
          }
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          placeholder="Search for a coin"
          className="w-full bg-[#1A1A1A] border border-gray-700 px-8 py-2 rounded"
        />
      </div>

      {isInputFocused && filteredCoins.length > 0 && (
        <ul className="absolute z-10 bg-[#111] border border-gray-700 w-full mt-1 rounded max-h-60 overflow-auto">
          {filteredCoins.map((coin) => (
            <li
              key={coin.id}
              onMouseDown={() => handleCoinSelect(coin)}
              className="px-3 py-2 hover:bg-black cursor-pointer flex items-center gap-2"
            >
              <img src={coin.image} alt="" className="w-5 h-5" />
              {coin.name} ({coin.symbol.toUpperCase()})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableCoinInput;
