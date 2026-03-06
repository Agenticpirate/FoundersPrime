import DodoPayments from 'dodopayments';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const client = new DodoPayments({
    bearerToken: process.env.DODO_PAYMENTS_API_KEY,
    environment: process.env.DODO_PAYMENTS_ENVIRONMENT as 'test_mode' | 'live_mode',
});

// Actual Product IDs provided by user
const PRODUCTS: Record<string, string> = {
    monthly: "pdt_0NXSovAmBrXoKozax8uOu",
    annual: "pdt_0NXSpHZkJ3MjXA2DgiCoY",
    lifetime: "pdt_0NXSpXlBKeUhWZCWJ4Pxd"
};

export async function POST(request: Request) {
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
        console.error('Dodo Payment Error:', error);
        return NextResponse.json({ error: 'Payment creation failed' }, { status: 500 });
    }
}
