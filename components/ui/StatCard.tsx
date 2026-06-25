'use client'

import Mandala from './Mandala'

/**
 * StatCard — premium neo-brutalist stat cell.
 *
 * Consolidates the stat-cell pattern duplicated across every deals hero
 * (DealsHero, CloudCreditsHero, AcceleratorsHero, etc.) into one polished,
 * reusable component. Supports a per-page accent color so each section keeps
 * its identity while sharing one refined look.
 *
 * The `accent` prop is an RGB triplet string (e.g. "255,221,0") used for the
 * highlighted card's colored shadow + ornament + value gradient.
 */

export interface StatCardProps {
  label: string
  value: string
  delta?: string
  /** Material symbol name. */
  icon: string
  /** Tailwind text color class for the icon. */
  iconColor?: string
  /** Tailwind bg color class for the icon tile. */
  iconBg?: string
  /** Highlighted (dark gradient) variant. */
  highlight?: boolean
  /** RGB triplet for highlight accents, e.g. "255,221,0". */
  accent?: string
  /** Tailwind gradient classes for the highlighted value text. */
  valueGradient?: string
  /** Tailwind text color for the highlight ornament + delta dot. */
  ornamentColor?: string
  /** Entry animation delay, e.g. "0.08s". */
  delay?: string
}

export default function StatCard({
  label,
  value,
  delta,
  icon,
  iconColor = 'text-gray-700',
  iconBg = 'bg-gray-100',
  highlight = false,
  accent = '255,221,0',
  valueGradient = 'from-accent-yellow to-amber-300',
  ornamentColor = 'text-accent-yellow',
  delay = '0s',
}: StatCardProps) {
  return (
    <div
      className={`stat-card relative group rounded-sm border-2 overflow-hidden transition-all duration-200 stat-card-fade-in hover:-translate-x-px hover:-translate-y-px ${
        highlight 
          ? 'stat-card--highlight text-white border-black' 
          : 'bg-[#0c0c0c] text-white border-white/10 md:bg-white md:text-black md:border-black md:dark:bg-[#0c0c0c] md:dark:text-white md:dark:border-white/10 dark:shadow-[3px_3px_0px_rgba(255,255,255,0.05)]'
      }`}
      style={
        {
          animationDelay: delay,
          '--accent': accent,
        } as React.CSSProperties
      }
    >
      {/* Black grid texture — denser & yellow-tinted on the highlighted card */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: highlight ? 0.5 : 0.4,
          backgroundSize: '22px 22px',
          backgroundImage: highlight
            ? `linear-gradient(to right, rgba(${accent},0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(${accent},0.12) 1px, transparent 1px)`
            : 'linear-gradient(to right, rgba(16,22,34,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,22,34,0.06) 1px, transparent 1px)',
        }}
        aria-hidden="true"
      />
 
      {/* Inner ornament — mandala on every card for consistent depth */}
      <Mandala
        variant={highlight ? 'orbital' : 'rings'}
        colorClass={highlight ? ornamentColor : 'text-gray-900'}
        opacity={highlight ? 0.18 : 0.06}
        speed={highlight ? 60 : 90}
        direction={highlight ? 'cw' : 'ccw'}
        strokeWidth={0.7}
        className="absolute -bottom-8 -right-8 w-28 h-28"
      />
 
      {/* Subtle shimmer sweep on hover */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: highlight
            ? `linear-gradient(115deg, transparent 35%, rgba(${accent},0.08) 50%, transparent 65%)`
            : 'linear-gradient(115deg, transparent 35%, rgba(0,0,0,0.04) 50%, transparent 65%)',
        }}
      />
 
      <div className="relative p-2 sm:p-3 md:p-3.5">
        <div className="flex items-start gap-2.5">
          {/* Icon tile - hidden on mobile to be compact */}
          <div
            className={`stat-card-icon relative w-9 h-9 md:w-10 md:h-10 hidden sm:flex items-center justify-center rounded-sm border-2 flex-shrink-0 overflow-hidden ${
              highlight 
                ? `${iconBg} border-black` 
                : 'bg-white/5 border-white/15 md:bg-gray-100 md:border-black md:dark:bg-white/5 md:dark:border-white/15'
            }`}
          >
            {/* Black/yellow grid texture inside the badge tile */}
            <div
              className="absolute inset-0 pointer-events-none opacity-50"
              style={{
                backgroundSize: '7px 7px',
                backgroundImage:
                  'linear-gradient(to right, rgba(16,22,34,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,22,34,0.10) 1px, transparent 1px)',
              }}
              aria-hidden="true"
            />
            <span className={`material-symbols-outlined relative !text-[18px] md:!text-[20px] ${highlight ? iconColor : 'text-gray-300 md:text-gray-700 md:dark:text-gray-300'}`}>
              {icon}
            </span>
          </div>
 
          {/* Text block */}
          <div className="min-w-0 flex-1">
            <p className={`font-mono text-[7.5px] sm:text-[8.5px] md:text-[9px] font-bold uppercase tracking-[0.14em] truncate ${highlight ? 'text-gray-400' : 'text-gray-400 md:text-gray-500 md:dark:text-gray-400'}`}>
              {label}
            </p>
            <p
              className={`font-mono text-[13px] sm:text-base md:text-lg lg:text-xl font-black leading-tight tabular-nums mt-0.5 ${
                highlight
                  ? `bg-gradient-to-br ${valueGradient} bg-clip-text text-transparent`
                  : 'text-white md:text-black md:dark:text-white'
              }`}
            >
              {value}
            </p>
            {delta && (
              <p className={`hidden lg:flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-wide font-semibold mt-1 ${highlight ? 'text-gray-400' : 'text-gray-400 md:text-gray-500 md:dark:text-gray-400'}`}>
                <span
                  className={`w-1 h-1 rounded-full ${highlight ? `${ornamentColor.replace('text-', 'bg-')} animate-pulse` : 'bg-gray-400 dark:bg-gray-500'}`}
                />
                <span className="truncate">{delta}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes statCardFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        :global(.stat-card-fade-in) {
          animation: statCardFadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) backwards;
        }
        .stat-card--plain {
          box-shadow: 3px 3px 0px #111;
        }
        .stat-card--plain:hover {
          box-shadow: 5px 5px 0px #111;
        }
        .stat-card--highlight {
          box-shadow: 3px 3px 0px rgba(var(--accent), 0.55);
        }
        .stat-card--highlight:hover {
          box-shadow: 5px 5px 0px rgba(var(--accent), 0.55);
        }
        .stat-card--plain .stat-card-icon {
          box-shadow: 1px 1px 0px #111;
        }
        .stat-card--highlight .stat-card-icon {
          box-shadow: 1px 1px 0px rgba(var(--accent), 0.3);
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.stat-card-fade-in) { animation: none; }
        }
      `}</style>
    </div>
  )
}
