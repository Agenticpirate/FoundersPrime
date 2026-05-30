'use client'

export default function GrantsStrategy() {
  const drivers = [
    { icon: 'policy', title: 'Industrial Policy', desc: 'Governments de-risking deep tech — AI, biotech, clean energy.' },
    { icon: 'analytics', title: 'Metric-Driven', desc: 'Show commercialization pathways and societal impact.' },
    { icon: 'emoji_events', title: 'Megaprizes', desc: 'XPRIZE alone exceeds $236M in active competitions.' },
  ]

  const trends = [
    { title: 'Blended Finance', desc: 'EIC offers €2.5M grant + optional equity.' },
    { title: 'Go-to-Market Focus', desc: 'Shift from pure R&D to commercialization.' },
    { title: 'Hardware Renaissance', desc: 'Hard-tech prototyping grants growing fast.' },
    { title: 'Relocation Incentives', desc: 'Gulf states offering $1M+ to relocate.' },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-5 md:mb-7">
      {/* Left: Grant Landscape */}
      <div className="lg:col-span-8">
        <div className="relative bg-white border-2 border-black shadow-[4px_4px_0px_#111] rounded-sm p-5 md:p-6 overflow-hidden">
          {/* Decorative mandala */}
          <div className="absolute -bottom-12 -right-12 w-44 h-44 pointer-events-none opacity-[0.06]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-full text-emerald-700 grants-strategy-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
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
                  Grant Landscape
                </h2>
                <p className="text-[11px] text-gray-500 mt-1">Non-dilutive capital as primary funding</p>
              </div>
            </div>

            {/* Drivers — 3 cards */}
            <div className="grid grid-cols-3 gap-2.5 mb-4">
              {drivers.map((item) => (
                <div key={item.title} className="bg-emerald-50 border-2 border-black border-dashed rounded-sm p-2.5 md:p-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-white border-2 border-black rounded-sm shadow-[1px_1px_0px_#111] mb-2">
                    <span className="material-symbols-outlined !text-[14px] text-emerald-700">{item.icon}</span>
                  </span>
                  <h3 className="font-mono font-black text-[10px] md:text-[11px] text-black mb-1 uppercase tracking-wide">{item.title}</h3>
                  <p className="text-[10px] md:text-[11px] text-gray-700 leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Trends */}
            <div className="bg-gray-50 border-2 border-black border-dashed rounded-sm p-3 md:p-4">
              <p className="font-mono text-[9.5px] font-black uppercase tracking-[0.14em] text-gray-500 mb-2.5 inline-flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-accent-yellow" />
                Key Trends
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {trends.map((t, i) => (
                  <div key={t.title} className="flex items-start gap-2.5 py-1 border-b border-dashed border-gray-300 last:border-0 sm:[&:nth-last-child(2)]:border-0">
                    <span className="bg-emerald-100 text-emerald-900 border-2 border-black w-5 h-5 flex items-center justify-center text-[9px] font-black rounded-sm flex-shrink-0 shadow-[1px_1px_0px_#111]">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <span className="font-mono font-bold text-[11px] text-black">{t.title}</span>
                      <span className="text-[10.5px] text-gray-700"> &middot; {t.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Funding types + Founder tip */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {/* Funding types — dark card */}
        <div className="relative bg-gradient-to-br from-gray-900 to-black text-white border-2 border-black shadow-[4px_4px_0px_#FFD500] rounded-sm p-5 md:p-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-36 h-36 pointer-events-none opacity-[0.18]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-full text-accent-yellow grants-strategy-mandala-spin-reverse" fill="none" stroke="currentColor" strokeWidth="0.7">
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
              Funding Sources
            </p>
            <h3 className="font-mono text-base font-black uppercase tracking-tight leading-tight mb-3">
              Where grants come from.
            </h3>
            <div className="space-y-2 text-[11.5px]">
              {[
                { type: 'Government', sub: 'SBIR, EIC, Horizon' },
                { type: 'Foundations', sub: 'Gates, Schmidt, Mozilla' },
                { type: 'Competitions', sub: 'XPRIZE, pitch awards' },
                { type: 'State / Regional', sub: 'Local economic dev' },
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

        {/* Founder tip — yellow accent */}
        <div className="relative bg-accent-yellow border-2 border-black shadow-[4px_4px_0px_#111] rounded-sm p-5 overflow-hidden">
          <div className="absolute -bottom-10 -left-10 w-32 h-32 pointer-events-none opacity-[0.10]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-full text-black grants-strategy-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
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
              Grants reward a clear{' '}
              <span className="font-black bg-black text-accent-yellow px-1 rounded-sm">impact narrative</span>
              {' '}&mdash; tie your tech to jobs, sustainability, or national priorities to win faster.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes grantsStrategyMandalaSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes grantsStrategyMandalaSpinReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        :global(.grants-strategy-mandala-spin) {
          animation: grantsStrategyMandalaSpin 100s linear infinite;
          transform-origin: center;
        }
        :global(.grants-strategy-mandala-spin-reverse) {
          animation: grantsStrategyMandalaSpinReverse 90s linear infinite;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.grants-strategy-mandala-spin),
          :global(.grants-strategy-mandala-spin-reverse) { animation: none; }
        }
      `}</style>
    </div>
  )
}
