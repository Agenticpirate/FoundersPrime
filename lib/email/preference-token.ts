import { createHmac, randomBytes } from 'crypto'
import { safeSecretEqual } from '@/lib/auth/secret-compare'

/**
 * Signed, login-free tokens for email preference and unsubscribe links.
 *
 * A recipient clicking "unsubscribe" in an email cannot be asked to log in
 * first — that is both hostile and, for one-click unsubscribe (RFC 8058),
 * non-compliant. So the link carries a token that proves the URL was issued by
 * us for that specific user.
 *
 * Token format: base64url(payload) + "." + base64url(hmacSha256(payload))
 * Payload:      "<version>:<userId>:<issuedAtSeconds>"
 *
 * The token identifies a user and nothing else. It grants no session and no
 * ability to read account data — only to view and change email preferences.
 */

const TOKEN_VERSION = 'v1'

/** Links stay valid for a year, so an unsubscribe in an old email still works. */
const MAX_TOKEN_AGE_SECONDS = 365 * 24 * 60 * 60

function tokenSecret(): string | null {
  const dedicated = process.env.EMAIL_TOKEN_SECRET?.trim()
  if (dedicated) return dedicated

  // Fall back to the service role key so preference links work without extra
  // configuration. Only ever used as HMAC key material; never transmitted.
  const fallback = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  return fallback || null
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

function fromBase64url(value: string): string {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/')
  return Buffer.from(padded, 'base64').toString('utf8')
}

function sign(payload: string, secret: string): string {
  return base64url(createHmac('sha256', secret).update(payload).digest())
}

/**
 * Create a preference token for a user. Returns null when no secret is
 * configured, so callers can degrade to a login-required link instead of
 * emailing an unverifiable one.
 */
export function createPreferenceToken(userId: string): string | null {
  const secret = tokenSecret()
  if (!secret || !userId) return null

  const payload = `${TOKEN_VERSION}:${userId}:${Math.floor(Date.now() / 1000)}`
  return `${base64url(payload)}.${sign(payload, secret)}`
}

export type PreferenceTokenResult =
  | { valid: true; userId: string; issuedAt: Date }
  | { valid: false; reason: string }

/** Verify a token and recover the user it was issued for. */
export function verifyPreferenceToken(token: string | null | undefined): PreferenceTokenResult {
  const secret = tokenSecret()
  if (!secret) return { valid: false, reason: 'Preference links are not configured' }
  if (!token || typeof token !== 'string') return { valid: false, reason: 'Missing token' }

  const parts = token.split('.')
  if (parts.length !== 2) return { valid: false, reason: 'Malformed token' }

  const [encodedPayload, providedSignature] = parts

  let payload: string
  try {
    payload = fromBase64url(encodedPayload)
  } catch {
    return { valid: false, reason: 'Malformed token' }
  }

  // Constant-time comparison so a signature cannot be discovered by timing.
  if (!safeSecretEqual(providedSignature, sign(payload, secret))) {
    return { valid: false, reason: 'Invalid token signature' }
  }

  const [version, userId, issuedAtRaw] = payload.split(':')
  if (version !== TOKEN_VERSION) return { valid: false, reason: 'Unsupported token version' }
  if (!userId) return { valid: false, reason: 'Token is missing a user reference' }

  const issuedAtSeconds = Number(issuedAtRaw)
  if (!Number.isFinite(issuedAtSeconds)) {
    return { valid: false, reason: 'Token is missing an issue time' }
  }

  const ageSeconds = Math.floor(Date.now() / 1000) - issuedAtSeconds
  if (ageSeconds > MAX_TOKEN_AGE_SECONDS) {
    return { valid: false, reason: 'This link has expired' }
  }
  // Small negative tolerance for clock skew between issuing and verifying hosts.
  if (ageSeconds < -300) {
    return { valid: false, reason: 'Token issue time is in the future' }
  }

  return { valid: true, userId, issuedAt: new Date(issuedAtSeconds * 1000) }
}

/** Generate a value suitable for EMAIL_TOKEN_SECRET. */
export function generateTokenSecret(): string {
  return randomBytes(32).toString('hex')
}
