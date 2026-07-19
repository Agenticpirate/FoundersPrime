/**
 * Schema.org `hasMerchantReturnPolicy` helper.
 *
 * Google Search Console flags Product+Offer schemas missing this field
 * as a non-critical warning (Merchant Listings issue).
 *
 * Our deal pages list external partner programs (AWS, GCP, etc.) where
 * users sign up directly with the provider — no transaction occurs
 * through FoundersPrime, so returns don't apply. We declare
 * `MerchantReturnNotPermitted` to satisfy the structured-data checker
 * without misrepresenting our refund policy.
 *
 * For SaaS subscription products (FoundersPrime Founder/Legend plans),
 * returns are also non-refundable per our terms — same value applies.
 */
export const merchantReturnPolicy = {
  '@type': 'MerchantReturnPolicy',
  applicableCountry: 'US',
  returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
} as const

/**
 * Convenience builder for the full Offer block with the policy attached.
 */
function buildOfferWithReturnPolicy(offer: Record<string, unknown>) {
  return {
    ...offer,
    hasMerchantReturnPolicy: merchantReturnPolicy,
  }
}
