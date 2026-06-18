import { timingSafeEqual } from 'crypto'

/**
 * Constant-time comparison of two secrets to avoid timing side-channels.
 * Returns false for empty/length-mismatched inputs without throwing.
 */
export function safeSecretEqual(a: string | undefined | null, b: string | undefined | null): boolean {
  if (!a || !b) return false
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

/**
 * Extract a Bearer token from an Authorization header.
 */
export function getBearerToken(authHeader: string | null): string | null {
  if (!authHeader) return null
  const match = /^Bearer\s+(.+)$/i.exec(authHeader.trim())
  return match ? match[1] : null
}
