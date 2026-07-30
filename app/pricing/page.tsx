import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PricingPageContent from '@/components/pricing/PricingPageContent'

export const metadata = {
  title: 'Pricing — Plans for Every Founder',
  description:
    'Verified startup deals, cloud credits, and grants. NextFounder from $1 for the first month, then $14.99/yr. Founder from $9.99 for the first month, then $48/yr. Legend at $99 one-time for lifetime access.',
  alternates: {
    canonical: 'https://www.foundersprime.com/pricing',
  },
  openGraph: {
    title: 'Pricing — Plans for Every Founder | FoundersPrime',
    description:
      'NextFounder from $1 first month then $14.99/yr · Founder from $9.99 first month then $48/yr · Legend $99 lifetime. Access verified startup credits, grants, and SaaS deals.',
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
