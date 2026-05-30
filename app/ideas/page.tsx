import { Metadata } from 'next'
import IdeasHeader from '@/components/ideas/IdeasHeader'
import IdeasContent from '@/components/ideas/IdeasContent'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Startup Ideas',
  description: 'Validated startup ideas with market analysis, competition landscape, and revenue potential. Find your next venture.',
  alternates: {
    canonical: 'https://www.foundersprime.com/ideas',
  },
}

export default function IdeasPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-6">
          <IdeasHeader />
          <IdeasContent />
        </div>
      </main>
      <Footer />
    </div>
  )
}