'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import Mandala from '@/components/ui/Mandala'
import { FadeUp, premiumEase } from '@/components/ui/premium-motion'

const TRUST = [
  { value: '24–48h', label: 'Avg response', icon: 'bolt' },
  { value: 'Global', label: '43+ countries', icon: 'public' },
  { value: 'Mon–Fri', label: '9AM–6PM PST', icon: 'schedule' },
  { value: 'Deals', label: 'Billing & partners', icon: 'support_agent' },
]

export default function ContactHero() {
  const reduce = useReducedMotion()

  return (
    <div className="relative mb-7 md:mb-9">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 right-0 w-[26rem] h-[26rem] rounded-full bg-accent-yellow/[0.06] dark:bg-accent-yellow/[0.04] blur-3xl"
      />
      <Mandala
        variant="rings"
        colorClass="text-gray-900 dark:text-white/5"
        opacity={0.06}
        speed={90}
        className="absolute -top-8 -right-6 w-56 h-56 hidden md:block pointer-events-none"
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="relative flex mb-4">
        <ol className="inline-flex items-center gap-1.5 font-mono text-[11px] md:text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
          <li>
            <Link className="hover:text-gray-900 dark:hover:text-white transition-colors" href="/">
              Home
            </Link>
          </li>
          <li className="text-gray-300 dark:text-white/20">/</li>
          <li aria-current="page">
            <span className="text-gray-900 dark:text-white font-semibold bg-accent-yellow/20 dark:bg-accent-yellow/15 px-2 py-0.5 rounded-md border border-black/5 dark:border-white/10">
              Contact
            </span>
          </li>
        </ol>
      </nav>

      <div className="relative rounded-3xl border border-black/[0.05] dark:border-white/[0.07] bg-gradient-to-br from-white via-white to-amber-50/30 dark:from-[#0a0a0a] dark:via-[#080808] dark:to-[#12100a] p-5 md:p-7 shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/40 to-transparent"
        />
        {!reduce && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-1/4 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-accent-yellow/[0.04] to-transparent skew-x-12"
            animate={{ x: ['0%', '280%'] }}
            transition={{ duration: 7, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
          />
        )}

        <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7">
          <div className="min-w-0 flex-1 max-w-2xl">
            <FadeUp>
              <div className="inline-flex items-center gap-1.5 mb-3.5 px-3 py-1 rounded-full border border-accent-yellow/25 bg-accent-yellow/10 text-amber-700 dark:text-accent-yellow">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-yellow opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-yellow" />
                </span>
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em]">
                  Support desk · 24–48h replies
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.05}>
              <h1 className="font-mono text-3xl md:text-4xl lg:text-[42px] font-black tracking-tight text-gray-900 dark:text-white leading-[1.08] mb-3">
                Talk to the team that{' '}
                <span className="text-accent-yellow underline decoration-accent-yellow/40 underline-offset-4">
                  ships deals
                </span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="text-[13px] md:text-[14.5px] text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Questions about membership, broken claim links, partnerships, or your account —
                we read every message. Most replies land within{' '}
                <span className="font-semibold text-gray-900 dark:text-white">24–48 hours</span>.
              </p>
            </FadeUp>

            <FadeUp delay={0.14}>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: 'local_offer', label: 'Deals & claims' },
                  { icon: 'credit_card', label: 'Billing' },
                  { icon: 'handshake', label: 'Partnerships' },
                  { icon: 'bug_report', label: 'Bugs' },
                ].map((chip) => (
                  <span
                    key={chip.label}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-black/[0.06] dark:border-white/10 bg-white/70 dark:bg-white/[0.04] font-mono text-[10px] font-semibold text-gray-600 dark:text-gray-300"
                  >
                    <span className="material-symbols-outlined !text-[13px] text-accent-yellow">
                      {chip.icon}
                    </span>
                    {chip.label}
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.12} className="w-full lg:w-auto lg:min-w-[280px]">
            <div className="grid grid-cols-2 gap-2.5">
              {TRUST.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.05, duration: 0.35, ease: premiumEase }}
                  className={`rounded-2xl border p-3.5 ${
                    i === 0
                      ? 'border-accent-yellow/35 bg-accent-yellow/[0.08] dark:bg-accent-yellow/[0.07]'
                      : 'border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03]'
                  }`}
                >
                  <span className="material-symbols-outlined !text-[16px] text-accent-yellow mb-1.5 block">
                    {s.icon}
                  </span>
                  <p
                    className={`font-mono text-lg font-black leading-none tabular-nums ${
                      i === 0 ? 'text-amber-800 dark:text-accent-yellow' : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {s.value}
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  )
}
