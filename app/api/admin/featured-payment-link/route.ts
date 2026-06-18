import { createClient as createServiceClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import DodoPayments from 'dodopayments'
import { getFeaturedPlanConfig, resolveProductId, normalizeFeaturedPlan } from '@/lib/featured-plans'
import { verifyAdminServer as verifyAdmin } from '@/lib/admin/verify-admin-server'

function getServiceRoleClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) return null
    return createServiceClient(url, key, {
        auth: { autoRefreshToken: false, persistSession: false },
    })
}

function getDodoClient() {
    const apiKey = process.env.DODO_PAYMENTS_API_KEY
    const env = (process.env.DODO_PAYMENTS_ENVIRONMENT || 'test_mode') as 'test_mode' | 'live_mode'
    if (!apiKey) return null
    return new DodoPayments({ bearerToken: apiKey, environment: env })
}

/* ─── POST: generate Dodo checkout link for a Featured submission ─── */
export async function POST(request: Request) {
    try {
        const auth = await verifyAdmin()
        if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })

        const { submissionId, plan: planOverride } = await request.json()
        if (!submissionId) {
            return NextResponse.json({ error: 'submissionId is required' }, { status: 400 })
        }

        const supabase = getServiceRoleClient()
        if (!supabase) {
            return NextResponse.json({ error: 'Service role not configured' }, { status: 503 })
        }

        // Fetch the submission
        const { data: submission, error } = await supabase
            .from('deal_submissions')
            .select('*')
            .eq('id', submissionId)
            .single()

        if (error || !submission) {
            return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
        }

        if (!submission.featured_requested) {
            return NextResponse.json({ error: 'Submission did not request Featured listing' }, { status: 400 })
        }

        if (submission.featured_paid) {
            return NextResponse.json({ error: 'Featured listing already paid' }, { status: 400 })
        }

        if (submission.status !== 'approved') {
            return NextResponse.json({ error: 'Submission must be approved before generating payment link' }, { status: 400 })
        }

        // Generate Dodo checkout session
        const dodo = getDodoClient()
        if (!dodo) {
            return NextResponse.json({ error: 'Dodo Payments not configured' }, { status: 503 })
        }

        // Resolve the chosen plan: an explicit admin override wins, otherwise
        // use the plan the submitter selected (defaults to 'monthly').
        const planConfig = getFeaturedPlanConfig(
            planOverride ? normalizeFeaturedPlan(planOverride) : submission.featured_plan
        )
        const productId = resolveProductId(planConfig)
        if (!productId) {
            return NextResponse.json({ error: `Dodo product for ${planConfig.plan} plan not configured` }, { status: 503 })
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.foundersprime.com'

        const sessionPayload: any = {
            product_cart: [{ product_id: productId, quantity: 1 }],
            return_url: `${appUrl}/featured-thank-you?submission=${submissionId}`,
            customer: submission.submitter_email
                ? { email: submission.submitter_email }
                : undefined,
            metadata: {
                type: 'featured_listing',
                submission_id: submissionId,
                company_name: submission.company_name,
                featured_plan: planConfig.plan,
            },
        }

        const session = await dodo.checkoutSessions.create(sessionPayload)

        if (!session?.checkout_url) {
            console.error('Dodo session missing checkout_url:', session)
            return NextResponse.json({ error: 'Failed to generate payment link' }, { status: 500 })
        }

        // Persist session info on the submission so we can match the webhook back
        await supabase
            .from('deal_submissions')
            .update({
                featured_payment_id: session.session_id,
                featured_amount_cents: planConfig.amountCents,
                featured_plan: planConfig.plan,
                updated_at: new Date().toISOString(),
            })
            .eq('id', submissionId)

        return NextResponse.json({
            url: session.checkout_url,
            session_id: session.session_id,
            plan: planConfig.plan,
        })
    } catch (err: any) {
        console.error('❌ Featured payment link error:', err)
        const msg = err?.error?.message || err?.message || 'Internal Server Error'
        return NextResponse.json({ error: msg }, { status: 500 })
    }
}
