'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Currency } from '@/utils/currency'
import { useAuth } from '@/lib/auth/hooks'
import DodoPaymentsBadge from '@/components/ui/DodoPaymentsBadge'

interface PricingPlansProps {
  currency: Currency
}

type PlanId = 'nextfounder' | 'founder' | 'legend'

export default function PricingPlans({ currency }: PricingPlansProps) {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const handleCheckout = async (plan: PlanId) => {
    if (authLoading) return

    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()
    const currentUser = session?.user || user

    if (!currentUser) {
      router.push('/login?redirect=/pricing')
      return
    }

    setLoadingPlan(plan)
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }

      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`
      }

      const res = await fetch('/api/payment/create-link', {
        method: 'POST',
        headers,
        body: JSON.stringify({ plan }),
      })

      const contentType = res.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        alert(`Payment blocked (HTTP ${res.status}). Please contact support@foundersprime.com`)
        return
      }

      const data = await res.json()
      if (res.ok && data.url) {
        window.location.href = data.url
      } else if (res.status === 401) {
        router.push('/login?redirect=/pricing')
      } else {
        alert(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error('Payment fetch error:', err)
      alert(
        'Unable to reach payment server. This may be a network issue. Please try again or contact support@foundersprime.com'
      )
    } finally {
      setLoadingPlan(null)
    }
  }

  void currency

  return (
    <section className="relative py-5 md:py-10 px-3.5 sm:px-6 max-w-6xl mx-auto overflow-visible" id="plans">
      {/* Extra top padding so the Founder “Most popular” badge isn’t clipped */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-5 lg:gap-6 items-stretch pt-8 md:pt-10 overflow-visible">
        {/* ── Next Founder ── (order-2 on mobile so Founder lands first) */}
        <article className="group relative flex flex-col order-2 md:order-1 bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.08] hover:border-accent-yellow/40 rounded-2xl p-5 sm:p-6 md:p-7 transition-all duration-300 md:hover:-translate-y-1 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          />

          <div className="flex items-start justify-between gap-3 mb-5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-accent-yellow/12 border border-accent-yellow/25 flex items-center justify-center text-amber-700 dark:text-accent-yellow shrink-0">
                <span className="material-symbols-outlined !text-[20px]">school</span>
              </div>
              <div className="min-w-0">
                <h3 className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-gray-900 dark:text-white">
                  Next&apos;Founder
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">Students &amp; first builders</p>
              </div>
            </div>
            <span className="shrink-0 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 dark:text-red-400 font-mono text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider">
              Students
            </span>
          </div>

          <h4 className="font-mono text-[15px] md:text-base font-bold text-gray-900 dark:text-white leading-snug mb-1.5">
            Built for students shipping their first startup.
          </h4>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
            Active students and indie builders — no revenue or funding required.
          </p>

          <div className="mb-5">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-mono text-[40px] sm:text-[44px] font-black text-gray-900 dark:text-white leading-none tracking-tight">
                $1
              </span>
              <span className="font-mono text-base text-gray-400 dark:text-gray-500 line-through font-bold">
                $59
              </span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-gray-500">
                /yr
              </span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-accent-yellow/15 border border-accent-yellow/30 font-mono text-[10px] font-black text-amber-800 dark:text-accent-yellow uppercase tracking-wide">
              98% off · launch price
            </div>
          </div>

          <ul className="space-y-2.5 mb-6 flex-1">
            {[
              '1,000+ student discounts in one dashboard',
              'AI, cloud & SaaS credits for student builders',
              'Hackathons, fellowships & early-stage grants',
              'Dev tools matched to pre-revenue projects',
              'Opportunity Hub: internships & networks',
            ].map((feat) => (
              <li
                key={feat}
                className="flex items-start gap-2.5 text-[12.5px] text-gray-600 dark:text-gray-300"
              >
                <span
                  className="material-symbols-outlined !text-[15px] text-accent-yellow mt-0.5 shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <button
              type="button"
              onClick={() => handleCheckout('nextfounder')}
              disabled={loadingPlan === 'nextfounder'}
              className="w-full inline-flex items-center justify-center gap-2 h-12 min-h-[48px] px-4 font-mono font-black text-[11px] uppercase tracking-[0.12em] text-gray-900 dark:text-white border border-gray-900 dark:border-white/80 active:bg-gray-900 active:text-white dark:active:bg-white dark:active:text-black md:hover:bg-gray-900 md:hover:text-white dark:md:hover:bg-white dark:md:hover:text-black rounded-xl transition-all disabled:opacity-60"
            >
              <span>{loadingPlan === 'nextfounder' ? 'Redirecting…' : 'Start at $1'}</span>
              <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
            </button>
            <p className="mt-2.5 text-center text-[10px] text-gray-500 font-mono">
              Students only · Upgrade to Founder anytime
            </p>
          </div>
        </article>

        {/* ── Founder (highlighted) — first on mobile ── */}
        <article className="group relative flex flex-col order-1 md:order-2 bg-white dark:bg-[#0c0b08] border-2 border-accent-yellow/50 rounded-2xl p-5 sm:p-6 md:p-7 pt-8 transition-all duration-300 md:scale-[1.02] z-10 shadow-[0_12px_40px_rgba(255,213,0,0.08)] overflow-visible">
          {/* Badge sits above the card edge — parent uses overflow-visible + top padding */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap bg-accent-yellow text-black font-mono text-[9px] font-black uppercase tracking-[0.12em] px-3.5 py-1.5 rounded-full shadow-[2px_2px_0_#000] border border-black/10">
              Most popular
            </span>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-accent-yellow/15 border border-accent-yellow/30 flex items-center justify-center text-amber-800 dark:text-accent-yellow shrink-0">
              <span className="material-symbols-outlined !text-[20px]">rocket_launch</span>
            </div>
            <div>
              <h3 className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-gray-900 dark:text-white">
                Founder
              </h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">Full catalog access</p>
            </div>
          </div>

          <h4 className="font-mono text-[15px] md:text-base font-bold text-gray-900 dark:text-white leading-snug mb-1.5">
            Everything you need to scale.
          </h4>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
            Full catalog while you ship and grow — cloud, SaaS, grants, and more.
          </p>

          <div className="mb-5">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-mono text-[40px] sm:text-[44px] font-black text-gray-900 dark:text-white leading-none tracking-tight">
                $48
              </span>
              <span className="font-mono text-base text-gray-400 dark:text-gray-500 line-through font-bold">
                $149
              </span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-gray-500">
                /yr
              </span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent-yellow text-black font-mono text-[10px] font-black tracking-wide">
              <span className="material-symbols-outlined !text-[12px]">bolt</span>
              Typical save $3,000+ in year 1
            </div>
          </div>

          <ul className="space-y-2.5 mb-6 flex-1">
            <li className="flex items-start gap-2 text-[11px] font-mono font-bold uppercase tracking-wide text-gray-900 dark:text-white">
              <span className="material-symbols-outlined !text-[15px] shrink-0">add_circle</span>
              Everything in Next&apos;Founder, plus
            </li>
            {[
              'Cloud credits (AWS, GCP, Azure)',
              'SaaS catalog: HubSpot, Stripe, Intercom & 100+',
              'Unlimited claims across every category',
              'Funding & grants by stage and geography',
              'Accelerators, fellowships & programs',
              'Founder Vault resources & ideas hub',
            ].map((feat) => (
              <li
                key={feat}
                className="flex items-start gap-2.5 text-[12.5px] text-gray-600 dark:text-gray-300"
              >
                <span
                  className="material-symbols-outlined !text-[15px] text-accent-yellow mt-0.5 shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <button
              type="button"
              onClick={() => handleCheckout('founder')}
              disabled={loadingPlan === 'founder'}
              className="w-full inline-flex items-center justify-center gap-2 h-12 min-h-[48px] px-4 bg-accent-yellow active:bg-yellow-300 md:hover:bg-yellow-300 text-black font-mono font-black text-[11px] uppercase tracking-[0.12em] rounded-xl transition-all shadow-[0_4px_16px_rgba(255,213,0,0.2)] disabled:opacity-60"
            >
              <span>{loadingPlan === 'founder' ? 'Redirecting…' : 'Build as a Founder'}</span>
              <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
            </button>
            <p className="mt-2.5 text-center text-[10px] text-gray-500 font-mono">
              Instant access · Cancel anytime
            </p>
          </div>
        </article>

        {/* ── Legend ── */}
        <article className="group relative flex flex-col order-3 bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.08] hover:border-purple-400/40 rounded-2xl p-5 sm:p-6 md:p-7 transition-all duration-300 md:hover:-translate-y-1 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          />

          <div className="flex items-start justify-between gap-3 mb-5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-purple-500/12 border border-purple-500/25 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                <span className="material-symbols-outlined !text-[20px]">workspace_premium</span>
              </div>
              <div className="min-w-0">
                <h3 className="font-mono text-[11px] font-black uppercase tracking-[0.14em] text-gray-900 dark:text-white">
                  Legend
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">Lifetime access</p>
              </div>
            </div>
            <span className="shrink-0 rounded-full border border-accent-yellow/30 bg-accent-yellow/10 text-amber-800 dark:text-accent-yellow font-mono text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider">
              Lifetime
            </span>
          </div>

          <h4 className="font-mono text-[15px] md:text-base font-bold text-gray-900 dark:text-white leading-snug mb-1.5">
            Pay once. Keep access for life.
          </h4>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
            For founders building over the long haul — no renewals ever.
          </p>

          <div className="mb-5">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-mono text-[40px] sm:text-[44px] font-black text-gray-900 dark:text-white leading-none tracking-tight">
                $99
              </span>
              <span className="font-mono text-base text-gray-400 dark:text-gray-500 line-through font-bold">
                $299
              </span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-gray-500">
                once
              </span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-purple-500/12 border border-purple-500/25 font-mono text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-wide">
              67% off
            </div>
          </div>

          <ul className="space-y-2.5 mb-6 flex-1">
            <li className="flex items-start gap-2 text-[11px] font-mono font-bold uppercase tracking-wide text-gray-900 dark:text-white">
              <span className="material-symbols-outlined !text-[15px] shrink-0">add_circle</span>
              Everything in Founder — for life
            </li>
            {[
              'Locked-in lifetime access, no renewals',
              'Every future deal & catalog update included',
              'Lifetime Founder Vault, grants & programs',
              'Launch pricing — may rise or close later',
            ].map((feat) => (
              <li
                key={feat}
                className="flex items-start gap-2.5 text-[12.5px] text-gray-600 dark:text-gray-300"
              >
                <span
                  className="material-symbols-outlined !text-[15px] text-purple-500 dark:text-purple-400 mt-0.5 shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <button
              type="button"
              onClick={() => handleCheckout('legend')}
              disabled={loadingPlan === 'legend'}
              className="w-full inline-flex items-center justify-center gap-2 h-12 min-h-[48px] px-4 bg-gray-900 dark:bg-white text-white dark:text-black active:opacity-90 md:hover:bg-black dark:md:hover:bg-gray-100 font-mono font-black text-[11px] uppercase tracking-[0.12em] rounded-xl transition-all disabled:opacity-60"
            >
              <span>{loadingPlan === 'legend' ? 'Redirecting…' : 'Lock in Legend'}</span>
              <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
            </button>
            <p className="mt-2.5 text-center text-[10px] text-gray-500 font-mono">
              One-time payment · Lifetime updates
            </p>
          </div>
        </article>
      </div>

      {/* Trust + payments processor */}
      <div className="mt-8 md:mt-10 flex flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-mono text-gray-500 dark:text-gray-500">
          {['Secure checkout', 'Instant access', 'Cancel annual anytime'].map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined !text-[14px] text-accent-yellow">
                verified
              </span>
              {t}
            </span>
          ))}
        </div>

        <DodoPaymentsBadge />
      </div>
    </section>
  )
}
