/**
 * Cloudflare-Aware Client IP Extraction
 *
 * Trust order (highest to lowest):
 *   1. CF-Connecting-IP  — set by Cloudflare, always the real visitor IP
 *   2. X-Real-IP         — set by some reverse proxies (nginx, etc.)
 *   3. X-Forwarded-For   — first value only (leftmost = original client)
 *   4. 'unknown'         — fallback, never throw
 *
 * Security note: In production, Cloudflare strips any user-supplied
 * CF-Connecting-IP header before forwarding, so this value is always
 * authoritative when behind Cloudflare. Do NOT use this logic on an
 * origin server exposed directly to the internet without Cloudflare.
 */
export function getClientIp(
  request: Request | { headers: { get(name: string): string | null } }
): string {
  const headers = request.headers

  // Cloudflare always sets this to the real visitor IP
  const cf = headers.get('cf-connecting-ip')
  if (cf && cf.trim()) return cf.trim()

  // Nginx / other proxies
  const realIp = headers.get('x-real-ip')
  if (realIp && realIp.trim()) return realIp.trim()

  // Standard forwarded-for — take only the leftmost (original client)
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0].trim()
    if (first) return first
  }

  return 'unknown'
}
