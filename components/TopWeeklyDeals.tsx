'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

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

export default function TopWeeklyDeals() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDeals() {
      try {
        const response = await fetch('/data/all-deals.json')
        const allDeals = await response.json()
        // Get first 6 deals with good data
        const topDeals = allDeals
          .filter((d: Deal) => d.provider && d.value && d.logoUrl)
          .slice(0, 6)
        setDeals(topDeals)
      } catch (error) {
        console.error('Failed to load deals:', error)
      } finally {
        setLoading(false)
      }
    }
    loadDeals()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-accent-yellow border-y-2 border-black bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse font-mono">Loading deals...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-accent-yellow border-y-2 border-black bg-opacity-90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 md:gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-2 font-mono">TOP_WEEKLY_DEALS</h2>
            <p className="text-black font-medium border-l-4 border-black pl-3 ml-1">Hand-picked savings for modern founders.</p>
          </div>
          <Link href="/deals" className="bg-black text-white px-6 py-3 font-mono font-bold rounded-none neo-shadow hover:bg-gray-900 transition-all flex items-center justify-center gap-2 w-full md:w-auto">
            VIEW_ALL_1000+_DEALS <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal, index) => (
            <div key={deal.id || index} className="bg-white neo-border p-0 relative group neo-shadow">
              <div className="p-4 border-b-2 border-black flex justify-between items-center bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white border border-gray-200 rounded flex items-center justify-center overflow-hidden">
                    {deal.logoUrl ? (
                      <Image
                        src={deal.logoUrl}
                        alt={deal.provider}
                        width={32}
                        height={32}
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
                  <span className="font-bold font-mono text-sm uppercase">{deal.provider}</span>
                </div>
                <span className="bg-green-500 text-black border border-black text-xs font-mono font-bold px-2 py-0.5 uppercase">Active</span>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-xl mb-1 font-mono line-clamp-1">{deal.title || deal.provider}</h4>
                <p className="text-xs text-gray-500 mb-4 font-mono uppercase tracking-wide">{deal.category}</p>
                {deal.shortDescription && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{deal.shortDescription}</p>
                )}
                <div className="text-2xl font-bold text-accent-red mb-6 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xl">savings</span>
                  {deal.value}
                </div>
                <Link
                  href={`/deals/${deal.slug}`}
                  className="block w-full neo-border bg-black text-white hover:bg-gray-800 transition-colors font-mono font-bold py-3 text-sm uppercase text-center"
                >
                  View Deal →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
