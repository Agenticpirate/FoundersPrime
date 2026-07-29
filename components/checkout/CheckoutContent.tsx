'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth/hooks'
import { createClient } from '@/lib/supabase/client'
import DodoPaymentsBadge from '@/components/ui/DodoPaymentsBadge'

// Map old-style plan param names to the API's expected keys.
const PLAN_KEY_MAP: Record<string, string> = {
  pro: 'founder',
  annual: 'founder',
  monthly: 'nextfounder',
  lifetime: 'legend',
  nextfounder: 'nextfounder',
  founder: 'founder',
  legend: 'legend',
}

function normalizeStoredPlan(value: string | null | undefined): string {
  if (value === 'explorer' || value === 'campus') return 'nextfounder'
  return value || 'free'
}

type ActivationState = 'checking' | 'active' | 'delayed'

export default function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  // Dodo Payments return URL includes ?status={status}.
  const returnStatus = searchParams.get('status')
  const isPaymentReturn = returnStatus !== null
  const paymentSucceeded = returnStatus === 'succeeded' || returnStatus === 'completed'

  const hasExpectedPlan = searchParams.has('plan')
  const rawPlan = searchParams.get('plan') || 'founder'
  const plan = PLAN_KEY_MAP[rawPlan] || 'founder'
  const checkoutReference = searchParams.get('checkout_ref')
  const returnTarget = `/checkout?${searchParams.toString()}`
  const userId = user?.id

  const [error, setError] = useState<string | null>(null)
  const [activationState, setActivationState] = useState<ActivationState>('checking')
  const [verificationRun, setVerificationRun] = useState(0)
  const [redirectCountdown, setRedirectCountdown] = useState(3)

  // A successful provider return is not proof of entitlement. Poll both the
  // RLS-protected row and the server-written checkout marker so an older
  // same-plan subscription cannot confirm a different payment.
  useEffect(() => {
    if (!isPaymentReturn || !paymentSucceeded || authLoading) return

    if (!userId) {
      setActivationState('delayed')
      return
    }

    const supabase = createClient()
    let cancelled = false
    let retryTimer: ReturnType<typeof setTimeout> | undefined
    let attempts = 0
    const maxAttempts = 20

    setActivationState('checking')

    const verifyEntitlement = async () => {
      attempts += 1
      const [subscriptionResult, authResult] = await Promise.all([
        supabase
          .from('user_subscriptions')
          .select('plan, status')
          .eq('user_id', userId)
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase.auth.getUser(),
      ])

      if (cancelled) return

      const activePlan = normalizeStoredPlan(subscriptionResult.data?.plan)
      const expectedPlanMatches = hasExpectedPlan && activePlan === plan
      const appMetadata = authResult.data.user?.app_metadata || {}
      const checkoutMatches = Boolean(
        checkoutReference &&
        appMetadata.foundersprime_last_checkout_reference === checkoutReference &&
        appMetadata.foundersprime_last_checkout_plan === plan
      )

      if (subscriptionResult.data && expectedPlanMatches && checkoutMatches) {
        setRedirectCountdown(3)
        setActivationState('active')
        return
      }

      if (attempts >= maxAttempts) {
        if (subscriptionResult.error || authResult.error) {
          console.error('Subscription confirmation failed', {
            subscriptionError: subscriptionResult.error?.message,
            authError: authResult.error?.message,
          })
        }
        setActivationState('delayed')
        return
      }

      retryTimer = setTimeout(verifyEntitlement, 1500)
    }

    void verifyEntitlement()

    return () => {
      cancelled = true
      if (retryTimer) clearTimeout(retryTimer)
    }
  }, [
    isPaymentReturn,
    paymentSucceeded,
    authLoading,
    userId,
    hasExpectedPlan,
    plan,
    checkoutReference,
    verificationRun,
  ])

  // Redirect only after the database confirms the paid entitlement.
  useEffect(() => {
    if (activationState !== 'active') return

    const timer = setInterval(() => {
      setRedirectCountdown((current) => (current <= 1 ? 0 : current - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [activationState])

  useEffect(() => {
    if (activationState !== 'active' || redirectCountdown > 0) return
    router.replace('/dashboard')
  }, [activationState, redirectCountdown, router])

  // Initiate checkout for authenticated users.
  useEffect(() => {
    if (isPaymentReturn || authLoading) return

    if (!user) {
      router.replace('/login?redirect=/pricing')
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
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    }

    void initiateCheckout()
  }, [plan, authLoading, user, router, isPaymentReturn])

  if (isPaymentReturn) {
    if (!paymentSucceeded) {
      return (
        <div className="max-w-md w-full mx-4 bg-[#0a0a0a] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-8 text-center">
          <span className="material-symbols-outlined mb-6 text-5xl text-red-400">cancel</span>
          <h1 className="font-mono text-xl font-black uppercase tracking-[0.08em] text-white mb-3">
            Payment Failed
          </h1>
          <p className="text-sm text-gray-400 font-sans mb-6">
            Something went wrong with your payment. No subscription has been activated.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              type="button"
              onClick={() => router.push('/pricing')}
              className="px-4 py-2 border border-white/20 text-white font-mono text-xs uppercase hover:bg-white/10 transition-colors"
            >
              Back to Pricing
            </button>
            <button
              type="button"
              onClick={() => router.push('/checkout?plan=' + rawPlan)}
              className="px-4 py-2 bg-accent-yellow text-black font-mono font-black text-xs uppercase hover:bg-yellow-400 transition-colors"
            >
              Try Again
            </button>
          </div>
          <div className="mt-6 flex justify-center">
            <DodoPaymentsBadge forceDarkWordmark className="!bg-white/[0.04] !border-white/10" />
          </div>
        </div>
      )
    }

    const isActive = activationState === 'active'
    const isDelayed = activationState === 'delayed'

    return (
      <div className="max-w-md w-full mx-4 bg-[#0a0a0a] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-8 text-center">
        <span
          className={`material-symbols-outlined mb-6 text-5xl ${
            isActive ? 'text-green-400' : isDelayed ? 'text-amber-400' : 'text-accent-yellow'
          }`}
        >
          {isActive ? 'check_circle' : isDelayed ? 'schedule' : 'sync'}
        </span>

        <h1 className="font-mono text-xl font-black uppercase tracking-[0.08em] text-white mb-3">
          {isActive ? 'Subscription Active' : isDelayed ? 'Activation Processing' : 'Payment Received'}
        </h1>

        <p className="text-sm text-gray-400 font-sans mb-6">
          {isActive
            ? 'Your paid membership has been confirmed and is ready to use.'
            : isDelayed
              ? 'Your payment returned successfully, but the membership is not confirmed yet. Check again shortly or contact support if this continues.'
              : 'We are confirming your paid membership. This normally takes only a few seconds.'}
        </p>

        {isActive ? (
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full" />
            <p className="font-mono text-xs text-gray-500">
              Redirecting to your dashboard in {redirectCountdown}s...
            </p>
          </div>
        ) : isDelayed ? (
          <div className="flex flex-wrap gap-3 justify-center">
            {user ? (
              <button
                type="button"
                onClick={() => setVerificationRun((run) => run + 1)}
                className="px-4 py-2 bg-accent-yellow text-black font-mono font-black text-xs uppercase hover:bg-yellow-400 transition-colors"
              >
                Check Again
              </button>
            ) : (
              <button
                type="button"
                onClick={() => router.push(`/login?redirect=${encodeURIComponent(returnTarget)}`)}
                className="px-4 py-2 bg-accent-yellow text-black font-mono font-black text-xs uppercase hover:bg-yellow-400 transition-colors"
              >
                Sign In to Verify
              </button>
            )}
            <a
              href="mailto:support@foundersprime.com?subject=Subscription%20Activation"
              className="px-4 py-2 border border-white/20 text-white font-mono text-xs uppercase hover:bg-white/10 transition-colors"
            >
              Contact Support
            </a>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full" />
            <p className="font-mono text-xs text-gray-500">Confirming subscription...</p>
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <DodoPaymentsBadge forceDarkWordmark className="!bg-white/[0.04] !border-white/10" />
        </div>
      </div>
    )
  }

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
              type="button"
              onClick={() => router.push('/pricing')}
              className="px-4 py-2 border border-white/20 text-white font-mono text-xs uppercase hover:bg-white/10 transition-colors"
            >
              Back to Pricing
            </button>
            <button
              type="button"
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

      <div className="mt-6 flex justify-center">
        <DodoPaymentsBadge forceDarkWordmark className="!bg-white/[0.04] !border-white/10" />
      </div>
    </div>
  )
}
