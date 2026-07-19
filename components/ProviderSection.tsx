'use client'

import Link from 'next/link'
import Mandala from '@/components/ui/Mandala'
import { Reveal, RevealStagger, RevealItem } from '@/components/ui/premium-motion'
import ProviderFeedPreview from '@/components/ProviderFeedPreview'
import ProviderOfferCard from '@/components/ProviderOfferCard'

/* ─── Left column — value props ─── */
const leftFeatures = [
  { icon: 'groups', text: 'Reach 50K+ founders every month' },
  { icon: 'ads_click', text: 'High-intent audience actively searching' },
  { icon: 'verified_user', text: 'Trusted by the founder community' },
  { icon: 'monitoring', text: 'Boost visibility. Drive more signups.' },
]

export default function ProviderSection() {
  return (
    <section
      id="advertise"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-[#fcfcfc] via-[#faf9f5] to-[#fbfbf8] dark:from-[#000000] dark:via-[#090a0f] dark:to-[#000000] text-black dark:text-white py-10 md:py-24 border-y border-black/5 dark:border-white/10 transition-colors duration-300"
    >
      {/* ─── Ambient ornaments (desktop) ─── */}
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
        <RevealStagger className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.35fr_1.15fr] gap-5 md:gap-8 lg:gap-12 items-start">
          {/* ══════════ LEFT — pitch ══════════ */}
          <RevealItem className="flex flex-col justify-between h-full">
            <div>
              {/* tag */}
              <div className="inline-block mb-3 md:mb-6 relative max-w-full">
                <span className="inline-flex items-center gap-1.5 border border-black/10 dark:border-white/10 bg-white/80 dark:bg-zinc-900/50 backdrop-blur-md px-2.5 md:px-3 py-1 md:py-1.5 rounded-full font-mono text-[8px] md:text-[9px] font-black uppercase tracking-[0.12em] md:tracking-[0.15em] text-black/80 dark:text-white/80 shadow-sm">
                  <span
                    className="material-symbols-outlined !text-[12px] md:!text-[13px] text-accent-yellow"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    campaign
                  </span>
                  <span className="md:hidden">More visibility. More growth.</span>
                  <span className="hidden md:inline">More visibility. More founders. More growth.</span>
                </span>
                <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-accent-yellow rounded-full hidden md:block" />
              </div>

              {/* headline */}
              <h2 className="font-mono font-black uppercase text-black dark:text-white tracking-tight leading-[1.05] text-[22px] sm:text-[34px] lg:text-[40px]">
                Founders are looking.
              </h2>
              <span className="mt-2 md:mt-2.5 inline-block bg-accent-yellow text-black font-mono font-black uppercase tracking-tight leading-none text-[20px] sm:text-[32px] lg:text-[38px] px-2.5 md:px-3.5 py-1.5 md:py-2 border-2 border-black shadow-[3px_3px_0px_#000] md:shadow-[4px_4px_0px_#000]">
                Be findable.
              </span>

              {/* body */}
              <p className="mt-3.5 md:mt-6 font-sans text-[13px] md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
                Put your accelerator, community, or SaaS in front of thousands of high-growth
                founders actively looking for resources and savings.
              </p>

              {/* feature list — 2-col compact on mobile, list on desktop */}
              <ul className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-1 gap-2 md:gap-3.5 md:space-y-0">
                {leftFeatures.map((f) => (
                  <li key={f.text} className="flex items-center gap-2.5 md:gap-3.5 group">
                    <span className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-accent-yellow/10 dark:bg-accent-yellow/5 border border-black/10 dark:border-white/10 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
                      <span className="material-symbols-outlined !text-[13px] md:!text-[15px] text-black dark:text-accent-yellow">
                        {f.icon}
                      </span>
                    </span>
                    <span className="font-sans font-bold text-[12px] md:text-[13px] text-gray-800 dark:text-gray-200 leading-snug">
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Link
                href="/submit-deal"
                className="group mt-5 md:mt-8 inline-flex items-center justify-center gap-2 md:gap-2.5 w-full sm:w-auto rounded-xl border-2 border-black bg-black dark:bg-white text-white dark:text-black px-5 md:px-6 py-3 md:py-3.5 min-h-[44px] font-mono font-black uppercase text-[10px] md:text-[11px] tracking-[0.12em] shadow-[4px_4px_0_#111] md:shadow-[5px_5px_0_#111] dark:shadow-[5px_5px_0_rgba(255,255,255,0.1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111] transition-all"
              >
                List your program
                <span className="material-symbols-outlined !text-[15px] md:!text-[16px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </Link>

              <div className="mt-5 md:mt-8 hidden md:flex items-center gap-1.5" aria-hidden="true">
                {[0.2, 0.4, 0.7, 0.4, 0.2].map((o, i) => (
                  <span
                    key={`dot-${i}-${o}`}
                    className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white"
                    style={{ opacity: o }}
                  />
                ))}
                <span className="ml-2.5 h-px w-20 bg-black/10 dark:bg-white/10" />
              </div>
            </div>
          </RevealItem>

          <ProviderFeedPreview />

          <ProviderOfferCard />
        </RevealStagger>
      </div>
    </section>
  )
}
