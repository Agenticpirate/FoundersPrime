'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Mandala from '@/components/ui/Mandala'

function LoginContent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/dashboard'
  const errorParam = searchParams.get('error')

  const handleOAuthLogin = async (provider: 'google' | 'github' | 'linkedin') => {
    setError(null)
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/auth/callback?next=${redirect}` },
      })
      if (error) setError(error.message)
    } catch { setError('An unexpected error occurred') }
    finally { setLoading(false) }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    if (!email.trim()) { setError('Email is required'); setLoading(false); return }
    if (!password) { setError('Password is required'); setLoading(false); return }
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setError(error.message); return }
      router.push(redirect)
      router.refresh()
    } catch { setError('An unexpected error occurred') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-[45%] bg-black text-white flex-col justify-between p-10 xl:p-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        {/* Ambient mandala ornaments */}
        <Mandala variant="rings" colorClass="text-accent-yellow" opacity={0.12} speed={90} direction="cw" className="absolute -top-24 -right-24 w-80 h-80" />
        <Mandala variant="orbital" colorClass="text-white" opacity={0.08} speed={120} direction="ccw" className="absolute -bottom-28 -left-24 w-96 h-96" />
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-16">
            <img src="/logo.svg" alt="FoundersPrime" className="w-7 h-7 invert" />
            <span className="font-mono font-bold text-lg tracking-widest uppercase">FOUNDERS<span className="text-blue-400">[</span>PRIME<span className="text-blue-400">]</span></span>
          </Link>
          <h2 className="font-mono text-3xl xl:text-4xl font-black leading-tight mb-4">
            The unfair<br />advantage for<br /><span className="text-accent-yellow">modern founders.</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Access $500K+ in verified startup credits, grants, and tools. Join 5,000+ founders saving millions.
          </p>
        </div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-accent-yellow text-sm">verified</span>
            </div>
            <span className="text-sm text-gray-300">Hundreds of verified deals updated weekly</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-green-400 text-sm">groups</span>
            </div>
            <span className="text-sm text-gray-300">Trusted by YC, Techstars & 500 Global founders</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary text-sm">bolt</span>
            </div>
            <span className="text-sm text-gray-300">Average founder saves $50K+ in 3 months</span>
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex flex-col bg-white relative overflow-hidden grid-bg">
        {/* Mobile-only ambient mandalas (desktop uses the left branding panel) */}
        <Mandala variant="rings" colorClass="text-black" opacity={0.05} speed={90} direction="cw" className="lg:hidden absolute -top-20 -right-20 w-72 h-72" />
        <Mandala variant="petal" colorClass="text-accent-yellow" opacity={0.14} speed={110} direction="ccw" className="lg:hidden absolute -bottom-24 -left-24 w-80 h-80" />
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b-2 border-black relative z-10 bg-white">
          <Link href="/" className="inline-flex items-center gap-2">
            <img src="/logo.svg" alt="FoundersPrime" className="w-6 h-6" />
            <span className="font-mono font-bold text-sm tracking-widest uppercase">FOUNDERS<span className="text-blue-600">[</span>PRIME<span className="text-blue-600">]</span></span>
          </Link>
          <Link href="/" className="text-xs font-mono font-bold text-gray-500 hover:text-black uppercase">← Back</Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-8 md:px-12 relative z-10">
          <div className="w-full max-w-sm login-fade-up">
            {/* Mobile-only value banner */}
            <div className="lg:hidden mb-5 bg-black text-white border-2 border-black shadow-[4px_4px_0px_#FFD500] p-3 flex items-center gap-2.5">
              <span className="material-symbols-outlined text-accent-yellow text-xl flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              <p className="font-mono text-[11px] leading-snug font-bold">
                <span className="text-accent-yellow">$500K+</span> in verified credits, grants &amp; tools. Join <span className="text-accent-yellow">5,000+</span> founders.
              </p>
            </div>

            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono text-[9px] font-black px-2.5 py-1 mb-3 uppercase tracking-widest border-2 border-black shadow-[2px_2px_0px_#111]">
                <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                Members area
              </div>
              <h1 className="text-2xl md:text-3xl font-black uppercase font-mono mb-1 tracking-tight">Welcome back</h1>
              <p className="text-gray-500 text-sm">Sign in to your account to continue</p>
            </div>

            {/* OAuth buttons */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              <button onClick={() => handleOAuthLogin('google')} disabled={loading} className="h-11 border-2 border-black bg-white font-bold text-xs uppercase hover:bg-gray-50 flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#111] transition-all disabled:opacity-50">
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google
              </button>
              <button onClick={() => handleOAuthLogin('github')} disabled={loading} className="h-11 border-2 border-black bg-white font-bold text-xs uppercase hover:bg-gray-50 flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#111] transition-all disabled:opacity-50">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </button>
              <button onClick={() => handleOAuthLogin('linkedin')} disabled={loading} className="h-11 border-2 border-black bg-white font-bold text-xs uppercase hover:bg-gray-50 flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#111] transition-all disabled:opacity-50">
                <svg className="w-4 h-4" fill="#0077b5" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </button>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">or sign in with email</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {(error || errorParam) && (
              <div className="mb-4 p-3 bg-red-50 border-2 border-red-400 text-red-700 text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">error</span>
                {error || errorParam}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1.5 text-gray-700">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-3 border-2 border-black bg-gray-50 text-sm font-medium placeholder:text-gray-400 focus:bg-white focus:shadow-[3px_3px_0px_#111] outline-none transition-all"
                  placeholder="you@company.com" required disabled={loading} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase mb-1.5 text-gray-700">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 px-3 border-2 border-black bg-gray-50 text-sm font-medium placeholder:text-gray-400 focus:bg-white focus:shadow-[3px_3px_0px_#111] outline-none transition-all"
                  placeholder="••••••••" required disabled={loading} />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 border-2 border-black accent-black" />
                  <span className="text-xs font-medium text-gray-600">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-xs font-bold text-black hover:underline">Forgot?</Link>
              </div>

              <button type="submit" disabled={loading}
                className="w-full h-11 bg-black text-white font-bold uppercase text-sm border-2 border-black shadow-[3px_3px_0px_#111] hover:bg-accent-yellow hover:text-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#111] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? <><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>Signing in...</> : 'Sign In'}
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-gray-500">
              New here?{' '}<Link href="/signup" className="font-bold text-black hover:underline">Create an account</Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loginFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .login-fade-up {
          animation: loginFadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .login-fade-up {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen w-full items-center justify-center"><span className="material-symbols-outlined animate-spin text-4xl">progress_activity</span></div>}>
      <LoginContent />
    </Suspense>
  )
}
