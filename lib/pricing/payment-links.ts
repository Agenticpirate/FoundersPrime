export const DODO_PAYMENT_LINKS = {
    // REPLACE THESE WITH YOUR ACTUAL DODO PAYMENT PRODUCT LINKS
    // You can find these in your Dodo Payments Dashboard -> Products -> Copy Link

    'pro-monthly': 'https://checkout.dodopayments.com/buy/YOUR_PRO_MONTHLY_ID',
    'pro-annual': 'https://checkout.dodopayments.com/buy/YOUR_PRO_ANNUAL_ID',
    'lifetime': 'https://checkout.dodopayments.com/buy/YOUR_LIFETIME_ID',
}

// Helper to get link by plan details
export function getPaymentLink(plan: string, period?: string | null) {
    if (plan === 'lifetime') return DODO_PAYMENT_LINKS.lifetime
    if (plan === 'pro') {
        return period === 'annual'
            ? DODO_PAYMENT_LINKS['pro-annual']
            : DODO_PAYMENT_LINKS['pro-monthly']
    }
    return null
}
