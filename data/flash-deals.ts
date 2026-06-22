/**
 * Flash Deals — limited-time, time-sensitive offers shown on /flash-deals.
 *
 * These are intentionally SEPARATE from the main deals catalog (Supabase /
 * all-deals.json). Flash deals are short-lived: each one counts down and is
 * meant to be swapped out frequently (new drops every Monday & Thursday).
 *
 * ─── HOW TO ADD A FLASH DEAL ──────────────────────────────────────────
 * Add an object to `flashDeals` below.
 *   • category  — must match one of FLASH_CATEGORIES keys (drives the filter)
 *   • badge     — 'hot' | 'recommended' | 'new'
 *   • discountColor — 'violet' | 'orange' | 'red' (color of the % OFF chip)
 *   • Provide EITHER `endsAt` (absolute ISO date) OR `durationHours`
 *     (a rolling countdown computed from page load — handy for offers with
 *     no firm end date, e.g. "free until they pull it").
 *   • logo      — direct image URL; falls back to `domain` favicon, then initials.
 * ──────────────────────────────────────────────────────────────────────
 */

export type FlashBadge = 'hot' | 'recommended' | 'new'
export type FlashDiscountColor = 'violet' | 'orange' | 'red'

export interface FlashDeal {
  id: string
  /** Provider / product name shown on the card. */
  name: string
  /** One-line tagline. */
  description: string
  badge: FlashBadge
  /** Filter category key — see FLASH_CATEGORIES. */
  category: string
  /** Direct logo URL (preferred). */
  logo?: string
  /** Brand domain for favicon fallback. */
  domain?: string
  /** Headline price, e.g. '$150,000', '$29', '$0'. */
  price: string
  /** Unit after the price, e.g. 'Credits', '/ seat / month', 'Setup Fee'. */
  priceUnit: string
  /** Struck-through original price. */
  originalPrice: string
  /** Discount chip text, e.g. '90% OFF'. */
  discount: string
  discountColor: FlashDiscountColor
  /** Absolute end time (ISO). Takes priority over durationHours. */
  endsAt?: string
  /** Rolling countdown length (hours from page load) when no fixed end date. */
  durationHours?: number
  /** Where "View Deal" links. */
  dealUrl: string
}

/** Category filter pills (order matters — 'all' first). */
export const FLASH_CATEGORIES: { key: string; label: string }[] = [
  { key: 'all', label: 'All Deals' },
  { key: 'ai-credits', label: 'AI Credits' },
]

/** The promo coupon shown in the hero. */
export const FLASH_COUPON = {
  code: 'FPFLASH10',
  label: '10% OFF on membership',
  note: 'Use at checkout to unlock your discount.',
}

export const flashDeals: FlashDeal[] = [
  {
    id: 'openai-codex-students',
    name: 'OpenAI Codex',
    description: '$100 in Codex credits for verified university students in the US & Canada.',
    badge: 'new',
    category: 'ai-credits',
    logo: '/logos/openai-codex.png',
    domain: 'openai.com',
    price: '$100',
    priceUnit: 'AI Credits',
    originalPrice: '$100',
    discount: '100% FREE',
    discountColor: 'violet',
    durationHours: 168,
    dealUrl: 'https://chatgpt.com/codex/students/',
  },
]

