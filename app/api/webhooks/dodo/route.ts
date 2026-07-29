import { NextResponse } from 'next/server';
import DodoPayments from 'dodopayments';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import { getPlanByProductId, getFeaturedPlanConfig } from '@/lib/featured-plans';
import { sendWelcomeEmail, type MembershipPlan } from '@/lib/lifecycle-emails';

const client = process.env.DODO_PAYMENTS_API_KEY
  ? new DodoPayments({
      bearerToken: process.env.DODO_PAYMENTS_API_KEY,
      environment: process.env.DODO_PAYMENTS_ENVIRONMENT as 'test_mode' | 'live_mode',
    })
  : null;

const WEBHOOK_SECRET = process.env.DODO_PAYMENTS_WEBHOOK_SECRET;

// Map Dodo Product IDs → our plan names
const PRODUCT_TO_PLAN: Record<string, MembershipPlan> = {
  [process.env.DODO_PRODUCT_NEXTFOUNDER_YEARLY || process.env.DODO_PRODUCT_CAMPUS_MONTHLY || process.env.DODO_PRODUCT_EXPLORER_MONTHLY || 'pdt_0NYGgiPYXbfSQSTu2YZVA']: 'nextfounder',
  [process.env.DODO_PRODUCT_FOUNDER_YEARLY     || 'pdt_0NYGhiHbaHo141y9EXBl7']: 'founder',
  [process.env.DODO_PRODUCT_LEGEND_LIFETIME    || 'pdt_0NYGi3cj7tCz581sqfnWw']: 'legend',
};

function getServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createServiceClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// Activate a Featured Listing — mark submission paid, set expiry based on the
// purchased plan (7 or 30 days), propagate to deal if exists
async function activateFeaturedListing(data: any, durationDays: number) {
  const supabase = getServiceRoleClient();
  if (!supabase) {
    console.error('⚠️ Featured listing activate failed — service role not configured');
    return;
  }

  const submissionId =
    data?.metadata?.submission_id ||
    data?.payload?.metadata?.submission_id ||
    null;
  const sessionId =
    data?.session_id || data?.checkout_session_id || data?.id || null;

  if (!submissionId && !sessionId) {
    console.warn('⚠️ Featured listing payment has no submission_id or session_id — skipping');
    return;
  }

  // Look up the submission either by metadata.submission_id or by stored featured_payment_id
  let query = supabase.from('deal_submissions').select('*');
  if (submissionId) {
    query = query.eq('id', submissionId);
  } else {
    query = query.eq('featured_payment_id', sessionId);
  }
  const { data: submission, error } = await query.maybeSingle();

  if (error || !submission) {
    console.warn(`⚠️ Featured payment received but submission not found. submissionId=${submissionId} sessionId=${sessionId}`);
    return;
  }

  const featuredUntil = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString();
  const paymentRefId =
    data?.payment_id || data?.transaction_id || sessionId || null;

  // Mark submission paid
  await supabase
    .from('deal_submissions')
    .update({
      featured_paid: true,
      featured_until: featuredUntil,
      featured_payment_id: paymentRefId,
      updated_at: new Date().toISOString(),
    })
    .eq('id', submission.id);

  console.log(`⭐ Featured listing paid for submission ${submission.id} (until ${featuredUntil})`);

  // Try to update the corresponding deal if it was already approved/published.
  // We match by provider name + (recent) created_at, since approval generates a slug-with-random-suffix.
  const { data: deal } = await supabase
    .from('deals')
    .select('id, slug, featured_until')
    .eq('provider', submission.company_name)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (deal) {
    await supabase
      .from('deals')
      .update({
        featured: true,
        featured_until: featuredUntil,
        updated_at: new Date().toISOString(),
      })
      .eq('id', deal.id);
    console.log(`⭐ Deal ${deal.slug} pinned as featured until ${featuredUntil}`);
  } else {
    console.log(`ℹ️ No published deal yet for "${submission.company_name}". featured_until set on submission only — deal will pick it up on approval.`);
  }
}

interface ResolvedAuthUser {
  id: string
  email?: string
  userMetadata: Record<string, unknown>
  appMetadata: Record<string, unknown>
}

/**
 * Resolve a Supabase auth user for webhook activation.
 * Prefer explicit user_id from checkout metadata; fall back to email (case-insensitive).
 * MUST use the service-role client — cookie/anon clients cannot call auth.admin.*
 * and have no session on webhook requests.
 */
async function resolveAuthUser(opts: {
  userId?: string | null
  email?: string | null
}): Promise<ResolvedAuthUser | null> {
  const supabase = getServiceRoleClient()
  if (!supabase) {
    console.error('⚠️ activatePlan: SUPABASE_SERVICE_ROLE_KEY not configured')
    return null
  }

  const resolvedUser = (user: {
    id: string
    email?: string
    user_metadata?: Record<string, unknown>
    app_metadata?: Record<string, unknown>
  }): ResolvedAuthUser => ({
    id: user.id,
    email: user.email || undefined,
    userMetadata: user.user_metadata || {},
    appMetadata: user.app_metadata || {},
  })

  if (opts.userId) {
    const { data, error } = await supabase.auth.admin.getUserById(opts.userId)
    if (!error && data?.user) {
      return resolvedUser(data.user)
    }
    console.warn(`⚠️ getUserById failed for ${opts.userId}:`, error?.message)
  }

  const email = (opts.email || '').trim().toLowerCase()
  if (!email) return null

  // Paginate — default listUsers only returns the first page (~50–200 users).
  let page = 1
  const perPage = 200
  while (page <= 50) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage })
    if (error) {
      console.error('Error listing users for plan activation:', error.message)
      break
    }
    const batch = data?.users || []
    const hit = batch.find((u) => String(u.email || '').toLowerCase().trim() === email)
    if (hit) return resolvedUser(hit)
    if (batch.length < perPage) break
    page += 1
  }

  // REST fallback with email filter (GoTrue supports email query on some versions)
  try {
    const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '')
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (base && key) {
      const res = await fetch(
        `${base}/auth/v1/admin/users?page=1&per_page=50&email=${encodeURIComponent(email)}`,
        {
          headers: { apikey: key, Authorization: `Bearer ${key}` },
          cache: 'no-store',
        }
      )
      if (res.ok) {
        const body = await res.json()
        const users: Array<{
          id: string
          email?: string
          user_metadata?: Record<string, unknown>
          app_metadata?: Record<string, unknown>
        }> = Array.isArray(body?.users) ? body.users : []
        const hit = users.find(
          (u) => String(u.email || '').toLowerCase().trim() === email
        )
        if (hit) return resolvedUser(hit)
      }
    }
  } catch (e) {
    console.warn('Email REST lookup failed:', e)
  }

  console.warn(`⚠️ No Supabase user found for email: ${email}`)
  return null
}

const WELCOME_EMAIL_SENT_AT = 'foundersprime_welcome_email_sent_at'
const WELCOME_EMAIL_PLAN = 'foundersprime_welcome_email_plan'
const WELCOME_EMAIL_PENDING_AT = 'foundersprime_welcome_email_pending_at'
const WELCOME_EMAIL_FAILED_AT = 'foundersprime_welcome_email_failed_at'

class RetryableWebhookError extends Error {}

function firstNameFromMetadata(metadata: Record<string, unknown>): string | null {
  const value = metadata.full_name || metadata.name || metadata.display_name
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

async function deliverWelcomeEmail({
  supabase,
  user,
  plan,
}: {
  supabase: NonNullable<ReturnType<typeof getServiceRoleClient>>
  user: ResolvedAuthUser
  plan: MembershipPlan
}) {
  if (user.appMetadata[WELCOME_EMAIL_SENT_AT]) {
    console.log(`ℹ️ Welcome email already recorded for user ${user.id}`)
    return
  }
  if (!user.email) {
    console.warn(`⚠️ Welcome email skipped — user ${user.id} has no email address`)
    return
  }

  const delivery = await sendWelcomeEmail({
    userId: user.id,
    toEmail: user.email,
    firstName: firstNameFromMetadata(user.userMetadata),
    plan,
  })

  if (delivery.status === 'not_configured') {
    const { error } = await supabase.auth.admin.updateUserById(user.id, {
      app_metadata: {
        ...user.appMetadata,
        [WELCOME_EMAIL_PENDING_AT]:
          user.appMetadata[WELCOME_EMAIL_PENDING_AT] || new Date().toISOString(),
        [WELCOME_EMAIL_PLAN]: plan,
      },
    })
    if (error) {
      console.error(`Welcome email pending marker failed for user ${user.id}:`, error.message)
    }
    console.warn(`⚠️ Welcome email pending for user ${user.id}: ${delivery.error}`)
    return
  }
  if (delivery.status === 'failed') {
    if (delivery.retryable) {
      throw new RetryableWebhookError(
        `Welcome email delivery failed for user ${user.id}: ${delivery.error}`
      )
    }

    const { error } = await supabase.auth.admin.updateUserById(user.id, {
      app_metadata: {
        ...user.appMetadata,
        [WELCOME_EMAIL_FAILED_AT]: new Date().toISOString(),
        [WELCOME_EMAIL_PLAN]: plan,
      },
    })
    if (error) {
      console.error(`Welcome email failure marker failed for user ${user.id}:`, error.message)
    }
    console.error(`Welcome email permanently rejected for user ${user.id}: ${delivery.error}`)
    return
  }

  const { error } = await supabase.auth.admin.updateUserById(user.id, {
    app_metadata: {
      ...user.appMetadata,
      [WELCOME_EMAIL_SENT_AT]: new Date().toISOString(),
      [WELCOME_EMAIL_PLAN]: plan,
      [WELCOME_EMAIL_PENDING_AT]: null,
      [WELCOME_EMAIL_FAILED_AT]: null,
    },
  })
  if (error) {
    throw new RetryableWebhookError(
      `Welcome email sent but delivery marker failed for user ${user.id}: ${error.message}`
    )
  }

  console.log(`✉️ Welcome email sent to ${user.email} (${delivery.id || 'no provider id'})`)
}

const CHECKOUT_REFERENCE_KEY = 'foundersprime_last_checkout_reference'
const CHECKOUT_REFERENCE_PLAN = 'foundersprime_last_checkout_plan'
const CHECKOUT_REFERENCE_ACTIVATED_AT = 'foundersprime_last_checkout_activated_at'

async function recordCheckoutActivation({
  supabase,
  userId,
  checkoutReference,
  plan,
}: {
  supabase: NonNullable<ReturnType<typeof getServiceRoleClient>>
  userId: string
  checkoutReference?: string | null
  plan: MembershipPlan
}) {
  if (!checkoutReference) return

  // Fetch current metadata so welcome-email markers written earlier in the same
  // delivery are preserved rather than overwritten by a stale user snapshot.
  const { data, error: getUserError } = await supabase.auth.admin.getUserById(userId)
  if (getUserError || !data?.user) {
    throw new RetryableWebhookError(
      `Checkout activation marker lookup failed for user ${userId}: ${getUserError?.message || 'user missing'}`
    )
  }

  const appMetadata = data.user.app_metadata || {}
  if (
    appMetadata[CHECKOUT_REFERENCE_KEY] === checkoutReference &&
    appMetadata[CHECKOUT_REFERENCE_PLAN] === plan
  ) {
    return
  }

  const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
    app_metadata: {
      ...appMetadata,
      [CHECKOUT_REFERENCE_KEY]: checkoutReference,
      [CHECKOUT_REFERENCE_PLAN]: plan,
      [CHECKOUT_REFERENCE_ACTIVATED_AT]: new Date().toISOString(),
    },
  })
  if (updateError) {
    throw new RetryableWebhookError(
      `Checkout activation marker failed for user ${userId}: ${updateError.message}`
    )
  }
}

// Activate / update a user's subscription in Supabase using soft-cancel + insert.
// (required because ON CONFLICT doesn't work with partial unique indexes)
async function activatePlan({
  email,
  userId,
  plan,
  periodEnd,
  dodoSubscriptionId,
  dodoCustomerId,
  amountCents,
  checkoutReference,
  sendWelcome = false,
}: {
  email?: string | null
  userId?: string | null
  plan: MembershipPlan
  periodEnd?: string | null
  dodoSubscriptionId?: string | null
  dodoCustomerId?: string | null
  amountCents?: number | null
  checkoutReference?: string | null
  sendWelcome?: boolean
}) {
  const supabase = getServiceRoleClient()
  if (!supabase) {
    throw new RetryableWebhookError(
      'Plan activation failed: SUPABASE_SERVICE_ROLE_KEY is not configured'
    )
  }

  const user = await resolveAuthUser({ userId, email })
  if (!user) {
    throw new RetryableWebhookError(
      `Plan activation failed: no Supabase user matched ${userId || email || 'webhook identity'}`
    )
  }

  // Webhook retries and payment.succeeded + subscription.active may describe
  // the same Dodo subscription. Refresh that active row instead of creating
  // cancelled history entries on every delivery attempt.
  const { data: existingActive, error: lookupError } = await supabase
    .from('user_subscriptions')
    .select('id, plan, stripe_subscription_id')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (lookupError) {
    throw new RetryableWebhookError(
      `Plan activation lookup failed for user ${user.id}: ${lookupError.message}`
    )
  }

  const existingPlanMatches =
    existingActive?.plan === plan ||
    (plan === 'nextfounder' && ['explorer', 'campus'].includes(existingActive?.plan || ''))

  const sameActivation =
    existingPlanMatches &&
    (dodoSubscriptionId
      ? existingActive?.stripe_subscription_id === dodoSubscriptionId
      : plan === 'legend' && !existingActive?.stripe_subscription_id)

  if (sameActivation && existingActive) {
    const refreshRow: Record<string, unknown> = {
      period_end: periodEnd || null,
      stripe_customer_id: dodoCustomerId || null,
      updated_at: new Date().toISOString(),
    }
    if (typeof amountCents === 'number') refreshRow.amount_cents = amountCents

    let { error: refreshError } = await supabase
      .from('user_subscriptions')
      .update(refreshRow)
      .eq('id', existingActive.id)

    if (refreshError && /amount_cents/i.test(refreshError.message || '')) {
      delete refreshRow.amount_cents
      ;({ error: refreshError } = await supabase
        .from('user_subscriptions')
        .update(refreshRow)
        .eq('id', existingActive.id))
    }

    if (refreshError) {
      throw new RetryableWebhookError(
        `Plan activation refresh failed for user ${user.id}: ${refreshError.message}`
      )
    }

    console.log(`✅ Existing plan "${plan}" refreshed for user: ${user.email || email || user.id}`)

    if (sendWelcome) {
      await deliverWelcomeEmail({ supabase, user, plan })
    }
    await recordCheckoutActivation({
      supabase,
      userId: user.id,
      checkoutReference,
      plan,
    })
    return
  }

  // Soft-cancel any existing active rows (keep history), then insert the new active plan.
  const { error: cancelError } = await supabase
    .from('user_subscriptions')
    .update({ status: 'cancelled', updated_at: new Date().toISOString() })
    .eq('user_id', user.id)
    .eq('status', 'active')

  if (cancelError) {
    throw new RetryableWebhookError(
      `Existing plan cancellation failed for user ${user.id}: ${cancelError.message}`
    )
  }

  const baseRow: Record<string, unknown> = {
    user_id: user.id,
    plan,
    status: 'active',
    period_start: new Date().toISOString(),
    period_end: periodEnd || null,
    stripe_customer_id: dodoCustomerId || null,
    stripe_subscription_id: dodoSubscriptionId || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  // Store real charged amount when the column exists.
  let insertError: { message?: string } | null = null
  if (typeof amountCents === 'number') {
    ;({ error: insertError } = await supabase
      .from('user_subscriptions')
      .insert({ ...baseRow, amount_cents: amountCents }))
    if (insertError && /amount_cents/i.test(insertError.message || '')) {
      ;({ error: insertError } = await supabase.from('user_subscriptions').insert(baseRow))
    }
  } else {
    ;({ error: insertError } = await supabase.from('user_subscriptions').insert(baseRow))
  }

  // Some existing deployments still constrain the former Next Founder ID to
  // "explorer". Preserve activation until the canonical-plan migration is applied.
  if (
    insertError &&
    plan === 'nextfounder' &&
    /user_subscriptions_plan_check|violates check constraint/i.test(insertError.message || '')
  ) {
    const { error: legacyInsertError } = await supabase
      .from('user_subscriptions')
      .insert({ ...baseRow, plan: 'explorer' })
    insertError = legacyInsertError
    if (!legacyInsertError) {
      console.warn(
        `⚠️ Stored Next Founder as legacy "explorer" for user ${user.id}; apply the canonical plan migration`
      )
    }
  }

  if (insertError) {
    throw new RetryableWebhookError(
      `Plan activation insert failed for user ${user.id}: ${insertError.message || 'unknown database error'}`
    )
  }

  console.log(
    `✅ Plan "${plan}" activated for user: ${user.email || email || user.id}`
  )

  // Transactional welcome is only requested by initial-purchase event handlers.
  // It runs after activation and is deduplicated by Auth app metadata plus Resend.
  if (sendWelcome) {
    await deliverWelcomeEmail({ supabase, user, plan })
  }
  await recordCheckoutActivation({
    supabase,
    userId: user.id,
    checkoutReference,
    plan,
  })
}

// Cancel/deactivate only the subscription named by the Dodo event. This keeps
// stale cancellation events from revoking a newer replacement purchase.
async function deactivatePlan({
  email,
  userId,
  dodoSubscriptionId,
}: {
  email: string
  userId?: string | null
  dodoSubscriptionId: string
}) {
  const supabase = getServiceRoleClient()
  if (!supabase) {
    throw new RetryableWebhookError(
      'Plan deactivation failed: SUPABASE_SERVICE_ROLE_KEY is not configured'
    )
  }

  const user = await resolveAuthUser({ userId, email })
  if (!user) {
    throw new RetryableWebhookError(
      `Plan deactivation failed: no Supabase user matched ${userId || email || 'webhook identity'}`
    )
  }

  // Prefer cancel_at_period_end column; fall back if missing.
  let { data: deactivatedRows, error } = await supabase
    .from('user_subscriptions')
    .update({
      status: 'cancelled',
      cancel_at_period_end: false,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', user.id)
    .eq('status', 'active')
    .eq('stripe_subscription_id', dodoSubscriptionId)
    .select('id')

  if (error && /cancel_at_period_end/i.test(error.message || '')) {
    ;({ data: deactivatedRows, error } = await supabase
      .from('user_subscriptions')
      .update({ status: 'cancelled', updated_at: new Date().toISOString() })
      .eq('user_id', user.id)
      .eq('status', 'active')
      .eq('stripe_subscription_id', dodoSubscriptionId)
      .select('id'))
  }

  if (error) {
    throw new RetryableWebhookError(
      `Plan deactivation failed for user ${user.id}: ${error.message}`
    )
  }

  if (!deactivatedRows?.length) {
    console.log(
      `ℹ️ Ignored stale subscription deactivation ${dodoSubscriptionId} for user ${user.id}`
    )
    return
  }

  console.log(`🚫 Plan deactivated for user: ${user.email || email}`)
}

function extractMeta(data: any): {
  userId?: string | null
  planFromMeta?: string | null
  source?: string | null
  checkoutReference?: string | null
} {
  const meta = data?.metadata || data?.payload?.metadata || {}
  return {
    userId: meta.user_id || meta.userId || null,
    planFromMeta: meta.plan || null,
    source: meta.source || null,
    checkoutReference: meta.checkout_reference || meta.checkoutReference || null,
  }
}

/**
 * Verify Dodo webhook HMAC signature before processing the body.
 * Uses the official SDK unwrap (timing-safe signature check against WEBHOOK_SECRET).
 * Throws if the signature is missing or invalid — callers must not trust the payload.
 */
function verifyWebhookSignature(rawBody: string, headers: Headers) {
  if (!WEBHOOK_SECRET) {
    throw new Error('DODO_PAYMENTS_WEBHOOK_SECRET is not set')
  }
  if (!client) {
    throw new Error('DODO_PAYMENTS_API_KEY is not set')
  }
  return client.webhooks.unwrap(rawBody, {
    headers: Object.fromEntries(headers),
    key: WEBHOOK_SECRET,
  })
}

export async function POST(request: Request) {
  if (!WEBHOOK_SECRET) {
    console.error('⚠️ DODO_PAYMENTS_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  if (!client) {
    console.error('⚠️ DODO_PAYMENTS_API_KEY is not set');
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const rawBody = await request.text();

    // Signature verification first — reject forged webhooks before any side effects
    const event = verifyWebhookSignature(rawBody, request.headers);

    const data = event.data as any;
    const eventType = event.type as string;

    // A FoundersPrime membership webhook must never be acknowledged unless the
    // entitlement can be resolved to both a supported plan and a user identity.
    // Returning 500 lets Dodo retry after configuration/schema issues are fixed.
    const activationEventTypes = [
      'payment.succeeded',
      'subscription.active',
      'subscription.renewed',
      'subscription.plan_changed',
    ];
    const deactivationEventTypes = [
      'subscription.cancelled',
      'subscription.expired',
      'subscription.failed',
    ];
    const isActivationEvent = activationEventTypes.includes(eventType);
    const isDeactivationEvent = deactivationEventTypes.includes(eventType);
    let isFoundersPrimeMembershipEvent = false;

    if (isActivationEvent || isDeactivationEvent) {
      const productId = eventType === 'payment.succeeded'
        ? data?.product_cart?.[0]?.product_id
        : data?.product_id;
      const { userId, planFromMeta, source } = extractMeta(data);
      const metadataPlan = planFromMeta && ['nextfounder', 'founder', 'legend'].includes(planFromMeta)
        ? planFromMeta
        : undefined;
      const resolvedPlan = (productId ? PRODUCT_TO_PLAN[productId] : undefined) || metadataPlan;
      isFoundersPrimeMembershipEvent = Boolean(
        (productId && PRODUCT_TO_PLAN[productId]) ||
        source === 'foundersprime_checkout' ||
        metadataPlan
      );

      if (isFoundersPrimeMembershipEvent && isActivationEvent && !resolvedPlan) {
        throw new RetryableWebhookError(
          `Membership plan could not be resolved for ${eventType}`
        );
      }

      if (isFoundersPrimeMembershipEvent && !(userId || data?.customer?.email)) {
        throw new RetryableWebhookError(
          `Membership user identity could not be resolved for ${eventType}`
        );
      }
    }

    console.log(`📨 Dodo webhook received: ${eventType}`);

    switch (event.type as string) {

      // ── One-time payments ──────────────────────────────
      // Handles both: Legend Lifetime AND Featured Listing add-on.
      case 'payment.succeeded': {
        const productId = data?.product_cart?.[0]?.product_id;

        // Featured Listing flow — no plan activation, just pin the deal.
        // Match against either configured featured product (weekly / monthly)
        // and derive the pin duration from whichever was purchased.
        const featuredCfg = getPlanByProductId(productId);
        if (featuredCfg) {
          // Prefer the plan recorded in checkout metadata when present (handles
          // an admin override), otherwise fall back to the purchased product.
          const metaPlan = data?.metadata?.featured_plan || data?.payload?.metadata?.featured_plan;
          const durationDays = metaPlan
            ? getFeaturedPlanConfig(metaPlan).durationDays
            : featuredCfg.durationDays;
          await activateFeaturedListing(data, durationDays);
          break;
        }

        // Otherwise: subscription/lifetime plan activation
        const email = data?.customer?.email;
        const { userId, planFromMeta, checkoutReference } = extractMeta(data);
        const plan =
          (productId ? PRODUCT_TO_PLAN[productId] : undefined) ||
          (planFromMeta && ['nextfounder', 'founder', 'legend'].includes(planFromMeta)
            ? (planFromMeta as 'nextfounder' | 'founder' | 'legend')
            : undefined);

        if (!plan && productId) {
          console.warn(`⚠️ Unknown product ID in payment.succeeded: ${productId}. Known IDs: ${Object.keys(PRODUCT_TO_PLAN).join(', ')}`);
        }

        if ((email || userId) && plan) {
          await activatePlan({
            email,
            userId,
            plan,
            periodEnd: plan === 'legend' ? null : (data?.next_billing_date || null),
            dodoSubscriptionId: data?.subscription_id || null,
            dodoCustomerId: data?.customer?.customer_id,
            checkoutReference,
            amountCents:
              typeof data?.total_amount === 'number'
                ? data.total_amount
                : typeof data?.recurring_pre_tax_amount === 'number'
                  ? data.recurring_pre_tax_amount
                  : null,
            sendWelcome: !data?.subscription_id,
          });
        }
        break;
      }

      // ── Subscriptions (NextFounder Yearly / Founder Yearly) ─────────────────
      case 'subscription.active':
      case 'subscription.renewed': {
        const email = data?.customer?.email;
        const productId = data?.product_id;
        const { userId, planFromMeta, checkoutReference } = extractMeta(data);
        const plan =
          (productId ? PRODUCT_TO_PLAN[productId] : undefined) ||
          (planFromMeta && ['nextfounder', 'founder', 'legend'].includes(planFromMeta)
            ? (planFromMeta as MembershipPlan)
            : undefined);

        if (!plan && productId) {
          console.warn(`⚠️ Unknown product ID in ${event.type as string}: ${productId}. Known IDs: ${Object.keys(PRODUCT_TO_PLAN).join(', ')}`);
        }

        if ((email || userId) && plan) {
          await activatePlan({
            email,
            userId,
            plan,
            periodEnd: data?.next_billing_date || null,
            dodoSubscriptionId: data?.subscription_id,
            dodoCustomerId: data?.customer?.customer_id,
            checkoutReference,
            amountCents: typeof data?.recurring_pre_tax_amount === 'number' ? data.recurring_pre_tax_amount : null,
            sendWelcome: event.type === 'subscription.active',
          });
        }
        break;
      }

      case 'subscription.plan_changed': {
        const email = data?.customer?.email;
        const productId = data?.product_id;
        const { userId, planFromMeta, checkoutReference } = extractMeta(data);
        const plan =
          (productId ? PRODUCT_TO_PLAN[productId] : undefined) ||
          (planFromMeta && ['nextfounder', 'founder', 'legend'].includes(planFromMeta)
            ? (planFromMeta as 'nextfounder' | 'founder' | 'legend')
            : undefined);

        if (!plan && productId) {
          console.warn(`⚠️ Unknown product ID in subscription.plan_changed: ${productId}`);
        }

        if ((email || userId) && plan) {
          await activatePlan({
            email,
            userId,
            plan,
            periodEnd: data?.next_billing_date || null,
            dodoSubscriptionId: data?.subscription_id,
            dodoCustomerId: data?.customer?.customer_id,
            checkoutReference,
            amountCents: typeof data?.recurring_pre_tax_amount === 'number' ? data.recurring_pre_tax_amount : null,
          });
        }
        break;
      }

      case 'subscription.cancelled':
      case 'subscription.expired':
      case 'subscription.failed': {
        if (!isFoundersPrimeMembershipEvent) {
          console.log(`ℹ️ Ignored non-membership ${eventType} event`);
          break;
        }

        const email = data?.customer?.email;
        const { userId } = extractMeta(data);
        const dodoSubscriptionId = data?.subscription_id;
        if (!dodoSubscriptionId) {
          throw new RetryableWebhookError(
            `Membership subscription ID could not be resolved for ${eventType}`
          );
        }
        if (email || userId) {
          await deactivatePlan({
            email: email || '',
            userId,
            dodoSubscriptionId,
          });
        }
        break;
      }

      case 'payment.failed':
        console.log('❌ Payment failed for:', data?.customer?.email);
        break;

      default:
        console.log('📨 Unhandled event type:', event.type as string);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    const retryable = error instanceof RetryableWebhookError;
    return NextResponse.json(
      { error: retryable ? 'Webhook side effect failed; retry required' : 'Webhook processing failed' },
      { status: retryable ? 500 : 400 }
    );
  }
}
