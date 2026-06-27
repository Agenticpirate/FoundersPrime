'use client'

import { useState } from 'react'
import Link from 'next/link'

const DEALS = [
  {
    plan: 'FOUNDER Plan',
    period: '1 Year',
    discount: '50% OFF',
    code: 'FOUNDERLAUNCH50',
    color: '#FFD700',
    glow: 'rgba(255,215,0,0.35)',
    border: 'rgba(255,215,0,0.5)',
    bg: 'rgba(255,215,0,0.06)',
    icon: 'rocket_launch',
    badge: 'FOUNDER',
    description: 'For early adopters ready to build',
  },
  {
    plan: 'NEXTFOUNDERS Plan',
    period: 'For Students',
    discount: '60% OFF',
    code: 'NEXTLAUNCH60',
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.35)',
    border: 'rgba(96,165,250,0.5)',
    bg: 'rgba(96,165,250,0.06)',
    icon: 'school',
    badge: 'STUDENT',
    description: 'Exclusive rate for student founders',
  },
  {
    plan: 'LEGEND Lifetime',
    period: 'Lifetime Access',
    discount: '60% OFF',
    code: 'LEGENDLAUNCH60',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.35)',
    border: 'rgba(167,139,250,0.5)',
    bg: 'rgba(167,139,250,0.06)',
    icon: 'workspace_premium',
    badge: 'LEGEND',
    description: 'One-time payment, forever access',
  },
]

function CouponCard({ deal, index }: { deal: typeof DEALS[number]; index: number }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(deal.code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div
      className="relative flex flex-col rounded-xl overflow-hidden group"
      style={{
        background: deal.bg,
        border: `1.5px solid ${deal.border}`,
        boxShadow: `0 0 30px ${deal.glow}, inset 0 0 30px rgba(0,0,0,0.2)`,
        animationDelay: `${index * 0.15}s`,
      }}
    >
      {/* Animated shimmer sweep */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
        style={{
          background: `linear-gradient(105deg, transparent 40%, ${deal.color}18 50%, transparent 60%)`,
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.8s infinite',
        }}
      />

      {/* Top pulse badge */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-4 pb-0">
        <span
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest font-mono"
          style={{ background: `${deal.color}22`, color: deal.color, border: `1px solid ${deal.color}44` }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: deal.color }}
          />
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

      {/* Coupon code — copy button */}
      <div className="relative z-10 px-4 py-4">
        <p className="text-[9px] font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1.5">Promo Code</p>
        <button
          onClick={copy}
          className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg font-mono font-black text-sm tracking-widest transition-all duration-200 active:scale-95"
          style={{
            background: `${deal.color}12`,
            border: `1.5px dashed ${deal.color}60`,
            color: deal.color,
          }}
        >
          <span>{deal.code}</span>
          <span
            className="material-symbols-outlined text-[16px] transition-all duration-200"
            style={{ color: copied ? '#22c55e' : deal.color, fontVariationSettings: "'FILL' 1" }}
          >
            {copied ? 'check_circle' : 'content_copy'}
          </span>
        </button>
        <p className="text-[9px] text-gray-500 dark:text-gray-400 mt-1.5 text-center">
          {copied ? '✓ Copied to clipboard!' : 'Click to copy · Apply at checkout'}
        </p>
      </div>

      {/* CTA */}
      <div className="relative z-10 px-4 pb-4 mt-auto">
        <Link
          href="/pricing"
          className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg font-mono font-black text-[11px] uppercase tracking-wider transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{
            background: deal.color,
            color: '#000',
            boxShadow: `0 4px 16px ${deal.glow}`,
          }}
        >
          Claim This Deal
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
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
          <span
            className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"
          />
          <span className="font-mono text-[10px] font-black uppercase tracking-[0.15em] text-amber-400">
            Founding Member Launch Offer
          </span>
        </div>
        <h2 className="font-mono font-black text-2xl md:text-3xl text-gray-900 dark:text-white leading-tight mb-2">
          Early Adopter Launch Discounts
        </h2>
        <p className="text-[13px] text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          FoundersPrime is opening founding member launch discounts for early adopters — making this the strongest time for founders who want immediate savings <em>and</em> long-term access to verified startup offers.
        </p>
      </div>

      {/* 3 coupon cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
        {DEALS.map((deal, i) => (
          <CouponCard key={deal.code} deal={deal} index={i} />
        ))}
      </div>

      {/* Bottom note */}
      <p className="text-center text-[11px] text-gray-600 mt-6 font-mono">
        Apply promo codes at checkout on the{' '}
        <Link href="/pricing" className="text-amber-400 hover:underline">
          Pricing page →
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
