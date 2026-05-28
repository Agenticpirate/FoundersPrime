import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PricingPageContent from '@/components/pricing/PricingPageContent'

export const metadata = {
  title: 'Pricing — Plans for Every Founder',
  description: 'Verified startup deals, cloud credits, and grants. NextFounder at $59/yr for students, indie hackers, and early builders. Founder at $149/yr for unlimited access. Legend at $299 one-time for lifetime access.',
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
