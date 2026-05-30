'use client'

export default function AcceleratorsStrategy() {
  const trends = [
    { tip: 'Flight to Quality', desc: 'Programs with tangible customer pipelines beat pure-mentorship cohorts.' },
    { tip: 'Day-Zero Residency', desc: 'Resident models like Antler and EF where teams form post-acceptance.' },
    { tip: 'Vertical Specialization', desc: 'Deep domain experts in AI, Climate, Defense, and Fintech.' },
    { tip: 'Sovereign Capital', desc: 'Saudi Vision 2030 and SEA funds driving new global program launches.' },
  ]

  const dealTerms = [
    { name: 'Y Combinator', amount: '$500K', equity: '7% + MFN' },
    { name: 'Techstars', amount: '$120K', equity: '6%' },
    { name: 'HF0', amount: '$1M', equity: '5%' },
    { name: 'Antler', amount: 'Up to $300K', equity: '12.5%' },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-5 md:mb-7">
      {/* Left: State of Acceleration */}
      <div className="lg:col-span-8">
        <div className="relative bg-white border-2 border-black shadow-[4px_4px_0px_#111] rounded-sm p-5 md:p-6 overflow-hidden">
          {/* Decorative mandala */}
          <div className="absolute -bottom-12 -right-12 w-44 h-44 pointer-events-none opacity-[0.06]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-full text-orange-700 accel-strategy-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
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
                  State of Acceleration
                </h2>
                <p className="text-[11px] text-gray-500 mt-1">What's actually working in 2026 cohorts</p>
              </div>
            </div>

            <p className="text-[12.5px] text-gray-700 leading-relaxed mb-4">
              The ecosystem has bifurcated into <span className="font-bold text-black">Global Asset Managers</span> and <span className="font-bold text-black">Vertical Specialists</span>. SEA and MENA show the highest growth in new program launches.
            </p>

            <div className="bg-gray-50 border-2 border-black border-dashed rounded-sm p-3 md:p-4">
              <p className="font-mono text-[9.5px] font-black uppercase tracking-[0.14em] text-gray-500 mb-2.5 inline-flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-accent-yellow" />
                Key Trends
              </p>
              <div className="space-y-2">
                {trends.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 py-1.5 border-b border-dashed border-gray-300 last:border-0"
                  >
                    <span className="bg-orange-100 text-orange-900 border-2 border-black w-6 h-6 flex items-center justify-center text-[10px] font-black rounded-sm flex-shrink-0 shadow-[1px_1px_0px_#111]">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <span className="font-mono font-bold text-[12px] text-black">{item.tip}</span>
                      <span className="text-[11.5px] text-gray-700"> &middot; {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Deal Terms + Founder Tip stacked */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {/* Deal Terms — dark card with mandala */}
        <div className="relative bg-gradient-to-br from-gray-900 to-black text-white border-2 border-black shadow-[4px_4px_0px_#FFD500] rounded-sm p-5 md:p-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-36 h-36 pointer-events-none opacity-[0.18]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-full text-accent-yellow accel-strategy-mandala-spin-reverse" fill="none" stroke="currentColor" strokeWidth="0.7">
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
              Standard Deal Terms
            </p>
            <h3 className="font-mono text-base font-black uppercase tracking-tight leading-tight mb-3">
              Know what you're signing.
            </h3>
            <div className="space-y-2 text-[11.5px]">
              {dealTerms.map((d) => (
                <div
                  key={d.name}
                  className="flex justify-between items-center py-1.5 border-b border-dashed border-white/15 last:border-0"
                >
                  <span className="text-gray-400 font-mono">{d.name}</span>
                  <div className="text-right">
                    <span className="font-bold tabular-nums">{d.amount}</span>
                    <span className="text-gray-500 text-[10px] ml-1.5">{d.equity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Valuation insight — yellow accent card */}
        <div className="relative bg-accent-yellow border-2 border-black shadow-[4px_4px_0px_#111] rounded-sm p-5 overflow-hidden">
          <div className="absolute -bottom-10 -left-10 w-32 h-32 pointer-events-none opacity-[0.10]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-full text-black accel-strategy-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
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
              Valuation Insight
            </p>
            <p className="font-mono text-[12.5px] leading-relaxed text-black font-medium">
              Elite dev-tools accelerators (HF0, Combinator) command{' '}
              <span className="font-black bg-black text-accent-yellow px-1 rounded-sm">up to 10&times;</span>{' '}
              the valuation of standard pre-seed startups.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes accelStrategyMandalaSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes accelStrategyMandalaSpinReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        :global(.accel-strategy-mandala-spin) {
          animation: accelStrategyMandalaSpin 100s linear infinite;
          transform-origin: center;
        }
        :global(.accel-strategy-mandala-spin-reverse) {
          animation: accelStrategyMandalaSpinReverse 90s linear infinite;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.accel-strategy-mandala-spin),
          :global(.accel-strategy-mandala-spin-reverse) { animation: none; }
        }
      `}</style>
    </div>
  )
}
