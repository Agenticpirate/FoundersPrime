import { NextResponse } from 'next/server';
import DodoPayments from 'dodopayments';
import { createClient } from '@/lib/supabase/server';

const client = process.env.DODO_PAYMENTS_API_KEY
  ? new DodoPayments({
      bearerToken: process.env.DODO_PAYMENTS_API_KEY,
      environment: process.env.DODO_PAYMENTS_ENVIRONMENT as 'test_mode' | 'live_mode',
    })
  : null;

const WEBHOOK_SECRET = process.env.DODO_PAYMENTS_WEBHOOK_SECRET;

// Map Dodo Product IDs → our plan names
const PRODUCT_TO_PLAN: Record<string, 'explorer' | 'founder' | 'legend'> = {
  [process.env.DODO_PRODUCT_EXPLORER_MONTHLY || 'pdt_0NYGgiPYXbfSQSTu2YZVA']: 'explorer',
  [process.env.DODO_PRODUCT_FOUNDER_YEARLY  || 'pdt_0NYGhiHbaHo141y9EXBl7']: 'founder',
  [process.env.DODO_PRODUCT_LEGEND_LIFETIME || 'pdt_0NYGi3cj7tCz581sqfnWw']: 'legend',
};

// Activate / update a user's subscription in Supabase using DELETE + INSERT
// (required because ON CONFLICT doesn't work with partial unique indexes)
async function activatePlan({
  email,
  plan,
  periodEnd,
  dodoSubscriptionId,
  dodoCustomerId,
}: {
  email: string;
  plan: 'explorer' | 'founder' | 'legend';
  periodEnd?: string | null;
  dodoSubscriptionId?: string | null;
  dodoCustomerId?: string | null;
}) {
  const supabase = createClient();

  // Find the Supabase user by email via admin API
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();

  if (listError) {
    console.error('Error fetching users:', listError);
    return;
  }

  const user = users.find((u) => u.email === email);
  if (!user) {
    console.warn(`⚠️ No Supabase user found for email: ${email}`);
    return;
  }

  // Delete any existing active subscription for this user first
  const { error: deleteError } = await supabase
    .from('user_subscriptions')
    .delete()
    .eq('user_id', user.id)
    .eq('status', 'active');

  if (deleteError) {
    console.error('Error deleting old subscription:', deleteError);
    return;
  }

  // Insert the new active subscription
  const { error: insertError } = await supabase
    .from('user_subscriptions')
    .insert({
      user_id: user.id,
      plan,
      status: 'active',
      period_start: new Date().toISOString(),
      period_end: periodEnd || null,
      stripe_customer_id: dodoCustomerId || null,
      stripe_subscription_id: dodoSubscriptionId || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

  if (insertError) {
    console.error('Error inserting subscription:', insertError);
  } else {
    console.log(`✅ Plan "${plan}" activated for user: ${email}`);
  }
}

// Cancel/deactivate a plan in Supabase
async function deactivatePlan(email: string) {
  const supabase = createClient();

  const { data: { users } } = await supabase.auth.admin.listUsers();
  const user = users?.find((u) => u.email === email);
  if (!user) return;

  await supabase
    .from('user_subscriptions')
    .update({ status: 'cancelled', updated_at: new Date().toISOString() })
    .eq('user_id', user.id)
    .eq('status', 'active');

  console.log(`🚫 Plan deactivated for user: ${email}`);
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

      // ── One-time payments (Legend Lifetime) ──────────────────────────────
      case 'payment.succeeded': {
        const email = data?.customer?.email;
        const productId = data?.product_cart?.[0]?.product_id;
        const plan = productId ? PRODUCT_TO_PLAN[productId] : undefined;

        if (email && plan) {
          await activatePlan({
            email,
            plan,
            periodEnd: null, // lifetime — no expiry
            dodoCustomerId: data?.customer?.customer_id,
          });
        }
        break;
      }

      // ── Subscriptions (Explorer Monthly / Founder Yearly) ─────────────────
      case 'subscription.active':
      case 'subscription.renewed': {
        const email = data?.customer?.email;
        const productId = data?.product_id;
        const plan = productId ? PRODUCT_TO_PLAN[productId] : undefined;

        if (email && plan) {
          await activatePlan({
            email,
            plan,
            periodEnd: data?.next_billing_date || null,
            dodoSubscriptionId: data?.subscription_id,
            dodoCustomerId: data?.customer?.customer_id,
          });
        }
        break;
      }

      case 'subscription.plan_changed': {
        const email = data?.customer?.email;
        const productId = data?.product_id;
        const plan = productId ? PRODUCT_TO_PLAN[productId] : undefined;

        if (email && plan) {
          await activatePlan({
            email,
            plan,
            periodEnd: data?.next_billing_date || null,
            dodoSubscriptionId: data?.subscription_id,
            dodoCustomerId: data?.customer?.customer_id,
          });
        }
        break;
      }

      case 'subscription.cancelled':
      case 'subscription.expired':
      case 'subscription.failed': {
        const email = data?.customer?.email;
        if (email) {
          await deactivatePlan(email);
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
