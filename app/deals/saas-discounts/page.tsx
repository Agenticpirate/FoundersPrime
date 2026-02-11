import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SaasHeader from '@/components/deals/SaasHeader'
import SaasHero from '@/components/deals/SaasHero'
import SaasStrategy from '@/components/deals/SaasStrategy'
import SaasGrid from '@/components/deals/SaasGrid'

export const metadata: Metadata = {
  title: 'SaaS Discounts - FoundersPrime | FoundersPrime',
  description: 'Access 200+ SaaS tools for free or at massive discounts. From productivity to marketing to customer support — we\'ve got your entire stack covered.',
}

export default function SaasDiscountsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#F4F3EF]">
      <Header />
      <main className="flex-1 text-[#111111]">
        {/* Main Layout */}
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-6">
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
