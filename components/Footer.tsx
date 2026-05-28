import Link from 'next/link'
import GoogleTranslate from './GoogleTranslate'
import FooterNewsletter from './FooterNewsletter'

export default function Footer() {
  const footerSections = [
    {
      title: "Deals",
      links: [
        { text: "All Deals", href: "/deals" },
        { text: "Cloud Credits", href: "/deals/cloud-credits" },
        { text: "SaaS Discounts", href: "/deals/saas-discounts" },
        { text: "Grants", href: "/deals/grants" },
        { text: "Ad Credits", href: "/deals/ad-credits" },
      ]
    },
    {
      title: "Programs",
      links: [
        { text: "Accelerators", href: "/deals/accelerators" },
        { text: "Incubators", href: "/deals/incubators" },
      ]
    },
    {
      title: "Student Benefits",
      links: [
        { text: "Funding & Opps", href: "/resources/funding-opportunities" },
        { text: "Campus Edge", href: "/resources/free-access" },
        { text: "Credits & Savings", href: "/resources/credits-savings" },
      ]
    },
    {
      title: "Discover",
      links: [
        { text: "Funded Startups", href: "/startups" },
        { text: "Startup Ideas", href: "/ideas" },
        { text: "Resources & Guides", href: "/resources" },
        { text: "Search", href: "/search" },
      ]
    },
    {
      title: "Company",
      links: [
        { text: "About", href: "/about" },
        { text: "Pricing", href: "/pricing" },
        { text: "Contact", href: "/contact" },
        { text: "Submit a Deal", href: "/submit-deal" },
      ]
    },
    {
      title: "Legal",
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

      {/* ── Newsletter row ── */}
      <div className="relative border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-5 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-8">
          <div className="max-w-md">
            <span className="inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2 md:px-2.5 py-0.5 md:py-1 border border-black mb-2 md:mb-3">
              <span className="material-symbols-outlined !text-[11px] md:!text-[12px]">mark_email_unread</span>
              The Founder Brief · Free
            </span>
            <h3 className="font-mono text-base md:text-2xl font-black uppercase leading-tight mb-1">
              The next $50K deal lands<br className="hidden md:block" /> in your inbox Monday.
            </h3>
            <p className="text-gray-400 text-[12px] md:text-sm leading-snug">
              One email a week. Fresh credits. Closing deadlines. Grants you&apos;ll never see on Twitter.
            </p>
          </div>

          <FooterNewsletter />
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-8 pt-10 md:pt-14 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <Link href="/" className="inline-flex items-center gap-2.5 no-underline w-fit group">
              <div className="relative w-8 h-8 flex-shrink-0">
                <span className="absolute inset-0 rounded-sm bg-accent-yellow/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                <img
                  src="/logo-white.svg"
                  alt="FoundersPrime"
                  className="relative w-full h-full object-contain group-hover:rotate-6 transition-transform duration-300"
                />
              </div>
              <span className="font-mono font-black text-base tracking-[0.18em] text-white uppercase whitespace-nowrap">
                FOUNDERS<span className="text-accent-yellow">[</span>PRIME<span className="text-accent-yellow">]</span>
              </span>
            </Link>
            <p className="font-sans text-sm text-gray-400 leading-relaxed">
              The intelligence terminal for bootstrapped founders. Save runway. Skip the dilution. Ship faster.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-1.5 mt-1">
              <span className="inline-flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-gray-300">
                <span className="material-symbols-outlined text-[12px] text-accent-yellow">verified</span>
                Verified deals
              </span>
              <span className="inline-flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-gray-300">
                <span className="material-symbols-outlined text-[12px] text-green-400">lock</span>
                Secure checkout
              </span>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2 mt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group w-9 h-9 bg-white/5 border border-white/15 flex items-center justify-center transition-all hover:-translate-y-0.5 hover:border-white/40 ${s.bg}`}
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
                        className="font-sans text-sm text-gray-400 no-underline hover:text-white hover:translate-x-0.5 transition-all inline-block"
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
          <div className="md:hidden flex flex-col w-full gap-1">
            {footerSections.map((section) => (
              <details key={section.title} className="group border-b border-white/10">
                <summary className="flex justify-between items-center font-mono text-[11px] font-black tracking-widest uppercase text-accent-yellow cursor-pointer list-none py-3 outline-none">
                  {section.title}
                  <span className="material-symbols-outlined text-base text-gray-400 transition-transform group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <ul className="flex flex-col gap-3 pb-3 pl-1 list-none m-0">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={link.href} className="font-sans text-sm text-gray-400 no-underline">
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
      <div className="relative border-t border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-3 md:py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
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
