'use client'

import StatCard from '@/components/ui/StatCard'
import Mandala from '@/components/ui/Mandala'

export default function ProgramsHero() {
  return (
    <div className="relative mb-6 md:mb-8">
      {/* Decorative background mandala */}
      <Mandala
        variant="rings"
        colorClass="text-gray-900 dark:text-white/5"
        opacity={0.07}
        speed={80}
        className="absolute -top-8 -right-6 w-56 h-56 hidden md:block"
      />

      <div className="relative flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
        {/* Left: title block */}
        <div className="min-w-0 flex-1">
          {/* Eyebrow badge */}
          <div className="relative inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full border border-accent-yellow/20 bg-accent-yellow/5 text-accent-yellow overflow-hidden">
            <span className="material-symbols-outlined relative !text-[12px]">grid_view</span>
            <span className="relative font-mono text-[9px] font-bold uppercase tracking-[0.14em]">
              ALL PROGRAMS. ONE PLACE.
            </span>
          </div>

          {/* Title */}
          <h1 className="font-mono text-3xl md:text-4xl lg:text-[40px] font-black tracking-tight text-white leading-[1.1] mb-2">
            Power your <span className="text-accent-yellow">startup</span> journey.
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-sm md:text-[15px] text-gray-400 leading-relaxed max-w-2xl mb-4">
            Discover verified accelerators, incubators, and grants. Fuel your idea. Get funded. Scale faster.
          </p>

          {/* Mini-pills row */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { text: 'Verified Cohorts', icon: 'rocket_launch' },
              { text: 'Funding Opportunities', icon: 'payments' },
              { text: 'Global Reach', icon: 'public' },
            ].map((pill, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0f0f0f] border border-white/10 rounded-sm font-mono text-[10px] font-semibold text-gray-300"
              >
                <span className="material-symbols-outlined !text-[12px] text-accent-yellow">{pill.icon}</span>
                <span>{pill.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 4-up stat strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:flex xl:items-center gap-3 xl:flex-shrink-0">
          <div className="w-full xl:w-44">
            <StatCard
              label="DATABASE STATUS"
              value="Vetted"
              delta="Updated weekly"
              icon="grid_view"
              iconColor="text-emerald-400"
              iconBg="bg-emerald-950/20"
            />
          </div>
          <div className="w-full xl:w-44">
            <StatCard
              label="TOTAL FUNDING"
              value="$250M+"
              delta="Across all programs"
              icon="payments"
              iconColor="text-amber-600"
              iconBg="bg-accent-yellow/30"
              highlight={true}
              accent="255,221,0"
              valueGradient="from-accent-yellow to-amber-300"
              ornamentColor="text-accent-yellow"
            />
          </div>
          <div className="w-full xl:w-44">
            <StatCard
              label="ACCEPTANCE RATE"
              value="~2%"
              delta="Top programs"
              icon="filter_alt"
              iconColor="text-rose-400"
              iconBg="bg-rose-950/20"
            />
          </div>
          <div className="w-full xl:w-44">
            <StatCard
              label="GLOBAL NETWORK"
              value="Elite"
              delta="Founders connected"
              icon="groups"
              iconColor="text-sky-400"
              iconBg="bg-sky-950/20"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
