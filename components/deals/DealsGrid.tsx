'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Deal, getAllCategories } from '@/lib/deals-database'
import { getStartupProgramUrl } from '@/lib/comprehensive-startup-urls'
import DealCard from './DealCard'
import Pagination from '@/components/Pagination'
import { useAuth } from '@/lib/auth/hooks'
import { checkProStatus } from '@/lib/auth/user-context'

let globalDealsCache: Deal[] | null = null;
let globalDealsPromise: Promise<Deal[]> | null = null;

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

  const { user, loading: authLoading } = useAuth()
  const [isPro, setIsPro] = useState(false)
  const [isExplorer, setIsExplorer] = useState(false)
  const [checkingAccess, setCheckingAccess] = useState(true)

  const [deals, setDeals] = useState<Deal[]>(globalDealsCache || [])
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(!globalDealsCache)
  const dealsPerPage = 12

  const categories = getAllCategories()

  // Run auth check + deals fetch in PARALLEL — no waterfall
  useEffect(() => {
    if (authLoading) return

    const fetchDeals = globalDealsCache
      ? Promise.resolve(globalDealsCache)
      : (() => {
          if (!globalDealsPromise) {
            globalDealsPromise = fetch('/api/deals')
              .then(res => res.json())
              .then(data => {
                const result = data.success ? data.deals : []
                globalDealsCache = result
                return result
              })
              .catch(err => {
                console.error('Error loading deals:', err)
                globalDealsPromise = null // allow retry
                return []
              })
          }
          return globalDealsPromise
        })()

    const fetchAuth = user
      ? checkProStatus().then(({ isPro: hasPro, user: userProfile }) => ({
          isPro: hasPro,
          isExplorer: !!userProfile?.isExplorer,
        }))
      : Promise.resolve({ isPro: false, isExplorer: false })

    Promise.all([fetchDeals, fetchAuth]).then(([dealList, access]) => {
      setDeals(dealList)
      setIsPro(access.isPro)
      setIsExplorer(access.isExplorer)
      setLoading(false)
      setCheckingAccess(false)
    })
  }, [authLoading, user])


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
      } else {
        // Exclude accelerators and incubators if no category is selected (All Deals)
        result = result.filter(deal => 
          deal.category !== 'startup-programs' && 
          deal.subcategory !== 'accelerators' && 
          deal.subcategory !== 'incubators' &&
          deal.category !== 'accelerators' &&
          deal.category !== 'incubators'
        )
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
          // For "All Deals" (no category filter), show recommended first, then popular brands
          if (!filters?.category) {
            result.sort((a, b) => {
              // Recommended deals always first
              const aRec = a.recommended ? 1 : 0;
              const bRec = b.recommended ? 1 : 0;
              if (aRec !== bRec) return bRec - aRec;

              const priorityBrands = [
                'github', 'airtable', 'aws', 'google for startups', 'microsoft for startups',
                'linear', 'stripe', 'notion', 'webflow', 'alibaba', 'algolia', 'auth0',
                'cloudflare', 'customer.io', 'datadog', 'databricks', 'devrev', 'digitalocean',
                'document360', 'elevenlabs', 'flippa', 'framer', 'gitlab', 'heroku',
                'instatus', 'intercom', 'linkedin'
              ];
              const aIdx = priorityBrands.findIndex(brand => a.title.toLowerCase().includes(brand) || a.provider.toLowerCase().includes(brand));
              const bIdx = priorityBrands.findIndex(brand => b.title.toLowerCase().includes(brand) || b.provider.toLowerCase().includes(brand));
              const aPriority = aIdx >= 0 ? aIdx : 9999;
              const bPriority = bIdx >= 0 ? bIdx : 9999;
              if (aPriority !== bPriority) return aPriority - bPriority;

              const aHasOriginalLogo = a.logoUrl && !a.logoUrl.includes('rocket') && !a.logoUrl.includes('ui-avatars') ? 1 : 0;
              const bHasOriginalLogo = b.logoUrl && !b.logoUrl.includes('rocket') && !b.logoUrl.includes('ui-avatars') ? 1 : 0;
              if (aHasOriginalLogo !== bHasOriginalLogo) return bHasOriginalLogo - aHasOriginalLogo;
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

    const providerUrl = deal.providerWebsite || getStartupProgramUrl(deal.provider);
    let logoFallback: string | null = null;
    if (providerUrl) {
      try {
        const domain = new URL(providerUrl).hostname.replace('www.', '');
        // Use Clearbit for high-quality logos
        logoFallback = `https://logo.clearbit.com/${domain}`;
      } catch (e) {
        // Ignore invalid URL — logoFallback stays null, card shows initials
      }
    }

    return {
      id: deal.slug,
      logo: deal.logoUrl || logoFallback || '',

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

  // Pagination Logic using fast local state to skip slow server payload fetch
  const [localPage, setLocalPage] = useState(1)

  useEffect(() => {
    const pageParam = searchParams.get('page')
    if (pageParam && !filters?.category && !filters?.search) {
      setLocalPage(Number(pageParam) || 1)
    } else {
      setLocalPage(1)
    }
  }, [filters, searchParams])

  const totalPages = Math.ceil(filteredDeals.length / dealsPerPage) || 1
  const currentPage = Math.min(Math.max(1, localPage), totalPages)

  const startIndex = (currentPage - 1) * dealsPerPage
  const endIndex = startIndex + dealsPerPage
  const currentDeals = filteredDeals.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setLocalPage(page)
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    window.history.replaceState(null, '', pathname + '?' + params.toString())
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
      {!loading && !authLoading && !checkingAccess && filteredDeals.length === 0 && (
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

      {/* Loading State — skeleton cards */}
      {(loading || authLoading || checkingAccess) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="bg-white border-2 border-gray-100 p-4 animate-pulse"
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


      {/* Deals Grid or Lock CTA */}
      {!loading && !authLoading && !checkingAccess && filteredDeals.length > 0 && (() => {
        // Enforce pagination limits based on plan and category
        let isLocked = false;
        let lockTitle = "Unlock More Deals";
        let lockMessage = "Upgrade to Premium to instantly access our entire database.";
        
        const isAcceleratorOrIncubator = filters?.category === 'accelerators' || filters?.category === 'incubators';

        if (!isPro) {
          if (isExplorer) {
            // Explorer plan limits
             if (isAcceleratorOrIncubator && currentPage > 1) {
                isLocked = true;
                lockTitle = "Upgrade to Founder";
                lockMessage = "Explorer users can view 1 page of Accelerators & Incubators. Upgrade to Founder to unlock the rest.";
             } else if (currentPage > 10) {
                isLocked = true;
                lockTitle = "Upgrade to Founder";
                lockMessage = "Explorer users are limited to 10 pages of deals. Upgrade to Founder to view everything.";
             }
          } else {
             // Free plan limits
             if (currentPage > 3) {
                 isLocked = true;
                 lockTitle = `Unlock More Deals`;
                 lockMessage = "Upgrade to instantly access our full database of verified software credits and grants.";
             }
          }
        }

        if (isLocked) {
          return (
            <div className="mt-6 mb-4 md:mt-12 md:mb-4 md:mb-5 bg-gray-50 border-4 border-black p-4 md:p-8 text-center neo-shadow">
              <span className="material-symbols-outlined text-3xl md:text-4xl mb-2 md:mb-4">lock</span>
              <h3 className="text-lg md:text-2xl font-bold font-mono uppercase mb-2">{lockTitle}</h3>
              <p className="text-xs md:text-sm text-gray-600 mb-4 md:mb-6 max-w-xl mx-auto">
                {lockMessage}
              </p>
              <a href="/pricing" className="inline-block bg-primary text-black font-bold font-mono px-5 py-3 md:px-8 md:py-4 border-2 border-black hover:bg-yellow-400 neo-shadow transition-all text-sm">
                VIEW PRICING PLANS
              </a>
            </div>
          );
        }

        return (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-5">
            {currentDeals.map((deal) => (
              <DealCard key={deal.id} deal={convertDealToCardFormat(deal)} />
            ))}
          </div>
        );
      })()}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  )
}