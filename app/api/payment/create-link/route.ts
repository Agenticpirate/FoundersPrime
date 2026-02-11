import DodoPayments from 'dodopayments';
import { NextResponse } from 'next/server';

const client = new DodoPayments({
    bearerToken: process.env.DODO_PAYMENTS_API_KEY,
    environment: process.env.DODO_PAYMENTS_ENVIRONMENT as 'test_mode' | 'live_mode',
});

// TODO: Replace with ACTUAL Product IDs provided by user
// Actual Product IDs provided by user
const PRODUCTS: Record<string, string> = {
    monthly: "pdt_0NXSovAmBrXoKozax8uOu",
    annual: "pdt_0NXSpHZkJ3MjXA2DgiCoY",
    lifetime: "pdt_0NXSpXlBKeUhWZCWJ4Pxd"
};

export async function POST(request: Request) {
    try {
        const { plan, customerEmail } = await request.json();

        if (!plan || !PRODUCTS[plan]) {
            return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
        }

        const productId = PRODUCTS[plan];

        // Prepare session payload
        const sessionPayload: any = {
            product_cart: [
                {
                    product_id: productId,
                    quantity: 1
                }
            ],
            return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/dashboard?status={status}`,
        };

        // Only attach customer if we actually have an email
        if (customerEmail) {
            sessionPayload.customer = {
                email: customerEmail,
            };
        }

        // Create a Checkout Session
        const session = await client.checkoutSessions.create(sessionPayload);

        return NextResponse.json({
            url: session.checkout_url,
            payment_id: session.session_id
        });
    } catch (error: any) {
        console.error('Dodo Payment Error:', error);
        return NextResponse.json({ error: error.message || 'Payment creation failed' }, { status: 500 });
    }
}
