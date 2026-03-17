'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Deal, getAllCategories } from '@/lib/deals-database'
import { getStartupProgramUrl } from '@/lib/comprehensive-startup-urls'
import DealCard from './DealCard'
import Pagination from '@/components/Pagination'
import { useAuth } from '@/lib/auth/hooks'
import { checkProStatus } from '@/lib/auth/user-context'

interface FilterState {
  search: string
  category: string
  subcategory: string
  value: string
  sort: string
}

interface DealsGridProps {
  filters?: FilterState
}

export default function DealsGrid({ filters }: DealsGridProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const { user } = useAuth()
  const [isPro, setIsPro] = useState(false)

  useEffect(() => {
    const checkAccess = async () => {
      if (user) {
        const { isPro: hasProAccess } = await checkProStatus()
        setIsPro(hasProAccess)
      } else {
        setIsPro(false)
      }
    }
    checkAccess()
  }, [user])

  const [deals, setDeals] = useState<Deal[]>([])
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const dealsPerPage = 12

  const categories = getAllCategories()

  // Load deals from API
  useEffect(() => {
    const loadDeals = async () => {
      try {
        const response = await fetch('/api/deals')
        const data = await response.json()

        if (data.success) {
          setDeals(data.deals)
        } else {
          console.error('Failed to load deals:', data.error)
          setDeals([])
        }
      } catch (error) {
        console.error('Error loading deals:', error)
        setDeals([])
      } finally {
        setLoading(false)
      }
    }

    loadDeals()
  }, [])

  useEffect(() => {
    let result = [...deals]

    // Apply filters
    if (filters) {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        result = result.filter(deal =>
          deal.title?.toLowerCase().includes(searchTerm) ||
          deal.description?.toLowerCase().includes(searchTerm) ||
          deal.provider?.toLowerCase().includes(searchTerm) ||
          deal.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm))
        )
      }

      // Category filter
      if (filters.category) {
        result = result.filter(deal =>
          deal.category === filters.category ||
          deal.subcategory === filters.category
        )

        // Subcategory filter - show only a few recommended deals
        if (filters.subcategory) {
          result = result.filter(deal => deal.subcategory === filters.subcategory)

          // For subcategory views, prioritize recommended deals and limit to 6
          const recommendedDeals = result.filter(deal => deal.recommended)
          const otherDeals = result.filter(deal => !deal.recommended)
          result = [...recommendedDeals.slice(0, 6), ...otherDeals]
        }
      }

      // Value filter
      if (filters.value) {
        result = result.filter(deal => {
          const value = deal.value.replace(/[^0-9]/g, '')
          const numValue = parseInt(value) || 0

          switch (filters.value) {
            case 'under-1k':
              return numValue < 1000
            case '1k-10k':
              return numValue >= 1000 && numValue < 10000
            case '10k-50k':
              return numValue >= 10000 && numValue < 50000
            case '50k-100k':
              return numValue >= 50000 && numValue < 100000
            case 'over-100k':
              return numValue >= 100000
            default:
              return true
          }
        })
      }

      // Sort filter
      switch (filters.sort) {
        case 'newest':
          result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          break
        case 'value-high':
          result.sort((a, b) => {
            const aValue = parseInt(a.value.replace(/[^0-9]/g, '')) || 0
            const bValue = parseInt(b.value.replace(/[^0-9]/g, '')) || 0
            return bValue - aValue
          })
          break
        case 'value-low':
          result.sort((a, b) => {
            const aValue = parseInt(a.value.replace(/[^0-9]/g, '')) || 0
            const bValue = parseInt(b.value.replace(/[^0-9]/g, '')) || 0
            return aValue - bValue
          })
          break
        case 'deadline':
          result.sort((a, b) => {
            if (!a.expiryDate && !b.expiryDate) return 0
            if (!a.expiryDate) return 1
            if (!b.expiryDate) return -1
            return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
          })
          break
        case 'alphabetical':
          result.sort((a, b) => a.title.localeCompare(b.title))
          break
        default:
          // For "All Deals" (no category filter), use sortOrder from curated sequence
          if (!filters?.category) {
            result.sort((a, b) => {
              const aOrder = (a as any).sortOrder ?? 9999
              const bOrder = (b as any).sortOrder ?? 9999
              if (aOrder !== bOrder) return aOrder - bOrder
              return a.title.localeCompare(b.title)
            })
          } else {
            result.sort((a, b) => {
              if (a.recommended && !b.recommended) return -1
              if (!a.recommended && b.recommended) return 1
              if (a.featured && !b.featured) return -1
              if (!a.featured && b.featured) return 1
              if (a.status === 'active' && b.status !== 'active') return -1
              if (a.status !== 'active' && b.status === 'active') return 1
              return 0
            })
          }
      }
    }

    setFilteredDeals(result)
  }, [deals, filters])

  // Convert Deal to DealCard format
  const convertDealToCardFormat = (deal: Deal) => {
    const category = categories.find(cat => cat.id === deal.category)

    let badge = undefined
    let badgeColor = undefined

    if (deal.recommended) {
      badge = 'Recommended'
      badgeColor = 'bg-orange-500'
    } else if (deal.featured) {
      badge = 'Featured'
      badgeColor = 'bg-yellow-400'
    } else if (deal.status === 'limited') {
      badge = 'Limited'
      badgeColor = 'bg-red-500'
    } else if (deal.status === 'coming-soon') {
      badge = 'Soon'
      badgeColor = 'bg-blue-500'
    }

    const hasVerifiedEligibility = deal.eligibility &&
      deal.eligibility.length > 0 &&
      deal.eligibility[0] !== 'Startups' &&
      deal.eligibility[0] !== 'Early-stage startups' &&
      deal.verified

    const hasVerifiedTimeToApply = deal.timeToApply &&
      deal.timeToApply !== '15 minutes' &&
      deal.timeToApply !== 'Varies' &&
      deal.verified

    return {
      id: deal.slug,
      logo: deal.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(deal.provider)}&background=f3f4f6&color=1f2937&size=48`,
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
      verified: deal.verified
    }
  }

  // Pagination Logic using URL Params
  const pageParam = searchParams.get('page')
  const rawPage = Number(pageParam) || 1
  const totalPages = Math.ceil(filteredDeals.length / dealsPerPage) || 1
  const currentPage = Math.min(Math.max(1, rawPage), totalPages)

  const startIndex = (currentPage - 1) * dealsPerPage
  const endIndex = startIndex + dealsPerPage
  const currentDeals = filteredDeals.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(pathname + '?' + params.toString(), { scroll: false })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Results Summary */}
      <div className="mb-3 md:mb-6 px-3 py-2 md:p-4 bg-gray-50 border-2 border-gray-200">
        <div className="flex justify-between items-center gap-2">
          <p className="text-xs md:text-sm text-gray-600">
            {filteredDeals.length > 0 ? startIndex + 1 : 0}–{Math.min(endIndex, filteredDeals.length)} of {filteredDeals.length} deals
          </p>
          {filters?.search && (
            <p className="text-xs md:text-sm text-gray-600 truncate">
              &ldquo;{filters.search}&rdquo;
            </p>
          )}
        </div>
      </div>

      {/* No Results */}
      {!loading && filteredDeals.length === 0 && (
        <div className="text-center py-6 bg-white border-3 border-ink shadow-hard-sm">
          <span className="material-symbols-outlined text-6xl text-gray-300 mb-4 block">search_off</span>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No deals found</h3>
          <p className="text-gray-500 mb-4">
            {deals.length === 0
              ? "No deals have been imported yet. Use the admin panel to import your deals."
              : "Try adjusting your filters or search terms"
            }
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary text-white border-2 border-ink font-bold hover:bg-primary-dark transition-colors"
          >
            {deals.length === 0 ? "Refresh Page" : "Reset Filters"}
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-6 bg-white border-3 border-ink shadow-hard-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">Loading deals...</h3>
          <p className="text-gray-500">Please wait while we fetch your deals</p>
        </div>
      )}

      {/* Deals Grid or Lock CTA */}
      {!loading && filteredDeals.length > 0 && (
        (!isPro && currentPage > 3) ? (
          <div className="mt-6 mb-4 md:mt-12 md:mb-4 md:mb-5 bg-gray-50 border-4 border-black p-4 md:p-8 text-center neo-shadow">
            <span className="material-symbols-outlined text-3xl md:text-4xl mb-2 md:mb-4">lock</span>
            <h3 className="text-lg md:text-2xl font-bold font-mono uppercase mb-2">Unlock {filteredDeals.length - (3 * dealsPerPage)}+ More Deals</h3>
            <p className="text-xs md:text-sm text-gray-600 mb-4 md:mb-6 max-w-xl mx-auto">
              Upgrade to Premium to instantly access our entire database of active software credits and grants.
            </p>
            <a href="/pricing" className="inline-block bg-primary text-black font-bold font-mono px-5 py-3 md:px-8 md:py-4 border-2 border-black hover:bg-yellow-400 neo-shadow transition-all text-sm">
              UPGRADE TO ACCESS ALL DEALS
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-5">
            {currentDeals.map((deal) => (
              <DealCard key={deal.id} deal={convertDealToCardFormat(deal)} />
            ))}
          </div>
        )
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  )
}