import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// ─── Helper: verify admin access ──────────────────────────────────────────────
async function verifyAdmin(): Promise<{ ok: boolean; email?: string; role?: string; error?: string; status?: number }> {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { ok: false, error: 'Unauthorized: Login required', status: 401 }

    const { data: adminUser } = await supabase
        .from('admin_users')
        .select('role')
        .eq('email', user.email)
        .single()

    if (!adminUser) {
        console.error(`🚨 Unauthorized admin access attempt by ${user.email}`)
        return { ok: false, error: 'Forbidden: Admin access required', status: 403 }
    }

    return { ok: true, email: user.email, role: adminUser.role }
}

// ─── Helper: service-role client (bypasses RLS for full read access) ──────────
function getServiceRoleClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) return null
    return createServiceClient(url, key, {
        auth: { autoRefreshToken: false, persistSession: false },
    })
}

// ─── GET: list submissions (admin only) ───────────────────────────────────────
export async function GET(request: Request) {
    try {
        const auth = await verifyAdmin()
        if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })

        const url = new URL(request.url)
        const status = url.searchParams.get('status') // e.g. 'pending'

        const supabase = getServiceRoleClient()
        if (!supabase) {
            return NextResponse.json(
                { error: 'Service role not configured. Set SUPABASE_SERVICE_ROLE_KEY.' },
                { status: 503 }
            )
        }

        let query = supabase
            .from('deal_submissions')
            .select('*')
            .order('created_at', { ascending: false })

        if (status) query = query.eq('status', status)

        const { data, error } = await query
        if (error) {
            console.error('❌ Admin list submissions error:', error)
            if (error.code === '42P01') {
                return NextResponse.json(
                    { error: 'deal_submissions table does not exist. Run the migration.' },
                    { status: 503 }
                )
            }
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ submissions: data || [] })
    } catch (error: any) {
        console.error('❌ Admin GET submissions error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

// ─── POST: review action (approve / reject / request_changes) ─────────────────
export async function POST(request: Request) {
    try {
        const { id, action, admin_notes } = await request.json()

        if (!id || !action) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const auth = await verifyAdmin()
        if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })

        const supabase = getServiceRoleClient()
        if (!supabase) {
            return NextResponse.json(
                { error: 'Service role not configured.' },
                { status: 503 }
            )
        }

        // 1. Update submission status
        let newStatus = 'pending'
        if (action === 'approve') newStatus = 'approved'
        else if (action === 'reject') newStatus = 'rejected'
        else if (action === 'request_changes') newStatus = 'changes_requested'
        else if (action === 'spam') newStatus = 'spam'

        const { data: submission, error: updateError } = await supabase
            .from('deal_submissions')
            .update({
                status: newStatus,
                admin_notes,
                reviewed_by: auth.email,
                reviewed_at: new Date().toISOString(),
            })
            .eq('id', id)
            .select()
            .single()

        if (updateError) {
            console.error('Submission update error:', updateError)
            return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 })
        }

        // 2. If approved, create the actual Deal record
        if (action === 'approve' && submission) {
            const slug =
                submission.company_name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)+/g, '') +
                '-' +
                Math.floor(Math.random() * 1000)

            // If they paid for Featured before approval, propagate the pin date.
            const featuredUntil = submission.featured_paid && submission.featured_until
                ? submission.featured_until
                : null

            // Coupon-code redemptions: the "Apply" button must point at a real
            // URL (the provider site), with the code surfaced in the description.
            // Link redemptions: use the redemption link directly.
            const isCode = (submission.redemption_method || 'link') === 'code'
            const applyUrl = isCode
                ? (submission.website_url || submission.redemption_link)
                : submission.redemption_link
            const codeNote = isCode && submission.redemption_link
                ? ` Use code: ${submission.redemption_link} at checkout.`
                : ''
            const fullDescription = `${submission.benefit_description || ''}${codeNote}`.trim()

            const { error: insertError } = await supabase.from('deals').insert({
                slug,
                title: `${submission.company_name} Deal`,
                provider: submission.company_name,
                category: submission.category,
                description: fullDescription,
                short_description: fullDescription.slice(0, 150),
                value: submission.deal_value,
                application_url: applyUrl,
                logo_url: submission.logo_url,
                provider_website: submission.website_url,
                status: 'active',
                eligibility: ['Startups'],
                requirements: ['Valid business email'],
                application_process: isCode
                    ? ['Click "Get Deal" to visit the provider', `Apply code ${submission.redemption_link} at checkout`]
                    : ['Click "Get Deal"', 'Follow instructions on provider site'],
                source_verified: true,
                data_source: 'submission',
                featured: !!featuredUntil,
                featured_until: featuredUntil,
            })

            if (insertError) {
                console.error('Deal Creation Error:', insertError)
                return NextResponse.json(
                    { error: 'Failed to publish deal to public list. Submission was marked approved but deal not published.' },
                    { status: 500 }
                )
            }
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Admin POST submissions error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
