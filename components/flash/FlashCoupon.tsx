'use client'

import Link from 'next/link'

const PLANS = [
  {
    plan: "Next' Founder",
    price: '$12',
    originalPrice: '$59',
    discount: '80% OFF',
    period: '/ year',
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.5)',
    icon: 'school',
    tag: 'Students',
  },
  {
    plan: 'Founder',
    price: '$75',
    originalPrice: '$149',
    discount: '50% OFF',
    period: '/ year',
    color: '#FFD700',
    glow: 'rgba(255,215,0,0.5)',
    icon: 'rocket_launch',
    tag: 'Early Adopter',
  },
  {
    plan: 'Legend',
    price: '$120',
    originalPrice: '$299',
    discount: '60% OFF',
    period: 'lifetime',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.5)',
    icon: 'workspace_premium',
    tag: 'Lifetime',
  },
]

export default function FlashCoupon() {
  return (
    <div className="space-y-2">
      {/* Header label */}
      <p className="flex items-center gap-1.5 font-mono text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">
        <span className="material-symbols-outlined text-[12px] text-accent-yellow" style={{ fontVariationSettings: "'FILL' 1" }}>
          local_offer
        </span>
        Membership Prices — Limited Time
      </p>

      {/* Price pills */}
      <div className="flex flex-wrap gap-2">
        {PLANS.map((p) => (
          <Link
            key={p.plan}
            href="/pricing"
            className="group relative flex items-center gap-2 px-3 py-2 transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: `${p.color}10`,
              border: `1.5px solid ${p.color}40`,
              borderRadius: '6px',
              boxShadow: `0 0 12px ${p.glow.replace('0.5', '0.08')}`,
            }}
          >
            <span
              className="material-symbols-outlined text-[14px] flex-shrink-0"
              style={{ color: p.color, fontVariationSettings: "'FILL' 1" }}
            >
              {p.icon}
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[8px] uppercase tracking-widest" style={{ color: `${p.color}99` }}>
                {p.tag}
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono font-black text-[15px] leading-none" style={{ color: p.color }}>
                  {p.price}
                </span>
                <span className="text-[9px] text-gray-500 line-through font-mono">{p.originalPrice}</span>
                <span
                  className="text-[8px] font-black font-mono px-1 py-0.5 rounded"
                  style={{ background: `${p.color}20`, color: p.color }}
                >
                  {p.discount}
                </span>
              </div>
              <p className="font-mono text-[8px] text-gray-500">{p.plan} · {p.period}</p>
            </div>
            <span
              className="material-symbols-outlined text-[12px] opacity-0 group-hover:opacity-100 transition-opacity ml-auto flex-shrink-0"
              style={{ color: p.color }}
            >
              arrow_forward
            </span>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <p className="flex items-center gap-1.5 mt-1 font-sans text-[10.5px] text-gray-600 dark:text-gray-500">
        <span className="material-symbols-outlined text-[13px] text-gray-500">info</span>
        Launch pricing — these rates won&apos;t last.{' '}
        <Link href="/pricing" className="text-accent-yellow hover:underline font-semibold">
          See all plans →
        </Link>
      </p>
    </div>
  )
}
