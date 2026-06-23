'use client'

import GrantsHeader from '@/components/deals/GrantsHeader'
import GrantsHero from '@/components/deals/GrantsHero'
import GrantsStrategy from '@/components/deals/GrantsStrategy'
import GrantsGrid from '@/components/deals/GrantsGrid'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useParams } from 'next/navigation'

const COUNTRY_REGION_MAP: Record<string, string> = {
  us: 'United States',
  uk: 'United Kingdom',
  in: 'India',
  eu: 'Europe',
  sea: 'Southeast Asia',
  mena: 'MENA',
  af: 'Africa',
  global: 'Global',
}

export default function LocalizedGrantsPage() {
  const params = useParams()
  const countrySlug = (params?.country as string || 'global').toLowerCase()
  const mappedRegion = COUNTRY_REGION_MAP[countrySlug] || 'Global'

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 pt-6 md:pt-8 pb-2 lg:pb-4">
          <GrantsHeader />
          <GrantsHero />
          <GrantsStrategy />
          <GrantsGrid defaultRegion={mappedRegion} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
