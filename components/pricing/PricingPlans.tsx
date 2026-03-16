'use client'

import Link from 'next/link'
import { Currency } from '@/utils/currency'
import { getPricing, formatPrice } from '@/utils/pricing'

interface PricingPlansProps {
  currency: Currency
}

export default function PricingPlans({ currency }: PricingPlansProps) {
  const explorerPricing = getPricing('explorer', currency)
  const founderPricing = getPricing('founder', currency)
  const legendPricing = getPricing('legend', currency)

  const plans = [
    {
      name: 'Explorer',
      icon: 'explore',
      price: formatPrice(explorerPricing.actual || explorerPricing.discounted, currency),
      originalPrice: null,
      period: explorerPricing.period,
      description: 'All deals & credits. Billed annually.',
      features: [
        'Access to all SaaS deals',
        'Cloud credits (AWS, GCP, Azure)',
        'Ad credits (Google, Meta)',
        'Cancel anytime',
      ],
      cta: 'Start Exploring',
      href: '/checkout?plan=explorer',
      popular: false,
      buttonStyle: 'bg-white hover:bg-gray-50 text-[#111111]',
      badge: null,
      special: false,
      headerBg: 'bg-gray-50',
      cardBg: 'bg-white',
      textColor: 'text-[#111111]',
      featureIcon: 'text-[#111111]',
      iconBg: 'bg-gray-100',
      delay: 0,
    },
    {
      name: 'Founder',
      icon: 'rocket_launch',
      price: formatPrice(founderPricing.actual || founderPricing.discounted, currency),
      originalPrice: null,
      period: founderPricing.period,
      description: 'Everything — billed annually.',
      features: [
        'Everything in Explorer',
        'Cloud, SaaS & Ad credits',
        'Investor & Grants database',
        'Accelerators, Incubators & Programs',
        'Verified Startups full database',
        'Resources, templates & guides',
        'Priority support',
      ],
      cta: 'Become a Founder',
      href: '/checkout?plan=founder',
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
    },
    {
      name: 'Legend',
      icon: 'diamond',
      price: formatPrice(legendPricing.actual || legendPricing.discounted, currency),
      originalPrice: null,
      period: legendPricing.period,
      description: 'Pay once, own it forever.',
      features: [
        'Everything in Founder',
        'Lifetime access forever',
        'All future updates included',
        'Priority support'
      ],
      cta: 'Get Legend Status',
      href: '/checkout?plan=legend',
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
    }
  ]

  return (
    <section className="mb-6 md:mb-8">
      {/* Section Heading */}
      <h2 className="font-mono text-xl md:text-3xl font-black uppercase text-center text-[#111111] tracking-tight mb-5 md:mb-8">
        Unlock More Value
      </h2>

      {/* Mobile carousel */}
      <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-4 mobile-scroll-hide">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="snap-start shrink-0 w-[82vw] group relative flex flex-col border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111] overflow-hidden"
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#111111] text-white px-3 py-0.5 font-mono text-[9px] font-black uppercase tracking-widest z-20 rounded-b-sm">
                ★ Most Popular
              </div>
            )}
            {plan.special && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#111111] text-white px-3 py-0.5 font-mono text-[9px] font-black uppercase tracking-widest z-20 rounded-b-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[9px] text-amber-400">bolt</span>
                Elite Status
              </div>
            )}
            <div className={`${plan.headerBg} px-4 pt-7 pb-3 text-left relative overflow-hidden border-b-2 border-[#111111]/15`}>
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 ${plan.iconBg} border border-[#111111]/20 rounded-sm flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-xs text-[#111111]">{plan.icon}</span>
                </div>
                <h3 className={`font-mono text-sm font-black uppercase tracking-tight ${plan.textColor}`}>{plan.name}</h3>
              </div>
              <div className={`flex items-baseline ${plan.textColor} mt-2`}>
                <span className="font-sans text-2xl font-black tracking-tight leading-none">{plan.price}</span>
                <span className="font-mono text-[9px] font-bold uppercase ml-1 opacity-60">/{plan.period}</span>
              </div>
              {plan.description && (
                <p className={`font-sans text-[10px] mt-1 opacity-60 ${plan.textColor}`}>{plan.description}</p>
              )}
            </div>
            <div className={`px-4 py-3 flex-1 flex flex-col justify-between ${plan.cardBg}`}>
              <ul className="space-y-1.5">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-base ${plan.featureIcon}`} style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="font-sans text-xs text-[#111111]">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Link
                  href={plan.href}
                  className={`w-full py-2 font-mono font-bold uppercase tracking-wider text-[10px] border-2 border-[#111111] flex items-center justify-center gap-1.5 shadow-[2px_2px_0_0_#111111] transition-all duration-200 ${plan.buttonStyle}`}
                >
                  {plan.cta}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile dot indicator */}
      <div className="flex md:hidden justify-center gap-1.5 mt-2 mb-2">
        {plans.map((_, i) => (
          <div key={i} className={`rounded-full transition-all ${i === 0 ? 'w-4 h-1.5 bg-black' : 'w-1.5 h-1.5 bg-gray-300'}`} />
        ))}
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-5 items-stretch max-w-5xl mx-auto px-4">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="group relative flex flex-col border-2 border-[#111111] shadow-[4px_4px_0px_0px_#111111] overflow-hidden transition-all duration-500 ease-out hover:shadow-[6px_6px_0px_0px_#111111] hover:-translate-y-1 animate-fade-in-up"
            style={{ animationDelay: `${plan.delay}ms`, animationFillMode: 'both' }}
          >
            {/* Badges */}
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#111111] text-white px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest z-20 rounded-b-sm">
                ★ Most Popular
              </div>
            )}

            {plan.special && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#111111] text-white px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest z-20 rounded-b-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-amber-400">bolt</span>
                Elite Status
              </div>
            )}

            {/* Header / Pricing Area */}
            <div className={`${plan.headerBg} px-5 pt-9 pb-4 text-left relative overflow-hidden border-b-2 border-[#111111]/15`}>
              {/* Decorative floating icon (top-right, subtle) */}
              <span className="material-symbols-outlined absolute top-2 right-3 text-4xl opacity-[0.07] transition-all duration-700 group-hover:opacity-[0.12] group-hover:rotate-12 group-hover:scale-110">
                {plan.icon}
              </span>

              {/* Plan Icon + Name Row */}
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 ${plan.iconBg} border border-[#111111]/20 rounded-sm flex items-center justify-center transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 ${plan.name === 'Explorer' ? 'group-hover:animate-icon-spin' : ''} ${plan.name === 'Founder' ? 'group-hover:animate-icon-bounce' : ''} ${plan.name === 'Legend' ? 'group-hover:animate-icon-pulse' : ''}`}>
                  <span className="material-symbols-outlined text-sm text-[#111111]">
                    {plan.icon}
                  </span>
                </div>
                <h3 className={`font-mono text-base font-black uppercase tracking-tight ${plan.textColor}`}>
                  {plan.name}
                </h3>
              </div>

              {/* Original Price (strikethrough) */}
              {plan.originalPrice && (
                <span className={`text-xs font-bold line-through opacity-50 ${plan.textColor} block mt-2`}>
                  {plan.originalPrice}
                </span>
              )}

              {/* Main Price */}
              <div className={`flex items-baseline ${plan.textColor} ${plan.originalPrice ? 'mt-0.5' : 'mt-2'}`}>
                <span className="font-sans text-3xl md:text-4xl font-black tracking-tight leading-none transition-transform duration-300 group-hover:scale-[1.02] origin-left">
                  {plan.price}
                </span>
                <span className="font-mono text-[10px] font-bold uppercase ml-1 opacity-60">
                  /{plan.period}
                </span>
              </div>

              {/* Save Badge */}
              {plan.badge && (
                <div className="mt-2">
                  <span className={`inline-block text-[10px] font-black px-2 py-0.5 uppercase tracking-wider rounded-sm transition-transform duration-300 group-hover:-rotate-1 ${plan.special ? 'bg-[#ef4444] text-white' : 'bg-[#22c55e] text-white'}`}>
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Description */}
              {plan.description && (
                <p className={`font-sans text-xs mt-2 opacity-60 ${plan.textColor}`}>
                  {plan.description}
                </p>
              )}
            </div>

            {/* Features — clean section, no extra dividers */}
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

              {/* CTA Button */}
              <div className="mt-5">
                <Link
                  href={plan.href}
                  className={`w-full py-2.5 font-mono font-bold uppercase tracking-wider text-xs border-2 border-[#111111] flex items-center justify-center gap-2 shadow-[3px_3px_0_0_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_0_#111111] transition-all duration-200 ${plan.buttonStyle}`}
                >
                  {plan.cta}
                  <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-0.5">arrow_forward</span>
                </Link>


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
        .group:hover .group-hover\:animate-icon-spin {
          animation: iconSpin 0.6s ease-in-out;
        }
        .group:hover .group-hover\:animate-icon-bounce {
          animation: iconBounce 0.5s ease-in-out infinite;
        }
        .group:hover .group-hover\:animate-icon-pulse {
          animation: iconPulse 0.8s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}