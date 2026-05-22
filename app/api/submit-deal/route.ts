import { createClient } from '@supabase/supabase-js'
import { NextResponse, NextRequest } from 'next/server'
import { rateLimit } from '@/lib/auth/middleware'

// 5 submissions per IP per hour
const submitRateLimit = rateLimit({ maxRequests: 5, windowMs: 60 * 60 * 1000 })

// Helpers
function isValidUrl(url: string): boolean {
    try {
        const u = new URL(url)
        return u.protocol === 'http:' || u.protocol === 'https:'
    } catch {
        return false
    }
}

function sanitize(s: any, max = 500): string {
    if (typeof s !== 'string') return ''
    return s.trim().slice(0, max)
}

const ALLOWED_CATEGORIES = ['cloud', 'saas', 'marketing', 'hiring', 'legal', 'other']

function validateSubmission(data: any): string | null {
    if (!data.company_name || data.company_name.length < 2 || data.company_name.length > 120) {
        return 'Company name is required (2–120 characters)'
    }
    if (!data.website_url || !isValidUrl(data.website_url)) {
        return 'A valid website URL is required (must start with https://)'
    }
    if (!data.benefit_description || data.benefit_description.length < 10 || data.benefit_description.length > 2000) {
        return 'Benefit description must be between 10–2000 characters'
    }
    if (!data.category || !ALLOWED_CATEGORIES.includes(data.category)) {
        return 'Please select a valid category'
    }
    if (!data.deal_value || data.deal_value.length > 100) {
        return 'Deal value is required (max 100 characters)'
    }
    if (!data.redemption_link || !isValidUrl(data.redemption_link)) {
        return 'A valid redemption link is required'
    }
    if (data.submitter_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.submitter_email)) {
        return 'Invalid submitter email format'
    }
    if (data.logo_url && data.logo_url.length > 0 && !isValidUrl(data.logo_url)) {
        return 'Logo URL must be valid'
    }
    return null
}

function getServiceRoleClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!url || !serviceKey) return null

    return createClient(url, serviceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
    })
}

export async function POST(request: NextRequest) {
    try {
        // Rate limit by IP
        const ip =
            request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
            request.headers.get('x-real-ip') ||
            'unknown'
        const userAgent = request.headers.get('user-agent') || 'unknown'

        const rateLimitResult = submitRateLimit(ip)
        if (!rateLimitResult.allowed) {
            return NextResponse.json(
                { error: 'Too many submissions from this IP. Try again in an hour.' },
                { status: 429 }
            )
        }

        const body = await request.json()

        // ── Anti-bot layer 1: honeypot ──
        // The form has a hidden 'website_link' input that real users won't fill.
        // Bots typically auto-fill every field.
        if (body.website_link && body.website_link.length > 0) {
            // Silently accept (don't reveal it's a honeypot) but mark as spam
            console.warn('Honeypot triggered from IP:', ip)
            return NextResponse.json({ success: true }, { status: 201 })
        }

        // ── Anti-bot layer 2: minimum time to submit ──
        // The form sends a 'submitted_at' relative to when the form was loaded.
        // Real users take >3 seconds to fill the form; bots submit in <1s.
        if (typeof body.fill_time_ms === 'number' && body.fill_time_ms < 3000) {
            console.warn('Too-fast submission from IP:', ip, 'ms:', body.fill_time_ms)
            return NextResponse.json(
                { error: 'Please take a moment before submitting.' },
                { status: 400 }
            )
        }

        // ── Validation ──
        const validationError = validateSubmission(body)
        if (validationError) {
            return NextResponse.json({ error: validationError }, { status: 400 })
        }

        // ── Insert with service-role client (bypasses RLS) ──
        const supabase = getServiceRoleClient()
        if (!supabase) {
            console.error('Submit-deal: SUPABASE_SERVICE_ROLE_KEY is not configured')
            return NextResponse.json(
                { error: 'Submission system is temporarily unavailable. Please contact support.' },
                { status: 503 }
            )
        }

        const payload = {
            company_name: sanitize(body.company_name, 120),
            website_url: sanitize(body.website_url, 500),
            logo_url: body.logo_url ? sanitize(body.logo_url, 500) : null,
            benefit_description: sanitize(body.benefit_description, 2000),
            category: sanitize(body.category, 50),
            deal_value: sanitize(body.deal_value, 100),
            redemption_method: sanitize(body.redemption_method || 'link', 20),
            redemption_link: sanitize(body.redemption_link, 500),
            is_exclusive: !!body.is_exclusive,
            submitter_email: body.submitter_email ? sanitize(body.submitter_email, 255) : null,
            submitter_ip: ip,
            user_agent: userAgent.slice(0, 500),
            status: 'pending' as const,
            featured_requested: !!body.featured_requested,
        }

        const { data, error: dbError } = await supabase
            .from('deal_submissions')
            .insert(payload)
            .select('id')
            .single()

        if (dbError) {
            console.error('❌ deal_submissions insert error:', dbError)
            // Differentiate missing-table vs other errors so we can fix fast
            if (dbError.code === '42P01') {
                return NextResponse.json(
                    { error: 'Submissions table not initialized. Please contact support.' },
                    { status: 503 }
                )
            }
            return NextResponse.json(
                { error: 'Could not save submission. Please try again or email hello@foundersprime.com.' },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true, id: data?.id }, { status: 201 })
    } catch (error: any) {
        console.error('❌ Submit-deal API error:', error)
        return NextResponse.json(
            { error: 'Internal server error. Please try again.' },
            { status: 500 }
        )
    }
}
