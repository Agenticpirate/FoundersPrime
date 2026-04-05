'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import CountUp from 'react-countup'
import { GlowingEffect } from '@/components/ui/GlowingEffect'
import BrandLogo from '@/components/ui/BrandLogo'

/* ─── Module-level constant: created once, never re-created on render ─── */
const BRANDS = [
  { name: 'AWS', domain: 'aws.amazon.com' },
  { name: 'Google Cloud', domain: 'cloud.google.com' },
  { name: 'Stripe', domain: 'stripe.com' },
  { name: 'Notion', domain: 'notion.so' },
  { name: 'OpenAI', domain: 'openai.com' },
  { name: 'Slack', domain: 'slack.com' },
  { name: 'HubSpot', domain: 'hubspot.com' },
  { name: 'Airtable', domain: 'airtable.com' },
  { name: 'Figma', domain: 'figma.com' },
  { name: 'Vercel', domain: 'vercel.com' },
  { name: 'Linear', domain: 'linear.app' },
  { name: 'Supabase', domain: 'supabase.com' },
  { name: 'Discord', domain: 'discord.com' },
  { name: 'Intercom', domain: 'intercom.com' },
  { name: 'Canva', domain: 'canva.com' },
  { name: 'Deel', domain: 'deel.com' },
  { name: 'Brex', domain: 'brex.com' },
  { name: 'Ramp', domain: 'ramp.com' },
  { name: 'Y Combinator', domain: 'ycombinator.com' },
  { name: 'Microsoft', domain: 'microsoft.com' },
  { name: 'MongoDB', domain: 'mongodb.com' },
  { name: 'Cloudflare', domain: 'cloudflare.com' },
  { name: 'Zendesk', domain: 'zendesk.com' },
  { name: 'PostHog', domain: 'posthog.com' },
  { name: 'Segment', domain: 'segment.com' },
  { name: 'Mixpanel', domain: 'mixpanel.com' },
]

/* Duplicated set for seamless marquee loop */
const BRANDS_LOOP = [...BRANDS, ...BRANDS]

export default function HeroSection() {
  /* ─── Savings counter: react-countup replaces two setInterval loops ─── */
  const [savingsEnd, setSavingsEnd] = useState(125400)
  const savingsStartRef = useRef(125400)

  useEffect(() => {
    const interval = setInterval(() => {
      const increase = Math.floor(Math.random() * 46) + 5
      setSavingsEnd(prev => {
        const next = prev + increase >= 1_000_000_000 ? 125400 : prev + increase
        savingsStartRef.current = prev
        return next
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[calc(100dvh-100px)] md:min-h-[calc(100vh-120px)] pt-6 pb-4 md:pt-10 md:pb-0 lg:pt-14 overflow-hidden grid-bg flex flex-col">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-0 md:mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center items-start pt-0">
            <div className="inline-flex items-center gap-2 bg-white neo-border px-2 py-0.5 mb-3 md:mb-3 mt-2 md:mt-0 neo-shadow-static hero-mobile-fade hero-mobile-fade-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[9px] sm:text-xs font-mono font-bold text-black uppercase tracking-wide">VERIFIED GRANTS, CREDITS &amp; FOUNDER PROGRAMS</span>
            </div>

            <h1 className="text-[2.5rem] sm:text-4xl md:text-5xl lg:text-7xl font-bold text-black tracking-tight mb-2 leading-[1.05] font-mono hero-mobile-fade hero-mobile-fade-2">
              FREE CREDITS.<br />
              REAL GRANTS.<br />
              <span className="bg-accent-yellow px-2 mt-2 inline-block neo-border box-decoration-clone hero-highlight-glow text-[2.5rem] sm:text-4xl md:text-5xl lg:text-7xl">ZERO DILUTION.</span>
            </h1>

            <p className="mt-3 text-[15px] sm:text-sm md:text-md lg:text-lg text-black mb-3 md:mb-4 font-medium max-w-2xl border-l-4 border-black pl-3 leading-relaxed hero-mobile-fade hero-mobile-fade-3">
              Discover startup credits, non-dilutive grants, accelerators, and founder resources in one place.{' '}
              <span className="font-bold border-b-[3px] border-accent-yellow inline-block mt-1 sm:mt-0">
                Students unlock free tools &amp; more.
              </span>
            </p>

            <div className="flex flex-col gap-1.5 md:gap-3 mb-3 md:mb-4 mt-1 md:mt-2 w-full max-w-2xl hero-mobile-fade hero-mobile-fade-4">
              {/* Primary CTA — enhanced with shimmer on mobile */}
              <div className="relative">
                <GlowingEffect spread={40} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                <Link href="/deals" className="hero-cta-primary bg-black text-white text-sm md:text-base font-bold py-3 md:py-4 px-6 flex items-center justify-center gap-2 transition-all hover:bg-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] w-full font-mono uppercase tracking-wide relative overflow-hidden neo-border">
                  <span className="relative z-10 flex items-center gap-2">
                    Unlock Startup Deals
                    <span className="material-symbols-outlined text-sm hero-arrow-bounce">arrow_forward</span>
                  </span>
                </Link>
              </div>

              {/* Secondary CTAs — enhanced with accent left-border on mobile */}
              <div className="grid grid-cols-2 gap-1.5 sm:gap-3 w-full">
                <div className="relative">
                  <GlowingEffect spread={30} glow={false} disabled={false} proximity={48} inactiveZone={0.01} borderWidth={1} />
                  <Link
                    href="/deals/grants"
                    className="hero-cta-secondary flex items-center justify-center gap-1.5 border-2 border-black bg-white text-black font-mono font-bold text-[10px] sm:text-xs py-2 px-2 sm:px-3 hover:bg-black hover:text-white transition-all uppercase tracking-wide relative overflow-hidden"
                  >
                    <span className="hero-cta-accent-bar md:hidden"></span>
                    <span className="material-symbols-outlined text-sm">payments</span>
                    Find Grants
                  </Link>
                </div>
                <div className="relative">
                  <GlowingEffect spread={30} glow={false} disabled={false} proximity={48} inactiveZone={0.01} borderWidth={1} />
                  <Link
                    href="/deals/accelerators"
                    className="hero-cta-secondary flex items-center justify-center gap-1.5 border-2 border-black bg-white text-black font-mono font-bold text-[10px] sm:text-xs py-2 px-2 sm:px-3 hover:bg-black hover:text-white transition-all uppercase tracking-wide relative overflow-hidden"
                  >
                    <span className="hero-cta-accent-bar md:hidden"></span>
                    <span className="material-symbols-outlined text-sm">rocket_launch</span>
                    Accelerators
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats badge bar — desktop only since ticker does this on mobile */}
            <div className="hidden sm:flex flex-wrap justify-center items-center gap-x-8 lg:gap-x-12 gap-y-2 text-[10px] sm:text-xs font-mono font-bold text-black uppercase border-t-2 border-black/10 pt-3 mt-1 w-full max-w-2xl px-2">
              <span>VERIFIED DEALS</span> <span className="text-black/30">•</span> <span>NON-DILUTIVE GRANTS</span> <span className="text-black/30">•</span> <span>TOP ACCELERATORS</span>
            </div>

            {/* ── Mobile-only: mini highlight cards ── */}
            <div className="md:hidden grid grid-cols-3 gap-1.5 mt-3 w-full hero-mobile-fade hero-mobile-fade-5">
              <div className="bg-[#ff9900] border-2 border-black p-2 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-[7px] font-mono font-bold uppercase leading-tight">Cloud Credits</div>
                <div className="text-sm font-mono font-black leading-tight">$100K</div>
              </div>
              <div className="bg-accent-yellow border-2 border-black p-2 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-[7px] font-mono font-bold uppercase leading-tight">Grant Spotlight</div>
                <div className="text-sm font-mono font-black leading-tight">$250K</div>
              </div>
              <div className="bg-[#7ed6e0] border-2 border-black p-2 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-[7px] font-mono font-bold uppercase leading-tight">Fee Waivers</div>
                <div className="text-sm font-mono font-black leading-tight">$50K</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative mt-4 lg:mt-0 hidden md:block">
            <div className="bg-white neo-border neo-shadow p-2 relative z-10 mx-auto max-w-md lg:max-w-none">
              <GlowingEffect spread={40} glow={false} disabled={false} proximity={80} inactiveZone={0.01} borderWidth={2} />
              <div className="bg-black text-white p-2 text-[10px] md:text-xs font-mono flex justify-between border-b-2 border-black mb-0">
                <span>FOUNDERSPRIME INDEX</span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  VERIFIED
                </span>
              </div>
              <div className="p-4 bg-white flex flex-col gap-3">

                {/* Savings Opportunity Block — CountUp drives smooth animation via RAF */}
                <div className="bg-white neo-border p-4">
                  <div className="text-[10px] md:text-xs font-mono text-gray-500 mb-1">SAVINGS OPPORTUNITY</div>
                  <div className="text-2xl md:text-3xl font-mono font-bold text-black">
                    $<CountUp
                      start={savingsStartRef.current}
                      end={savingsEnd}
                      duration={1}
                      separator=","
                      decimals={2}
                      decimal="."
                    />
                  </div>
                  <div className="text-[10px] md:text-xs font-mono text-green-600 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                    tracked this week
                  </div>
                </div>

                {/* Grid Split */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-[#ff9900] neo-border p-3">
                    <div className="text-[10px] md:text-xs font-bold mb-1">☁ CLOUD CREDITS</div>
                    <div className="text-xs text-black font-medium">programs</div>
                    <div className="font-mono font-bold text-sm md:text-base">up to $100K</div>
                  </div>
                  <div className="bg-[#7ed6e0] neo-border p-3">
                    <div className="text-[10px] md:text-xs font-bold mb-1">💳 PAYMENT SAVINGS</div>
                    <div className="text-xs text-black font-medium">fee waivers</div>
                    <div className="font-mono font-bold text-sm md:text-base">up to $50K</div>
                  </div>
                </div>

                {/* List Items */}
                <div className="flex flex-col gap-2">
                  <div className="bg-accent-yellow neo-border p-2 flex justify-between items-center px-3">
                    <span className="text-[10px] md:text-xs font-bold flex items-center gap-2">● GRANT SPOTLIGHT</span>
                    <span className="font-mono font-bold text-sm md:text-base">$250,000</span>
                  </div>
                  <div className="bg-white neo-border p-2 flex justify-between items-center px-3">
                    <span className="text-xs font-bold flex items-center gap-2">● ACCELERATOR WINDOW</span>
                    <span className="font-mono font-bold bg-green-100 px-1 text-green-700">OPEN</span>
                  </div>
                  <div className="bg-white neo-border p-2 flex justify-between items-center px-3">
                    <span className="text-xs font-bold flex items-center gap-2">● OPPORTUNITIES EXPIRING</span>
                    <span className="font-mono font-bold">12</span>
                  </div>
                </div>

              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-black bg-transparent z-0"></div>
          </div>
        </div>
      </div>

      {/* Integrated Marquee Ticker */}
      <div className="hidden md:block bg-black py-3 overflow-hidden border-t-2 border-b-2 border-black w-full relative z-20">
        <div className="marquee flex items-center gap-8 md:gap-12 whitespace-nowrap">
          <span className="text-white font-mono text-xs md:text-sm font-bold flex items-center gap-1.5 md:gap-2">
            <span className="material-symbols-outlined text-accent-yellow text-sm md:text-base">terminal</span> AWS ACTIVATE // $100K CREDITS
          </span>
          <span className="text-white font-mono text-xs md:text-sm font-bold flex items-center gap-1.5 md:gap-2">
            <span className="material-symbols-outlined text-accent-cyan text-sm md:text-base">code</span> GITHUB // ENTERPRISE PACK
          </span>
          <span className="text-white font-mono text-xs md:text-sm font-bold flex items-center gap-1.5 md:gap-2">
            <span className="material-symbols-outlined text-primary text-sm md:text-base">dataset</span> NOTION // 6 MONTHS FREE
          </span>
          <span className="text-white font-mono text-xs md:text-sm font-bold flex items-center gap-1.5 md:gap-2">
            <span className="material-symbols-outlined text-accent-red text-sm md:text-base">attach_money</span> STRIPE // ZERO FEES $20K
          </span>
          <span className="text-white font-mono text-xs md:text-sm font-bold flex items-center gap-1.5 md:gap-2">
            <span className="material-symbols-outlined text-accent-yellow text-sm md:text-base">hub</span> HUBSPOT // 90% OFF
          </span>
          <span className="text-white font-mono text-xs md:text-sm font-bold flex items-center gap-1.5 md:gap-2">
            <span className="material-symbols-outlined text-accent-cyan text-sm md:text-base">dns</span> DIGITALOCEAN // $500 CREDIT
          </span>
          <span className="text-white font-mono text-xs md:text-sm font-bold flex items-center gap-1.5 md:gap-2">
            <span className="material-symbols-outlined text-accent-yellow text-sm md:text-base">terminal</span> AWS ACTIVATE // $100K CREDITS
          </span>
          <span className="text-white font-mono text-xs md:text-sm font-bold flex items-center gap-1.5 md:gap-2">
            <span className="material-symbols-outlined text-accent-cyan text-sm md:text-base">code</span> GITHUB // ENTERPRISE PACK
          </span>
          <span className="text-white font-mono text-xs md:text-sm font-bold flex items-center gap-1.5 md:gap-2">
            <span className="material-symbols-outlined text-primary text-sm md:text-base">dataset</span> NOTION // 6 MONTHS FREE
          </span>
          <span className="text-white font-mono text-xs md:text-sm font-bold flex items-center gap-1.5 md:gap-2">
            <span className="material-symbols-outlined text-accent-red text-sm md:text-base">attach_money</span> STRIPE // ZERO FEES $20K
          </span>
          <span className="text-white font-mono text-xs md:text-sm font-bold flex items-center gap-1.5 md:gap-2">
            <span className="material-symbols-outlined text-accent-yellow text-sm md:text-base">hub</span> HUBSPOT // 90% OFF
          </span>
          <span className="text-white font-mono text-xs md:text-sm font-bold flex items-center gap-1.5 md:gap-2">
            <span className="material-symbols-outlined text-accent-cyan text-sm md:text-base">dns</span> DIGITALOCEAN // $500 CREDIT
          </span>
        </div>
      </div>
      {/* Spacer: ensures "Why This Exists" never peeks into the hero viewport */}
      <div className="hidden md:block flex-1 min-h-[2vh]" aria-hidden="true" />

      {/* ── Mobile-only bottom-anchored trust bar ── */}
      <div className="md:hidden w-full px-4 pb-3 mt-auto hero-mobile-fade hero-mobile-fade-5">
        {/* Brand logos scroller */}
        <p className="text-[8px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-1 mt-4">Credits &amp; grants from</p>
        <div className="relative w-full overflow-hidden mb-2" style={{ maskImage: 'linear-gradient(to right,transparent,black 12%,black 88%,transparent)', WebkitMaskImage: 'linear-gradient(to right,transparent,black 12%,black 88%,transparent)' }}>
          <div className="mobile-brand-marquee flex items-center gap-5 whitespace-nowrap">
            {BRANDS_LOOP.map((b, i) => (
              <div key={`brand-${i}`} className="flex flex-col items-center gap-0.5 flex-shrink-0">
                <div className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] p-1">
                  <BrandLogo name={b.name} domain={b.domain} size="sm" eager />
                </div>
                <span className="text-[7px] font-mono text-gray-500 font-bold uppercase truncate max-w-[32px] text-center">{b.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="flex justify-center mt-2">
          <span className="material-symbols-outlined text-black/20 text-lg animate-bounce">expand_more</span>
        </div>
      </div>

      {/* Mobile-only bottom divider — hard visual break from next section */}
      <div className="md:hidden w-full" aria-hidden="true">
        <div className="h-[3px] bg-black/10 w-full"></div>
      </div>
    </section>
  )
}
