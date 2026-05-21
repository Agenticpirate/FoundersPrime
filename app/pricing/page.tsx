import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PricingPageContent from '@/components/pricing/PricingPageContent'

export const metadata = {
  title: 'Pricing — Plans for Every Founder',
  description: 'Verified startup deals, cloud credits, and grants. NextFounder at $29.99/yr for students, indie hackers and early builders. Founder at $99.99/yr (was $149) with unlimited access. Legend lifetime at $149 (was $299).',
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
