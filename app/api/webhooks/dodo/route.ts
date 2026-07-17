import { NextResponse } from 'next/server';
import DodoPayments from 'dodopayments';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import { getPlanByProductId, getFeaturedPlanConfig } from '@/lib/featured-plans';

const client = process.env.DODO_PAYMENTS_API_KEY
  ? new DodoPayments({
      bearerToken: process.env.DODO_PAYMENTS_API_KEY,
      environment: process.env.DODO_PAYMENTS_ENVIRONMENT as 'test_mode' | 'live_mode',
    })
  : null;

const WEBHOOK_SECRET = process.env.DODO_PAYMENTS_WEBHOOK_SECRET;

// Map Dodo Product IDs → our plan names
const PRODUCT_TO_PLAN: Record<string, 'nextfounder' | 'founder' | 'legend'> = {
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

/**
 * Resolve a Supabase auth user for webhook activation.
 * Prefer explicit user_id from checkout metadata; fall back to email (case-insensitive).
 * MUST use the service-role client — cookie/anon clients cannot call auth.admin.*
 * and have no session on webhook requests.
 */
async function resolveAuthUser(opts: {
  userId?: string | null
  email?: string | null
}): Promise<{ id: string; email?: string } | null> {
  const supabase = getServiceRoleClient()
  if (!supabase) {
    console.error('⚠️ activatePlan: SUPABASE_SERVICE_ROLE_KEY not configured')
    return null
  }

  if (opts.userId) {
    const { data, error } = await supabase.auth.admin.getUserById(opts.userId)
    if (!error && data?.user) {
      return { id: data.user.id, email: data.user.email || undefined }
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
    if (hit) return { id: hit.id, email: hit.email || undefined }
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
        const users: any[] = Array.isArray(body?.users) ? body.users : []
        const hit = users.find(
          (u) => String(u.email || '').toLowerCase().trim() === email
        )
        if (hit) return { id: hit.id, email: hit.email || undefined }
      }
    }
  } catch (e) {
    console.warn('Email REST lookup failed:', e)
  }

  console.warn(`⚠️ No Supabase user found for email: ${email}`)
  return null
}

// Activate / update a user's subscription in Supabase using DELETE + INSERT
// (required because ON CONFLICT doesn't work with partial unique indexes)
async function activatePlan({
  email,
  userId,
  plan,
  periodEnd,
  dodoSubscriptionId,
  dodoCustomerId,
  amountCents,
}: {
  email?: string | null
  userId?: string | null
  plan: 'nextfounder' | 'founder' | 'legend'
  periodEnd?: string | null
  dodoSubscriptionId?: string | null
  dodoCustomerId?: string | null
  amountCents?: number | null
}) {
  const supabase = getServiceRoleClient()
  if (!supabase) {
    console.error('⚠️ activatePlan aborted — service role not configured')
    return
  }

  const user = await resolveAuthUser({ userId, email })
  if (!user) return

  // Soft-cancel any existing active rows (keep history), then insert the new active plan
  await supabase
    .from('user_subscriptions')
    .update({ status: 'cancelled', updated_at: new Date().toISOString() })
    .eq('user_id', user.id)
    .eq('status', 'active')

  const baseRow: Record<string, any> = {
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

  // Store real charged amount when the column exists
  let insertError = null as any
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

  if (insertError) {
    console.error('Error inserting subscription:', insertError)
  } else {
    console.log(
      `✅ Plan "${plan}" activated for user: ${user.email || email || user.id}`
    )
  }
}

// Cancel/deactivate a plan in Supabase
async function deactivatePlan(email: string, userId?: string | null) {
  const supabase = getServiceRoleClient()
  if (!supabase) {
    console.error('⚠️ deactivatePlan aborted — service role not configured')
    return
  }

  const user = await resolveAuthUser({ userId, email })
  if (!user) return

  // Prefer cancel_at_period_end column; fall back if missing
  let { error } = await supabase
    .from('user_subscriptions')
    .update({
      status: 'cancelled',
      cancel_at_period_end: false,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', user.id)
    .eq('status', 'active')

  if (error && /cancel_at_period_end/i.test(error.message || '')) {
    ;({ error } = await supabase
      .from('user_subscriptions')
      .update({ status: 'cancelled', updated_at: new Date().toISOString() })
      .eq('user_id', user.id)
      .eq('status', 'active'))
  }

  if (error) {
    console.error('deactivatePlan error:', error.message)
  } else {
    console.log(`🚫 Plan deactivated for user: ${user.email || email}`)
  }
}

function extractMeta(data: any): { userId?: string | null; planFromMeta?: string | null } {
  const meta = data?.metadata || data?.payload?.metadata || {}
  return {
    userId: meta.user_id || meta.userId || null,
    planFromMeta: meta.plan || null,
  }
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
    const headers = Object.fromEntries(request.headers);

    // Verify signature — throws if invalid
    const event = client.webhooks.unwrap(rawBody, {
      headers,
      key: WEBHOOK_SECRET,
    });

    const data = event.data as any;

    console.log(`📨 Dodo webhook received: ${event.type as string}`);

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
        const { userId, planFromMeta } = extractMeta(data);
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
            dodoCustomerId: data?.customer?.customer_id,
            amountCents:
              typeof data?.total_amount === 'number'
                ? data.total_amount
                : typeof data?.recurring_pre_tax_amount === 'number'
                  ? data.recurring_pre_tax_amount
                  : null,
          });
        }
        break;
      }

      // ── Subscriptions (NextFounder Yearly / Founder Yearly) ─────────────────
      case 'subscription.active':
      case 'subscription.renewed': {
        const email = data?.customer?.email;
        const productId = data?.product_id;
        const { userId, planFromMeta } = extractMeta(data);
        const plan =
          (productId ? PRODUCT_TO_PLAN[productId] : undefined) ||
          (planFromMeta && ['nextfounder', 'founder', 'legend'].includes(planFromMeta)
            ? (planFromMeta as 'nextfounder' | 'founder' | 'legend')
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
            amountCents: typeof data?.recurring_pre_tax_amount === 'number' ? data.recurring_pre_tax_amount : null,
          });
        }
        break;
      }

      case 'subscription.plan_changed': {
        const email = data?.customer?.email;
        const productId = data?.product_id;
        const { userId, planFromMeta } = extractMeta(data);
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
            amountCents: typeof data?.recurring_pre_tax_amount === 'number' ? data.recurring_pre_tax_amount : null,
          });
        }
        break;
      }

      case 'subscription.cancelled':
      case 'subscription.expired':
      case 'subscription.failed': {
        const email = data?.customer?.email;
        const { userId } = extractMeta(data);
        if (email || userId) {
          await deactivatePlan(email || '', userId);
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
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 400 });
  }
}
