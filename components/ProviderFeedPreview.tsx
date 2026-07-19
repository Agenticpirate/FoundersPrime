'use client'

import { RevealItem } from '@/components/ui/premium-motion'

const slotPerks = ['Pinned above all listings', '⭐ Featured badge', 'Auto-refund if not approved']

const regularRows = [
  { icon: 'cloud', name: 'Cloud Credits Program', value: 'Up to $100K' },
  { icon: 'rocket_launch', name: 'Accelerator Access', value: '$25K+ perks' },
]

const livePerf = [
  { icon: 'groups', value: '50K+', label: 'Monthly Views' },
  { icon: 'trending_up', value: '3X', label: 'More Visibility' },
  { icon: 'workspace_premium', value: 'TOP 1%', label: 'Placement' },
  { icon: 'bolt', value: '24H', label: 'Approval' },
]

function Orbital({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full text-accent-yellow mandala-spin-cw"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      >
        <circle cx="100" cy="100" r="45" />
        <circle cx="100" cy="100" r="70" strokeDasharray="2 5" />
        {[0, 72, 144, 216, 288].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 100 100)`}>
            <line x1="100" y1="45" x2="100" y2="25" />
            <circle cx="100" cy="25" r="2.5" fill="currentColor" />
          </g>
        ))}
        <circle cx="100" cy="100" r="3" fill="currentColor" />
      </svg>
    </div>
  )
}

export default function ProviderFeedPreview() {
  return (
          <RevealItem className="space-y-3 md:space-y-4">
            {/* toolbar — compact on mobile */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="flex-1 inline-flex items-center gap-2 md:gap-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md px-3 md:px-3.5 py-2 md:py-2.5 shadow-sm min-w-0">
                <span className="material-symbols-outlined !text-[15px] md:!text-[16px] text-gray-400">
                  search
                </span>
                <span className="font-sans text-[10px] md:text-[11px] text-gray-400 truncate">
                  Search programs, deals…
                </span>
              </div>
              <div className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3.5 py-2.5 shadow-sm flex-shrink-0">
                <span className="font-sans text-[11px] text-gray-500 whitespace-nowrap">
                  All Categories
                </span>
                <span className="material-symbols-outlined !text-[16px] text-gray-400">
                  expand_more
                </span>
              </div>
            </div>

            {/* deals feed */}
            <div className="relative rounded-xl md:rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-zinc-950/20 backdrop-blur-md p-3 md:p-4 shadow-[0_12px_40px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between px-0.5 mb-2 md:mb-3">
                <span className="inline-flex items-center gap-1 md:gap-1.5 font-mono text-[8px] md:text-[9px] font-black uppercase tracking-[0.12em] md:tracking-[0.14em] text-gray-500 dark:text-gray-400">
                  <span
                    className="material-symbols-outlined !text-[11px] md:!text-[12px] text-amber-500"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    push_pin
                  </span>
                  Pinned to top
                </span>
                <span className="font-mono text-[7px] md:text-[8px] font-bold uppercase tracking-[0.12em] text-gray-400 dark:text-gray-500 bg-black/5 dark:bg-white/5 px-1.5 md:px-2 py-0.5 rounded border border-black/5 dark:border-white/5">
                  Ad
                </span>
              </div>

              {/* Featured slot */}
              <div className="relative overflow-hidden rounded-xl border-2 border-accent-yellow bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white shadow-[4px_4px_0_#000] md:shadow-[6px_6px_0_#000] p-3 md:p-5 group">
                <div className="absolute inset-0 bg-accent-yellow/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Orbital className="absolute -top-10 -right-10 w-28 md:w-32 h-28 md:h-32 opacity-20 group-hover:opacity-30 transition-opacity" />

                <div className="relative">
                  <span className="inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono text-[7px] md:text-[8px] font-black uppercase tracking-[0.14em] px-2 md:px-2.5 py-0.5 border border-black mb-2 md:mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                    Open Slot
                  </span>
                  <p className="font-mono font-black uppercase leading-tight text-[15px] md:text-lg mb-1 md:mb-1.5 tracking-tight text-white group-hover:text-accent-yellow transition-colors">
                    Your deal here
                  </p>
                  <p className="text-gray-400 leading-relaxed text-[10px] md:text-[11px] mb-2.5 md:mb-4 max-w-[36ch]">
                    Pin your offer to the top of our catalog and get seen first by thousands of
                    verified founders.
                  </p>
                  <ul className="space-y-1 md:space-y-1.5 mb-2.5 md:mb-4">
                    {slotPerks.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-1.5 md:gap-2 text-gray-200 text-[10px] md:text-[10.5px]"
                      >
                        <span className="material-symbols-outlined text-accent-yellow !text-[13px] md:!text-[14px]">
                          check
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between border-t border-white/10 pt-2.5 md:pt-3.5 gap-2">
                    <span className="font-mono text-[9px] md:text-[10px] text-gray-400 uppercase tracking-wide">
                      From <span className="text-accent-yellow font-black text-sm">$25</span>/wk
                    </span>
                    <span className="inline-flex items-center gap-1 md:gap-1.5 bg-accent-yellow text-black font-mono text-[9px] md:text-[10px] font-black uppercase tracking-wide px-2.5 md:px-3.5 py-1.5 border border-black transition-all group-hover:bg-white group-hover:translate-x-0.5">
                      Get Featured
                      <span className="material-symbols-outlined !text-[12px] md:!text-[13px]">
                        arrow_forward
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* regular listings — hide on very small to save space, show from sm */}
              <div className="hidden sm:grid grid-cols-2 gap-2.5 md:gap-3 mt-3 md:mt-3.5 opacity-80 hover:opacity-90 transition-opacity">
                {regularRows.map((r) => (
                  <div
                    key={r.name}
                    className="rounded-xl border border-black/5 dark:border-white/5 bg-white dark:bg-zinc-900/30 p-2.5 md:p-3"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0 rounded-lg border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                        <span className="material-symbols-outlined !text-[14px] md:!text-[16px] text-gray-400 dark:text-gray-500">
                          {r.icon}
                        </span>
                      </span>
                      <p className="font-sans font-bold text-[9px] md:text-[10px] text-gray-700 dark:text-gray-300 leading-tight truncate">
                        {r.name}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-1">
                      <span className="font-mono text-[8px] md:text-[9px] font-black text-amber-700 dark:text-accent-yellow truncate">
                        {r.value}
                      </span>
                      <span className="font-mono text-[7px] font-black uppercase tracking-wide text-gray-400 dark:text-gray-500 border border-black/10 dark:border-white/10 rounded-md px-1.5 md:px-2 py-0.5 shrink-0">
                        View
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* live performance — 2×2 on mobile, 4-col on md+ */}
            <div className="space-y-1.5 md:space-y-2">
              <span className="inline-flex items-center bg-black dark:bg-white text-white dark:text-black font-mono text-[8px] md:text-[9px] font-black uppercase tracking-[0.14em] md:tracking-[0.18em] px-2.5 md:px-3 py-1 rounded-md">
                Live Performance
              </span>
              <div className="grid grid-cols-2 md:grid-cols-4 rounded-xl md:rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-zinc-950/20 backdrop-blur-md shadow-sm divide-x divide-y md:divide-y-0 divide-black/10 dark:divide-white/10 overflow-hidden">
                {livePerf.map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col items-center text-center px-2 py-2.5 md:py-3.5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <span
                      className="material-symbols-outlined !text-[14px] md:!text-[16px] text-accent-yellow mb-1 md:mb-1.5"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {s.icon}
                    </span>
                    <p className="font-mono font-black text-sm md:text-base text-black dark:text-white leading-none tabular-nums">
                      {s.value}
                    </p>
                    <p className="font-mono text-[7px] md:text-[8px] uppercase tracking-wide text-gray-400 dark:text-gray-500 leading-tight mt-1 md:mt-1.5">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealItem>


  )
}
