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
  { key: 'saas-tools', label: 'SaaS Tools' },
  { key: 'cloud-credits', label: 'Cloud Credits' },
  { key: 'dev-tools', label: 'Dev Tools' },
  { key: 'marketing', label: 'Marketing' },
  { key: 'design', label: 'Design' },
  { key: 'productivity', label: 'Productivity' },
  { key: 'analytics', label: 'Analytics' },
  { key: 'security', label: 'Security' },
  { key: 'api-devops', label: 'API & DevOps' },
]

/** The promo coupon shown in the hero. */
export const FLASH_COUPON = {
  code: 'FPFLASH10',
  label: '10% OFF on membership',
  note: 'Use at checkout to unlock your discount.',
}

export const flashDeals: FlashDeal[] = [
  {
    id: 'aws-activate',
    name: 'AWS Activate',
    description: 'Up to $150,000 in AWS credits for startups.',
    badge: 'hot',
    category: 'cloud-credits',
    logo: 'https://www.google.com/s2/favicons?domain=aws.amazon.com&sz=128',
    domain: 'aws.amazon.com',
    price: '$150,000',
    priceUnit: 'Credits',
    originalPrice: '$150,000',
    discount: '90% OFF',
    discountColor: 'violet',
    durationHours: 62.6,
    dealUrl: 'https://aws.amazon.com/activate',
  },
  {
    id: 'linear',
    name: 'Linear',
    description: 'The modern issue tracker for high-performance teams.',
    badge: 'recommended',
    category: 'dev-tools',
    logo: 'https://cdn.simpleicons.org/linear/5E6AD2',
    domain: 'linear.app',
    price: '$29',
    priceUnit: '/ seat / month',
    originalPrice: '$60',
    discount: '30% OFF',
    discountColor: 'violet',
    durationHours: 24.55,
    dealUrl: 'https://linear.app',
  },
  {
    id: 'vercel-pro',
    name: 'Vercel Pro',
    description: 'Build, deploy, and scale without limits.',
    badge: 'hot',
    category: 'dev-tools',
    logo: 'https://cdn.simpleicons.org/vercel',
    domain: 'vercel.com',
    price: '$10',
    priceUnit: '/ seat / month',
    originalPrice: '$20',
    discount: '50% OFF',
    discountColor: 'orange',
    durationHours: 58.55,
    dealUrl: 'https://vercel.com/pricing',
  },
  {
    id: 'notion-plus',
    name: 'Notion Plus',
    description: 'Organize your work and life. All in one place.',
    badge: 'hot',
    category: 'productivity',
    logo: 'https://cdn.simpleicons.org/notion',
    domain: 'notion.so',
    price: '$4',
    priceUnit: '/ user / month',
    originalPrice: '$10',
    discount: '60% OFF',
    discountColor: 'orange',
    durationHours: 71.86,
    dealUrl: 'https://www.notion.so/product',
  },
  {
    id: 'google-cloud',
    name: 'Google Cloud',
    description: 'Up to $300 in Google Cloud credits.',
    badge: 'new',
    category: 'cloud-credits',
    logo: 'https://cdn.simpleicons.org/googlecloud',
    domain: 'cloud.google.com',
    price: '$300',
    priceUnit: 'Credits',
    originalPrice: '$300',
    discount: '30% OFF',
    discountColor: 'violet',
    durationHours: 83.74,
    dealUrl: 'https://cloud.google.com/startup',
  },
  {
    id: 'stripe-atlas',
    name: 'Stripe Atlas',
    description: 'Launch your company anywhere in the world.',
    badge: 'hot',
    category: 'api-devops',
    logo: 'https://cdn.simpleicons.org/stripe/635BFF',
    domain: 'stripe.com',
    price: '$0',
    priceUnit: 'Setup Fee',
    originalPrice: '$500',
    discount: '100% OFF',
    discountColor: 'red',
    durationHours: 58.01,
    dealUrl: 'https://stripe.com/atlas',
  },
  {
    id: 'spendesk',
    name: 'Spendesk',
    description: 'Smart spending for modern startups.',
    badge: 'new',
    category: 'saas-tools',
    logo: 'https://www.google.com/s2/favicons?domain=spendesk.com&sz=128',
    domain: 'spendesk.com',
    price: '$0',
    priceUnit: 'Setup Fee',
    originalPrice: '$199',
    discount: '100% OFF',
    discountColor: 'red',
    durationHours: 63.01,
    dealUrl: 'https://www.spendesk.com',
  },
  {
    id: 'webflow',
    name: 'Webflow',
    description: 'Build stunning websites without code.',
    badge: 'recommended',
    category: 'design',
    logo: 'https://cdn.simpleicons.org/webflow/146EF5',
    domain: 'webflow.com',
    price: '$12',
    priceUnit: '/ month',
    originalPrice: '$18',
    discount: '30% OFF',
    discountColor: 'violet',
    durationHours: 28.98,
    dealUrl: 'https://webflow.com',
  },
]
