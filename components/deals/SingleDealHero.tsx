'use client'

import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import DealLogo from './DealLogo'
import { premiumEase } from '@/components/ui/premium-motion'

export type BreadcrumbItem = { label: string; href?: string }

export type HeroBadge = {
  label: string
  tone?: 'yellow' | 'sky' | 'purple' | 'amber' | 'neutral'
  pulse?: boolean
}

interface SingleDealHeroProps {
  breadcrumbs: BreadcrumbItem[]
  logo: {
    logoUrl?: string
    brandIcon?: string
    provider: string
    website?: string
    size?: 'sm' | 'md' | 'lg'
  }
  badges: HeroBadge[]
  title: string
  providerLabel: string
  verificationLabel: string
  /** Extra chips after badges (e.g. DealProBadge) */
  badgeSlot?: ReactNode
}

const badgeToneClass: Record<NonNullable<HeroBadge['tone']>, string> = {
  yellow:
    'bg-accent-yellow/15 text-amber-800 dark:text-accent-yellow border-accent-yellow/30',
  sky: 'bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20',
  purple:
    'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
  amber: 'bg-amber-500/10 text-amber-800 dark:text-amber-400 border-amber-500/20',
  neutral:
    'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-black/10 dark:border-white/10',
}

export default function SingleDealHero({
  breadcrumbs,
  logo,
  badges,
  title,
  providerLabel,
  verificationLabel,
  badgeSlot,
}: SingleDealHeroProps) {
  const reduce = useReducedMotion()

  const enter = (delay = 0, y = 12) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay, ease: premiumEase },
        }

  return (
    <div className="relative w-full bg-white dark:bg-[#000000] border-b-3 border-b-black dark:border-b-white/10 overflow-hidden transition-colors duration-300">
      {/* Soft ambient glow */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[min(720px,90vw)] h-40 bg-accent-yellow/[0.07] dark:bg-accent-yellow/[0.05] blur-3xl rounded-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: premiumEase }}
        />
      )}

      {/* Decorative mandalas */}
      <div
        className="absolute -top-16 -right-16 w-72 h-72 pointer-events-none opacity-[0.08] dark:opacity-[0.12] hidden md:block"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full text-gray-900 dark:text-white single-deal-mandala-spin"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
        >
          <circle cx="100" cy="100" r="40" />
          <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
          <circle cx="100" cy="100" r="80" strokeDasharray="1 6" />
          <circle cx="100" cy="100" r="3" fill="currentColor" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 100 100)`}>
              <line x1="100" y1="40" x2="100" y2="20" />
              <circle cx="100" cy="20" r="2" fill="currentColor" />
            </g>
          ))}
        </svg>
      </div>
      <div
        className="absolute -bottom-20 -left-20 w-64 h-64 pointer-events-none opacity-[0.06] dark:opacity-[0.10] hidden md:block"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full text-accent-yellow single-deal-mandala-spin-reverse"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
        >
          <circle cx="100" cy="100" r="50" />
          <circle cx="100" cy="100" r="35" strokeDasharray="3 3" />
          {[...Array(12)].map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={100 + Math.cos((i * Math.PI) / 6) * 90}
              y2={100 + Math.sin((i * Math.PI) / 6) * 90}
            />
          ))}
          <circle cx="100" cy="100" r="2" fill="currentColor" />
        </svg>
      </div>

      <div className="relative max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-6">
        <motion.nav
          aria-label="Breadcrumb"
          className="flex mb-5"
          {...enter(0, 8)}
        >
          <ol className="inline-flex items-center gap-1.5 font-mono text-[11px] md:text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {breadcrumbs.map((crumb, i) => {
              const isLast = i === breadcrumbs.length - 1
              return (
                <li key={`${crumb.label}-${i}`} className="inline-flex items-center gap-1.5">
                  {i > 0 && (
                    <span className="text-gray-300 dark:text-gray-600" aria-hidden>
                      /
                    </span>
                  )}
                  {isLast || !crumb.href ? (
                    <span
                      aria-current={isLast ? 'page' : undefined}
                      className="text-black dark:text-white font-semibold bg-accent-yellow/25 dark:bg-accent-yellow/15 px-2 py-0.5 rounded-md truncate max-w-[180px] md:max-w-[280px] inline-block align-bottom border border-black/5 dark:border-white/10"
                    >
                      {crumb.label}
                    </span>
                  ) : (
                    <a
                      href={crumb.href}
                      className="hover:text-black dark:hover:text-white transition-colors"
                    >
                      {crumb.label}
                    </a>
                  )}
                </li>
              )
            })}
          </ol>
        </motion.nav>

        <div className="flex items-start gap-4 lg:gap-5">
          <motion.div
            className="flex-shrink-0"
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.92 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.5, delay: 0.05, ease: premiumEase },
                })}
          >
            <div className="relative">
              {!reduce && (
                <motion.span
                  aria-hidden
                  className="absolute -inset-1.5 rounded-2xl bg-accent-yellow/20 blur-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.35, 0.55, 0.35] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
              <div className="relative">
                <DealLogo
                  logoUrl={logo.logoUrl}
                  brandIcon={logo.brandIcon}
                  provider={logo.provider}
                  website={logo.website}
                  size={logo.size || 'md'}
                />
              </div>
            </div>
          </motion.div>

          <div className="flex-1 min-w-0">
            <motion.div
              className="mb-2.5 flex flex-wrap gap-1.5"
              {...(reduce
                ? {}
                : {
                    initial: 'hidden',
                    animate: 'show',
                    variants: {
                      hidden: {},
                      show: {
                        transition: { staggerChildren: 0.05, delayChildren: 0.1 },
                      },
                    },
                  })}
            >
              {badges.map((b) => (
                <motion.span
                  key={b.label}
                  variants={
                    reduce
                      ? undefined
                      : {
                          hidden: { opacity: 0, y: 6 },
                          show: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.35, ease: premiumEase },
                          },
                        }
                  }
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide border ${
                    badgeToneClass[b.tone || 'neutral']
                  }`}
                >
                  {b.pulse && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow animate-pulse" />
                  )}
                  {b.label}
                </motion.span>
              ))}
              {badgeSlot}
            </motion.div>

            <motion.h1
              className="font-mono text-2xl sm:text-3xl lg:text-[36px] font-black tracking-tight text-black dark:text-white leading-[1.08] mb-2"
              {...enter(0.14, 14)}
            >
              {title}
            </motion.h1>

            <motion.div
              className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs lg:text-sm text-gray-600 dark:text-gray-300"
              {...enter(0.2, 10)}
            >
              <span className="inline-flex items-center gap-1.5 font-mono">
                <span className="material-symbols-outlined text-[16px] text-gray-400">
                  domain
                </span>
                <span className="font-semibold text-black dark:text-white">
                  {providerLabel}
                </span>
              </span>
              <span className="hidden md:inline text-gray-300 dark:text-gray-600">·</span>
              <span className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <span className="material-symbols-outlined text-[15px] text-amber-500">
                  verified
                </span>
                {verificationLabel}
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes singleDealMandalaSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes singleDealMandalaSpinReverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
            .single-deal-mandala-spin { animation: singleDealMandalaSpin 80s linear infinite; transform-origin: center; }
            .single-deal-mandala-spin-reverse { animation: singleDealMandalaSpinReverse 100s linear infinite; transform-origin: center; }
            @media (prefers-reduced-motion: reduce) {
              .single-deal-mandala-spin, .single-deal-mandala-spin-reverse { animation: none; }
            }
          `,
        }}
      />
    </div>
  )
}
