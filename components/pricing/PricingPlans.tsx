'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Currency } from '@/utils/currency'
import { getPricing, formatPrice } from '@/utils/pricing'
import { GlowingEffect } from '@/components/ui/GlowingEffect'

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

  const plans = [
    {
      name: 'NextFounder',
      planKey: 'nextfounder',
      icon: 'school',
      price: formatPrice(nextFounderPricing.discounted, currency),
      originalPrice: null,
      period: nextFounderPricing.period,
      description: 'For students, indie hackers & early builders.',
      features: [
        'Premium AI & SaaS credits',
        'Curated tools & opportunities',
        'Hackathons, internships & fellowships',
        'Startup grants & founder programs',
        'Opportunity Hub for career & growth',
        'NextFounder community access',
        'Early access to perks & opportunities',
      ],
      footnote: 'Active student verification required. All NextFounder benefits are reserved for verified students only — not for general founders.',
      cta: 'Join NextFounder',
      popular: false,
      buttonStyle: 'bg-white hover:bg-gray-50 text-[#111111]',
      badge: 'STUDENTS ONLY',
      special: false,
      headerBg: 'bg-gray-50',
      cardBg: 'bg-white',
      textColor: 'text-[#111111]',
      featureIcon: 'text-[#111111]',
      iconBg: 'bg-gray-100',
      delay: 0,
      glowColors: {
        gradient: `radial-gradient(circle, #a3a3a3 10%, #a3a3a300 20%),
          radial-gradient(circle at 40% 40%, #d4d4d4 5%, #d4d4d400 15%),
          radial-gradient(circle at 60% 60%, #737373 10%, #73737300 20%),
          repeating-conic-gradient(from 236.84deg at 50% 50%, #a3a3a3 0%, #d4d4d4 calc(25% / 5), #737373 calc(50% / 5), #a3a3a3 calc(75% / 5), #d4d4d4 calc(100% / 5))`,
      },
    },
    {
      name: 'Founder',
      planKey: 'founder',
      icon: 'rocket_launch',
      price: formatPrice(founderPricing.discounted, currency),
      originalPrice: founderPricing.actual ? formatPrice(founderPricing.actual, currency) : null,
      period: founderPricing.period,
      description: 'Everything — unlimited access.',
      features: [
        'Unlimited Deal Claims (All Deals)',
        'Funding Opportunities',
        'Incubators, Accelerators & Programs',
        'Verified Startups Full Database',
        'Startup Ideas Database',
        'Master Resources Library',
        'Private Founder Community (Discord)',
        'Priority support',
      ],
      footnote: null,
      cta: 'Join Founder (Pro)',
      popular: true,
      buttonStyle: 'bg-[#111111] text-white hover:bg-[#333]',
      badge: null,
      special: false,
      headerBg: 'bg-[#38bdf8]',
      cardBg: 'bg-[#e0f2fe]',
      textColor: 'text-[#111111]',
      featureIcon: 'text-[#0284c7]',
      iconBg: 'bg-white/30',
      delay: 100,
      glowColors: {
        gradient: `radial-gradient(circle, #38bdf8 10%, #38bdf800 20%),
          radial-gradient(circle at 40% 40%, #0ea5e9 5%, #0ea5e900 15%),
          radial-gradient(circle at 60% 60%, #0284c7 10%, #0284c700 20%),
          repeating-conic-gradient(from 236.84deg at 50% 50%, #38bdf8 0%, #0ea5e9 calc(25% / 5), #0284c7 calc(50% / 5), #38bdf8 calc(75% / 5), #0ea5e9 calc(100% / 5))`,
      },
    },
    {
      name: 'Legend',
      planKey: 'legend',
      icon: 'diamond',
      price: formatPrice(legendPricing.discounted, currency),
      originalPrice: legendPricing.actual ? formatPrice(legendPricing.actual, currency) : null,
      period: legendPricing.period,
      description: 'Pay once, own it forever.',
      features: [
        'Everything in Founder',
        'Lifetime access forever',
        'All future updates included',
        'Private Founder Community (Discord)',
        'Priority support'
      ],
      footnote: null,
      cta: 'Get Legend Status',
      popular: false,
      buttonStyle: 'bg-[#111111] text-white hover:bg-[#333]',
      badge: null,
      special: true,
      headerBg: 'bg-[#fde047]',
      cardBg: 'bg-[#fefce8]',
      textColor: 'text-[#111111]',
      featureIcon: 'text-[#ca8a04]',
      iconBg: 'bg-white/30',
      delay: 200,
      glowColors: {
        gradient: `radial-gradient(circle, #fde047 10%, #fde04700 20%),
          radial-gradient(circle at 40% 40%, #fbbf24 5%, #fbbf2400 15%),
          radial-gradient(circle at 60% 60%, #f59e0b 10%, #f59e0b00 20%),
          repeating-conic-gradient(from 236.84deg at 50% 50%, #fde047 0%, #fbbf24 calc(25% / 5), #f59e0b calc(50% / 5), #fde047 calc(75% / 5), #fbbf24 calc(100% / 5))`,
      },
    }
  ]

  return (
    <section className="mb-6 md:mb-8">
      {/* Section Heading */}
      <h2 className="font-mono text-xl md:text-3xl font-black uppercase text-center text-[#111111] tracking-tight mb-5 md:mb-8">
        Unlock More Value
      </h2>

      {/* ═══ Mobile Stacked View ═══ */}
      <div className="md:hidden flex flex-col gap-3 px-4 pb-2">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="group relative rounded-sm animate-fade-in-up"
            style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
          >
            <GlowingEffect
              spread={40}
              glow={plan.popular}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={2}
            />

            <div className={`relative flex flex-col border-2 border-[#111111] shadow-[2px_2px_0px_0px_#111111] overflow-hidden`}>
              {/* Header row: icon + name + badge + price all in one line */}
              <div className={`${plan.headerBg} px-3 py-2.5 flex items-center justify-between`}>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#111111]">{plan.icon}</span>
                  <h3 className={`font-mono text-[11px] font-black uppercase ${plan.textColor}`}>{plan.name}</h3>
                  {plan.popular && (
                    <span className="bg-[#111111] text-white px-1.5 py-px font-mono text-[7px] font-black uppercase tracking-wider ml-1">★ Popular</span>
                  )}
                  {plan.special && (
                    <span className="bg-[#111111] text-white px-1.5 py-px font-mono text-[7px] font-black uppercase tracking-wider ml-1 flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[7px] text-amber-400">bolt</span>Elite
                    </span>
                  )}
                </div>
                <div className={`flex items-baseline ${plan.textColor}`}>
                  {plan.originalPrice && (
                    <span className="font-sans text-xs font-bold line-through opacity-50 mr-1.5">{plan.originalPrice}</span>
                  )}
                  <span className="font-sans text-lg font-black tracking-tight leading-none">{plan.price}</span>
                  <span className="font-mono text-[7px] font-bold uppercase ml-0.5 opacity-50">{plan.period}</span>
                </div>
              </div>

              {/* Features + CTA */}
              <div className={`px-3 py-2 ${plan.cardBg}`}>
                <ul className="space-y-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 min-h-[18px]">
                      <span className={`material-symbols-outlined text-[13px] leading-none shrink-0 ${plan.featureIcon}`} style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      <span className="font-sans text-[11px] text-[#111111]/80 leading-none">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.footnote && (
                  <div className="mt-2 p-1.5 bg-amber-50 border border-amber-200 flex items-start gap-1">
                    <span className="material-symbols-outlined text-amber-700 text-[12px] mt-px flex-shrink-0">info</span>
                    <p className="font-sans text-[9px] text-amber-900 leading-snug">{plan.footnote}</p>
                  </div>
                )}

                <button
                  onClick={() => handleCheckout(plan.planKey)}
                  disabled={loadingPlan === plan.planKey}
                  className={`pricing-cta-btn w-full mt-2.5 py-2 font-mono font-bold uppercase tracking-wider text-[10px] border-2 border-[#111111] flex items-center justify-center gap-1.5 shadow-[2px_2px_0_0_#111111] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_0_#111111] transition-all ${plan.buttonStyle} disabled:opacity-60`}
                >
                  {loadingPlan === plan.planKey ? 'Redirecting...' : plan.cta}
                  <span className="material-symbols-outlined text-xs pricing-cta-arrow">
                    {loadingPlan === plan.planKey ? 'hourglass_empty' : 'arrow_forward'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ═══ Desktop Grid ═══ */}
      <div className="hidden md:grid md:grid-cols-3 gap-5 items-stretch max-w-5xl mx-auto px-4">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="relative rounded-sm"
            style={{ animationDelay: `${plan.delay}ms`, animationFillMode: 'both' }}
          >
            <GlowingEffect
              spread={40}
              glow={false}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={2}
            />
            <div
              className="group relative flex flex-col border-2 border-[#111111] shadow-[4px_4px_0px_0px_#111111] overflow-hidden transition-all duration-500 ease-out hover:shadow-[6px_6px_0px_0px_#111111] hover:-translate-y-1 animate-fade-in-up h-full"
            >
            {/* Badges */}
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 rounded-sm overflow-hidden">
                <GlowingEffect spread={20} glow disabled={false} proximity={32} inactiveZone={0.01} borderWidth={1} />
                <div className="relative bg-[#111111] text-white px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest">
                  ★ Most Popular
                </div>
              </div>
            )}

            {plan.special && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 rounded-sm overflow-hidden">
                <GlowingEffect spread={20} glow disabled={false} proximity={32} inactiveZone={0.01} borderWidth={1} />
                <div className="relative bg-[#111111] text-white px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-amber-400">bolt</span>
                  Elite Status
                </div>
              </div>
            )}

            {/* Header / Pricing Area */}
            <div className={`${plan.headerBg} px-5 pt-9 pb-4 text-left relative overflow-hidden border-b-2 border-[#111111]/15`}>
              <span className="material-symbols-outlined absolute top-2 right-3 text-4xl opacity-[0.07] transition-all duration-700 group-hover:opacity-[0.12] group-hover:rotate-12 group-hover:scale-110">
                {plan.icon}
              </span>

              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 ${plan.iconBg} border border-[#111111]/20 flex items-center justify-center transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 ${plan.name === 'NextFounder' ? 'group-hover:animate-icon-spin' : ''} ${plan.name === 'Founder' ? 'group-hover:animate-icon-bounce' : ''} ${plan.name === 'Legend' ? 'group-hover:animate-icon-pulse' : ''}`}>
                  <span className="material-symbols-outlined text-sm text-[#111111]">
                    {plan.icon}
                  </span>
                </div>
                <h3 className={`font-mono text-base font-black uppercase tracking-tight ${plan.textColor}`}>
                  {plan.name}
                </h3>
              </div>

              <div className={`flex items-baseline ${plan.textColor} mt-2`}>
                {plan.originalPrice && (
                  <span className="font-sans text-base md:text-lg font-bold line-through opacity-50 mr-2">{plan.originalPrice}</span>
                )}
                <span className="font-sans text-3xl md:text-4xl font-black tracking-tight leading-none transition-transform duration-300 group-hover:scale-[1.02] origin-left">
                  {plan.price}
                </span>
                <span className="font-mono text-[10px] font-bold uppercase ml-1 opacity-60">
                  {plan.period}
                </span>
              </div>

              {plan.badge && (
                <div className="mt-2">
                  <span className={`inline-block text-[10px] font-black px-2 py-0.5 uppercase tracking-wider transition-transform duration-300 group-hover:-rotate-1 ${plan.special ? 'bg-[#ef4444] text-white' : 'bg-[#22c55e] text-white'}`}>
                    {plan.badge}
                  </span>
                </div>
              )}

              {plan.description && (
                <p className={`font-sans text-xs mt-2 opacity-60 ${plan.textColor}`}>
                  {plan.description}
                </p>
              )}
            </div>

            {/* Features */}
            <div className={`px-5 py-4 flex-1 flex flex-col justify-between ${plan.cardBg}`}>
              <ul className="space-y-2.5">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                    style={{ transitionDelay: `${idx * 40}ms` }}
                  >
                    <span className={`material-symbols-outlined text-lg ${plan.featureIcon} transition-transform duration-300 group-hover:scale-110`} style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    <span className="font-sans text-sm text-[#111111]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {plan.footnote && (
                <div className="mt-3 p-2 bg-amber-50 border border-amber-200 flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-amber-700 text-sm mt-px flex-shrink-0">info</span>
                  <p className="font-sans text-[10px] text-amber-900 leading-snug">{plan.footnote}</p>
                </div>
              )}

              {/* CTA Button */}
              <div className="mt-5 relative rounded-sm">
                <GlowingEffect
                  spread={40}
                  glow={false}
                  disabled={false}
                  proximity={48}
                  inactiveZone={0.01}
                  borderWidth={2}
                />
                <button
                  onClick={() => handleCheckout(plan.planKey)}
                  disabled={loadingPlan === plan.planKey}
                  className={`pricing-cta-btn relative w-full py-2.5 font-mono font-bold uppercase tracking-wider text-xs border-2 border-[#111111] flex items-center justify-center gap-2 shadow-[3px_3px_0_0_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_0_#111111] transition-all duration-200 ${plan.buttonStyle} disabled:opacity-60`}
                >
                  {loadingPlan === plan.planKey ? 'Redirecting...' : plan.cta}
                  <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-0.5 pricing-cta-arrow">
                    {loadingPlan === plan.planKey ? 'hourglass_empty' : 'arrow_forward'}
                  </span>
                </button>
              </div>
            </div>
          </div>
          </div>
        ))}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes iconSpin {
          0% { transform: rotate(0deg) scale(1.1); }
          50% { transform: rotate(15deg) scale(1.15); }
          100% { transform: rotate(-8deg) scale(1.1); }
        }
        @keyframes iconBounce {
          0%, 100% { transform: translateY(0) rotate(-8deg) scale(1.1); }
          50% { transform: translateY(-3px) rotate(-8deg) scale(1.15); }
        }
        @keyframes iconPulse {
          0%, 100% { transform: scale(1.1) rotate(-8deg); }
          50% { transform: scale(1.2) rotate(-8deg); }
        }
        .group:hover .group-hover\\:animate-icon-spin {
          animation: iconSpin 0.6s ease-in-out;
        }
        .group:hover .group-hover\\:animate-icon-bounce {
          animation: iconBounce 0.5s ease-in-out infinite;
        }
        .group:hover .group-hover\\:animate-icon-pulse {
          animation: iconPulse 0.8s ease-in-out infinite;
        }
        @keyframes ctaArrowBounce {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        .pricing-cta-btn .pricing-cta-arrow {
          animation: ctaArrowBounce 1.5s ease-in-out infinite;
        }
        @keyframes ctaShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .pricing-cta-btn {
          background-size: 200% 100%;
        }
      `}</style>
    </section>
  )
}
