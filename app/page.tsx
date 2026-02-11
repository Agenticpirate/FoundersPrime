import type { Metadata } from 'next'
import AnnouncementBar from '@/components/AnnouncementBar'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ProblemSection from '@/components/ProblemSection'
import MarqueeTicker from '@/components/MarqueeTicker'
import SystemModules from '@/components/SystemModules'
import TopWeeklyDeals from '@/components/TopWeeklyDeals'
import WorkflowProtocol from '@/components/WorkflowProtocol'
import VerifiedIdeasAndFundedDB from '@/components/VerifiedIdeasAndFundedDB'
import FounderLogs from '@/components/FounderLogs'

import ProviderSection from '@/components/ProviderSection'

import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'FoundersPrime | Verified Startup Deals & Grants',
  description: 'Join 1000+ founders saving millions with our verified database of startup credits, grants, and software deals.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: 'https://www.foundersprime.com',
  name: 'FoundersPrime',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.foundersprime.com/search?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnnouncementBar />
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ProblemSection />
        <SystemModules />
        <WorkflowProtocol />
        <TopWeeklyDeals />
        <VerifiedIdeasAndFundedDB />
        <FounderLogs />

        <ProviderSection />

        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}