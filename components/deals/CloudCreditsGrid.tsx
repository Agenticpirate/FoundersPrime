'use client'

import { useState, useEffect } from 'react'
import { Deal, getAllCategories } from '@/lib/deals-database'
import { getStartupProgramUrl } from '@/lib/comprehensive-startup-urls'
import Link from 'next/link'
import DealCard from './DealCard'

export default function CloudCreditsGrid() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await fetch('/api/deals?category=cloud-credits')
        const data = await response.json()
        if (data.success) {
          setDeals(data.deals)
        }
      } catch (error) {
        console.error('Error fetching cloud deals:', error)
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
      deal.eligibility[0] !== 'Early-stage companies' &&
      deal.verified

    const hasVerifiedTimeToApply =
      deal.timeToApply && deal.timeToApply !== '15 minutes' && deal.timeToApply !== 'Varies' && deal.verified

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
      validFor: hasVerifiedTimeToApply ? deal.timeToApply : undefined,
      applicationUrl: getStartupProgramUrl(deal.provider),
      verified: deal.verified,
    }
  }

  return (
    <section className="relative w-full mb-6">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-sm bg-sky-100 border-2 border-black shadow-[1px_1px_0px_#111]">
            <span className="material-symbols-outlined !text-[16px] text-sky-700">cloud</span>
          </span>
          <div>
            <h2 className="font-mono text-[14px] md:text-base font-black uppercase tracking-[0.06em] text-black leading-none">
              Verified Cloud Programs
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
          <span className="material-symbols-outlined !text-[32px] text-gray-400 mb-2 block">cloud_off</span>
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
