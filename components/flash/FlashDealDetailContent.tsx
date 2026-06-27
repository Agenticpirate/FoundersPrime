'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { FlashDeal } from '@/data/flash-deals'
import FlashCountdown from './FlashCountdown'
import FlashLogo from './FlashLogo'

const BADGE_STYLES = {
  hot: { label: '🔥 Hot Deal', className: 'bg-red-500 text-white' },
  recommended: { label: '⭐ Recommended', className: 'bg-amber-400 text-black' },
  new: { label: '✦ New Drop', className: 'bg-purple-600 text-white' },
}

export default function FlashDealDetailContent({ deal }: { deal: FlashDeal }) {
  const [copiedRegion, setCopiedRegion] = useState<string | null>(null)
  const badge = BADGE_STYLES[deal.badge]

  const handleRegionClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

        {/* ── LEFT: Main Content ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Hero card */}
          <div className="relative bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden shadow-sm">
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-accent-yellow via-amber-400 to-transparent" />

            <div className="p-6">
              <div className="flex items-start gap-4">
                {/* Logo */}
                <div className="w-16 h-16 flex-shrink-0 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl flex items-center justify-center overflow-hidden p-2">
                  <FlashLogo deal={deal} size="w-12 h-12" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`inline-block px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-sm ${badge.className}`}>
                      {badge.label}
                    </span>
                    <span className="inline-block px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      ⚡ Flash Deal
                    </span>
                  </div>
                  <h1 className="font-mono font-black text-2xl md:text-3xl text-gray-900 dark:text-white leading-tight">
                    {deal.name}
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm leading-relaxed">
                    {deal.longDescription || deal.description}
                  </p>
                </div>
              </div>

              {/* Price + Discount row */}
              <div className="mt-5 flex flex-wrap items-center gap-3 pt-5 border-t border-gray-100 dark:border-white/5">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono font-black text-3xl text-emerald-500 dark:text-emerald-400">
                    {deal.price}
                  </span>
                  <span className="font-mono text-sm text-gray-400 uppercase tracking-wide">
                    {deal.priceUnit}
                  </span>
                </div>
                {deal.originalPrice && (
                  <span className="font-mono text-sm text-gray-500 line-through">{deal.originalPrice}</span>
                )}
                <span className="ml-auto inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg font-mono font-black text-sm uppercase tracking-wide">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_offer</span>
                  {deal.discount}
                </span>
              </div>
            </div>
          </div>

          {/* Highlights */}
          {deal.highlights && deal.highlights.length > 0 && (
            <div className="bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-xl p-6">
              <h2 className="font-mono font-black text-sm uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-accent-yellow text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                What You Get
              </h2>
              <ul className="space-y-2.5">
                {deal.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-emerald-400 text-[16px] mt-0.5 flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {deal.id === 'adobe-express-linkedin-airtel' && (
            <div className="bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-xl p-6">
              <h2 className="font-mono font-black text-sm uppercase tracking-wider text-[#0a66c2] flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  workspace_premium
                </span>
                LinkedIn Premium Perks Included
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
                Activating your free LinkedIn Premium membership also grants you access to these premium partner rewards at no extra cost:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { logo: 'https://logo.clearbit.com/youtube.com', name: 'YouTube Premium', perk: '3 Months Free', desc: 'Ad-free video play, offline downloads, and background listening.' },
                  { logo: 'https://logo.clearbit.com/lovable.dev', name: 'Lovable Plus', perk: '1 Year Free', desc: 'Build and ship complete production web apps instantly using AI.' },
                  { logo: 'https://logo.clearbit.com/headspace.com', name: 'Headspace Plus', perk: '4 Months Free', desc: 'Science-backed mindfulness, meditation, and sleep tools.' },
                  { logo: 'https://logo.clearbit.com/notion.so', name: 'Notion Business', perk: '3 Months Free', desc: 'Connected workspace for docs, wikis, and team management.' },
                  { logo: 'https://logo.clearbit.com/nordvpn.com', name: 'NordVPN Basic', perk: '3 Months Free', desc: 'Fast, secure, and private internet browse access.' },
                ].map((item) => (
                  <div key={item.name} className="flex items-start gap-3.5 p-3.5 bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 rounded-xl hover:border-gray-300 dark:hover:border-white/10 transition-colors">
                    <img 
                      src={item.logo} 
                      alt={item.name} 
                      className="w-10 h-10 rounded-lg object-contain bg-white p-1.5 border border-gray-200 dark:border-white/10 flex-shrink-0"
                      onError={(e) => {
                        // Fallback icon if logo fails to load
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="min-w-0">
                      <p className="font-mono font-bold text-xs uppercase tracking-tight text-gray-900 dark:text-white">{item.name}</p>
                      <p className="text-xs font-black text-emerald-500 dark:text-emerald-400 mt-0.5">{item.perk}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1.5 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Eligibility */}
          {deal.eligibility && deal.eligibility.length > 0 && (
            <div className="bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-xl p-6">
              <h2 className="font-mono font-black text-sm uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-blue-400 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified_user
                </span>
                Eligibility Requirements
              </h2>
              <ul className="space-y-2.5">
                {deal.eligibility.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-blue-400 text-[16px] mt-0.5 flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                      info
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Step-by-step instructions */}
          {deal.steps && deal.steps.length > 0 && (
            <div className="bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-xl p-6">
              <h2 className="font-mono font-black text-sm uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-accent-yellow text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  format_list_numbered
                </span>
                How to Claim — Step by Step
              </h2>
              <div className="space-y-0">
                {deal.steps.map((step, i) => (
                  <div key={step.step} className="relative flex gap-4">
                    {/* Connector line */}
                    {i < deal.steps!.length - 1 && (
                      <div className="absolute left-5 top-10 bottom-0 w-[2px] bg-gradient-to-b from-accent-yellow/40 to-transparent" />
                    )}

                    {/* Step number circle */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-yellow/10 border-2 border-accent-yellow/40 flex items-center justify-center font-mono font-black text-sm text-accent-yellow z-10">
                      {step.step}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-6">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-accent-yellow text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {step.icon}
                        </span>
                        <p className="font-mono font-bold text-sm text-gray-900 dark:text-white">{step.title}</p>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed ml-5">
                        {step.description}
                        {(step as any).url && (
                          <a 
                            href={(step as any).url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="ml-1.5 text-accent-yellow dark:text-amber-400 hover:underline font-bold inline-flex items-center gap-0.5"
                          >
                            Click Here
                            <span className="material-symbols-outlined !text-[12px]">open_in_new</span>
                          </a>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Region options (for ChatGPT etc) */}
          {deal.options && deal.options.length > 0 && (
            <div className="bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-xl p-6">
              <h2 className="font-mono font-black text-sm uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-blue-400 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  public
                </span>
                Select Your Region
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Choose your country — each has a unique promo link that auto-applies your discount.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {deal.options.map((opt) => (
                  <a
                    key={opt.label}
                    href={opt.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 hover:border-accent-yellow dark:hover:border-accent-yellow hover:bg-accent-yellow/5 transition-all rounded-lg text-sm font-mono font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white group"
                  >
                    <span>{opt.label}</span>
                    <span className="material-symbols-outlined text-[13px] text-gray-400 group-hover:text-accent-yellow group-hover:translate-x-0.5 transition-all">
                      arrow_forward
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          {deal.tips && deal.tips.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/20 rounded-xl p-5">
              <h2 className="font-mono font-black text-sm uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  lightbulb
                </span>
                Pro Tips
              </h2>
              <ul className="space-y-2">
                {deal.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-amber-500 mt-0.5 text-xs">→</span>
                    <span className="text-sm text-amber-800 dark:text-amber-300/80 leading-snug">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ── RIGHT: Sidebar ── */}
        <div className="space-y-4">

          {/* Countdown */}
          <div className="bg-gradient-to-br from-[#1c1a0e] via-[#0d0d0d] to-[#000] border border-accent-yellow/30 rounded-xl p-5">
            <p className="font-mono font-bold text-[10px] uppercase tracking-[0.2em] text-accent-yellow mb-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              Deal Expires In
            </p>
            <FlashCountdown deal={deal} variant="compact" />
          </div>

          {/* Main CTA */}
          <div className="bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-xl p-5">
            <p className="font-mono font-black text-xs uppercase tracking-wider text-gray-900 dark:text-white mb-3">
              Ready to claim?
            </p>
            {deal.options && deal.options.length > 0 ? (
              <div>
                <p className="text-[11px] text-gray-500 mb-3">Select your region above to get your promo link.</p>
                <a
                  href="#region-select"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-accent-yellow text-black font-mono font-black text-sm uppercase tracking-wide rounded-lg hover:bg-white transition-colors shadow-[0_4px_16px_rgba(255,215,0,0.25)]"
                >
                  Select Region & Claim
                  <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                </a>
              </div>
            ) : (
              <a
                href={deal.dealUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-accent-yellow text-black font-mono font-black text-sm uppercase tracking-wide rounded-lg hover:bg-white transition-colors shadow-[0_4px_16px_rgba(255,215,0,0.25)]"
              >
                Claim Now — It&apos;s Free
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            )}
            <p className="text-[10px] text-gray-500 text-center mt-2.5">
              Limited time offer · Gone when timer hits zero
            </p>
          </div>

          {/* Share */}
          <div className="bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-xl p-5">
            <p className="font-mono font-black text-xs uppercase tracking-wider text-gray-900 dark:text-white mb-3">
              Share This Deal
            </p>
            <div className="flex gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=Just found this deal on FoundersPrime: ${deal.name} — ${deal.discount}! ${typeof window !== 'undefined' ? window.location.href : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg text-xs font-mono font-bold text-gray-700 dark:text-gray-300 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">share</span>
                Share
              </a>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    navigator.clipboard.writeText(window.location.href)
                  }
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg text-xs font-mono font-bold text-gray-700 dark:text-gray-300 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">link</span>
                Copy Link
              </button>
            </div>
          </div>

          {/* Back */}
          <Link
            href="/flash-deals"
            className="flex items-center gap-1.5 text-xs font-mono font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            Back to all Flash Deals
          </Link>
        </div>

      </div>
    </div>
  )
}
