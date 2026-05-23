'use client'

export default function AdCreditsHero() {
  return (
    <div className="relative mb-4 md:mb-6">
      {/* Decorative mandala — radial broadcast pattern */}
      <div className="absolute -top-10 -right-6 w-60 h-60 pointer-events-none opacity-[0.07] hidden md:block" aria-hidden="true">
        <svg viewBox="0 0 200 200" className="w-full h-full text-pink-500 ad-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
          <circle cx="100" cy="100" r="40" />
          <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
          <circle cx="100" cy="100" r="80" strokeDasharray="1 6" />
          {[...Array(16)].map((_, i) => {
            const angle = (i * Math.PI) / 8
            return (
              <line
                key={i}
                x1="100"
                y1="100"
                x2={100 + Math.cos(angle) * 90}
                y2={100 + Math.sin(angle) * 90}
                strokeDasharray="3 3"
              />
            )
          })}
          <circle cx="100" cy="100" r="3" fill="currentColor" />
        </svg>
      </div>

      <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        {/* Left: title block */}
        <div className="min-w-0 flex-1">
          <div className="inline-flex items-center gap-1.5 mb-2.5 px-2.5 py-1 rounded-full bg-pink-100 border border-pink-300">
            <span className="material-symbols-outlined !text-[12px] text-pink-600">campaign</span>
            <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-pink-900">
              Ad Credit Programs
            </span>
          </div>
          <h1 className="font-mono text-2xl md:text-3xl lg:text-[34px] font-black tracking-tight text-gray-900 leading-[1.05] mb-1.5">
            Acquire your first users.
          </h1>
          <p className="font-sans text-[13px] md:text-sm text-gray-600 leading-relaxed max-w-2xl">
            Verified ad credit programs from{' '}
            <span className="font-bold text-gray-900 bg-pink-100 px-1 rounded-sm">Google, Meta, LinkedIn, X, TikTok</span>{' '}
            and more — eligibility, application steps, and platform tips, all in one place.
          </p>
        </div>

        {/* Right: inline stat strip */}
        <div className="grid grid-cols-3 gap-2.5 lg:gap-3 lg:flex-shrink-0 lg:min-w-[520px]">
          <AdStat
            label="Programs"
            value="12+"
            delta="Active deals"
            accent="text-pink-600"
            icon="campaign"
            iconBg="bg-pink-100"
            delay="0s"
          />
          <AdStat
            label="Platforms"
            value="10+"
            delta="Search · social · B2B"
            accent="text-rose-600"
            icon="public"
            iconBg="bg-rose-50"
            highlight
            delay="0.08s"
          />
          <AdStat
            label="Refresh"
            value="Weekly"
            delta="Reviewed"
            accent="text-emerald-600"
            icon="update"
            iconBg="bg-emerald-100"
            delay="0.16s"
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes adMandalaSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        :global(.ad-mandala-spin) {
          animation: adMandalaSpin 80s linear infinite;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.ad-mandala-spin) { animation: none; }
        }
      `}</style>
    </div>
  )
}

function AdStat({
  label,
  value,
  delta,
  accent,
  icon,
  iconBg,
  highlight = false,
  delay = '0s',
}: {
  label: string
  value: string
  delta: string
  accent: string
  icon: string
  iconBg: string
  highlight?: boolean
  delay?: string
}) {
  return (
    <div
      className={`relative group rounded-sm border-2 border-black overflow-hidden transition-all ad-stat-fade-in hover:-translate-x-px hover:-translate-y-px ${
        highlight
          ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white shadow-[3px_3px_0px_rgba(244,114,182,0.55)] hover:shadow-[5px_5px_0px_rgba(244,114,182,0.55)]'
          : 'bg-white shadow-[3px_3px_0px_#111] hover:shadow-[5px_5px_0px_#111]'
      }`}
      style={{ animationDelay: delay }}
    >
      {highlight && (
        <div className="absolute -bottom-8 -right-8 w-28 h-28 pointer-events-none opacity-[0.20]" aria-hidden="true">
          <svg viewBox="0 0 200 200" className="w-full h-full text-pink-300 ad-stat-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.7">
            {[...Array(12)].map((_, i) => {
              const angle = (i * Math.PI) / 6
              return (
                <line
                  key={i}
                  x1="100"
                  y1="100"
                  x2={100 + Math.cos(angle) * 90}
                  y2={100 + Math.sin(angle) * 90}
                  strokeDasharray="3 4"
                />
              )
            })}
            <circle cx="100" cy="100" r="40" />
            <circle cx="100" cy="100" r="3" fill="currentColor" />
          </svg>
        </div>
      )}

      <div className="relative p-3 md:p-3.5">
        <div className="flex items-start gap-2.5">
          <div className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-sm border-2 border-black flex-shrink-0 ${iconBg} ${highlight ? 'shadow-[1px_1px_0px_rgba(244,114,182,0.3)]' : 'shadow-[1px_1px_0px_#111]'}`}>
            <span className={`material-symbols-outlined !text-[18px] md:!text-[20px] ${accent}`}>{icon}</span>
          </div>

          <div className="min-w-0 flex-1">
            <p className={`font-mono text-[8.5px] md:text-[9px] font-bold uppercase tracking-[0.14em] truncate ${highlight ? 'text-gray-400' : 'text-gray-500'}`}>
              {label}
            </p>
            <p
              className={`font-mono text-base md:text-lg lg:text-xl font-black leading-tight tabular-nums mt-0.5 ${
                highlight
                  ? 'bg-gradient-to-br from-pink-300 to-rose-200 bg-clip-text text-transparent'
                  : 'text-black'
              }`}
            >
              {value}
            </p>
            <p className={`hidden lg:flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-wide font-semibold mt-1 ${highlight ? 'text-gray-400' : 'text-gray-500'}`}>
              <span className={`w-1 h-1 rounded-full ${highlight ? 'bg-pink-300 animate-pulse' : 'bg-gray-400'}`} />
              <span className="truncate">{delta}</span>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes adStatFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes adStatMandalaSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        :global(.ad-stat-fade-in) {
          animation: adStatFadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) backwards;
        }
        :global(.ad-stat-mandala-spin) {
          animation: adStatMandalaSpin 60s linear infinite;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.ad-stat-fade-in),
          :global(.ad-stat-mandala-spin) { animation: none; }
        }
      `}</style>
    </div>
  )
}
