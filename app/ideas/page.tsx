import { Metadata } from 'next'
import IdeasHeader from '@/components/ideas/IdeasHeader'
import IdeasContent from '@/components/ideas/IdeasContent'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Startup Ideas Hub',
  description:
    'Startup Ideas Hub — 200+ validated problems from YC, founder itch lists, and AI opportunity briefs. Browse markets, signal scores, and build what the market wants.',
  alternates: {
    canonical: 'https://www.foundersprime.com/ideas',
  },
}

export default function IdeasPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#fafafa] dark:bg-[#000000] text-[#1a1a1a] dark:text-white transition-colors duration-300">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-3.5 sm:px-5 lg:px-8 py-5 sm:py-8 lg:py-10">
          <IdeasHeader />
          <IdeasContent />
        </div>
      </main>
      <Footer />
    </div>
  )
}
