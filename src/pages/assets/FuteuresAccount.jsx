import { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import SweetLoader from "../../components/SweetLoader";
import TransferModal from "../../components/modals/TransferModal";

const PER_PAGE_OPTIONS = [20, 50, 100];

const FuturesAccount = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);

  const fetchCoins = async () => {
    const cacheKey = `futures_cache_${perPage}`;
    const timeKey = `futures_cache_time_${perPage}`;
    const cached = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(timeKey);

    if (
      cached &&
      cachedTime &&
      Date.now() - parseInt(cachedTime) < 10 * 60 * 1000
    ) {
      setCoins(JSON.parse(cached));
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      let all = [];
      const pages = Math.ceil(986 / perPage);

      for (let page = 1; page <= pages; page++) {
        const res = await fetch(
          `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}`,
          {
            headers: {
              "x-cg-pro-api-key": import.meta.env.VITE_COINGECKO_API_KEY,
            },
          }
        );
        const data = await res.json();
        all = [...all, ...data];
      }

      setCoins(all);
      localStorage.setItem(cacheKey, JSON.stringify(all));
      localStorage.setItem(timeKey, Date.now().toString());
    } catch (err) {
      console.error("Failed to fetch futures coins", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [perPage]);

  const totalPages = Math.ceil(coins.length / perPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [currentPage, totalPages]);

  const paginatedCoins = coins.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const getPageNumbers = () => {
    const pages = new Set();

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.add(i);
    } else {
      pages.add(1);
      if (currentPage > 4) pages.add("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.add(i);
      if (currentPage < totalPages - 3) pages.add("...");
      pages.add(totalPages);
    }

    return Array.from(pages);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <h2 className="text-2xl font-bold">Futures Account</h2>
        <button
          onClick={() => {
            setSelectedCoin(null);
            setIsTransferOpen(true);
          }}
          className="bg-lime-400 cursor-pointer text-black px-5 py-2 rounded text-sm w-fit"
        >
          Transfer
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <SweetLoader />
      ) : (
        <div className="overflow-x-auto text-sm">
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr className="text-gray-400 border-b border-[#333]">
                <th className="py-3 px-2">Coin</th>
                <th className="py-3 px-2">Currency Equity</th>
                <th className="py-3 px-2">Wallet Balance</th>
                <th className="py-3 px-2">Available</th>
                <th className="py-3 px-2">In Use</th>
                <th className="py-3 px-2">Futures Bonus</th>
                <th className="py-3 px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCoins.map((coin) => (
                <tr
                  key={coin.id}
                  className="border-b border-[#222] hover:bg-[#111]"
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <img
                        className="w-5 h-5"
                        src={coin.image}
                        alt={coin.symbol}
                      />
                      <span className="text-white font-semibold">
                        {coin.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2">0.00</td>
                  <td className="py-3 px-2">0.00</td>
                  <td className="py-3 px-2">0.00</td>
                  <td className="py-3 px-2">0.00</td>
                  <td className="py-3 px-2">0.00</td>
                  <td className="py-3 px-2 text-lime-400">
                    <button
                      onClick={() => {
                        setSelectedCoin(coin);
                        setIsTransferOpen(true);
                      }}
                    >
                      Transfer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {/* Pagination Controls */}
          <div className="flex justify-between items-center text-[11px] text-white mt-6">
            <div className="flex items-center gap-4">
              <span>Display per page</span>
              {PER_PAGE_OPTIONS.map((opt) => (
                <label key={opt} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="perPage"
                    checked={perPage === opt}
                    onChange={() => {
                      setPerPage(opt);
                      setCurrentPage(1);
                    }}
                  />
                  {opt}
                </label>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-2 py-1 border rounded disabled:opacity-40"
              >
                Prev
              </button>

              {getPageNumbers().map((page, i) =>
                page === "..." ? (
                  <span key={`ellipsis-${i}`} className="px-2 text-gray-400">
                    ...
                  </span>
                ) : (
                  <button
                    key={`page-${page}`}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? "bg-white text-black"
                        : "text-gray-400"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-2 py-1 border rounded disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TRANSFER MODAL */}
      <TransferModal
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
        preselectedCoin={selectedCoin}
      />
    </div>
  );
};

export default FuturesAccount;
