import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PricingPageContent from '@/components/pricing/PricingPageContent'

export const metadata = {
  title: 'Pricing — Plans for Every Founder',
  description:
    'Verified startup deals, cloud credits, and grants. NextFounder at $59/yr for students and indie hackers. Founder at $149/yr for full catalog access. Legend at $299 one-time for lifetime access.',
  alternates: {
    canonical: 'https://www.foundersprime.com/pricing',
  },
  openGraph: {
    title: 'Pricing — Plans for Every Founder | FoundersPrime',
    description:
      'NextFounder $59/yr · Founder $149/yr · Legend $299 lifetime. Access verified startup credits, grants, and SaaS deals.',
    url: 'https://www.foundersprime.com/pricing',
  },
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
