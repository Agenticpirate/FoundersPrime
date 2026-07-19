'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import CountUp from 'react-countup'
import { m, useReducedMotion } from 'framer-motion'
import { GlowingEffect } from '@/components/ui/GlowingEffect'
import { FadeUp, SoftFloat } from '@/components/ui/premium-motion'
import { premiumEase } from '@/lib/premium-motion-variants'

/**
 * Trusted-by logos — local files under /public/brand-logos only.
 * Prefer official SVG mark when present (rasterized PNG fallback).
 * Cache-bust query so browsers drop wrong CDN assets (e.g. old Intercom→Fin).
 */
/** Cache-bust after final official logo restore (no green OpenAI, multi-color Figma, etc.) */
/** Cache-bust after logo repairs (wrong GCP/G, Intercom Fin, etc.) */
const LOGO_V = '20260718official'
const TRUSTED_BRANDS: { name: string; domain: string; logo: string }[] = [
  { name: 'AWS', domain: 'aws.amazon.com', logo: `/brand-logos/aws.png?v=${LOGO_V}` },
  // Use cloud mark SVG — googlecloud.png had wrong multicolor "G"
  { name: 'Google Cloud', domain: 'cloud.google.com', logo: `/brand-logos/googlecloud.svg?v=${LOGO_V}` },
  { name: 'Stripe', domain: 'stripe.com', logo: `/brand-logos/stripe.svg?v=${LOGO_V}` },
  { name: 'Notion', domain: 'notion.so', logo: `/brand-logos/notion.png?v=${LOGO_V}` },
  // Official black monochrome bloom — never green
  { name: 'OpenAI', domain: 'openai.com', logo: `/brand-logos/openai.svg?v=${LOGO_V}` },
  { name: 'Vercel', domain: 'vercel.com', logo: `/brand-logos/vercel.svg?v=${LOGO_V}` },
  { name: 'Supabase', domain: 'supabase.com', logo: `/brand-logos/supabase.svg?v=${LOGO_V}` },
  // Multi-color official Figma mark
  { name: 'Figma', domain: 'figma.com', logo: `/brand-logos/figma.svg?v=${LOGO_V}` },
  { name: 'Slack', domain: 'slack.com', logo: `/brand-logos/slack.svg?v=${LOGO_V}` },
  { name: 'Linear', domain: 'linear.app', logo: `/brand-logos/linear.svg?v=${LOGO_V}` },
  { name: 'Framer', domain: 'framer.com', logo: `/brand-logos/framer.svg?v=${LOGO_V}` },
  { name: 'Webflow', domain: 'webflow.com', logo: `/brand-logos/webflow.svg?v=${LOGO_V}` },
  { name: 'Airtable', domain: 'airtable.com', logo: `/brand-logos/airtable.png?v=${LOGO_V}` },
  { name: 'HubSpot', domain: 'hubspot.com', logo: `/brand-logos/hubspot.png?v=${LOGO_V}` },
  // Classic messenger bars (not Fin wordmark)
  { name: 'Intercom', domain: 'intercom.com', logo: `/brand-logos/intercom.svg?v=${LOGO_V}` },
  { name: 'DigitalOcean', domain: 'digitalocean.com', logo: `/brand-logos/digitalocean.svg?v=${LOGO_V}` },
  { name: 'Datadog', domain: 'datadoghq.com', logo: `/brand-logos/datadog.png?v=${LOGO_V}` },
  { name: 'Sentry', domain: 'sentry.io', logo: `/brand-logos/sentry.png?v=${LOGO_V}` },
  { name: 'Mixpanel', domain: 'mixpanel.com', logo: `/brand-logos/mixpanel.png?v=${LOGO_V}` },
  { name: 'Twilio', domain: 'twilio.com', logo: `/brand-logos/twilio.png?v=${LOGO_V}` },
  { name: 'Discord', domain: 'discord.com', logo: `/brand-logos/discord.png?v=${LOGO_V}` },
  { name: 'Canva', domain: 'canva.com', logo: `/brand-logos/canva.png?v=${LOGO_V}` },
  { name: 'Adobe', domain: 'adobe.com', logo: `/brand-logos/adobe.png?v=${LOGO_V}` },
  { name: 'Salesforce', domain: 'salesforce.com', logo: `/brand-logos/salesforce.png?v=${LOGO_V}` },
  { name: 'Brex', domain: 'brex.com', logo: `/brand-logos/brex.png?v=${LOGO_V}` },
  { name: 'GitHub', domain: 'github.com', logo: `/brand-logos/github.svg?v=${LOGO_V}` },
  { name: 'Microsoft', domain: 'microsoft.com', logo: `/brand-logos/microsoft.svg?v=${LOGO_V}` },
  { name: 'Cloudflare', domain: 'cloudflare.com', logo: `/brand-logos/cloudflare.png?v=${LOGO_V}` },
  { name: 'Shopify', domain: 'shopify.com', logo: `/brand-logos/shopify.png?v=${LOGO_V}` },
  { name: 'MongoDB', domain: 'mongodb.com', logo: `/brand-logos/mongodb.png?v=${LOGO_V}` },
]

/** Same-origin logo pill — local file first, Google favicon only if PNG missing */
function TrustedBrandLogo({
  brand,
  size = 24,
}: {
  brand: (typeof TRUSTED_BRANDS)[number]
  size?: number
}) {
  const [src, setSrc] = useState(brand.logo)
  const failedLocalRef = useRef(false)

  return (
    <span
      className="relative flex-shrink-0 rounded-full bg-white border border-black/[0.08] dark:border-white/10 overflow-hidden flex items-center justify-center p-0.5 shadow-sm"
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        className="w-full h-full object-contain"
        loading="eager"
        decoding="async"
        draggable={false}
        onError={() => {
          if (!failedLocalRef.current) {
            failedLocalRef.current = true
            setSrc(`https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`)
          }
        }}
      />
    </span>
  )
}

function TrustedBrandPill({
  brand,
  size = 24,
  textClass = 'text-[8px]',
}: {
  brand: (typeof TRUSTED_BRANDS)[number]
  size?: number
  textClass?: string
}) {
  return (
    <div className="inline-flex items-center gap-2 flex-shrink-0">
      <TrustedBrandLogo brand={brand} size={size} />
      <span
        className={`font-mono font-bold text-gray-600 dark:text-zinc-300 uppercase tracking-wider whitespace-nowrap ${textClass}`}
      >
        {brand.name}
      </span>
    </div>
  )
}

/* ─── Stat grid inside the dark "total saved" card (2 × 3) ─── */
const STAT_CARDS = [
  { value: '$200K+', label: 'Cloud Credits', icon: 'cloud', href: '/deals?category=cloud-credits' },
  { value: '$100K+', label: 'Grants Database', icon: 'redeem', href: '/programs?type=grants' },
  { value: '$50K', label: 'Ad Credits', icon: 'ad', href: '/deals?category=ad-credits' },
  { value: '200+', label: 'SaaS Deals', icon: 'apps', href: '/deals?category=saas-discounts' },
  { value: '50+', label: 'Accelerators', icon: 'rocket_launch', href: '/programs?type=accelerators' },
  { value: '200+', label: 'Startup Ideas', icon: 'lightbulb', href: '/ideas' },
]

/* ─── Deal counts (hero stats strip) ─── */
const DEAL_STATS = [
  { value: '300+', label: 'Founders Deals', icon: 'local_offer', href: '/deals' },
  { value: '259+', label: 'Programs (Accelerators/Incubators/Grants)', icon: 'rocket_launch', href: '/programs' },
  { value: '1000+', label: 'Student Benefits', icon: 'school', href: '/student-benefits' },
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

        <span className="material-symbols-outlined !text-[26px] text-accent-yellow mb-3 block">
          {stat.icon}
        </span>

        <p className="font-mono text-[7px] md:text-[8px] font-bold uppercase tracking-[0.2em] text-accent-yellow/80 mb-1">
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
  const reduce = useReducedMotion()

  useEffect(() => {
    const interval = setInterval(() => {
      const increase = Math.floor(Math.random() * 480) + 120
      setSavedEnd((prev) => {
        // Pure updater only — ref is synced in a separate effect below
        return prev + increase
      })
    }, 4200)
    return () => clearInterval(interval)
  }, [])

  // Keep start ref in sync after commit (not inside setState)
  useEffect(() => {
    savedStartRef.current = savedEnd
  }, [savedEnd])

  return (
    <section className="relative overflow-hidden grid-bg bg-[#f6f8f8] dark:bg-[#000000] text-[#1a1a1a] dark:text-white pt-8 md:pt-12 pb-0 transition-colors duration-300">
      {/* Soft glow accents — slow float for premium depth */}
      <SoftFloat className="hidden lg:block absolute -top-32 -left-32 w-96 h-96 pointer-events-none" duration={10}>
        <div className="w-full h-full bg-accent-yellow/15 dark:bg-accent-yellow/5 rounded-full blur-3xl" />
      </SoftFloat>
      <SoftFloat className="hidden lg:block absolute -bottom-40 -right-32 w-[28rem] h-[28rem] pointer-events-none" duration={12}>
        <div className="w-full h-full bg-accent-yellow/10 dark:bg-accent-yellow/5 rounded-full blur-3xl" />
      </SoftFloat>

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
        <div className="block lg:hidden pt-5 pb-8 bg-[#f6f8f8] dark:bg-[#000000] text-[#1a1a1a] dark:text-white -mx-4 px-4 relative z-10">
          {/* Ambient gold glow (mobile) */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-48 bg-accent-yellow/[0.07] dark:bg-accent-yellow/[0.09] blur-3xl"
          />

          <div className="relative">
            {/* Top badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-black/10 dark:border-white/12 rounded-full bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm w-fit mb-5 shadow-sm dark:shadow-none">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent-yellow opacity-60 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-yellow" />
              </span>
              <span className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-gray-900 dark:text-white">
                Live
              </span>
              <span className="w-px h-3 bg-black/10 dark:bg-white/15" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-gray-500 dark:text-zinc-400">
                Founder-approved
              </span>
            </div>

            {/* Headline — div so crawlers only get one <h1> (desktop) */}
            <div
              role="heading"
              aria-level={1}
              className="font-heading font-black text-gray-900 dark:text-white tracking-[-0.03em] uppercase leading-[0.88]"
            >
              <span className="block text-[clamp(2.35rem,9.5vw,3.25rem)]">Build More</span>
              <span className="block text-[clamp(2.35rem,9.5vw,3.25rem)] mt-1.5">
                Burn{' '}
                <span className="relative inline-block text-black align-baseline">
                  <span className="relative z-10 bg-accent-yellow px-2.5 py-0.5 leading-none select-none inline-block font-heading font-black rounded-sm">
                    Less
                  </span>
                </span>
              </span>
            </div>

            <p className="font-sans font-medium text-gray-600 dark:text-zinc-300 text-[14px] sm:text-[15px] tracking-tight leading-relaxed mt-4 mb-5 max-w-[22rem]">
              Unlock up to{' '}
              <span className="text-amber-600 dark:text-accent-yellow font-black">$500K</span> in
              verified startup credits, grants, tools, and founder perks.
            </p>

            {/* Metrics — all gold-synced (site theme) */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              {[
                { icon: 'cloud', value: '$500K', label: 'In credits' },
                { icon: 'verified_user', value: 'Verified', label: 'Deals & grants' },
                { icon: 'workspace_premium', value: 'Founder', label: 'Vetted only' },
                { icon: 'bolt', value: 'Save $50K', label: 'In 3 months' },
              ].map((m) => (
                <div
                  key={m.label}
                  className="flex items-center gap-2.5 rounded-2xl border border-black/[0.07] dark:border-white/[0.09] bg-white dark:bg-[#0a0a0a] px-3 py-2.5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-yellow/12 border border-accent-yellow/25 text-amber-700 dark:text-accent-yellow">
                    <span
                      className="material-symbols-outlined !text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {m.icon}
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[12px] font-black text-gray-900 dark:text-white leading-none">
                      {m.value}
                    </span>
                    <span className="block font-mono text-[8px] font-bold uppercase tracking-wide text-gray-500 dark:text-zinc-500 mt-0.5">
                      {m.label}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-2.5 mb-5">
              <Link
                href="/pricing"
                className="hero-cta-primary relative overflow-hidden bg-accent-yellow active:bg-yellow-300 text-black text-[11px] font-black min-h-[52px] py-3.5 px-5 flex items-center justify-center gap-1.5 transition-all w-full font-mono uppercase tracking-[0.1em] rounded-2xl shadow-[0_0_32px_rgba(255,215,0,0.28)]"
              >
                <span className="material-symbols-outlined !text-[18px]">bolt</span>
                Unlock founder perks
                <span className="material-symbols-outlined !text-[16px] hero-arrow-bounce">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="/pricing"
                className="flex items-center justify-center gap-1.5 border border-black/10 dark:border-white/12 bg-white dark:bg-[#0c0c0c] active:bg-gray-50 dark:active:bg-white/5 text-gray-900 dark:text-white font-mono font-black text-[11px] min-h-[48px] py-3.5 px-5 transition-all uppercase tracking-[0.1em] w-full rounded-2xl"
              >
                See pricing
                <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
              </Link>
            </div>

            {/* Deal counts */}
            <div className="flex flex-col gap-2 mb-5 w-full">
              {DEAL_STATS.map((stat) => (
                <Link
                  key={stat.label}
                  href={stat.href}
                  className="group flex items-center gap-2.5 px-3.5 min-h-[48px] py-2.5 border border-black/[0.07] dark:border-white/[0.09] bg-white dark:bg-[#0a0a0a] active:border-accent-yellow/50 active:bg-accent-yellow/[0.06] rounded-2xl transition-all duration-200 w-full"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-yellow/10 border border-accent-yellow/20 text-amber-700 dark:text-accent-yellow">
                    <span
                      className="material-symbols-outlined !text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {stat.icon}
                    </span>
                  </span>
                  <span className="font-mono font-black text-[13px] text-gray-900 dark:text-white tabular-nums shrink-0">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[10px] font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wide truncate flex-1">
                    {stat.label}
                  </span>
                  <span className="material-symbols-outlined !text-[16px] text-gray-300 dark:text-zinc-600 group-active:text-accent-yellow shrink-0">
                    chevron_right
                  </span>
                </Link>
              ))}
            </div>

            {/* Trusted brands — local /brand-logos PNGs only */}
            <div className="relative -mx-4 overflow-hidden border-y border-black/[0.06] dark:border-white/[0.07] bg-gray-50/80 dark:bg-white/[0.02] py-3">
              <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#f6f8f8] dark:from-black to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#f6f8f8] dark:from-black to-transparent z-10 pointer-events-none" />
              <div className="flex gap-4 animate-[marquee_55s_linear_infinite] whitespace-nowrap w-max px-4">
                {(['a', 'b', 'c'] as const).flatMap((pass) =>
                  TRUSTED_BRANDS.map((brand) => (
                    <TrustedBrandPill
                      key={`${pass}-${brand.name}`}
                      brand={brand}
                      size={22}
                      textClass="text-[8px] text-gray-500 dark:text-zinc-400"
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-12 gap-12 items-center">

          {/* ─── LEFT: Message + CTAs ─── */}
          <div className="lg:col-span-7 flex flex-col items-start">

            {/* Eyebrow row with corner-bracket flourishes */}
            <FadeUp className="relative w-full mb-5 md:mb-7">
              <span aria-hidden="true" className="absolute -top-4 -left-4 w-6 h-6 border-t-2 border-l-2 border-black dark:border-white/20" />
              <span aria-hidden="true" className="absolute -top-4 right-0 w-6 h-6 border-t-2 border-r-2 border-black dark:border-white/20 hidden sm:block" />
              <div className="inline-flex items-center gap-2.5 font-mono text-[10px] md:text-xs font-black uppercase tracking-[0.18em]">
                <span className="inline-flex items-center gap-1.5 text-black dark:text-white">
                  <span className="relative flex h-1.5 w-1.5">
                    {!reduce && (
                      <span className="absolute inline-flex h-full w-full rounded-full bg-accent-yellow opacity-60 animate-ping" />
                    )}
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-yellow" />
                  </span>
                  Live
                </span>
                <span className="text-gray-400">Founder-Approved</span>
              </div>
            </FadeUp>

            {/* Headline — BUILD MORE / BURN LESS */}
            <FadeUp delay={0.06}>
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
            </FadeUp>

            {/* Sub-headline — offer line */}
            <FadeUp delay={0.12}>
              <p className="font-heading font-extrabold uppercase text-black dark:text-white text-lg sm:text-xl md:text-[26px] tracking-tight leading-[1.15] mb-4 md:mb-5 max-w-xl">
                Unlock up to{' '}
                <span className="bg-accent-yellow px-1.5 py-0.5 box-decoration-clone text-black">$500K</span>{' '}
                in startup credits &amp; founder perks.
              </p>
            </FadeUp>

            {/* Supporting paragraph */}
            <FadeUp delay={0.16}>
              <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium leading-relaxed mb-6 md:mb-8 max-w-md">
                Money shouldn&apos;t be the barrier. Access founder-vetted credits, grants, and perks &mdash;{' '}
                <span className="bg-accent-yellow text-black font-bold px-1.5 py-0.5 rounded-[2px] box-decoration-clone hero-highlight-glow">zero dilution.</span>
              </p>
            </FadeUp>

            {/* CTAs */}
            <FadeUp delay={0.2} className="flex flex-col sm:flex-row gap-3 mb-6 md:mb-8 w-full max-w-lg">
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
            </FadeUp>

            {/* Deal counts strip */}
            <FadeUp delay={0.26} className="flex flex-nowrap items-center gap-1.5 xl:gap-2 w-full overflow-hidden">
              {DEAL_STATS.map((stat) => (
                <Link
                  key={stat.label}
                  href={stat.href}
                  className="group flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] hover:border-accent-yellow hover:bg-accent-yellow/10 dark:hover:border-accent-yellow dark:hover:bg-accent-yellow/10 rounded-full transition-all duration-200 shrink min-w-0"
                >
                  <span
                    className="material-symbols-outlined !text-[13px] text-amber-700 dark:text-accent-yellow group-hover:text-black dark:group-hover:text-accent-yellow transition-colors shrink-0"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {stat.icon}
                  </span>
                  <span className="font-mono font-black text-[11px] text-black dark:text-white group-hover:text-black dark:group-hover:text-white tabular-nums shrink-0">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[9px] xl:text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate">
                    {stat.label}
                  </span>
                </Link>
              ))}
            </FadeUp>
          </div>

          {/* ─── RIGHT: Dark "total saved" card ─── */}
          <m.div
            className="lg:col-span-5 relative"
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.18, ease: premiumEase }}
          >
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
                  <span className="w-2 h-2 bg-accent-yellow rounded-full animate-pulse" />
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
                  className="material-symbols-outlined !text-[15px] text-accent-yellow"
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
          </m.div>
        </div>
      </div>

      {/* ─── Trusted-by bar (Infinite Marquee Scroller) ─── */}
      <FadeUp delay={0.3} className="hidden lg:block max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-14 mb-8 md:mb-12 relative z-10">
        <div className="border-2 border-black dark:border-white/10 bg-white dark:bg-white/[0.04] px-5 md:px-8 py-4 md:py-5 shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.05)] flex flex-col lg:flex-row items-center gap-4 lg:gap-8 transition-colors duration-300 overflow-hidden hover:border-accent-yellow/40 transition-colors duration-300">
          <span className="font-mono text-[10px] md:text-xs font-black uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400 flex items-center gap-2 flex-shrink-0">
            Trusted by founders using
            <span className="material-symbols-outlined !text-[16px] text-accent-yellow">arrow_forward</span>
          </span>
          <div 
            className="relative flex-1 overflow-hidden"
            style={{ 
              maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'
            }}
          >
            <div className="flex gap-10 animate-[marquee_45s_linear_infinite] whitespace-nowrap items-center w-max">
              {(['a', 'b'] as const).flatMap((pass) =>
                TRUSTED_BRANDS.map((b) => (
                  <div
                    key={`${pass}-${b.name}`}
                    className="inline-flex items-center gap-2.5 transition-all flex-shrink-0 hover:scale-105"
                  >
                    <TrustedBrandLogo brand={b} size={28} />
                    <span className="font-mono text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {b.name}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  )
}
