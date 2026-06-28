'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Currency } from '@/utils/currency'
import { useAuth } from '@/lib/auth/hooks'

interface PricingPlansProps {
  currency: Currency
}

export default function PricingPlans({ currency }: PricingPlansProps) {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const handleCheckout = async (plan: string) => {
    if (authLoading) return

    if (!user) {
      router.push('/login?redirect=/pricing')
      return
    }

    setLoadingPlan(plan)
    try {
      const res = await fetch('/api/payment/create-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })

      // Cloudflare WAF block returns HTML, not JSON — detect this case
      const contentType = res.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        // WAF block or unexpected response
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
      // fetch() itself threw — likely a CORS block or Cloudflare challenge page
      console.error('Payment fetch error:', err)
      alert('Unable to reach payment server. This may be a network issue. Please try again or contact support@foundersprime.com')
    } finally {
      setLoadingPlan(null)
    }
  }


  return (
    <section className="relative py-8 px-4 max-w-7xl mx-auto">
      {/* Three plans layout container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-8">
        
        {/* ── Next Founder Card ── */}
        <div className="group relative flex flex-col justify-between bg-white dark:bg-[#0b0c0e]/80 backdrop-blur-md border border-gray-200 dark:border-[#1b2028] hover:border-emerald-500/50 p-6 md:p-8 rounded-xl shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div>
            {/* Header row */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform flex-shrink-0">
                <span className="material-symbols-outlined !text-[22px]">school</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-mono text-xs font-black uppercase tracking-[0.1em] text-gray-900 dark:text-white">
                    NEXT&apos; FOUNDER
                  </h3>
                  <span className="flex-shrink-0 border border-red-500 text-red-400 font-mono text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider whitespace-nowrap">
                    STUDENTS
                  </span>
                </div>
              </div>
            </div>

            {/* Headline and Subline */}
            <h4 className="font-mono text-[16px] md:text-[17px] font-black text-gray-900 dark:text-white leading-[1.25] mb-1">
              Built for students building their first startup.
            </h4>
            <p className="text-[12.5px] text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              For active students, student indie hackers, and student founders who are just getting started — no revenue, no funding required.
            </p>

            {/* Price section */}
            <div className="my-5">
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-[42px] font-black text-gray-900 dark:text-white leading-none">$59</span>
                <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">/YR</span>
              </div>
            </div>

            <div className="h-px border-t border-gray-200 dark:border-white/10 my-4" />

            {/* Features list */}
            <ul className="space-y-3 my-5">
              {[
                'Premium AI & SaaS credits curated for student builders',
                'Student-exclusive hackathons, fellowships & campus programs',
                'Early-stage grants & non-dilutive funding for student founders',
                'Dev tools, discounts & credits matched to pre-revenue projects',
                'Opportunity Hub: internships, co-founders, and student networks',
              ].map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 text-[13px] text-gray-700 dark:text-gray-300">
                  <span className="material-symbols-outlined !text-[16px] text-gray-500 dark:text-gray-400 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span>{feat}</span>
                </li>
              ))}
              <li className="flex items-start gap-2.5 text-[13px] text-accent-yellow font-bold">
                <span className="material-symbols-outlined !text-[16px] text-accent-yellow mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span>Made for students, indie hackers & first-time founders still figuring it out</span>
              </li>
            </ul>
          </div>

          <div>
            {/* CTA */}
            <button
              onClick={() => handleCheckout('nextfounder')}
              disabled={loadingPlan === 'nextfounder'}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 font-mono font-black text-[12px] uppercase tracking-[0.1em] text-black dark:text-white border border-black dark:border-white hover:bg-black/5 dark:hover:bg-white/15 rounded-lg transition-all"
            >
              <span>{loadingPlan === 'nextfounder' ? 'REDIRECTING...' : 'START BUILDING FOR FREE*'}</span>
              <span className="material-symbols-outlined !text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            <p className="mt-3 text-center text-[10.5px] text-gray-500 dark:text-gray-400 font-mono">
              ★ Active students only · Upgrade to Founder anytime as you grow
            </p>
          </div>
        </div>

        {/* ── Founder Card (Growth) — Highlighted ── */}
        <div className="group relative flex flex-col justify-between bg-white dark:bg-[#0e0d0a]/95 backdrop-blur-md border-2 border-accent-yellow/45 p-6 md:p-8 rounded-xl shadow-[0_0_30px_rgba(255,213,0,0.05)] md:scale-[1.03] my-4 md:my-0 z-10 hover:border-accent-yellow transition-all duration-300">
          {/* Most popular badge — fixed, nowrap, full width pill */}
          <div className="absolute -top-4 left-0 right-0 flex justify-center z-20">
            <span className="inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono text-[9px] font-black uppercase tracking-[0.12em] px-4 py-1.5 rounded-full border border-black shadow-[2px_2px_0px_#000] whitespace-nowrap">
              ⭐ 8 in 10 founders choose this
            </span>
          </div>

          <div>
            {/* Header row */}
            <div className="flex items-center gap-3 mb-4 mt-3">
              <div className="w-10 h-10 bg-accent-yellow/10 border border-accent-yellow/20 rounded-lg flex items-center justify-center text-accent-yellow group-hover:scale-110 transition-transform flex-shrink-0">
                <span className="material-symbols-outlined !text-[22px]">rocket_launch</span>
              </div>
              <div className="flex-1">
                <h3 className="font-mono text-xs font-black uppercase tracking-[0.1em] text-gray-900 dark:text-white">
                  FOUNDER
                </h3>
              </div>
            </div>

            {/* Headline and Subline */}
            <h4 className="font-mono text-[16px] md:text-[17px] font-black text-gray-900 dark:text-white leading-[1.25] mb-1">
              Everything you need to scale.
            </h4>
            <p className="text-[12.5px] text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Full catalog access while you ship and grow your startup.
            </p>

            {/* Price section */}
            <div className="my-5 flex flex-col gap-2.5 items-start">
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-[42px] font-black text-gray-900 dark:text-white leading-none">$149</span>
                <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">/YR</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-yellow text-black font-mono text-[9.5px] font-black border border-black rounded-sm tracking-wide">
                <span className="material-symbols-outlined !text-[12px] text-black">bolt</span>
                Typical member saves $3,000+ in year 1
              </div>
            </div>

            <div className="h-px border-t border-gray-200 dark:border-white/10 my-4" />

            {/* Features list */}
            <ul className="space-y-3 my-5">
              <li className="flex items-start gap-2.5 text-[11px] font-bold font-mono uppercase tracking-wide text-gray-900 dark:text-white">
                <span className="material-symbols-outlined !text-[16px] text-gray-900 dark:text-white" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
                <span>EVERYTHING IN NEXT&apos;FOUNDER, PLUS:</span>
              </li>
              {[
                'Cloud credit deals (AWS, GCP, Azure) to cut your infra burn',
                'SaaS discount catalog (HubSpot, Stripe, Intercom & 100+ tools) to slash software costs',
                'Unlimited deal claims across every category — no hidden limits',
                'Funding & grant programs filtered to your stage and geography',
                'Accelerators, fellowships, and operator programs in one place',
                'Access to Founders Resources (including ideas database, existing startups, and more)',
              ].map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 text-[13px] text-gray-700 dark:text-gray-300 pl-0.5">
                  <span className="material-symbols-outlined !text-[16px] text-accent-yellow mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            {/* CTA */}
            <button
              onClick={() => handleCheckout('founder')}
              disabled={loadingPlan === 'founder'}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-accent-yellow hover:bg-yellow-400 text-black font-mono font-black text-[12px] uppercase tracking-[0.1em] rounded-lg transition-all shadow-[0_4px_12px_rgba(255,213,0,0.15)]"
            >
              <span>{loadingPlan === 'founder' ? 'REDIRECTING...' : 'BUILD AS A FOUNDER'}</span>
              <span className="material-symbols-outlined !text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            <p className="mt-3 text-center text-[10.5px] text-gray-500 dark:text-gray-400 font-mono">
              ★ Instant access • Secure checkout • Cancel anytime on annual plans
            </p>
          </div>
        </div>

        {/* ── Legend Card (Lifetime) ── */}
        <div className="group relative flex flex-col justify-between bg-white dark:bg-[#0c0a0f]/80 backdrop-blur-md border border-gray-200 dark:border-purple-500/20 hover:border-purple-500/50 p-6 md:p-8 rounded-xl shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div>
            {/* Header row */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform flex-shrink-0">
                <span className="material-symbols-outlined !text-[22px]">workspace_premium</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-mono text-xs font-black uppercase tracking-[0.1em] text-gray-900 dark:text-white">
                    LEGEND
                  </h3>
                  <span className="flex-shrink-0 bg-[#ffd500]/15 border border-[#ffd500]/30 text-accent-yellow font-mono text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider whitespace-nowrap">
                    LIFETIME
                  </span>
                </div>
              </div>
            </div>

            {/* Headline and Subline */}
            <h4 className="font-mono text-[16px] md:text-[17px] font-black text-gray-900 dark:text-white leading-[1.25] mb-1">
              Pay once. Keep access for life.
            </h4>
            <p className="text-[12.5px] text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              For founders building over the long haul.
            </p>

            {/* Price section */}
            <div className="my-5 flex flex-col gap-2.5 items-start">
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-[42px] font-black text-gray-900 dark:text-white leading-none">$299</span>
                <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">/ONCE</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-black text-gray-900 dark:text-accent-yellow border border-gray-200 dark:border-accent-yellow/30 rounded-sm tracking-wide">
                <span className="material-symbols-outlined !text-[12px] text-accent-yellow">bolt</span>
                Founding members cohort
              </div>
            </div>

            <div className="h-px border-t border-gray-200 dark:border-white/10 my-4" />

            {/* Features list */}
            <ul className="space-y-3 my-5">
              <li className="flex items-start gap-2.5 text-[11px] font-bold font-mono uppercase tracking-wide text-gray-900 dark:text-white">
                <span className="material-symbols-outlined !text-[16px] text-gray-900 dark:text-white" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
                <span>EVERYTHING IN FOUNDER – FOR LIFE</span>
              </li>
              {[
                'Everything in Founder — locked in for life, no renewals ever',
                'Every future deal, credit, and catalog update included',
                'Founding member perks and priority partner access',
                'Launch-locked pricing: rate increases or closes later',
                'Just 2 years of Founder already costs more — after that is pure upside',
              ].map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 text-[13px] text-gray-700 dark:text-gray-300 pl-0.5">
                  <span className="material-symbols-outlined !text-[16px] text-amber-500 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            {/* CTA */}
            <button
              onClick={() => handleCheckout('legend')}
              disabled={loadingPlan === 'legend'}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-black dark:bg-black border border-black dark:border-white hover:bg-zinc-900 dark:hover:bg-white/10 text-white font-mono font-black text-[12px] uppercase tracking-[0.1em] rounded-lg transition-all"
            >
              <span>{loadingPlan === 'legend' ? 'REDIRECTING...' : 'LOCK IN LEGEND ACCESS'}</span>
              <span className="material-symbols-outlined !text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            <p className="mt-3 text-center text-[10.5px] text-gray-500 dark:text-gray-400 font-mono">
              ★ One-time payment • Lifetime updates • Founding cohort
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
