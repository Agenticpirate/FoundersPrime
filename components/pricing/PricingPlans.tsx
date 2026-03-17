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
      buttonStyle: 'bg-white hover:bg-gray-50 text-black',
      special: false,
      headerBg: 'bg-white',
      cardBg: 'bg-white',
      accentColor: 'text-gray-400',
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
      buttonStyle: 'bg-[#38bdf8] text-black hover:bg-[#0ea5e9]',
      special: false,
      headerBg: 'bg-white',
      cardBg: 'bg-white',
      accentColor: 'text-[#38bdf8]',
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
      buttonStyle: 'bg-accent-yellow text-black hover:bg-yellow-400',
      special: true,
      headerBg: 'bg-white',
      cardBg: 'bg-white',
      accentColor: 'text-accent-yellow',
      delay: 200,
    }
  ]

  return (
    <section className="mb-4">
      {/* Mobile carousel */}
      <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-4 mobile-scroll-hide">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`snap-start shrink-0 w-[82vw] relative flex flex-col border-2 border-black bg-white overflow-hidden shadow-[2px_2px_0px_0px_#111]`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-[#38bdf8] text-black px-2 py-0.5 border-b-2 border-l-2 border-black font-mono text-[9px] font-black uppercase tracking-widest z-20">
                ★ Popular
              </div>
            )}
            {plan.special && (
              <div className="absolute top-0 right-0 bg-accent-yellow text-black px-2 py-0.5 border-b-2 border-l-2 border-black font-mono text-[9px] font-black uppercase tracking-widest z-20 flex items-center gap-1">
                <span className="material-symbols-outlined text-[10px]">bolt</span>
                Lifetime
              </div>
            )}
            
            <div className="px-4 pt-6 pb-3 text-left border-b-2 border-black">
              <div className="flex items-center gap-2 mb-2">
                <span className={`material-symbols-outlined text-sm ${plan.accentColor}`}>{plan.icon}</span>
                <h3 className="font-mono text-sm font-black text-black uppercase">{plan.name}</h3>
              </div>
              <div className="flex items-baseline text-black">
                <span className="font-sans text-3xl font-black tracking-tight">{plan.price}</span>
                <span className="font-mono text-[10px] font-bold uppercase ml-1 opacity-60">/{plan.period}</span>
              </div>
              <p className="font-sans text-[11px] mt-1 text-gray-500">{plan.description}</p>
            </div>
            
            <div className="px-4 py-4 flex-1 flex flex-col justify-between">
              <ul className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-base ${plan.accentColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="font-sans text-xs text-black">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <Link
                  href={plan.href}
                  className={`w-full py-2 font-mono font-bold uppercase tracking-wider text-[10px] border-2 border-black flex items-center justify-center gap-1.5 transition-all shadow-[2px_2px_0_0_#111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_#111] ${plan.buttonStyle}`}
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
          <div key={i} className={`transition-all border border-black ${i === 0 ? 'w-5 h-2 bg-black' : 'w-2 h-2 bg-gray-300'}`} />
        ))}
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 items-start max-w-[1600px] mx-auto px-4">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="group relative flex flex-col border-2 border-black bg-white shadow-[4px_4px_0px_0px_#111111] overflow-hidden transition-all duration-300 ease-out hover:shadow-[6px_6px_0px_0px_#111111] hover:-translate-y-1 animate-fade-in-up"
            style={{ animationDelay: `${plan.delay}ms`, animationFillMode: 'both' }}
          >
            {/* Badges */}
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-[#38bdf8] text-black px-2.5 py-1 border-b-2 border-l-2 border-black font-mono text-[9px] font-black uppercase tracking-widest z-20">
                ★ Popular
              </div>
            )}
            {plan.special && (
              <div className="absolute top-0 right-0 bg-accent-yellow text-black px-2.5 py-1 border-b-2 border-l-2 border-black font-mono text-[9px] font-black uppercase tracking-widest z-20 flex items-center gap-1">
                <span className="material-symbols-outlined text-[10px]">bolt</span>
                Lifetime
              </div>
            )}

            {/* Header Area */}
            <div className={`px-5 pt-8 pb-4 text-left border-b-2 border-black`}>
              <div className="flex items-center gap-2 mb-2 transition-transform duration-300 group-hover:translate-x-1">
                <span className={`material-symbols-outlined text-lg ${plan.accentColor}`}>{plan.icon}</span>
                <h3 className="font-mono text-sm font-black text-black uppercase tracking-tight">{plan.name}</h3>
              </div>
              <div className="flex items-baseline text-black transition-transform duration-300 group-hover:scale-[1.02] origin-left">
                <span className="font-sans text-4xl font-black tracking-tighter leading-none">{plan.price}</span>
                <span className="font-mono text-[10px] font-bold uppercase ml-1 text-gray-400">/{plan.period}</span>
              </div>
              <p className="font-sans text-[12px] mt-2 text-gray-500 line-clamp-1">{plan.description}</p>
            </div>

            {/* Features Area */}
            <div className="px-5 py-5 flex-1 flex flex-col justify-between bg-white">
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 transition-transform duration-300 ease-out group-hover:translate-x-1"
                    style={{ transitionDelay: `${idx * 40}ms` }}
                  >
                    <span className={`material-symbols-outlined text-base mt-0.5 ${plan.accentColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="font-sans text-[13px] text-gray-800 leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <div className="mt-6">
                <Link
                  href={plan.href}
                  className={`w-full py-2.5 font-mono font-bold uppercase tracking-wider text-[11px] border-2 border-black flex items-center justify-center gap-2 shadow-[2px_2px_0_0_#111] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none ${plan.buttonStyle}`}
                >
                  {plan.cta}
                  <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
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