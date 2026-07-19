import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { sanitizeAuthRedirect } from '@/lib/auth/safe-redirect'

/**
 * OAuth + email recovery callback.
 * Exchanges ?code= for a session (PKCE), then redirects to `next`.
 * Password recovery should land on /login?view=reset with an active session
 * so updateUser({ password }) can write to Supabase Auth.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const tokenHash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  // Allowlist relative in-app paths only (blocks open redirects)
  const next = sanitizeAuthRedirect(searchParams.get('next') ?? '/dashboard')
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  if (error) {
    console.error('Auth callback error:', error, errorDescription)
    const dest =
      type === 'recovery' || next.includes('view=reset')
        ? `/login?view=forgot&error=${encodeURIComponent(errorDescription || error)}`
        : `/login?error=${encodeURIComponent(errorDescription || error)}`
    return NextResponse.redirect(`${origin}${dest}`)
  }

  const supabase = createClient()

  // PKCE code exchange (sign-in, signup confirm, password recovery)
  if (code) {
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (!exchangeError) {
      return NextResponse.redirect(`${origin}${next}`)
    }

    console.error('Code exchange error:', exchangeError)
    const dest =
      next.includes('view=reset') || type === 'recovery'
        ? `/login?view=forgot&error=${encodeURIComponent(exchangeError.message)}`
        : `/login?error=${encodeURIComponent(exchangeError.message)}`
    return NextResponse.redirect(`${origin}${dest}`)
  }

  // token_hash + type (some email templates)
  if (tokenHash && type) {
    const { error: otpError } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as 'recovery' | 'signup' | 'invite' | 'magiclink' | 'email',
    })

    if (!otpError) {
      const dest =
        type === 'recovery' ? '/login?view=reset' : next
      return NextResponse.redirect(`${origin}${dest}`)
    }

    console.error('OTP verify error:', otpError)
    return NextResponse.redirect(
      `${origin}/login?view=forgot&error=${encodeURIComponent(otpError.message)}`
    )
  }

  // No code — if recovery was intended, send to forgot; else login
  if (type === 'recovery' || next.includes('view=reset')) {
    return NextResponse.redirect(
      `${origin}/login?view=forgot&error=${encodeURIComponent('Reset link expired or invalid. Request a new one.')}`
    )
  }

  return NextResponse.redirect(
    `${origin}/login?error=${encodeURIComponent('No authorization code provided')}`
  )
}
