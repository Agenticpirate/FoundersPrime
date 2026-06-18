'use client'

import Link from 'next/link'
import { useState, Fragment } from 'react'
import { popularDeals, PopularDeal } from '@/data/popular-deals'

/** Logo with a resilient fallback chain: explicit logo → favicon → initials. */
function DealLogo({ deal }: { deal: PopularDeal }) {
  const chain = [
    ...(deal.logo ? [deal.logo] : []),
    ...(deal.domain
      ? [
          `https://www.google.com/s2/favicons?domain=${deal.domain}&sz=128`,
          `https://icons.duckduckgo.com/ip3/${deal.domain}.ico`,
        ]
      : []),
  ]

  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState(chain.length === 0)

  if (failed) {
    return (
      <span className="w-7 h-7 flex items-center justify-center bg-gray-100 border border-gray-300 font-mono font-black text-[10px] text-gray-700">
        {deal.name.slice(0, 2).toUpperCase()}
      </span>
    )
  }

  return (
    <img
      src={chain[index]}
      alt={`${deal.name} logo`}
      width={28}
      height={28}
      loading="lazy"
      decoding="async"
      className="w-7 h-7 object-contain flex-shrink-0"
      onError={() => (index + 1 < chain.length ? setIndex(index + 1) : setFailed(true))}
    />
  )
}

/* Highlights the monetary / numeric token inside a deal value (green, bold),
   matching the screenshot where the savings figure pops in green. */
const VALUE_TOKEN_SPLIT = /(\$[\d.,]+\+?%?[KMB]?\+?|€[\d.,]+\+?[KMB]?\+?|\d+%|\d+\s?months?|free)/gi
const VALUE_TOKEN_TEST = /^(\$[\d.,]+\+?%?[KMB]?\+?|€[\d.,]+\+?[KMB]?\+?|\d+%|\d+\s?months?|free)$/i

function highlightValue(value: string) {
  const parts = value.split(VALUE_TOKEN_SPLIT)
  return parts.map((part, i) =>
    VALUE_TOKEN_TEST.test(part) ? (
      <span key={i} className="text-green-600 font-bold">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
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
      className={flip ? '-scale-x-100' : ''}
    >
      <g stroke="#111" strokeWidth="2.5" strokeLinecap="round">
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
    <div className="group relative flex flex-col bg-white border-2 border-black p-4 pt-5 shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200">
      {/* Folded yellow corner with external-link icon */}
      <span
        aria-hidden="true"
        className="absolute top-0 right-0 w-9 h-9 bg-accent-yellow"
        style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
      />
      <span className="material-symbols-outlined absolute top-1 right-1 !text-[14px] text-black z-10">
        open_in_new
      </span>

      {/* Logo + brand name (wordmark approximation) */}
      <div className="h-9 flex items-center justify-center gap-2 mb-4 mt-1">
        <DealLogo deal={deal} />
        <span className="font-sans font-bold text-[15px] text-black leading-none truncate max-w-[70%]">
          {deal.name}
        </span>
      </div>

      {/* Deal value + description */}
      <div className="text-left mb-4 min-h-[2.75rem]">
        <p className="font-sans text-[13px] font-semibold text-black leading-snug">
          {highlightValue(deal.value)}
        </p>
        <p className="font-sans text-[12px] text-gray-500 leading-snug mt-0.5 line-clamp-1">
          {deal.description}
        </p>
      </div>

      {/* CTA */}
      <Link
        href="/pricing"
        className="group/cta mt-auto w-full inline-flex items-center justify-center gap-1.5 bg-black text-white border-2 border-black group-hover:bg-accent-yellow group-hover:text-black hover:bg-accent-yellow hover:text-black font-mono font-black text-[10px] uppercase tracking-[0.12em] py-2.5 transition-all duration-200"
        aria-label={`Get the ${deal.name} deal`}
      >
        Get this deal
        <span className="material-symbols-outlined !text-[14px] transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover:translate-x-0.5">
          arrow_forward
        </span>
      </Link>
    </div>
  )
}

export default function PopularDealsGrid() {
  return (
    <section className="relative py-12 md:py-16 bg-paper border-b-2 border-black overflow-hidden grid-bg">
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Header ─── */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8 md:mb-10">
          {/* Left: badge + headline */}
          <div>
            <span className="inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono text-[10px] md:text-[11px] font-black uppercase tracking-[0.08em] px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_#000]">
              <span className="material-symbols-outlined !text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              Handpicked. Verified. Updated weekly.
            </span>

            <h2 className="font-heading font-black text-black uppercase tracking-[-0.02em] leading-[0.95] text-4xl md:text-5xl lg:text-[52px] mt-4">
              <span className="block">Claim the deals</span>
              <span className="block mt-2">
                Founders{' '}
                <span className="relative inline-block">
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
                className="material-symbols-outlined !text-[18px] text-green-500"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span className="font-sans text-[13px] text-gray-700 hidden sm:inline">
                Handpicked. Verified. Updated weekly.
              </span>
            </span>
            <span aria-hidden="true" className="flex-1 border-b-2 border-dotted border-gray-400 min-w-[24px]" />
            <Link
              href="/deals"
              className="flex-shrink-0 bg-white text-black border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 px-4 py-2.5 font-mono font-black text-[11px] uppercase tracking-[0.1em] flex items-center gap-2 transition-all"
            >
              View all deals
              <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* ─── Deal grid ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {popularDeals.map((deal, i) => (
            <DealCard key={`${deal.name}-${i}`} deal={deal} />
          ))}
        </div>

        {/* ─── Bottom CTA with burst marks ─── */}
        <div className="flex items-center justify-center gap-3 md:gap-5 mt-10 md:mt-12">
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
      </div>
    </section>
  )
}
