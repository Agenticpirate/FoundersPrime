import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const { id, action, admin_notes } = await request.json()

        if (!id || !action) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const supabase = createClient()

        // 🔒 SECURITY CHECK: Verify Admin Status
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized: Login required' }, { status: 401 })
        }

        const { data: adminUser } = await supabase
            .from('admin_users')
            .select('role')
            .eq('email', user.email)
            .single()

        if (!adminUser) {
            console.error(`🚨 Global Alert: Unauthorized admin access attempt by ${user.email}`)
            return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 })
        }

        // 1. Update Submission Status
        let newStatus = 'pending'
        if (action === 'approve') newStatus = 'approved'
        if (action === 'reject') newStatus = 'rejected'
        if (action === 'request_changes') newStatus = 'changes_requested'

        const { data: submission, error: updateError } = await supabase
            .from('deal_submissions')
            .update({ status: newStatus, admin_notes })
            .eq('id', id)
            .select()
            .single()

        if (updateError) {
            return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 })
        }

        // 2. If Approved, Create actual Deal record
        if (action === 'approve') {
            // Generate a basic slug
            const slug = submission.company_name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '') + '-' + Math.floor(Math.random() * 1000)

            const { error: insertError } = await supabase
                .from('deals')
                .insert({
                    slug: slug,
                    title: `${submission.company_name} Deal`, // Or prompt for title in UI
                    provider: submission.company_name,
                    category: submission.category,
                    description: submission.benefit_description,
                    value: submission.deal_value,
                    application_url: submission.redemption_link,
                    logo_url: submission.logo_url,
                    provider_website: submission.website_url,
                    status: 'active',
                    // Default values for required fields
                    eligibility: ['Startups'],
                    requirements: ['Valid business email'],
                    application_process: ['Click "Get Deal"', 'Follow instructions on provider site'],
                    source_verified: true,
                    data_source: 'submission'
                })

            if (insertError) {
                console.error('Deal Creation Error:', insertError)
                // Optionally revert submission status or flag error
                return NextResponse.json({ error: 'Failed to publish deal to public list' }, { status: 500 })
            }
        }

        // TODO: Send email notification to user about status update

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Admin API Error:', error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
