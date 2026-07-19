/**
 * Commercial deals catalog helpers + short-lived client cache for DealsGrid.
 */
import type { Deal } from '@/lib/deals-database'
import {
  isCommercialDealRow,
  normalizeDealCategory,
} from '@/lib/catalog-segregation'
import { applyPopularityFlags } from '@/lib/deal-popularity'

export function normalizeDealRow(deal: Deal): Deal {
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
export function prepareCommercialCatalog(raw: Deal[] | null | undefined): Deal[] {
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

/** Module-level session cache (shared across DealsGrid mounts). */
export let globalDealsCache: Deal[] | null = null
export let globalDealsPromise: Promise<Deal[]> | null = null
export let globalDealsCacheTime = 0
// Refresh the in-memory deal list periodically so admin edits/removals show
// up within a session without needing a hard refresh.
export const DEALS_CACHE_TTL = 60_000 // 60s

export function setGlobalDealsCache(list: Deal[] | null, time = Date.now()) {
  globalDealsCache = list
  globalDealsCacheTime = time
}

export function setGlobalDealsPromise(p: Promise<Deal[]> | null) {
  globalDealsPromise = p
}

/** Apply commercial scope + slug dedupe. Empty list never wipes a good cache. */
export function adoptDealList(list: Deal[], { fromApi = false } = {}): Deal[] {
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
