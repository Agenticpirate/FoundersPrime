'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import CountUp from 'react-countup'
import { GlowingEffect } from '@/components/ui/GlowingEffect'
import BrandLogo from '@/components/ui/BrandLogo'

/* ─── Brand wall (proof above the fold) ─── */
const BRANDS = [
  { name: 'AWS', domain: 'aws.amazon.com' },
  { name: 'Google Cloud', domain: 'cloud.google.com' },
  { name: 'Stripe', domain: 'stripe.com' },
  { name: 'Notion', domain: 'notion.so' },
  { name: 'OpenAI', domain: 'openai.com' },
  { name: 'HubSpot', domain: 'hubspot.com' },
  { name: 'Airtable', domain: 'airtable.com' },
  { name: 'Figma', domain: 'figma.com' },
  { name: 'Vercel', domain: 'vercel.com' },
  { name: 'Linear', domain: 'linear.app' },
  { name: 'Supabase', domain: 'supabase.com' },
  { name: 'Discord', domain: 'discord.com' },
  { name: 'Cloudflare', domain: 'cloudflare.com' },
  { name: 'MongoDB', domain: 'mongodb.com' },
  { name: 'Microsoft', domain: 'microsoft.com' },
  { name: 'Y Combinator', domain: 'ycombinator.com' },
]

const BRANDS_LOOP = [...BRANDS, ...BRANDS]

/* ─── Value stack (Hormozi-style, visible above the fold) ─── */
const VALUE_STACK = [
  { label: 'Cloud Credits', value: '$200K+', icon: 'cloud', color: 'bg-sky-100', accent: 'text-sky-700' },
  { label: 'Grants Database', value: '$10M+', icon: 'payments', color: 'bg-green-100', accent: 'text-green-700' },
  { label: 'SaaS Deals', value: '200+', icon: 'apps', color: 'bg-purple-100', accent: 'text-purple-700' },
  { label: 'Ad Credits', value: '$50K+', icon: 'campaign', color: 'bg-pink-100', accent: 'text-pink-700' },
  { label: 'Accelerators', value: '50+', icon: 'rocket_launch', color: 'bg-orange-100', accent: 'text-orange-700' },
  { label: 'Verified Startups', value: '1K+', icon: 'verified', color: 'bg-blue-100', accent: 'text-blue-700' },
]

export default function HeroSection() {
  /* Cumulative "saved by founders so far" counter — single hero metric */
  const [memberSavingsEnd, setMemberSavingsEnd] = useState(2_847_320)
  const memberSavingsStartRef = useRef(2_847_320)

  /* Cursor-following yellow fog. We use refs + rAF instead of state so
     the gradient follows the mouse smoothly on every frame without
     thrashing React re-renders. Two layered orbs lag behind each other
     by different easing values for a soft "trailing fog" feel. */
  const sectionRef = useRef<HTMLElement | null>(null)
  const fogRef = useRef<HTMLDivElement | null>(null)
  const fogTrailRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      // Larger jumps so the bigger number actually moves visibly
      const increase = Math.floor(Math.random() * 480) + 120
      setMemberSavingsEnd((prev) => {
        memberSavingsStartRef.current = prev
        return prev + increase
      })
    }, 4200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const fog = fogRef.current
    const trail = fogTrailRef.current
    if (!section || !fog || !trail) return

    // Respect prefers-reduced-motion — skip the cursor follow entirely.
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    let targetX = 0
    let targetY = 0
    let fogX = 0
    let fogY = 0
    let trailX = 0
    let trailY = 0
    let raf = 0
    let active = false

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      targetX = e.clientX - rect.left
      targetY = e.clientY - rect.top
      if (!active) {
        active = true
        fog.style.opacity = '1'
        trail.style.opacity = '1'
      }
    }

    const onLeave = () => {
      active = false
      fog.style.opacity = '0'
      trail.style.opacity = '0'
    }

    const tick = () => {
      // Lead orb: snappier ease (0.18). Trail orb: slower (0.08) for fog drift.
      fogX += (targetX - fogX) * 0.18
      fogY += (targetY - fogY) * 0.18
      trailX += (targetX - trailX) * 0.08
      trailY += (targetY - trailY) * 0.08
      fog.style.transform = `translate3d(${fogX}px, ${fogY}px, 0) translate(-50%, -50%)`
      trail.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    section.addEventListener('mousemove', onMove)
    section.addEventListener('mouseleave', onLeave)
    return () => {
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100dvh-100px)] md:min-h-[calc(100vh-120px)] pt-3 pb-0 md:pt-5 lg:pt-6 overflow-hidden grid-bg flex flex-col"
    >
      {/* Soft glow accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-accent-yellow/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-32 w-[28rem] h-[28rem] bg-blue-300/15 rounded-full blur-3xl pointer-events-none" />

      {/* Cursor-following yellow fog (lead orb) */}
      <div
        ref={fogRef}
        aria-hidden="true"
        className="hidden md:block pointer-events-none absolute top-0 left-0 z-[1] opacity-0 transition-opacity duration-300"
        style={{
          width: '420px',
          height: '420px',
          background:
            'radial-gradient(circle, rgba(255,221,0,0.28) 0%, rgba(255,221,0,0.12) 35%, rgba(255,221,0,0) 70%)',
          filter: 'blur(28px)',
          mixBlendMode: 'multiply',
          willChange: 'transform, opacity',
        }}
      />
      {/* Trailing fog (slower, larger, lower opacity) */}
      <div
        ref={fogTrailRef}
        aria-hidden="true"
        className="hidden md:block pointer-events-none absolute top-0 left-0 z-[1] opacity-0 transition-opacity duration-500"
        style={{
          width: '640px',
          height: '640px',
          background:
            'radial-gradient(circle, rgba(255,221,0,0.16) 0%, rgba(255,221,0,0.06) 40%, rgba(255,221,0,0) 75%)',
          filter: 'blur(48px)',
          mixBlendMode: 'multiply',
          willChange: 'transform, opacity',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-3 md:mb-5 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center w-full">

          {/* ─── LEFT: Message + CTAs ─── */}
          <div className="lg:col-span-7 flex flex-col justify-center items-start">

            {/* Eyebrow — sets the audience clearly */}
            <div className="inline-flex items-center gap-2 bg-black text-accent-yellow font-mono text-[9px] md:text-xs font-black px-2.5 md:px-3 py-1 mb-2.5 md:mb-3.5 uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_#FFD500] hero-mobile-fade hero-mobile-fade-1">
              <span className="w-1.5 h-1.5 bg-accent-yellow rounded-full animate-pulse" />
              Built for bootstrapped founders
            </div>

            {/* Hero headline — three-line punch.
                FREE CREDITS. / REAL GRANTS. / ZERO DILUTION. (highlighted)
                Sized so the full hero (incl. brand marquee) fits in the
                viewport on a typical 1080p / 13-inch laptop screen. */}
            <h1 className="font-black text-black tracking-tight mb-3 md:mb-4 font-mono uppercase hero-mobile-fade hero-mobile-fade-2 w-full">
              <span className="block leading-[1.05] mb-1.5 md:mb-2 text-3xl sm:text-4xl md:text-5xl lg:text-[60px]">
                Free Credits.
              </span>
              <span className="block leading-[1.05] mb-2 md:mb-3 text-3xl sm:text-4xl md:text-5xl lg:text-[60px]">
                Real Grants.
              </span>
              <span className="block leading-[1.05]">
                <span className="relative inline-block align-middle">
                  <span className="relative z-10 inline-block bg-accent-yellow px-2.5 md:px-3.5 py-0.5 md:py-1 border-2 md:border-[3px] border-black text-3xl sm:text-4xl md:text-5xl lg:text-[60px] hero-highlight-glow">
                    Zero Dilution.
                  </span>
                  {/* Decorative offset shadow for depth */}
                  <span aria-hidden="true" className="absolute inset-0 translate-x-1.5 translate-y-1.5 md:translate-x-2 md:translate-y-2 bg-black -z-10 rounded-[1px]" />
                </span>
              </span>
            </h1>

            {/* Subhead — value preview, AWS / Stripe / HubSpot anchored, two-line layout */}
            <p className="hidden md:block text-[15px] md:text-base text-black mb-3 md:mb-4 font-medium max-w-[640px] leading-relaxed hero-mobile-fade hero-mobile-fade-3">
              A curated database of founder perks &mdash; up to <strong>$350K</strong> in cloud credits, startup grants, accelerator benefits, and exclusive discounts from <strong>AWS, Stripe, HubSpot</strong> and more.
            </p>
            {/* Mobile-only condensed subhead */}
            <p className="md:hidden text-[13px] text-black mb-3 font-medium leading-snug hero-mobile-fade hero-mobile-fade-3">
              A curated database of founder perks &mdash; up to <strong>$350K</strong> in cloud credits, grants, accelerators, and discounts from <strong>AWS, Stripe, HubSpot</strong>.
            </p>

            {/* Audience split — Founders vs Students */}
            <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-3 md:mb-4 hero-mobile-fade hero-mobile-fade-3">
              <span className="inline-flex items-center gap-1 md:gap-1.5 bg-white border-2 border-black px-2 md:px-2.5 py-0.5 md:py-1 font-mono text-[9px] md:text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#111]">
                <span className="material-symbols-outlined !text-[12px] md:!text-sm">rocket_launch</span>
                For Founders
              </span>
              <span className="font-mono text-[9px] md:text-xs text-gray-400 font-bold">+</span>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1 md:gap-1.5 bg-accent-yellow border-2 border-black px-2 md:px-2.5 py-0.5 md:py-1 font-mono text-[9px] md:text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#111] hover:-translate-y-0.5 transition-transform"
              >
                <span className="material-symbols-outlined !text-[12px] md:!text-sm">school</span>
                Next'Founder · Students
              </Link>
            </div>

            {/* CTAs — mobile: side-by-side compact, desktop: stacked */}
            <div className="flex flex-row gap-2 md:gap-3 mb-3 md:mb-4 w-full max-w-2xl hero-mobile-fade hero-mobile-fade-4">
              <div className="relative flex-1">
                <GlowingEffect spread={50} glow={true} disabled={false} proximity={80} inactiveZone={0.01} borderWidth={2} />
                <Link
                  href="/deals"
                  className="hero-cta-primary bg-black text-white text-[12px] md:text-base font-black py-3 md:py-4 px-3 md:px-6 flex items-center justify-center gap-1.5 md:gap-2 transition-all hover:bg-accent-yellow hover:text-black shadow-[5px_5px_0px_0px_rgba(255,221,0,0.8)] hover:shadow-[2px_2px_0px_0px_rgba(255,221,0,0.8)] hover:translate-x-[3px] hover:translate-y-[3px] w-full font-mono uppercase tracking-wider relative overflow-hidden border-2 border-black"
                >
                  <span className="relative z-10 flex items-center gap-1.5 md:gap-2">
                    <span className="material-symbols-outlined !text-[14px] md:!text-base">bolt</span>
                    <span>Unlock the Deals</span>
                    <span className="material-symbols-outlined !text-[14px] md:!text-base hero-arrow-bounce">arrow_forward</span>
                  </span>
                </Link>
              </div>
              <Link
                href="/pricing"
                className="flex items-center justify-center gap-1.5 md:gap-2 border-2 border-black bg-white text-black font-mono font-black text-[12px] md:text-sm py-3 md:py-4 px-3 md:px-5 hover:bg-black hover:text-accent-yellow transition-all uppercase tracking-wider whitespace-nowrap"
              >
                <span>View Pricing</span>
                <span className="material-symbols-outlined !text-[14px] md:!text-base">arrow_forward</span>
              </Link>
            </div>

            {/* Risk reversal — mobile: 2-col grid, desktop: inline */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 md:flex md:flex-wrap md:items-center md:gap-x-4 md:gap-y-1.5 mb-3 md:mb-3 hero-mobile-fade hero-mobile-fade-4">
              {[
                { icon: 'verified', text: 'Founder-vetted weekly' },
                { icon: 'flash_on', text: 'Apply in under 3 minutes' },
                { icon: 'shield', text: 'Zero equity. Ever.' },
              ].map((item) => (
                <span key={item.text} className="inline-flex items-center gap-1 text-[10.5px] md:text-xs font-mono font-bold text-gray-700">
                  <span className="material-symbols-outlined !text-[12px] md:!text-sm text-green-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  {item.text}
                </span>
              ))}
            </div>

            {/* Social proof: brand wall above the fold */}
            <div className="hidden md:block w-full max-w-2xl border-t-2 border-black/10 pt-3 hero-mobile-fade hero-mobile-fade-5">
              <p className="font-mono text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                Credits &amp; deals from
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {BRANDS.slice(0, 8).map((b) => (
                  <div
                    key={b.name}
                    className="w-9 h-9 bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#111] p-1.5 hover:-translate-y-0.5 transition-transform"
                    title={b.name}
                  >
                    <BrandLogo name={b.name} domain={b.domain} size="sm" eager />
                  </div>
                ))}
                <span className="font-mono font-black text-xs text-black bg-accent-yellow border-2 border-black px-2 py-1 shadow-[2px_2px_0px_#111]">
                  +500
                </span>
              </div>
            </div>

            {/* Mobile-only highlight cards */}
            <div className="md:hidden grid grid-cols-3 gap-1.5 mt-2 w-full hero-mobile-fade hero-mobile-fade-5">
              <div className="bg-sky-100 border-2 border-black p-1.5 text-center shadow-[2px_2px_0px_#111]">
                <div className="text-[7px] font-mono font-bold uppercase leading-tight text-sky-900">Cloud Credits</div>
                <div className="text-[13px] font-mono font-black leading-tight">$200K+</div>
              </div>
              <div className="bg-green-100 border-2 border-black p-1.5 text-center shadow-[2px_2px_0px_#111]">
                <div className="text-[7px] font-mono font-bold uppercase leading-tight text-green-900">Grants</div>
                <div className="text-[13px] font-mono font-black leading-tight">$10M+</div>
              </div>
              <div className="bg-accent-yellow border-2 border-black p-1.5 text-center shadow-[2px_2px_0px_#111]">
                <div className="text-[7px] font-mono font-bold uppercase leading-tight">Accelerators</div>
                <div className="text-[13px] font-mono font-black leading-tight">50+</div>
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Value stack (visible offer breakdown) ─── */}
          <div className="lg:col-span-5 relative mt-2 lg:mt-0 hidden md:block">
            <div className="bg-white border-2 border-black shadow-[8px_8px_0px_#111] relative z-10 mx-auto max-w-md lg:max-w-none">
              <GlowingEffect spread={40} glow={false} disabled={false} proximity={80} inactiveZone={0.01} borderWidth={2} />

              {/* Card header */}
              <div className="bg-black text-white p-3 text-xs font-mono flex justify-between items-center border-b-2 border-black">
                <span className="font-black tracking-widest">WHAT YOU GET</span>
                <span className="flex items-center gap-1.5 text-accent-yellow">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="font-black tracking-widest">VERIFIED</span>
                </span>
              </div>

              <div className="p-3 bg-white flex flex-col gap-2">
                {/* Hero counter — the single, biggest social-proof metric */}
                <div className="bg-gradient-to-br from-black via-black to-gray-900 text-white border-2 border-black p-3 relative overflow-hidden shadow-[3px_3px_0px_#FFD500]">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-yellow/30 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-sky-500/15 rounded-full blur-2xl pointer-events-none" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-gray-400">
                        Saved by founders so far
                      </p>
                      <span className="inline-flex items-center gap-1 font-mono text-[9px] font-black uppercase tracking-widest text-accent-yellow">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        live
                      </span>
                    </div>
                    <p className="font-mono font-black text-2xl md:text-[28px] text-accent-yellow tabular-nums leading-none">
                      $
                      <CountUp
                        start={memberSavingsStartRef.current}
                        end={memberSavingsEnd}
                        duration={1.4}
                        separator=","
                      />
                    </p>
                    <p className="font-mono text-[10px] text-gray-300 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined !text-[12px] text-green-400" style={{ fontVariationSettings: "'FILL' 1" }}>
                        trending_up
                      </span>
                      across cloud credits, grants &amp; SaaS deals
                    </p>
                  </div>
                </div>

                {/* Value stack — Hormozi-style itemized offer */}
                <div className="grid grid-cols-2 gap-1.5">
                  {VALUE_STACK.map((item) => (
                    <div
                      key={item.label}
                      className={`${item.color} border-2 border-black p-2 shadow-[2px_2px_0px_#111] flex items-center gap-2 hover:-translate-y-0.5 transition-transform`}
                    >
                      <span className={`material-symbols-outlined !text-[18px] ${item.accent} flex-shrink-0`}>
                        {item.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className={`font-mono font-black text-[13px] ${item.accent} leading-none`}>{item.value}</p>
                        <p className="font-mono text-[9px] text-gray-700 uppercase tracking-wider mt-0.5 truncate">
                          {item.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Close — single CTA strip, no second number */}
                <Link
                  href="/pricing"
                  className="group bg-accent-yellow text-black border-2 border-black px-3 py-2 font-mono font-black text-[11px] uppercase tracking-[0.16em] hover:bg-black hover:text-accent-yellow transition-colors flex items-center justify-center gap-2 shadow-[3px_3px_0px_#111]"
                >
                  Unlock the Full Catalog
                  <span className="material-symbols-outlined !text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </div>
            {/* Decorative offset border */}
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-black bg-transparent z-0 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ─── Marquee Ticker — keeps urgency at the edge ─── */}
      <div className="hidden md:block bg-black py-2 overflow-hidden border-t-2 border-b-2 border-black w-full relative z-20 mt-auto">
        <div className="marquee flex items-center gap-8 md:gap-12 whitespace-nowrap">
          {[
            { text: 'AWS ACTIVATE // $100K CREDITS', icon: 'terminal', color: 'text-accent-yellow' },
            { text: 'GITHUB // ENTERPRISE PACK FREE', icon: 'code', color: 'text-accent-cyan' },
            { text: 'NOTION // 6 MONTHS FREE', icon: 'dataset', color: 'text-primary' },
            { text: 'STRIPE // ZERO FEES UP TO $20K', icon: 'attach_money', color: 'text-accent-red' },
            { text: 'HUBSPOT // 90% OFF YEAR ONE', icon: 'hub', color: 'text-accent-yellow' },
            { text: 'DIGITALOCEAN // $500 CREDIT', icon: 'dns', color: 'text-accent-cyan' },
            { text: 'OPENAI // FOUNDER CREDITS', icon: 'psychology', color: 'text-primary' },
            { text: 'GOOGLE CLOUD // UP TO $200K', icon: 'cloud', color: 'text-accent-red' },
          ].concat([
            { text: 'AWS ACTIVATE // $100K CREDITS', icon: 'terminal', color: 'text-accent-yellow' },
            { text: 'GITHUB // ENTERPRISE PACK FREE', icon: 'code', color: 'text-accent-cyan' },
            { text: 'NOTION // 6 MONTHS FREE', icon: 'dataset', color: 'text-primary' },
            { text: 'STRIPE // ZERO FEES UP TO $20K', icon: 'attach_money', color: 'text-accent-red' },
            { text: 'HUBSPOT // 90% OFF YEAR ONE', icon: 'hub', color: 'text-accent-yellow' },
            { text: 'DIGITALOCEAN // $500 CREDIT', icon: 'dns', color: 'text-accent-cyan' },
            { text: 'OPENAI // FOUNDER CREDITS', icon: 'psychology', color: 'text-primary' },
            { text: 'GOOGLE CLOUD // UP TO $200K', icon: 'cloud', color: 'text-accent-red' },
          ]).map((d, i) => (
            <span key={i} className="text-white font-mono text-xs md:text-sm font-bold flex items-center gap-1.5 md:gap-2">
              <span className={`material-symbols-outlined text-sm md:text-base ${d.color}`}>{d.icon}</span>
              {d.text}
            </span>
          ))}
        </div>
      </div>

      {/* Mobile-only bottom-anchored brand wall */}
      <div className="md:hidden w-full px-4 pb-3 mt-auto hero-mobile-fade hero-mobile-fade-5">
        <p className="text-[8px] font-mono font-black uppercase tracking-widest text-gray-500 mb-1 mt-4">Credits &amp; grants from</p>
        <div
          className="relative w-full overflow-hidden mb-2"
          style={{
            maskImage: 'linear-gradient(to right,transparent,black 12%,black 88%,transparent)',
            WebkitMaskImage: 'linear-gradient(to right,transparent,black 12%,black 88%,transparent)',
          }}
        >
          <div className="mobile-brand-marquee flex items-center gap-5 whitespace-nowrap">
            {BRANDS_LOOP.map((b, i) => (
              <div key={`brand-${i}`} className="flex flex-col items-center gap-0.5 flex-shrink-0">
                <div className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] p-1">
                  <BrandLogo name={b.name} domain={b.domain} size="sm" eager />
                </div>
                <span className="text-[7px] font-mono text-gray-500 font-bold uppercase truncate max-w-[32px] text-center">
                  {b.name.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-2">
          <span className="material-symbols-outlined text-black/20 text-lg animate-bounce">expand_more</span>
        </div>
      </div>

      <div className="md:hidden w-full" aria-hidden="true">
        <div className="h-[3px] bg-black/10 w-full" />
      </div>
    </section>
  )
}
