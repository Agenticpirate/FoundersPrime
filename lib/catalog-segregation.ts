/**
 * Catalog segregation — single source of truth for where inventory lives:
 *   Deals     = commercial credits / SaaS / ads
 *   Programs  = accelerators / incubators / grants / startup programs
 *   Students  = student-only / campus eligibility
 */

export type ProgramKind = 'accelerator' | 'incubator' | 'grant' | 'program'

/** Categories that belong under /programs, never under /deals listings */
export const PROGRAM_CATEGORIES = new Set([
  'startup-programs',
  'accelerators',
  'incubators',
  'grants',
  'program',
  'programs',
])

export const PROGRAM_SUBCATEGORIES = new Set([
  'accelerators',
  'incubators',
  'grants',
  'communities',
  'fellowship',
  'fellowships',
])

/** Canonical commercial deal categories shown in deals sidebar */
export const DEAL_CATEGORIES = new Set([
  'cloud-credits',
  'ad-credits',
  'saas-discounts',
])

/** Display names (full — avoid sidebar truncation confusion) */
const DEAL_CATEGORY_LABELS: Record<string, string> = {
  'cloud-credits': 'Cloud Credits',
  'ad-credits': 'Ad Credits',
  'saas-discounts': 'SaaS & Tools',
}

/** Legacy / free-form category → bucket */
const CATEGORY_REMAP: Record<string, string> = {
  'cloud-credits': 'cloud-credits',
  'ad-credits': 'ad-credits',
  'saas-discounts': 'saas-discounts',
  saas: 'saas-discounts',
  ai: 'saas-discounts',
  business: 'saas-discounts',
  marketing: 'saas-discounts',
  development: 'saas-discounts',
  sales: 'saas-discounts',
  customer: 'saas-discounts',
  'human-resources': 'saas-discounts',
  lifestyle: 'saas-discounts',
  data: 'saas-discounts',
  'project-management': 'saas-discounts',
  finance: 'saas-discounts',
  it: 'saas-discounts',
  productivity: 'saas-discounts',
  'dev-tools': 'saas-discounts',
  'design-tools': 'saas-discounts',
}

const CLOUD_HINT =
  /\b(aws|amazon web|azure|google cloud|gcp|digitalocean|digital ocean|heroku|vercel|netlify|render\.com|supabase|firebase|cloudflare|mongodb atlas|planetscale|neon\.tech|fly\.io|linode|vultr|oracle cloud|ibm cloud|alibaba cloud|cloud credit|compute credit|hosting credit|serverless|kubernetes|s3\b|ec2\b)\b/i

const AD_HINT =
  /\b(ad credit|ads credit|advertising credit|google ads|meta ads|facebook ads|instagram ads|linkedin ads|tiktok ads|twitter ads|x ads|bing ads|microsoft ads|snapchat ads|pinterest ads|ad spend|promoted posts?)\b/i

export function normalizeCategoryId(raw?: string | null): string {
  return (raw || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
}

export function isProgramRow(row: {
  category?: string | null
  subcategory?: string | null
  title?: string | null
  tags?: string[] | null
}): boolean {
  const cat = normalizeCategoryId(row.category)
  const sub = normalizeCategoryId(row.subcategory)
  if (PROGRAM_CATEGORIES.has(cat)) return true
  if (PROGRAM_SUBCATEGORIES.has(sub)) return true
  if (cat === 'grants') return true
  const tags = (row.tags || []).map((t) => String(t).toLowerCase())
  if (tags.some((t) => t.includes('accelerator') || t.includes('incubator'))) return true
  return false
}

export function isCommercialDealRow(row: {
  category?: string | null
  subcategory?: string | null
  title?: string | null
  tags?: string[] | null
}): boolean {
  return !isProgramRow(row)
}

/**
 * Assign commercial deals to Cloud / Ad / SaaS using category, subcategory,
 * and title/provider text so orphan labels (business, ai, …) land correctly.
 */
export function normalizeDealCategory(
  category?: string | null,
  subcategory?: string | null,
  extras?: { title?: string | null; provider?: string | null; description?: string | null; tags?: string[] | null }
): string {
  const cat = normalizeCategoryId(category)
  const sub = normalizeCategoryId(subcategory)
  const blob = [
    category,
    subcategory,
    extras?.title,
    extras?.provider,
    extras?.description,
    ...(extras?.tags || []),
  ]
    .filter(Boolean)
    .join(' ')

  // Strong content signals win over messy legacy categories
  if (AD_HINT.test(blob) || sub.includes('ad') || cat.includes('ad-credit')) {
    return 'ad-credits'
  }
  if (
    CLOUD_HINT.test(blob) ||
    sub.includes('cloud') ||
    sub.includes('hosting') ||
    sub.includes('database') ||
    sub.includes('serverless') ||
    cat === 'cloud-credits'
  ) {
    return 'cloud-credits'
  }

  if (DEAL_CATEGORIES.has(cat)) return cat
  if (CATEGORY_REMAP[cat]) return CATEGORY_REMAP[cat]

  return 'saas-discounts'
}

export function classifyProgramKind(row: {
  category?: string | null
  subcategory?: string | null
  title?: string | null
  tags?: string[] | null
  description?: string | null
}): ProgramKind {
  const blob = [
    row.subcategory,
    row.category,
    row.title,
    ...(row.tags || []),
    row.description || '',
  ]
    .join(' ')
    .toLowerCase()

  if (blob.includes('grant') || blob.includes('sbir') || blob.includes('sttr')) return 'grant'
  if (blob.includes('incubator') || blob.includes('venture studio')) return 'incubator'
  if (
    blob.includes('accelerator') ||
    blob.includes('yc ') ||
    blob.includes('techstars') ||
    blob.includes('batch')
  ) {
    return 'accelerator'
  }
  const sub = normalizeCategoryId(row.subcategory)
  if (sub === 'grants') return 'grant'
  if (sub === 'incubators') return 'incubator'
  if (sub === 'accelerators') return 'accelerator'
  return 'program'
}

/**
 * Rows that belong on /student-benefits (full student catalog).
 * Includes:
 *  - Student / campus / PhD eligibility
 *  - Open perks (Everyone / Anyone) that live in the student dataset
 * Excludes pure founder/startup programs (those belong under /programs).
 *
 * Note: a previous strict filter dropped Everyone/Anyone (~200 rows) and
 * shrank the directory under 900. This catalog filter restores 900+.
 */
export function isStudentCatalogEligibility(eligibility?: string | null): boolean {
  const e = (eligibility || '').trim()
  // Empty eligibility still listed in student dataset → keep
  if (!e) return true
  const lower = e.toLowerCase()
  // Founder / startup programs without student mention → /programs
  if (
    (lower.includes('founder') || lower.includes('startup')) &&
    !lower.includes('student')
  ) {
    return false
  }
  return true
}

/** @deprecated Prefer isStudentCatalogEligibility for directory listings */
function isStudentOnlyEligibility(eligibility?: string | null): boolean {
  return isStudentCatalogEligibility(eligibility)
}

export type CatalogScope = 'deals' | 'programs' | 'all'

type RowLike = {
  category?: string | null
  subcategory?: string | null
  title?: string | null
  provider?: string | null
  description?: string | null
  shortDescription?: string | null
  tags?: string[] | null
}

/**
 * Filter + normalize a raw list for a given scope.
 * - deals: commercial only, categories remapped to cloud | ads | saas
 * - programs: program rows only
 * - all: no filter (admin)
 */
export function applyCatalogScope<T extends RowLike>(
  rows: T[],
  scope: CatalogScope = 'deals'
): T[] {
  if (scope === 'all') return rows

  if (scope === 'programs') {
    return rows.filter((r) => isProgramRow(r))
  }

  const out: T[] = []
  for (const r of rows) {
    if (!isCommercialDealRow(r)) continue
    out.push({
      ...r,
      category: normalizeDealCategory(r.category, r.subcategory, {
        title: r.title,
        provider: r.provider,
        description: r.description || r.shortDescription,
        tags: r.tags,
      }),
    })
  }
  return out
}

/** Build sidebar counts from a commercial deals list (already scoped). */
export function countDealsByCategory(
  deals: { category?: string | null; subcategory?: string | null }[]
): { total: number; byCategory: Record<string, number>; bySubcategory: Record<string, number> } {
  const byCategory: Record<string, number> = {
    'cloud-credits': 0,
    'ad-credits': 0,
    'saas-discounts': 0,
  }
  const bySubcategory: Record<string, number> = {}

  for (const d of deals) {
    const cat = normalizeDealCategory(d.category, d.subcategory)
    byCategory[cat] = (byCategory[cat] || 0) + 1
    if (d.subcategory) {
      const subId = normalizeCategoryId(d.subcategory)
      const key = `${cat}/${subId}`
      bySubcategory[key] = (bySubcategory[key] || 0) + 1
    }
  }

  const total =
    (byCategory['cloud-credits'] || 0) +
    (byCategory['ad-credits'] || 0) +
    (byCategory['saas-discounts'] || 0)

  return { total, byCategory, bySubcategory }
}
