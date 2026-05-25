'use client'

import { useState, useEffect, useRef } from 'react'
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
  const [isNextFounder, setIsNextFounder] = useState(false)
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
          isNextFounder: !!userProfile?.isNextFounder,
        }))
      : Promise.resolve({ isPro: false, isNextFounder: false })

    Promise.all([fetchDeals, fetchAuth]).then(([dealList, access]) => {
      setDeals(dealList)
      setIsPro(access.isPro)
      setIsNextFounder(access.isNextFounder)
      setLoading(false)
      setCheckingAccess(false)
    })
  }, [authLoading, user])


  useEffect(() => {
    let result = [...deals]

    // Apply filters
    if (filters) {
      // Search filter — multi-token relevance scoring
      // Tokens are AND-matched (all must appear), each token searches across
      // title / provider / category / subcategory / shortDescription / description / tags.
      // Matches contribute to a relevance score so the most relevant result floats up.
      let searchScores: Map<string, number> | null = null
      if (filters.search && filters.search.trim()) {
        const raw = filters.search.toLowerCase().trim()
        const tokens = raw.split(/\s+/).filter(t => t.length > 0)
        searchScores = new Map<string, number>()

        result = result.filter(deal => {
          const title = deal.title?.toLowerCase() || ''
          const provider = deal.provider?.toLowerCase() || ''
          const category = (deal.category || '').toLowerCase().replace(/-/g, ' ')
          const subcategory = (deal.subcategory || '').toLowerCase().replace(/-/g, ' ')
          const shortDesc = deal.shortDescription?.toLowerCase() || ''
          const desc = deal.description?.toLowerCase() || ''
          const tagsLc = (deal.tags || []).map(t => t.toLowerCase())

          // Every token must match somewhere — otherwise drop the deal
          const allTokensMatch = tokens.every(token =>
            title.includes(token) ||
            provider.includes(token) ||
            category.includes(token) ||
            subcategory.includes(token) ||
            shortDesc.includes(token) ||
            desc.includes(token) ||
            tagsLc.some(tag => tag.includes(token))
          )
          if (!allTokensMatch) return false

          // Score this deal — higher = more relevant
          let score = 0
          for (const token of tokens) {
            // Strong: exact title or provider equals query token
            if (title === token || provider === token) score += 100
            // Strong: title starts with token (e.g. "aws" → "AWS Activate")
            if (title.startsWith(token) || provider.startsWith(token)) score += 50
            // Title contains token
            if (title.includes(token)) score += 25
            // Provider contains token
            if (provider.includes(token)) score += 20
            // Tag match
            if (tagsLc.some(tag => tag === token)) score += 15
            else if (tagsLc.some(tag => tag.includes(token))) score += 8
            // Category / subcategory match
            if (category.includes(token)) score += 12
            if (subcategory.includes(token)) score += 12
            // Description matches (less weight)
            if (shortDesc.includes(token)) score += 4
            else if (desc.includes(token)) score += 2
          }

          // Bonus: full phrase appears in title
          if (tokens.length > 1 && title.includes(raw)) score += 60

          // Recommended/featured deals get a small tiebreaker boost
          if (deal.recommended) score += 3
          if (deal.featured) score += 2

          searchScores!.set(deal.slug, score)
          return true
        })
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
      } else if (!searchScores) {
        // Exclude accelerators and incubators if no category is selected (All Deals)
        // — but keep them when the user is searching, so search can find them.
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

      // Sort filter — when there's an active search, score-based relevance
      // wins over the default brand-priority sort.
      if (searchScores && (filters.sort === 'relevance' || !filters.sort)) {
        result.sort((a, b) => {
          const sa = searchScores!.get(a.slug) || 0
          const sb = searchScores!.get(b.slug) || 0
          if (sa !== sb) return sb - sa
          return a.title.localeCompare(b.title)
        })
      } else {
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
          // For "All Deals" (no category filter), show paid Featured first, then recommended, then popular brands
          if (!filters?.category) {
            result.sort((a, b) => {
              // Paid Featured pinned at top (only if featured_until is in the future)
              const now = Date.now()
              const aFeatActive = a.featured && a.featuredUntil && new Date(a.featuredUntil).getTime() > now ? 1 : 0
              const bFeatActive = b.featured && b.featuredUntil && new Date(b.featuredUntil).getTime() > now ? 1 : 0
              if (aFeatActive !== bFeatActive) return bFeatActive - aFeatActive

              // Recommended deals next
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
              const now = Date.now()
              const aFeatActive = a.featured && a.featuredUntil && new Date(a.featuredUntil).getTime() > now ? 1 : 0
              const bFeatActive = b.featured && b.featuredUntil && new Date(b.featuredUntil).getTime() > now ? 1 : 0
              if (aFeatActive !== bFeatActive) return bFeatActive - aFeatActive

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
    }

    setFilteredDeals(result)
  }, [deals, filters])

  // Convert Deal to DealCard format
  const convertDealToCardFormat = (deal: Deal) => {
    const category = categories.find(cat => cat.id === deal.category)

    let badge = undefined
    let badgeColor = undefined

    const isPaidFeatured = deal.featured && deal.featuredUntil && new Date(deal.featuredUntil).getTime() > Date.now()

    if (isPaidFeatured) {
      badge = '⭐ Featured'
      badgeColor = 'bg-amber-400 text-black'
    } else if (deal.recommended) {
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
        // Use Google Favicons for fast, reliable logos
        logoFallback = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
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

  // Pagination — local state synced to URL so back navigation restores
  // page + filter state.
  const [localPage, setLocalPage] = useState(1)
  const lastFiltersRef = useRef<string>('')

  // On mount or when filter identity changes (not when same filters are
  // re-applied via URL restore), reset page to 1. When filters are unchanged
  // but `searchParams` shifts (e.g. user hits back from deal page), respect
  // the URL `page` value.
  useEffect(() => {
    const filterKey = `${filters?.search || ''}|${filters?.category || ''}|${filters?.subcategory || ''}|${filters?.value || ''}|${filters?.sort || ''}`
    const pageParam = Number(searchParams.get('page')) || 1
    const filtersChanged = lastFiltersRef.current !== '' && lastFiltersRef.current !== filterKey

    if (filtersChanged) {
      // User changed a filter — start at page 1
      setLocalPage(1)
    } else {
      // Initial mount or back-navigation — honor the URL page
      setLocalPage(pageParam)
    }
    lastFiltersRef.current = filterKey
  }, [filters, searchParams])

  // Listen for browser back/forward to re-sync page from URL
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const pageParam = Number(params.get('page')) || 1
      setLocalPage(pageParam)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const totalPages = Math.ceil(filteredDeals.length / dealsPerPage) || 1
  const currentPage = Math.min(Math.max(1, localPage), totalPages)

  const startIndex = (currentPage - 1) * dealsPerPage
  const endIndex = startIndex + dealsPerPage
  const currentDeals = filteredDeals.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setLocalPage(page)
    // pushState (not replaceState) so browser Back works correctly when the
    // user clicks a deal and returns — they get back to the same page.
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    window.history.pushState(null, '', pathname + '?' + params.toString())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Results Summary */}
      <div className="mb-3 md:mb-5 flex justify-between items-center gap-2 px-1">
        <p className="text-xs md:text-[13px] text-gray-600">
          Showing <span className="font-semibold text-gray-900 tabular-nums">{filteredDeals.length > 0 ? startIndex + 1 : 0}–{Math.min(endIndex, filteredDeals.length)}</span> of{' '}
          <span className="font-semibold text-gray-900 tabular-nums">{filteredDeals.length}</span> deals
        </p>
        {filters?.search && (
          <p className="text-xs md:text-[13px] text-gray-500 truncate flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-gray-400">search</span>
            <span className="truncate">&ldquo;{filters.search}&rdquo;</span>
          </p>
        )}
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


      {/* Deals Grid (with blur lock overlay if needed) */}
      {!loading && !authLoading && !checkingAccess && filteredDeals.length > 0 && (() => {
        // Enforce pagination limits based on plan and category
        let isLocked = false;
        let lockTitle = "Don't Leave $50K On The Table";
        let lockSubtitle = "Members-only access";
        let lockMessage = "You're one click from cloud credits, SaaS discounts, and grants worth six figures. Founders who unlock the catalog typically stack $25K–$200K in their first month.";
        let bullets: string[] = [
          'Stack $200K+ in cloud credits across AWS, GCP and Azure',
          '500+ vetted SaaS discounts (Notion, Linear, HubSpot, more)',
          'Grant programs reviewed and matched to your stage',
        ];
        let primaryCta = "See Plans · Unlock Now";
        let reassurance = "Cancel anytime · Instant access · No risk";

        const isAcceleratorOrIncubator = filters?.category === 'accelerators' || filters?.category === 'incubators';

        if (!isPro) {
          if (isNextFounder) {
            // NextFounder plan limits
             if (isAcceleratorOrIncubator && currentPage > 1) {
                isLocked = true;
                lockTitle = "Skip the Application Maze";
                lockSubtitle = "Founder plan unlocks all programs";
                lockMessage = "Most founders waste 40+ hours hunting accelerators. Founder unlocks every program in the catalog so you apply to the right ones in minutes.";
                bullets = [
                  'Full access to YC, Techstars, 500 Global, and 80+ more',
                  'Incubator partnerships matched to your stage and sector',
                  'Application tips from founders who got in',
                ];
             } else if (currentPage > 10) {
                isLocked = true;
                lockTitle = "Unlock The Rest Of Your Stack";
                lockSubtitle = "Founder plan removes the limit";
                lockMessage = "You've already saved on the basics. Upgrade to Founder and unlock the deals that compound — six-figure cloud credits, premium SaaS, and grant programs.";
                bullets = [
                  '$200K+ in additional cloud and infra credits',
                  'Premium SaaS deals reserved for funded founders',
                  'Grant programs filtered to your stage',
                ];
             }
          } else {
             // Free plan limits
             isLocked = currentPage > 3;
             if (isLocked) {
               lockTitle = "Don't Leave $50K On The Table";
               lockSubtitle = "Members-only access";
               lockMessage = "You're one click from cloud credits, SaaS discounts, and grants worth six figures. Founders who unlock the catalog typically stack $25K–$200K in their first month.";
               bullets = [
                 'Stack $200K+ in cloud credits across AWS, GCP and Azure',
                 '500+ vetted SaaS discounts (Notion, Linear, HubSpot, more)',
                 'Grant programs reviewed and matched to your stage',
               ];
             }
          }
        }

        return (
          <div className="relative mb-4 md:mb-5">
            <div
              className={`grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 transition-all duration-300 ${
                isLocked ? 'pointer-events-none select-none' : ''
              }`}
              aria-hidden={isLocked}
              style={isLocked ? { filter: 'blur(7px) saturate(0.8)' } : undefined}
            >
              {currentDeals.map((deal) => (
                <DealCard key={deal.id} deal={convertDealToCardFormat(deal)} />
              ))}
            </div>

            {/* Lock overlay — content remains visible but blurred underneath */}
            {isLocked && (
              <div className="absolute inset-0 z-20 flex items-center justify-center px-3 py-6">
                {/* Soft fade so blur reads as depth, not noise */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/65 to-white/40 pointer-events-none" />

                {/* Card */}
                <div className="relative w-full max-w-md bg-white border-2 border-black rounded-sm shadow-[5px_5px_0px_#111] overflow-hidden lock-overlay-fade-in">
                  {/* Decorative mandala */}
                  <div className="absolute -top-12 -right-12 w-44 h-44 pointer-events-none opacity-[0.10]" aria-hidden="true">
                    <svg viewBox="0 0 200 200" className="w-full h-full text-gray-900 lock-overlay-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.7">
                      <circle cx="100" cy="100" r="40" />
                      <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
                      <circle cx="100" cy="100" r="80" strokeDasharray="1 6" />
                      {[0, 60, 120, 180, 240, 300].map((deg) => (
                        <g key={deg} transform={`rotate(${deg} 100 100)`}>
                          <line x1="100" y1="40" x2="100" y2="20" />
                          <circle cx="100" cy="20" r="2" fill="currentColor" />
                        </g>
                      ))}
                      <circle cx="100" cy="100" r="3" fill="currentColor" />
                    </svg>
                  </div>

                  <div className="relative p-5 md:p-7">
                    {/* Subtitle pill */}
                    <div className="mb-3 inline-flex items-center gap-1.5 px-2 py-0.5 bg-accent-yellow/20 border-2 border-black rounded-sm">
                      <span className="material-symbols-outlined !text-[12px] text-black">lock</span>
                      <span className="font-mono text-[9px] font-black uppercase tracking-[0.12em] text-black">
                        {lockSubtitle}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-mono text-lg md:text-xl font-black uppercase text-black mb-1.5 leading-tight">
                      {lockTitle}
                    </h3>

                    {/* Description */}
                    <p className="text-[12.5px] md:text-[13px] text-gray-700 leading-relaxed mb-4">
                      {lockMessage}
                    </p>

                    {/* Quick value props */}
                    <ul className="space-y-1.5 mb-5 pb-4 border-b-2 border-black border-dashed">
                      {bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-[12px] text-gray-800">
                          <span className="material-symbols-outlined !text-[14px] text-emerald-600 flex-shrink-0 mt-0.5">check_circle</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <a
                        href="/pricing"
                        className="group flex-1 inline-flex items-center justify-center gap-1.5 bg-accent-yellow text-black font-mono font-black px-4 py-2.5 text-[12px] uppercase tracking-[0.1em] rounded-sm border-2 border-black shadow-[3px_3px_0px_#111] hover:bg-amber-300 hover:shadow-[5px_5px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all"
                      >
                        {primaryCta}
                        <span className="material-symbols-outlined !text-[14px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                      </a>
                      <a
                        href="/login"
                        className="inline-flex items-center justify-center gap-1.5 bg-white text-black font-mono font-black px-4 py-2.5 text-[12px] uppercase tracking-[0.1em] rounded-sm border-2 border-black shadow-[2px_2px_0px_#111] hover:bg-gray-50 hover:shadow-[3px_3px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all"
                      >
                        Log In
                      </a>
                    </div>

                    {/* Reassurance line */}
                    <p className="mt-3 font-mono text-[10px] text-gray-500 text-center">
                      {reassurance}
                    </p>
                  </div>
                </div>

                <style jsx>{`
                  @keyframes lockOverlayFadeIn {
                    from { opacity: 0; transform: translateY(8px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                  }
                  @keyframes lockOverlayMandalaSpin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                  }
                  :global(.lock-overlay-fade-in) {
                    animation: lockOverlayFadeIn 0.45s cubic-bezier(0.4, 0, 0.2, 1) backwards;
                  }
                  :global(.lock-overlay-mandala-spin) {
                    animation: lockOverlayMandalaSpin 80s linear infinite;
                    transform-origin: center;
                  }
                  @media (prefers-reduced-motion: reduce) {
                    :global(.lock-overlay-fade-in),
                    :global(.lock-overlay-mandala-spin) {
                      animation: none;
                    }
                  }
                `}</style>
              </div>
            )}
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