import { createClient as createServiceClient } from '@supabase/supabase-js'
import { sendSignupWelcomeEmail, SIGNUP_EMAIL_MARKERS } from '@/lib/lifecycle-emails'

/**
 * Only genuinely new accounts are emailed. The auth callback also runs for
 * returning users signing in, and none of the accounts that existed before this
 * feature shipped should receive an "account created" email.
 */
const NEW_ACCOUNT_WINDOW_MS = 60 * 60 * 1000

/**
 * Sends the account-created email exactly once per user.
 *
 * The auth callback runs on every OAuth sign-in and every email confirmation, so
 * delivery is guarded three ways: the account must have been created within
 * NEW_ACCOUNT_WINDOW_MS, it must carry no sent marker, and sendSignupWelcomeEmail
 * attaches a per-user idempotency key at the provider.
 *
 * This must never break authentication. Every failure path is swallowed and
 * logged; the caller redirects the user regardless of the outcome.
 */
export async function deliverSignupWelcomeEmail(userId: string): Promise<void> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) return

    const supabase = createServiceClient(url, key, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    const { data, error } = await supabase.auth.admin.getUserById(userId)
    if (error || !data?.user) {
      console.error(`Signup email skipped — could not load user ${userId}: ${error?.message}`)
      return
    }

    const user = data.user
    const appMetadata = (user.app_metadata || {}) as Record<string, unknown>

    if (appMetadata[SIGNUP_EMAIL_MARKERS.sentAt]) return
    if (!user.email) return

    // Pre-existing accounts must never receive an "account created" email.
    const createdAt = user.created_at ? Date.parse(user.created_at) : Number.NaN
    if (!Number.isFinite(createdAt)) return
    if (Date.now() - createdAt > NEW_ACCOUNT_WINDOW_MS) return

    const userMetadata = (user.user_metadata || {}) as Record<string, unknown>
    const nameValue = userMetadata.full_name || userMetadata.name || userMetadata.display_name
    const firstName = typeof nameValue === 'string' && nameValue.trim() ? nameValue.trim() : null

    const delivery = await sendSignupWelcomeEmail({
      userId: user.id,
      toEmail: user.email,
      firstName,
    })

    if (delivery.status !== 'sent') {
      // Record the attempt but leave sentAt unset so a later sign-in retries.
      await supabase.auth.admin.updateUserById(user.id, {
        app_metadata: {
          ...appMetadata,
          [SIGNUP_EMAIL_MARKERS.failedAt]: new Date().toISOString(),
        },
      })
      console.warn(`Signup email not delivered for user ${user.id}: ${delivery.error}`)
      return
    }

    const { error: markerError } = await supabase.auth.admin.updateUserById(user.id, {
      app_metadata: {
        ...appMetadata,
        [SIGNUP_EMAIL_MARKERS.sentAt]: new Date().toISOString(),
        [SIGNUP_EMAIL_MARKERS.failedAt]: null,
      },
    })

    if (markerError) {
      console.error(
        `Signup email sent but marker failed for user ${user.id}: ${markerError.message}`
      )
      return
    }

    console.log(`✉️ Signup email sent to user ${user.id} (${delivery.id || 'no provider id'})`)
  } catch (error) {
    console.error('Signup email delivery raised an unexpected error:', error)
  }
}
