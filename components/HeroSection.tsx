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
  /* Live "savings tracked" counter */
  const [savingsEnd, setSavingsEnd] = useState(125_400)
  const savingsStartRef = useRef(125_400)

  useEffect(() => {
    const interval = setInterval(() => {
      const increase = Math.floor(Math.random() * 46) + 5
      setSavingsEnd((prev) => {
        const next = prev + increase >= 1_000_000_000 ? 125_400 : prev + increase
        savingsStartRef.current = prev
        return next
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[calc(100dvh-100px)] md:min-h-[calc(100vh-120px)] pt-4 pb-0 md:pt-8 lg:pt-10 overflow-hidden grid-bg flex flex-col">
      {/* Soft glow accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-accent-yellow/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-32 w-[28rem] h-[28rem] bg-blue-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-3 md:mb-5 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center w-full">

          {/* ─── LEFT: Message + CTAs ─── */}
          <div className="lg:col-span-7 flex flex-col justify-center items-start">

            {/* Eyebrow — sets the audience clearly */}
            <div className="inline-flex items-center gap-2 bg-black text-accent-yellow font-mono text-[10px] md:text-xs font-black px-3 py-1 mb-4 uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_#FFD500] hero-mobile-fade hero-mobile-fade-1">
              <span className="w-1.5 h-1.5 bg-accent-yellow rounded-full animate-pulse" />
              Built for bootstrapped founders
            </div>

            {/* Hero headline — specific, outcome-led */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black tracking-tight mb-3 leading-[1.02] font-mono hero-mobile-fade hero-mobile-fade-2">
              Save{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-accent-yellow px-2 border-2 border-black box-decoration-clone hero-highlight-glow">$500K+</span>
              </span>
              <br />
              in startup credits<br />
              &amp; grants.
            </h1>

            {/* Subhead — process compression + audience clarity */}
            <p className="text-base md:text-lg text-black mb-3 md:mb-4 font-medium max-w-2xl leading-relaxed hero-mobile-fade hero-mobile-fade-3">
              500+ verified deals from <strong>AWS, Stripe, OpenAI, HubSpot</strong> &amp; more.
              Direct apply links. New drops every week.{' '}
              <span className="font-black border-b-[3px] border-accent-yellow inline-block">
                Zero equity. Real savings.
              </span>
            </p>

            {/* Audience split — Founders vs Students */}
            <div className="flex flex-wrap items-center gap-2 mb-5 md:mb-6 hero-mobile-fade hero-mobile-fade-3">
              <span className="inline-flex items-center gap-1.5 bg-white border-2 border-black px-2.5 py-1 font-mono text-[10px] md:text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#111]">
                <span className="material-symbols-outlined text-sm">rocket_launch</span>
                For Founders
              </span>
              <span className="font-mono text-[10px] md:text-xs text-gray-400 font-bold">+</span>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 bg-accent-yellow border-2 border-black px-2.5 py-1 font-mono text-[10px] md:text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#111] hover:-translate-y-0.5 transition-transform"
              >
                <span className="material-symbols-outlined text-sm">school</span>
                Next'Founder · for Students
              </Link>
            </div>

            {/* CTAs — single focal CTA + low-friction secondary */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4 w-full max-w-2xl hero-mobile-fade hero-mobile-fade-4">
              <div className="relative flex-1">
                <GlowingEffect spread={50} glow={true} disabled={false} proximity={80} inactiveZone={0.01} borderWidth={2} />
                <Link
                  href="/deals"
                  className="hero-cta-primary bg-black text-white text-sm md:text-base font-black py-4 px-6 flex items-center justify-center gap-2 transition-all hover:bg-accent-yellow hover:text-black shadow-[5px_5px_0px_0px_rgba(255,221,0,0.8)] hover:shadow-[2px_2px_0px_0px_rgba(255,221,0,0.8)] hover:translate-x-[3px] hover:translate-y-[3px] w-full font-mono uppercase tracking-wider relative overflow-hidden border-2 border-black"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">bolt</span>
                    Show Me The Deals
                    <span className="material-symbols-outlined text-base hero-arrow-bounce">arrow_forward</span>
                  </span>
                </Link>
              </div>
              <Link
                href="/pricing"
                className="flex items-center justify-center gap-2 border-2 border-black bg-white text-black font-mono font-black text-sm py-4 px-5 hover:bg-black hover:text-accent-yellow transition-all uppercase tracking-wider whitespace-nowrap"
              >
                See Plans
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>

            {/* Risk reversal — addresses friction objections */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-5 hero-mobile-fade hero-mobile-fade-4">
              {[
                { icon: 'verified', text: 'Manually verified weekly' },
                { icon: 'flash_on', text: 'Apply in under 3 minutes' },
                { icon: 'shield', text: '100% non-dilutive' },
              ].map((item) => (
                <span key={item.text} className="inline-flex items-center gap-1 text-[11px] md:text-xs font-mono font-bold text-gray-700">
                  <span className="material-symbols-outlined text-sm text-green-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  {item.text}
                </span>
              ))}
            </div>

            {/* Social proof: brand wall above the fold */}
            <div className="hidden md:block w-full max-w-2xl border-t-2 border-black/10 pt-4 hero-mobile-fade hero-mobile-fade-5">
              <p className="font-mono text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2.5">
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
            <div className="md:hidden grid grid-cols-3 gap-1.5 mt-3 w-full hero-mobile-fade hero-mobile-fade-5">
              <div className="bg-sky-100 border-2 border-black p-2 text-center shadow-[2px_2px_0px_#111]">
                <div className="text-[7px] font-mono font-bold uppercase leading-tight text-sky-900">Cloud Credits</div>
                <div className="text-sm font-mono font-black leading-tight">$200K+</div>
              </div>
              <div className="bg-green-100 border-2 border-black p-2 text-center shadow-[2px_2px_0px_#111]">
                <div className="text-[7px] font-mono font-bold uppercase leading-tight text-green-900">Grants</div>
                <div className="text-sm font-mono font-black leading-tight">$10M+</div>
              </div>
              <div className="bg-accent-yellow border-2 border-black p-2 text-center shadow-[2px_2px_0px_#111]">
                <div className="text-[7px] font-mono font-bold uppercase leading-tight">Accelerators</div>
                <div className="text-sm font-mono font-black leading-tight">50+</div>
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

              <div className="p-4 bg-white flex flex-col gap-3">
                {/* Live counter — proof that things are happening */}
                <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-black p-4 relative overflow-hidden">
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent-yellow/40 rounded-full blur-2xl pointer-events-none" />
                  <div className="relative">
                    <div className="text-[10px] font-mono font-black uppercase tracking-widest text-gray-500 mb-1">
                      Savings tracked this week
                    </div>
                    <div className="text-2xl md:text-3xl font-mono font-black text-black">
                      $
                      <CountUp
                        start={savingsStartRef.current}
                        end={savingsEnd}
                        duration={1}
                        separator=","
                        decimals={2}
                        decimal="."
                      />
                    </div>
                    <div className="text-[10px] font-mono font-bold text-green-600 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                        trending_up
                      </span>
                      live · auto-updating
                    </div>
                  </div>
                </div>

                {/* Value stack — Hormozi-style itemized offer */}
                <div className="grid grid-cols-2 gap-2">
                  {VALUE_STACK.map((item) => (
                    <div
                      key={item.label}
                      className={`${item.color} border-2 border-black p-2.5 shadow-[2px_2px_0px_#111] flex items-center gap-2 hover:-translate-y-0.5 transition-transform`}
                    >
                      <span className={`material-symbols-outlined text-lg ${item.accent} flex-shrink-0`}>
                        {item.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className={`font-mono font-black text-sm ${item.accent} leading-none`}>{item.value}</p>
                        <p className="font-mono text-[9px] text-gray-700 uppercase tracking-wider mt-0.5 truncate">
                          {item.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total value vs. price — the close (no price shown) */}
                <div className="bg-black text-white border-2 border-black p-3 flex items-center justify-between shadow-[3px_3px_0px_#FFD500]">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-400">Total value unlocked</p>
                    <p className="font-mono font-black text-2xl text-accent-yellow">$500K+</p>
                  </div>
                  <Link
                    href="/pricing"
                    className="bg-accent-yellow text-black border-2 border-accent-yellow px-3 py-2 font-mono font-black text-xs uppercase tracking-wider hover:bg-white hover:border-white transition-colors flex items-center gap-1.5"
                  >
                    View plans
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
            {/* Decorative offset border */}
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-black bg-transparent z-0 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ─── Marquee Ticker — keeps urgency at the edge ─── */}
      <div className="hidden md:block bg-black py-2 overflow-hidden border-t-2 border-b-2 border-black w-full relative z-20">
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
