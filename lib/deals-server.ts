import 'server-only'
import type { Deal } from '@/lib/deals-database'

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
    applicationUrl: d.applicationUrl || d.application_url || '',
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
