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
  { name: 'Stripe', domain: 'stripe.com' },
  { name: 'Notion', domain: 'notion.so' },
  { name: 'OpenAI', domain: 'openai.com' },
  { name: 'Vercel', domain: 'vercel.com' },
  { name: 'Supabase', domain: 'supabase.com' },
  { name: 'Figma', domain: 'figma.com' },
  { name: 'Slack', domain: 'slack.com' },
  { name: 'Linear', domain: 'linear.app' },
  { name: 'Framer', domain: 'framer.com' },
  { name: 'Webflow', domain: 'webflow.com' },
  { name: 'Airtable', domain: 'airtable.com' },
  { name: 'HubSpot', domain: 'hubspot.com' },
  { name: 'Intercom', domain: 'intercom.com' },
  { name: 'Datadog', domain: 'datadoghq.com' },
  { name: 'Sentry', domain: 'sentry.io' },
  { name: 'Mixpanel', domain: 'mixpanel.com' },
  { name: 'Twilio', domain: 'twilio.com' },
  { name: 'DigitalOcean', domain: 'digitalocean.com' },
  { name: 'Discord', domain: 'discord.com' },
  { name: 'Canva', domain: 'canva.com' },
  { name: 'Adobe', domain: 'adobe.com' },
  { name: 'Salesforce', domain: 'salesforce.com' },
  { name: 'Brex', domain: 'brex.com' },
  { name: 'Ramp', domain: 'ramp.com' },
]

/* ─── Stat grid inside the dark "total saved" card (2 × 3) ─── */
const STAT_CARDS = [
  { value: '$200K+', label: 'Cloud Credits', icon: 'cloud', href: '/deals?category=cloud-credits' },
  { value: '$100K+', label: 'Grants Database', icon: 'redeem', href: '/programs?type=grants' },
  { value: '$50K', label: 'Ad Credits', icon: 'ad', href: '/deals?category=ad-credits' },
  { value: '200+', label: 'SaaS Deals', icon: 'apps', href: '/deals?category=saas-discounts' },
  { value: '50+', label: 'Accelerators', icon: 'rocket_launch', href: '/programs?type=accelerators' },
  { value: '1K+', label: 'Verified Startups', icon: 'verified_user', href: '/startups' },
]

/* ─── Deal counts (hero stats strip) ─── */
const DEAL_STATS = [
  { value: '300+', label: 'Founders Deals', icon: 'local_offer', href: '/deals' },
  { value: '259+', label: 'Programs (Accelerators/Incubators/Grants)', icon: 'rocket_launch', href: '/programs' },
  { value: '918+', label: 'Student Benefits', icon: 'school', href: '/student-benefits' },
]

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
    <section className="relative overflow-hidden grid-bg bg-[#f6f8f8] dark:bg-[#000000] text-[#1a1a1a] dark:text-white pt-8 md:pt-12 pb-0 transition-colors duration-300">
      {/* Soft glow accents */}
      <div className="hidden lg:block absolute -top-32 -left-32 w-96 h-96 bg-accent-yellow/15 dark:bg-accent-yellow/5 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden lg:block absolute -bottom-40 -right-32 w-[28rem] h-[28rem] bg-accent-yellow/10 dark:bg-accent-yellow/5 rounded-full blur-3xl pointer-events-none" />

      {/* ─── Blueprint detailing: left-edge ruler ticks ─── */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute left-3 top-24 bottom-24 w-3 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, var(--ruler-color) 0px, var(--ruler-color) 1px, transparent 1px, transparent 14px)',
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

        {/* ─── Mobile Hero Section ─── */}
        <div className="block lg:hidden pt-6 pb-6 bg-[#f6f8f8] dark:bg-[#000000] text-[#1a1a1a] dark:text-white -mx-4 px-4 relative z-10 grid-bg">
          {/* Top badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-250 dark:border-white/10 rounded-full bg-white/60 dark:bg-white/[0.03] w-fit mb-5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="font-sans text-[9px] font-black uppercase tracking-[0.18em] text-[#1a1a1a] dark:text-white">LIVE</span>
            <span className="font-sans text-[9px] font-bold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">FOUNDER-APPROVED</span>
          </div>
 
          {/* Hero Content */}
          <div className="flex flex-col justify-start mb-6">
            <h1 className="font-heading font-black text-[#1a1a1a] dark:text-white tracking-[-0.02em] uppercase leading-[0.9]">
              <span className="block text-[44px] sm:text-5xl">Build More</span>
              <span className="block text-[44px] sm:text-5xl mt-2">
                Burn{' '}
                <span className="relative inline-block text-black">
                  <span className="relative z-10 bg-[#FFD500] px-2.5 py-0.5 leading-none select-none inline-block font-heading font-black">
                    Less
                  </span>
                </span>
              </span>
            </h1>
 
            {/* Sub-headline / Tagline */}
            <p className="font-sans font-medium text-gray-700 dark:text-gray-100 text-[14px] sm:text-base tracking-tight leading-relaxed mt-5 mb-4">
              Unlock up to{' '}
              <span className="text-[#FFD500] dark:text-accent-yellow font-black">$500K</span>{' '}
              in verified startup credits, grants, tools, and founder perks.
            </p>
          </div>
 
 
          {/* 4-column key metrics row */}
          <div className="flex justify-between items-center border border-gray-250 dark:border-white/10 bg-white/80 dark:bg-[#0a0a0a]/60 shadow-sm dark:shadow-none rounded-2xl p-3 mb-6">
            <div className="flex-1 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-green-500 dark:text-green-400 !text-base mb-0.5" style={{ fontVariationSettings: "'FILL' 0" }}>cloud</span>
              <span className="text-[11px] font-sans font-black text-green-500 dark:text-green-400 leading-none">$500K</span>
              <span className="text-[7.5px] font-sans text-gray-500 dark:text-gray-400 uppercase tracking-tight mt-0.5 font-semibold">In Credits</span>
            </div>
            <div className="w-px h-6 bg-gray-200 dark:bg-white/10" />
            <div className="flex-1 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-green-500 dark:text-green-400 !text-base mb-0.5" style={{ fontVariationSettings: "'FILL' 0" }}>verified_user</span>
              <span className="text-[11px] font-sans font-black text-green-500 dark:text-green-400 leading-none">Verified</span>
              <span className="text-[7.5px] font-sans text-gray-500 dark:text-gray-400 uppercase tracking-tight mt-0.5 font-semibold">Deals & Grants</span>
            </div>
            <div className="w-px h-6 bg-gray-200 dark:bg-white/10" />
            <div className="flex-1 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 !text-base mb-0.5" style={{ fontVariationSettings: "'FILL' 0" }}>workspace_premium</span>
              <span className="text-[11px] font-sans font-black text-purple-600 dark:text-purple-400 leading-none">Founder</span>
              <span className="text-[7.5px] font-sans text-gray-500 dark:text-gray-400 uppercase tracking-tight mt-0.5 font-semibold">Vetted Only</span>
            </div>
            <div className="w-px h-6 bg-gray-200 dark:bg-white/10" />
            <div className="flex-1 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-sky-600 dark:text-sky-400 !text-base mb-0.5" style={{ fontVariationSettings: "'FILL' 0" }}>bolt</span>
              <span className="text-[11px] font-sans font-black text-sky-600 dark:text-sky-400 leading-none">Save $50K</span>
              <span className="text-[7.5px] font-sans text-gray-500 dark:text-gray-400 uppercase tracking-tight mt-0.5 font-semibold">In 3 Months</span>
            </div>
          </div>
 
          {/* CTA Buttons */}
          <div className="flex flex-col gap-2.5 mb-4">
            <Link
              href="/pricing"
              className="hero-cta-primary relative overflow-hidden bg-[#FFD500] hover:bg-[#FFE033] text-black text-xs font-black py-3.5 px-5 flex items-center justify-center gap-1.5 transition-all w-full font-mono uppercase tracking-wider rounded-xl border border-black shadow-sm"
            >
              <span className="material-symbols-outlined !text-[16px]">bolt</span>
              Unlock Founder Perks
              <span className="material-symbols-outlined !text-[16px] hero-arrow-bounce">arrow_forward</span>
            </Link>
            <Link
              href="/pricing"
              className="flex items-center justify-center gap-1.5 border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0c0c0c] hover:bg-gray-50 dark:hover:bg-white/5 text-gray-800 dark:text-white font-mono font-black text-xs py-3.5 px-5 transition-all uppercase tracking-wider w-full rounded-xl shadow-sm"
            >
              See Pricing
              <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
            </Link>
          </div>

          {/* Deal counts strip — mobile */}
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            {DEAL_STATS.map((stat) => (
              <Link
                key={stat.label}
                href={stat.href}
                className="group inline-flex items-center gap-1 px-2.5 py-1 border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] hover:border-accent-yellow hover:bg-accent-yellow/10 rounded-full transition-all duration-200"
              >
                <span
                  className="material-symbols-outlined !text-[11px] text-green-600 dark:text-green-400"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {stat.icon}
                </span>
                <span className="font-mono font-black text-[10px] text-black dark:text-white tabular-nums">
                  {stat.value}
                </span>
                <span className="font-mono text-[9px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {stat.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="w-full overflow-hidden my-4 relative py-2 bg-gray-500/[0.03] dark:bg-white/[0.01] border-y border-gray-200 dark:border-white/[0.04] -mx-4 px-4">
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#f6f8f8] dark:from-[#000000] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#f6f8f8] dark:from-[#000000] to-transparent z-10 pointer-events-none" />
            <div className="flex gap-8 animate-[marquee_60s_linear_infinite] whitespace-nowrap w-max">
              {[...TRUSTED_BRANDS, ...TRUSTED_BRANDS, ...TRUSTED_BRANDS].map((brand, idx) => (
                <div key={`${brand.name}-${idx}`} className="inline-flex items-center gap-1.5 opacity-90 transition-all hover:opacity-100">
                  <BrandLogo name={brand.name} domain={brand.domain} size="sm" eager />
                  <span className="font-mono text-[8px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{brand.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-12 gap-12 items-center">

          {/* ─── LEFT: Message + CTAs ─── */}
          <div className="lg:col-span-7 flex flex-col items-start">

            {/* Eyebrow row with corner-bracket flourishes */}
            <div className="relative w-full mb-5 md:mb-7">
              <span aria-hidden="true" className="absolute -top-4 -left-4 w-6 h-6 border-t-2 border-l-2 border-black dark:border-white/20" />
              <span aria-hidden="true" className="absolute -top-4 right-0 w-6 h-6 border-t-2 border-r-2 border-black dark:border-white/20 hidden sm:block" />
              <div className="inline-flex items-center gap-2.5 font-mono text-[10px] md:text-xs font-black uppercase tracking-[0.18em]">
                <span className="inline-flex items-center gap-1.5 text-black dark:text-white">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Live
                </span>
                <span className="text-gray-400">Founder-Approved</span>
              </div>
            </div>

            {/* Headline — BUILD MORE / BURN LESS */}
            <h1 className="font-heading font-black text-black dark:text-white tracking-[-0.02em] uppercase leading-[0.9] mb-5 md:mb-6">
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[92px]">Build More</span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[92px] mt-2 sm:mt-3">
                Burn{' '}
                <span className="relative inline-block text-black dark:text-black">
                  <span className="relative z-10 bg-accent-yellow border-2 border-black px-3.5 py-0.5 sm:py-1 leading-none select-none inline-block">
                    Less
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 translate-x-2 translate-y-2 bg-black dark:bg-white/10 -z-10"
                  />
                </span>
              </span>
            </h1>

            {/* Sub-headline — offer line */}
            <p className="font-heading font-extrabold uppercase text-black dark:text-white text-lg sm:text-xl md:text-[26px] tracking-tight leading-[1.15] mb-4 md:mb-5 max-w-xl">
              Unlock up to{' '}
              <span className="bg-accent-yellow px-1.5 py-0.5 box-decoration-clone text-black">$500K</span>{' '}
              in startup credits &amp; founder perks.
            </p>

            {/* Supporting paragraph */}
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium leading-relaxed mb-6 md:mb-8 max-w-md">
              Money shouldn&apos;t be the barrier. Access founder-vetted credits, grants, and perks &mdash;{' '}
              <span className="bg-accent-yellow text-black font-bold px-1.5 py-0.5 rounded-[2px] box-decoration-clone hero-highlight-glow">zero dilution.</span>
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
                className="flex items-center justify-center gap-2 border-2 border-black dark:border-white/10 bg-white dark:bg-white/[0.04] text-black dark:text-white font-mono font-black text-sm md:text-base py-3.5 md:py-4 px-5 md:px-6 hover:bg-black hover:text-white dark:hover:text-black dark:hover:bg-white transition-all uppercase tracking-wider whitespace-nowrap shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.05)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.05)] hover:translate-x-[3px] hover:translate-y-[3px]"
              >
                See Pricing
                <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
              </Link>
            </div>

            {/* Deal counts strip */}
            <div className="flex flex-wrap items-center gap-2">
              {DEAL_STATS.map((stat) => (
                <Link
                  key={stat.label}
                  href={stat.href}
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] hover:border-accent-yellow hover:bg-accent-yellow/10 dark:hover:border-accent-yellow dark:hover:bg-accent-yellow/10 rounded-full transition-all duration-200"
                >
                  <span
                    className="material-symbols-outlined !text-[13px] text-green-600 dark:text-green-400 group-hover:text-black dark:group-hover:text-accent-yellow transition-colors"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {stat.icon}
                  </span>
                  <span className="font-mono font-black text-[11px] text-black dark:text-white group-hover:text-black dark:group-hover:text-white tabular-nums">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {stat.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* ─── RIGHT: Dark "total saved" card ─── */}
          <div className="lg:col-span-5 relative">
            {/* Double stacked yellow offset blocks (brutalist depth) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-6 translate-y-6 bg-accent-yellow/80 dark:bg-accent-yellow/30 pointer-events-none hidden md:block"
              style={{ clipPath: CARD_CLIP }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-[1.5px] translate-x-6 translate-y-6 bg-transparent dark:bg-[#000000] pointer-events-none hidden md:block"
              style={{ clipPath: CARD_CLIP }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 bg-accent-yellow dark:bg-accent-yellow/50 pointer-events-none hidden md:block"
              style={{ clipPath: CARD_CLIP }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-[1.5px] translate-x-3 translate-y-3 bg-transparent dark:bg-[#000000] pointer-events-none hidden md:block"
              style={{ clipPath: CARD_CLIP }}
            />

            <div
              className="relative z-10 bg-black dark:bg-[#0c0c0c] border border-black dark:border-white/10 p-6 md:p-7"
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

      {/* ─── Trusted-by bar (Infinite Marquee Scroller) ─── */}
      <div className="hidden lg:block max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-14 mb-8 md:mb-12 relative z-10">
        <div className="border-2 border-black dark:border-white/10 bg-white dark:bg-white/[0.04] px-5 md:px-8 py-4 md:py-5 shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.05)] flex flex-col lg:flex-row items-center gap-4 lg:gap-8 transition-colors duration-300 overflow-hidden">
          <span className="font-mono text-[10px] md:text-xs font-black uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400 flex items-center gap-2 flex-shrink-0">
            Trusted by founders using
            <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
          </span>
          <div 
            className="relative flex-1 overflow-hidden"
            style={{ 
              maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'
            }}
          >
            <div className="flex gap-12 animate-[marquee_45s_linear_infinite] whitespace-nowrap items-center w-max">
              {[...TRUSTED_BRANDS, ...TRUSTED_BRANDS].map((b, index) => (
                <div key={`${b.name}-${index}`} className="inline-flex items-center gap-2.5 transition-all flex-shrink-0 hover:scale-105">
                  <BrandLogo name={b.name} domain={b.domain} size="md" eager />
                  <span className="font-mono text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {b.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
