'use client'

import Mandala from './Mandala'
import StatCard, { type StatCardProps } from './StatCard'

/**
 * SectionHero — premium page hero used across deals/category pages.
 *
 * Consolidates the repeated hero layout (eyebrow badge + headline + subtitle
 * on the left, a 3-up stat strip on the right, plus a background mandala) that
 * was copy-pasted across DealsHero, CloudCreditsHero, AcceleratorsHero, etc.
 *
 * Each page passes its own accent color + copy, keeping per-section identity
 * while sharing one refined, consistent look.
 */

interface SectionHeroProps {
  /** Eyebrow pill icon (material symbol). Omit for a pulsing dot. */
  eyebrowIcon?: string
  eyebrowText: string
  /** Tailwind classes for the eyebrow pill (bg + border + text). */
  eyebrowClass?: string
  /** Tailwind text color for the eyebrow icon/dot. */
  eyebrowAccentClass?: string
  /** Headline — supports ReactNode for inline highlights. */
  title: React.ReactNode
  /** Subtitle — supports ReactNode for inline highlights. */
  subtitle: React.ReactNode
  /** 3 stat cards for the right rail. */
  stats: StatCardProps[]
  /** Background mandala stroke color class. */
  mandalaColorClass?: string
  /** Min width for the stat strip on desktop. */
  statsMinWidth?: string
  className?: string
}

export default function SectionHero({
  eyebrowIcon,
  eyebrowText,
  eyebrowClass = 'bg-accent-yellow/15 border-accent-yellow/40 text-gray-800',
  eyebrowAccentClass = 'text-accent-yellow',
  title,
  subtitle,
  stats,
  mandalaColorClass = 'text-gray-900',
  statsMinWidth = 'lg:min-w-[560px]',
  className = '',
}: SectionHeroProps) {
  return (
    <div className={`relative mb-4 md:mb-6 ${className}`}>
      {/* Decorative background mandala */}
      <Mandala
        variant="rings"
        colorClass={mandalaColorClass}
        opacity={0.07}
        speed={80}
        className="absolute -top-8 -right-6 w-56 h-56 hidden md:block"
      />

      <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        {/* Left: title block */}
        <div className="min-w-0 flex-1">
          <div
            className={`relative inline-flex items-center gap-1.5 mb-2.5 px-2.5 py-1 rounded-full border overflow-hidden ${eyebrowClass}`}
          >
            {/* Black/yellow grid texture behind the eyebrow pill */}
            <div
              className="absolute inset-0 pointer-events-none opacity-60"
              style={{
                backgroundSize: '8px 8px',
                backgroundImage:
                  'linear-gradient(to right, rgba(16,22,34,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,22,34,0.07) 1px, transparent 1px)',
              }}
              aria-hidden="true"
            />
            {eyebrowIcon ? (
              <span className={`material-symbols-outlined relative !text-[12px] ${eyebrowAccentClass}`}>
                {eyebrowIcon}
              </span>
            ) : (
              <span className={`relative w-1.5 h-1.5 rounded-full animate-pulse ${eyebrowAccentClass.replace('text-', 'bg-')}`} />
            )}
            <span className="relative font-mono text-[9.5px] font-bold uppercase tracking-[0.14em]">
              {eyebrowText}
            </span>
          </div>
          <h1 className="font-mono text-2xl md:text-3xl lg:text-[34px] font-black tracking-tight text-gray-900 leading-[1.05] mb-1.5">
            {title}
          </h1>
          <p className="font-sans text-[13px] md:text-sm text-gray-600 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* Right: inline stat strip */}
        <div className={`grid grid-cols-3 gap-2.5 lg:gap-3 lg:flex-shrink-0 ${statsMinWidth}`}>
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} delay={stat.delay ?? `${i * 0.08}s`} />
          ))}
        </div>
      </div>
    </div>
  )
}
