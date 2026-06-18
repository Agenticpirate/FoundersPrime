'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface Deal {
  id: string
  slug: string
  title: string
  provider: string
  category: string
  value: string
  logoUrl?: string
  applicationUrl?: string
  shortDescription?: string
}

// Curated line-up for the homepage showcase. Order is intentional, and an
// optional `value` overrides the source value purely for display here.
const FEATURED_DEALS: { slug: string; value?: string }[] = [
  { slug: 'notion' },
  { slug: 'microsoft-for-startups-founders-hub', value: '$150,000 in Azure credits' },
  { slug: 'stripe-startups' },
  { slug: 'google-for-startups-cloud' },
  { slug: 'airtable-for-startups' },
  { slug: 'aws-activate' },
]

// Prefix every value with "Up to" unless it already leads with it.
function formatValue(value: string): string {
  if (!value) return value
  return /^up to\b/i.test(value.trim()) ? value : `Up to ${value}`
}

export default function TopWeeklyDeals() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    async function loadDeals() {
      try {
        const response = await fetch('/data/all-deals.json')
        const allDeals: Deal[] = await response.json()
        const bySlug = new Map(allDeals.map((d) => [d.slug, d]))

        // Build the curated list, falling back to any valid deals if a slug is missing.
        const curated = FEATURED_DEALS
          .map(({ slug, value }) => {
            const deal = bySlug.get(slug)
            return deal ? { ...deal, value: value ?? deal.value } : null
          })
          .filter((d): d is Deal => d !== null && !!d.provider && !!d.value && !!d.logoUrl)

        setDeals(curated.slice(0, 6))
      } catch (error) {
        console.error('Failed to load deals:', error)
      } finally {
        setLoading(false)
      }
    }
    loadDeals()
  }, [])

  const handleScroll = () => {
    const container = scrollRef.current
    if (!container) return
    const scrollLeft = container.scrollLeft
    const cardWidth = (container.children[0] as HTMLElement)?.offsetWidth || 0
    const idx = Math.round(scrollLeft / (cardWidth + 16))
    setActiveIdx(Math.min(idx, deals.length - 1))
  }

  if (loading) {
    return (
      <section className="py-8 md:py-14 bg-black relative">
        <div className="max-w-[1600px] mx-auto px-4 text-center">
          <div className="animate-pulse font-mono text-white">Loading deals...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-8 md:py-14 bg-black border-y-2 border-black overflow-hidden grid-bg-dark">
      {/* Glow accents */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-accent-yellow/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-10 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 border border-black mb-3 shadow-[2px_2px_0px_#fff]">
              <span className="material-symbols-outlined text-[12px]">local_fire_department</span>
              Fresh this week
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-1.5 font-mono uppercase tracking-tight">
              The deals founders are{' '}
              <span className="bg-gradient-to-r from-accent-yellow via-yellow-300 to-orange-400 bg-clip-text text-transparent">
                claiming right now.
              </span>
            </h2>
            <p className="text-sm text-gray-400 font-sans">Hand-picked, manually verified, refreshed every Monday. The ones worth your morning.</p>
          </div>
          <div className="relative">
            <Link
              href="/deals"
              className="bg-accent-yellow text-black px-5 py-3 text-sm font-mono font-black uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2 border-2 border-accent-yellow shadow-[3px_3px_0px_rgba(255,255,255,0.2)] hover:shadow-[5px_5px_0px_rgba(255,255,255,0.3)] hover:-translate-y-0.5"
            >
              View all deals
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Mobile: horizontal snap scroll */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:hidden gap-3 overflow-x-auto snap-x snap-mandatory pb-4 pt-2 -mx-4 px-4 scroll-smooth mobile-scroll-hide"
          style={{ scrollPaddingLeft: '16px' }}
        >
          {deals.map((deal, index) => (
            <div
              key={deal.id || index}
              className="bg-white border-2 border-black p-0 relative snap-start shrink-0 w-[78vw] shadow-[4px_4px_0px_rgba(255,221,0,0.5)]"
            >
              <div className="p-3 border-b-2 border-black flex justify-between items-center bg-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-white border-2 border-black flex items-center justify-center overflow-hidden shadow-[1px_1px_0px_#111]">
                    {deal.logoUrl ? (
                      <img
                        src={deal.logoUrl}
                        alt={deal.provider}
                        width={28}
                        height={28}
                        className="object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          target.parentElement!.innerHTML = `<span class="material-symbols-outlined text-gray-400 text-sm">business</span>`
                        }}
                      />
                    ) : (
                      <span className="material-symbols-outlined text-gray-400 text-sm">business</span>
                    )}
                  </div>
                  <span className="font-mono font-black text-xs uppercase tracking-tight">{deal.provider}</span>
                </div>
                <span className="bg-green-400 text-black border border-black text-[9px] font-mono font-black px-1.5 py-0.5 uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-black animate-pulse" />
                  Active
                </span>
              </div>
              <div className="p-3">
                <h4 className="font-black text-sm mb-0.5 font-mono line-clamp-1">{deal.title || deal.provider}</h4>
                <p className="text-[10px] text-gray-500 mb-2 font-mono uppercase tracking-wider">{deal.category}</p>
                {deal.shortDescription && (
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">{deal.shortDescription}</p>
                )}
                <div className="bg-black text-accent-yellow font-mono font-black text-base px-2.5 py-1.5 mb-3 inline-flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">savings</span>
                  {formatValue(deal.value)}
                </div>
                <Link
                  href={`/deals/${deal.slug}`}
                  className="block w-full border-2 border-black bg-black text-white hover:bg-accent-yellow hover:text-black transition-colors font-mono font-black py-2 text-xs uppercase text-center tracking-wider"
                >
                  View deal →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile dots */}
        <div className="flex md:hidden justify-center gap-1.5 mt-3">
          {deals.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: activeIdx === idx ? 16 : 6,
                height: 6,
                backgroundColor: activeIdx === idx ? '#FFD500' : '#444',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5">
          {deals.map((deal, index) => (
            <div
              key={deal.id || index}
              className="relative bg-white border-2 border-black p-0 group shadow-[5px_5px_0px_rgba(255,221,0,0.6)] hover:shadow-[7px_7px_0px_rgba(255,221,0,0.8)] hover:-translate-y-1 transition-all"
            >
              <div className="p-4 border-b-2 border-black flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center overflow-hidden shadow-[2px_2px_0px_#111]">
                    {deal.logoUrl ? (
                      <img
                        src={deal.logoUrl}
                        alt={deal.provider}
                        width={36}
                        height={36}
                        className="object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          target.parentElement!.innerHTML = `<span class="material-symbols-outlined text-gray-400">business</span>`
                        }}
                      />
                    ) : (
                      <span className="material-symbols-outlined text-gray-400">business</span>
                    )}
                  </div>
                  <span className="font-mono font-black text-sm uppercase tracking-tight">{deal.provider}</span>
                </div>
                <span className="bg-green-400 text-black border border-black text-[10px] font-mono font-black px-2 py-0.5 uppercase tracking-wider flex items-center gap-1.5 shadow-[1px_1px_0px_#111]">
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                  Active
                </span>
              </div>
              <div className="p-5">
                <h4 className="font-black text-lg md:text-xl mb-1 font-mono line-clamp-1 uppercase">
                  {deal.title || deal.provider}
                </h4>
                <p className="text-[11px] text-gray-500 mb-3 font-mono uppercase tracking-widest">{deal.category}</p>
                {deal.shortDescription && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{deal.shortDescription}</p>
                )}
                <div className="bg-black text-accent-yellow font-mono font-black text-xl px-3 py-2 mb-5 inline-flex items-center gap-2 border-2 border-black">
                  <span className="material-symbols-outlined text-xl">savings</span>
                  {formatValue(deal.value)}
                </div>
                <Link
                  href={`/deals/${deal.slug}`}
                  className="block w-full border-2 border-black bg-black text-white hover:bg-accent-yellow hover:text-black transition-colors font-mono font-black py-3 text-sm uppercase text-center tracking-wider"
                >
                  View deal →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
