'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { m, useReducedMotion } from 'framer-motion'
import FlashCountdown from './FlashCountdown'
import { nextDropTime } from '@/lib/flash-schedule'
import FlashCoupon from './FlashCoupon'
import { flashDeals } from '@/data/flash-deals'

function Sparkle({ className, delay, size = 24 }: { className?: string; delay: string; size?: number }) {
  return (
    <svg
      className={`absolute pointer-events-none opacity-80 ${className || ''}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ animation: `pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite ${delay}` }}
    >
      <path
        d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z"
        fill="#ffd700"
        filter="drop-shadow(0 0 4px #ffd700)"
      />
    </svg>
  )
}

function LightningBolt() {
  return (
    <div className="animate-[pulse_3s_ease-in-out_infinite]">
      <svg
        viewBox="0 0 120 240"
        aria-hidden="true"
        width="150"
        height="300"
        style={{
          filter:
            'drop-shadow(0 0 18px rgba(255,215,0,0.7)) drop-shadow(0 0 50px rgba(255,215,0,0.28))',
        }}
      >
        <defs>
          <linearGradient id="boltMain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffde0" />
            <stop offset="25%" stopColor="#ffd700" />
            <stop offset="65%" stopColor="#e09900" />
            <stop offset="100%" stopColor="#7a5500" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="boltGlowFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffd700" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffd700" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M74 6 L26 128 H58 L44 234 L98 96 H62 Z"
          fill="url(#boltGlowFill)"
          transform="scale(1.06) translate(-3, -4)"
          className="animate-[pulse_2s_ease-in-out_infinite]"
        />
        <path
          d="M74 6 L26 128 H58 L44 234 L98 96 H62 Z"
          fill="url(#boltMain)"
          stroke="#ffe98a"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

function DropProgress({ progress }: { progress: number }) {
  // progress 0 = just dropped / full wait remaining, 1 = about to drop
  const pct = Math.max(0, Math.min(100, Math.round(progress * 100)))
  return (
    <div className="mt-2.5 sm:mt-4">
      <div className="flex items-center justify-between mb-1 sm:mb-1.5">
        <span className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.14em] text-zinc-500">
          Drop cycle
        </span>
        <span className="font-mono text-[9px] sm:text-[10px] font-black tabular-nums text-accent-yellow">
          {pct}%
        </span>
      </div>
      <div className="relative h-1 sm:h-1.5 rounded-full bg-white/[0.06] overflow-hidden border border-white/[0.06]">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-700 via-accent-yellow to-yellow-200 transition-[width] duration-1000 ease-linear"
          style={{
            width: `${pct}%`,
            boxShadow: '0 0 12px rgba(255,215,0,0.55)',
          }}
        />
        {/* Shimmer */}
        <div
          aria-hidden
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[flashBarShimmer_2.4s_ease-in-out_infinite]"
          style={{ left: `calc(${pct}% - 20%)` }}
        />
      </div>
    </div>
  )
}

function nextDropLabel(): string {
  if (typeof window === 'undefined') return 'Mon · Thu'
  const t = new Date(nextDropTime(new Date()))
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const day = days[t.getDay()]
  return `${day} · 00:00`
}

export default function FlashHero() {
  const reduce = useReducedMotion()
  const liveCount = flashDeals.length
  const hotCount = flashDeals.filter((d) => d.badge === 'hot').length
  const [progress, setProgress] = useState(0)
  const [mountedLabel, setMountedLabel] = useState('Mon · Thu')

  const onTick = useCallback((remainingMs: number, totalMs: number) => {
    const p = totalMs > 0 ? 1 - remainingMs / totalMs : 0
    setProgress(Math.max(0, Math.min(1, p)))
  }, [])

  // Client-only next-drop day label
  useEffect(() => {
    setMountedLabel(nextDropLabel())
  }, [])

  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed ambient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0904] via-transparent to-transparent dark:from-[#0a0904]" />
        <div className="absolute -top-24 left-1/4 w-[420px] h-[420px] rounded-full bg-accent-yellow/[0.07] blur-3xl" />
        <div className="absolute top-20 right-0 w-[320px] h-[320px] rounded-full bg-amber-600/[0.05] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,215,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6 md:pt-8 pb-5 sm:pb-8 lg:overflow-visible overflow-hidden">
        <Sparkle className="hidden sm:block -top-2 left-[8%] lg:left-[-2%] -rotate-12" delay="0s" size={28} />
        <Sparkle className="hidden sm:block top-[38%] left-[42%] opacity-40" delay="0.5s" size={14} />
        <Sparkle className="hidden md:block top-6 right-[48%] opacity-50 rotate-45" delay="1s" size={20} />
        <Sparkle className="hidden sm:block bottom-4 left-[18%] opacity-35 -rotate-45" delay="1.5s" size={18} />
        <Sparkle className="hidden sm:block bottom-[12%] right-[-1%] opacity-60 rotate-12" delay="0.8s" size={24} />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-7 items-stretch">
          {/* ── Left ── */}
          <div className="flex flex-col justify-center">
            <m.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-4"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 sm:px-2.5 sm:py-1">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-full w-full bg-red-500" />
                </span>
                <span className="font-mono font-black text-[8px] sm:text-[9px] uppercase tracking-[0.14em] text-red-400">
                  Live
                </span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-accent-yellow/25 bg-accent-yellow/10 px-2 py-0.5 sm:px-2.5 sm:py-1 font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.1em] text-accent-yellow">
                <span className="material-symbols-outlined !text-[11px] sm:!text-[12px]">bolt</span>
                {liveCount} live
              </span>
              {hotCount > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full border border-orange-500/25 bg-orange-500/10 px-2 py-0.5 sm:px-2.5 sm:py-1 font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.1em] text-orange-400">
                  🔥 {hotCount}
                </span>
              )}
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 sm:px-2.5 sm:py-1 font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.1em] text-emerald-400">
                Free claim
              </span>
            </m.div>

            <m.h1
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-heading font-black uppercase tracking-[-0.02em] leading-[0.95]"
            >
              <span className="flex items-center gap-1.5 sm:gap-3 text-[26px] sm:text-[44px] md:text-[50px] lg:text-[54px] text-accent-yellow">
                <span
                  className="material-symbols-outlined text-[24px] sm:text-[42px] md:text-[48px]"
                  style={{
                    fontVariationSettings: "'FILL' 1",
                    filter:
                      'drop-shadow(0 0 12px rgba(255,215,0,0.8)) drop-shadow(0 0 30px rgba(255,215,0,0.35))',
                  }}
                >
                  bolt
                </span>
                Flash Deals.
              </span>
              <span className="block text-[17px] sm:text-[30px] md:text-[36px] lg:text-[38px] text-gray-900 dark:text-white mt-1 sm:mt-2 leading-tight">
                Deals that disappear fast.
              </span>
            </m.h1>

            <m.p
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-sans text-[12px] sm:text-[13px] md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-2.5 sm:mt-4 max-w-md"
            >
              Limited-time offers on top tools and credits.{' '}
              <span className="text-gray-800 dark:text-gray-200 font-medium">
                New drops every Mon &amp; Thu.
              </span>{' '}
              Gone at zero.
            </m.p>

            {/* Free claim — compact on mobile */}
            <m.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="mt-2.5 sm:mt-3.5 inline-flex max-w-md items-start gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-emerald-500/25 bg-emerald-500/[0.08] px-2.5 py-1.5 sm:px-3 sm:py-2"
            >
              <span
                className="material-symbols-outlined !text-[14px] sm:!text-[16px] text-emerald-400 mt-0.5 shrink-0"
                style={{ fontVariationSettings: "'FILL' 1" }}
                aria-hidden
              >
                verified_user
              </span>
              <p className="font-sans text-[11px] sm:text-[13px] text-emerald-800 dark:text-emerald-200/90 leading-snug">
                <span className="font-bold text-emerald-700 dark:text-emerald-300">
                  No membership.
                </span>{' '}
                Sign up free &amp; claim.
              </p>
            </m.div>

            <m.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
              className="mt-3 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2"
            >
              <a
                href="#flash-deals-grid"
                className="inline-flex items-center gap-1.5 min-h-[40px] sm:min-h-[44px] px-3.5 sm:px-5 rounded-xl bg-accent-yellow text-black font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-wide hover:bg-yellow-300 transition-colors shadow-[0_0_28px_rgba(255,215,0,0.25)]"
              >
                <span className="material-symbols-outlined !text-[15px]">flash_on</span>
                Browse deals
              </a>
              <Link
                href="/login?view=signup&redirect=%2Fflash-deals"
                className="inline-flex items-center gap-1.5 min-h-[40px] sm:min-h-[44px] px-3 sm:px-4 rounded-xl border border-black/10 dark:border-white/15 text-gray-900 dark:text-white font-mono text-[10px] sm:text-[11px] font-bold uppercase hover:border-accent-yellow/40 hover:bg-accent-yellow/[0.06] transition-colors"
              >
                Free signup
                <span className="material-symbols-outlined !text-[13px]">arrow_forward</span>
              </Link>
            </m.div>

            <m.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mt-3.5 sm:mt-6 max-w-lg"
            >
              <FlashCoupon />
            </m.div>
          </div>

          {/* ── Right: NEXT DROP panel ── */}
          <m.div
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.12, duration: 0.45 }}
            className="relative mt-1 lg:mt-0"
          >
            <div
              aria-hidden
              className="absolute -inset-4 sm:-inset-6 rounded-full bg-accent-yellow/[0.06] blur-3xl pointer-events-none"
            />
            <div
              aria-hidden
              className="absolute right-0 top-1/2 -translate-y-1/2 w-40 sm:w-56 h-56 sm:h-72 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse, rgba(255,215,0,0.14) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />

            <div className="relative p-0 sm:p-1 md:p-2 flex flex-col justify-center min-h-0 sm:min-h-[260px]">
              {/* Lightning — desktop only */}
              <div
                className="absolute right-[-8px] top-1/2 -translate-y-1/2 pointer-events-none z-[1] opacity-85 hidden lg:block"
                aria-hidden
              >
                <LightningBolt />
              </div>

              <div className="relative z-10 md:max-w-[72%]">
                <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                  <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-yellow opacity-50" />
                    <span className="relative inline-flex h-full w-full rounded-full bg-accent-yellow" />
                  </span>
                  <div>
                    <p className="font-mono font-black text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-accent-yellow leading-none">
                      Next drop in
                    </p>
                    <p className="font-mono text-[9px] sm:text-[10px] text-zinc-500 mt-1 leading-none">
                      Mon &amp; Thu midnight
                    </p>
                  </div>
                </div>

                <div className="mt-3 sm:mt-5">
                  <FlashCountdown nextDrop variant="hero" onTick={onTick} />
                </div>

                {!reduce && <DropProgress progress={progress} />}

                <div className="mt-3 sm:mt-5 grid grid-cols-2 gap-1.5 sm:gap-2.5">
                  <div className="rounded-lg sm:rounded-xl border border-white/[0.07] bg-white/[0.03] px-2.5 py-2 sm:px-3 sm:py-2.5">
                    <p className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-zinc-500 mb-0.5">
                      Active
                    </p>
                    <p className="font-mono text-base sm:text-xl font-black text-white tabular-nums leading-none">
                      {liveCount}
                    </p>
                    <p className="font-mono text-[8px] sm:text-[9px] text-zinc-600 mt-0.5 sm:mt-1">offers</p>
                  </div>
                  <div className="rounded-lg sm:rounded-xl border border-accent-yellow/20 bg-accent-yellow/[0.05] px-2.5 py-2 sm:px-3 sm:py-2.5">
                    <p className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-zinc-500 mb-0.5">
                      Next
                    </p>
                    <p className="font-mono text-[11px] sm:text-[13px] font-black text-accent-yellow leading-tight">
                      {mountedLabel}
                    </p>
                    <p className="font-mono text-[8px] sm:text-[9px] text-zinc-600 mt-0.5 sm:mt-1">local</p>
                  </div>
                </div>

                <a
                  href="#flash-deals-grid"
                  className="mt-3 sm:mt-4 inline-flex w-full sm:w-auto items-center justify-center gap-1.5 min-h-[38px] sm:min-h-[40px] px-3.5 sm:px-4 rounded-xl bg-accent-yellow text-black font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-[0.08em] hover:bg-yellow-300 transition-colors shadow-[0_0_24px_rgba(255,215,0,0.2)]"
                >
                  <span className="material-symbols-outlined !text-[13px]">timer</span>
                  Claim free — no membership
                </a>
              </div>
            </div>
          </m.div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes flashBarShimmer {
          0%,
          100% {
            opacity: 0;
          }
          45%,
          55% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}
