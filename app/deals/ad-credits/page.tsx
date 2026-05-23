import { Metadata } from 'next'
import AdCreditsHeader from '@/components/deals/AdCreditsHeader'
import AdCreditsHero from '@/components/deals/AdCreditsHero'
import AdCreditsStrategy from '@/components/deals/AdCreditsStrategy'
import AdCreditsGrid from '@/components/deals/AdCreditsGrid'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Ad Credits',
  description: 'Paid acquisition without the paid part. Access free ad credits from Google, Meta, TikTok, LinkedIn, and more.',
}

export default function AdCreditsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50">
      <Header />
      <main className="flex-1 relative">
        {/* Ambient page mandalas — large, very subtle, absolute behind content */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* Top-right large concentric mandala */}
          <div className="absolute top-12 -right-24 w-96 h-96 opacity-[0.05]">
            <svg viewBox="0 0 200 200" className="w-full h-full text-pink-700 ad-page-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
              <circle cx="100" cy="100" r="40" />
              <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
              <circle cx="100" cy="100" r="80" strokeDasharray="1 6" />
              {[...Array(16)].map((_, i) => {
                const angle = (i * Math.PI) / 8
                return (
                  <line
                    key={i}
                    x1="100"
                    y1="100"
                    x2={100 + Math.cos(angle) * 90}
                    y2={100 + Math.sin(angle) * 90}
                    strokeDasharray="3 3"
                  />
                )
              })}
              <circle cx="100" cy="100" r="3" fill="currentColor" />
            </svg>
          </div>

          {/* Mid-left orbital mandala */}
          <div className="absolute top-1/3 -left-20 w-72 h-72 opacity-[0.05]">
            <svg viewBox="0 0 200 200" className="w-full h-full text-rose-600 ad-page-mandala-spin-reverse" fill="none" stroke="currentColor" strokeWidth="0.6">
              {[20, 35, 50, 65].map((r, i) => (
                <ellipse
                  key={i}
                  cx="100"
                  cy="100"
                  rx={r}
                  ry={r / 1.8}
                  transform={`rotate(${i * 30} 100 100)`}
                />
              ))}
              <circle cx="100" cy="100" r="2" fill="currentColor" />
            </svg>
          </div>

          {/* Bottom-right radial mandala */}
          <div className="absolute bottom-32 -right-16 w-80 h-80 opacity-[0.04]">
            <svg viewBox="0 0 200 200" className="w-full h-full text-pink-600 ad-page-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.7">
              <circle cx="100" cy="100" r="50" />
              <circle cx="100" cy="100" r="35" strokeDasharray="3 3" />
              {[...Array(12)].map((_, i) => (
                <line
                  key={i}
                  x1="100"
                  y1="100"
                  x2={100 + Math.cos((i * Math.PI) / 6) * 90}
                  y2={100 + Math.sin((i * Math.PI) / 6) * 90}
                />
              ))}
              <circle cx="100" cy="100" r="2" fill="currentColor" />
            </svg>
          </div>
        </div>

        <div className="relative max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-5">
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
