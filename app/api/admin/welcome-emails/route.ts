import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { verifyAdminServer as verifyAdmin } from '@/lib/admin/verify-admin-server'
import {
  sendWelcomeEmail,
  WELCOME_EMAIL_MARKERS,
  type MembershipPlan,
} from '@/lib/lifecycle-emails'

/**
 * Admin-only welcome-email backfill.
 *
 * The Dodo webhook is the normal sender. When email delivery was not configured
 * at purchase time the webhook parks the subscriber with a pending marker and
 * never retries, so those customers never receive anything. This route replays
 * the same email for active paid subscribers that carry no "sent" marker.
 *
 * GET  — dry run. Reports who would be emailed. Sends nothing.
 * POST — sends, requires an explicit { "confirm": true } body.
 *
 * Delivery reuses sendWelcomeEmail so the template and the provider
 * Idempotency-Key are identical to the webhook path. A subscriber who somehow
 * already received the email cannot be mailed twice: the sent marker excludes
 * them here, and the shared idempotency key protects the provider call.
 */

const MEMBERSHIP_PLANS: MembershipPlan[] = ['nextfounder', 'founder', 'legend']

/** Spacing between sends, kept under Resend's default request rate limit. */
const SEND_INTERVAL_MS = 600

function getServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createServiceClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

/** Never echo full subscriber addresses in an admin API response. */
function maskEmail(email: string | null | undefined): string {
  const [user, domain] = String(email || '').split('@')
  if (!domain) return '(no email)'
  return `${user.slice(0, 3)}***@${domain}`
}

function firstNameFromMetadata(metadata: Record<string, unknown>): string | null {
  const value = metadata.full_name || metadata.name || metadata.display_name
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

interface Candidate {
  userId: string
  email: string
  maskedEmail: string
  plan: MembershipPlan
  firstName: string | null
  appMetadata: Record<string, unknown>
  previousState: 'pending' | 'failed' | 'never_attempted'
}

async function collectCandidates(
  supabase: NonNullable<ReturnType<typeof getServiceRoleClient>>
): Promise<{ candidates: Candidate[]; skipped: Array<{ maskedEmail: string; reason: string }> }> {
  const { data: subs, error: subsError } = await supabase
    .from('user_subscriptions')
    .select('user_id, plan, status')
    .eq('status', 'active')

  if (subsError) {
    throw new Error(`Active subscription lookup failed: ${subsError.message}`)
  }

  const users = []
  for (let page = 1; page <= 50; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 200 })
    if (error) throw new Error(`User listing failed: ${error.message}`)
    users.push(...data.users)
    if (data.users.length < 200) break
  }
  const userById = new Map(users.map((u) => [u.id, u]))

  const candidates: Candidate[] = []
  const skipped: Array<{ maskedEmail: string; reason: string }> = []

  for (const sub of subs || []) {
    const user = userById.get(String(sub.user_id))
    if (!user) {
      skipped.push({ maskedEmail: '(unknown user)', reason: 'No matching auth user' })
      continue
    }

    const masked = maskEmail(user.email)
    const appMetadata = (user.app_metadata || {}) as Record<string, unknown>

    if (!user.email) {
      skipped.push({ maskedEmail: masked, reason: 'No email address on account' })
      continue
    }
    if (!user.email_confirmed_at && !user.confirmed_at) {
      skipped.push({ maskedEmail: masked, reason: 'Email address is not confirmed' })
      continue
    }
    if (appMetadata[WELCOME_EMAIL_MARKERS.sentAt]) {
      skipped.push({ maskedEmail: masked, reason: 'Welcome email already sent' })
      continue
    }
    if (!MEMBERSHIP_PLANS.includes(sub.plan as MembershipPlan)) {
      skipped.push({ maskedEmail: masked, reason: `Unsupported plan "${sub.plan}"` })
      continue
    }

    candidates.push({
      userId: user.id,
      email: user.email,
      maskedEmail: masked,
      plan: sub.plan as MembershipPlan,
      firstName: firstNameFromMetadata((user.user_metadata || {}) as Record<string, unknown>),
      appMetadata,
      previousState: appMetadata[WELCOME_EMAIL_MARKERS.pendingAt]
        ? 'pending'
        : appMetadata[WELCOME_EMAIL_MARKERS.failedAt]
          ? 'failed'
          : 'never_attempted',
    })
  }

  return { candidates, skipped }
}

export async function GET() {
  try {
    const auth = await verifyAdmin()
    if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })

    const supabase = getServiceRoleClient()
    if (!supabase) {
      return NextResponse.json(
        { error: 'Service role is not configured on this deployment.' },
        { status: 500 }
      )
    }

    const { candidates, skipped } = await collectCandidates(supabase)

    return NextResponse.json({
      dryRun: true,
      emailProviderConfigured: Boolean(process.env.RESEND_API_KEY),
      pendingCount: candidates.length,
      pending: candidates.map((c) => ({
        email: c.maskedEmail,
        plan: c.plan,
        previousState: c.previousState,
      })),
      skipped,
    })
  } catch (error) {
    console.error('Welcome email dry run failed:', error)
    return NextResponse.json({ error: 'Could not build the welcome email report.' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await verifyAdmin()
    if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })

    let confirmed = false
    let limit = 0
    try {
      const body = await req.json()
      confirmed = body?.confirm === true
      limit = Number.isInteger(body?.limit) && body.limit > 0 ? body.limit : 0
    } catch {
      // Treated as an unconfirmed request below.
    }

    if (!confirmed) {
      return NextResponse.json(
        { error: 'Send { "confirm": true } to dispatch welcome emails. Use GET for a dry run.' },
        { status: 400 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email delivery is not configured on this deployment.' },
        { status: 500 }
      )
    }

    const supabase = getServiceRoleClient()
    if (!supabase) {
      return NextResponse.json(
        { error: 'Service role is not configured on this deployment.' },
        { status: 500 }
      )
    }

    const { candidates, skipped } = await collectCandidates(supabase)
    const queue = limit ? candidates.slice(0, limit) : candidates

    const results: Array<{ email: string; plan: string; result: string; detail?: string }> = []

    for (const [index, candidate] of queue.entries()) {
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, SEND_INTERVAL_MS))
      }

      const delivery = await sendWelcomeEmail({
        userId: candidate.userId,
        toEmail: candidate.email,
        firstName: candidate.firstName,
        plan: candidate.plan,
      })

      if (delivery.status !== 'sent') {
        const { error: markerError } = await supabase.auth.admin.updateUserById(candidate.userId, {
          app_metadata: {
            ...candidate.appMetadata,
            [WELCOME_EMAIL_MARKERS.failedAt]: new Date().toISOString(),
            [WELCOME_EMAIL_MARKERS.plan]: candidate.plan,
          },
        })
        if (markerError) {
          console.error(
            `Welcome email failure marker failed for user ${candidate.userId}: ${markerError.message}`
          )
        }
        results.push({
          email: candidate.maskedEmail,
          plan: candidate.plan,
          result: 'failed',
          detail: delivery.error,
        })
        continue
      }

      const { error: markerError } = await supabase.auth.admin.updateUserById(candidate.userId, {
        app_metadata: {
          ...candidate.appMetadata,
          [WELCOME_EMAIL_MARKERS.sentAt]: new Date().toISOString(),
          [WELCOME_EMAIL_MARKERS.plan]: candidate.plan,
          [WELCOME_EMAIL_MARKERS.pendingAt]: null,
          [WELCOME_EMAIL_MARKERS.failedAt]: null,
        },
      })

      if (markerError) {
        // The email did go out. Surface the bookkeeping failure loudly rather
        // than reporting clean success, because a missing marker would let a
        // later run email this subscriber a second time.
        console.error(
          `Welcome email sent but marker failed for user ${candidate.userId}: ${markerError.message}`
        )
        results.push({
          email: candidate.maskedEmail,
          plan: candidate.plan,
          result: 'sent_marker_failed',
          detail: 'Email delivered but the sent marker could not be recorded.',
        })
        continue
      }

      results.push({ email: candidate.maskedEmail, plan: candidate.plan, result: 'sent' })
    }

    const counts = results.reduce<Record<string, number>>((acc, r) => {
      acc[r.result] = (acc[r.result] || 0) + 1
      return acc
    }, {})

    console.log(
      `Welcome email backfill by ${auth.email}: ${JSON.stringify(counts)} across ${queue.length} recipient(s)`
    )

    return NextResponse.json({
      dryRun: false,
      attempted: queue.length,
      counts,
      results,
      skipped,
    })
  } catch (error) {
    console.error('Welcome email backfill failed:', error)
    return NextResponse.json({ error: 'The welcome email backfill did not complete.' }, { status: 500 })
  }
}
