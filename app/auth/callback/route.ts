import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { sanitizeAuthRedirect } from '@/lib/auth/safe-redirect'
import { deliverSignupWelcomeEmail } from '@/lib/auth/signup-email'

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
    const { data: exchanged, error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code)

    if (!exchangeError) {
      // First-time accounts get the account-created email. Guarded to send once
      // per user, and never allowed to block or fail the redirect.
      if (exchanged?.user?.id && type !== 'recovery' && !next.includes('view=reset')) {
        await deliverSignupWelcomeEmail(exchanged.user.id)
      }
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
    const { data: verified, error: otpError } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as 'recovery' | 'signup' | 'invite' | 'magiclink' | 'email',
    })

    if (!otpError) {
      if (verified?.user?.id && type !== 'recovery') {
        await deliverSignupWelcomeEmail(verified.user.id)
      }
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
