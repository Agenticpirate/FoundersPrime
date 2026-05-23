'use client'

import { useState, useEffect } from 'react'
import { Deal, getAllCategories } from '@/lib/deals-database'
import { getStartupProgramUrl } from '@/lib/comprehensive-startup-urls'
import Link from 'next/link'
import DealCard from './DealCard'

export default function AdCreditsGrid() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await fetch('/api/deals?category=ad-credits')
        const data = await response.json()
        if (data.success) {
          setDeals(data.deals)
        }
      } catch (error) {
        console.error('Error fetching ad credits:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDeals()
  }, [])

  const convertDealToCardFormat = (deal: Deal) => {
    const categories = getAllCategories()
    const category = categories.find(cat => cat.id === deal.category)

    let badge = undefined
    let badgeColor = undefined

    if (deal.recommended) {
      badge = 'Recommended'
      badgeColor = 'bg-orange-500'
    } else if (deal.featured) {
      badge = 'Featured'
      badgeColor = 'bg-yellow-400'
    }

    const hasVerifiedEligibility =
      deal.eligibility &&
      deal.eligibility.length > 0 &&
      deal.eligibility[0] !== 'Startups' &&
      deal.eligibility[0] !== 'New accounts' &&
      deal.verified

    return {
      id: deal.slug,
      logo: deal.logoUrl || '',
      category: category?.name || deal.category,
      badge,
      badgeColor,
      title: deal.title,
      provider: `By ${deal.provider}`,
      value: deal.value,
      valueSubtext: deal.savings ? `Save ${deal.savings}` : 'Value',
      valueStyle: deal.featured ? 'bg-ink text-white text-primary' : 'bg-white text-ink border-2 border-ink',
      description: deal.shortDescription,
      eligibility: hasVerifiedEligibility ? deal.eligibility[0] : undefined,
      applicationUrl: getStartupProgramUrl(deal.provider),
      verified: deal.verified,
    }
  }

  return (
    <section className="relative w-full mb-6">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-sm bg-pink-100 border-2 border-black shadow-[1px_1px_0px_#111]">
            <span className="material-symbols-outlined !text-[16px] text-pink-700">campaign</span>
          </span>
          <div>
            <h2 className="font-mono text-[14px] md:text-base font-black uppercase tracking-[0.06em] text-black leading-none">
              All Ad Programs
            </h2>
            <p className="text-[10.5px] text-gray-500 mt-1">
              {deals.length > 0 ? `${deals.length} active programs · refreshed regularly` : 'Refreshed regularly'}
            </p>
          </div>
        </div>
        <Link
          href="/deals"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10.5px] font-black uppercase tracking-wider border-2 border-black bg-white text-black rounded-sm shadow-[2px_2px_0px_#111] hover:bg-accent-yellow hover:shadow-[3px_3px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all"
        >
          All Deals
          <span className="material-symbols-outlined !text-[12px]">arrow_forward</span>
        </Link>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white border-2 border-gray-100 rounded-sm p-4 animate-pulse"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-sm flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 bg-gray-100 rounded w-3/4" />
                  <div className="h-2.5 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
              <div className="space-y-2 mb-3">
                <div className="h-2.5 bg-gray-100 rounded w-full" />
                <div className="h-2.5 bg-gray-100 rounded w-5/6" />
              </div>
              <div className="h-5 bg-gray-100 rounded w-1/3 mb-3" />
              <div className="h-8 bg-gray-100 rounded-sm w-full" />
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && deals.length === 0 && (
        <div className="bg-white border-2 border-black border-dashed rounded-sm p-8 text-center">
          <span className="material-symbols-outlined !text-[32px] text-gray-400 mb-2 block">campaign</span>
          <h3 className="font-mono font-black uppercase text-sm text-black mb-1">No programs available right now</h3>
          <p className="text-[12px] text-gray-500 max-w-sm mx-auto">
            We&apos;re refreshing the catalog. Check back shortly or browse other categories.
          </p>
          <Link
            href="/deals"
            className="mt-4 inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono font-black text-[11px] uppercase tracking-wider px-4 py-2 border-2 border-black rounded-sm shadow-[2px_2px_0px_#111] hover:bg-amber-300 hover:shadow-[3px_3px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all"
          >
            Browse all deals
            <span className="material-symbols-outlined !text-[14px]">arrow_forward</span>
          </Link>
        </div>
      )}

      {/* Grid */}
      {!loading && deals.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={convertDealToCardFormat(deal)} />
          ))}
        </div>
      )}

      {/* Decorative platform showcase mandala — fills the page nicely below the grid */}
      {!loading && deals.length > 0 && (
        <div className="relative mt-8 md:mt-10 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white border-2 border-black shadow-[4px_4px_0px_rgba(244,114,182,0.55)] rounded-sm overflow-hidden">
          {/* Layered mandalas */}
          <div className="absolute -top-16 -left-16 w-72 h-72 pointer-events-none opacity-[0.12]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-full text-pink-300 ad-grid-feature-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.7">
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
          <div className="absolute -bottom-12 -right-12 w-64 h-64 pointer-events-none opacity-[0.08]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-full text-accent-yellow ad-grid-feature-mandala-spin-reverse" fill="none" stroke="currentColor" strokeWidth="0.7">
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

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 p-5 md:p-7">
            <div className="md:col-span-2 min-w-0">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-pink-300 mb-3 inline-flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-pink-300 animate-pulse" />
                Platform Coverage
              </p>
              <h3 className="font-mono text-base md:text-xl font-black uppercase tracking-tight leading-tight mb-2.5">
                Search · Social · Display · B2B
              </h3>
              <p className="text-[12.5px] md:text-[13px] text-gray-300 leading-relaxed mb-4">
                Programs span every major platform — from search-intent channels like Google Ads to broad social reach (Meta, TikTok, X) and B2B-focused (LinkedIn). Pick what matches your buyer.
              </p>

              <div className="flex flex-wrap gap-1.5">
                {['Google Ads', 'Meta', 'LinkedIn', 'X / Twitter', 'TikTok', 'Reddit', 'Pinterest', 'Quora'].map((p) => (
                  <span
                    key={p}
                    className="font-mono text-[9.5px] font-black uppercase tracking-wider bg-white/5 text-white border border-white/15 px-2 py-0.5 rounded-sm"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Right side stats */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2.5">
              <div className="bg-white/5 backdrop-blur-sm border border-white/15 rounded-sm p-3.5">
                <p className="font-mono text-[8.5px] font-bold uppercase tracking-[0.14em] text-gray-400 mb-1">High Intent</p>
                <p className="font-mono text-base font-black bg-gradient-to-br from-pink-300 to-rose-200 bg-clip-text text-transparent">Search ads</p>
                <p className="text-[10.5px] text-gray-400 mt-1 leading-snug">Best for direct conversions</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/15 rounded-sm p-3.5">
                <p className="font-mono text-[8.5px] font-bold uppercase tracking-[0.14em] text-gray-400 mb-1">Broad Reach</p>
                <p className="font-mono text-base font-black bg-gradient-to-br from-accent-yellow to-amber-200 bg-clip-text text-transparent">Social ads</p>
                <p className="text-[10.5px] text-gray-400 mt-1 leading-snug">Awareness & retargeting</p>
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes adGridFeatureSpin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes adGridFeatureSpinReverse {
              from { transform: rotate(0deg); }
              to { transform: rotate(-360deg); }
            }
            :global(.ad-grid-feature-mandala-spin) {
              animation: adGridFeatureSpin 110s linear infinite;
              transform-origin: center;
            }
            :global(.ad-grid-feature-mandala-spin-reverse) {
              animation: adGridFeatureSpinReverse 130s linear infinite;
              transform-origin: center;
            }
            @media (prefers-reduced-motion: reduce) {
              :global(.ad-grid-feature-mandala-spin),
              :global(.ad-grid-feature-mandala-spin-reverse) { animation: none; }
            }
          `}</style>
        </div>
      )}

      {/* Footer note */}
      {!loading && deals.length > 0 && (
        <p className="mt-5 text-center font-mono text-[10.5px] uppercase tracking-[0.14em] text-gray-500 inline-flex items-center justify-center gap-1.5 w-full">
          <span className="w-1 h-1 rounded-full bg-accent-yellow" />
          Eligibility, terms, and credit amounts depend on each provider
          <span className="w-1 h-1 rounded-full bg-accent-yellow" />
        </p>
      )}
    </section>
  )
}
