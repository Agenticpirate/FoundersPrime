import { NextResponse } from 'next/server';
import DodoPayments from 'dodopayments';

const client = new DodoPayments({
    bearerToken: process.env.DODO_PAYMENTS_API_KEY,
    environment: process.env.DODO_PAYMENTS_ENVIRONMENT as 'test_mode' | 'live_mode',
});

// Webhook Secret from Dodo Dashboard
const WEBHOOK_SECRET = process.env.DODO_PAYMENTS_WEBHOOK_SECRET;

export async function POST(request: Request) {
    if (!WEBHOOK_SECRET) {
        console.error('⚠️ DODO_PAYMENTS_WEBHOOK_SECRET is not set');
        return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
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
        switch (event.type) {
            case 'payment.succeeded':
                const payment = event.data;
                console.log('💰 Payment Succeeded:', {
                    paymentId: payment.payment_id,
                    amount: payment.total_amount,
                    currency: payment.currency,
                    customer: payment.customer,
                    metadata: payment.metadata
                });

                // TODO: Update user status in database
                // await db.users.update({ where: { email: payment.customer.email }, data: { plan: 'PRO' } })
                break;

            case 'payment.failed':
                console.log('❌ Payment Failed:', event.data.payment_id);
                break;

            default:
                console.log(`ℹ️ Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error('Webhook Error:', error.message);
        return NextResponse.json(
            { error: `Webhook handling failed: ${error.message}` },
            { status: 400 }
        );
    }
}
