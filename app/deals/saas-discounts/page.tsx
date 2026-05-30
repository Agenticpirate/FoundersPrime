import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SaasHeader from '@/components/deals/SaasHeader'
import SaasHero from '@/components/deals/SaasHero'
import SaasStrategy from '@/components/deals/SaasStrategy'
import SaasGrid from '@/components/deals/SaasGrid'

export const metadata: Metadata = {
  title: 'SaaS Discounts',
  description: 'Access verified SaaS tools for free or at massive discounts. From productivity to marketing to customer support — we\'ve got your entire stack covered.',
  alternates: {
    canonical: 'https://www.foundersprime.com/deals/saas-discounts',
  },
}

export default function SaasDiscountsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50">
      <Header />
      <main className="flex-1 text-[#111111]">
        {/* Main Layout */}
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-5">
          <SaasHeader />
          <SaasHero />
          <SaasStrategy />
          <SaasGrid />
        </div>
      </main>
      <Footer />
    </div>
  )
}
