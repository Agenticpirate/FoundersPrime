/**
 * Deal popularity scoring for commercial catalog (/deals only).
 *
 * Ranks high-value startup offers first: free full-year plans, 100% off,
 * large cloud/ad credits, and well-known startup programs (GitHub, AWS,
 * Webflow, etc.). Small percentage discounts score low and stay later.
 *
 * Programs (accelerators/incubators/grants) are out of scope — callers
 * should only apply this to commercial deal rows.
 */

export interface PopularityDealInput {
  title?: string | null
  provider?: string | null
  value?: string | null
  shortDescription?: string | null
  description?: string | null
  tags?: string[] | null
  logoUrl?: string | null
  status?: string | null
  featured?: boolean | null
  featuredUntil?: string | null
  recommended?: boolean | null
  sortOrder?: number | null
  createdAt?: string | null
}

/** Minimum score to earn recommended/Popular badge + first-page priority */
export const POPULAR_RECOMMENDED_THRESHOLD = 55

/** Top tier — flagship free-year / mega-credit startup programs */
const TIER_S_BRANDS = [
  'github',
  'aws activate',
  'aws',
  'amazon web services',
  'google for startups',
  'google cloud',
  'microsoft for startups',
  'microsoft founders hub',
  'founders hub',
  'digitalocean hatch',
  'digitalocean',
  'webflow',
  'linear',
  'auth0',
  'okta',
] as const

/** Strong brands with known high-value startup offers */
const TIER_A_BRANDS = [
  'notion',
  'stripe',
  'airtable',
  'cloudflare',
  'mongodb',
  'datadog',
  'posthog',
  'heroku',
  'vercel',
  'mixpanel',
  'intercom',
  'sentry',
  'hubspot',
  'twilio',
  'segment',
  'algolia',
  'databricks',
  'framer',
  'gitlab',
  'retool',
  'amplitude',
  'zoom',
  'customer.io',
  'customerio',
  'perplexity',
  'make.com',
  'mercury',
  'instatus',
  'devrev',
  'ovhcloud',
  'ovh cloud',
  'scalingo',
  'netcore',
  'alibaba cloud',
  'alibaba',
  'ibm cloud',
  'vultr',
  'linode',
  'akamai',
  'tencent cloud',
  'scaleway',
  'confluent',
  'zendesk',
  'byteplus',
  'deepgram',
  'openai',
  'anthropic',
  'supabase',
  'planetscale',
  'neon',
  'render',
  'netlify',
  'figma',
  'canva',
  'slack',
  'asana',
  'monday.com',
  'typeform',
  'calendly',
  'loom',
] as const

/** Solid brands worth a moderate boost */
const TIER_B_BRANDS = [
  'elevenlabs',
  'eleven labs',
  'flippa',
  'document360',
  'linkedin ads',
  'linkedin',
  'meta ads',
  'facebook ads',
  'google ads',
  'tiktok',
  'microsoft advertising',
  'microsoft ads',
  'bing ads',
  'yandex',
  'mollie',
  'arpio',
  'firetail',
  'quicknode',
  'beefree',
  'sendgrid',
  'mailchimp',
  'brevo',
  'sendinblue',
] as const

const FREE_YEAR_PATTERNS = [
  /free\s+for\s+(1|one)\s+year/i,
  /(1|one)\s+year\s+free/i,
  /12\s+months?\s+free/i,
  /free\s+for\s+12\s+months?/i,
  /100%\s*off/i,
  /one\s+year\s+free/i,
  /free\s+(complete\s+)?year/i,
  /full\s+year\s+free/i,
  /free\s+for\s+a\s+year/i,
  /\b1\s*yr\s+free\b/i,
  /months?\s+free\s+(on\s+)?(the\s+)?(advanced|pro|essentials|startup|growth|cms)/i,
]

const FULL_FREE_PLAN_PATTERNS = [
  /free\s+(pro|business|team|enterprise|advanced|startup)\s+plan/i,
  /\d+\s+seats?\s+free/i,
  /free\s+seats?/i,
  /waived\s+fees?/i,
  /completely\s+free/i,
  /entirely\s+free/i,
]

/** Small discounts only — deprioritize when no free-year / large credits */
const SMALL_DISCOUNT_ONLY = [
  /^\s*\d{1,2}%\s*off\b/i,
  /\b(10|15|20|25|30|40|50)%\s*off\b/i,
  /\badditional\s+\d+%\s*off\b/i,
  /\b\d+\s*months?\s+free\b/i, // short trials without full year
]

/**
 * Parse the largest currency credit amount. Prefers explicit $ / € / ₹
 * amounts tied to credits/value/perks — ignores "400M users", "30K profiles",
 * "480K ops", seat counts, etc.
 */
export function extractMaxCreditAmount(text: string): number {
  if (!text) return 0
  let max = 0

  const apply = (raw: string, suffix?: string, hasCurrency = false) => {
    let n = parseFloat(raw.replace(/,/g, ''))
    if (!Number.isFinite(n)) return
    const s = (suffix || '').toLowerCase()
    if (s === 'k') n *= 1_000
    else if (s === 'm') n *= 1_000_000
    else if (s === 'b') n *= 1_000_000_000
    // Cap absurd parsed values (bad matches)
    if (n > 5_000_000) return
    // Seat-like tiny numbers without currency
    if (n < 100 && !hasCurrency && !s) return
    if (n > max) max = n
  }

  // Explicit currency: $100,000 / $100k / €10,000 / $5K-$150K
  const currencyRe = /[$€]\s*([\d,]+(?:\.\d+)?)\s*([kmb])?/gi
  let m: RegExpExecArray | null
  while ((m = currencyRe.exec(text)) !== null) {
    apply(m[1], m[2], true)
  }

  // "100k in credits" / "up to 50K credits" / "$100,000 Credits" already covered;
  // bare "100k credits|value|perks|savings" only when unit is credit-related
  const bareCreditRe =
    /\b([\d,]+(?:\.\d+)?)\s*([kmb])?\s*\+?\s*(?:in\s+)?(?:cloud\s+|ad\s+|platform\s+|api\s+|ai\s+)?(?:credits?|value|perks?|savings?)\b/gi
  while ((m = bareCreditRe.exec(text)) !== null) {
    apply(m[1], m[2], false)
  }

  // "Up to 100000 credits" without k suffix
  const upToRe = /(?:up\s+to|worth|value\s+of)\s*[$€]?\s*([\d,]+)\s*([kmb])?/gi
  while ((m = upToRe.exec(text)) !== null) {
    apply(m[1], m[2], true)
  }

  // ₹ → rough USD for scoring only
  const inr = text.match(/₹\s*([\d,]+)/)
  if (inr) {
    const usd = parseFloat(inr[1].replace(/,/g, '')) / 83
    if (usd > max && usd < 5_000_000) max = usd
  }

  return max
}

/**
 * Prefer the deal's value headline, then title — avoid long descriptions
 * polluting credit extraction with user counts / ops metrics.
 */
function dealCreditAmount(deal: PopularityDealInput): number {
  const primary = extractMaxCreditAmount([deal.value, deal.title].filter(Boolean).join(' '))
  if (primary >= 500) return primary
  // Fallback: short description only (still no full long description)
  const secondary = extractMaxCreditAmount(deal.shortDescription || '')
  return Math.max(primary, secondary)
}

function brandMatches(haystack: string, brand: string): boolean {
  if (brand.length <= 3) {
    // short keys: whole word only (aws, okta, …)
    return new RegExp(`(?:^|[^a-z0-9])${brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:[^a-z0-9]|$)`, 'i').test(
      haystack
    )
  }
  return haystack.includes(brand)
}

/**
 * Brand score from provider first (authoritative), then title.
 * Avoids "FireTail on AWS Marketplace" inheriting the AWS flagship score.
 */
function brandTierScore(deal: PopularityDealInput): number {
  const provider = (deal.provider || '').toLowerCase()
  const title = (deal.title || '').toLowerCase()

  const scoreFrom = (text: string, allowHostBrands: boolean): number => {
    for (const b of TIER_S_BRANDS) {
      if (!brandMatches(text, b)) continue
      // Host marketplace brands only count from provider, not title alone
      if (
        !allowHostBrands &&
        (b === 'aws' || b === 'amazon web services') &&
        /marketplace/i.test(text)
      ) {
        continue
      }
      return 95
    }
    for (const b of TIER_A_BRANDS) {
      if (brandMatches(text, b)) return 70
    }
    for (const b of TIER_B_BRANDS) {
      if (brandMatches(text, b)) return 40
    }
    return 0
  }

  const fromProvider = scoreFrom(provider, true)
  if (fromProvider > 0) return fromProvider

  // Title: skip AWS-style host brands when it's clearly another product on a marketplace
  if (/marketplace/i.test(title)) {
    return scoreFrom(title, false)
  }
  return scoreFrom(title, true)
}

function freeYearScore(blob: string): number {
  if (FREE_YEAR_PATTERNS.some((re) => re.test(blob))) return 90
  if (FULL_FREE_PLAN_PATTERNS.some((re) => re.test(blob))) return 55
  return 0
}

function creditAmountScore(amount: number): number {
  if (amount >= 100_000) return 100
  if (amount >= 50_000) return 85
  if (amount >= 20_000) return 70
  if (amount >= 10_000) return 55
  if (amount >= 5_000) return 40
  if (amount >= 1_000) return 22
  if (amount >= 500) return 12
  return 0
}

function isSmallDiscountOnly(deal: PopularityDealInput, blob: string, creditAmount: number): boolean {
  if (creditAmount >= 5_000) return false
  if (freeYearScore(blob) > 0) return false
  const value = (deal.value || '').toLowerCase()
  // "50% off for 6 months" without free year / big credits
  if (SMALL_DISCOUNT_ONLY.some((re) => re.test(value) || re.test(blob))) {
    // Allow if also mentions substantial credits elsewhere
    if (creditAmount >= 1_000) return false
    // 100% off is free-year territory, already handled
    if (/100%\s*off/i.test(blob)) return false
    return true
  }
  return false
}

/**
 * Compute a 0–~300 popularity score. Higher = more valuable / popular deal.
 */
export function scoreDealPopularity(deal: PopularityDealInput): number {
  // Free-year / 100% off: prefer title + value so description noise doesn't inflate
  const offerBlob = [deal.title, deal.provider, deal.value, deal.shortDescription]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  const creditAmount = dealCreditAmount(deal)

  let score = 0
  score += brandTierScore(deal)
  score += freeYearScore(offerBlob)
  score += creditAmountScore(creditAmount)

  // Startup program phrasing (for startups, hatch, activate, founders hub)
  if (/\b(for startups|startup program|founders hub|hatch|activate)\b/i.test(offerBlob)) {
    score += 15
  }

  // Active status slight boost
  if (deal.status === 'active') score += 5

  // Deprioritize little % discounts (and matched ad promos under $1k)
  if (isSmallDiscountOnly(deal, offerBlob, creditAmount)) {
    score = Math.min(score, 25)
  }

  // Small ad credit match promos ($100–$600) should not outrank free-year SaaS
  if (creditAmount > 0 && creditAmount < 1_000 && freeYearScore(offerBlob) === 0) {
    score = Math.min(score, brandTierScore(deal) + creditAmountScore(creditAmount) + 10)
  }

  return score
}

/** Whether this deal should show as Recommended / Popular */
export function isPopularRecommended(
  deal: PopularityDealInput,
  score?: number
): boolean {
  const s = score ?? scoreDealPopularity(deal)
  return s >= POPULAR_RECOMMENDED_THRESHOLD
}

/**
 * Paid ad placement only: featured flag + non-expired featuredUntil.
 * Free/catalog "featured" flags without a paid window do not qualify.
 */
export function isActivePaidFeatured(
  deal: PopularityDealInput,
  now = Date.now()
): boolean {
  return !!(
    deal.featured &&
    deal.featuredUntil &&
    new Date(deal.featuredUntil).getTime() > now
  )
}

/**
 * Mark commercial deals recommended from popularity score.
 * When stripUnpaidFeatured is true (default for list API), only active paid
 * placements keep featured=true — catalog-only featured flags are cleared.
 */
export function applyPopularityFlags<T extends PopularityDealInput>(
  deal: T,
  options?: { stripUnpaidFeatured?: boolean; clearFeatured?: boolean }
): T & { recommended: boolean } {
  const score = scoreDealPopularity(deal)
  const recommended = isPopularRecommended(deal, score)
  const strip = options?.stripUnpaidFeatured ?? options?.clearFeatured
  return {
    ...deal,
    recommended,
    ...(strip
      ? { featured: isActivePaidFeatured(deal) as boolean }
      : {}),
  }
}

/** @deprecated use isActivePaidFeatured */
function hasActivePaidFeature(deal: PopularityDealInput, now = Date.now()): boolean {
  return isActivePaidFeatured(deal, now)
}

function hasQualityLogo(deal: PopularityDealInput): number {
  const url = deal.logoUrl || ''
  if (!url) return 0
  if (url.includes('rocket') || url.includes('ui-avatars')) return 0
  return 1
}

/**
 * Default listing sort for commercial categories:
 * paid Featured → popularity score → logo quality → title.
 * Use only when user has not chosen an explicit sort (newest, value, etc.).
 */
export function compareDealsByPopularity(
  a: PopularityDealInput & { title?: string | null },
  b: PopularityDealInput & { title?: string | null },
  now = Date.now()
): number {
  const aFeat = isActivePaidFeatured(a, now) ? 1 : 0
  const bFeat = isActivePaidFeatured(b, now) ? 1 : 0
  if (aFeat !== bFeat) return bFeat - aFeat

  const aScore = scoreDealPopularity(a)
  const bScore = scoreDealPopularity(b)
  if (aScore !== bScore) return bScore - aScore

  // Recommended flag as soft tiebreak (after score)
  const aRec = a.recommended || isPopularRecommended(a, aScore) ? 1 : 0
  const bRec = b.recommended || isPopularRecommended(b, bScore) ? 1 : 0
  if (aRec !== bRec) return bRec - aRec

  const aLogo = hasQualityLogo(a)
  const bLogo = hasQualityLogo(b)
  if (aLogo !== bLogo) return bLogo - aLogo

  const aOrder = a.sortOrder ?? 9999
  const bOrder = b.sortOrder ?? 9999
  if (aOrder !== bOrder) return aOrder - bOrder

  return (a.title || '').localeCompare(b.title || '')
}

function sortDealsPopularFirst<T extends PopularityDealInput & { title?: string | null }>(
  deals: T[]
): T[] {
  const now = Date.now()
  return [...deals].sort((a, b) => compareDealsByPopularity(a, b, now))
}

/** Badge label for cards — Popular for high-value, Recommended for mid-high */
export function popularityBadgeLabel(deal: PopularityDealInput, score?: number): 'Popular' | 'Recommended' | null {
  const s = score ?? scoreDealPopularity(deal)
  if (s >= 90) return 'Popular'
  if (s >= POPULAR_RECOMMENDED_THRESHOLD) return 'Recommended'
  return null
}
