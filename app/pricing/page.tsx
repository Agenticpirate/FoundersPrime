import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PricingPageContent from '@/components/pricing/PricingPageContent'

export const metadata = {
  title: 'Pricing — Plans for Every Founder',
  description: 'Verified startup deals, cloud credits, and grants. Campus at $9.99/mo for students, Founder at $99.99/yr (was $149) with unlimited access, or Legend lifetime at $149 (was $299).',
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
