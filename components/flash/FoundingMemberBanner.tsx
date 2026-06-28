'use client'

import Link from 'next/link'

const DEALS = [
  {
    plan: "Next' Founder Plan",
    period: 'For Students',
    discount: '80% OFF',
    originalPrice: '$120',
    discountedPrice: '$24',
    perLabel: '/ year',
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.35)',
    border: 'rgba(96,165,250,0.5)',
    bg: 'rgba(96,165,250,0.06)',
    icon: 'school',
    badge: 'STUDENT',
    description: 'Exclusive rate for student founders',
    highlights: ['All deals & credits', 'Student benefits library', 'AI tools access'],
  },
  {
    plan: 'Founder Plan',
    period: '1 Year Access',
    discount: '38% OFF',
    originalPrice: '$120',
    discountedPrice: '$75',
    perLabel: '/ year',
    color: '#FFD700',
    glow: 'rgba(255,215,0,0.35)',
    border: 'rgba(255,215,0,0.5)',
    bg: 'rgba(255,215,0,0.06)',
    icon: 'rocket_launch',
    badge: 'FOUNDER',
    description: 'For early adopters ready to build',
    highlights: ['1,000+ verified deals', 'Flash deal alerts', 'Priority access'],
  },
  {
    plan: 'Legend Lifetime',
    period: 'Lifetime Access',
    discount: '33% OFF',
    originalPrice: '$180',
    discountedPrice: '$120',
    perLabel: 'one-time',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.35)',
    border: 'rgba(167,139,250,0.5)',
    bg: 'rgba(167,139,250,0.06)',
    icon: 'workspace_premium',
    badge: 'LEGEND',
    description: 'One-time payment, forever access',
    highlights: ['Everything forever', 'VIP community access', 'Founder concierge'],
  },
]

function PriceCard({ deal, index }: { deal: typeof DEALS[number]; index: number }) {
  return (
    <div
      className="relative flex flex-col rounded-xl overflow-hidden group transition-transform duration-300 hover:-translate-y-1"
      style={{
        background: deal.bg,
        border: `1.5px solid ${deal.border}`,
        boxShadow: `0 0 30px ${deal.glow}, inset 0 0 30px rgba(0,0,0,0.2)`,
        animationDelay: `${index * 0.15}s`,
      }}
    >
      {/* Shimmer sweep on hover */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
        style={{
          background: `linear-gradient(105deg, transparent 40%, ${deal.color}18 50%, transparent 60%)`,
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.8s infinite',
        }}
      />

      {/* Top badge row */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-4 pb-0">
        <span
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest font-mono"
          style={{ background: `${deal.color}22`, color: deal.color, border: `1px solid ${deal.color}44` }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: deal.color }} />
          {deal.badge}
        </span>
        <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">{deal.period}</span>
      </div>

      {/* Plan icon + name */}
      <div className="relative z-10 flex items-center gap-3 px-4 pt-3 pb-1">
        <span
          className="material-symbols-outlined text-[28px] flex-shrink-0"
          style={{
            color: deal.color,
            fontVariationSettings: "'FILL' 1",
            filter: `drop-shadow(0 0 8px ${deal.glow})`,
          }}
        >
          {deal.icon}
        </span>
        <div>
          <p className="font-mono font-black text-sm text-gray-900 dark:text-white leading-tight">{deal.plan}</p>
          <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-tight mt-0.5">{deal.description}</p>
        </div>
      </div>

      {/* Discount badge */}
      <div className="relative z-10 px-4 py-3">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{ background: `${deal.color}18`, border: `1px solid ${deal.color}33` }}
        >
          <span className="material-symbols-outlined text-[14px]" style={{ color: deal.color, fontVariationSettings: "'FILL' 1" }}>
            local_offer
          </span>
          <span
            className="font-mono font-black text-xl tracking-tight"
            style={{ color: deal.color, textShadow: `0 0 20px ${deal.glow}` }}
          >
            {deal.discount}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 border-t" style={{ borderColor: `${deal.color}20` }} />

      {/* Price display — no coupon code */}
      <div className="relative z-10 px-4 py-4">
        <p className="text-[9px] font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
          Launch Price
        </p>
        <div className="flex items-end gap-2">
          <span
            className="font-mono font-black text-3xl leading-none"
            style={{ color: deal.color, textShadow: `0 0 16px ${deal.glow}` }}
          >
            {deal.discountedPrice}
          </span>
          <div className="flex flex-col mb-0.5">
            <span className="text-[10px] font-mono text-gray-500 line-through">{deal.originalPrice}</span>
            <span className="text-[10px] font-mono text-gray-500">{deal.perLabel}</span>
          </div>
        </div>

        {/* Highlights */}
        <ul className="mt-3 space-y-1.5">
          {deal.highlights.map((h) => (
            <li key={h} className="flex items-center gap-1.5 text-[11px] text-gray-600 dark:text-gray-400">
              <span
                className="material-symbols-outlined text-[13px] flex-shrink-0"
                style={{ color: deal.color, fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA — link to pricing page */}
      <div className="relative z-10 px-4 pb-4 mt-auto">
        <Link
          href="/pricing"
          className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg font-mono font-black text-[11px] uppercase tracking-wider transition-all duration-200 hover:opacity-90 active:scale-95 group/btn"
          style={{
            background: deal.color,
            color: '#000',
            boxShadow: `0 4px 16px ${deal.glow}`,
          }}
        >
          Get This Price
          <span className="material-symbols-outlined text-[14px] group-hover/btn:translate-x-0.5 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  )
}

export default function FoundingMemberBanner() {
  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full mb-4">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-mono text-[10px] font-black uppercase tracking-[0.15em] text-amber-400">
            Founding Member Launch Offer
          </span>
        </div>
        <h2 className="font-mono font-black text-2xl md:text-3xl text-gray-900 dark:text-white leading-tight mb-2">
          Early Adopter Launch Prices
        </h2>
        <p className="text-[13px] text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          Lock in the lowest price we'll ever offer — these rates disappear once we hit capacity.{' '}
          <Link href="/pricing" className="text-amber-400 hover:underline font-semibold">
            See full plan details →
          </Link>
        </p>
      </div>

      {/* 3 price cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
        {DEALS.map((deal, i) => (
          <PriceCard key={deal.plan} deal={deal} index={i} />
        ))}
      </div>

      {/* Bottom note */}
      <p className="text-center text-[11px] text-gray-500 dark:text-gray-500 mt-6 font-mono">
        All plans include full access to the deals library.{' '}
        <Link href="/pricing" className="text-amber-400 hover:underline">
          Compare plans on the Pricing page →
        </Link>
      </p>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </section>
  )
}
