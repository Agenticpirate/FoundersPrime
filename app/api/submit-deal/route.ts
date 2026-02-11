import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// Validation Schema (Simplistic for now, consider using Zod)
const validateSubmission = (data: any) => {
    if (!data.company_name) return "Company name is required"
    if (!data.website_url) return "Website URL is required"
    if (!data.benefit_description) return "Benefit description is required"
    if (!data.category) return "Category is required"
    if (!data.deal_value) return "Deal value is required"
    if (!data.redemption_link) return "Redemption link is required"
    if (!data.is_exclusive === undefined) return "Exclusivity confirmation is required"
    return null
}

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Validate data
        const error = validateSubmission(body)
        if (error) {
            return NextResponse.json({ error }, { status: 400 })
        }

        const supabase = createClient()

        // Insert into database
        const { data, error: dbError } = await supabase
            .from('deal_submissions')
            .insert({
                company_name: body.company_name,
                website_url: body.website_url,
                logo_url: body.logo_url,
                benefit_description: body.benefit_description,
                category: body.category,
                deal_value: body.deal_value,
                redemption_method: body.redemption_method || 'link',
                redemption_link: body.redemption_link,
                is_exclusive: body.is_exclusive,
                submitter_email: body.submitter_email,
                status: 'pending'
            })
            .select()
            .single()

        if (dbError) {
            console.error('Submission Insert Error:', dbError)
            return NextResponse.json(
                { error: 'Failed to save submission' },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true, data }, { status: 201 })
    } catch (error) {
        console.error('Submission API Error:', error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
