'use client'

import Link from 'next/link'
import GoogleTranslate from './GoogleTranslate'

export default function Footer() {
  const footerSections = [
    {
      title: "Deals",
      summary: "Startup credits, SaaS deals & more",
      icon: "local_offer",
      links: [
        { text: "All Deals", href: "/deals" },
        { text: "Flash Deals", href: "/flash-deals", highlight: true },
        { text: "Cloud Credits", href: "/deals?category=cloud-credits" },
        { text: "SaaS Discounts", href: "/deals?category=saas-discounts" },
        { text: "Grants", href: "/programs?type=grants" },
        { text: "Ad Credits", href: "/deals?category=ad-credits" },
      ]
    },
    {
      title: "Programs",
      summary: "Grants, incentives & founder perks",
      icon: "redeem",
      links: [
        { text: "Accelerators", href: "/programs?type=accelerators" },
        { text: "Incubators", href: "/programs?type=incubators" },
      ]
    },
    {
      title: "Student Benefits",
      summary: "Exclusive benefits for students",
      icon: "school",
      links: [
        { text: "Credits & Savings", href: "/student-benefits?type=credits-savings" },
        { text: "Campus Edge", href: "/student-benefits?type=free-access" },
        { text: "Funding & Opps", href: "/student-benefits?type=funding" },
      ]
    },
    {
      title: "Discover",
      summary: "Explore resources & opportunities",
      icon: "explore",
      links: [
        { text: "Funded Startups", href: "/startups" },
        { text: "Startup Ideas", href: "/ideas" },
        { text: "Resources & Guides", href: "/resources" },
        { text: "Search", href: "/search" },
      ]
    },
    {
      title: "Company",
      summary: "About us, careers & press",
      icon: "domain",
      links: [
        { text: "About", href: "/about" },
        { text: "Pricing", href: "/pricing" },
        { text: "Contact", href: "/contact" },
        { text: "Submit a Deal", href: "/submit-deal" },
      ]
    },
    {
      title: "Legal",
      summary: "Terms, privacy & policies",
      icon: "gavel",
      links: [
        { text: "Privacy Policy", href: "/privacy" },
        { text: "Terms of Service", href: "/terms" },
        { text: "Cookie Policy", href: "/cookie-policy" },
        { text: "Refund Policy", href: "/refund-policy" },
      ]
    }
  ]

  const socials = [
    {
      label: 'Twitter / X',
      href: 'https://twitter.com/foundersprime',
      bg: 'hover:bg-black',
      svg: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      iconColor: 'text-white group-hover:text-white',
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/company/foundersprime',
      bg: 'hover:bg-[#0A66C2]',
      svg: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      iconColor: 'text-[#0A66C2] group-hover:text-white',
    },
    {
      label: 'Discord',
      href: '#',
      bg: 'hover:bg-[#5865F2]',
      svg: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
          <path d="M20.317 4.37a19.79 19.79 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.74 19.74 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
      iconColor: 'text-[#5865F2] group-hover:text-white',
    },
    {
      label: 'Email',
      href: 'mailto:hello@foundersprime.com',
      bg: 'hover:bg-accent-yellow',
      svg: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
          <path d="M2 4h20a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V6a2 2 0 012-2zm10 7L2.5 5h19zM2 8.236V18h20V8.236l-9.445 5.667a2 2 0 01-2.11 0z" />
        </svg>
      ),
      iconColor: 'text-accent-yellow group-hover:text-black',
    },
  ]

  return (
    <footer className="relative bg-black text-white border-t-4 border-accent-yellow overflow-hidden grid-bg-dark">
      {/* Glow blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-accent-yellow/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-32 w-[28rem] h-[28rem] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* ── Main grid ── */}
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-8 pt-8 md:pt-14 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-3 flex flex-col gap-4 relative">
            {/* Spinning orbital ornament */}
            <div className="absolute top-0 right-0 w-28 h-28 opacity-[0.12] pointer-events-none block">
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

            <Link href="/" className="inline-flex items-center gap-2.5 no-underline w-fit group">
              <img
                src="/logo-icon.png"
                alt="FoundersPrime"
                className="h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <span className="font-mono font-black text-xl md:text-2xl tracking-[0.18em] text-white uppercase whitespace-nowrap">
                FOUNDERS<span className="text-accent-yellow">[</span>PRIME<span className="text-accent-yellow">]</span>
              </span>
            </Link>
            <p className="font-sans text-sm text-gray-400 leading-relaxed pr-8">
              The intelligence terminal for bootstrapped founders. Save runway. Skip the dilution. Ship faster.
            </p>

            {/* Trust cards */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5 mt-1">
              <div className="flex items-center gap-3 bg-white/[0.02] border border-white/10 rounded-xl p-3.5">
                <span className="material-symbols-outlined text-accent-yellow !text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[10px] font-black uppercase text-white tracking-wider leading-none">Verified Deals</span>
                  <span className="font-sans text-[8.5px] text-gray-400 mt-1 leading-tight">Handpicked &amp; founder-verified</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/[0.02] border border-white/10 rounded-xl p-3.5">
                <span className="material-symbols-outlined text-green-400 !text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[10px] font-black uppercase text-white tracking-wider leading-none">Secure Checkout</span>
                  <span className="font-sans text-[8.5px] text-gray-400 mt-1 leading-tight">Your data. Always protected.</span>
                </div>
              </div>
            </div>

            {/* Socials Grid */}
            <div className="grid grid-cols-4 gap-2.5 mt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group h-11 bg-white/5 border border-white/15 rounded-xl flex items-center justify-center transition-all hover:-translate-y-0.5 hover:border-white/40 ${s.bg}`}
                >
                  <span className={`transition-colors ${s.iconColor}`}>{s.svg}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link Grid */}
          <div className="lg:col-span-9 hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-8">
            {footerSections.map((section, index) => (
              <div key={index} className="flex flex-col gap-3">
                <p className="font-mono text-[10px] font-black tracking-widest uppercase text-accent-yellow">
                  {section.title}
                </p>
                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className={`font-sans text-sm no-underline hover:translate-x-0.5 transition-all inline-block ${
                          (link as { highlight?: boolean }).highlight
                            ? 'text-accent-yellow font-semibold hover:text-yellow-300'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile Accordion Links */}
          <div className="md:hidden flex flex-col w-full border border-white/10 rounded-xl bg-white/[0.02] overflow-hidden mt-3">
            {footerSections.map((section) => (
              <details key={section.title} className="group border-b border-white/10 last:border-b-0">
                <summary className="flex justify-between items-center cursor-pointer list-none p-2 outline-none transition-colors select-none">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-accent-yellow group-open:bg-accent-yellow group-open:text-black group-open:border-accent-yellow transition-all duration-300">
                      <span className="material-symbols-outlined !text-[16px]">{section.icon}</span>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-mono text-[10.5px] font-black tracking-wider uppercase text-gray-200 group-open:text-accent-yellow transition-colors leading-tight">
                        {section.title}
                      </span>
                      <span className="font-sans text-[8px] text-gray-400 leading-normal mt-0.5 font-medium">
                        {section.summary}
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-base text-gray-500 group-open:text-accent-yellow transition-all duration-300 group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <ul className="flex flex-col gap-0.5 px-3.5 pb-2.5 pt-1 list-none m-0 bg-black/20 border-t border-white/[0.03]">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className={`block font-sans text-xs no-underline py-1.5 px-1 rounded-sm active:bg-white/5 transition-colors ${
                          (link as { highlight?: boolean }).highlight
                            ? 'text-accent-yellow font-semibold active:text-yellow-300'
                            : 'text-gray-400 active:text-white'
                        }`}
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-12 relative border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden p-4 mt-3 flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Halftone dots ornament */}
            <div
              className="pointer-events-none absolute right-4 bottom-4 w-24 h-16 text-accent-yellow/10"
              style={{ backgroundImage: 'radial-gradient(currentColor 1.2px, transparent 1.2px)', backgroundSize: '7px 7px' }}
              aria-hidden="true"
            />
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0 text-accent-yellow">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-mono text-[11px] font-black tracking-wider uppercase text-white">
                  STAY AHEAD. EVERY WEEK.
                </span>
                <span className="font-sans text-[9px] text-gray-400 leading-normal mt-0.5">
                  Get the best founder deals, grants &amp; insights straight to your inbox.
                </span>
              </div>
            </div>

            {/* Form inline */}
            <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-auto md:min-w-[340px] flex items-center bg-black/60 border border-white/10 rounded-xl p-1 gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="flex-grow bg-transparent px-3 py-1 font-sans text-xs text-white placeholder-gray-500 focus:outline-none min-w-0"
              />
              <button
                type="submit"
                className="bg-accent-yellow hover:bg-white text-black font-mono font-black text-[9px] uppercase tracking-wider px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all flex-shrink-0"
              >
                Subscribe
                <span className="material-symbols-outlined !text-[11px]">arrow_forward</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative border-t border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-4 flex flex-col-reverse sm:flex-row justify-between items-center gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
            <span className="font-mono text-[10px] md:text-[11px] text-gray-500 text-center sm:text-left">
              © 2026 FoundersPrime · Built by founders, for founders.
            </span>
            <span className="hidden sm:inline text-gray-700">·</span>
            <span className="font-mono text-[10px] md:text-[11px] text-gray-500">
              Made with <span className="text-red-500">♥</span> for the underdogs.
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
            <GoogleTranslate />
            <a
              href="#"
              className="font-mono text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-gray-400 hover:text-accent-yellow transition-colors"
            >
              Status
            </a>
            <div className="inline-flex items-center gap-1.5 font-mono text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-gray-300 px-2 py-1 bg-white/5 border border-white/15">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
