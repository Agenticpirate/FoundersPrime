import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StartupsContent from '@/components/startups/StartupsContent'

export const metadata: Metadata = {
  title: 'Verified Startups Database - FoundersPrime',
  description: 'Browse 1,150+ verified startups for acquisition. Real revenue, real metrics, real opportunities from TrustMRR and Acquire.com.',
}

export default function StartupsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#F4F3EF]">
      <Header />
      <main className="flex-1">
        <StartupsContent />
      </main>
      <Footer />
    </div>
  )
}
