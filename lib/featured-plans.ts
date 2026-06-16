// Single source of truth for Featured Listing plans.
//
// Two one-time options:
//   weekly  → 7-day featured window  (~$25 intro price)
//   monthly → 30-day featured window ($99)
//
// Pricing note: the weekly Dodo product is configured at a $99 base with a 75%
// discount → ~$24.75 charged pre-tax. `amountCents` records the real charged
// (pre-tax) amount so reporting stays accurate.

export type FeaturedPlan = 'weekly' | 'monthly'

export interface FeaturedPlanConfig {
  plan: FeaturedPlan
  label: string
  durationDays: number
  amountCents: number
  // Env var holding the Dodo product id, with a hardcoded fallback.
  productEnv: string
  fallbackProductId: string
}

export const FEATURED_PLANS: Record<FeaturedPlan, FeaturedPlanConfig> = {
  weekly: {
    plan: 'weekly',
    label: '1 Week',
    durationDays: 7,
    amountCents: 2475,
    productEnv: 'DODO_PRODUCT_FEATURED_WEEKLY',
    fallbackProductId: 'pdt_0Nh4NiRRXAB8UAM7RcSZm',
  },
  monthly: {
    plan: 'monthly',
    label: '30 Days',
    durationDays: 30,
    amountCents: 9900,
    productEnv: 'DODO_PRODUCT_FEATURED_LISTING',
    fallbackProductId: 'pdt_0NfKKpeNPl8Np5GDyluVq',
  },
}

export function normalizeFeaturedPlan(value: unknown): FeaturedPlan {
  return value === 'weekly' ? 'weekly' : 'monthly'
}

export function getFeaturedPlanConfig(value: unknown): FeaturedPlanConfig {
  return FEATURED_PLANS[normalizeFeaturedPlan(value)]
}

export function resolveProductId(config: FeaturedPlanConfig): string {
  return process.env[config.productEnv] || config.fallbackProductId
}

// Reverse lookup: given a paid Dodo product id, find the matching plan config.
// Used by the webhook to derive the correct featured duration.
export function getPlanByProductId(productId: string | undefined | null): FeaturedPlanConfig | null {
  if (!productId) return null
  for (const cfg of Object.values(FEATURED_PLANS)) {
    if (resolveProductId(cfg) === productId) return cfg
  }
  return null
}
