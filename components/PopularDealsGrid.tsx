'use client'

import Link from 'next/link'
import { useState, Fragment, useRef, UIEvent, useEffect } from 'react'
import { popularDeals, PopularDeal } from '@/data/popular-deals'
import { GlowingEffect } from '@/components/ui/GlowingEffect'
import { CardHoverGlowShell, cardHoverClass, cardTitleHoverClass } from '@/components/ui/card-hover'
import { CardBrandHeader } from '@/components/ui/CardBrandHeader'
import { Reveal, RevealStagger, RevealItem } from '@/components/ui/premium-motion'

/* Highlights the monetary / numeric token inside a deal value (green, bold),
   matching the screenshot where the savings figure pops in green. */
const VALUE_TOKEN_SPLIT = /(\$[\d.,]+\+?%?[KMB]?\+?|€[\d.,]+\+?[KMB]?\+?|\d+%|\d+\s?months?|free)/gi
const VALUE_TOKEN_TEST = /^(\$[\d.,]+\+?%?[KMB]?\+?|€[\d.,]+\+?[KMB]?\+?|\d+%|\d+\s?months?|free)$/i

function highlightValue(value: string) {
  const parts = value.split(VALUE_TOKEN_SPLIT)
  return parts.map((part, i) =>
    VALUE_TOKEN_TEST.test(part) ? (
      <span key={part} className="text-amber-700 dark:text-accent-yellow font-bold">
        {part}
      </span>
    ) : (
      <Fragment key={part}>{part}</Fragment>
    )
  )
}

/* Decorative comic-style emphasis burst beside the bottom CTA.
   Three short strokes radiating from a focal point near the button.
   Default fans to the LEFT; `flip` mirrors for the right side. */
function BurstMark({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="32"
      height="52"
      viewBox="0 0 32 52"
      fill="none"
      aria-hidden="true"
      className={`text-black dark:text-white/40 transform ${flip ? '-scale-x-100' : ''}`}
    >
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        {/* Top ray — slants up & away from the button */}
        <line x1="28" y1="14" x2="6" y2="4" />
        {/* Middle ray — straight away from the button */}
        <line x1="29" y1="26" x2="4" y2="26" />
        {/* Bottom ray — slants down & away from the button */}
        <line x1="28" y1="38" x2="6" y2="48" />
      </g>
    </svg>
  )
}

function DealCard({ deal }: { deal: PopularDeal }) {
  return (
    <article className="relative h-[216px] rounded-2xl group/card">
      <GlowingEffect spread={40} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
      <div
        className={`relative flex h-full flex-col overflow-visible rounded-2xl border border-black/[0.08] dark:border-white/[0.1] bg-gradient-to-b from-white to-gray-50/80 dark:from-[#101010] dark:to-[#090909] p-3.5 md:p-4 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 group-hover/card:-translate-y-1 group-hover/card:border-accent-yellow/40 group-hover/card:shadow-[0_16px_36px_rgba(0,0,0,0.14)] ${cardHoverClass}`}
      >
        <CardHoverGlowShell className="rounded-2xl" />

        {/* Folded yellow corner with external-link icon */}
        <span
          aria-hidden="true"
          className="absolute top-0 right-0 z-[1] h-9 w-9 bg-accent-yellow transition-transform duration-300 group-hover/card:scale-110"
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        />
        <span className="material-symbols-outlined absolute top-1 right-1 z-10 !text-[14px] text-black">
          open_in_new
        </span>

        <CardBrandHeader
          name={deal.name}
          domain={deal.domain}
          logo={deal.logo}
          endClearance="corner"
          textClassName={cardTitleHoverClass}
        />

        {/* Dedicated offer track: two lines are reserved for every card. */}
        <p
          className="relative z-[1] mt-3 h-10 shrink-0 overflow-hidden font-sans text-[12px] font-semibold leading-[1.35] text-black dark:text-white line-clamp-2"
          title={deal.value}
        >
          {highlightValue(deal.value)}
        </p>

        {/* Dedicated description track keeps every CTA on the same baseline. */}
        <p
          className="relative z-[1] mt-1 h-8 shrink-0 overflow-hidden font-sans text-[11px] leading-[1.4] text-gray-500 dark:text-gray-400 line-clamp-2"
          title={deal.description}
        >
          {deal.description}
        </p>

        <Link
          href="/pricing"
          className="group/cta relative z-[1] mt-auto inline-flex h-9 w-full shrink-0 items-center justify-center gap-1.5 rounded-lg border border-[#FFD500]/35 bg-black px-3 font-mono text-[9px] font-black uppercase tracking-[0.14em] text-white shadow-[0_1px_0_rgba(255,255,255,0.08)_inset] transition-all duration-200 hover:border-[#FFD500] hover:bg-[#FFD500] hover:text-black group-hover/card:border-[#FFD500]/60"
          aria-label={`Get the ${deal.name} deal`}
        >
          Get this deal
          <span className="material-symbols-outlined !text-[14px] transition-transform duration-200 group-hover/cta:translate-x-0.5">
            arrow_forward
          </span>
        </Link>
      </div>
    </article>
  )
}

export default function PopularDealsGrid() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // 19 deals, 6 per page => 4 pages
  const itemsPerPage = 6
  const totalPages = Math.ceil(popularDeals.length / itemsPerPage)
  const pages = Array.from({ length: totalPages }, (_, i) =>
    popularDeals.slice(i * itemsPerPage, (i + 1) * itemsPerPage)
  )

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return
    const scrollLeft = e.currentTarget.scrollLeft
    const width = e.currentTarget.clientWidth
    const index = Math.round(scrollLeft / width)
    setActiveIndex(index)
  }

  const scrollToPage = (index: number) => {
    if (!scrollRef.current) return
    const width = scrollRef.current.clientWidth
    scrollRef.current.scrollTo({ left: width * index, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleAutoPlay = () => {
      if (window.innerWidth >= 1024) return
      const nextIndex = (activeIndex + 1) % totalPages
      scrollToPage(nextIndex)
    }
    const interval = setInterval(handleAutoPlay, 3000)
    return () => clearInterval(interval)
  }, [activeIndex, totalPages])

  return (
    <section className="relative py-14 md:py-20 bg-[#f6f8f8] dark:bg-[#000000] text-[#1a1a1a] dark:text-white border-b border-black/10 dark:border-white/10 overflow-hidden grid-bg transition-colors duration-300">
      {/* Ambient brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[min(90vw,48rem)] h-40 bg-accent-yellow/[0.07] dark:bg-accent-yellow/[0.04] blur-3xl"
      />
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Mobile Header ─── */}
        <Reveal className="flex lg:hidden flex-col items-start gap-4 mb-6">
          <div className="inline-flex items-center gap-2 border border-accent-yellow/30 bg-accent-yellow/[0.06] rounded-full px-3 py-1.5">
            <span className="material-symbols-outlined !text-[14px] text-accent-yellow" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="font-mono text-[9px] font-bold text-accent-yellow uppercase tracking-wider">
              Handpicked. Verified. Updated weekly.
            </span>
          </div>

          <h2 className="font-heading font-black text-black dark:text-white uppercase tracking-[-0.02em] leading-[0.95] text-[42px] sm:text-5xl mt-1">
            <span className="block">Claim the deals</span>
            <span className="block mt-1">Founders</span>
            <span className="block mt-1">
              <span className="bg-accent-yellow text-black px-2 py-0.5 inline-block box-decoration-clone">
                Love most.
              </span>
            </span>
          </h2>

          <div className="flex items-center justify-between w-full mt-2">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined !text-[16px] text-accent-yellow" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="font-sans text-[11px] text-gray-500 dark:text-gray-400">Handpicked. Verified. Updated weekly.</span>
            </div>
            <Link href="/deals" className="flex-shrink-0 font-mono text-[10px] font-bold text-accent-yellow uppercase tracking-wider flex items-center gap-1">
              View all deals <span className="material-symbols-outlined !text-[14px]">arrow_forward</span>
            </Link>
          </div>
        </Reveal>

        {/* ─── Desktop Header ─── */}
        <Reveal className="hidden lg:flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8 md:mb-10">
          {/* Left: badge + headline */}
          <div>
            <span className="inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono text-[10px] md:text-[11px] font-black uppercase tracking-[0.08em] px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_#000]">
              <span className="material-symbols-outlined !text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              Handpicked. Verified. Updated weekly.
            </span>

            <h2 className="font-heading font-black text-black dark:text-white uppercase tracking-[-0.02em] leading-[0.95] text-4xl md:text-5xl lg:text-[52px] mt-4">
              <span className="block">Claim the deals</span>
              <span className="block mt-2">
                Founders{' '}
                <span className="relative inline-block text-black">
                  <span className="relative z-10 inline-block bg-accent-yellow border-2 border-black px-2 py-0.5">
                    Love most.
                  </span>
                  <span aria-hidden="true" className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-black -z-0" />
                </span>
              </span>
            </h2>
          </div>

          {/* Right: trust line + dotted connector + view all */}
          <div className="flex items-center gap-3 lg:pt-3 w-full lg:w-auto lg:max-w-[520px]">
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <span
                className="material-symbols-outlined !text-[18px] text-accent-yellow"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span className="font-sans text-[13px] text-gray-700 dark:text-gray-300 hidden sm:inline">
                Handpicked. Verified. Updated weekly.
              </span>
            </span>
            <span aria-hidden="true" className="flex-1 border-b-2 border-dotted border-gray-400 dark:border-white/20 min-w-[24px]" />
            <Link
              href="/deals"
              className="flex-shrink-0 bg-white dark:bg-white/[0.04] text-black dark:text-white border-2 border-black dark:border-white/10 shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.05)] hover:shadow-[1px_1px_0px_#000] dark:hover:shadow-[1px_1px_0px_rgba(255,255,255,0.05)] hover:translate-x-0.5 hover:translate-y-0.5 px-4 py-2.5 font-mono font-black text-[11px] uppercase tracking-[0.1em] flex items-center gap-2 transition-all"
            >
              View all deals
              <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </Reveal>

        {/* ─── Deal Grid (Desktop) ─── */}
        <RevealStagger className="hidden lg:grid grid-cols-6 gap-4">
          {popularDeals.map((deal) => (
            <RevealItem key={deal.name}>
              <DealCard deal={deal} />
            </RevealItem>
          ))}
        </RevealStagger>

        {/* ─── Deal Carousel (Mobile/Tablet) ─── */}
        <div className="block lg:hidden">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {pages.map((pageDeals, pageIndex) => (
              <div 
                key={`popular-page-${pageDeals[0]?.name || pageIndex}`}
                className="min-w-full w-full flex-shrink-0 grid grid-cols-2 sm:grid-cols-3 gap-3 snap-center"
              >
                {pageDeals.map((deal) => (
                  <DealCard key={deal.name} deal={deal} />
                ))}
              </div>
            ))}
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-2.5 mt-2">
            {pages.map((_, i) => (
              <button type="button"
                key={`page-dot-${i}`}
                onClick={() => scrollToPage(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`w-1.5 h-1.5 !min-h-0 !min-w-0 rounded-full transition-all ${
                  activeIndex === i ? 'bg-[#FFD500] scale-125' : 'bg-[#1a1a1a] dark:bg-gray-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ─── Desktop Bottom CTA with burst marks ─── */}
        <div className="hidden lg:flex items-center justify-center gap-3 md:gap-5 mt-10 md:mt-12">
          <BurstMark />
          <Link
            href="/deals"
            className="group bg-accent-yellow text-black border-2 border-black shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] px-8 md:px-12 py-3.5 md:py-4 font-mono font-black text-sm md:text-base uppercase tracking-[0.18em] flex items-center gap-3 transition-all"
          >
            Explore all deals
            <span className="material-symbols-outlined !text-[20px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
          <BurstMark flip />
        </div>

        {/* ─── Mobile Bottom Feature Box ─── */}
        <div className="block lg:hidden mt-8 border border-white/10 rounded-xl p-4 bg-[#0a0a0a]">
          <div className="flex justify-between items-start mb-5 gap-2">
            <div className="flex flex-col items-center flex-1 text-center border-r border-white/10 pr-2">
              <span className="material-symbols-outlined text-[#FFD500] !text-[22px] mb-1.5" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
              <span className="font-mono text-[9px] font-bold text-white uppercase leading-tight">Verified Deals</span>
              <span className="text-[8px] text-gray-400 mt-1 leading-tight">Every deal is tested and founder-approved.</span>
            </div>
            <div className="flex flex-col items-center flex-1 text-center border-r border-white/10 px-2">
              <span className="material-symbols-outlined text-accent-yellow !text-[22px] mb-1.5" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              <span className="font-mono text-[9px] font-bold text-white uppercase leading-tight">Instant Access</span>
              <span className="text-[8px] text-gray-400 mt-1 leading-tight">Claim in under 3 minutes. Get back to building.</span>
            </div>
            <div className="flex flex-col items-center flex-1 text-center pl-2">
              <span className="material-symbols-outlined text-purple-400 !text-[22px] mb-1.5" style={{ fontVariationSettings: "'FILL' 1" }}>sell</span>
              <span className="font-mono text-[9px] font-bold text-white uppercase leading-tight">New Deals Weekly</span>
              <span className="text-[8px] text-gray-400 mt-1 leading-tight">Fresh deals, every week. Never miss out.</span>
            </div>
          </div>
          
          <Link
            href="/deals"
            className="w-full bg-[#000000] border border-[#FFD500] text-[#FFD500] hover:bg-[#FFD500] hover:text-black py-3.5 flex items-center justify-center gap-2 font-mono font-bold text-[11px] uppercase tracking-[0.15em] transition-all rounded-lg"
          >
            <span className="material-symbols-outlined !text-[16px]">bolt</span>
            Access all deals
            <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
