'use client'

export default function IncubatorsStrategy() {
  const incubatorTraits = [
    'Pre-idea to MVP support',
    '6–24 months runway',
    'Lab space &amp; co-working',
    'Co-founder matching',
    'Often equity-free',
  ]

  const acceleratorTraits = [
    'MVP to traction sprint',
    '3–6 month cohort',
    'Intensive mentorship',
    '$50K–$500K for equity',
    'Demo-day pitch',
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-5 md:mb-7">
      {/* Left: Incubator vs Accelerator comparison */}
      <div className="lg:col-span-8">
        <div className="relative bg-white border-2 border-black shadow-[4px_4px_0px_#111] rounded-sm p-5 md:p-6 overflow-hidden">
          {/* Decorative mandala */}
          <div className="absolute -bottom-12 -right-12 w-44 h-44 pointer-events-none opacity-[0.06]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-full text-violet-700 incub-strategy-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
              {[20, 35, 50, 65].map((r, i) => (
                <ellipse
                  key={i}
                  cx="100"
                  cy="100"
                  rx={r}
                  ry={r / 1.8}
                  transform={`rotate(${i * 30} 100 100)`}
                />
              ))}
              <circle cx="100" cy="100" r="2" fill="currentColor" />
            </svg>
          </div>

          <div className="relative">
            <div className="flex items-center gap-2.5 mb-3 pb-3 border-b-2 border-black border-dashed">
              <div className="inline-flex items-center justify-center w-8 h-8 bg-accent-yellow border-2 border-black rounded-sm shadow-[2px_2px_0px_#111]">
                <span className="font-mono text-[12px] font-black text-black">01</span>
              </div>
              <div>
                <h2 className="font-mono text-[13px] md:text-[14px] font-black uppercase tracking-[0.06em] text-black leading-none">
                  Incubator vs Accelerator
                </h2>
                <p className="text-[11px] text-gray-500 mt-1">Different stages, different fits</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {/* Incubator column */}
              <div className="bg-violet-50 border-2 border-black border-dashed rounded-sm p-3 md:p-4">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="material-symbols-outlined !text-[14px] text-violet-700">lightbulb</span>
                  <p className="font-mono text-[10px] md:text-[11px] font-black uppercase tracking-[0.14em] text-violet-900">
                    Incubators
                  </p>
                </div>
                <ul className="space-y-1.5">
                  {incubatorTraits.map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] md:text-[12px] text-gray-800">
                      <span className="material-symbols-outlined !text-[12px] text-violet-600 flex-shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      <span dangerouslySetInnerHTML={{ __html: t }} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Accelerator column */}
              <div className="bg-orange-50 border-2 border-black border-dashed rounded-sm p-3 md:p-4">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="material-symbols-outlined !text-[14px] text-orange-700">rocket_launch</span>
                  <p className="font-mono text-[10px] md:text-[11px] font-black uppercase tracking-[0.14em] text-orange-900">
                    Accelerators
                  </p>
                </div>
                <ul className="space-y-1.5">
                  {acceleratorTraits.map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] md:text-[12px] text-gray-800">
                      <span className="material-symbols-outlined !text-[12px] text-orange-600 flex-shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-4 pt-3 border-t-2 border-black border-dashed text-[11.5px] text-gray-700 leading-relaxed">
              <span className="material-symbols-outlined !text-[12px] align-middle text-amber-600 mr-1">
                info
              </span>
              <span className="font-bold text-black">Pre-idea</span> &rarr; pick an incubator. Have an{' '}
              <span className="font-bold text-black">MVP</span> &rarr; pick an accelerator.
            </p>
          </div>
        </div>
      </div>

      {/* Right: Founder tip + types of incubators */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {/* Types of incubators — dark card */}
        <div className="relative bg-gradient-to-br from-gray-900 to-black text-white border-2 border-black shadow-[4px_4px_0px_#FFD500] rounded-sm p-5 md:p-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-36 h-36 pointer-events-none opacity-[0.18]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-full text-accent-yellow incub-strategy-mandala-spin-reverse" fill="none" stroke="currentColor" strokeWidth="0.7">
              <circle cx="100" cy="100" r="40" />
              <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <g key={deg} transform={`rotate(${deg} 100 100)`}>
                  <line x1="100" y1="40" x2="100" y2="20" />
                  <circle cx="100" cy="20" r="2" fill="currentColor" />
                </g>
              ))}
              <circle cx="100" cy="100" r="3" fill="currentColor" />
            </svg>
          </div>

          <div className="relative">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-accent-yellow mb-3 inline-flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-accent-yellow animate-pulse" />
              Program Types
            </p>
            <h3 className="font-mono text-base font-black uppercase tracking-tight leading-tight mb-3">
              Where you can apply.
            </h3>
            <div className="space-y-2 text-[11.5px]">
              {[
                { type: 'University Programs', sub: 'Stanford StartX, MIT delta v' },
                { type: 'Corporate Labs', sub: 'Microsoft for Startups, Google' },
                { type: 'Venture Studios', sub: 'eFounders, Atomic, Pioneer Square' },
                { type: 'City / State Programs', sub: 'NYC Tech Talent, NSC' },
              ].map((d) => (
                <div
                  key={d.type}
                  className="flex justify-between items-start py-1.5 border-b border-dashed border-white/15 last:border-0"
                >
                  <span className="font-mono font-bold text-white">{d.type}</span>
                  <span className="text-gray-500 text-[10px] ml-2 text-right">{d.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pro tip — yellow accent */}
        <div className="relative bg-accent-yellow border-2 border-black shadow-[4px_4px_0px_#111] rounded-sm p-5 overflow-hidden">
          <div className="absolute -bottom-10 -left-10 w-32 h-32 pointer-events-none opacity-[0.10]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-full text-black incub-strategy-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
              <circle cx="100" cy="100" r="50" />
              <circle cx="100" cy="100" r="70" strokeDasharray="3 4" />
              {[0, 90, 180, 270].map((deg) => (
                <g key={deg} transform={`rotate(${deg} 100 100)`}>
                  <line x1="100" y1="50" x2="100" y2="30" />
                </g>
              ))}
              <circle cx="100" cy="100" r="2.5" fill="currentColor" />
            </svg>
          </div>

          <div className="relative">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-black mb-2 inline-flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-black animate-pulse" />
              Founder Tip
            </p>
            <p className="font-mono text-[12.5px] leading-relaxed text-black font-medium">
              The right incubator gives you a{' '}
              <span className="font-black bg-black text-accent-yellow px-1 rounded-sm">co-founder pipeline</span>
              {' '}&mdash; not just office space. Apply to programs with strong founder communities.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes incubStrategyMandalaSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes incubStrategyMandalaSpinReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        :global(.incub-strategy-mandala-spin) {
          animation: incubStrategyMandalaSpin 100s linear infinite;
          transform-origin: center;
        }
        :global(.incub-strategy-mandala-spin-reverse) {
          animation: incubStrategyMandalaSpinReverse 90s linear infinite;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.incub-strategy-mandala-spin),
          :global(.incub-strategy-mandala-spin-reverse) { animation: none; }
        }
      `}</style>
    </div>
  )
}
