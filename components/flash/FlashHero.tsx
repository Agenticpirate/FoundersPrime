'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import FlashCountdown from './FlashCountdown'
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
        width="140"
        height="280"
        style={{
          filter:
            'drop-shadow(0 0 18px rgba(255,215,0,0.65)) drop-shadow(0 0 50px rgba(255,215,0,0.25))',
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
            <stop offset="0%" stopColor="#ffd700" stopOpacity="0.5" />
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

export default function FlashHero() {
  const reduce = useReducedMotion()
  const liveCount = flashDeals.length
  const hotCount = flashDeals.filter((d) => d.badge === 'hot').length

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

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8 pb-8 lg:overflow-visible overflow-hidden">
        <Sparkle className="-top-2 left-[8%] lg:left-[-2%] -rotate-12" delay="0s" size={28} />
        <Sparkle className="top-[38%] left-[42%] opacity-40" delay="0.5s" size={14} />
        <Sparkle className="top-6 right-[48%] opacity-50 rotate-45" delay="1s" size={20} />
        <Sparkle className="bottom-4 left-[18%] opacity-35 -rotate-45" delay="1.5s" size={18} />
        <Sparkle className="bottom-[12%] right-[-1%] opacity-60 rotate-12" delay="0.8s" size={24} />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7 items-stretch">
          {/* ── Left ── */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex flex-wrap items-center gap-2 mb-4"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span className="font-mono font-black text-[9px] uppercase tracking-[0.18em] text-red-400">
                  Live now
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-yellow/25 bg-accent-yellow/10 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-accent-yellow">
                <span className="material-symbols-outlined !text-[12px]">bolt</span>
                {liveCount} active deals
              </span>
              {hotCount > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full border border-orange-500/25 bg-orange-500/10 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-orange-400">
                  🔥 {hotCount} hot
                </span>
              )}
            </motion.div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-heading font-black uppercase tracking-[-0.02em] leading-[0.92]"
            >
              <span className="flex items-center gap-2.5 sm:gap-3 text-[36px] sm:text-[44px] md:text-[50px] lg:text-[54px] text-accent-yellow">
                <span
                  className="material-symbols-outlined text-[34px] sm:text-[42px] md:text-[48px]"
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
              <span className="block text-[24px] sm:text-[30px] md:text-[36px] lg:text-[38px] text-gray-900 dark:text-white mt-2 leading-tight">
                Deals that disappear fast.
              </span>
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-sans text-[13px] md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-4 max-w-md"
            >
              Limited-time offers on top tools and credits.{' '}
              <span className="text-gray-800 dark:text-gray-200 font-medium">
                New drops every Monday &amp; Thursday.
              </span>{' '}
              Gone when the timer hits zero.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
              className="mt-5 flex flex-wrap gap-2"
            >
              <a
                href="#flash-deals-grid"
                className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-xl bg-accent-yellow text-black font-mono text-[11px] font-black uppercase tracking-wide hover:bg-yellow-300 transition-colors shadow-[0_0_28px_rgba(255,215,0,0.25)]"
              >
                <span className="material-symbols-outlined !text-[16px]">flash_on</span>
                Browse live deals
              </a>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-xl border border-black/10 dark:border-white/15 text-gray-900 dark:text-white font-mono text-[11px] font-bold uppercase hover:border-accent-yellow/40 hover:bg-accent-yellow/[0.06] transition-colors"
              >
                Membership
                <span className="material-symbols-outlined !text-[14px]">arrow_forward</span>
              </Link>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mt-6 max-w-lg"
            >
              <FlashCoupon />
            </motion.div>
          </div>

          {/* ── Right: countdown card ── */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.12, duration: 0.4 }}
            className="relative rounded-2xl bg-gradient-to-br from-[#1c1a0e] via-[#0d0d0d] to-[#000000] border border-accent-yellow/35 p-5 md:p-7 flex flex-col justify-center min-h-[260px] overflow-hidden shadow-[0_0_60px_-20px_rgba(255,215,0,0.35)]"
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-[0.035]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, rgba(255,215,0,1) 0px, rgba(255,215,0,1) 1px, transparent 1px, transparent 5px)',
              }}
            />
            <div
              aria-hidden
              className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,215,0,0.75) 40%, rgba(255,215,0,0.75) 60%, transparent)',
              }}
            />
            <div
              aria-hidden
              className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-48 h-72 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse, rgba(255,215,0,0.14) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />
            <div
              className="absolute right-[-8px] top-1/2 -translate-y-1/2 pointer-events-none z-[1] opacity-90"
              aria-hidden
            >
              <LightningBolt />
            </div>

            <div className="relative z-10 md:max-w-[70%]">
              <p className="flex items-center gap-2 font-mono font-bold text-[10px] uppercase tracking-[0.22em] text-accent-yellow mb-1.5">
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
                Next drop in
              </p>
              <p className="text-[12px] text-zinc-500 mb-4">
                Fresh flash deals every Mon &amp; Thu at midnight
              </p>

              <FlashCountdown nextDrop variant="hero" />

              <div className="mt-5 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-black/50 border border-white/[0.08] px-3 py-2.5">
                  <p className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 mb-0.5">
                    Active now
                  </p>
                  <p className="font-mono text-lg font-black text-white tabular-nums">{liveCount}</p>
                </div>
                <div className="rounded-xl bg-black/50 border border-white/[0.08] px-3 py-2.5">
                  <p className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 mb-0.5">
                    Schedule
                  </p>
                  <p className="font-mono text-[12px] font-bold text-accent-yellow leading-tight">
                    Mon · Thu
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
