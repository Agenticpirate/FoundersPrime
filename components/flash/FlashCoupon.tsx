'use client'

import Link from 'next/link'

const PLANS = [
  {
    plan: "Next'Founder",
    price: '$1',
    originalPrice: '$59',
    discount: '98% OFF',
    period: '/ year',
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.5)',
    icon: 'school',
    tag: 'Students',
  },
  {
    plan: 'Founder',
    price: '$48',
    originalPrice: '$149',
    discount: '68% OFF',
    period: '/ year',
    color: '#FFD700',
    glow: 'rgba(255,215,0,0.5)',
    icon: 'rocket_launch',
    tag: 'Early Adopter',
  },
  {
    plan: 'Legend',
    price: '$99',
    originalPrice: '$299',
    discount: '67% OFF',
    period: 'lifetime',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.5)',
    icon: 'workspace_premium',
    tag: 'Lifetime',
  },
]

export default function FlashCoupon() {
  return (
    <div className="space-y-1.5 sm:space-y-2.5 w-full max-w-lg">
      <p className="flex items-center gap-1.5 font-mono text-[8px] sm:text-[9px] font-black uppercase tracking-[0.16em] text-gray-500">
        <span
          className="material-symbols-outlined text-[11px] sm:text-[12px] text-accent-yellow"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          local_offer
        </span>
        Launch pricing
      </p>

      {/* Always one row — equal width cards */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 w-full">
        {PLANS.map((p) => (
          <Link
            key={p.plan}
            href="/pricing"
            className="group relative flex min-w-0 flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 px-2 sm:px-2.5 py-2 sm:py-2 rounded-lg sm:rounded-xl transition-all duration-200 md:hover:-translate-y-0.5 hover:brightness-110"
            style={{
              background: `${p.color}12`,
              border: `1.5px solid ${p.color}45`,
              boxShadow: `0 0 12px ${p.glow.replace('0.5', '0.08')}`,
            }}
          >
            <span
              className="material-symbols-outlined text-[14px] sm:text-[15px] flex-shrink-0"
              style={{ color: p.color, fontVariationSettings: "'FILL' 1" }}
            >
              {p.icon}
            </span>
            <div className="min-w-0 flex-1">
              <p
                className="font-mono text-[7px] sm:text-[8px] uppercase tracking-widest truncate"
                style={{ color: `${p.color}aa` }}
              >
                {p.tag}
              </p>
              <div className="flex items-baseline gap-1 flex-wrap">
                <span
                  className="font-mono font-black text-[13px] sm:text-[15px] leading-none"
                  style={{ color: p.color }}
                >
                  {p.price}
                </span>
                <span className="text-[8px] sm:text-[9px] text-gray-500 line-through font-mono">
                  {p.originalPrice}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                <span
                  className="text-[7px] sm:text-[8px] font-black font-mono px-1 py-0.5 rounded leading-none"
                  style={{ background: `${p.color}22`, color: p.color }}
                >
                  {p.discount}
                </span>
                <span className="font-mono text-[7px] sm:text-[8px] text-gray-500 truncate">
                  {p.period}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <p className="flex items-center gap-1.5 font-sans text-[10px] sm:text-[10.5px] text-gray-600 dark:text-gray-500">
        <span className="material-symbols-outlined text-[12px] sm:text-[13px] text-gray-500">
          info
        </span>
        Launch rates won&apos;t last.{' '}
        <Link href="/pricing" className="text-accent-yellow hover:underline font-semibold">
          See all plans →
        </Link>
      </p>
    </div>
  )
}
