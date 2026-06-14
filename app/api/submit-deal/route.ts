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

// Accept bare domains by prepending https:// so common user input
// ("example.com") doesn't fail validation. Leaves coupon codes untouched.
function normalizeUrl(value: any): any {
    if (typeof value !== 'string') return value
    const v = value.trim()
    if (!v) return v
    if (/^https?:\/\//i.test(v)) return v
    // Looks like a domain/path (has a dot, no spaces) → assume https
    if (/^[^\s]+\.[^\s]+$/.test(v) && !v.includes(' ')) return `https://${v}`
    return v
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
    // Redemption can be a URL ("link") or a coupon code ("code"). Only require a
    // valid URL when the method is link; codes are free-form text.
    const method = (data.redemption_method || 'link').toString()
    if (!data.redemption_link || data.redemption_link.toString().trim().length === 0) {
        return 'A redemption link or coupon code is required'
    }
    if (data.redemption_link.length > 300) {
        return 'Redemption link/code is too long (max 300 characters)'
    }
    if (method === 'link' && !isValidUrl(data.redemption_link)) {
        return 'Enter a valid redemption URL (must start with https://), or switch the method to Coupon Code'
    }
    if (data.submitter_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.submitter_email)) {
        return 'Invalid submitter email format'
    }
    // Logo is optional. Invalid/blob URLs are ignored at insert time rather than
    // failing the whole submission (see payload below).
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

        // Normalize bare-domain URLs (prepend https://) so legitimate input
        // like "example.com" doesn't fail validation. Coupon codes are left as-is.
        body.website_url = normalizeUrl(body.website_url)
        if ((body.redemption_method || 'link') === 'link') {
            body.redemption_link = normalizeUrl(body.redemption_link)
        }
        if (body.logo_url) body.logo_url = normalizeUrl(body.logo_url)

        // ── Anti-bot layer 2: minimum time to submit ──
        // Real users take more than a second to fill the form + solve the
        // captcha; instant submissions are bots. Kept conservative to avoid
        // false-positives for fast legitimate users (honeypot is the primary
        // defense).
        if (typeof body.fill_time_ms === 'number' && body.fill_time_ms < 1200) {
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
            logo_url: (body.logo_url && isValidUrl(body.logo_url)) ? sanitize(body.logo_url, 500) : null,
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
