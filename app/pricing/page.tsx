import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PricingPageContent from '@/components/pricing/PricingPageContent'

export const metadata = {
  title: 'Pricing — Plans for Every Founder',
  description: 'Access verified startup deals, cloud credits, and grants. Explorer at $1.99/mo, Founder at $89.99/yr with unlimited access and private community, or Legend lifetime at $149.99.',
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
