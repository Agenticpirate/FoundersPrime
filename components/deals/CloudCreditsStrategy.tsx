'use client'

export default function CloudCreditsStrategy() {
  const stack = [
    { name: 'AWS Activate', value: 'Up to $100K', tag: 'Founders' },
    { name: 'Google for Startups', value: 'Up to $200K', tag: 'AI · GCP' },
    { name: 'Microsoft for Startups', value: 'Up to $150K', tag: 'Azure' },
    { name: 'DigitalOcean Hatch', value: 'Up to $10K', tag: 'Infra' },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-5 md:mb-7">
      {/* Left: Stack strategy card */}
      <div className="lg:col-span-8">
        <div className="relative bg-white border-2 border-black shadow-[4px_4px_0px_#111] rounded-sm p-5 md:p-6 overflow-hidden">
          {/* Decorative mandala */}
          <div className="absolute -bottom-12 -right-12 w-44 h-44 pointer-events-none opacity-[0.06]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-full text-sky-700 strategy-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
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
                  Stack what you qualify for
                </h2>
                <p className="text-[11px] text-gray-500 mt-1">Most providers don&apos;t require exclusivity</p>
              </div>
            </div>

            <p className="text-[12.5px] text-gray-700 leading-relaxed mb-4">
              Apply across multiple cloud providers to extend runway. Every program has its own eligibility window — check each before you apply.
            </p>

            {/* Stack table */}
            <div className="bg-gray-50 border-2 border-black border-dashed rounded-sm p-3 md:p-4">
              <p className="font-mono text-[9.5px] font-black uppercase tracking-[0.14em] text-gray-500 mb-2.5 inline-flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-accent-yellow" />
                Example Eligible Stack
              </p>
              <div className="space-y-1.5">
                {stack.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-2 py-1.5 border-b border-dashed border-gray-300 last:border-0"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-[12px] font-bold text-gray-900 truncate">{item.name}</span>
                      <span className="hidden md:inline-block font-mono text-[8.5px] font-black uppercase tracking-wider text-gray-500 bg-white border border-gray-300 px-1.5 py-0.5 rounded-sm flex-shrink-0">
                        {item.tag}
                      </span>
                    </div>
                    <span className="font-mono text-[12px] font-black text-sky-700 tabular-nums flex-shrink-0">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 pt-3 border-t-2 border-black border-dashed text-[11px] text-gray-500 leading-snug">
                <span className="material-symbols-outlined !text-[12px] align-middle text-amber-600 mr-1">info</span>
                Combined ceiling depends on stage, region, and approval. Always confirm terms with each provider.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Pro tip card */}
      <div className="lg:col-span-4">
        <div className="relative bg-gradient-to-br from-gray-900 to-black text-white border-2 border-black shadow-[4px_4px_0px_#FFD500] rounded-sm p-5 md:p-6 overflow-hidden h-full">
          <div className="absolute -top-10 -right-10 w-36 h-36 pointer-events-none opacity-[0.18]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-full text-accent-yellow strategy-mandala-spin-reverse" fill="none" stroke="currentColor" strokeWidth="0.7">
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
              Founder Tip
            </p>
            <h3 className="font-mono text-base md:text-lg font-black uppercase tracking-tight leading-tight mb-2">
              Use your accelerator code.
            </h3>
            <p className="text-[12.5px] text-gray-300 leading-relaxed mb-4">
              YC, Techstars, Antler and most major accelerators have direct partner codes that unlock higher credit tiers. Always ask your batch lead.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="font-mono text-[9.5px] font-black uppercase tracking-wider bg-accent-yellow text-black border-2 border-black px-2 py-0.5 rounded-sm">YC</span>
              <span className="font-mono text-[9.5px] font-black uppercase tracking-wider bg-accent-yellow text-black border-2 border-black px-2 py-0.5 rounded-sm">Techstars</span>
              <span className="font-mono text-[9.5px] font-black uppercase tracking-wider bg-accent-yellow text-black border-2 border-black px-2 py-0.5 rounded-sm">Antler</span>
              <span className="font-mono text-[9.5px] font-black uppercase tracking-wider bg-white text-black border-2 border-black px-2 py-0.5 rounded-sm">+ more</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes strategyMandalaSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes strategyMandalaSpinReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        :global(.strategy-mandala-spin) {
          animation: strategyMandalaSpin 100s linear infinite;
          transform-origin: center;
        }
        :global(.strategy-mandala-spin-reverse) {
          animation: strategyMandalaSpinReverse 90s linear infinite;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.strategy-mandala-spin),
          :global(.strategy-mandala-spin-reverse) { animation: none; }
        }
      `}</style>
    </div>
  )
}
