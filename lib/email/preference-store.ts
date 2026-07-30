import { createClient as createServiceClient } from '@supabase/supabase-js'

/**
 * Server-side read/write access to email_preferences.
 *
 * Writes use the service role because the preference centre must work from an
 * email link with no session. Safety therefore comes from the caller: every
 * function here takes an already-authenticated user ID, resolved either from a
 * verified signed token or from a Supabase session. Nothing in this module
 * accepts a user ID straight from request input.
 */

export const EMAIL_CATEGORIES = ['deal_alerts', 'membership_offers', 'product_updates'] as const

export type EmailCategory = (typeof EMAIL_CATEGORIES)[number]

export interface EmailPreferences {
  dealAlerts: boolean
  membershipOffers: boolean
  productUpdates: boolean
  optedInAt: string | null
  unsubscribedAllAt: string | null
}

export const CATEGORY_COPY: Record<EmailCategory, { label: string; description: string }> = {
  deal_alerts: {
    label: 'New deal alerts',
    description: 'Newly verified credits, discounts and founder offers as they are added.',
  },
  membership_offers: {
    label: 'Membership offers',
    description: 'Occasional pricing offers and membership news.',
  },
  product_updates: {
    label: 'Product updates',
    description: 'New features and improvements to FoundersPrime.',
  },
}

/** Everything off. The state every account starts in. */
export const DEFAULT_PREFERENCES: EmailPreferences = {
  dealAlerts: false,
  membershipOffers: false,
  productUpdates: false,
  optedInAt: null,
  unsubscribedAllAt: null,
}

export function getServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createServiceClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

interface PreferenceRow {
  deal_alerts: boolean | null
  membership_offers: boolean | null
  product_updates: boolean | null
  opted_in_at: string | null
  unsubscribed_all_at: string | null
}

function fromRow(row: PreferenceRow | null): EmailPreferences {
  if (!row) return { ...DEFAULT_PREFERENCES }
  return {
    dealAlerts: row.deal_alerts === true,
    membershipOffers: row.membership_offers === true,
    productUpdates: row.product_updates === true,
    optedInAt: row.opted_in_at,
    unsubscribedAllAt: row.unsubscribed_all_at,
  }
}

/** True when the preferences table has not been migrated yet. */
export function isMissingPreferencesTable(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false
  // 42P01 undefined_table; PostgREST also reports an unknown relation as PGRST205.
  return (
    error.code === '42P01' ||
    error.code === 'PGRST205' ||
    /email_preferences/i.test(error.message || '')
  )
}

export async function readPreferences(userId: string): Promise<{
  preferences: EmailPreferences
  available: boolean
}> {
  const supabase = getServiceRoleClient()
  if (!supabase) return { preferences: { ...DEFAULT_PREFERENCES }, available: false }

  const { data, error } = await supabase
    .from('email_preferences')
    .select('deal_alerts, membership_offers, product_updates, opted_in_at, unsubscribed_all_at')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) {
    if (isMissingPreferencesTable(error)) {
      return { preferences: { ...DEFAULT_PREFERENCES }, available: false }
    }
    throw new Error(`Email preference read failed: ${error.message}`)
  }

  return { preferences: fromRow(data as PreferenceRow | null), available: true }
}

export interface PreferenceUpdate {
  deal_alerts?: boolean
  membership_offers?: boolean
  product_updates?: boolean
}

/**
 * Apply a preference change for a user, creating the row when absent.
 *
 * opted_in_at is stamped the first time any category is switched on and is never
 * cleared afterwards, because campaign sending requires evidence of when consent
 * was given. unsubscribed_all_at is set when everything ends up off, and cleared
 * again if the user later re-enables something.
 */
export async function writePreferences(
  userId: string,
  update: PreferenceUpdate
): Promise<EmailPreferences> {
  const supabase = getServiceRoleClient()
  if (!supabase) throw new Error('Email preferences are unavailable: service role not configured')

  const { preferences: current } = await readPreferences(userId)

  const next = {
    deal_alerts: update.deal_alerts ?? current.dealAlerts,
    membership_offers: update.membership_offers ?? current.membershipOffers,
    product_updates: update.product_updates ?? current.productUpdates,
  }

  const anyEnabled = next.deal_alerts || next.membership_offers || next.product_updates
  const now = new Date().toISOString()

  const row = {
    user_id: userId,
    ...next,
    // First affirmative consent is recorded once and preserved.
    opted_in_at: anyEnabled ? current.optedInAt || now : current.optedInAt,
    unsubscribed_all_at: anyEnabled ? null : now,
    updated_at: now,
  }

  const { data, error } = await supabase
    .from('email_preferences')
    .upsert(row, { onConflict: 'user_id' })
    .select('deal_alerts, membership_offers, product_updates, opted_in_at, unsubscribed_all_at')
    .single()

  if (error) throw new Error(`Email preference write failed: ${error.message}`)

  return fromRow(data as PreferenceRow)
}

/** Switch every optional category off. Used by one-click unsubscribe. */
export async function unsubscribeAll(userId: string): Promise<EmailPreferences> {
  return writePreferences(userId, {
    deal_alerts: false,
    membership_offers: false,
    product_updates: false,
  })
}
