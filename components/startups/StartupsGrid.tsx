'use client'

import { useState, useEffect } from 'react'
import StartupCard from './StartupCard'
import ProGateOverlay from '@/components/ProGateOverlay'
import { checkProStatus } from '@/lib/auth/user-context'
import { YCCompany } from '@/types/startup'

interface Startup {
  id: string
  slug: string
  name: string
  category: string
  description: string
  shortDescription: string
  revenue: number
  revenueDisplay: string
  profit: number
  profitDisplay: string
  askingPrice: number
  askingPriceDisplay: string
  country: string
  founded: string
  logoUrl: string
  featured: boolean
  forSale: boolean
  source: string
  sourceUrl: string
  teamSize: string
}

interface StartupsGridProps {
  filters: {
    search: string
    category: string
    minRevenue: string
    maxRevenue: string
    country: string
    source: string
    featured: boolean
    forSale: string
  }
}

const FREE_PAGE_LIMIT = 3 // pages 1–3 are visible, page 4+ is gated

function toYCCompany(startup: Startup): YCCompany {
  return {
    id: parseInt(startup.id) || startup.slug.split('').reduce((a, b) => a + b.charCodeAt(0), 0),
    name: startup.name,
    slug: startup.slug,
    website: startup.sourceUrl || '#',
    small_logo_thumb_url: startup.logoUrl,
    one_liner: startup.shortDescription,
    long_description: startup.description,
    team_size: parseInt(startup.teamSize) || 0,
    industry: startup.category,
    subindustry: '',
    launched_at: 0,
    tags: [startup.category, startup.country].filter(Boolean),
    batch: '',
    status: '',
    all_locations: startup.country,
    founders_enriched: [],
  }
}

export default function StartupsGrid({ filters }: StartupsGridProps) {
  const [startups, setStartups] = useState<Startup[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [isPro, setIsPro] = useState(false)
  const startupsPerPage = 12

  // Check Pro status on mount
  useEffect(() => {
    checkProStatus()
      .then(({ isPro: pro }) => setIsPro(pro))
      .catch(() => setIsPro(false))
  }, [])

  useEffect(() => {
    const fetchStartups = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (filters.search) params.append('search', filters.search)
        if (filters.category !== 'all') params.append('category', filters.category)
        if (filters.minRevenue) params.append('minRevenue', filters.minRevenue)
        if (filters.maxRevenue) params.append('maxRevenue', filters.maxRevenue)
        if (filters.country !== 'all') params.append('country', filters.country)
        if (filters.source !== 'all') params.append('source', filters.source)
        if (filters.forSale !== 'all') params.append('forSale', filters.forSale)
        if (filters.featured) params.append('featured', 'true')

        const response = await fetch(`/api/startups?${params}`)
        const data = await response.json()
        if (data.success) setStartups(data.startups)
      } catch (error) {
        console.error('Error fetching startups:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStartups()
    setCurrentPage(1)
  }, [filters])

  const totalPages = Math.ceil(startups.length / startupsPerPage)
  const startIndex = (currentPage - 1) * startupsPerPage
  const currentStartups = startups.slice(startIndex, startIndex + startupsPerPage)

  // For the blur preview: show the first 4 cards of the gated page blurred
  const blurPreviewStartups = startups.slice(
    FREE_PAGE_LIMIT * startupsPerPage,
    FREE_PAGE_LIMIT * startupsPerPage + 4
  )

  if (loading) {
    return (
      <div className="text-center py-6 md:py-8">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-black border-t-primary"></div>
        <p className="mt-4 font-mono text-lg">Loading verified startups...</p>
      </div>
    )
  }

  if (startups.length === 0) {
    return (
      <div className="text-center py-6 md:py-8 bg-white border-3 border-black p-8">
        <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">search_off</span>
        <h3 className="font-mono text-xl font-bold mb-2">No startups found</h3>
        <p className="font-mono text-gray-600">Try adjusting your filters</p>
      </div>
    )
  }

  // Is the current page gated?
  const isGated = !isPro && currentPage > FREE_PAGE_LIMIT

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="font-mono text-2xl font-bold">Showing {startups.length} startups</h2>
          <span className="bg-gray-200 px-2 py-1 font-mono text-xs rounded-sm border border-black">
            Page {currentPage} of {totalPages}
          </span>
        </div>
        {!isPro && (
          <span className="font-mono text-xs text-gray-500 border border-dashed border-gray-400 px-3 py-1">
            Free: pages 1–{FREE_PAGE_LIMIT} · <a href="/pricing" className="text-primary font-bold hover:underline">Upgrade for all {totalPages} pages →</a>
          </span>
        )}
      </div>

      {/* Grid or Pro Gate */}
      {isGated ? (
        <ProGateOverlay
          totalCount={startups.length}
          visibleCount={FREE_PAGE_LIMIT * startupsPerPage}
          label="Startups"
        >
          {/* Blurred preview cards behind the overlay */}
          <div className="space-y-6">
            {blurPreviewStartups.map((startup) => (
              <StartupCard key={startup.id} company={toYCCompany(startup)} />
            ))}
          </div>
        </ProGateOverlay>
      ) : (
        <div className="space-y-6">
          {currentStartups.map((startup) => (
            <StartupCard key={startup.id} company={toYCCompany(startup)} />
          ))}
        </div>
      )}

      {/* Pagination — always show so users know how many pages exist */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center p-3 sm:p-0 gap-3 sm:gap-4 mt-12 w-full bg-white">
          {/* Previous Desktop */}
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="hidden sm:flex px-4 py-2 border-2 border-black font-mono text-sm rounded-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center gap-1 bg-white"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Previous</span>
          </button>

          {/* Page Numbers */}
          <div className="order-1 sm:order-none flex flex-wrap items-center justify-center gap-1.5 md:gap-2 flex-1 w-full sm:w-auto">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              const locked = !isPro && pageNum > FREE_PAGE_LIMIT

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`min-w-[32px] h-[32px] md:min-w-[40px] md:h-[40px] px-1 flex items-center justify-center border-2 border-black font-mono text-xs sm:text-sm rounded-sm transition-colors ${currentPage === pageNum
                      ? 'bg-black text-white shadow-[2px_2px_0px_#111111]'
                      : locked
                        ? 'bg-gray-100 text-gray-400 hover:bg-primary/20'
                        : 'bg-white hover:bg-gray-100'
                    }`}
                >
                  {locked && (
                    <span className="material-symbols-outlined text-[10px] sm:text-xs mr-0.5 sm:mr-1">lock</span>
                  )}
                  {pageNum}
                </button>
              )
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="min-w-[24px] h-[32px] md:min-w-[32px] md:h-[40px] flex items-center justify-center font-mono text-xs sm:text-sm">...</span>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`min-w-[32px] h-[32px] md:min-w-[40px] md:h-[40px] px-1 flex items-center justify-center border-2 border-black font-mono text-xs sm:text-sm rounded-sm transition-colors ${!isPro ? 'bg-gray-100 text-gray-400 hover:bg-primary/20' : 'bg-white hover:bg-gray-100'
                    }`}
                >
                  {!isPro && <span className="material-symbols-outlined text-[10px] sm:text-xs mr-0.5 sm:mr-1">lock</span>}
                  {totalPages}
                </button>
              </>
            )}
          </div>

          {/* Next Desktop */}
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="hidden sm:flex px-4 py-2 border-2 border-black font-mono text-sm rounded-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center gap-1 bg-white"
          >
            <span>Next</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>

          {/* Prev/Next Mobile */}
          <div className="grid grid-cols-2 gap-3 w-full sm:hidden order-2">
              <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center gap-1 px-3 py-2.5 border-2 border-black font-mono text-xs font-bold uppercase transition-colors bg-white hover:bg-gray-100 disabled:opacity-50"
              >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  Prev
              </button>
              <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center gap-1 px-3 py-2.5 border-2 border-black bg-white text-black font-mono text-xs font-bold uppercase transition-colors disabled:opacity-50 hover:bg-gray-100"
              >
                  Next
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
          </div>
        </div>
      )}
    </div>
  )
}