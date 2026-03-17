'use client'

import GrantsHeader from '@/components/deals/GrantsHeader'
import GrantsHero from '@/components/deals/GrantsHero'
import GrantsStrategy from '@/components/deals/GrantsStrategy'
import GrantsGrid from '@/components/deals/GrantsGrid'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function GrantsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-6">
          <GrantsHeader />
          <GrantsHero />
          <GrantsStrategy />
          <GrantsGrid />
        </div>
      </main>
      <Footer />
    </div>
  )
}
