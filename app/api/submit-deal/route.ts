import { createClient } from '@/lib/supabase/server'
import { NextResponse, NextRequest } from 'next/server'
import { rateLimit } from '@/lib/auth/middleware'

const submitRateLimit = rateLimit({ maxRequests: 5, windowMs: 60 * 60 * 1000 }) // 5 per hour per IP

// Helper: validate URL format
function isValidUrl(url: string): boolean {
    try { new URL(url); return true } catch { return false }
}

// Validation Schema
const validateSubmission = (data: any) => {
    if (!data.company_name || data.company_name.length > 120) return "Company name is required and must be under 120 characters"
    if (!data.website_url || !isValidUrl(data.website_url)) return "A valid website URL is required"
    if (!data.benefit_description || data.benefit_description.length < 10 || data.benefit_description.length > 2000) return "Benefit description must be between 10-2000 characters"
    if (!data.category) return "Category is required"
    if (!data.deal_value || data.deal_value.length > 100) return "Deal value is required and must be under 100 characters"
    if (!data.redemption_link || !isValidUrl(data.redemption_link)) return "A valid redemption link URL is required"
    if (data.submitter_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.submitter_email)) return "Invalid submitter email format"
    return null
}

export async function POST(request: NextRequest) {
    try {
        // Rate limit by IP
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown'
        const rateLimitResult = submitRateLimit(ip)
        if (!rateLimitResult.allowed) {
            return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 })
        }

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
                company_name: body.company_name.trim(),
                website_url: body.website_url.trim(),
                logo_url: body.logo_url?.substring(0, 500) || null,
                benefit_description: body.benefit_description.trim(),
                category: body.category,
                deal_value: body.deal_value.trim(),
                redemption_method: body.redemption_method || 'link',
                redemption_link: body.redemption_link.trim(),
                is_exclusive: !!body.is_exclusive,
                submitter_email: body.submitter_email?.trim() || null,
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
