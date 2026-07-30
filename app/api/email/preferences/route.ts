import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { verifyPreferenceToken } from '@/lib/email/preference-token'
import {
  CATEGORY_COPY,
  EMAIL_CATEGORIES,
  readPreferences,
  unsubscribeAll,
  writePreferences,
  type EmailCategory,
  type PreferenceUpdate,
} from '@/lib/email/preference-store'
import { authLimiter, rateLimitHeaders } from '@/lib/security/rate-limit'
import { getClientIp } from '@/lib/security/ip'

/**
 * Email preference centre API.
 *
 * Identity is resolved one of two ways:
 *   1. A signed token from an email link — no login required, which is what
 *      makes unsubscribe usable and RFC 8058 compliant.
 *   2. An authenticated Supabase session — used by the dashboard panel.
 *
 * A token only ever identifies the user it was issued for. It cannot be used to
 * read account data, and the user ID is never taken from request input.
 */

interface ResolvedIdentity {
  userId: string
  via: 'token' | 'session'
  /**
   * Present for session requests. Reads and writes then run as the user, so the
   * RLS policies enforce ownership instead of relying on the service role.
   */
  client?: ReturnType<typeof createClient> | null
}

async function resolveIdentity(
  req: NextRequest,
  tokenFromBody?: string | null
): Promise<{ identity: ResolvedIdentity | null; error?: string; status?: number }> {
  const token = tokenFromBody ?? req.nextUrl.searchParams.get('token')

  if (token) {
    const result = verifyPreferenceToken(token)
    if (!result.valid) {
      return { identity: null, error: result.reason, status: 400 }
    }
    // Token requests have no session, so they must use the service role.
    return { identity: { userId: result.userId, via: 'token', client: null } }
  }

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      identity: null,
      error: 'Open the link from your email, or sign in to manage preferences.',
      status: 401,
    }
  }

  return { identity: { userId: user.id, via: 'session', client: supabase } }
}

function categoryList() {
  return EMAIL_CATEGORIES.map((key) => ({
    key,
    label: CATEGORY_COPY[key].label,
    description: CATEGORY_COPY[key].description,
  }))
}

export async function GET(req: NextRequest) {
  const limit = authLimiter(`email-prefs-get:${getClientIp(req)}`)
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again shortly.' },
      { status: 429, headers: rateLimitHeaders(limit) }
    )
  }

  const { identity, error, status } = await resolveIdentity(req)
  if (!identity) return NextResponse.json({ error }, { status: status || 401 })

  try {
    const { preferences, available } = await readPreferences(identity.userId, identity.client)
    return NextResponse.json({
      preferences,
      categories: categoryList(),
      storageAvailable: available,
      identifiedVia: identity.via,
    })
  } catch (e) {
    console.error('Email preference read failed:', e)
    return NextResponse.json({ error: 'Could not load your email preferences.' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const limit = authLimiter(`email-prefs-post:${getClientIp(req)}`)
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again shortly.' },
      { status: 429, headers: rateLimitHeaders(limit) }
    )
  }

  let body: Record<string, unknown> = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Expected a JSON body.' }, { status: 400 })
  }

  const { identity, error, status } = await resolveIdentity(
    req,
    typeof body.token === 'string' ? body.token : null
  )
  if (!identity) return NextResponse.json({ error }, { status: status || 401 })

  try {
    // Unsubscribe-from-all is an explicit action rather than three false values,
    // so the intent is unambiguous in logs and in the response.
    if (body.unsubscribeAll === true) {
      const preferences = await unsubscribeAll(identity.userId, identity.client)
      return NextResponse.json({
        success: true,
        unsubscribedAll: true,
        preferences,
        categories: categoryList(),
      })
    }

    const rawPreferences = body.preferences
    if (!rawPreferences || typeof rawPreferences !== 'object') {
      return NextResponse.json(
        { error: 'Provide a "preferences" object or set "unsubscribeAll": true.' },
        { status: 400 }
      )
    }

    // Accept only known categories with boolean values; ignore anything else.
    const update: PreferenceUpdate = {}
    let recognized = 0
    for (const key of EMAIL_CATEGORIES) {
      const value = (rawPreferences as Record<string, unknown>)[key]
      if (typeof value === 'boolean') {
        update[key as EmailCategory] = value
        recognized++
      }
    }

    if (recognized === 0) {
      return NextResponse.json(
        { error: `Provide at least one of: ${EMAIL_CATEGORIES.join(', ')}.` },
        { status: 400 }
      )
    }

    const preferences = await writePreferences(identity.userId, update, identity.client)
    return NextResponse.json({
      success: true,
      preferences,
      categories: categoryList(),
    })
  } catch (e) {
    console.error('Email preference write failed:', e)
    return NextResponse.json({ error: 'Could not save your email preferences.' }, { status: 500 })
  }
}
