import { Metadata } from 'next'
import AdCreditsHeader from '@/components/deals/AdCreditsHeader'
import AdCreditsHero from '@/components/deals/AdCreditsHero'
import AdCreditsStrategy from '@/components/deals/AdCreditsStrategy'
import AdCreditsGrid from '@/components/deals/AdCreditsGrid'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'FoundersPrime - Ad Credits',
  description: 'Paid acquisition without the paid part. Access free ad credits from Google, Meta, TikTok, LinkedIn, and more.',
}

export default function AdCreditsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#F4F3EF]">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-6">
          <AdCreditsHeader />
          <AdCreditsHero />
          <AdCreditsStrategy />
          <AdCreditsGrid />
        </div>
      </main>
      <Footer />
    </div>
  )
}
