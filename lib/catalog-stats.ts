/**
 * Single source of truth for catalog volume used in marketing copy.
 *
 * Every number below was counted from the live data sources, so any claim made
 * in an email, popup or landing page can be defended:
 *
 *   founderDeals  public/data/all-deals.json                        242
 *     saasDeals     category=saas-discounts                         203
 *     cloudDeals    category=cloud-credits                           22
 *     adDeals       category=ad-credits                              14
 *   accelerators  data/accelerators-2026.ts                         146
 *   incubators    data/incubators-2026.ts                            25
 *   grants        data/grants-2026.ts                                88
 *   studentPerks  data/student-benefits-2026.ts (active only)      1,025
 *   flashDeals    data/flash-deals.ts                                 8
 *   ideas         data/startup_ideas.json                           223
 *
 * The counts are literals rather than imports on purpose: importing the data
 * would pull the 21k-line student dataset into every serverless bundle that
 * renders an email. Re-run `node scripts/count-catalog.mjs` after catalog
 * changes and update these values.
 */
export const CATALOG = {
  founderDeals: 242,
  saasDeals: 203,
  cloudDeals: 22,
  adDeals: 14,
  accelerators: 146,
  incubators: 25,
  grants: 88,
  studentPerks: 1025,
  flashDeals: 8,
  ideas: 223,
} as const

/** Accelerators + incubators + grants — everything under /programs. */
export const PROGRAMS_TOTAL =
  CATALOG.accelerators + CATALOG.incubators + CATALOG.grants

/**
 * Everything a member can claim: commercial deals, programs and student perks.
 * Flash deals are excluded because they are a rotating subset, not new stock.
 */
export const OFFERS_TOTAL =
  CATALOG.founderDeals + PROGRAMS_TOTAL + CATALOG.studentPerks

/**
 * Rounded-down display strings. Rounding down keeps the claim true as the
 * catalog grows and avoids the "suspiciously exact" feel of a raw count in a
 * headline. Exact figures are used in body copy where precision builds trust.
 */
export const CATALOG_COPY = {
  offersTotal: '1,500+',
  founderDeals: '240+',
  programs: '250+',
  studentPerks: '1,000+',
  saasTools: '200+',
  ideas: '220+',
  /** Total credit value a single founder can stack across the catalog. */
  valuePerFounder: '$500K+',
  /** Claimed to date, mirrored from the homepage savings counter. */
  claimedToDate: '$3M+',
  /** Typical realised saving in year one, used in offer headlines. */
  typicalSaving: '$10,000+',
} as const
