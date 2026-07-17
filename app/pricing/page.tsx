import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PricingPageContent from '@/components/pricing/PricingPageContent'

export const metadata = {
  title: 'Pricing — Plans for Every Founder',
  description:
    'Verified startup deals, cloud credits, and grants. NextFounder at $1/yr for students and indie hackers. Founder at $48/yr for full catalog access. Legend at $99 one-time for lifetime access.',
  alternates: {
    canonical: 'https://www.foundersprime.com/pricing',
  },
  openGraph: {
    title: 'Pricing — Plans for Every Founder | FoundersPrime',
    description:
      'NextFounder $1/yr · Founder $48/yr · Legend $99 lifetime. Access verified startup credits, grants, and SaaS deals.',
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
