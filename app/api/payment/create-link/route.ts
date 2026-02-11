import DodoPayments from 'dodopayments';
import { NextResponse } from 'next/server';

// Check if environment variables are set
const DODO_API_KEY = process.env.DODO_PAYMENTS_API_KEY || '';
const DODO_ENV = process.env.DODO_PAYMENTS_ENVIRONMENT as 'test_mode' | 'live_mode' || 'test_mode';

const client = DODO_API_KEY ? new DodoPayments({
  bearerToken: DODO_API_KEY,
  environment: DODO_ENV,
}) : null;

// TODO: Replace with ACTUAL Product IDs provided by user
// Actual Product IDs provided by user
const PRODUCTS: Record<string, string> = {
  monthly: "pdt_0NXSovAmBrXoKozax8uOu",
  annual: "pdt_0NXSpHzkJ3MjXA2DgiCov",
  lifetime: "pdt_0NXSpKlBKeUhNzCWJ4Pxd"
};

export async function POST(request: Request) {
  try {
    // Check if client is initialized
    if (!client) {
      return NextResponse.json({ error: 'Payment system not configured. Please contact support.' }, { status: 500 });
    }

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
          quantity: 1,
        },
      ],
      payment_link_mode: true,
      customer: {
        email: customerEmail,
      },
    };

    const createPaymentSession = await (client as any).misc.createPaymentSession(sessionPayload); 
        const checkoutUrl = createPaymentSession.payment_link as string;

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error('Error creating payment link:', error);
    return NextResponse.json(
      { error: 'Failed to create payment link' },
      { status: 500 }
    );
  }
}
