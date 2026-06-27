'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Deal {
  id: string
  slug: string
  title: string
  provider: string
  value: string
  shortDescription: string
  logoUrl?: string
  category: string
}

interface SavedDealsSectionProps {
  savedDealSlugs: string[]
}

export default function SavedDealsSection({ savedDealSlugs }: SavedDealsSectionProps) {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await fetch('/api/deals')
        const data = await response.json()

        if (data.success) {
          const savedDeals = data.deals.filter((deal: Deal) =>
            savedDealSlugs.includes(deal.slug) || savedDealSlugs.includes(deal.id)
          )
          setDeals(savedDeals)
        }
      } catch (error) {
        console.error('Error fetching saved deals:', error)
      } finally {
        setLoading(false)
      }
    }

    if (savedDealSlugs.length > 0) {
      fetchDeals()
    } else {
      setLoading(false)
    }
  }, [savedDealSlugs])

  const handleRemove = async (dealSlug: string) => {
    try {
      const response = await fetch(`/api/saved-deals?dealSlug=${dealSlug}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setDeals(deals.filter(d => d.slug !== dealSlug && d.id !== dealSlug))
      }
    } catch (error) {
      console.error('Error removing deal:', error)
    }
  }

  if (loading) {
    return (
      <div className="mb-4 md:mb-6">
        <div className="border-3 border-black dark:border-white/10 bg-white dark:bg-[#0d0d0d] shadow-[4px_4px_0px_#111111] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.06)] p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent mx-auto"></div>
        </div>
      </div>
    )
  }

  if (deals.length === 0) {
    return null
  }

  return (
    <div className="mb-4 md:mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-black uppercase flex items-center gap-2 text-black dark:text-white">
          <span className="material-symbols-outlined text-primary">bookmark</span>
          Saved Deals ({deals.length})
        </h2>
        <Link
          href="/deals"
          className="text-sm font-bold text-primary hover:underline flex items-center gap-1"
        >
          Browse More Deals
          <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="border-2 border-black dark:border-white/10 bg-white dark:bg-[#0d0d0d] shadow-[4px_4px_0px_#111111] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.06)] p-4 hover:shadow-[6px_6px_0px_#111111] dark:hover:shadow-[6px_6px_0px_rgba(255,255,255,0.1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-100 dark:bg-white/5 border-2 border-black dark:border-white/20 rounded flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                {deal.logoUrl ? (
                  <Image
                    src={deal.logoUrl}
                    alt={deal.title}
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                ) : (
                  <span className="text-lg font-bold text-black dark:text-white">{deal.provider.charAt(0)}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm truncate text-black dark:text-white">{deal.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{deal.provider}</p>
              </div>
              <button
                onClick={() => handleRemove(deal.slug || deal.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
                title="Remove from saved"
              >
                <span className="material-symbols-outlined !text-[18px]">close</span>
              </button>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{deal.shortDescription}</p>

            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-green-600 dark:text-green-400">{deal.value}</span>
              <Link
                href={`/deals/${deal.slug || deal.id}`}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
              >
                View Deal
                <span className="material-symbols-outlined !text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
