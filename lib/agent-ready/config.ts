/**
 * Agent-readiness constants for isitagentready.com / AI crawler discovery.
 * Base URL prefers production; local dev still serves the same discovery docs.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') ||
  'https://www.foundersprime.com'

export const SITE_NAME = 'FoundersPrime'
export const SITE_DESCRIPTION =
  'Verified startup deals, cloud credits, SaaS discounts, non-dilutive grants, accelerators, and founder programs.'

/** RFC 8288 Link header value for homepage / global discovery */
export function discoveryLinkHeader(baseUrl: string = SITE_URL): string {
  return [
    `<${baseUrl}/.well-known/api-catalog>; rel="api-catalog"`,
    `<${baseUrl}/.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"`,
    `<${baseUrl}/.well-known/agent-card.json>; rel="describedby"; type="application/json"`,
    `<${baseUrl}/.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"`,
    `<${baseUrl}/llms.txt>; rel="describedby"; type="text/plain"`,
    `<${baseUrl}/llms-full.txt>; rel="alternate"; type="text/plain"`,
    `<${baseUrl}/sitemap.xml>; rel="sitemap"; type="application/xml"`,
    `<${baseUrl}/auth.md>; rel="service-doc"; type="text/markdown"`,
  ].join(', ')
}

export const CORS_JSON_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Cache-Control': 'public, max-age=3600',
} as const
