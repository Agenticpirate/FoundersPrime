'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { TurnstileInstance } from '@marsidev/react-turnstile'
import { sanitizeAuthRedirect, sanitizeLoginView } from '@/lib/auth/safe-redirect'
import type { LoginView } from '@/components/auth/LoginAuthForms'

export function useLoginAuth() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // URL params are allowlisted — never trust raw redirect/view for privileged UI
  const redirect = sanitizeAuthRedirect(
    searchParams.get('redirect') || searchParams.get('next') || '/dashboard'
  )
  const errorParam = searchParams.get('error')
  const initialView = sanitizeLoginView(searchParams.get('view'))
  const supabaseConfigured = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'http://localhost:54321' &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'placeholder-anon-key'
  )

  const [view, setView] = useState<'login' | 'signup' | 'forgot' | 'mfa' | 'reset'>(initialView)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const passwordStrength = (() => {
    let s = 0
    if (password.length >= 8) s++
    if (/[A-Z]/.test(password)) s++
    if (/[0-9]/.test(password)) s++
    if (/[^A-Za-z0-9]/.test(password)) s++
    return s
  })()
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [needsVerification, setNeedsVerification] = useState(false)
  const [resending, setResending] = useState(false)
  const [resendMsg, setResendMsg] = useState<string | null>(null)

  const [mounted, setMounted] = useState(false)
  const [turnstileSiteKey, setTurnstileSiteKey] = useState('1x00000000000000000000AA')

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      const prodKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
      if (!isLocalhost && prodKey && prodKey !== '1x00000000000000000000AA') {
        setTurnstileSiteKey(prodKey)
      } else {
        setTurnstileSiteKey('')
        setTurnstileToken('bypass') // Auto-bypass if no valid key
      }
    }
  }, [])

  // Sync view state if the query parameter changes dynamically (allowlisted only)
  useEffect(() => {
    setView(sanitizeLoginView(searchParams.get('view')))
  }, [searchParams])

  // Establish recovery / reset session from email link (code, token_hash, or hash tokens)
  useEffect(() => {
    if (typeof window === 'undefined') return
    let cancelled = false

    const establish = async () => {
      const params = new URLSearchParams(window.location.search)
      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''))
      const isRecovery =
        params.get('view') === 'reset' ||
        params.get('type') === 'recovery' ||
        hashParams.get('type') === 'recovery' ||
        hashParams.has('access_token')

      if (!isRecovery && !params.get('code')) return

      const supabase = createClient()

      // 1) PKCE code on this page (if callback was skipped)
      const code = params.get('code')
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!cancelled) {
          if (error) {
            setError(error.message)
            setView('forgot')
          } else {
            setView('reset')
            setSuccessMsg(null)
          }
          window.history.replaceState({}, '', '/login?view=reset')
        }
        return
      }

      // 2) token_hash email link
      const tokenHash = params.get('token_hash')
      const type = params.get('type')
      if (tokenHash && type === 'recovery') {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: 'recovery',
        })
        if (!cancelled) {
          if (error) {
            setError(error.message)
            setView('forgot')
          } else {
            setView('reset')
          }
          window.history.replaceState({}, '', '/login?view=reset')
        }
        return
      }

      // 3) Implicit hash tokens — detectSessionInUrl on createClient picks these up
      if (hashParams.has('access_token') || hashParams.get('type') === 'recovery') {
        // Give the client a tick to parse the hash
        await new Promise((r) => setTimeout(r, 50))
        const { data: { session } } = await supabase.auth.getSession()
        if (!cancelled) {
          if (session) {
            setView('reset')
            window.history.replaceState({}, '', '/login?view=reset')
          } else {
            setView('reset') // still show form; submit will re-check
          }
        }
        return
      }

      if (params.get('view') === 'reset') {
        setView('reset')
      }
    }

    establish()
    return () => {
      cancelled = true
    }
  }, [searchParams])


  // Note: Google now uses the same signInWithOAuth redirect flow as GitHub/LinkedIn.
  // The previous GSI (One Tap) approach used an invisible iframe overlay that broke
  // when Cloudflare blocked accounts.google.com resources or the parent had overflow-hidden.

  // Turnstile state
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const turnstileRef = useRef<TurnstileInstance>(null)

  // MFA state — factor/challenge IDs only used in verify handler (refs avoid extra renders)
  const [mfaCode, setMfaCode] = useState('')
  const mfaFactorIdRef = useRef<string | null>(null)
  const mfaChallengeIdRef = useRef<string | null>(null)



  const handleOAuthLogin = async (provider: 'google' | 'github' | 'linkedin') => {
    setError(null)
    setLoading(true)
    if (!supabaseConfigured) {
      setError(
        'Local auth is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local, then restart npm run dev.'
      )
      setLoading(false)
      return
    }
    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider === 'linkedin' ? 'linkedin_oidc' : provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirect)}`,
          // Explicit navigation — more reliable than relying on default browser redirect alone
          skipBrowserRedirect: true,
        },
      })
      if (error) {
        setError(error.message)
        return
      }
      if (data?.url) {
        window.location.assign(data.url)
        return
      }
      setError('OAuth provider did not return a redirect URL. Check Supabase provider settings.')
    } catch { setError('An unexpected error occurred') }
    finally { setLoading(false) }
  }

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setNeedsVerification(false)
    setResendMsg(null)
    setLoading(true)

    if (!email.trim()) { setError('Email is required'); setLoading(false); return }
    if (!password) { setError('Password is required'); setLoading(false); return }
    if (!turnstileToken) { setError('Please complete the security verification'); setLoading(false); return }

    try {
      // Local without Supabase env — cannot create a real session
      if (!supabaseConfigured) {
        setError(
          'Local auth is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local (from Supabase project settings), then restart npm run dev.'
        )
        setLoading(false)
        return
      }

      const supabase = createClient()

      // Never send Turnstile bypass token to Supabase captcha — only real tokens
      const captchaOptions =
        turnstileToken && turnstileToken !== 'bypass'
          ? { captchaToken: turnstileToken }
          : undefined

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
        ...(captchaOptions ? { options: captchaOptions } : {}),
      })
      if (error) {
        const msg = error.message || ''
        if (/email not confirmed|not confirmed|confirm/i.test(msg)) {
          setNeedsVerification(true)
          setError('Your email isn\'t verified yet. Check your inbox, or resend the verification email below.')
        } else if (/invalid login credentials|invalid/i.test(msg)) {
          setError('Invalid email or password. Please try again.')
        } else if (/captcha|turnstile/i.test(msg)) {
          setError('Security check failed. Refresh the page and try again. On localhost Turnstile is optional.')
        } else {
          setError(msg || 'Unable to sign in. Please try again.')
        }
        return
      }

      // Check if MFA is active in Supabase
      const { data: mfaData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
      if (mfaData && mfaData.nextLevel === 'aal2' && mfaData.currentLevel !== 'aal2') {
        const { data: factors } = await supabase.auth.mfa.listFactors()
        const verifiedFactor = factors?.all?.find(f => f.status === 'verified')
        if (verifiedFactor) {
          const { data: challenge, error: challengeErr } = await supabase.auth.mfa.challenge({ factorId: verifiedFactor.id })
          if (challenge && !challengeErr) {
            mfaFactorIdRef.current = verifiedFactor.id
            mfaChallengeIdRef.current = challenge.id
            setView('mfa')
            setLoading(false)
            return
          }
        }
      }

      router.push(redirect)
      router.refresh()
    } catch { setError('An unexpected error occurred') }
    finally { setLoading(false) }
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMsg(null)
    setLoading(true)

    if (!fullName.trim() || fullName.trim().length < 2) {
      setError('Full name must be at least 2 characters')
      setLoading(false)
      return
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      setLoading(false)
      return
    }
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, and one number')
      setLoading(false)
      return
    }
    if (!agreeTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy')
      setLoading(false)
      return
    }
    if (!turnstileToken) {
      setError('Please complete the security verification')
      setLoading(false)
      return
    }

    try {
      if (!supabaseConfigured) {
        setError(
          'Local auth is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local, then restart npm run dev.'
        )
        setLoading(false)
        return
      }

      const supabase = createClient()
      const captchaToken =
        turnstileToken && turnstileToken !== 'bypass' ? turnstileToken : undefined

      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name: fullName.trim() },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          ...(captchaToken ? { captchaToken } : {}),
        },
      })

      if (error) {
        setError(error.message)
        return
      }

      setSuccessMsg('Account created successfully! Check your email to verify your account.')
      setFullName('')
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMsg(null)
    setLoading(true)

    if (!email.trim()) {
      setError('Email is required')
      setLoading(false)
      return
    }
    if (!turnstileToken) {
      setError('Please complete the security verification')
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const isStub = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (isStub) {
        setSuccessMsg(`Password reset link sent to ${email.trim()}. Please check your inbox.`)
        setLoading(false)
        return
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent('/login?view=reset')}`,
        captchaToken: turnstileToken,
      })

      if (error) {
        setError(error.message)
        return
      }

      setSuccessMsg(`Password reset link sent to ${email.trim()}. Please check your inbox.`)
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleMfaVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (mfaCode.length !== 6) {
      setError('Please enter a 6-digit verification code')
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const isStub = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (mfaChallengeIdRef.current && mfaFactorIdRef.current && !isStub) {
        const { error } = await supabase.auth.mfa.verify({
          factorId: mfaFactorIdRef.current,
          challengeId: mfaChallengeIdRef.current,
          code: mfaCode,
        })
        if (error) {
          setError(error.message)
          setLoading(false)
          return
        }
      } else {
        // Mock code: accept '123456' for demonstration
        if (mfaCode !== '123456') {
          setError('Invalid verification code. Enter "123456" for demo testing.')
          setLoading(false)
          return
        }
      }

      router.push(redirect)
      router.refresh()
    } catch {
      setError('Verification failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResendVerification = async () => {
    if (!email.trim()) { setError('Enter your email address first, then resend.'); return }
    setResending(true)
    setResendMsg(null)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim(),
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      })
      if (error) { setError(error.message) }
      else { setResendMsg('Verification email sent. Please check your inbox.') }
    } catch { setError('Could not resend the verification email. Please try again.') }
    finally { setResending(false) }
  }

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMsg(null)

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const supabase = createClient()
      const isStub = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (isStub) {
        setSuccessMsg('Password updated in local stub mode. Redirecting…')
        setTimeout(() => {
          router.push(redirect || '/dashboard')
          router.refresh()
        }, 1500)
        return
      }

      // Ensure session exists (recovery email link OR logged-in user changing password)
      let {
        data: { session },
      } = await supabase.auth.getSession()

      // One more attempt if hash/code was just processed
      if (!session) {
        const { data } = await supabase.auth.getUser()
        if (data.user) {
          const s = await supabase.auth.getSession()
          session = s.data.session
        }
      }

      if (!session) {
        setError('Your reset link expired or is invalid. Request a new one below.')
        setView('forgot')
        setLoading(false)
        return
      }

      // Writes hashed password to Supabase Auth (auth.users) — source of truth for login
      const { data: updated, error: updateError } = await supabase.auth.updateUser({
        password,
      })
      if (updateError) {
        setError(updateError.message)
        return
      }
      if (!updated?.user) {
        setError('Password could not be saved. Please try again or request a new link.')
        return
      }

      setSuccessMsg('Password updated successfully. You can sign in with your new password.')
      setPassword('')
      setConfirmPassword('')

      // Prefer dashboard if already signed in; otherwise login
      setTimeout(() => {
        router.push(redirect && redirect !== '/dashboard' ? redirect : '/dashboard')
        router.refresh()
      }, 1600)
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleView = (newView: 'login' | 'signup' | 'forgot' | 'mfa' | 'reset') => {
    setError(null)
    setSuccessMsg(null)
    setTurnstileToken(null)
    turnstileRef.current?.reset()
    setView(newView)
  }


  return {
    router,
    redirect,
    errorParam,
    view,
    setView,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    passwordStrength,
    fullName,
    setFullName,
    agreeTerms,
    setAgreeTerms,
    showPassword,
    setShowPassword,
    error,
    setError,
    successMsg,
    setSuccessMsg,
    loading,
    setLoading,
    needsVerification,
    resending,
    resendMsg,
    mounted,
    turnstileSiteKey,
    turnstileToken,
    setTurnstileToken,
    turnstileRef,
    mfaCode,
    setMfaCode,
    supabaseConfigured,
    handleOAuthLogin,
    handleSignInSubmit,
    handleSignupSubmit,
    handleForgotSubmit,
    handleMfaVerify,
    handleResendVerification,
    handleResetPasswordSubmit,
    handleToggleView,
  }
}
