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
        { text: "All Programs", href: "/programs" },
        { text: "Accelerators", href: "/programs?type=accelerators" },
        { text: "Incubators", href: "/programs?type=incubators" },
        { text: "Grants", href: "/programs?type=grants" },
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
      bg: 'hover:bg-white/10 hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]',
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      iconColor: 'text-white',
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/company/foundersprime',
      bg: 'hover:bg-[#0A66C2]/10 hover:border-[#0A66C2] hover:shadow-[0_0_15px_rgba(10,102,194,0.25)]',
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      iconColor: 'text-[#0A66C2]',
    },
    {
      label: 'Discord',
      href: '#',
      bg: 'hover:bg-[#5865F2]/10 hover:border-[#5865F2] hover:shadow-[0_0_15px_rgba(88,101,242,0.25)]',
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" aria-hidden>
          <path d="M20.317 4.37a19.79 19.79 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.74 19.74 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
      iconColor: 'text-[#5865F2]',
    },
    {
      label: 'Email',
      href: 'mailto:hello@foundersprime.com',
      bg: 'hover:bg-accent-yellow/10 hover:border-accent-yellow hover:shadow-[0_0_15px_rgba(255,215,0,0.25)]',
      svg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" aria-hidden>
          <path d="M2 4h20a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V6a2 2 0 012-2zm10 7L2.5 5h19zM2 8.236V18h20V8.236l-9.445 5.667a2 2 0 01-2.11 0z" />
        </svg>
      ),
      iconColor: 'text-accent-yellow',
    },
  ]

  return (
    <footer className="relative bg-black text-white border-t-2 border-zinc-800 overflow-hidden grid-bg-dark transition-colors duration-300">
      {/* Premium Glow blobs */}
      <div className="absolute -top-32 -left-32 w-[30rem] h-[30rem] bg-accent-yellow/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-32 w-[35rem] h-[35rem] bg-blue-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* ── Main grid ── */}
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-5 relative">
            <Link href="/" className="inline-flex items-center gap-2.5 no-underline w-fit group">
              <img
                src="/logo-icon.png"
                alt="FoundersPrime"
                className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-mono font-black text-xl md:text-2xl tracking-[0.18em] text-white uppercase whitespace-nowrap">
                FOUNDERS<span className="text-accent-yellow">[</span>PRIME<span className="text-accent-yellow">]</span>
              </span>
            </Link>
            
            <p className="font-sans text-sm text-zinc-400 leading-relaxed pr-4">
              The intelligence terminal for bootstrapped founders. Save runway, skip the dilution, and scale your startup faster.
            </p>

            {/* Trust cards */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 mt-1.5">
              <div className="flex items-center gap-3.5 bg-zinc-900/30 border border-white/[0.06] rounded-xl p-3.5 hover:bg-zinc-900/50 transition-colors">
                <span className="material-symbols-outlined text-accent-yellow !text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[10px] font-black uppercase text-white tracking-wider leading-none">Verified Deals</span>
                  <span className="font-sans text-[9px] text-zinc-400 mt-1.5 leading-tight">Handpicked &amp; founder-verified</span>
                </div>
              </div>
              <div className="flex items-center gap-3.5 bg-zinc-900/30 border border-white/[0.06] rounded-xl p-3.5 hover:bg-zinc-900/50 transition-colors">
                <span className="material-symbols-outlined text-green-400 !text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[10px] font-black uppercase text-white tracking-wider leading-none">Secure Checkout</span>
                  <span className="font-sans text-[9px] text-zinc-400 mt-1.5 leading-tight">Your data is always protected</span>
                </div>
              </div>
            </div>

            {/* Socials Row */}
            <div className="flex items-center gap-3 mt-2 w-full">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex-1 h-12 bg-zinc-900/40 border border-white/[0.08] rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 active:scale-95 active:translate-y-0 ${s.bg}`}
                >
                  <span className={`transition-colors duration-300 ${s.iconColor}`}>{s.svg}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link Grid */}
          <div className="lg:col-span-8 hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
            {footerSections.map((section, index) => (
              <div key={index} className="flex flex-col gap-4">
                <p className="font-mono text-[10.5px] font-black tracking-widest uppercase text-accent-yellow">
                  {section.title}
                </p>
                <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className={`font-sans text-[13px] no-underline hover:translate-x-1 hover:pl-0.5 transition-all inline-block ${
                          (link as { highlight?: boolean }).highlight
                            ? 'text-accent-yellow font-bold hover:text-yellow-300'
                            : 'text-zinc-400 hover:text-white'
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
          <div className="md:hidden flex flex-col w-full border border-white/[0.08] rounded-2xl bg-zinc-900/10 overflow-hidden mt-4">
            {footerSections.map((section) => (
              <details key={section.title} className="group border-b border-white/[0.06] last:border-b-0">
                <summary className="flex justify-between items-center cursor-pointer list-none p-3 outline-none transition-colors select-none">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-zinc-900/50 border border-white/[0.08] flex items-center justify-center flex-shrink-0 text-accent-yellow group-open:bg-accent-yellow group-open:text-black group-open:border-accent-yellow transition-all duration-300">
                      <span className="material-symbols-outlined !text-[16px]">{section.icon}</span>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-mono text-[11px] font-black tracking-wider uppercase text-gray-200 group-open:text-accent-yellow transition-colors leading-tight">
                        {section.title}
                      </span>
                      <span className="font-sans text-[8.5px] text-zinc-400 leading-normal mt-1 font-medium">
                        {section.summary}
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-base text-zinc-500 group-open:text-accent-yellow transition-all duration-300 group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <ul className="flex flex-col gap-1 px-4 pb-3.5 pt-1.5 list-none m-0 bg-zinc-950/40 border-t border-white/[0.03]">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className={`block font-sans text-xs no-underline py-2 px-1 rounded-md active:bg-white/5 transition-colors ${
                          (link as { highlight?: boolean }).highlight
                            ? 'text-accent-yellow font-bold active:text-yellow-300'
                            : 'text-zinc-400 active:text-white'
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

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative border-t border-white/[0.08] bg-zinc-950/60 backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
            <span className="font-mono text-[10px] md:text-[11px] text-zinc-500 text-center sm:text-left">
              © 2026 FoundersPrime · Built by founders, for founders.
            </span>
            <span className="hidden sm:inline text-zinc-700">·</span>
            <span className="font-mono text-[10px] md:text-[11px] text-zinc-500">
              Made with <span className="text-red-500">♥</span> for the underdogs.
            </span>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
            <GoogleTranslate />
            <a
              href="#"
              className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-400 hover:text-accent-yellow transition-colors"
            >
              Status
            </a>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-300 px-3 py-1.5 bg-zinc-900/40 border border-white/[0.08] rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
