'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DealsHeader from '@/components/deals/DealsHeader'
import DealsHero from '@/components/deals/DealsHero'
import DealsContent from '@/components/deals/DealsContent'

export default function DealsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-2 lg:py-4">
          <DealsHeader />
          <DealsHero />
          <DealsContent />

        </div>
      </main>
      <Footer />
    </div>
  )
}