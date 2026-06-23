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

export interface FlashDealOption {
  label: string
  url: string
}

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
  /** Country/region specific promo options if available */
  options?: FlashDealOption[]
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
    id: 'chatgpt-plus-flash',
    name: 'ChatGPT Plus Promo',
    description: 'Claim your exclusive region-based promo code for ChatGPT Plus.',
    badge: 'hot',
    category: 'ai-credits',
    logo: '/logos/chatgpt.png',
    domain: 'chatgpt.com',
    price: 'Promo',
    priceUnit: 'Discount',
    originalPrice: '$20',
    discount: 'SPECIAL OFFER',
    discountColor: 'red',
    durationHours: 72,
    dealUrl: 'https://chatgpt.com',
    options: [
      { label: '🇺🇸 USA', url: 'https://chatgpt.com/?promoCode=f6sus' },
      { label: '🇨🇦 Canada', url: 'https://chatgpt.com/?promoCode=factspanca' },
      { label: '🇦🇺 Australia', url: 'https://chatgpt.com/?promoCode=27aiau' },
      { label: '🇳🇿 New Zealand', url: 'https://chatgpt.com/?promoCode=27ainz' },
      { label: '🇲🇽 Mexico', url: 'https://chatgpt.com/?promoCode=wedoaimx' },
      { label: '🇵🇰 Pakistan', url: 'https://chatgpt.com/?promoCode=wedoaipk' },
      { label: '🇩🇪 Germany', url: 'https://chatgpt.com/?promoCode=loptrde' },
      { label: '🇩🇰 Denmark', url: 'https://chatgpt.com/?promoCode=factspandk' },
      { label: '🇮🇳 India', url: 'https://chatgpt.com/?promoCode=27aiin' },
      { label: '🇯🇵 Japan', url: 'https://chatgpt.com/?promoCode=archinesjp' },
      { label: '🇸🇬 Singapore', url: 'https://chatgpt.com/?promoCode=synechronsg' },
    ],
  },
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


