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
    // ── Auth guard: check client-side FIRST before hitting the API ──
    // This prevents the 401 → login redirect race condition where the
    // server-side cookie hasn't propagated yet even though the user IS
    // logged in on the client.
    if (authLoading) return // Still resolving session — wait

    if (!user) {
      // Not logged in — send to login with redirect back to pricing
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
      const data = await res.json()
      if (res.ok && data.url) {
        window.location.href = data.url
      } else if (res.status === 401) {
        // Fallback: session expired between check and API call
        router.push('/login?redirect=/pricing')
      } else {
        alert(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      alert('Network error. Please try again.')
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <section className="relative py-8 px-4 max-w-7xl mx-auto">
      {/* Three plans layout container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-8">
        
        {/* ── Next Founder Card ── */}
        <div className="group relative flex flex-col justify-between bg-[#0b0c0e]/80 backdrop-blur-md border border-[#1b2028] hover:border-emerald-500/50 p-6 md:p-8 rounded-xl shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div>
            {/* Header row */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform flex-shrink-0">
                <span className="material-symbols-outlined !text-[22px]">school</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-mono text-xs font-black uppercase tracking-[0.1em] text-white">
                    NEXT&apos; FOUNDER
                  </h3>
                  <span className="flex-shrink-0 border border-red-500 text-red-400 font-mono text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider whitespace-nowrap">
                    STUDENTS
                  </span>
                </div>
              </div>
            </div>

            {/* Headline and Subline */}
            <h4 className="font-mono text-[16px] md:text-[17px] font-black text-white leading-[1.25] mb-1">
              Skip your first idea on a tight budget.
            </h4>
            <p className="text-[12.5px] text-gray-400 leading-relaxed mb-4">
              For students and indie hackers shipping their first product.
            </p>

            {/* Price section */}
            <div className="my-5">
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-[42px] font-black text-white leading-none">$59</span>
                <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-gray-500 ml-1">/YR</span>
              </div>
            </div>

            <div className="h-px border-t border-white/10 my-4" />

            {/* Features list */}
            <ul className="space-y-3 my-5">
              {[
                'Curated AI & SaaS perks for early builders',
                'Hackathons, fellowships, and student programs',
                'Early‑stage grants & founder communities',
                'Tools, discounts, and credits matched to pre‑revenue teams',
                'Career & opportunity hub to find gigs, internships, and co‑founders',
              ].map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 text-[13px] text-gray-300">
                  <span className="material-symbols-outlined !text-[16px] text-gray-500 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span>{feat}</span>
                </li>
              ))}
              <li className="flex items-start gap-2.5 text-[13px] text-accent-yellow font-bold">
                <span className="material-symbols-outlined !text-[16px] text-accent-yellow mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span>Perfect if you’re still validating ideas and haven’t raised or hit revenue yet</span>
              </li>
            </ul>
          </div>

          <div>
            {/* CTA */}
            <button
              onClick={() => handleCheckout('nextfounder')}
              disabled={loadingPlan === 'nextfounder'}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 font-mono font-black text-[12px] uppercase tracking-[0.1em] text-white border border-white hover:bg-white/15 rounded-lg transition-all"
            >
              <span>{loadingPlan === 'nextfounder' ? 'REDIRECTING...' : 'START BUILDING SMARTER'}</span>
              <span className="material-symbols-outlined !text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            <p className="mt-3 text-center text-[10.5px] text-gray-500 font-mono">
              ★ Upgrade to Founder or Legend anytime as you grow
            </p>
          </div>
        </div>

        {/* ── Founder Card (Growth) — Highlighted ── */}
        <div className="group relative flex flex-col justify-between bg-[#0e0d0a]/95 backdrop-blur-md border-2 border-accent-yellow/45 p-6 md:p-8 rounded-xl shadow-[0_0_30px_rgba(255,213,0,0.05)] scale-[1.03] z-10 hover:border-accent-yellow transition-all duration-300">
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
                <h3 className="font-mono text-xs font-black uppercase tracking-[0.1em] text-white">
                  FOUNDER
                </h3>
              </div>
            </div>

            {/* Headline and Subline */}
            <h4 className="font-mono text-[16px] md:text-[17px] font-black text-white leading-[1.25] mb-1">
              Everything you need to scale.
            </h4>
            <p className="text-[12.5px] text-gray-400 leading-relaxed mb-4">
              Full catalog access while you ship and grow your startup.
            </p>

            {/* Price section */}
            <div className="my-5 flex flex-col gap-2.5 items-start">
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-[42px] font-black text-white leading-none">$149</span>
                <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-gray-500 ml-1">/YR</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-yellow text-black font-mono text-[9.5px] font-black border border-black rounded-sm tracking-wide">
                <span className="material-symbols-outlined !text-[12px] text-black">bolt</span>
                Typical member saves $3,000+ in year 1
              </div>
            </div>

            <div className="h-px border-t border-white/10 my-4" />

            {/* Features list */}
            <ul className="space-y-3 my-5">
              <li className="flex items-start gap-2.5 text-[11px] font-bold font-mono uppercase tracking-wide text-white">
                <span className="material-symbols-outlined !text-[16px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
                <span>EVERYTHING IN NEXT&apos;FOUNDER, PLUS:</span>
              </li>
              {[
                'Cloud credit deals (AWS, GCP, Azure) to cut your infra burn',
                'SaaS discount catalog (HubSpot, Stripe, Intercom & 100+ tools) to slash software costs',
                'Unlimited deal claims across every category — no hidden limits',
                'Funding & grant programs filtered to your stage and geography',
                'Accelerators, fellowships, and operator programs in one place',
                'Verified startups & startup ideas database to find collaborators and customers',
              ].map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 text-[13px] text-gray-300 pl-0.5">
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
            <p className="mt-3 text-center text-[10.5px] text-gray-500 font-mono">
              ★ Instant access • Secure checkout • Cancel anytime on annual plans
            </p>
          </div>
        </div>

        {/* ── Legend Card (Lifetime) ── */}
        <div className="group relative flex flex-col justify-between bg-[#0c0a0f]/80 backdrop-blur-md border border-purple-500/20 hover:border-purple-500/50 p-6 md:p-8 rounded-xl shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div>
            {/* Header row */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform flex-shrink-0">
                <span className="material-symbols-outlined !text-[22px]">workspace_premium</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-mono text-xs font-black uppercase tracking-[0.1em] text-white">
                    LEGEND
                  </h3>
                  <span className="flex-shrink-0 bg-[#ffd500]/15 border border-[#ffd500]/30 text-accent-yellow font-mono text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider whitespace-nowrap">
                    LIFETIME
                  </span>
                </div>
              </div>
            </div>

            {/* Headline and Subline */}
            <h4 className="font-mono text-[16px] md:text-[17px] font-black text-white leading-[1.25] mb-1">
              Pay once. Keep access for life.
            </h4>
            <p className="text-[12.5px] text-gray-400 leading-relaxed mb-4">
              For founders building over the long haul.
            </p>

            {/* Price section */}
            <div className="my-5 flex flex-col gap-2.5 items-start">
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-[42px] font-black text-white leading-none">$299</span>
                <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-gray-500 ml-1">/ONCE</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-accent-yellow font-mono text-[9.5px] font-black border border-accent-yellow/30 rounded-sm tracking-wide">
                <span className="material-symbols-outlined !text-[12px] text-accent-yellow">bolt</span>
                Founding members cohort
              </div>
            </div>

            <div className="h-px border-t border-white/10 my-4" />

            {/* Features list */}
            <ul className="space-y-3 my-5">
              <li className="flex items-start gap-2.5 text-[11px] font-bold font-mono uppercase tracking-wide text-white">
                <span className="material-symbols-outlined !text-[16px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
                <span>EVERYTHING IN FOUNDER – FOR LIFE</span>
              </li>
              {[
                'Everything in Founder — locked in for life, no renewals ever',
                'Every future deal, credit, and catalog update included',
                'Founding member perks and priority partner access',
                'Launch-locked pricing: rate increases or closes later',
                'Just 2 years of Founder already costs more — after that is pure upside',
              ].map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 text-[13px] text-gray-300 pl-0.5">
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
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-black border border-white hover:bg-white/10 text-white font-mono font-black text-[12px] uppercase tracking-[0.1em] rounded-lg transition-all"
            >
              <span>{loadingPlan === 'legend' ? 'REDIRECTING...' : 'LOCK IN LEGEND ACCESS'}</span>
              <span className="material-symbols-outlined !text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            <p className="mt-3 text-center text-[10.5px] text-gray-500 font-mono">
              ★ One-time payment • Lifetime updates • Founding cohort
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
