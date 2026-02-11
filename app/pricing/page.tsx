import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PricingPageContent from '@/components/pricing/PricingPageContent'

export const metadata = {
  title: 'Pricing | FoundersPrime',
  description: 'Join the elite community of founders. Stop overpaying for software.',
}

export default function PricingPage() {
  return (
    <>
      <Header />
      <PricingPageContent />
      <Footer />
    </>
  )
}
