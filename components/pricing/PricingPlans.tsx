'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Currency } from '@/utils/currency'
import { getPricing, formatPrice } from '@/utils/pricing'

interface PricingPlansProps {
  currency: Currency
}

export default function PricingPlans({ currency }: PricingPlansProps) {
  const router = useRouter()
  const nextFounderPricing = getPricing('nextfounder', currency)
  const founderPricing = getPricing('founder', currency)
  const legendPricing = getPricing('legend', currency)

  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const handleCheckout = async (plan: string) => {
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

  type Plan = {
    name: string
    planKey: string
    icon: string
    price: string
    originalPrice: string | null
    period: string
    headline: string
    subline: string
    monthlySub: string | null
    features: string[]
    footnote: string | null
    cta: string
    popular: boolean
    accent: 'gray' | 'sky' | 'amber'
    badge: string | null
    delay: number
    trust: string
    valueAnchor: string | null
  }

  const plans: Plan[] = [
    {
      name: "Next'Founder",
      planKey: 'nextfounder',
      icon: 'school',
      price: formatPrice(nextFounderPricing.discounted, currency),
      originalPrice: nextFounderPricing.actual ? formatPrice(nextFounderPricing.actual, currency) : null,
      period: nextFounderPricing.period,
      headline: 'Ship your first idea on a tight budget.',
      subline: 'For students and indie hackers building lean.',
      monthlySub: null,
      valueAnchor: null,
      features: [
        'Curated AI & SaaS perks for early builders',
        'Hackathons, fellowships & student programs',
        'Early-stage grants & founder communities',
        'Tools and credits matched to your stage',
        'Career & opportunity hub',
      ],
      footnote: 'Built for active student builders shipping their first product.',
      cta: "Start Building Smarter",
      popular: false,
      accent: 'gray',
      badge: 'STUDENTS',
      delay: 0,
      trust: 'Cancel anytime to stop renewals · Instant access',
    },
    {
      name: 'Founder',
      planKey: 'founder',
      icon: 'rocket_launch',
      price: formatPrice(founderPricing.discounted, currency),
      originalPrice: founderPricing.actual ? formatPrice(founderPricing.actual, currency) : null,
      period: founderPricing.period,
      headline: 'Everything you need to scale.',
      subline: 'Full catalog access while you ship and grow your startup.',
      monthlySub: 'About $12.42/month, billed yearly',
      valueAnchor: null,
      features: [
        "Everything in Next'Founder, plus:",
        'Cloud credit deals (AWS, GCP, Azure)',
        'SaaS discount catalog (HubSpot, Stripe, Intercom + more)',
        'Unlimited deal claims across every category',
        'Funding & grant programs filtered to your stage',
        'Incubators, Accelerators & Programs database',
        'Verified Startups + Startup Ideas database',
      ],
      footnote: null,
      cta: 'Scale as a Founder',
      popular: true,
      accent: 'sky',
      badge: null,
      delay: 100,
      trust: 'Cancel anytime · Instant access · Yearly billing',
    },
    {
      name: 'Legend',
      planKey: 'legend',
      icon: 'workspace_premium',
      price: formatPrice(legendPricing.discounted, currency),
      originalPrice: legendPricing.actual ? formatPrice(legendPricing.actual, currency) : null,
      period: legendPricing.period,
      headline: 'Pay once. Keep access for life.',
      subline: 'For founders building over the long haul.',
      monthlySub: 'One-time payment · No renewals',
      valueAnchor: null,
      features: [
        'Everything in Founder — for life',
        'Pay once, never charged again',
        'Every future update included',
        'Founding member perks',
        'Lock in launch pricing forever',
      ],
      footnote: null,
      cta: 'Lock In Legend Access',
      popular: false,
      accent: 'amber',
      badge: 'BEST VALUE',
      delay: 200,
      trust: 'One-time payment · Lifetime updates · Lock in launch price',
    },
  ]

  return (
    <section className="relative py-6 md:py-10 px-4">
      {/* Decorative grid + soft blobs */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent-yellow/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl" />
      </div>

      {/* ═══ Mobile Stacked View ═══ */}
      <div className="md:hidden flex flex-col gap-6 pb-2 relative">
        {plans.map((plan, index) => (
          <PlanCard
            key={index}
            plan={plan}
            loading={loadingPlan === plan.planKey}
            onClick={() => handleCheckout(plan.planKey)}
            delay={index * 80}
          />
        ))}
      </div>

      {/* ═══ Desktop Grid ═══ */}
      <div className="hidden md:grid md:grid-cols-3 gap-5 lg:gap-7 items-stretch max-w-6xl mx-auto pt-6 lg:pt-8 relative">
        {plans.map((plan, index) => (
          <PlanCard
            key={index}
            plan={plan}
            loading={loadingPlan === plan.planKey}
            onClick={() => handleCheckout(plan.planKey)}
            delay={plan.delay}
          />
        ))}
      </div>

      {/* Security & data trust strip */}
      <div className="relative max-w-4xl mx-auto mt-10 md:mt-12 px-4">
        <div className="relative bg-white border-2 border-black rounded-sm shadow-[3px_3px_0px_#111] overflow-hidden">
          {/* Decorative mandala */}
          <div className="absolute -top-12 -right-12 w-32 h-32 pointer-events-none opacity-[0.08]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-full text-gray-900 pricing-anchor-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
              <circle cx="100" cy="100" r="40" />
              <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <g key={deg} transform={`rotate(${deg} 100 100)`}>
                  <line x1="100" y1="40" x2="100" y2="20" />
                  <circle cx="100" cy="20" r="2" fill="currentColor" />
                </g>
              ))}
              <circle cx="100" cy="100" r="2.5" fill="currentColor" />
            </svg>
          </div>

          <div className="relative px-4 md:px-6 py-3.5">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-5">
              {/* Heading + lock */}
              <div className="flex items-center gap-2.5 md:flex-shrink-0 md:pr-5 md:border-r-2 md:border-black md:border-dashed">
                <div className="w-9 h-9 bg-emerald-50 border-2 border-black rounded-sm flex items-center justify-center shadow-[1px_1px_0px_#111]">
                  <span className="material-symbols-outlined !text-[16px] text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                    lock
                  </span>
                </div>
                <div>
                  <p className="font-mono text-[10.5px] font-black uppercase tracking-[0.12em] text-black leading-none">
                    Secure Checkout
                  </p>
                  <p className="text-[10.5px] text-gray-500 mt-0.5 leading-none">
                    Your data is protected
                  </p>
                </div>
              </div>

              {/* Trust signals — wrapping row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 flex-1">
                {[
                  { icon: 'verified_user', text: 'PCI-DSS payments via Dodo', color: 'text-sky-600' },
                  { icon: 'enhanced_encryption', text: '256-bit TLS encryption', color: 'text-indigo-600' },
                  { icon: 'shield_lock', text: 'Card data never stored on our servers', color: 'text-amber-600' },
                  { icon: 'cancel_schedule_send', text: 'Cancel renewals from your dashboard', color: 'text-rose-600' },
                ].map((item) => (
                  <div key={item.text} className="inline-flex items-center gap-1.5">
                    <span className={`material-symbols-outlined !text-[14px] ${item.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                      {item.icon}
                    </span>
                    <span className="font-mono text-[10.5px] font-bold uppercase tracking-wide text-gray-700">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        :global(.plan-card-fade-in) {
          animation: fadeInUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }
        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        :global(.plan-recommended-badge) {
          animation: badgeFloat 2.4s ease-in-out infinite;
        }
        @keyframes pricingAnchorSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pricingAnchorSpinReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        :global(.pricing-anchor-mandala-spin) {
          animation: pricingAnchorSpin 90s linear infinite;
          transform-origin: center;
        }
        :global(.pricing-anchor-mandala-spin-reverse) {
          animation: pricingAnchorSpinReverse 110s linear infinite;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.plan-card-fade-in),
          :global(.plan-recommended-badge),
          :global(.pricing-anchor-mandala-spin),
          :global(.pricing-anchor-mandala-spin-reverse) { animation: none; }
        }
      `}</style>
    </section>
  )
}

/* ─── Single plan card ──────────────────────────────────────────── */
function PlanCard({
  plan,
  loading,
  onClick,
  delay = 0,
}: {
  plan: any
  loading: boolean
  onClick: () => void
  delay?: number
}) {
  const isPopular = plan.popular

  // Accent colors per plan
  const accent = {
    gray: { iconChip: 'bg-gray-100', iconColor: 'text-gray-700', check: 'text-gray-700', badgeBg: 'bg-red-600', badgeText: 'text-white', headerStripe: 'bg-gray-300' },
    sky: { iconChip: 'bg-sky-100', iconColor: 'text-sky-700', check: 'text-sky-600', badgeBg: 'bg-red-500', badgeText: 'text-white', headerStripe: 'bg-accent-yellow' },
    amber: { iconChip: 'bg-amber-100', iconColor: 'text-amber-700', check: 'text-amber-700', badgeBg: 'bg-amber-200', badgeText: 'text-amber-900', headerStripe: 'bg-amber-400' },
  }[plan.accent as 'gray' | 'sky' | 'amber']

  return (
    <div
      className={`relative plan-card-fade-in flex ${
        isPopular ? 'lg:-mt-6 lg:scale-[1.04] z-10' : ''
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Recommended banner — sits cleanly above the card */}
      {isPopular && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
          <div className="plan-recommended-badge inline-flex items-center gap-1.5 bg-black text-accent-yellow px-4 py-1.5 border-2 border-black shadow-[3px_3px_0px_rgba(255,221,0,0.6)] font-mono text-[10px] md:text-[10.5px] font-black uppercase tracking-[0.18em] rounded-sm">
            <span className="material-symbols-outlined !text-[13px] text-accent-yellow">star</span>
            Most Founders Pick This
          </div>
        </div>
      )}

      <div
        className={`relative w-full bg-white border-2 border-black overflow-hidden flex flex-col transition-all duration-300 hover:-translate-x-px hover:-translate-y-px ${
          isPopular
            ? 'shadow-[5px_5px_0px_#111,9px_9px_0px_#FFD500] hover:shadow-[7px_7px_0px_#111,11px_11px_0px_#FFD500]'
            : 'shadow-[4px_4px_0px_#111] hover:shadow-[6px_6px_0px_#111]'
        }`}
      >
        {/* Top accent strip */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${accent.headerStripe}`} />

        {/* Header */}
        <div className="px-4 pt-6 pb-4 sm:px-6 sm:pt-8 sm:pb-6 border-b-2 border-black border-dashed relative">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-sm border-2 border-black ${accent.iconChip} flex items-center justify-center shadow-[2px_2px_0px_#111]`}>
                <span className={`material-symbols-outlined !text-[18px] sm:!text-[20px] ${accent.iconColor}`}>
                  {plan.icon}
                </span>
              </div>
              <div>
                <h3 className="font-mono text-[13px] sm:text-[14px] font-black uppercase tracking-[0.06em] text-black leading-none">
                  {plan.name}
                </h3>
              </div>
            </div>
            {plan.badge && (
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-sm border-2 border-black shadow-[1px_1px_0px_#111] text-[9px] font-mono font-black uppercase tracking-[0.1em] ${accent.badgeBg} ${accent.badgeText}`}
              >
                {plan.badge}
              </span>
            )}
          </div>

          {/* Outcome headline (Hormozi style) */}
          <h4 className="font-mono text-[15px] sm:text-[16px] md:text-[17px] font-black text-black leading-[1.25] mb-1.5 sm:mb-2">
            {plan.headline}
          </h4>
          <p className="text-[12px] sm:text-[12.5px] text-gray-600 leading-relaxed mb-4 sm:mb-5">{plan.subline}</p>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            {plan.originalPrice && (
              <span className="font-sans text-base sm:text-lg text-gray-400 line-through">
                {plan.originalPrice}
              </span>
            )}
            <span className="font-mono text-[38px] sm:text-[44px] md:text-[48px] font-black tracking-tight text-black leading-none tabular-nums">
              {plan.price}
            </span>
            <span className="font-mono text-[11px] font-bold uppercase tracking-wide text-gray-500">
              {plan.period}
            </span>
          </div>

          {plan.monthlySub && (
            <div className="inline-flex items-center gap-1 bg-black text-accent-yellow font-mono font-black text-[10px] sm:text-[10.5px] px-2.5 py-1 border-2 border-black rounded-sm shadow-[2px_2px_0px_rgba(255,221,0,0.4)]">
              <span className="material-symbols-outlined !text-[12px]">bolt</span>
              {plan.monthlySub}
            </div>
          )}
        </div>

        {/* Features */}
        <div className="px-4 py-5 sm:px-6 sm:py-6 flex-1 flex flex-col bg-gray-50/40">
          <ul className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
            {plan.features.map((feature: string, idx: number) => {
              // First "Everything in X, plus:" gets bolder treatment
              const isInheritance = feature.endsWith(', plus:') || feature.startsWith('Everything in')
              return (
                <li key={idx} className="flex items-start gap-2.5">
                  <span
                    className={`material-symbols-outlined !text-[16px] sm:!text-[17px] flex-shrink-0 mt-0.5 ${
                      isInheritance ? 'text-black' : accent.check
                    }`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {isInheritance ? 'add_circle' : 'check_circle'}
                  </span>
                  <span
                    className={`text-[12.5px] sm:text-[13px] leading-snug ${
                      isInheritance ? 'font-mono font-bold uppercase tracking-wide text-black !text-[11px]' : 'text-gray-800'
                    }`}
                  >
                    {feature}
                  </span>
                </li>
              )
            })}
          </ul>

          {plan.footnote && (
            <div className="mt-auto mb-4 sm:mb-5 px-3 py-2.5 bg-amber-50 border-2 border-black border-dashed rounded-sm flex items-start gap-2">
              <span className="material-symbols-outlined !text-[15px] text-amber-700 mt-0.5 flex-shrink-0">info</span>
              <p className="text-[11.5px] text-amber-900 leading-relaxed">{plan.footnote}</p>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={onClick}
            disabled={loading}
            className={`group/cta mt-auto w-full inline-flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 font-mono font-black text-[12px] md:text-[12.5px] uppercase tracking-[0.12em] rounded-sm border-2 border-black transition-all overflow-hidden relative disabled:opacity-60 ${
              isPopular
                ? 'bg-accent-yellow text-black shadow-[3px_3px_0px_#111] hover:shadow-[5px_5px_0px_#111] hover:-translate-x-px hover:-translate-y-px'
                : plan.accent === 'amber'
                  ? 'bg-black text-white shadow-[3px_3px_0px_#111] hover:shadow-[5px_5px_0px_#111] hover:-translate-x-px hover:-translate-y-px'
                  : 'bg-white text-black shadow-[3px_3px_0px_#111] hover:bg-gray-50 hover:shadow-[5px_5px_0px_#111] hover:-translate-x-px hover:-translate-y-px'
            }`}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700 pointer-events-none" />
            <span className="relative">
              {loading ? 'Redirecting…' : plan.cta}
            </span>
            <span className="material-symbols-outlined relative !text-[16px] group-hover/cta:translate-x-1 transition-transform">
              {loading ? 'hourglass_empty' : 'arrow_forward'}
            </span>
          </button>

          {/* Trust line */}
          <p className="mt-3 text-center text-[10.5px] text-gray-500 font-mono leading-snug">
            <span className="material-symbols-outlined !text-[11px] align-middle mr-0.5">lock</span>
            {plan.trust}
          </p>
        </div>
      </div>
    </div>
  )
}
