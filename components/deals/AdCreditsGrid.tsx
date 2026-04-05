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

  // Helper to convert Deal to DealCard format
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

    // Check if eligibility contains real data
    const hasVerifiedEligibility = deal.eligibility &&
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
      verified: deal.verified
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
        <div className="flex items-center gap-2">
          <h2 className="font-mono text-lg md:text-2xl font-bold text-black">All Ad Programs</h2>
          <span className="font-mono text-[10px] bg-gray-200 px-1.5 py-0.5 rounded-sm border border-black font-bold">
            {deals.length}
          </span>
        </div>
        <Link href="/deals" className="px-2 py-1 font-mono text-[10px] border border-black bg-white text-black rounded-sm hover:bg-gray-100 hidden md:flex items-center">
          All Deals
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-3 border-primary border-t-transparent mx-auto mb-2"></div>
          <p className="text-gray-500 font-mono text-xs">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={convertDealToCardFormat(deal)} />
          ))}
        </div>
      )}
    </div>
  )
}