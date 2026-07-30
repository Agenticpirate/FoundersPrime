'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { FlashDeal } from '@/data/flash-deals'
import FlashCountdown from './FlashCountdown'
import FlashLogo from './FlashLogo'
import { useAuth } from '@/lib/auth/hooks'

const BADGE_STYLES = {
  hot: { label: '🔥 Hot Deal', className: 'bg-red-500 text-white' },
  recommended: { label: '⭐ Recommended', className: 'bg-amber-400 text-black' },
  new: { label: '✦ New Drop', className: 'bg-purple-600 text-white' },
}

export default function FlashDealDetailContent({ deal }: { deal: FlashDeal }) {
  const [copiedRegion, setCopiedRegion] = useState<string | null>(null)
  const badge = BADGE_STYLES[deal.badge]
  const { loading, isAuthenticated, signInWithGoogle, signInWithGithub } = useAuth()

  if (loading) {
    return (
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-6 h-56" />
            <div className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-6 h-36" />
            <div className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-6 h-40" />
          </div>
          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-6 h-36" />
            <div className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-6 h-28" />
          </div>
        </div>
      </div>
    )
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
                  <FlashLogo deal={deal} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`inline-block px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-sm ${badge.className}`}>
                      {badge.label}
                    </span>
                    <span className="inline-block px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-sm bg-accent-yellow/10 text-accent-yellow border border-accent-yellow/25">
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
                  <span className="font-mono font-black text-3xl text-amber-600 dark:text-accent-yellow">
                    {deal.price}
                  </span>
                  <span className="font-mono text-sm text-gray-400 uppercase tracking-wide">
                    {deal.priceUnit}
                  </span>
                </div>
                {deal.originalPrice && (
                  <span className="font-mono text-sm text-gray-500 line-through">{deal.originalPrice}</span>
                )}
                <span className="ml-auto inline-flex items-center gap-1 px-3 py-1.5 bg-accent-yellow/10 text-accent-yellow border border-accent-yellow/25 rounded-lg font-mono font-black text-sm uppercase tracking-wide">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_offer</span>
                  {deal.discount}
                </span>
              </div>
            </div>
          </div>

          {!isAuthenticated && (
            <div id="unlock-gate-card" className="relative overflow-hidden border-2 border-accent-yellow bg-gradient-to-br from-[#1a1710]/95 via-[#0c0c0c]/98 to-black p-6 md:p-8 rounded-xl shadow-[0_0_40px_rgba(255,213,0,0.25)] z-20">
              {/* Scanline background grid overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.25] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(rgba(255,215,0,0.15) 1px, transparent 1.5px)',
                  backgroundSize: '16px 16px',
                }}
              />
              <div className="relative flex flex-col items-center text-center max-w-xl mx-auto py-3">
                <div className="relative flex items-center justify-center w-14 h-14 bg-accent-yellow/15 border-2 border-accent-yellow rounded-full mb-4 animate-[pulse_2.5s_ease-in-out_infinite] shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                  <span className="material-symbols-outlined text-[24px] text-accent-yellow" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                </div>
                <h2 className="font-mono font-black text-lg md:text-xl uppercase tracking-wider text-white mb-2">
                  Sign Up to Unlock This Deal
                </h2>
                <p className="font-sans text-xs md:text-sm text-gray-400 mb-6 leading-relaxed">
                  Join FoundersPrime for free. Verify your account in seconds to instantly reveal the promo code, access dynamic claim URLs, and get step-by-step instructions for this flash deal.
                </p>

                {/* OAuth Login buttons */}
                <div className="flex flex-col w-full max-w-sm gap-2.5">
                  <button type="button"
                    onClick={() => signInWithGoogle(`/flash-deals/${deal.id}`)}
                    className="flex items-center justify-center gap-2.5 w-full py-3 bg-white hover:bg-gray-150 text-black font-mono font-black text-xs uppercase tracking-wide rounded-lg transition-all shadow-md"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                  </button>

                  <button type="button"
                    onClick={() => signInWithGithub(`/flash-deals/${deal.id}`)}
                    className="flex items-center justify-center gap-2.5 w-full py-3 bg-[#24292e] hover:bg-[#2c3238] text-white font-mono font-black text-xs uppercase tracking-wide rounded-lg transition-all shadow-md"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 3.293-.01 5.955-.01 6.8 0 .325.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                    Continue with GitHub
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-mono mt-6">
                  <Link
                    href={`/login?view=signup&redirect=${encodeURIComponent(`/flash-deals/${deal.id}`)}`}
                    className="text-accent-yellow hover:underline"
                  >
                    Create Account with Email
                  </Link>
                  <span className="text-gray-600 hidden sm:inline">•</span>
                  <Link
                    href={`/login?view=login&redirect=${encodeURIComponent(`/flash-deals/${deal.id}`)}`}
                    className="text-gray-400 hover:text-white hover:underline"
                  >
                    Already registered? Sign In
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Public teaser — safe to show without auth */}
          <div className="space-y-6">
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
                  <li key={item} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-accent-yellow text-[16px] mt-0.5 flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

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
                  <li key={item} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-blue-400 text-[16px] mt-0.5 flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                      info
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          </div>

          {/* Claim instructions / URLs — only for signed-in users (never in DOM when logged out) */}
          {isAuthenticated && (
          <div className="space-y-6">
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
                    <Image 
                      src={item.logo} 
                      alt={item.name}
                      width={40}
                      height={40} 
                      className="w-10 h-10 rounded-lg object-contain bg-white p-1.5 border border-gray-200 dark:border-white/10 flex-shrink-0"
                      onError={(e) => {
                        // Fallback icon if logo fails to load
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="min-w-0">
                      <p className="font-mono font-bold text-xs uppercase tracking-tight text-gray-900 dark:text-white">{item.name}</p>
                      <p className="text-xs font-black text-amber-600 dark:text-accent-yellow mt-0.5">{item.perk}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1.5 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
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
            <div id="region-select" className="bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-xl p-6 scroll-mt-24">
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
                  <li key={tip} className="flex items-start gap-2.5">
                    <span className="text-amber-500 mt-0.5 text-xs">→</span>
                    <span className="text-sm text-amber-800 dark:text-amber-300/80 leading-snug">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          </div>
          )}
        </div>

        {/* ── RIGHT: Sidebar ── */}
        <div className="space-y-4">

          {/* Countdown — only when the deal has an explicit timing value */}
          {(deal.endsAt || deal.durationHours) && (
            <div className="bg-gradient-to-br from-[#1c1a0e] via-[#0d0d0d] to-[#000] border border-accent-yellow/30 rounded-xl p-5">
              <p className="font-mono font-bold text-[10px] uppercase tracking-[0.2em] text-accent-yellow mb-3 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                Deal Expires In
              </p>
              <FlashCountdown endsAt={deal.endsAt} durationHours={deal.durationHours} variant="inline" />
            </div>
          )}

          {/* Main CTA — claim URLs only after signup */}
          <div className="bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-xl p-5">
            <p className="font-mono font-black text-xs uppercase tracking-wider text-gray-900 dark:text-white mb-3">
              Ready to claim?
            </p>
            {!isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  href={`/login?view=signup&redirect=${encodeURIComponent(`/flash-deals/${deal.id}`)}`}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-accent-yellow hover:bg-yellow-400 text-black font-mono font-black text-sm uppercase tracking-wide rounded-lg transition-colors shadow-[0_4px_16px_rgba(255,215,0,0.25)]"
                >
                  Sign up free to claim
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                </Link>
                <Link
                  href={`/login?view=login&redirect=${encodeURIComponent(`/flash-deals/${deal.id}`)}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 border border-black/10 dark:border-white/15 text-gray-700 dark:text-gray-300 font-mono font-bold text-[11px] uppercase tracking-wide rounded-lg hover:border-accent-yellow/40 transition-colors"
                >
                  Already have an account? Sign in
                </Link>
                <p className="text-[10px] text-gray-500 text-center pt-1">
                  Free account required · no membership needed
                </p>
              </div>
            ) : deal.options && deal.options.length > 0 ? (
              <div>
                <p className="text-[11px] text-gray-500 mb-3">Select your region above to get your promo link.</p>
                <a
                  href="#region-select"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-accent-yellow text-black font-mono font-black text-sm uppercase tracking-wide rounded-lg hover:bg-white transition-colors shadow-[0_4px_16px_rgba(255,215,0,0.25)]"
                >
                  Select Region &amp; Claim
                  <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                </a>
                <p className="text-[10px] text-gray-500 text-center mt-2.5">
                  Limited time · Gone when timer hits zero
                </p>
              </div>
            ) : (
              <div>
                <a
                  href={deal.dealUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-accent-yellow text-black font-mono font-black text-sm uppercase tracking-wide rounded-lg hover:bg-white transition-colors shadow-[0_4px_16px_rgba(255,215,0,0.25)]"
                >
                  {deal.ctaLabel || "Claim Now — It's Free"}
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
                <p className="text-[10px] text-gray-500 text-center mt-2.5">
                  {deal.claimNote || 'Limited time · Verify final terms with the provider'}
                </p>
              </div>
            )}
          </div>

          {/* Share */}
          <div className="bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-xl p-5">
            <p className="font-mono font-black text-xs uppercase tracking-wider text-gray-900 dark:text-white mb-3">
              Share This Deal
            </p>
            <div className="flex gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `Just found this deal on FoundersPrime: ${deal.name} — ${deal.discount}!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg text-xs font-mono font-bold text-gray-700 dark:text-gray-300 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">share</span>
                Share
              </a>
              <button type="button"
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
