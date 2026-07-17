'use client'

import { Suspense, useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import BrandLogo from '@/components/ui/BrandLogo'
import Mandala from '@/components/ui/Mandala'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const loginPartners = [
  { name: 'AWS', domain: 'aws.amazon.com' },
  { name: 'Google Cloud', domain: 'cloud.google.com' },
  { name: 'Stripe', domain: 'stripe.com' },
  { name: 'Notion', domain: 'notion.so' },
  { name: 'OpenAI', domain: 'openai.com' },
  { name: 'Vercel', domain: 'vercel.com' },
  { name: 'Supabase', domain: 'supabase.com' },
  { name: 'Figma', domain: 'figma.com' },
  { name: 'HubSpot', domain: 'hubspot.com' },
  { name: 'DigitalOcean', domain: 'digitalocean.com' },
]

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || searchParams.get('next') || '/dashboard'
  const errorParam = searchParams.get('error')
  const viewParam = searchParams.get('view')
  const supabaseConfigured = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'http://localhost:54321' &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'placeholder-anon-key'
  )

  const [view, setView] = useState<'login' | 'signup' | 'forgot' | 'mfa'>(
    (viewParam === 'signup' || viewParam === 'login' || viewParam === 'forgot' || viewParam === 'mfa') ? viewParam : 'login'
  )
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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

  // Sync view state if the query parameter changes dynamically
  useEffect(() => {
    const v = searchParams.get('view')
    if (v === 'signup' || v === 'login' || v === 'forgot' || v === 'mfa') {
      setView(v)
    }
  }, [searchParams])

  // Note: Google now uses the same signInWithOAuth redirect flow as GitHub/LinkedIn.
  // The previous GSI (One Tap) approach used an invisible iframe overlay that broke
  // when Cloudflare blocked accounts.google.com resources or the parent had overflow-hidden.

  // Turnstile state
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const turnstileRef = useRef<TurnstileInstance>(null)

  // MFA state
  const [mfaCode, setMfaCode] = useState('')
  const [mfaFactorId, setMfaFactorId] = useState<string | null>(null)
  const [mfaChallengeId, setMfaChallengeId] = useState<string | null>(null)



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
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider === 'linkedin' ? 'linkedin_oidc' : provider,
        options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirect)}` },
      })
      if (error) setError(error.message)
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
            setMfaFactorId(verifiedFactor.id)
            setMfaChallengeId(challenge.id)
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
        redirectTo: `${window.location.origin}/auth/reset-password`,
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

      if (mfaChallengeId && mfaFactorId && !isStub) {
        const { error } = await supabase.auth.mfa.verify({
          factorId: mfaFactorId,
          challengeId: mfaChallengeId,
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

  const handleToggleView = (newView: 'login' | 'signup' | 'forgot' | 'mfa') => {
    setError(null)
    setSuccessMsg(null)
    setTurnstileToken(null)
    turnstileRef.current?.reset()
    setView(newView)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#000000] text-gray-900 dark:text-white transition-colors duration-300 selection:bg-accent-yellow selection:text-black relative">
      <Header />

      <main className="flex-grow flex items-center justify-center py-10 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,234,0,0.03),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000]/40 to-[#000000] pointer-events-none" />

        {/* Floating Mandalas for premium branding background */}
        <Mandala
          variant="orbital"
          colorClass="text-accent-yellow"
          opacity={0.06}
          speed={100}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] pointer-events-none"
        />
        <Mandala
          variant="rings"
          colorClass="text-accent-yellow"
          opacity={0.04}
          speed={140}
          direction="ccw"
          className="absolute -bottom-32 -left-32 w-[450px] h-[450px] pointer-events-none"
        />

        <div className="max-w-[1100px] w-full mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Panel — Branding */}
          <div className="hidden lg:flex lg:col-span-6 text-white flex-col justify-center gap-6 relative overflow-hidden backdrop-blur-sm pr-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-neutral-900/80 border border-neutral-800 rounded-full px-3 py-1 text-[10px] font-mono mb-4">
                <span className="flex items-center gap-1.5 text-accent-yellow font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-accent-yellow rounded-full animate-pulse" />
                  Live Terminal
                </span>
                <span className="w-px h-3 bg-neutral-800 mx-1" />
                <span className="text-gray-400">Built for modern builders & founders</span>
              </div>

              <h2 className="font-mono text-3xl xl:text-4xl font-black leading-tight mb-4 uppercase tracking-tight">
                SHIP FASTER.<br />SPEND <span className="text-accent-yellow">SMARTER.</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-sans mb-6">
                Ship in days, not weeks. Stop burning precious capital on your stack when you can leverage <span className="text-accent-yellow font-bold font-mono">up to $500K+</span> in verified startup credits, perks, and grants.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 max-w-md">
              <div className="flex items-center gap-2.5 p-3 bg-neutral-900/40 border border-neutral-900 rounded-lg">
                <span className="material-symbols-outlined text-accent-yellow text-lg flex-shrink-0">redeem</span>
                <div>
                  <p className="text-[10px] font-black text-white uppercase tracking-wider font-mono">Up to $500K+</p>
                  <p className="text-[9px] text-gray-500 font-mono leading-none mt-0.5">In Credits</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-neutral-900/40 border border-neutral-900 rounded-lg">
                <span className="material-symbols-outlined text-emerald-400 text-lg flex-shrink-0">verified</span>
                <div>
                  <p className="text-[10px] font-black text-white uppercase tracking-wider font-mono">Verified</p>
                  <p className="text-[9px] text-gray-500 font-mono leading-none mt-0.5">Deals & Grants</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-neutral-900/40 border border-neutral-900 rounded-lg">
                <span className="material-symbols-outlined text-purple-400 text-lg flex-shrink-0">shield_lock</span>
                <div>
                  <p className="text-[10px] font-black text-white uppercase tracking-wider font-mono">Founder</p>
                  <p className="text-[9px] text-gray-500 font-mono leading-none mt-0.5">Vetted Only</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-neutral-900/40 border border-neutral-900 rounded-lg">
                <span className="material-symbols-outlined text-cyan-400 text-lg flex-shrink-0">bolt</span>
                <div>
                  <p className="text-[10px] font-black text-white uppercase tracking-wider font-mono">Save $50K+</p>
                  <p className="text-[9px] text-gray-500 font-mono leading-none mt-0.5">In 3 Months</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0c0c0e] to-black border border-white/5 p-5 rounded-xl relative max-w-md mb-8 group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-yellow/5 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity group-hover:opacity-100 opacity-50"></div>
              <div className="flex items-start gap-3.5 relative z-10">
                <div className="flex-shrink-0 w-8 h-8 rounded bg-accent-yellow/10 border border-accent-yellow/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-accent-yellow text-sm">local_fire_department</span>
                </div>
                <div>
                  <h3 className="font-mono text-xs font-black uppercase text-white tracking-wider mb-1.5">Unlock Premium Benefits</h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Instantly save runway with discounts on <span className="text-white font-bold">AWS</span>, <span className="text-white font-bold">OpenAI</span>, <span className="text-white font-bold">Stripe</span>, and <span className="text-white font-bold">Google Cloud</span>. No pitch decks, no interviews, no equity dilution.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-900 overflow-hidden max-w-md">
              <div className="flex items-center gap-3 mb-3.5">
                <div className="flex-1 h-px bg-neutral-900" />
                <span className="text-[8.5px] font-mono font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">TRUSTED BY FOUNDERS WHO USE</span>
                <div className="flex-1 h-px bg-neutral-900" />
              </div>
              <div className="relative w-full overflow-hidden mask-gradient-x opacity-65 hover:opacity-95 transition-opacity duration-300">
                <div className="flex gap-6 animate-login-marquee whitespace-nowrap items-center py-1">
                  {[...loginPartners, ...loginPartners].map((partner, index) => (
                    <div key={`${partner.name}-${index}`} className="flex items-center gap-1.5 flex-shrink-0">
                      <BrandLogo name={partner.name} domain={partner.domain} size="sm" eager />
                      <span className="font-mono text-[9px] font-bold text-gray-400 whitespace-nowrap">{partner.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel — Form */}
          <div className="lg:col-span-6 col-span-12 flex flex-col justify-center items-center relative">
            <div className="w-full max-w-[380px] login-fade-up relative z-10">
              <div className="bg-white/80 dark:bg-[#09090b]/80 border border-gray-200 dark:border-white/5 rounded-xl px-5 py-5 shadow-xl dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] backdrop-blur-2xl relative overflow-hidden">
                
                {/* Subtle sheen on the card */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 bg-accent-yellow/10 border border-accent-yellow/20 text-accent-yellow font-mono text-[9px] font-black px-2.5 py-1 mb-3.5 uppercase tracking-wider rounded-full">
                  <span className="material-symbols-outlined !text-[10px] fill-current">lock</span>
                  {view === 'mfa' ? 'Security Gate' : 'Members area'}
                </div>

                {/* Local config warning */}
                {mounted && !supabaseConfigured && (
                  <div className="mb-3.5 p-3 bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2">
                    <span className="material-symbols-outlined text-sm">warning</span>
                    <div className="flex-1 space-y-1">
                      <p className="font-bold">Supabase is not configured for local login</p>
                      <p className="text-amber-100/80">
                        Add <code className="font-mono text-[10px]">NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
                        <code className="font-mono text-[10px]">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to{' '}
                        <code className="font-mono text-[10px]">.env.local</code>, then restart{' '}
                        <code className="font-mono text-[10px]">npm run dev</code>.
                      </p>
                    </div>
                  </div>
                )}

                {/* Error alerts */}
                {(error || errorParam) && (
                  <div className="mb-3.5 p-3 bg-red-950/45 border border-red-900/50 text-red-400 text-xs flex items-start gap-2">
                    <span className="material-symbols-outlined text-sm">error</span>
                    <div className="flex-1">
                      <p>{error || errorParam}</p>
                      {needsVerification && (
                        <button
                          type="button"
                          onClick={handleResendVerification}
                          disabled={resending}
                          className="mt-2 inline-flex items-center gap-1.5 font-bold underline hover:no-underline disabled:opacity-50"
                        >
                          {resending ? 'Sending…' : 'Resend verification email'}
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {resendMsg && (
                  <div className="mb-3.5 p-3 bg-green-950/45 border border-green-900/50 text-green-400 text-xs flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">mark_email_read</span>
                    {resendMsg}
                  </div>
                )}

                {successMsg && (
                  <div className="mb-3.5 p-3 bg-green-950/45 border border-green-900/50 text-green-400 text-xs flex items-start gap-2">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <p className="flex-1">{successMsg}</p>
                  </div>
                )}

                {/* Dynamic Card Forms */}
                {view === 'login' && (
                  <>
                    <div className="mb-3.5">
                      <h1 className="text-xl font-black uppercase font-mono mb-1 tracking-tight text-gray-900 dark:text-white">
                        Welcome back, <span className="text-accent-yellow">founder.</span>
                      </h1>
                      <p className="text-gray-500 dark:text-gray-400 text-[10px] font-mono">Sign in to your account to continue</p>
                    </div>

                    {/* OAuth buttons */}
                    <div className="grid grid-cols-3 gap-2 mb-3 font-mono text-[9px] font-bold uppercase">
                      <button type="button" onClick={() => handleOAuthLogin('google')} disabled={loading} className="h-9 border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/[0.02] hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 rounded flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 hover:border-gray-300 dark:hover:border-white/10">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                        Google
                      </button>

                      <button onClick={() => handleOAuthLogin('github')} disabled={loading} className="h-9 border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/[0.02] hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 rounded flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 hover:border-gray-300 dark:hover:border-white/10">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        GitHub
                      </button>
                      <button onClick={() => handleOAuthLogin('linkedin')} disabled={loading} className="h-9 border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/[0.02] hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 rounded flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 hover:border-gray-300 dark:hover:border-white/10">
                        <svg className="w-3.5 h-3.5" fill="#0077b5" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        LinkedIn
                      </button>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-1 h-px bg-gray-200 dark:bg-white/5" />
                      <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">or sign in with email</span>
                      <div className="flex-1 h-px bg-gray-200 dark:bg-white/5" />
                    </div>

                    <form onSubmit={handleSignInSubmit} className="space-y-2.5">
                      <div>
                        <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-wider font-mono mb-1.5 text-gray-500 dark:text-gray-400">Email Address</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">mail</span>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-[#0c0c0e] text-gray-900 dark:text-white text-xs font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:bg-white dark:focus:bg-black focus:border-accent-yellow/50 outline-none rounded transition-all"
                            placeholder="you@company.com"
                            required
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="current-password" className="block text-[10px] font-bold uppercase tracking-wider font-mono mb-1.5 text-gray-500 dark:text-gray-400">Password</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">lock</span>
                          <input
                            type={showPassword ? "text" : "password"}
                            id="current-password"
                            name="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-10 pl-10 pr-10 border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-[#0c0c0e] text-gray-900 dark:text-white text-xs font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:bg-white dark:focus:bg-black focus:border-accent-yellow/50 outline-none rounded transition-all"
                            placeholder="••••••••"
                            required
                            disabled={loading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">{showPassword ? 'visibility_off' : 'visibility'}</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input type="checkbox" className="w-3.5 h-3.5 border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-[#0c0c0e] accent-accent-yellow rounded" />
                          <span className="text-[11px] font-medium text-gray-550 dark:text-gray-400">Remember me</span>
                        </label>
                        <button type="button" onClick={() => handleToggleView('forgot')} className="text-[11px] font-bold text-accent-yellow hover:underline">Forgot password?</button>
                      </div>

                      {/* Cloudflare Turnstile */}
                      <div className="flex justify-center py-1">
                        {mounted && turnstileSiteKey && (
                          <Turnstile
                            ref={turnstileRef}
                            siteKey={turnstileSiteKey}
                            onSuccess={(token) => setTurnstileToken(token)}
                            onExpire={() => setTurnstileToken(null)}
                            onError={() => setTurnstileToken(null)}
                            options={{ theme: 'dark', size: 'flexible' }}
                          />
                        )}
                      </div>

                      <button type="submit" disabled={loading || !turnstileToken}
                        className="btn-shiny w-full h-11 bg-[#FFEA00] hover:bg-[#FFE000] shadow-[0_0_20px_rgba(255,234,0,0.4)] hover:shadow-[0_0_30px_rgba(255,234,0,0.6)] border border-[#FFEA00]/50 text-black font-black uppercase text-xs tracking-widest rounded-md font-mono transition-all duration-300 disabled:opacity-90 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 hover:-translate-y-0.5">
                        {loading ? (
                          <><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>Signing in...</>
                        ) : (
                          <>SIGN IN TO FOUNDERS[PRIME] <span className="material-symbols-outlined !text-[12px] font-black group-hover:translate-x-1 transition-transform">arrow_forward</span></>
                        )}
                      </button>
                    </form>

                    <div className="mt-4 pt-3 border-t border-white/5 text-center text-xs font-mono">
                      <span className="text-gray-500">New here? </span>
                      <button onClick={() => handleToggleView('signup')} className="text-accent-yellow font-black hover:underline inline-flex items-center gap-0.5 transition-all hover:gap-1">
                        Create an account <span className="material-symbols-outlined !text-[11px]">arrow_forward</span>
                      </button>
                    </div>
                  </>
                )}

                {view === 'signup' && (
                  <>
                    <div className="mb-3.5">
                      <h1 className="text-xl font-black uppercase font-mono mb-1 tracking-tight text-gray-900 dark:text-white">
                        Create your <span className="text-accent-yellow">account</span>
                      </h1>
                      <p className="text-gray-500 dark:text-gray-400 text-[10px] font-mono">Unlock the premium startup database</p>
                    </div>

                    <form onSubmit={handleSignupSubmit} className="space-y-2.5">
                      <div>
                        <label htmlFor="fullname" className="block text-[10px] font-bold uppercase tracking-wider font-mono mb-1.5 text-gray-555 dark:text-gray-400">Full Name</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">person</span>
                          <input
                            type="text"
                            id="fullname"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-[#0c0c0e] text-gray-900 dark:text-white text-xs font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:bg-white dark:focus:bg-black focus:border-accent-yellow/50 outline-none rounded transition-all"
                            placeholder="John Doe"
                            required
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-wider font-mono mb-1.5 text-gray-555 dark:text-gray-400">Email Address</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">mail</span>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-[#0c0c0e] text-gray-900 dark:text-white text-xs font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:bg-white dark:focus:bg-black focus:border-accent-yellow/50 outline-none rounded transition-all"
                            placeholder="you@company.com"
                            required
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="new-password" className="block text-[10px] font-bold uppercase tracking-wider font-mono mb-1.5 text-gray-555 dark:text-gray-400">Password</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">lock</span>
                          <input
                            type={showPassword ? "text" : "password"}
                            id="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-10 pl-10 pr-10 border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-[#0c0c0e] text-gray-900 dark:text-white text-xs font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:bg-white dark:focus:bg-black focus:border-accent-yellow/50 outline-none rounded transition-all"
                            placeholder="••••••••"
                            required
                            disabled={loading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">{showPassword ? 'visibility_off' : 'visibility'}</span>
                          </button>
                        </div>
                        <p className="text-[9px] text-gray-500 font-mono mt-1 leading-normal">
                          Min 8 characters, must include uppercase, lowercase, and a number
                        </p>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          id="agree"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="w-3.5 h-3.5 mt-0.5 border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-[#0c0c0e] accent-accent-yellow rounded"
                          required
                        />
                        <label htmlFor="agree" className="text-[11px] font-medium text-gray-500 dark:text-gray-400 leading-normal">
                          I agree to the <Link href="/terms" target="_blank" className="font-bold text-accent-yellow hover:underline">Terms of Service</Link> and <Link href="/privacy" target="_blank" className="font-bold text-accent-yellow hover:underline">Privacy Policy</Link>
                        </label>
                      </div>

                      {/* Cloudflare Turnstile */}
                      <div className="flex justify-center py-1">
                        {mounted && turnstileSiteKey && (
                          <Turnstile
                            ref={turnstileRef}
                            siteKey={turnstileSiteKey}
                            onSuccess={(token) => setTurnstileToken(token)}
                            onExpire={() => setTurnstileToken(null)}
                            onError={() => setTurnstileToken(null)}
                            options={{ theme: 'dark', size: 'flexible' }}
                          />
                        )}
                      </div>

                      <button type="submit" disabled={loading || !turnstileToken}
                        className="btn-shiny w-full h-11 bg-[#FFEA00] hover:bg-[#FFE000] shadow-[0_0_20px_rgba(255,234,0,0.4)] hover:shadow-[0_0_30px_rgba(255,234,0,0.6)] border border-[#FFEA00]/50 text-black font-black uppercase text-xs tracking-widest rounded-md font-mono transition-all duration-300 disabled:opacity-90 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 hover:-translate-y-0.5">
                        {loading ? (
                          <><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>Creating Account...</>
                        ) : (
                          <>CREATE ACCOUNT <span className="material-symbols-outlined !text-[12px] font-black group-hover:translate-x-1 transition-transform">arrow_forward</span></>
                        )}
                      </button>
                    </form>

                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-white/5 text-center text-xs font-mono">
                      <span className="text-gray-500">Already have an account? </span>
                      <button onClick={() => handleToggleView('login')} className="text-accent-yellow font-black hover:underline inline-flex items-center gap-0.5 transition-all hover:gap-1">
                        Sign in <span className="material-symbols-outlined !text-[11px]">arrow_forward</span>
                      </button>
                    </div>
                  </>
                )}

                {view === 'forgot' && (
                  <>
                    <div className="mb-3.5">
                      <h1 className="text-xl font-black uppercase font-mono mb-1 tracking-tight text-gray-900 dark:text-white">
                        Reset your <span className="text-accent-yellow">password</span>
                      </h1>
                      <p className="text-gray-500 dark:text-gray-400 text-[10px] font-mono">We will send you a secure recovery link</p>
                    </div>

                    <form onSubmit={handleForgotSubmit} className="space-y-2.5">
                      <div>
                        <label htmlFor="forgot-email" className="block text-[10px] font-bold uppercase tracking-wider font-mono mb-1.5 text-gray-555 dark:text-gray-400">Email Address</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">mail</span>
                          <input
                            type="email"
                            id="forgot-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-[#0c0c0e] text-gray-900 dark:text-white text-xs font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:bg-white dark:focus:bg-black focus:border-accent-yellow/50 outline-none rounded transition-all"
                            placeholder="you@company.com"
                            required
                            disabled={loading}
                          />
                        </div>
                      </div>

                      {/* Cloudflare Turnstile */}
                      <div className="flex justify-center py-1">
                        {mounted && turnstileSiteKey && (
                          <Turnstile
                            ref={turnstileRef}
                            siteKey={turnstileSiteKey}
                            onSuccess={(token) => setTurnstileToken(token)}
                            onExpire={() => setTurnstileToken(null)}
                            onError={() => setTurnstileToken(null)}
                            options={{ theme: 'dark', size: 'flexible' }}
                          />
                        )}
                      </div>

                      <button type="submit" disabled={loading || !turnstileToken}
                        className="btn-shiny w-full h-11 bg-[#FFEA00] hover:bg-[#FFE000] shadow-[0_0_20px_rgba(255,234,0,0.4)] hover:shadow-[0_0_30px_rgba(255,234,0,0.6)] border border-[#FFEA00]/50 text-black font-black uppercase text-xs tracking-widest rounded-md font-mono transition-all duration-300 disabled:opacity-90 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 hover:-translate-y-0.5">
                        {loading ? (
                          <><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>Sending...</>
                        ) : (
                          <>SEND RESET LINK <span className="material-symbols-outlined !text-[12px] font-black group-hover:translate-x-1 transition-transform">arrow_forward</span></>
                        )}
                      </button>

                      <div className="text-center pt-2">
                        <button type="button" onClick={() => handleToggleView('login')} className="text-[11px] font-bold text-accent-yellow hover:underline">
                          Back to Sign In
                        </button>
                      </div>
                    </form>
                  </>
                )}

                {view === 'mfa' && (
                  <>
                    <div className="mb-3.5">
                      <h1 className="text-xl font-black uppercase font-mono mb-1 tracking-tight text-gray-900 dark:text-white">
                        Two-Step <span className="text-accent-yellow">Verification</span>
                      </h1>
                      <p className="text-gray-500 dark:text-gray-400 text-[10px] font-mono">Enter the 6-digit code from your authenticator app</p>
                    </div>

                    <form onSubmit={handleMfaVerify} className="space-y-2.5">
                      <div>
                        <label htmlFor="mfa-code" className="block text-[10px] font-bold uppercase tracking-wider font-mono mb-1.5 text-gray-555 dark:text-gray-400">Verification Code</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">security</span>
                          <input
                            type="text"
                            id="mfa-code"
                            maxLength={6}
                            value={mfaCode}
                            onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                            className="w-full h-11 pl-10 pr-4 border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-[#0c0c0e] text-gray-900 dark:text-white text-center text-lg font-mono tracking-[0.3em] placeholder:text-gray-700 focus:bg-white dark:focus:bg-black focus:border-accent-yellow/50 outline-none rounded transition-all"
                            placeholder="000000"
                            required
                            disabled={loading}
                          />
                        </div>
                        <p className="text-[9px] text-gray-500 font-mono mt-2 leading-normal">
                          For testing purposes in local development, enter <span className="text-accent-yellow font-bold">123456</span>.
                        </p>
                      </div>

                      <button type="submit" disabled={loading}
                        className="btn-shiny w-full h-11 bg-[#FFEA00] hover:bg-[#FFE000] shadow-[0_0_20px_rgba(255,234,0,0.4)] hover:shadow-[0_0_30px_rgba(255,234,0,0.6)] border border-[#FFEA00]/50 text-black font-black uppercase text-xs tracking-widest rounded-md font-mono transition-all duration-300 disabled:opacity-90 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 hover:-translate-y-0.5">
                        {loading ? (
                          <><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>Verifying...</>
                        ) : (
                          <>VERIFY & ENTER <span className="material-symbols-outlined !text-[12px] font-black group-hover:translate-x-1 transition-transform">arrow_forward</span></>
                        )}
                      </button>

                      <div className="text-center pt-2">
                        <button type="button" onClick={() => handleToggleView('login')} className="text-[11px] font-bold text-accent-yellow hover:underline">
                          Cancel Verification
                        </button>
                      </div>
                    </form>
                  </>
                )}

                <div className="mt-3.5 p-2.5 bg-gray-50 dark:bg-neutral-950/80 border border-gray-200 dark:border-neutral-900/50 rounded flex items-start gap-2 text-[10px] text-gray-600 dark:text-gray-400 font-mono leading-normal">
                  <span className="material-symbols-outlined text-accent-yellow text-sm flex-shrink-0 mt-0.5">verified_user</span>
                  <div className="flex-1">
                    Your data is secure with enterprise-grade encryption. We never share your information.
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes loginMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-login-marquee {
          animation: loginMarquee 25s linear infinite;
        }
        .mask-gradient-x {
          mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
        }
        @keyframes loginFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .login-fade-up {
          animation: loginFadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .testimonial-card {
          animation: float 6s ease-in-out infinite;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .testimonial-card:hover {
          transform: translateY(-4px) scale(1.02);
          border-color: rgba(255, 215, 0, 0.3);
          box-shadow: 0 10px 30px -10px rgba(255, 215, 0, 0.15);
          animation-play-state: paused;
        }
        .testimonial-card:hover .hover-glow {
          opacity: 1;
        }
        .testimonial-card:hover .quote-mark {
          color: rgba(255, 215, 0, 0.6);
        }
        .testimonial-card:hover .avatar-img {
          transform: scale(1.1) rotate(5deg);
          border-color: rgba(255, 215, 0, 0.4);
        }
        @media (prefers-reduced-motion: reduce) {
          .login-fade-up, .testimonial-card, .animate-login-marquee {
            animation: none !important;
            transition: none;
          }
          .testimonial-card:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen w-full items-center justify-center bg-black"><span className="material-symbols-outlined animate-spin text-4xl text-accent-yellow">progress_activity</span></div>}>
      <LoginContent />
    </Suspense>
  )
}
