import HeroSection from '../../components/desktop/home/HeroSection';
import NewListingsCarousel from '../../components/desktop/home/NewListingsCarousel';
import TrendingCryptos from '../../components/desktop/home/TrendingCryptos';
import WhoIsUsing from '../../components/desktop/home/WhoIsUsing';
import CryptoPortfolio from '../../components/desktop/home/CryptoPortfolio';
import WhyCashtradepro from '../../components/desktop/home/WhyCashtradepro';
import BeginJourney from '../../components/desktop/home/BeginJourney';
import ReviewsSection from '../../components/desktop/home/ReviewsSection';
import CashtradeproApp from '../../components/desktop/home/CashtradeproApp';

function Home() {
	return (
		<>
			<div className='max-w-7xl mx-auto'>
				<HeroSection />
				<NewListingsCarousel />
				<TrendingCryptos />
				<WhoIsUsing />
				<CryptoPortfolio />
				<WhyCashtradepro />
				<BeginJourney />
				<ReviewsSection />
			</div>
			<CashtradeproApp />
		</>
	);
}

export default Home;
