import 'server-only'
import type { Deal } from '@/lib/deals-database'
import { applyCatalogScope } from '@/lib/catalog-segregation'
import { applyPopularityFlags } from '@/lib/deal-popularity'
import { resolveDealApplicationUrl } from '@/lib/comprehensive-startup-urls'

// Server-side deal fetching from Supabase for statically-generated / ISR
// pages (e.g. /deals/[slug]). Uses the public anon key over REST with NO
// cookies, so it stays cacheable and safe to call during static generation.
//
// Why this exists: the /deals LIST is served from Supabase, but deal DETAIL
// pages historically read only from public/data/all-deals.json. That JSON is
// a stale subset, so any deal that lives only in Supabase 404s on its detail
// page. These helpers let the detail page fall back to Supabase.

function getSupabaseRestConfig(): { url: string; key: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (
    !url || !key ||
    url === 'http://localhost:54321' ||
    key === 'placeholder-anon-key' ||
    key.length < 20
  ) {
    return null
  }
  return { url, key }
}

// Whether Supabase is the active deals source. When true, the database is the
// single source of truth and callers should NOT fall back to the local JSON
// subset (which is stale and would resurrect deleted deals).
export function isDealsDbConfigured(): boolean {
  return getSupabaseRestConfig() !== null
}

function cleanText(s: any): string {
  if (typeof s !== 'string') return s ?? ''
  return s.replace(/\s+/g, ' ').trim()
}

// Map a raw Supabase row (snake_case or camelCase) into the Deal shape the
// detail page expects. Mirrors formatDealFromDB in app/api/deals/route.ts.
function mapDealRow(d: any): Deal {
  return {
    id: d.id,
    slug: d.slug,
    title: cleanText(d.title),
    provider: cleanText(d.provider),
    category: d.category,
    subcategory: d.subcategory,
    description: cleanText(d.description),
    shortDescription: cleanText(d.shortDescription || d.short_description || ''),
    value: d.value,
    originalPrice: d.originalPrice || d.original_price || '',
    discountedPrice: d.discountedPrice || d.discounted_price || '',
    savings: d.savings || '',
    eligibility: d.eligibility || [],
    requirements: d.requirements || [],
    applicationProcess: d.applicationProcess || d.application_process || [],
    proTips: d.proTips || d.pro_tips || [],
    tags: d.tags || [],
    status: d.status,
    expiryDate: d.expiryDate || d.expiry_date || '',
    applicationUrl: resolveDealApplicationUrl({
      applicationUrl: d.applicationUrl || d.application_url,
      providerWebsite: d.providerWebsite || d.provider_website,
      provider: d.provider,
      title: d.title,
    }),
    providerWebsite: d.providerWebsite || d.provider_website || '',
    logoUrl: d.logoUrl || d.logo_url || '',
    featured: d.featured,
    recommended: d.recommended,
    verified: d.verified,
    difficulty: d.difficulty,
    timeToApply: d.timeToApply || d.time_to_apply || '',
    successRate: d.successRate || d.success_rate || '',
    lastUpdated: d.lastUpdated || d.last_updated || d.updated_at || '',
    createdAt: d.createdAt || d.created_at || '',
    updatedAt: d.updatedAt || d.updated_at || '',
    sourceVerified: d.sourceVerified || d.source_verified || true,
    dataSource: d.dataSource || d.data_source || 'supabase',
  } as Deal
}

// Fetch a single deal by slug from Supabase. Returns null when not configured,
// not found, or on error (callers fall back to the local JSON dataset).
export async function fetchDealBySlugFromDB(slug: string): Promise<Deal | null> {
  const cfg = getSupabaseRestConfig()
  if (!cfg) return null
  try {
    const endpoint =
      `${cfg.url}/rest/v1/deals?slug=eq.${encodeURIComponent(slug)}&select=*&limit=1`
    const res = await fetch(endpoint, {
      headers: { apikey: cfg.key, Authorization: `Bearer ${cfg.key}` },
      // Short revalidate so admin edits/removals reflect quickly while still
      // absorbing repeat traffic. Detail pages are far lower traffic than the
      // list endpoint, so this stays well within budget.
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const rows = await res.json()
    if (!Array.isArray(rows) || rows.length === 0) return null
    return mapDealRow(rows[0])
  } catch {
    return null
  }
}

// Fetch all deal slugs from Supabase for generateStaticParams. Returns an
// empty array when not configured or on error.
export async function fetchAllDealSlugsFromDB(): Promise<string[]> {
  const cfg = getSupabaseRestConfig()
  if (!cfg) return []
  try {
    const endpoint = `${cfg.url}/rest/v1/deals?select=slug&limit=5000`
    const res = await fetch(endpoint, {
      headers: { apikey: cfg.key, Authorization: `Bearer ${cfg.key}` },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const rows = await res.json()
    if (!Array.isArray(rows)) return []
    return rows.map((r: any) => r.slug).filter(Boolean)
  } catch {
    return []
  }
}

function loadLocalDealsSync(): Deal[] {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs') as typeof import('fs')
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require('path') as typeof import('path')
    const filePath = path.join(process.cwd(), 'public', 'data', 'all-deals.json')
    if (!fs.existsSync(filePath)) return []
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    if (!Array.isArray(raw)) return []
    return raw.map((d: any) => mapDealRow(d))
  } catch {
    return []
  }
}

/**
 * Server-side deal list for SSR HTML (crawler link equity) and optional
 * client hydration. Prefers Supabase when configured; falls back to JSON.
 */
export async function fetchDealsListForSSR(limit = 5000): Promise<Deal[]> {
  const cfg = getSupabaseRestConfig()
  const cap = Math.min(Math.max(limit, 1), 5000)
  let rows: Deal[] = []
  if (cfg) {
    try {
      // Match /api/deals list behavior: full commercial catalog, stable order
      const endpoint = `${cfg.url}/rest/v1/deals?select=*&limit=${cap}&order=updated_at.desc.nullslast`
      const res = await fetch(endpoint, {
        headers: { apikey: cfg.key, Authorization: `Bearer ${cfg.key}` },
        // Shorter revalidate so SSR count stays close to live API catalog size
        next: { revalidate: 60 },
      })
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          rows = data.map((d: any) => mapDealRow(d))
        }
      }
    } catch {
      // fall through to JSON
    }
  }
  if (rows.length === 0) {
    rows = loadLocalDealsSync().slice(0, cap)
  }
  // Dedupe by slug then scope to commercial deals only
  const bySlug = new Map<string, Deal>()
  for (const d of rows) {
    const key = (d.slug || d.id || '').toLowerCase()
    if (!key) continue
    if (!bySlug.has(key)) bySlug.set(key, d)
  }
  return applyCatalogScope(Array.from(bySlug.values()), 'deals').map(
    (d) => applyPopularityFlags(d, { stripUnpaidFeatured: true }) as Deal
  )
}

/** Program rows from Supabase (for /programs merge). Empty when DB not configured. */
export async function fetchProgramsListForSSR(limit = 2000): Promise<Deal[]> {
  const cfg = getSupabaseRestConfig()
  if (!cfg) return []
  try {
    const endpoint = `${cfg.url}/rest/v1/deals?select=*&limit=${Math.min(limit, 5000)}`
    const res = await fetch(endpoint, {
      headers: { apikey: cfg.key, Authorization: `Bearer ${cfg.key}` },
      next: { revalidate: 300 },
    })
    if (!res.ok) return []
    const data = await res.json()
    if (!Array.isArray(data)) return []
    return applyCatalogScope(data.map((d: any) => mapDealRow(d)), 'programs')
  } catch {
    return []
  }
}

export function filterDealsForCategory(deals: Deal[], category?: string): Deal[] {
  if (!category) return deals
  // Program categories are not part of deals catalog
  if (
    category === 'startup-programs' ||
    category === 'accelerators' ||
    category === 'incubators' ||
    category === 'grants'
  ) {
    return []
  }
  const c = category.toLowerCase()
  return deals.filter((d) => {
    const cat = (d.category || '').toLowerCase()
    const sub = (d.subcategory || '').toLowerCase()
    return cat === c || cat.includes(c) || sub.includes(c) || (d.tags || []).some((t) => String(t).toLowerCase().includes(c))
  })
}
