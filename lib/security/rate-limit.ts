/**
 * Production Rate Limiter — Sliding Window with LRU Cache
 *
 * Uses the `lru-cache` package (already a project dependency) to implement
 * a sliding window rate limiter with automatic TTL-based eviction.
 *
 * Architecture note:
 *   In Vercel's serverless model each function invocation is a separate
 *   Node.js process. This store is per-instance, not distributed. For
 *   the majority of abuse scenarios (brute force, spam, API scraping)
 *   this is sufficient because:
 *   a) Cloudflare handles volumetric DDoS before requests reach the origin
 *   b) Single-instance limits are still effective against most bots
 *   c) Zero external dependencies (no Redis/Upstash needed)
 *
 *   For truly distributed rate limiting, replace the LRUCache below with
 *   an Upstash Redis client. The public API of this module would not change.
 *
 * All limits are configurable via environment variables. Defaults are
 * conservative and suitable for a production SaaS.
 */

import { LRUCache } from 'lru-cache'

// ─── Configuration (from env vars with safe defaults) ────────────────────────

function envInt(key: string, fallback: number): number {
  const v = process.env[key]
  if (!v) return fallback
  const n = parseInt(v, 10)
  return Number.isFinite(n) && n > 0 ? n : fallback
}

export const RATE_LIMIT_CONFIG = {
  // Global public API: 100 req / 60 seconds per IP
  publicWindowSec: envInt('RATE_LIMIT_WINDOW', 60),
  publicMax: envInt('RATE_LIMIT_PUBLIC', 100),

  // Auth endpoints (login, refresh, session): 10 req / 60 seconds per IP
  authWindowSec: envInt('RATE_LIMIT_AUTH_WINDOW', 60),
  authMax: envInt('RATE_LIMIT_AUTH', 10),

  // Deal submission: 5 req / 3600 seconds per IP
  submitWindowSec: 3600,
  submitMax: envInt('RATE_LIMIT_SUBMIT', 5),

  // Billing/payment: 10 req / 300 seconds per user ID or IP
  billingWindowSec: 300,
  billingMax: envInt('RATE_LIMIT_BILLING', 10),
} as const

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RateLimitResult {
  allowed: boolean
  limit: number
  remaining: number
  /** Unix timestamp (seconds) when the window resets */
  resetAt: number
  /** Seconds to wait before retrying (only meaningful when allowed=false) */
  retryAfter: number
}

export interface RateLimiterConfig {
  /** Maximum number of requests allowed in the window */
  max: number
  /** Window duration in seconds */
  windowSec: number
}

// ─── Sliding Window Implementation ───────────────────────────────────────────

interface WindowRecord {
  /** Request timestamps (ms) within the current window */
  timestamps: number[]
  /** Window start (ms) — used for eviction */
  windowStart: number
}

/**
 * Create a new rate limiter instance.
 *
 * Each limiter maintains its own LRU store, so different rate limiters
 * (auth, submit, billing) don't share state.
 */
export function createRateLimiter(config: RateLimiterConfig) {
  const windowMs = config.windowSec * 1000

  // LRU cache keyed by identifier (IP / user ID).
  // TTL = window duration so idle entries are automatically evicted.
  const store = new LRUCache<string, WindowRecord>({
    max: 10_000,           // max 10k unique identifiers in memory
    ttl: windowMs,         // evict after one full window of inactivity
    ttlAutopurge: false,   // only evict on access (lighter CPU)
  })

  return function check(identifier: string): RateLimitResult {
    const now = Date.now()
    const windowStart = now - windowMs

    const record = store.get(identifier)

    // Sliding window: keep only timestamps within the current window
    const timestamps: number[] = record
      ? record.timestamps.filter((ts) => ts > windowStart)
      : []

    const count = timestamps.length

    if (count >= config.max) {
      // Find when the oldest request in the window will fall off
      const oldestInWindow = timestamps[0] ?? now
      const resetAt = Math.ceil((oldestInWindow + windowMs) / 1000)
      const retryAfter = Math.max(1, resetAt - Math.floor(now / 1000))

      // Update store with pruned list (don't add current request)
      store.set(identifier, { timestamps, windowStart: now })

      return {
        allowed: false,
        limit: config.max,
        remaining: 0,
        resetAt,
        retryAfter,
      }
    }

    // Allowed — record this request
    timestamps.push(now)
    store.set(identifier, { timestamps, windowStart: now })

    const resetAt = Math.ceil((now + windowMs) / 1000)

    return {
      allowed: true,
      limit: config.max,
      remaining: config.max - timestamps.length,
      resetAt,
      retryAfter: 0,
    }
  }
}

// ─── Pre-configured Limiters ─────────────────────────────────────────────────

/** Global public API limiter (IP-based, before auth) */
export const globalApiLimiter = createRateLimiter({
  max: RATE_LIMIT_CONFIG.publicMax,
  windowSec: RATE_LIMIT_CONFIG.publicWindowSec,
})

/** Auth endpoint limiter — login, session refresh, email verify */
export const authLimiter = createRateLimiter({
  max: RATE_LIMIT_CONFIG.authMax,
  windowSec: RATE_LIMIT_CONFIG.authWindowSec,
})

/** Deal submission limiter */
export const submitLimiter = createRateLimiter({
  max: RATE_LIMIT_CONFIG.submitMax,
  windowSec: RATE_LIMIT_CONFIG.submitWindowSec,
})

/** Billing / payment action limiter */
export const billingLimiter = createRateLimiter({
  max: RATE_LIMIT_CONFIG.billingMax,
  windowSec: RATE_LIMIT_CONFIG.billingWindowSec,
})

// ─── Response Helpers ─────────────────────────────────────────────────────────

/**
 * Build standard RateLimit-* response headers from a rate limit result.
 * Compatible with the IETF draft-ietf-httpapi-ratelimit-headers spec.
 */
export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  const headers: Record<string, string> = {
    'RateLimit-Limit': String(result.limit),
    'RateLimit-Remaining': String(result.remaining),
    'RateLimit-Reset': String(result.resetAt),
  }
  if (!result.allowed) {
    headers['Retry-After'] = String(result.retryAfter)
  }
  return headers
}

/**
 * Check a rate limiter and return a 429 NextResponse if exceeded,
 * or null if the request is allowed.
 *
 * Usage in an API route:
 *   const limited = applyRateLimit(authLimiter, clientIp)
 *   if (limited) return limited
 */
export function applyRateLimit(
  limiter: ReturnType<typeof createRateLimiter>,
  identifier: string,
  message = 'Too many requests. Please try again later.'
): import('next/server').NextResponse | null {
  const result = limiter(identifier)
  if (result.allowed) return null

  // Import inline to avoid circular dep issues and keep this module edge-safe
  const { NextResponse } = require('next/server')
  return NextResponse.json(
    { error: message },
    {
      status: 429,
      headers: rateLimitHeaders(result),
    }
  )
}
