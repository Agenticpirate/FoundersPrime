import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StartupsContent from '@/components/startups/StartupsContent'
import { getStartupCards, getStartupCount } from '@/lib/startups-data'

export const metadata: Metadata = {
  title: 'Verified Startups Database',
  description: 'Browse verified startups for acquisition. Real revenue, real metrics, real opportunities from TrustMRR and Acquire.com.',
  alternates: {
    canonical: 'https://www.foundersprime.com/startups',
  },
}

export default function StartupsPage() {
  const startups = getStartupCards()
  const count = getStartupCount()

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50">
      <Header />
      <main className="flex-1">
        <StartupsContent startups={startups} count={count} />
      </main>
      <Footer />
    </div>
  )
}
