'use client'

export default function AdCreditsStrategy() {
  const allocation = [
    { platform: 'Google Ads', allocation: '40%', reason: 'High-intent search traffic' },
    { platform: 'Meta Ads', allocation: '30%', reason: 'Broad audience targeting' },
    { platform: 'LinkedIn Ads', allocation: '20%', reason: 'B2B lead generation' },
    { platform: 'Other Platforms', allocation: '10%', reason: 'Testing & experimentation' },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-5 md:mb-7">
      {/* Left: Allocation strategy card */}
      <div className="lg:col-span-8">
        <div className="relative bg-white border-2 border-black shadow-[4px_4px_0px_#111] rounded-sm p-5 md:p-6 overflow-hidden">
          {/* Decorative mandala */}
          <div className="absolute -bottom-12 -right-12 w-44 h-44 pointer-events-none opacity-[0.06]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-full text-pink-700 ad-strategy-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
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
              <circle cx="100" cy="100" r="40" />
              <circle cx="100" cy="100" r="3" fill="currentColor" />
            </svg>
          </div>

          <div className="relative">
            <div className="flex items-center gap-2.5 mb-3 pb-3 border-b-2 border-black border-dashed">
              <div className="inline-flex items-center justify-center w-8 h-8 bg-accent-yellow border-2 border-black rounded-sm shadow-[2px_2px_0px_#111]">
                <span className="font-mono text-[12px] font-black text-black">01</span>
              </div>
              <div>
                <h2 className="font-mono text-[13px] md:text-[14px] font-black uppercase tracking-[0.06em] text-black leading-none">
                  Allocate, don&apos;t spread thin
                </h2>
                <p className="text-[11px] text-gray-500 mt-1">Focus on 2–3 platforms where your buyers are</p>
              </div>
            </div>

            <p className="text-[12.5px] text-gray-700 leading-relaxed mb-4">
              Don&apos;t scatter your ad credits across every channel. Start with high-intent platforms like Google Ads, then expand to broader awareness platforms once you have signal.
            </p>

            {/* Allocation table */}
            <div className="bg-gray-50 border-2 border-black border-dashed rounded-sm p-3 md:p-4">
              <p className="font-mono text-[9.5px] font-black uppercase tracking-[0.14em] text-gray-500 mb-2.5 inline-flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-accent-yellow" />
                Suggested allocation
              </p>
              <div className="space-y-1.5">
                {allocation.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 py-1.5 border-b border-dashed border-gray-300 last:border-0"
                  >
                    <span className="bg-accent-yellow text-black w-10 h-7 flex items-center justify-center font-mono text-[11px] font-black tabular-nums border-2 border-black rounded-sm flex-shrink-0">
                      {item.allocation}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[12px] font-bold text-gray-900 truncate">{item.platform}</p>
                      <p className="text-[10.5px] text-gray-600 truncate">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 pt-3 border-t-2 border-black border-dashed text-[11px] text-gray-500 leading-snug">
                <span className="material-symbols-outlined !text-[12px] align-middle text-amber-600 mr-1">info</span>
                Adjust based on your audience. B2C startups lean heavier on Meta; B2B should weight LinkedIn higher.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Pro tip + typical terms */}
      <div className="lg:col-span-4 space-y-4">
        {/* Pro Tip — dark with yellow shadow */}
        <div className="relative bg-gradient-to-br from-gray-900 to-black text-white border-2 border-black shadow-[4px_4px_0px_#FFD500] rounded-sm p-5 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-36 h-36 pointer-events-none opacity-[0.18]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-full text-accent-yellow ad-strategy-mandala-spin-reverse" fill="none" stroke="currentColor" strokeWidth="0.7">
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
            <h3 className="font-mono text-base font-black uppercase tracking-tight leading-tight mb-2">
              Set up tracking first.
            </h3>
            <p className="text-[12px] text-gray-300 leading-relaxed">
              Install conversion pixels and set up attribution before you activate any ad credits. Without proper tracking, you&apos;ll spend the credit and have no idea what worked.
            </p>
          </div>
        </div>

        {/* Typical Terms */}
        <div className="relative bg-white border-2 border-black shadow-[3px_3px_0px_#111] rounded-sm p-5 overflow-hidden">
          <div className="absolute -bottom-8 -left-8 w-28 h-28 pointer-events-none opacity-[0.06]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-full text-gray-700 ad-strategy-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
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
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-gray-500 mb-3 inline-flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-accent-yellow" />
              Typical Terms
            </p>
            <dl className="space-y-2">
              {[
                ['Credit Range', '$500 – $20K'],
                ['Expiration', '30 – 90 days'],
                ['Min Spend', '$25 – $100'],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between items-center py-1.5 border-b border-dashed border-gray-200 last:border-0">
                  <dt className="text-[12px] text-gray-600">{label}</dt>
                  <dd className="font-mono text-[12px] font-black text-black tabular-nums">{val}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-2.5 text-[10.5px] text-gray-500 leading-snug italic">
              Terms vary by program — confirm before applying.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes adStrategyMandalaSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes adStrategyMandalaSpinReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        :global(.ad-strategy-mandala-spin) {
          animation: adStrategyMandalaSpin 100s linear infinite;
          transform-origin: center;
        }
        :global(.ad-strategy-mandala-spin-reverse) {
          animation: adStrategyMandalaSpinReverse 90s linear infinite;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.ad-strategy-mandala-spin),
          :global(.ad-strategy-mandala-spin-reverse) { animation: none; }
        }
      `}</style>
    </div>
  )
}
