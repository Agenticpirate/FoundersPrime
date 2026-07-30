import { NextRequest, NextResponse } from 'next/server'
import { verifyPreferenceToken } from '@/lib/email/preference-token'
import { unsubscribeAll } from '@/lib/email/preference-store'
import { authLimiter, rateLimitHeaders } from '@/lib/security/rate-limit'
import { getClientIp } from '@/lib/security/ip'

/**
 * RFC 8058 one-click unsubscribe endpoint.
 *
 * Gmail and Yahoo POST here directly, with no session and no user interaction,
 * when the recipient uses the mailbox client's native unsubscribe control. The
 * body arrives as `List-Unsubscribe=One-Click` in form encoding, so this route
 * must not require JSON and must not redirect.
 *
 * Authorisation is the signed token in the URL, which is why the token is
 * per-recipient and HMAC-verified.
 */

export async function POST(req: NextRequest) {
  const limit = authLimiter(`email-unsub:${getClientIp(req)}`)
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests.' },
      { status: 429, headers: rateLimitHeaders(limit) }
    )
  }

  const token = req.nextUrl.searchParams.get('token')
  const result = verifyPreferenceToken(token)

  if (!result.valid) {
    // Do not reveal whether the token was malformed, forged or expired.
    console.warn(`One-click unsubscribe rejected: ${result.reason}`)
    return NextResponse.json({ error: 'This unsubscribe link is not valid.' }, { status: 400 })
  }

  try {
    await unsubscribeAll(result.userId)
    console.log(`One-click unsubscribe applied for user ${result.userId}`)
    // Providers expect a plain 200. No body is required.
    return NextResponse.json({ success: true, unsubscribed: true })
  } catch (e) {
    console.error('One-click unsubscribe failed:', e)
    return NextResponse.json(
      { error: 'Could not process the unsubscribe request.' },
      { status: 500 }
    )
  }
}

/**
 * Some clients probe the List-Unsubscribe URL with GET. Send those to the
 * preference page rather than unsubscribing, so a link preview or security
 * scanner cannot silently opt someone out.
 */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  const destination = new URL('/email-preferences', req.nextUrl.origin)
  if (token) {
    destination.searchParams.set('token', token)
    destination.searchParams.set('action', 'unsubscribe')
  }
  return NextResponse.redirect(destination)
}
