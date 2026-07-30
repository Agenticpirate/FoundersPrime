import type { MembershipPlan } from '@/lib/lifecycle-emails'

/**
 * Canonical Dodo product configuration shared by checkout and webhook handling.
 * Keeping this in one server-only module prevents a product from being sold
 * under one plan and activated under another.
 */
export const MEMBERSHIP_PRODUCTS: Readonly<Record<MembershipPlan, string>> = Object.freeze({
  nextfounder:
    process.env.DODO_PRODUCT_NEXTFOUNDER_YEARLY ||
    'pdt_0NYGgiPYXbfSQSTu2YZVA',
  founder:
    process.env.DODO_PRODUCT_FOUNDER_YEARLY ||
    'pdt_0NYGhiHbaHo141y9EXBl7',
  legend:
    process.env.DODO_PRODUCT_LEGEND_LIFETIME ||
    'pdt_0NYGi3cj7tCz581sqfnWw',
})

export const PRODUCT_TO_MEMBERSHIP_PLAN: Readonly<Record<string, MembershipPlan>> =
  Object.freeze({
    [MEMBERSHIP_PRODUCTS.nextfounder]: 'nextfounder',
    [MEMBERSHIP_PRODUCTS.founder]: 'founder',
    [MEMBERSHIP_PRODUCTS.legend]: 'legend',
  })

export function isMembershipPlan(value: unknown): value is MembershipPlan {
  return value === 'nextfounder' || value === 'founder' || value === 'legend'
}

export function resolveMembershipPlan(
  productId?: string | null,
  metadataPlan?: unknown
): MembershipPlan | undefined {
  return (
    (productId ? PRODUCT_TO_MEMBERSHIP_PLAN[productId] : undefined) ||
    (isMembershipPlan(metadataPlan) ? metadataPlan : undefined)
  )
}
