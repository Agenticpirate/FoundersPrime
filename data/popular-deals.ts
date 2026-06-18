/**
 * Popular deals shown in the compact homepage grid (right after the hero).
 *
 * ─── HOW TO ADD A DEAL ───────────────────────────────────────────────
 * Add an object to the `popularDeals` array below. Only `value` and
 * `description` are required. The logo is resolved in this order:
 *   1. `logo`   — a direct image URL (best: a clean square/wordmark PNG/SVG)
 *   2. `domain` — we auto-pull the brand logo/favicon from this domain
 *   3. initials — automatic fallback if both above fail
 *
 * Every "Get this deal" button links to the pricing page.
 * `badge` is optional: 'new' shows a NEW tag, 'hot' shows a 🔥 flame.
 * ─────────────────────────────────────────────────────────────────────
 */
export interface PopularDeal {
  /** Brand / provider name (used for alt text + initials fallback). */
  name: string
  /** The headline benefit, e.g. '$1,000 in credits' or '12 months free'. */
  value: string
  /** One-line description of what they offer. */
  description: string
  /** Optional direct logo image URL. Takes priority over `domain`. */
  logo?: string
  /** Brand domain for the auto logo fallback, e.g. 'mongodb.com'. */
  domain?: string
  /** Optional corner badge. */
  badge?: 'new' | 'hot'
}

// 18 deals → exactly three rows of six on desktop.
export const popularDeals: PopularDeal[] = [
  { name: 'Airtable', value: '$1,000 in credits', description: 'No-code database for CRMs, trackers & workflows', domain: 'airtable.com', badge: 'hot' },
  { name: 'Linear', value: 'Free for 1 year', description: 'Modern issue tracking & project management', domain: 'linear.app', badge: 'hot' },
  { name: 'Webflow', value: '100% off CMS plan · 12 months', description: 'Visual website builder with CMS & hosting', domain: 'webflow.com', badge: 'hot' },
  { name: 'Auth0', value: '12 months free', description: 'Authentication, SSO & identity management', domain: 'auth0.com', badge: 'new' },
  { name: 'Datadog', value: 'Up to $100,000 in credits', description: 'Monitoring, APM, logs & security platform', domain: 'datadoghq.com', badge: 'hot' },
  { name: 'DevRev', value: '$10,000 in credits', description: 'AI platform unifying support & product dev', domain: 'devrev.ai' },
  { name: 'Framer', value: 'Up to $900 in credits', description: 'No-code web builder for stunning sites', domain: 'framer.com', badge: 'new' },
  { name: 'Instatus', value: '1 year free Pro plan', description: 'Beautiful status pages in seconds', domain: 'instatus.com' },
  { name: 'Make', value: 'Up to $1,100 in credits', description: 'AI no-code workflow automation', domain: 'make.com', badge: 'hot' },
  { name: 'Mercury', value: 'Exclusive cash bonus', description: 'Digital-first banking & treasury tools', domain: 'mercury.com', badge: 'new' },
  { name: 'Mixpanel', value: '1 year free · up to 1B events', description: 'Product analytics & session replay', domain: 'mixpanel.com', badge: 'hot' },
  { name: 'MongoDB', value: 'Up to $5,000+ in Atlas credits', description: 'The developer data platform', domain: 'mongodb.com', badge: 'hot' },
  { name: 'Netcore Cloud', value: '$30,000 in credits', description: 'AI omnichannel marketing platform', domain: 'netcorecloud.com' },
  { name: 'OVHcloud', value: '€10,000 in cloud credits', description: 'European cloud with data sovereignty', domain: 'ovhcloud.com', badge: 'hot' },
  { name: 'Perplexity AI', value: '$5,000+ in credits', description: 'AI answer engine with real-time search', domain: 'perplexity.ai', badge: 'hot' },
  { name: 'PostHog', value: '$50,000 in credits', description: 'Analytics, replays & feature flags', domain: 'posthog.com', badge: 'hot' },
  { name: 'Scalingo', value: '€1,800 in hosting credits', description: 'GDPR-compliant EU PaaS hosting', domain: 'scalingo.com' },
  { name: 'Sentry', value: 'Up to $5,000 in credits', description: 'Error monitoring & performance tracking', domain: 'sentry.io', badge: 'hot' },
]
