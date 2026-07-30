/**
 * Compatibility layer for the Dodo Payments provider identifier columns.
 *
 * FoundersPrime bills exclusively through Dodo Payments. The
 * `user_subscriptions` table originally stored Dodo identifiers in columns
 * named `stripe_customer_id` / `stripe_subscription_id`. Migration
 * `20260730100000_rename_subscription_provider_columns` adds the canonical
 * `dodo_customer_id` / `dodo_subscription_id` names and keeps both in sync via
 * a database trigger.
 *
 * These helpers let application code read and write the canonical names while
 * still functioning if the migration has not been applied yet, so a code
 * deployment and the migration can land in either order.
 */

/** Canonical Dodo identifier columns. */
export const DODO_ID_COLUMNS = ['dodo_customer_id', 'dodo_subscription_id'] as const

/** Deprecated column names retained only for rollback safety. */
export const LEGACY_ID_COLUMNS = ['stripe_customer_id', 'stripe_subscription_id'] as const

export type ProviderIdRow = {
  dodo_subscription_id?: string | null
  stripe_subscription_id?: string | null
  dodo_customer_id?: string | null
  stripe_customer_id?: string | null
}

/**
 * True when a Postgres error indicates the canonical Dodo columns are missing,
 * i.e. the rename migration has not been applied to this database yet.
 */
export function isMissingDodoIdColumnError(error: { message?: string } | null | undefined): boolean {
  if (!error?.message) return false
  return /dodo_(customer|subscription)_id/i.test(error.message)
}

/** Read the Dodo subscription ID, tolerating a pre-migration row shape. */
export function resolveDodoSubscriptionId(row: ProviderIdRow | null | undefined): string | null {
  if (!row) return null
  return row.dodo_subscription_id ?? row.stripe_subscription_id ?? null
}

/** Read the Dodo customer ID, tolerating a pre-migration row shape. */
export function resolveDodoCustomerId(row: ProviderIdRow | null | undefined): string | null {
  if (!row) return null
  return row.dodo_customer_id ?? row.stripe_customer_id ?? null
}

/**
 * Build the identifier fields for an insert or update. Both names are written
 * so the row stays correct even if the previous deployment (which reads the
 * legacy names) is still serving traffic.
 */
export function dodoIdWriteFields({
  customerId,
  subscriptionId,
}: {
  customerId?: string | null
  subscriptionId?: string | null
}): Record<string, string | null> {
  const fields: Record<string, string | null> = {}
  if (customerId !== undefined) {
    fields.dodo_customer_id = customerId
    fields.stripe_customer_id = customerId
  }
  if (subscriptionId !== undefined) {
    fields.dodo_subscription_id = subscriptionId
    fields.stripe_subscription_id = subscriptionId
  }
  return fields
}

/**
 * Strip the canonical columns from a write payload so the same operation can be
 * retried against a database where the rename migration has not run yet.
 */
export function withoutDodoIdColumns<T extends Record<string, unknown>>(row: T): T {
  const next = { ...row }
  for (const column of DODO_ID_COLUMNS) {
    delete next[column]
  }
  return next
}
