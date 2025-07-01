import React from 'react'
import GiftsSection from '../../components/mobile/GiftSection'
import DepositBuySection from '../../components/mobile/DepositBuySection'
import TrendingCryptos from '../../components/desktop/home/TrendingCryptos'
import WhoIsUsing from '../../components/desktop/home/WhoIsUsing'
import WhyBitunix from '../../components/desktop/home/WhyCashtradepro'
import BeginJourney from '../../components/desktop/home/BeginJourney'
import ReviewsSection from '../../components/desktop/home/ReviewsSection'
import BitunixApp from '../../components/desktop/home/CashtradeproApp'

const MobileHome = () => {
  return (
    <>
        <GiftsSection />
        <DepositBuySection />
        <TrendingCryptos />
        <WhoIsUsing />
        <WhyBitunix />
        <BeginJourney />
        <ReviewsSection />
        <BitunixApp />
    </>
  )
}

export default MobileHome