'use client'

/**
 * Minimal ambient décor for the contact page — paper planes (message in flight),
 * sparse stars, and soft startup/tech marks. Purely decorative; never blocks UI.
 */

function PaperPlane({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M4.5 22.5 42 6.5 28.5 41.5 22 27 4.5 22.5Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path
        d="M22 27 42 6.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M22 27 28.5 41.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  )
}

function Star({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" className={className} aria-hidden>
      <path d="M6 0.6 7.1 4.4 11 4.4 7.85 6.75 9 10.6 6 8.3 3 10.6 4.15 6.75 1 4.4 4.9 4.4Z" />
    </svg>
  )
}

function OrbitNode({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth="0.9" strokeDasharray="2 4" />
      <circle cx="32" cy="32" r="3" fill="currentColor" opacity="0.7" />
      <circle cx="50" cy="32" r="2.2" fill="currentColor" />
      <circle cx="20" cy="18" r="1.6" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

function RocketMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <path
        d="M20 6c4.5 3.2 7 8.5 7 14.5 0 2.2-.3 4.2-.8 6H13.8c-.5-1.8-.8-3.8-.8-6C13 14.5 15.5 9.2 20 6Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.1" />
      <path d="M14 26.5 11 32h6l-1.2-5.5" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M26 26.5 29 32h-6l1.2-5.5" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M18 33.5h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

function CodeBracket({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path
        d="M11 8 5 16l6 8M21 8l6 8-6 8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Full-page sparse field — sits behind content in the black canvas. */
export function ContactPageField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* Soft yellow orbs — matches site glow language */}
      <div className="absolute top-[8%] right-[6%] h-64 w-64 rounded-full bg-accent-yellow/[0.035] blur-3xl" />
      <div className="absolute bottom-[18%] left-[4%] h-48 w-48 rounded-full bg-accent-yellow/[0.025] blur-3xl" />

      {/* Constellation dots */}
      <div className="absolute inset-0 hidden dark:block opacity-[0.35]">
        {[
          { t: '12%', l: '8%', s: 3 },
          { t: '22%', l: '18%', s: 2 },
          { t: '18%', l: '92%', s: 2.5 },
          { t: '42%', l: '96%', s: 2 },
          { t: '68%', l: '4%', s: 2 },
          { t: '78%', l: '12%', s: 3 },
          { t: '88%', l: '88%', s: 2 },
          { t: '55%', l: '2%', s: 1.5 },
          { t: '8%', l: '48%', s: 2 },
          { t: '94%', l: '42%', s: 2 },
        ].map((d, di) => (
          <span
            key={`${d.t}-${d.l}-${d.s}`}
            className="absolute rounded-full bg-accent-yellow"
            style={{
              top: d.t,
              left: d.l,
              width: d.s,
              height: d.s,
              opacity: 0.45 + (di % 3) * 0.12,
            }}
          />
        ))}
      </div>

      {/* Paper planes — message in flight */}
      <PaperPlane className="absolute top-[14%] right-[3%] w-10 h-10 text-accent-yellow/20 dark:text-accent-yellow/25 rotate-12 hidden sm:block" />
      <PaperPlane className="absolute top-[38%] left-[1.5%] w-7 h-7 text-gray-400/25 dark:text-white/10 -rotate-[28deg] hidden md:block" />
      <PaperPlane className="absolute bottom-[22%] right-[5%] w-8 h-8 text-accent-yellow/15 dark:text-accent-yellow/20 rotate-[38deg] hidden lg:block" />

      {/* Tech / startup marks */}
      <OrbitNode className="absolute top-[28%] right-[1%] w-16 h-16 text-accent-yellow/15 dark:text-accent-yellow/20 hidden lg:block" />
      <RocketMark className="absolute bottom-[32%] left-[2%] w-9 h-9 text-white/10 dark:text-white/12 -rotate-12 hidden md:block" />
      <CodeBracket className="absolute top-[62%] right-[2.5%] w-7 h-7 text-white/10 dark:text-white/12 hidden lg:block" />

      {/* Tiny stars */}
      <Star className="absolute top-[20%] right-[14%] w-2.5 h-2.5 text-accent-yellow/30 dark:text-accent-yellow/35 hidden sm:block" />
      <Star className="absolute top-[48%] left-[5%] w-2 h-2 text-accent-yellow/20 dark:text-accent-yellow/25 hidden md:block" />
      <Star className="absolute bottom-[28%] right-[12%] w-2 h-2 text-accent-yellow/25 dark:text-accent-yellow/30 hidden sm:block" />

      {/* Faint flight trail under one plane */}
      <svg
        className="absolute top-[16%] right-[7%] w-20 h-6 text-accent-yellow/15 dark:text-accent-yellow/20 hidden md:block"
        viewBox="0 0 80 24"
        fill="none"
        aria-hidden
      >
        <path
          d="M2 18c12-2 22-10 36-12 10-1.5 22 2 40 8"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

/** Compact décor inside dark cards (sidebar / hero black panels). */
export function ContactCardDecor({ variant = 'desk' }: { variant?: 'desk' | 'hero' }) {
  if (variant === 'hero') {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <PaperPlane className="absolute top-5 right-6 w-11 h-11 text-accent-yellow/20 rotate-[18deg] hidden sm:block" />
        <PaperPlane className="absolute bottom-8 right-[38%] w-6 h-6 text-white/10 -rotate-[40deg] hidden lg:block" />
        <Star className="absolute top-10 right-24 w-2 h-2 text-accent-yellow/35" />
        <Star className="absolute top-16 right-16 w-1.5 h-1.5 text-accent-yellow/25" />
        <Star className="absolute bottom-10 right-10 w-2 h-2 text-accent-yellow/20 hidden md:block" />
        <OrbitNode className="absolute -bottom-4 -right-2 w-24 h-24 text-accent-yellow/10" />
        <CodeBracket className="absolute bottom-6 right-28 w-6 h-6 text-white/[0.08] hidden md:block" />
        {/* Dashed flight path */}
        <svg
          className="absolute top-8 right-16 w-28 h-10 text-accent-yellow/15 hidden sm:block"
          viewBox="0 0 112 40"
          fill="none"
          aria-hidden
        >
          <path
            d="M4 28c16-4 28-18 48-20 14-1 28 6 56 16"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2.5 5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    )
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <PaperPlane className="absolute -right-1 top-3 w-9 h-9 text-accent-yellow/25 rotate-[22deg]" />
      <Star className="absolute top-12 right-10 w-1.5 h-1.5 text-accent-yellow/40" />
      <Star className="absolute bottom-4 right-6 w-2 h-2 text-accent-yellow/20" />
      <OrbitNode className="absolute -bottom-6 -right-6 w-20 h-20 text-white/[0.06]" />
    </div>
  )
}
