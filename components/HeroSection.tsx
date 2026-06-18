'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import CountUp from 'react-countup'
import { GlowingEffect } from '@/components/ui/GlowingEffect'
import BrandLogo from '@/components/ui/BrandLogo'

/* ─── Trusted-by logos (bottom proof bar) ─── */
const TRUSTED_BRANDS = [
  { name: 'AWS', domain: 'aws.amazon.com' },
  { name: 'Google Cloud', domain: 'cloud.google.com' },
  { name: 'HubSpot', domain: 'hubspot.com' },
  { name: 'OpenAI', domain: 'openai.com' },
  { name: 'DigitalOcean', domain: 'digitalocean.com' },
]

/* ─── Stat grid inside the dark "total saved" card (2 × 3) ─── */
const STAT_CARDS = [
  { value: '$200K+', label: 'Cloud Credits', icon: 'cloud', href: '/deals?category=cloud-credits' },
  { value: '$100K+', label: 'Grants Database', icon: 'redeem', href: '/deals/grants' },
  { value: '$50K+', label: 'Ad Credits', icon: 'ad', href: '/deals?category=ad-credits' },
  { value: '200+', label: 'SaaS Deals', icon: 'apps', href: '/deals?category=saas-discounts' },
  { value: '50+', label: 'Accelerators', icon: 'rocket_launch', href: '/deals/accelerators' },
  { value: '1K+', label: 'Verified Startups', icon: 'verified_user', href: '/startups' },
]

/* ─── Trust line (risk reversal) ─── */
const TRUST_POINTS = ['Founder-vetted weekly', 'Apply in under 3 min', 'Zero equity. Ever.']

/* Chamfered-corner clip paths (brutalist notch detail) */
const CARD_CLIP = 'polygon(30px 0, 100% 0, 100% 100%, 0 100%, 0 30px)'
const TILE_CLIP = 'polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)'

/* Small blueprint-style crosshair "+" mark */
function PlusMark({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none text-gray-300 ${className}`}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 0v16M0 8h16" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </span>
  )
}

/* Single stat tile inside the dark card — bordered chamfered corner,
   green icon, "UP TO" eyebrow, value, label, and twin corner arrows. */
function StatTile({ stat }: { stat: (typeof STAT_CARDS)[number] }) {
  return (
    <Link href={stat.href} className="group relative block">
      {/* Border layer (light edge, follows the chamfer) */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-white/30 group-hover:bg-accent-yellow/70 transition-colors"
        style={{ clipPath: TILE_CLIP }}
      />
      {/* Fill layer (black, inset 1.5px so the border peeks through) */}
      <span
        aria-hidden="true"
        className="absolute inset-[1.5px] bg-black group-hover:bg-[#0c0c0c] transition-colors"
        style={{ clipPath: TILE_CLIP }}
      />

      {/* Content */}
      <div className="relative z-10 p-3.5 md:p-4 pb-6">
        {/* Top-right outward arrow */}
        <span className="material-symbols-outlined absolute top-3 right-3 !text-[16px] text-gray-300 group-hover:text-accent-yellow group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
          arrow_outward
        </span>

        <span className="material-symbols-outlined !text-[26px] text-green-400 mb-3 block">
          {stat.icon}
        </span>

        <p className="font-mono text-[7px] md:text-[8px] font-bold uppercase tracking-[0.2em] text-green-400/80 mb-1">
          Up to
        </p>
        <p className="font-mono font-black text-xl md:text-2xl text-white leading-none">{stat.value}</p>
        <p className="font-mono text-[8px] md:text-[9px] text-gray-400 uppercase tracking-wider mt-2 leading-tight">
          {stat.label}
        </p>
      </div>

      {/* Small arrow seated in the chamfered bottom-right notch */}
      <span className="material-symbols-outlined absolute bottom-1 right-1 z-10 !text-[13px] text-gray-400 group-hover:text-accent-yellow rotate-90 transition-colors">
        arrow_outward
      </span>
    </Link>
  )
}

export default function HeroSection() {
  /* Live "total saved by founders" counter — single hero metric */
  const [savedEnd, setSavedEnd] = useState(3_055_362)
  const savedStartRef = useRef(3_055_362)

  useEffect(() => {
    const interval = setInterval(() => {
      const increase = Math.floor(Math.random() * 480) + 120
      setSavedEnd((prev) => {
        savedStartRef.current = prev
        return prev + increase
      })
    }, 4200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden grid-bg bg-paper pt-8 md:pt-12 pb-0">
      {/* Soft glow accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-accent-yellow/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-32 w-[28rem] h-[28rem] bg-accent-yellow/10 rounded-full blur-3xl pointer-events-none" />

      {/* ─── Blueprint detailing: left-edge ruler ticks ─── */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute left-3 top-24 bottom-24 w-3 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, #00000033 0px, #00000033 1px, transparent 1px, transparent 14px)',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Vertical edge label */}
        <span
          className="hidden xl:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 font-mono text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          FP-2026
        </span>

        {/* Crosshair "+" marks (blueprint flourish) */}
        <PlusMark className="hidden md:block absolute -left-1 top-2" />
        <PlusMark className="hidden md:block absolute right-0 -top-1 lg:left-[58%] lg:right-auto" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ─── LEFT: Message + CTAs ─── */}
          <div className="lg:col-span-7 flex flex-col items-start">

            {/* Eyebrow row with corner-bracket flourishes */}
            <div className="relative w-full mb-5 md:mb-7">
              <span aria-hidden="true" className="absolute -top-4 -left-4 w-6 h-6 border-t-2 border-l-2 border-black" />
              <span aria-hidden="true" className="absolute -top-4 right-0 w-6 h-6 border-t-2 border-r-2 border-black hidden sm:block" />
              <div className="inline-flex items-center gap-2.5 font-mono text-[10px] md:text-xs font-black uppercase tracking-[0.18em]">
                <span className="inline-flex items-center gap-1.5 text-black">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Live
                </span>
                <span className="text-gray-400">Updated Weekly</span>
              </div>
            </div>

            {/* Headline — BUILD MORE. / BURN LESS. */}
            <h1 className="font-heading font-black text-black tracking-[-0.02em] uppercase leading-[0.9] mb-5 md:mb-6">
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[92px]">Build More.</span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[92px]">
                Burn{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">Less.</span>
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 bottom-1 md:bottom-2 h-3 md:h-5 bg-accent-yellow -z-0"
                  />
                </span>
              </span>
            </h1>

            {/* Sub-headline — offer line */}
            <p className="font-heading font-extrabold uppercase text-black text-lg sm:text-xl md:text-[26px] tracking-tight leading-[1.15] mb-4 md:mb-5 max-w-xl">
              Unlock up to{' '}
              <span className="bg-accent-yellow px-1.5 py-0.5 box-decoration-clone">$500K+</span>{' '}
              in startup credits &amp; founder perks.
            </p>

            {/* Supporting paragraph */}
            <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed mb-6 md:mb-8 max-w-md">
              Money shouldn&apos;t be the barrier. Access founder-vetted credits, grants, and perks &mdash;{' '}
              <span className="bg-accent-yellow/60 font-bold text-black px-1">zero dilution.</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6 md:mb-8 w-full max-w-lg">
              <div className="relative flex-1">
                <GlowingEffect spread={50} glow disabled={false} proximity={80} inactiveZone={0.01} borderWidth={2} />
                <Link
                  href="/pricing"
                  className="bg-accent-yellow text-black text-sm md:text-base font-black py-3.5 md:py-4 px-5 md:px-6 flex items-center justify-center gap-2 transition-all hover:bg-black hover:text-accent-yellow shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] w-full font-mono uppercase tracking-wider border-2 border-black"
                >
                  <span className="material-symbols-outlined !text-[18px]">bolt</span>
                  Unlock Founder Perks
                </Link>
              </div>
              <Link
                href="/pricing"
                className="flex items-center justify-center gap-2 border-2 border-black bg-white text-black font-mono font-black text-sm md:text-base py-3.5 md:py-4 px-5 md:px-6 hover:bg-black hover:text-white transition-all uppercase tracking-wider whitespace-nowrap shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px]"
              >
                See Pricing
                <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
              </Link>
            </div>

            {/* Trust line */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {TRUST_POINTS.map((text) => (
                <span key={text} className="inline-flex items-center gap-1.5 text-xs md:text-[13px] font-mono font-bold text-gray-600">
                  <span
                    className="material-symbols-outlined !text-[16px] text-green-600 flex-shrink-0"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* ─── RIGHT: Dark "total saved" card ─── */}
          <div className="lg:col-span-5 relative">
            {/* Double stacked yellow offset blocks (brutalist depth) */}
            <div aria-hidden="true" className="absolute inset-0 translate-x-6 translate-y-6 bg-accent-yellow/80 pointer-events-none hidden md:block" />
            <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 bg-accent-yellow pointer-events-none hidden md:block" />

            <div
              className="relative z-10 bg-black p-6 md:p-7"
              style={{ clipPath: CARD_CLIP }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs md:text-sm font-black uppercase tracking-[0.18em] text-white">
                  Total Saved By Founders
                </span>
                <span className="inline-flex items-center gap-2 font-mono text-xs md:text-sm font-black uppercase tracking-[0.16em] text-white">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Live
                </span>
              </div>

              {/* Live counter */}
              <p className="font-mono font-black text-[44px] md:text-[58px] text-accent-yellow tabular-nums leading-none mb-2.5">
                $
                <CountUp start={savedStartRef.current} end={savedEnd} duration={1.4} separator="," />
              </p>
              <p className="font-mono text-[11px] md:text-[13px] text-gray-300 flex items-center gap-1.5">
                <span
                  className="material-symbols-outlined !text-[15px] text-green-400"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  trending_up
                </span>
                Across cloud credits, grants &amp; SaaS deals
              </p>

              {/* Divider */}
              <div className="h-px bg-white/15 my-5" />

              {/* Stat grid 2×3 */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {STAT_CARDS.map((s) => (
                  <StatTile key={s.label} stat={s} />
                ))}
              </div>

              {/* Catalog CTA */}
              <Link
                href="/deals"
                className="group relative overflow-hidden bg-accent-yellow text-black px-5 py-3.5 font-mono font-black text-sm md:text-base uppercase tracking-[0.12em] hover:bg-white transition-colors flex items-center gap-3"
              >
                Browse The Full Catalog
                <span className="material-symbols-outlined !text-[20px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
                {/* Diagonal hatch corner (twin slashes) */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 right-0 w-14 h-full pointer-events-none"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(-45deg, #000 0px, #000 2px, transparent 2px, transparent 9px)',
                    clipPath: 'polygon(100% 0, 100% 100%, 30% 100%)',
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Trusted-by bar ─── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-14 mb-8 md:mb-12 relative z-10">
        <div className="border-2 border-black bg-white px-5 md:px-8 py-4 md:py-5 shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
          <span className="font-mono text-[10px] md:text-xs font-black uppercase tracking-[0.16em] text-gray-500 flex items-center gap-2 flex-shrink-0">
            Trusted by founders using
            <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 flex-1">
            {TRUSTED_BRANDS.map((b) => (
              <div key={b.name} className="flex items-center gap-2 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                <BrandLogo name={b.name} domain={b.domain} size="sm" eager />
                <span className="font-mono text-xs md:text-sm font-bold text-gray-700 whitespace-nowrap hidden sm:inline">
                  {b.name}
                </span>
              </div>
            ))}
            <span className="font-mono text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
              And 100+ More
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
