'use client'

import IncubatorsHeader from '@/components/deals/IncubatorsHeader'
import IncubatorsHero from '@/components/deals/IncubatorsHero'
import IncubatorsStrategy from '@/components/deals/IncubatorsStrategy'
import IncubatorsGrid from '@/components/deals/IncubatorsGrid'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function IncubatorsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#F4F3EF]">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-2 lg:py-4">
          <IncubatorsHeader />
          <IncubatorsHero />
          <IncubatorsStrategy />
          <IncubatorsGrid />
        </div>
      </main>
      <Footer />
    </div>
  )
}

