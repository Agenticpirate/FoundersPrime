import { NextResponse } from 'next/server';
import DodoPayments from 'dodopayments';

const client = process.env.DODO_PAYMENTS_API_KEY
  ? new DodoPayments({
      bearerToken: process.env.DODO_PAYMENTS_API_KEY,
      environment: process.env.DODO_PAYMENTS_ENVIRONMENT as 'test_mode' | 'live_mode',
    })
  : null;

// Webhook Secret from Dodo Dashboard
const WEBHOOK_SECRET = process.env.DODO_PAYMENTS_WEBHOOK_SECRET;

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
    // Get raw body and headers
    const rawBody = await request.text();
    const headers = Object.fromEntries(request.headers);

    // Verify signature and parse event
    // The SDK handles signature verification internally via unwrap
    const event = client.webhooks.unwrap(rawBody, {
      headers,
      key: WEBHOOK_SECRET
    });

    // Handle specific events
    switch (event.type as string) {
      case 'payment.completed':
        console.log('💰 Payment completed:', event.data);
        // Handle successful payment
        break;

      case 'payment.failed':
        console.log('❌ Payment failed:', event.data);
        // Handle failed payment
        break;

      case 'subscription.created':
        console.log('🎉 Subscription created:', event.data);
        // Handle new subscription
        break;

      default:
        console.log('📨 Unhandled event type:', event.type as string);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 400 }
    );
  }
}
