import DodoPayments from 'dodopayments';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Check if environment variables are set
const DODO_API_KEY = process.env.DODO_PAYMENTS_API_KEY || '';
const DODO_ENV = process.env.DODO_PAYMENTS_ENVIRONMENT as 'test_mode' | 'live_mode' || 'test_mode';

const client = DODO_API_KEY ? new DodoPayments({
  bearerToken: DODO_API_KEY,
  environment: DODO_ENV,
}) : null;

// Product IDs from Dodo Payments Dashboard (via env vars)
const PRODUCTS: Record<string, string> = {
  nextfounder: process.env.DODO_PRODUCT_NEXTFOUNDER_YEARLY || process.env.DODO_PRODUCT_CAMPUS_MONTHLY || process.env.DODO_PRODUCT_EXPLORER_MONTHLY || 'pdt_0NYGgiPYXbfSQSTu2YZVA',
  founder:     process.env.DODO_PRODUCT_FOUNDER_YEARLY     || 'pdt_0NYGhiHbaHo141y9EXBl7',
  legend:      process.env.DODO_PRODUCT_LEGEND_LIFETIME    || 'pdt_0NYGi3cj7tCz581sqfnWw',
};

export async function POST(request: Request) {
  // Check if DodoPayments client is initialized
  if (!client) {
    return NextResponse.json({ error: 'Payment system not configured. Please contact support.' }, { status: 500 });
  }

  // 🔒 Require authentication — only logged-in users can initiate payment
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized: Please log in to subscribe' }, { status: 401 });
  }

  try {
    const { plan } = await request.json();

    if (!plan || !PRODUCTS[plan]) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    const productId = PRODUCTS[plan];

    // Use the authenticated user's email automatically — never trust client-supplied email
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.foundersprime.com'

    const sessionPayload: any = {
      product_cart: [{ product_id: productId, quantity: 1 }],
      return_url: `${appUrl}/dashboard?status={status}`,
      customer: { email: user.email },
    };

    const session = await client.checkoutSessions.create(sessionPayload);

    return NextResponse.json({
      url: session.checkout_url,
      payment_id: session.session_id
    });
  } catch (error: any) {
    // Surface real error info so the UI can display something useful and
    // the issue is visible in Vercel logs.
    const dodoMessage =
      error?.error?.message ||
      error?.response?.data?.message ||
      error?.message ||
      'Unknown error';
    const status = error?.status || error?.statusCode || 500;

    console.error('❌ Dodo Payment Error:', {
      status,
      message: dodoMessage,
      raw: error,
    });

    return NextResponse.json(
      {
        error: `Payment creation failed: ${dodoMessage}`,
        // Only include details in non-production for debugging
        ...(process.env.NODE_ENV !== 'production' && { details: error }),
      },
      { status: status >= 400 && status < 600 ? status : 500 }
    );
  }
}
