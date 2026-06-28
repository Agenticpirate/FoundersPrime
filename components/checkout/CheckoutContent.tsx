'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth/hooks'

// Map old-style plan param names to the API's expected keys
const PLAN_KEY_MAP: Record<string, string> = {
  pro: 'founder',       // legacy "pro" → founder plan
  annual: 'founder',   // legacy "annual" → founder plan
  monthly: 'nextfounder',
  lifetime: 'legend',
  // Direct keys pass through unchanged
  nextfounder: 'nextfounder',
  founder: 'founder',
  legend: 'legend',
}

export default function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  // Dodo Payments return URL includes ?status={status}
  const returnStatus = searchParams.get('status')
  const isPaymentReturn = returnStatus !== null

  const rawPlan = searchParams.get('plan') || 'founder'
  const plan = PLAN_KEY_MAP[rawPlan] || 'founder'

  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [redirectCountdown, setRedirectCountdown] = useState(3)

  // ── Payment return flow ──────────────────────────────────────────────────────
  // When Dodo Payments redirects back here with ?status=, we handle it client-side.
  // This avoids the mobile SameSite=Lax cookie issue where /dashboard (server-rendered)
  // loses the session cookie on cross-site navigation and immediately redirects to /login.
  useEffect(() => {
    if (!isPaymentReturn) return
    if (authLoading) return

    // Give the client-side auth store a moment to re-hydrate from localStorage
    // before redirecting to dashboard (which checks server-side session).
    const timer = setInterval(() => {
      setRedirectCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer)
          router.replace('/dashboard')
          return 0
        }
        return c - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isPaymentReturn, authLoading, router])

  // ── Initiate checkout flow ───────────────────────────────────────────────────
  useEffect(() => {
    if (isPaymentReturn) return
    if (authLoading) return

    if (!user) {
      router.replace(`/login?redirect=/pricing`)
      return
    }

    const initiateCheckout = async () => {
      try {
        const response = await fetch('/api/payment/create-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan }),
        })

        const data = await response.json()

        if (response.status === 401) {
          router.replace('/login?redirect=/pricing')
          return
        }

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create payment link')
        }

        window.location.href = data.url
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        setError(message)
        setIsLoading(false)
      }
    }

    initiateCheckout()
  }, [plan, authLoading, user, router, isPaymentReturn])

  // ── Payment return UI ────────────────────────────────────────────────────────
  if (isPaymentReturn) {
    const succeeded = returnStatus === 'succeeded'
    return (
      <div className="max-w-md w-full mx-4 bg-[#0a0a0a] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-8 text-center">
        <div className="mb-6">
          <span className={`material-symbols-outlined text-5xl ${succeeded ? 'text-green-400' : 'text-red-400'}`}>
            {succeeded ? 'check_circle' : 'cancel'}
          </span>
        </div>

        <h1 className="font-mono text-xl font-black uppercase tracking-[0.08em] text-white mb-3">
          {succeeded ? 'Payment Successful!' : 'Payment Failed'}
        </h1>

        <p className="text-sm text-gray-400 font-sans mb-6">
          {succeeded
            ? 'Welcome to FoundersPrime! Your subscription is now active.'
            : 'Something went wrong with your payment. Please try again.'}
        </p>

        {succeeded ? (
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full" />
            <p className="font-mono text-xs text-gray-500">
              Redirecting to your dashboard in {redirectCountdown}s...
            </p>
          </div>
        ) : (
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push('/pricing')}
              className="px-4 py-2 border border-white/20 text-white font-mono text-xs uppercase hover:bg-white/10 transition-colors"
            >
              Back to Pricing
            </button>
            <button
              onClick={() => router.push('/checkout?plan=' + rawPlan)}
              className="px-4 py-2 bg-accent-yellow text-black font-mono font-black text-xs uppercase hover:bg-yellow-400 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        <p className="mt-6 text-xs text-gray-600 font-mono">Secured by Dodo Payments</p>
      </div>
    )
  }

  // ── Initiating checkout UI ───────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="max-w-md w-full mx-4 bg-[#0a0a0a] border border-white/10 p-8 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="animate-spin h-8 w-8 border-2 border-white/20 border-t-white rounded-full" />
          <p className="font-mono text-sm text-gray-400 animate-pulse">Verifying session...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md w-full mx-4 bg-[#0a0a0a] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-8 text-center">
      <div className="mb-6">
        <span className="material-symbols-outlined text-5xl text-accent-yellow animate-pulse">sync_alt</span>
      </div>

      <h1 className="font-mono text-xl font-black uppercase tracking-[0.08em] text-white mb-3">
        Redirecting to Secure Checkout...
      </h1>

      {error ? (
        <div className="p-4 bg-red-500/10 border border-red-500/40 text-red-400 mt-4">
          <p className="font-mono font-bold flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            Checkout Error
          </p>
          <p className="mt-2 text-sm font-sans">{error}</p>
          <div className="mt-4 flex gap-3 justify-center">
            <button
              onClick={() => router.push('/pricing')}
              className="px-4 py-2 border border-white/20 text-white font-mono text-xs uppercase hover:bg-white/10 transition-colors"
            >
              Back to Pricing
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-accent-yellow text-black font-mono font-black text-xs uppercase hover:bg-yellow-400 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center my-6">
          <div className="animate-spin h-6 w-6 border-2 border-white/20 border-t-white rounded-full mb-4" />
          <p className="font-mono text-sm text-gray-400 animate-pulse">Creating secure session...</p>
        </div>
      )}

      <p className="mt-6 text-xs text-gray-600 font-mono">Secured by Dodo Payments</p>
    </div>
  )
}
