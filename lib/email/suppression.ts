import { createClient as createServiceClient } from '@supabase/supabase-js'

/**
 * Suppression list checks.
 *
 * Google, Yahoo and Microsoft all gate inbox placement on complaint and bounce
 * rates, so an address that hard-bounced or complained must never be mailed
 * again. This module is consulted before every send.
 *
 * Failures here are deliberately non-fatal in one direction only: if the lookup
 * itself errors we allow the send (so a database blip cannot block a password
 * reset), but any positive suppression result always blocks.
 */

export type SuppressionReason =
  | 'hard_bounce'
  | 'soft_bounce'
  | 'complaint'
  | 'provider'
  | 'manual'

/** Reasons that permanently block sending. Soft bounces are advisory only. */
const BLOCKING_REASONS: SuppressionReason[] = ['hard_bounce', 'complaint', 'provider', 'manual']

function serviceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createServiceClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

function normalise(email: string): string {
  return email.trim().toLowerCase()
}

/** True when this address must not be emailed. */
export async function isSuppressed(email: string): Promise<boolean> {
  const supabase = serviceClient()
  if (!supabase || !email) return false

  const { data, error } = await supabase
    .from('email_suppressions')
    .select('reason')
    .eq('email', normalise(email))
    .maybeSingle()

  if (error) {
    // Missing table (pre-migration) or a transient failure must not stop
    // transactional mail; log and allow.
    console.warn(`Suppression lookup failed for ${normalise(email)}: ${error.message}`)
    return false
  }

  if (!data) return false
  return BLOCKING_REASONS.includes(data.reason as SuppressionReason)
}

/** Filter a recipient list down to addresses that may be mailed. */
export async function removeSuppressed(emails: string[]): Promise<string[]> {
  const supabase = serviceClient()
  if (!supabase || emails.length === 0) return emails

  const normalised = emails.map(normalise)
  const { data, error } = await supabase
    .from('email_suppressions')
    .select('email, reason')
    .in('email', normalised)

  if (error) {
    console.warn(`Bulk suppression lookup failed: ${error.message}`)
    return emails
  }

  const blocked = new Set(
    (data || [])
      .filter((row) => BLOCKING_REASONS.includes(row.reason as SuppressionReason))
      .map((row) => String(row.email))
  )

  return emails.filter((email) => !blocked.has(normalise(email)))
}

/**
 * Record a suppression. Idempotent: repeated provider events for the same
 * address update the reason rather than erroring.
 */
export async function recordSuppression({
  email,
  reason,
  detail,
  source = 'resend_webhook',
}: {
  email: string
  reason: SuppressionReason
  detail?: string | null
  source?: string
}): Promise<{ ok: boolean; error?: string }> {
  const supabase = serviceClient()
  if (!supabase) return { ok: false, error: 'service role not configured' }
  if (!email) return { ok: false, error: 'email required' }

  const { error } = await supabase.from('email_suppressions').upsert(
    {
      email: normalise(email),
      reason,
      detail: detail ? String(detail).slice(0, 500) : null,
      source,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'email' }
  )

  if (error) return { ok: false, error: error.message }
  return { ok: true }
}
