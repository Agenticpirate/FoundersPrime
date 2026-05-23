'use client'

export default function SaasStrategy() {
  const stack = [
    { name: 'Notion for Startups', value: '6 mo free', tag: 'Docs' },
    { name: 'Figma Professional', value: 'Free for students', tag: 'Design' },
    { name: 'Linear', value: 'Up to 50% off', tag: 'PM' },
    { name: 'HubSpot for Startups', value: 'Up to 90% off', tag: 'CRM' },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-5 md:mb-7">
      {/* Left: Stack strategy card */}
      <div className="lg:col-span-8">
        <div className="relative bg-white border-2 border-black shadow-[4px_4px_0px_#111] rounded-sm p-5 md:p-6 overflow-hidden">
          {/* Decorative mandala */}
          <div className="absolute -bottom-12 -right-12 w-44 h-44 pointer-events-none opacity-[0.06]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-full text-indigo-700 saas-strategy-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
              <rect x="60" y="60" width="80" height="80" />
              <rect x="50" y="70" width="80" height="80" strokeDasharray="3 3" />
              <rect x="70" y="50" width="80" height="80" strokeDasharray="3 3" />
              {[...Array(5)].map((_, i) => (
                <line key={i} x1={60 + i * 20} y1="60" x2={60 + i * 20} y2="140" strokeDasharray="1 3" />
              ))}
              <circle cx="100" cy="100" r="6" fill="currentColor" />
            </svg>
          </div>

          <div className="relative">
            <div className="flex items-center gap-2.5 mb-3 pb-3 border-b-2 border-black border-dashed">
              <div className="inline-flex items-center justify-center w-8 h-8 bg-accent-yellow border-2 border-black rounded-sm shadow-[2px_2px_0px_#111]">
                <span className="font-mono text-[12px] font-black text-black">01</span>
              </div>
              <div>
                <h2 className="font-mono text-[13px] md:text-[14px] font-black uppercase tracking-[0.06em] text-black leading-none">
                  Build a lean stack
                </h2>
                <p className="text-[11px] text-gray-500 mt-1">SaaS programs combine across categories</p>
              </div>
            </div>

            <p className="text-[12.5px] text-gray-700 leading-relaxed mb-4">
              Unlike cloud credits, SaaS discounts can stack across different tool categories. Build your full operating stack — docs, design, PM, CRM — at startup pricing.
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
                    <span className="font-mono text-[12px] font-black text-indigo-700 tabular-nums flex-shrink-0">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 pt-3 border-t-2 border-black border-dashed text-[11px] text-gray-500 leading-snug">
                <span className="material-symbols-outlined !text-[12px] align-middle text-amber-600 mr-1">info</span>
                Discount tiers depend on stage, employee count, and approval. Always check terms with each provider.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Pro tip card */}
      <div className="lg:col-span-4">
        <div className="relative bg-gradient-to-br from-gray-900 to-black text-white border-2 border-black shadow-[4px_4px_0px_#FFD500] rounded-sm p-5 md:p-6 overflow-hidden h-full">
          <div className="absolute -top-10 -right-10 w-36 h-36 pointer-events-none opacity-[0.18]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-full text-accent-yellow saas-strategy-mandala-spin-reverse" fill="none" stroke="currentColor" strokeWidth="0.7">
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
              Email sales directly.
            </h3>
            <p className="text-[12.5px] text-gray-300 leading-relaxed mb-4">
              Many SaaS providers don&apos;t advertise their startup programs. A short email to sales mentioning you&apos;re an early-stage startup unlocks tiers you won&apos;t see on their pricing page.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="font-mono text-[9.5px] font-black uppercase tracking-wider bg-accent-yellow text-black border-2 border-black px-2 py-0.5 rounded-sm">Notion</span>
              <span className="font-mono text-[9.5px] font-black uppercase tracking-wider bg-accent-yellow text-black border-2 border-black px-2 py-0.5 rounded-sm">Linear</span>
              <span className="font-mono text-[9.5px] font-black uppercase tracking-wider bg-accent-yellow text-black border-2 border-black px-2 py-0.5 rounded-sm">HubSpot</span>
              <span className="font-mono text-[9.5px] font-black uppercase tracking-wider bg-white text-black border-2 border-black px-2 py-0.5 rounded-sm">+ more</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes saasStrategyMandalaSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes saasStrategyMandalaSpinReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        :global(.saas-strategy-mandala-spin) {
          animation: saasStrategyMandalaSpin 100s linear infinite;
          transform-origin: center;
        }
        :global(.saas-strategy-mandala-spin-reverse) {
          animation: saasStrategyMandalaSpinReverse 90s linear infinite;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.saas-strategy-mandala-spin),
          :global(.saas-strategy-mandala-spin-reverse) { animation: none; }
        }
      `}</style>
    </div>
  )
}
