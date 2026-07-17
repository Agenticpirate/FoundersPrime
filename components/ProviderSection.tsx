'use client'

import Link from 'next/link'
import Mandala from '@/components/ui/Mandala'
import { Reveal, RevealStagger, RevealItem } from '@/components/ui/premium-motion'

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
    <section
      id="advertise"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-[#fcfcfc] via-[#faf9f5] to-[#fbfbf8] dark:from-[#000000] dark:via-[#090a0f] dark:to-[#000000] text-black dark:text-white py-16 md:py-24 border-y border-black/5 dark:border-white/10 transition-colors duration-300"
    >
      {/* ─── Ambient ornaments ─── */}
      <Mandala
        variant="rings"
        colorClass="text-black dark:text-white"
        opacity={0.025}
        speed={150}
        direction="cw"
        className="hidden lg:block absolute -bottom-40 -left-32 w-[28rem] h-[28rem] pointer-events-none"
      />
      <div className="absolute right-0 top-1/4 w-[30rem] h-[30rem] bg-accent-yellow/5 dark:bg-accent-yellow/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <RevealStagger className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.35fr_1.15fr] gap-8 lg:gap-12 items-start">

          {/* ══════════ LEFT — pitch ══════════ */}
          <RevealItem className="flex flex-col justify-between h-full">
            <div>
              {/* tag with yellow underline */}
              <div className="inline-block mb-6 relative">
                <span className="inline-flex items-center gap-1.5 border border-black/10 dark:border-white/10 bg-white/80 dark:bg-zinc-900/50 backdrop-blur-md px-3 py-1.5 rounded-full font-mono text-[9px] font-black uppercase tracking-[0.15em] text-black/80 dark:text-white/80 shadow-sm">
                  <span className="material-symbols-outlined !text-[13px] text-accent-yellow" style={{ fontVariationSettings: "'FILL' 1" }}>campaign</span>
                  More visibility. More founders. More growth.
                </span>
                <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-accent-yellow rounded-full" />
              </div>

              {/* headline */}
              <h2 className="font-mono font-black uppercase text-black dark:text-white tracking-tight leading-[1.05] text-[28px] sm:text-[34px] lg:text-[40px]">
                Founders are looking.
              </h2>
              <span className="mt-2.5 inline-block bg-accent-yellow text-black font-mono font-black uppercase tracking-tight leading-none text-[26px] sm:text-[32px] lg:text-[38px] px-3.5 py-2 border-2 border-black shadow-[4px_4px_0px_#000]">
                Be findable.
              </span>

              {/* body */}
              <p className="mt-6 font-sans text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
                Put your accelerator, community, or SaaS in front of thousands of high-growth founders actively looking for resources and savings.
              </p>

              {/* feature list */}
              <ul className="mt-6 space-y-3.5">
                {leftFeatures.map((f) => (
                  <li key={f.text} className="flex items-center gap-3.5 group">
                    <span className="w-7 h-7 rounded-lg bg-accent-yellow/10 dark:bg-accent-yellow/5 border border-black/10 dark:border-white/10 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
                      <span className="material-symbols-outlined !text-[15px] text-black dark:text-accent-yellow">{f.icon}</span>
                    </span>
                    <span className="font-sans font-bold text-[13px] text-gray-800 dark:text-gray-200 leading-snug">{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {/* CTA */}
              <Link
                href="/submit-deal"
                className="group mt-8 inline-flex items-center gap-2.5 rounded-xl border-2 border-black bg-black dark:bg-white text-white dark:text-black px-6 py-3.5 font-mono font-black uppercase text-[11px] tracking-[0.12em] shadow-[5px_5px_0_#111] dark:shadow-[5px_5px_0_rgba(255,255,255,0.1)] hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#111] dark:hover:shadow-[7px_7px_0_rgba(255,255,255,0.15)] transition-all"
              >
                List your program
                <span className="material-symbols-outlined !text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>

              {/* dots ornament */}
              <div className="mt-8 flex items-center gap-1.5" aria-hidden="true">
                {[0.2, 0.4, 0.7, 0.4, 0.2].map((o, i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" style={{ opacity: o }} />
                ))}
                <span className="ml-2.5 h-px w-20 bg-black/10 dark:bg-white/10" />
              </div>
            </div>
          </RevealItem>

          {/* ══════════ MIDDLE — live deals-feed preview ══════════ */}
          <RevealItem className="space-y-4">
            {/* toolbar */}
            <div className="flex items-center gap-3">
              <div className="flex-1 inline-flex items-center gap-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md px-3.5 py-2.5 shadow-sm min-w-0">
                <span className="material-symbols-outlined !text-[16px] text-gray-400">search</span>
                <span className="font-sans text-[11px] text-gray-400 truncate">Search startup programs, founder deals...</span>
              </div>
              <div className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3.5 py-2.5 shadow-sm flex-shrink-0">
                <span className="font-sans text-[11px] text-gray-500 whitespace-nowrap">All Categories</span>
                <span className="material-symbols-outlined !text-[16px] text-gray-400">expand_more</span>
              </div>
            </div>

            {/* the deals feed — featured slot pinned above regular listings */}
            <div className="relative rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-zinc-950/20 backdrop-blur-md p-4 shadow-[0_12px_40px_rgba(0,0,0,0.03)]">
              {/* pinned label */}
              <div className="flex items-center justify-between px-1 mb-3">
                <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-black uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
                  <span className="material-symbols-outlined !text-[12px] text-amber-500 animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>push_pin</span>
                  Pinned to top
                </span>
                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded border border-black/5 dark:border-white/5">Ad</span>
              </div>

              {/* ★ THE ACTUAL FEATURED SLOT (pulsating neon design) */}
              <div className="relative overflow-hidden rounded-xl border-2 border-accent-yellow bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white shadow-[6px_6px_0_#000] p-4 md:p-5 group">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-accent-yellow/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Orbital className="absolute -top-10 -right-10 w-32 h-32 opacity-20 group-hover:opacity-30 transition-opacity" />
                
                <div className="relative">
                  <span className="inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono text-[8px] font-black uppercase tracking-[0.15em] px-2.5 py-0.5 border border-black mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                    Open Slot
                  </span>
                  <p className="font-mono font-black uppercase leading-tight text-lg mb-1.5 tracking-tight text-white group-hover:text-accent-yellow transition-colors">Your deal here</p>
                  <p className="text-gray-400 leading-relaxed text-[11px] mb-4 max-w-[36ch]">
                    Pin your offer to the top of our catalog and get seen first by thousands of verified founders.
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    {slotPerks.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-gray-200 text-[10.5px]">
                        <span className="material-symbols-outlined text-accent-yellow !text-[14px]">check</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between border-t border-white/10 pt-3.5">
                    <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wide">
                      From <span className="text-accent-yellow font-black text-sm">$25</span>/wk
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono text-[10px] font-black uppercase tracking-wide px-3.5 py-1.5 border border-black transition-all group-hover:bg-white group-hover:translate-x-0.5">
                      Get Featured
                      <span className="material-symbols-outlined !text-[13px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* regular listings beneath (dimmed, for context) */}
              <div className="grid grid-cols-2 gap-3 mt-3.5 opacity-80 hover:opacity-90 transition-opacity">
                {regularRows.map((r) => (
                  <div key={r.name} className="rounded-xl border border-black/5 dark:border-white/5 bg-white dark:bg-zinc-900/30 p-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 flex-shrink-0 rounded-lg border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                        <span className="material-symbols-outlined !text-[16px] text-gray-400 dark:text-gray-500">{r.icon}</span>
                      </span>
                      <p className="font-sans font-bold text-[10px] text-gray-700 dark:text-gray-300 leading-tight truncate">{r.name}</p>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between">
                      <span className="font-mono text-[9px] font-black text-amber-700 dark:text-accent-yellow">{r.value}</span>
                      <span className="font-mono text-[7px] font-black uppercase tracking-wide text-gray-400 dark:text-gray-500 border border-black/10 dark:border-white/10 rounded-md px-2 py-0.5">View</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* live performance */}
            <div className="space-y-2">
              <span className="inline-flex items-center bg-black dark:bg-white text-white dark:text-black font-mono text-[9px] font-black uppercase tracking-[0.18em] px-3 py-1 rounded-md">
                Live Performance
              </span>
              <div className="grid grid-cols-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-zinc-950/20 backdrop-blur-md shadow-sm divide-x divide-black/10 dark:divide-white/10 overflow-hidden">
                {livePerf.map((s) => (
                  <div key={s.label} className="flex flex-col items-center text-center px-2 py-3.5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                    <span className="material-symbols-outlined !text-[16px] text-accent-yellow dark:text-accent-yellow mb-1.5" style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                    <p className="font-mono font-black text-base text-black dark:text-white leading-none">{s.value}</p>
                    <p className="font-mono text-[8px] uppercase tracking-wide text-gray-400 dark:text-gray-500 leading-tight mt-1.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealItem>

          {/* ══════════ RIGHT — PREMIUM FEATURED AD SLOT CARD (ENHANCED) ══════════ */}
          <RevealItem className="lg:sticky lg:top-8">
            <div className="relative rounded-3xl border-3 border-black bg-gradient-to-b from-[#12141c] via-[#090a0f] to-[#000] text-white shadow-[8px_8px_0_#ffd700] dark:shadow-[8px_8px_0_rgba(255,215,0,0.2)] overflow-hidden">
              {/* Premium Glow effect along the top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-yellow to-transparent opacity-80" />
              
              {/* most visibility tab */}
              <div className="absolute top-0 right-0 z-10 flex items-center gap-1 bg-accent-yellow text-black px-3.5 py-2 rounded-bl-xl font-mono text-[9px] font-black uppercase tracking-[0.15em] border-l-2 border-b-2 border-black shadow-sm">
                <span className="material-symbols-outlined !text-[12px] animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                Most Visibility
              </div>
              
              {/* Subtle background graphic */}
              <div
                className="pointer-events-none absolute top-12 right-6 w-24 h-16 opacity-10"
                style={{ backgroundImage: 'radial-gradient(#ffd700 1px, transparent 1px)', backgroundSize: '8px 8px' }}
                aria-hidden="true"
              />

              <div className="relative p-6 md:p-7">
                {/* slot pill */}
                <span className="inline-flex items-center gap-1.5 bg-accent-yellow/10 border border-accent-yellow/30 text-accent-yellow font-mono text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-4">
                  <span className="material-symbols-outlined !text-[13px] text-accent-yellow" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  Featured Ad Slot
                </span>

                {/* headline */}
                <h3 className="font-mono font-black uppercase text-white tracking-tight leading-[1.1] text-xl md:text-2xl mb-5">
                  Get the top spot — without the{' '}
                  <span className="text-accent-red font-black underline decoration-wavy decoration-accent-red/50 decoration-1 underline-offset-4">$1,499/mo</span> price tag.
                </h3>

                {/* price boxes */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 hover:bg-white/[0.04] transition-colors">
                    <p className="font-mono text-[7px] font-bold uppercase tracking-widest text-gray-500">Typical Directory</p>
                    <p className="font-mono font-black text-base text-gray-400 line-through decoration-accent-red decoration-2 my-1.5">$500 – $1.5K</p>
                    <p className="font-mono text-[8px] uppercase tracking-wider text-gray-500">/ Month</p>
                  </div>
                  
                  {/* FoundersPrime Pricing (glowing card) */}
                  <div className="relative rounded-xl border-2 border-accent-yellow bg-gradient-to-b from-[#1c1d12] to-black p-3.5 shadow-[0_0_15px_rgba(255,215,0,0.1)]">
                    <div className="absolute -top-2 left-3 bg-accent-yellow text-black font-mono text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border border-black">FOUNDERS` CHOICE</div>
                    <p className="font-mono text-[7px] font-bold uppercase tracking-widest text-accent-yellow mt-1">FoundersPrime</p>
                    <p className="font-mono font-black leading-none my-2 flex items-baseline gap-1">
                      <span className="text-[8px] uppercase tracking-wider text-white/70">From</span>
                      <span className="text-accent-yellow text-2xl tracking-tighter">$25</span>
                    </p>
                    <p className="font-mono text-[8.5px] uppercase tracking-wider text-white/80 font-bold">/ Wk <span className="text-[7.5px] text-white/50 font-normal">or $99/yr</span></p>
                  </div>
                </div>

                {/* feature rows */}
                <div className="border-t border-b border-white/10 divide-y divide-white/15 mb-6">
                  {yellowFeatures.map((f) => (
                    <div key={f} className="flex items-center gap-3 py-2.5 group/item hover:bg-white/[0.01] px-1 transition-colors">
                      <span className="w-4.5 h-4.5 flex-shrink-0 rounded-full bg-accent-yellow/10 border border-accent-yellow/30 flex items-center justify-center transition-transform group-hover/item:scale-110">
                        <span className="material-symbols-outlined !text-[11px] text-accent-yellow" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                      </span>
                      <span className="flex-1 font-sans text-xs text-gray-300 group-hover/item:text-white transition-colors leading-snug">{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA (Gorgeous shimmer/sheen button) */}
                <Link
                  href="/submit-deal?tier=featured"
                  className="group relative overflow-hidden flex items-center justify-center gap-2 w-full rounded-xl border-2 border-black bg-accent-yellow text-black px-6 py-4 font-mono font-black uppercase text-xs tracking-[0.15em] hover:bg-white hover:text-black transition-all hover:scale-[1.01] hover:-translate-y-0.5 shadow-md active:translate-y-0"
                >
                  <span className="material-symbols-outlined !text-[16px] text-black group-hover:animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                  Claim Featured Spot
                  
                  {/* Sheen sweep animation */}
                  <span
                    className="absolute inset-y-0 -left-[100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none group-hover:animate-[heroShimmer_1.8s_ease-in-out_infinite]"
                  />
                </Link>

                {/* footer */}
                <p className="mt-4 text-center font-mono text-[9px] font-black uppercase tracking-[0.15em] text-gray-400">
                  Limited Slots • Founding Rate While It Lasts
                </p>
              </div>
            </div>
          </RevealItem>

        </RevealStagger>
      </div>
    </section>
  )
}
