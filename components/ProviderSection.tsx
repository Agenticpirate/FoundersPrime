import Link from 'next/link'
import Mandala from '@/components/ui/Mandala'

/* ─── Left column — value props ─── */
const leftFeatures = [
  { icon: 'groups', text: 'Reach 50K+ founders every month' },
  { icon: 'ads_click', text: 'High-intent audience actively searching' },
  { icon: 'verified_user', text: 'Trusted by the founder community' },
  { icon: 'monitoring', text: 'Boost visibility. Drive more signups.' },
]

/* ─── The exact perks shown on the live featured slot ─── */
const slotPerks = ['Pinned above all listings', '⭐ Featured badge', 'Auto-refund if not approved']

/* ─── Regular listings shown beneath the featured slot (for context) ─── */
const regularRows = [
  { icon: 'cloud', name: 'Cloud Credits Program', value: 'Up to $100K' },
  { icon: 'rocket_launch', name: 'Accelerator Access', value: '$25K+ perks' },
]

/* ─── Middle preview — live performance stats ─── */
const livePerf = [
  { icon: 'groups', value: '50K+', label: 'Monthly Views' },
  { icon: 'trending_up', value: '3X', label: 'More Visibility' },
  { icon: 'workspace_premium', value: 'TOP 1%', label: 'Placement' },
  { icon: 'bolt', value: '24H', label: 'Approval' },
]

/* ─── Right card — what the featured slot includes ─── */
const yellowFeatures = [
  'Pinned to the top of the homepage & deals feed',
  'Featured badge that signals trust',
  'Permanent dofollow backlink for SEO',
  'Priority spot in the weekly founder newsletter',
  'Live views & clicks analytics on your listing',
  'Auto-refund if your deal is not approved',
]

/* ─── Spinning orbital ornament (matches the live featured slot) ─── */
function Orbital({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" className="w-full h-full text-accent-yellow mandala-spin-cw" fill="none" stroke="currentColor" strokeWidth="0.8">
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

export default function ProviderSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F5] dark:bg-[#050505] md:dark:bg-[#FAF9F5] text-black dark:text-white md:dark:text-black py-10 md:py-12 border-y border-black/5 dark:border-white/10 md:dark:border-black/5 transition-colors duration-300">
      {/* ─── Ambient ornament (decorative, subtle) ─── */}
      <Mandala
        variant="rings"
        colorClass="text-black dark:text-white md:dark:text-black"
        opacity={0.035}
        speed={150}
        direction="cw"
        className="hidden lg:block absolute -bottom-40 -left-32 w-[26rem] h-[26rem]"
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr_1.05fr] gap-6 items-start">

          {/* ══════════ LEFT — pitch ══════════ */}
          <div className="fp-fade-up">
            {/* tag with yellow underline */}
            <div className="inline-block mb-5">
              <span className="inline-flex items-center gap-1.5 border border-black/15 dark:border-white/15 md:dark:border-black/15 bg-white/70 dark:bg-white/5 md:dark:bg-white/70 px-2.5 py-1 rounded-[3px] font-mono text-[9px] font-black uppercase tracking-[0.12em] text-black/70 dark:text-white/70 md:dark:text-black/70">
                <span className="material-symbols-outlined !text-[12px] text-black dark:text-white md:dark:text-black">campaign</span>
                More visibility. More founders. More growth.
              </span>
              <span className="block h-[3px] bg-accent-yellow rounded-full mt-1.5" />
            </div>

            {/* headline */}
            <h2 className="font-mono font-black uppercase text-black dark:text-white md:dark:text-black tracking-tight leading-[1.05] text-[24px] sm:text-[28px]">
              Founders are looking.
            </h2>
            <span className="mt-2 inline-block bg-accent-yellow text-black font-mono font-black uppercase tracking-tight leading-none text-[24px] sm:text-[28px] px-2.5 py-1.5">
              Be findable.
            </span>

            {/* body */}
            <p className="mt-4 font-sans text-sm text-gray-600 dark:text-gray-400 md:dark:text-gray-600 leading-relaxed max-w-sm">
              Put your program in front of thousands of founders actively searching for resources like yours.
            </p>

            {/* feature list */}
            <ul className="mt-5 space-y-2.5">
              {leftFeatures.map((f) => (
                <li key={f.text} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-accent-yellow flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined !text-[14px] text-black">{f.icon}</span>
                  </span>
                  <span className="font-sans font-bold text-[13px] text-black dark:text-white md:dark:text-black leading-snug">{f.text}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href="/submit-deal"
              className="group mt-6 inline-flex items-center gap-2 rounded-lg border-2 border-black bg-black text-white px-5 py-2.5 font-mono font-black uppercase text-[11px] tracking-[0.12em] shadow-[4px_4px_0_#111] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111] transition-all"
            >
              List your program
              <span className="material-symbols-outlined !text-[16px] transition-transform group-hover:translate-x-0.5">arrow_forward</span>
            </Link>

            {/* dots ornament */}
            <div className="mt-7 flex items-center gap-1.5" aria-hidden="true">
              {[0.2, 0.3, 0.55, 0.3, 0.2].map((o, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white md:dark:bg-black" style={{ opacity: o }} />
              ))}
              <span className="ml-2 h-px w-16 bg-black/15 dark:bg-white/15 md:dark:bg-black/15" />
            </div>
          </div>

          {/* ══════════ MIDDLE — live deals-feed preview ══════════ */}
          <div className="fp-fade-up space-y-3.5" style={{ animationDelay: '0.08s' }}>
            {/* toolbar */}
            <div className="flex items-center gap-2">
              <div className="flex-1 inline-flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 md:dark:border-black/10 bg-white dark:bg-white/5 md:dark:bg-white px-3 py-2 shadow-sm min-w-0">
                <span className="material-symbols-outlined !text-[15px] text-gray-400">search</span>
                <span className="font-sans text-[11.5px] text-gray-400 truncate">Search startup programs, founder deals...</span>
              </div>
              <div className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-3 py-2 shadow-sm flex-shrink-0">
                <span className="font-sans text-[11.5px] text-gray-500 whitespace-nowrap">All Categories</span>
                <span className="material-symbols-outlined !text-[15px] text-gray-400">expand_more</span>
              </div>
            </div>

            {/* the deals feed — featured slot pinned above regular listings */}
            <div className="relative rounded-xl border border-black/10 dark:border-white/10 md:dark:border-black/10 bg-white/60 dark:bg-white/[0.02] md:dark:bg-white/60 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
              {/* pinned label */}
              <div className="flex items-center justify-between px-0.5 mb-2">
                <span className="inline-flex items-center gap-1.5 font-mono text-[8.5px] font-black uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400 md:dark:text-gray-500">
                  <span className="material-symbols-outlined !text-[12px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>push_pin</span>
                  Pinned to top
                </span>
                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.1em] text-gray-400 dark:text-gray-500 md:dark:text-gray-400">Ad</span>
              </div>

              {/* ★ THE ACTUAL FEATURED SLOT (matches the live deals page) */}
              <div className="relative overflow-hidden rounded-lg border-2 border-black bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white shadow-[4px_4px_0_#111] p-4">
                <Orbital className="absolute -top-8 -right-8 w-28 h-28 opacity-[0.16]" />
                <div className="relative">
                  <span className="inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono text-[8px] font-black uppercase tracking-[0.12em] px-2 py-0.5 border border-black mb-2.5">
                    <span className="w-1 h-1 rounded-full bg-black animate-pulse" />
                    Open Slot
                  </span>
                  <p className="font-mono font-black uppercase leading-tight text-base mb-1">Your deal here</p>
                  <p className="text-gray-300 leading-relaxed text-[11px] mb-3 max-w-[34ch]">
                    Pin your offer to the top and get seen first by thousands of verified founders.
                  </p>
                  <ul className="space-y-1 mb-3.5">
                    {slotPerks.map((b) => (
                      <li key={b} className="flex items-center gap-1.5 text-gray-200 text-[10.5px]">
                        <span className="material-symbols-outlined text-accent-yellow !text-[13px]">check</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wide">
                      From <span className="text-accent-yellow font-black text-xs">$25</span>/wk
                    </span>
                    <span className="inline-flex items-center gap-1 bg-accent-yellow text-black font-mono text-[10px] font-black uppercase tracking-wide px-2.5 py-1 border border-black">
                      Get Featured
                      <span className="material-symbols-outlined !text-[13px]">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* regular listings beneath (dimmed, for context) */}
              <div className="grid grid-cols-2 gap-2 mt-2 opacity-80">
                {regularRows.map((r) => (
                  <div key={r.name} className="rounded-lg border border-black/10 dark:border-white/10 md:dark:border-black/10 bg-white dark:bg-[#0c0c0c] md:dark:bg-white p-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 flex-shrink-0 rounded-md border border-black/10 dark:border-white/10 md:dark:border-black/10 bg-gray-50 dark:bg-white/5 md:dark:bg-gray-50 flex items-center justify-center">
                        <span className="material-symbols-outlined !text-[15px] text-gray-300 dark:text-gray-600 md:dark:text-gray-300">{r.icon}</span>
                      </span>
                      <p className="font-sans font-bold text-[10.5px] text-gray-700 dark:text-gray-300 md:dark:text-gray-700 leading-tight truncate">{r.name}</p>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-mono text-[9px] font-black text-emerald-600 dark:text-emerald-400 md:dark:text-emerald-600">{r.value}</span>
                      <span className="font-mono text-[7.5px] font-black uppercase tracking-wide text-gray-400 dark:text-gray-500 md:dark:text-gray-400 border border-black/10 dark:border-white/10 md:dark:border-black/10 rounded px-1.5 py-0.5">View</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* live performance */}
            <div>
              <span className="inline-flex items-center bg-black dark:bg-white md:dark:bg-black text-white dark:text-black md:dark:text-white font-mono text-[9px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-[3px]">
                Live Performance
              </span>
              <div className="mt-2.5 grid grid-cols-4 rounded-xl border border-black/10 dark:border-white/10 md:dark:border-black/10 bg-white dark:bg-[#0c0c0c] md:dark:bg-white shadow-sm divide-x divide-black/10 dark:divide-white/10 md:dark:divide-black/10 overflow-hidden">
                {livePerf.map((s) => (
                  <div key={s.label} className="flex flex-col items-center text-center px-2 py-3">
                    <span className="material-symbols-outlined !text-[16px] text-black dark:text-white md:dark:text-black mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                    <p className="font-mono font-black text-[15px] text-black dark:text-white md:dark:text-black leading-none">{s.value}</p>
                    <p className="font-mono text-[8px] uppercase tracking-wide text-gray-400 dark:text-gray-500 md:dark:text-gray-400 leading-tight mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══════════ RIGHT — featured ad slot offer ══════════ */}
          <div className="fp-fade-up" style={{ animationDelay: '0.16s' }}>
            <div className="relative rounded-2xl border-2 border-black bg-accent-yellow shadow-[6px_6px_0_#111] dark:shadow-[6px_6px_0_rgba(255,255,255,0.08)] md:dark:shadow-[6px_6px_0_#111] overflow-hidden">
              {/* most visibility tab */}
              <div className="absolute top-0 right-0 z-10 flex items-center gap-1 bg-black text-accent-yellow px-2.5 py-1.5 rounded-bl-lg font-mono text-[8.5px] font-black uppercase tracking-[0.12em]">
                <span className="material-symbols-outlined !text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                Most Visibility
              </div>
              {/* halftone dots */}
              <div
                className="pointer-events-none absolute top-11 right-4 w-20 h-14 text-black/20"
                style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '7px 7px' }}
                aria-hidden="true"
              />

              <div className="relative p-5">
                {/* slot pill */}
                <span className="inline-flex items-center gap-1.5 bg-black text-accent-yellow font-mono text-[9px] font-black uppercase tracking-[0.12em] px-2.5 py-1 rounded-[3px] mb-3">
                  <span className="material-symbols-outlined !text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  Featured Ad Slot
                </span>

                {/* headline */}
                <h3 className="font-mono font-black uppercase text-black tracking-tight leading-[1.1] text-xl mb-3.5">
                  Get the top spot — without the{' '}
                  <span className="text-accent-red">$1,499/mo</span> price tag.
                </h3>

                {/* price boxes */}
                <div className="grid grid-cols-2 gap-2.5 mb-3.5">
                  <div className="rounded-lg border border-black/15 dark:border-white/15 md:dark:border-black/15 bg-white dark:bg-[#0c0c0c] md:dark:bg-white px-3 py-2.5">
                    <p className="font-mono text-[8px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 md:dark:text-gray-400">Typical Directory</p>
                    <p className="font-mono font-black text-[15px] text-black/70 dark:text-white/70 md:dark:text-black/70 line-through decoration-accent-red decoration-2 my-1">$500 – $1,500</p>
                    <p className="font-mono text-[8px] uppercase tracking-widest text-gray-400 dark:text-gray-500 md:dark:text-gray-400">/ Month</p>
                  </div>
                  <div className="rounded-lg bg-black px-3 py-2.5">
                    <p className="font-mono text-[8px] font-bold uppercase tracking-widest text-accent-yellow">FoundersPrime</p>
                    <p className="font-mono font-black leading-none my-1.5 flex items-baseline gap-1">
                      <span className="text-[9px] uppercase tracking-widest text-white/70">From</span>
                      <span className="text-accent-yellow text-2xl">$25</span>
                    </p>
                    <p className="font-mono text-[8px] uppercase tracking-widest text-white/50">/ Week &nbsp;or&nbsp; $99/mo</p>
                  </div>
                </div>

                {/* feature rows */}
                <div className="border-y border-black/15 divide-y divide-black/15 mb-4">
                  {yellowFeatures.map((f) => (
                    <div key={f} className="flex items-center gap-2.5 py-1.5">
                      <span className="w-4 h-4 flex-shrink-0 rounded-[3px] bg-black flex items-center justify-center">
                        <span className="material-symbols-outlined !text-[11px] text-accent-yellow" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                      </span>
                      <span className="flex-1 font-sans text-[11.5px] text-black leading-tight">{f}</span>
                      <span className="material-symbols-outlined !text-[15px] text-black flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href="/submit-deal?tier=featured"
                  className="group fp-sheen flex items-center justify-center gap-2 w-full rounded-lg border-2 border-black bg-black text-white px-5 py-3 font-mono font-black uppercase text-[11px] tracking-[0.12em] hover:bg-[#1a1a1a] transition-colors"
                >
                  <span className="material-symbols-outlined !text-[15px] text-accent-yellow" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                  Claim Featured Spot
                </Link>

                {/* footer */}
                <p className="mt-3 text-center font-mono text-[8.5px] font-black uppercase tracking-[0.12em] text-black/60">
                  Limited Slots • Founding Rate While It Lasts
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
