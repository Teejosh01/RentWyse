import Header from './components/Header'
import {
  FinalCta,
  FlexiblePayments,
  Footer,
  ForLandlords,
  Hero,
  HowItWorks,
  RentSavings,
  TenantScore,
  WhyRentWyse,
} from './components/HomeSections'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <RentSavings />
        <FlexiblePayments />
        <TenantScore />
        <ForLandlords />
        <WhyRentWyse />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
