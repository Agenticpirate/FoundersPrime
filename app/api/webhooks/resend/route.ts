import { NextRequest, NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'
import { recordSuppression, type SuppressionReason } from '@/lib/email/suppression'

/**
 * Resend delivery-event webhook.
 *
 * Mailbox providers judge senders on complaint and bounce rates, so those events
 * must be acted on rather than logged. A hard bounce or a spam complaint adds the
 * address to the suppression list, which every later send is checked against.
 *
 * Signature verification follows the Svix scheme Resend uses:
 *   signed content = "<svix-id>.<svix-timestamp>.<raw body>"
 *   signature      = base64( HMAC_SHA256(signed content, base64decode(secret)) )
 * The svix-signature header may carry several space-separated versioned values.
 */

/** Reject events older than this to blunt replay attempts. */
const MAX_EVENT_AGE_SECONDS = 5 * 60

/** Resend event name to suppression reason. Soft bounces are recorded, not blocking. */
const SUPPRESSING_EVENTS: Record<string, SuppressionReason> = {
  'email.bounced': 'hard_bounce',
  'email.complained': 'complaint',
  'email.suppressed': 'provider',
}

function verifySignature(
  rawBody: string,
  headers: { id: string | null; timestamp: string | null; signature: string | null },
  secret: string
): { valid: boolean; reason?: string } {
  const { id, timestamp, signature } = headers
  if (!id || !timestamp || !signature) return { valid: false, reason: 'missing signature headers' }

  const eventTime = Number(timestamp)
  if (!Number.isFinite(eventTime)) return { valid: false, reason: 'invalid timestamp' }
  if (Math.abs(Date.now() / 1000 - eventTime) > MAX_EVENT_AGE_SECONDS) {
    return { valid: false, reason: 'timestamp outside tolerance' }
  }

  // Secrets are provided as "whsec_<base64>"; the HMAC key is the decoded part.
  const secretBody = secret.startsWith('whsec_') ? secret.slice('whsec_'.length) : secret
  let key: Buffer
  try {
    key = Buffer.from(secretBody, 'base64')
  } catch {
    return { valid: false, reason: 'malformed signing secret' }
  }

  const expected = createHmac('sha256', key)
    .update(`${id}.${timestamp}.${rawBody}`)
    .digest('base64')
  const expectedBuf = Buffer.from(expected)

  // Header format: "v1,<sig> v1,<sig2>" — accept if any version matches.
  for (const entry of signature.split(' ')) {
    const value = entry.includes(',') ? entry.split(',')[1] : entry
    const candidate = Buffer.from(value)
    if (candidate.length === expectedBuf.length && timingSafeEqual(candidate, expectedBuf)) {
      return { valid: true }
    }
  }

  return { valid: false, reason: 'no matching signature' }
}

export async function POST(req: NextRequest) {
  const secret = process.env.RESEND_WEBHOOK_SECRET?.trim()
  if (!secret) {
    // Fail closed: an unverified endpoint must not be allowed to write
    // suppressions, since a forged complaint could block a real customer.
    console.error('Resend webhook rejected: RESEND_WEBHOOK_SECRET is not configured')
    return NextResponse.json({ error: 'Webhook is not configured' }, { status: 503 })
  }

  const rawBody = await req.text()
  const check = verifySignature(
    rawBody,
    {
      id: req.headers.get('svix-id'),
      timestamp: req.headers.get('svix-timestamp'),
      signature: req.headers.get('svix-signature'),
    },
    secret
  )

  if (!check.valid) {
    console.warn(`Resend webhook signature rejected: ${check.reason}`)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let event: { type?: string; data?: Record<string, unknown> }
  try {
    event = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const type = String(event.type || '')
  const data = event.data || {}
  const recipients = Array.isArray(data.to)
    ? (data.to as string[])
    : typeof data.to === 'string'
      ? [data.to]
      : []

  const reason = SUPPRESSING_EVENTS[type]
  if (!reason) {
    // Delivered / opened / clicked etc. Acknowledge so Resend stops retrying.
    return NextResponse.json({ received: true, action: 'ignored', type })
  }

  const bounce = (data.bounce || {}) as { type?: string; subType?: string; message?: string }
  // A soft bounce is transient; recording it as permanent would discard a
  // deliverable address after one temporary failure.
  const effectiveReason: SuppressionReason =
    type === 'email.bounced' && String(bounce.type || '').toLowerCase() === 'transient'
      ? 'soft_bounce'
      : reason

  const detail =
    bounce.message ||
    (typeof data.reason === 'string' ? data.reason : null) ||
    `${type}${bounce.subType ? ` (${bounce.subType})` : ''}`

  const results: { email: string; ok: boolean; error?: string }[] = []
  for (const email of recipients) {
    const outcome = await recordSuppression({
      email,
      reason: effectiveReason,
      detail,
      source: 'resend_webhook',
    })
    results.push({ email, ...outcome })
    if (!outcome.ok) {
      console.error(`Suppression write failed for ${email}: ${outcome.error}`)
    }
  }

  console.log(
    `Resend ${type} recorded as ${effectiveReason} for ${results.length} recipient(s)`
  )

  return NextResponse.json({
    received: true,
    type,
    reason: effectiveReason,
    recorded: results.filter((r) => r.ok).length,
  })
}
