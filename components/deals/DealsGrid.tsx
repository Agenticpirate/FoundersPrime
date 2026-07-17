'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Deal, getAllCategories } from '@/lib/deals-database'
import {
  isCommercialDealRow,
  normalizeDealCategory,
} from '@/lib/catalog-segregation'
import {
  applyPopularityFlags,
  compareDealsByPopularity,
  isActivePaidFeatured,
  popularityBadgeLabel,
  scoreDealPopularity,
} from '@/lib/deal-popularity'

function normalizeDealRow(deal: Deal): Deal {
  const normalized = {
    ...deal,
    category: normalizeDealCategory(deal.category, deal.subcategory, {
      title: deal.title,
      provider: deal.provider,
      description: deal.description || deal.shortDescription,
      tags: deal.tags,
    }),
  }
  // Re-score client-side; Featured kept only for active paid placements
  return applyPopularityFlags(normalized, { stripUnpaidFeatured: true }) as Deal
}

/** Stable commercial catalog: programs out, unique by slug, normalized. */
function prepareCommercialCatalog(raw: Deal[] | null | undefined): Deal[] {
  if (!raw?.length) return []
  const bySlug = new Map<string, Deal>()
  for (const deal of raw) {
    if (!deal || !isCommercialDealRow(deal)) continue
    const key = (deal.slug || deal.id || '').toLowerCase().trim()
    if (!key) continue
    // Prefer richer row when merging SSR + API
    const prev = bySlug.get(key)
    if (!prev) {
      bySlug.set(key, normalizeDealRow(deal))
      continue
    }
    const prevScore =
      (prev.description?.length || 0) + (prev.logoUrl ? 50 : 0) + (prev.applicationUrl ? 20 : 0)
    const nextScore =
      (deal.description?.length || 0) + (deal.logoUrl ? 50 : 0) + (deal.applicationUrl ? 20 : 0)
    if (nextScore >= prevScore) bySlug.set(key, normalizeDealRow(deal))
  }
  return Array.from(bySlug.values())
}
import {
  getStartupProgramUrl,
  resolveDealApplicationUrl,
} from '@/lib/comprehensive-startup-urls'
import DealCard from './DealCard'
import Pagination from '@/components/Pagination'
import { StaggerGrid, StaggerGridItem } from '@/components/ui/premium-motion'

import { useAuth } from '@/lib/auth/hooks'
import { checkProStatus } from '@/lib/auth/user-context'

let globalDealsCache: Deal[] | null = null;
let globalDealsPromise: Promise<Deal[]> | null = null;
let globalDealsCacheTime = 0;
// Refresh the in-memory deal list periodically so admin edits/removals show
// up within a session without needing a hard refresh.
const DEALS_CACHE_TTL = 60_000; // 60s

interface FilterState {
  search: string
  category: string
  subcategory: string
  value: string
  sort: string
}

interface DealsGridProps {
  filters?: FilterState
  initialIsPro?: boolean
  /** Server-prefetched deals for instant paint + crawler-friendly hydration */
  initialDeals?: Deal[]
}

export default function DealsGrid({ filters, initialIsPro, initialDeals }: DealsGridProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const { user, loading: authLoading } = useAuth()
  const [isPro, setIsPro] = useState(initialIsPro ?? false)
  const [isNextFounder, setIsNextFounder] = useState(false)
  const [checkingAccess, setCheckingAccess] = useState(initialIsPro === undefined)

  // Seed module cache from SSR so first client paint has data (normalized).
  if (initialDeals?.length && !globalDealsCache) {
    globalDealsCache = prepareCommercialCatalog(initialDeals)
    globalDealsCacheTime = Date.now()
  }

  const [deals, setDeals] = useState<Deal[]>(() =>
    prepareCommercialCatalog(globalDealsCache || initialDeals || [])
  )
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(!(globalDealsCache || initialDeals?.length))
  // Must stay divisible by 2 (sm) and 3 (lg) so full pages fill complete rows
  const dealsPerPage = 12

  const categories = getAllCategories()

  /** Apply commercial scope + slug dedupe. Empty list never wipes a good cache. */
  const adoptDealList = (list: Deal[], { fromApi = false } = {}) => {
    const prepared = prepareCommercialCatalog(list)
    // Failed/empty network response — keep whatever we already have
    if (prepared.length === 0 && globalDealsCache && globalDealsCache.length > 0) {
      return globalDealsCache
    }
    // Successful API response is always source of truth (even if smaller after deletes)
    if (fromApi && prepared.length > 0) {
      globalDealsCache = prepared
      globalDealsCacheTime = Date.now()
      return prepared
    }
    // SSR / fallback: only replace if we grow the catalog or have nothing yet
    if (!globalDealsCache || prepared.length >= globalDealsCache.length) {
      globalDealsCache = prepared
      globalDealsCacheTime = Date.now()
    }
    return globalDealsCache
  }

  // Run auth check + deals fetch in PARALLEL — no waterfall
  useEffect(() => {
    if (initialIsPro !== undefined) {
      setIsPro(initialIsPro)
      setCheckingAccess(false)
    }

    const cacheValid =
      globalDealsCache &&
      globalDealsCache.length > 0 &&
      Date.now() - globalDealsCacheTime < DEALS_CACHE_TTL

    // Always revalidate from API at least once if cache is only SSR-seeded
    // and might be a smaller JSON fallback vs full Supabase catalog.
    const shouldForceRefresh =
      !cacheValid ||
      (initialDeals?.length &&
        globalDealsCache &&
        globalDealsCache.length <= (initialDeals.length || 0) + 5)

    const fetchDeals = !shouldForceRefresh && cacheValid
      ? Promise.resolve(globalDealsCache as Deal[])
      : (() => {
        if (initialDeals?.length && !globalDealsCache?.length) {
          globalDealsCache = prepareCommercialCatalog(initialDeals)
          globalDealsCacheTime = Date.now()
        }
        if (!globalDealsPromise) {
          // Full commercial catalog — no-store so admin edits land; CDN still caches.
          globalDealsPromise = fetch('/api/deals?scope=deals', { cache: 'no-store' })
            .then((res) => res.json())
            .then((data) => {
              const raw = data.success && Array.isArray(data.deals) ? data.deals : []
              // API is canonical when it returns rows; otherwise keep SSR/cache
              const prepared = raw.length
                ? adoptDealList(raw, { fromApi: true })
                : adoptDealList(initialDeals || [], { fromApi: false })
              globalDealsPromise = null
              return prepared
            })
            .catch((err) => {
              console.error('Error loading deals:', err)
              globalDealsPromise = null
              return adoptDealList(globalDealsCache || initialDeals || [], { fromApi: false })
            })
        }
        return globalDealsPromise
      })()

    if (initialIsPro !== undefined) {
      fetchDeals.then((dealList) => {
        setDeals(prepareCommercialCatalog(dealList))
        setLoading(false)
      })
      return
    }

    if (authLoading) return

    const fetchAuth = user
      ? checkProStatus().then(({ isPro: hasPro, user: userProfile }) => ({
        isPro: hasPro,
        isNextFounder: !!userProfile?.isNextFounder,
      }))
      : Promise.resolve({ isPro: false, isNextFounder: false })

    Promise.all([fetchDeals, fetchAuth]).then(([dealList, access]) => {
      setDeals(prepareCommercialCatalog(dealList))
      setIsPro(access.isPro)
      setIsNextFounder(access.isNextFounder)
      setLoading(false)
      setCheckingAccess(false)
    })
  }, [authLoading, user?.id, initialIsPro])


  useEffect(() => {
    // ALWAYS start from commercial-only, deduped catalog (never raw dual sources)
    let result = prepareCommercialCatalog(deals)
    let searchScores: Map<string, number> | null = null

    if (filters?.search && filters.search.trim()) {
      const raw = filters.search.toLowerCase().trim()
      const tokens = raw.split(/\s+/).filter((t) => t.length > 0)
      searchScores = new Map<string, number>()

      result = result.filter((deal) => {
        const title = deal.title?.toLowerCase() || ''
        const provider = deal.provider?.toLowerCase() || ''
        const category = (deal.category || '').toLowerCase().replace(/-/g, ' ')
        const subcategory = (deal.subcategory || '').toLowerCase().replace(/-/g, ' ')
        const shortDesc = deal.shortDescription?.toLowerCase() || ''
        const desc = deal.description?.toLowerCase() || ''
        const tagsLc = (deal.tags || []).map((t) => String(t || '').toLowerCase())

        const allTokensMatch = tokens.every(
          (token) =>
            title.includes(token) ||
            provider.includes(token) ||
            category.includes(token) ||
            subcategory.includes(token) ||
            shortDesc.includes(token) ||
            desc.includes(token) ||
            tagsLc.some((tag) => tag.includes(token))
        )
        if (!allTokensMatch) return false

        let score = 0
        for (const token of tokens) {
          if (title === token || provider === token) score += 100
          if (title.startsWith(token) || provider.startsWith(token)) score += 50
          if (title.includes(token)) score += 25
          if (provider.includes(token)) score += 20
          if (tagsLc.some((tag) => tag === token)) score += 15
          else if (tagsLc.some((tag) => tag.includes(token))) score += 8
          if (category.includes(token)) score += 12
          if (subcategory.includes(token)) score += 12
          if (shortDesc.includes(token)) score += 4
          else if (desc.includes(token)) score += 2
        }
        if (tokens.length > 1 && title.includes(raw)) score += 60
        const pop = scoreDealPopularity(deal)
        if (pop >= 55) score += 5
        else if (deal.recommended) score += 3
        if (deal.featured) score += 2

        searchScores!.set(deal.slug, score)
        return true
      })
    }

    // Category filter
    if (filters?.category) {
      if (
        filters.category === 'startup-programs' ||
        filters.category === 'accelerators' ||
        filters.category === 'incubators' ||
        filters.category === 'grants'
      ) {
        result = []
      } else {
        result = result.filter(
          (deal) =>
            deal.category === filters.category || deal.subcategory === filters.category
        )
        if (filters.subcategory) {
          result = result.filter((deal) => deal.subcategory === filters.subcategory)
        }
      }
    }

    // Value filter
    if (filters?.value) {
      result = result.filter((deal) => {
        const value = (deal.value || '').replace(/[^0-9]/g, '')
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

    // Sort
    if (searchScores && (filters?.sort === 'relevance' || !filters?.sort)) {
      result.sort((a, b) => {
        const sa = searchScores!.get(a.slug) || 0
        const sb = searchScores!.get(b.slug) || 0
        if (sa !== sb) return sb - sa
        return a.title.localeCompare(b.title)
      })
    } else {
      switch (filters?.sort) {
        case 'newest':
          result.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          break
        case 'value-high':
          result.sort((a, b) => {
            const aValue = parseInt((a.value || '').replace(/[^0-9]/g, '')) || 0
            const bValue = parseInt((b.value || '').replace(/[^0-9]/g, '')) || 0
            return bValue - aValue
          })
          break
        case 'value-low':
          result.sort((a, b) => {
            const aValue = parseInt((a.value || '').replace(/[^0-9]/g, '')) || 0
            const bValue = parseInt((b.value || '').replace(/[^0-9]/g, '')) || 0
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
          result.sort((a, b) => compareDealsByPopularity(a, b))
      }
    }

    setFilteredDeals(result)
  }, [deals, filters])

  // Convert Deal to DealCard format
  const convertDealToCardFormat = (deal: Deal) => {
    const category = categories.find(cat => cat.id === deal.category)

    let badge = undefined
    let badgeColor = undefined

    // Featured badge is paid-ad only (featured + active featuredUntil)
    const isPaidFeatured = isActivePaidFeatured(deal)

    if (isPaidFeatured) {
      badge = '⭐ Featured'
      badgeColor = 'bg-amber-400 text-black'
    } else {
      const popLabel = popularityBadgeLabel(deal)
      if (popLabel === 'Popular') {
        badge = 'Popular'
        badgeColor = 'bg-orange-500'
      } else if (popLabel === 'Recommended' || deal.recommended) {
        badge = 'Recommended'
        badgeColor = 'bg-orange-500'
      } else if (deal.status === 'limited') {
        badge = 'Limited'
        badgeColor = 'bg-red-500'
      } else if (deal.status === 'coming-soon') {
        badge = 'Soon'
        badgeColor = 'bg-blue-500'
      }
      // Never show a plain "Featured" badge for non-paid catalog deals
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

    const applyUrl = resolveDealApplicationUrl(deal)
    const providerUrl = deal.providerWebsite || applyUrl || getStartupProgramUrl(deal.provider)
    let logoFallback: string | null = null
    if (providerUrl) {
      try {
        const domain = new URL(providerUrl).hostname.replace('www.', '')
        logoFallback = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
      } catch {
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
      valueStyle: isPaidFeatured ? 'bg-ink text-white text-primary' : 'bg-white text-ink border-2 border-ink',
      description: deal.shortDescription,
      eligibility: hasVerifiedEligibility ? deal.eligibility[0] : undefined,
      validFor: hasVerifiedTimeToApply ? deal.timeToApply : undefined,
      // Prefer real deal.applicationUrl; never Google-search placeholders
      applicationUrl: applyUrl,
      verified: deal.verified,
    }
  }

  // Pagination — local state synced to URL so back navigation restores
  // page + filter state.
  const [localPage, setLocalPage] = useState(() => Number(searchParams.get('page')) || 1)
  const lastFiltersRef = useRef<string>('')

  // When filters change OR searchParams change (e.g. user hits browser
  // back from a single-deal page), re-derive the page. Filter changes
  // reset to page 1; pure URL changes (back/forward) honor the URL.
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

  // Page size is always a multiple of 2 and 3 (grid is 2-col mobile / 3-col lg),
  // so full pages never end with a single orphan card. (We no longer inject
  // in-grid ad cells — that old logic bumped page 1 to 13 deals.)
  const pageBoundaries: { start: number; end: number }[] = []
  let currentIdx = 0
  while (currentIdx < filteredDeals.length) {
    const remainingDeals = filteredDeals.length - currentIdx
    const dealsCount = Math.min(dealsPerPage, remainingDeals)
    pageBoundaries.push({ start: currentIdx, end: currentIdx + dealsCount })
    currentIdx += dealsCount
  }

  const totalPages = pageBoundaries.length || 1
  const currentPage = Math.min(Math.max(1, localPage), totalPages)
  
  const { start: startIndex, end: endIndex } = pageBoundaries[currentPage - 1] || { start: 0, end: 0 }
  const currentDeals = filteredDeals.slice(startIndex, endIndex)

  // ── "Free resource" marketing unlock ──────────────────────────────────
  // A shareable URL like /deals?page=3&unlock=<slug> surfaces specific
  // deal(s) as fully visible, grabbable cards ABOVE the (otherwise blurred)
  // grid. This lets non-members claim one featured freebie and get a taste
  // of the catalog, nudging them to unlock the rest. Multiple slugs can be
  // comma-separated. Sourced from the full filtered list (not just the
  // current page) so the shared link always shows the deal.
  const unlockParam = searchParams.get('unlock') || ''
  const unlockSlugs = new Set(
    unlockParam.split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
  )
  const freeResourceDeals = unlockSlugs.size > 0
    ? filteredDeals.filter(d => unlockSlugs.has((d.slug || '').toLowerCase()))
    : []

  const handlePageChange = (page: number) => {
    setLocalPage(page)
    // router.push (not raw pushState) so Next.js's App Router knows about
    // the URL change. Otherwise browser back skips over the page param
    // and lands the user on page 1 instead of the page they came from.
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Results Summary */}
      <div className="mb-3 md:mb-5 flex justify-between items-center gap-2 px-1">
        <p className="text-xs md:text-[13px] text-gray-600 dark:text-gray-400">
          Showing <span className="font-semibold text-gray-900 dark:text-white tabular-nums">{filteredDeals.length > 0 ? startIndex + 1 : 0}–{Math.min(endIndex, filteredDeals.length)}</span> of{' '}
          <span className="font-semibold text-gray-900 dark:text-white tabular-nums">{filteredDeals.length}</span> deals
        </p>
        {filters?.search && (
          <p className="text-xs md:text-[13px] text-gray-500 dark:text-gray-400 truncate flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-gray-400">search</span>
            <span className="truncate">&ldquo;{filters.search}&rdquo;</span>
          </p>
        )}
      </div>

      {/* No Results */}
      {!loading && !authLoading && !checkingAccess && filteredDeals.length === 0 && (
        <div className="text-center py-6 bg-white dark:bg-[#0c0c0c] border-3 border-ink dark:border-white/10 shadow-hard-sm">
          <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4 block">search_off</span>
          <h3 className="text-xl font-bold text-gray-700 dark:text-white mb-2">No deals found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {deals.length === 0
              ? "No deals have been imported yet. Use the admin panel to import your deals."
              : "Try adjusting your filters or search terms"
            }
          </p>
          <button
            onClick={() => {
              if (deals.length === 0) {
                window.location.reload()
              } else {
                // Clear all query params (filters + page) — DealsContent
                // re-syncs filter state from the URL.
                router.push(pathname, { scroll: false })
              }
            }}
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
              className="bg-white dark:bg-[#0c0c0c] border-2 border-gray-100 dark:border-white/5 p-4 animate-pulse"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-white/5 rounded-sm flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 bg-gray-100 dark:bg-white/5 rounded w-3/4" />
                  <div className="h-2.5 bg-gray-100 dark:bg-white/5 rounded w-1/2" />
                </div>
              </div>
              <div className="space-y-2 mb-3">
                <div className="h-2.5 bg-gray-100 dark:bg-white/5 rounded w-full" />
                <div className="h-2.5 bg-gray-100 dark:bg-white/5 rounded w-5/6" />
              </div>
              <div className="h-5 bg-gray-100 dark:bg-white/5 rounded w-1/3 mb-3" />
              <div className="h-8 bg-gray-100 dark:bg-white/5 rounded-sm w-full" />
            </div>
          ))}
        </div>
      )}


      {/* Free resource strip — visible & grabbable even on gated pages.
          Shown only when a shareable ?unlock=<slug> link targets a deal. */}
      {!loading && !authLoading && !checkingAccess && freeResourceDeals.length > 0 && (
        <div className="mb-5 bg-amber-50 dark:bg-accent-yellow/10 border-2 border-black dark:border-accent-yellow/25 rounded-sm shadow-[3px_3px_0px_#111] dark:shadow-[3px_3px_0px_rgba(16,185,129,0.05)] p-3 md:p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined !text-[18px] text-amber-800 dark:text-accent-yellow">redeem</span>
            <span className="font-mono text-[11px] md:text-[12px] font-black uppercase tracking-[0.12em] text-black dark:text-accent-yellow">
              Free resource — grab it, no membership needed
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
            {freeResourceDeals.map((deal) => (
              <DealCard key={`free-${deal.id ?? deal.slug}`} deal={convertDealToCardFormat(deal)} />
            ))}
          </div>
        </div>
      )}

      {/* Deals Grid (with blur lock overlay if needed) */}
      {!loading && !authLoading && !checkingAccess && filteredDeals.length > 0 && (() => {
        // Enforce pagination limits based on plan and category
        let isLocked = false;
        let lockTitle = "Don't Leave Deals On The Table";
        let lockSubtitle = "Members-only access";
        let lockMessage = "Unlock instant access to the web's largest collection of startup perks. The average founder saves a minimum of $3,000+ in their first week alone by activating cloud credits, software discounts, and grant opportunities.";
        let bullets: string[] = [
          'Save a minimum of $3,000+ in your first week (average founder metrics)',
          'Stack six-figure cloud credits across AWS, GCP, Azure & OpenAI',
          'Vetted SaaS & cloud offers matched to your stage',
        ];
        let primaryCta = "See Plans · Unlock Now";
        let reassurance = "Cancel anytime · Instant access · No risk";

        // Gate: only the first page of the catalog is open. Every page beyond
        // page 1 is locked for all non-Pro members — applied uniformly across
        // All deals and every category (cloud, SaaS, ads). Pro keeps unlimited access.
        if (!isPro && currentPage > 1) {
          isLocked = true;
          if (isNextFounder) {
            lockTitle = "Unlock The Full Catalog";
            lockSubtitle = "Founder plan removes the limit";
            lockMessage = "You're on page one of the catalog. Upgrade to Founder to unlock every page — six-figure cloud credits, premium SaaS, accelerators, and grant programs. Average founder saves a minimum of $3,000+ in their first week.";
            bullets = [
              'Average founder saves a minimum of $3,000+ in the first week',
              '$200K+ in additional cloud and infra credits',
              'Premium SaaS deals & grants reserved for funded founders',
            ];
          } else {
            lockTitle = "Don't Leave Deals On The Table";
            lockSubtitle = "Members-only access";
            lockMessage = "Unlock instant access to the web's largest collection of startup perks. The average founder saves a minimum of $3,000+ in their first week alone by activating cloud credits, software discounts, and grant opportunities.";
            bullets = [
              'Save a minimum of $3,000+ in your first week (average founder metrics)',
              'Stack six-figure cloud credits across AWS, GCP, Azure & OpenAI',
              'Vetted SaaS & cloud offers matched to your stage',
            ];
          }
        }

        return (
          <div className="relative mb-4 md:mb-5">
            <StaggerGrid
              animKey={`${currentPage}-${filters?.search || ''}-${filters?.category || ''}-${filters?.subcategory || ''}-${filters?.sort || ''}`}
              className={`grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 transition-all duration-300 ${isLocked ? 'pointer-events-none select-none' : ''
                }`}
              aria-hidden={isLocked}
              style={isLocked ? { filter: 'blur(7px) saturate(0.8)' } : undefined}
            >
              {currentDeals.map((deal) => (
                <StaggerGridItem key={deal.id ?? deal.slug}>
                  <DealCard deal={convertDealToCardFormat(deal)} />
                </StaggerGridItem>
              ))}
            </StaggerGrid>

            {/* Lock overlay — content remains visible but blurred underneath */}
            {isLocked && (
              <div className="absolute inset-0 z-20 flex items-center justify-center px-3 py-6">
                {/* Soft fade so blur reads as depth, not noise */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/65 to-white/40 dark:from-black/40 dark:via-black/65 dark:to-black/40 pointer-events-none" />

                {/* Card */}
                <div className="relative w-full max-w-md bg-white dark:bg-[#0c0c0c] border-2 border-black dark:border-white/10 rounded-sm shadow-[5px_5px_0px_#111] dark:shadow-[5px_5px_0px_rgba(255,255,255,0.05)] overflow-hidden lock-overlay-fade-in">
                  {/* Decorative mandala */}
                  <div className="absolute -top-12 -right-12 w-44 h-44 pointer-events-none opacity-[0.10]" aria-hidden="true">
                    <svg viewBox="0 0 200 200" className="w-full h-full text-gray-900 dark:text-white/10 lock-overlay-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.7">
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

                  <div className="relative p-5 md:p-7 text-left">
                    {/* Subtitle pill */}
                    <div className="mb-3 inline-flex items-center gap-1.5 px-2 py-0.5 bg-accent-yellow/20 border-2 border-black dark:border-accent-yellow/10 rounded-sm">
                      <span className="material-symbols-outlined !text-[12px] text-black dark:text-accent-yellow">lock</span>
                      <span className="font-mono text-[9px] font-black uppercase tracking-[0.12em] text-black dark:text-accent-yellow">
                        {lockSubtitle}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-mono text-lg md:text-xl font-black uppercase text-black dark:text-white mb-1.5 leading-tight">
                      {lockTitle}
                    </h3>

                    {/* Description */}
                    <p className="text-[12.5px] md:text-[13px] text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {lockMessage}
                    </p>

                    {/* Quick value props */}
                    <ul className="space-y-1.5 mb-5 pb-4 border-b-2 border-black dark:border-white/10 border-dashed">
                      {bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-[12px] text-gray-800 dark:text-gray-300">
                          <span className="material-symbols-outlined !text-[14px] text-amber-700 dark:text-accent-yellow flex-shrink-0 mt-0.5">check_circle</span>
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
                        className="inline-flex items-center justify-center gap-1.5 bg-white dark:bg-[#1a1a1a] text-black dark:text-white font-mono font-black px-4 py-2.5 text-[12px] uppercase tracking-[0.1em] rounded-sm border-2 border-black dark:border-white/15 shadow-[2px_2px_0px_#111] dark:shadow-none hover:bg-gray-50 dark:hover:bg-white/5 hover:shadow-[3px_3px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all"
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