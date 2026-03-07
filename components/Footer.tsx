import Link from 'next/link'
import Image from 'next/image'
import GoogleTranslate from './GoogleTranslate'

export default function Footer() {
  const footerSections = [
    {
      title: "Deals",
      links: [
        { text: "All Deals", href: "/deals" },
        { text: "Cloud Credits", href: "/deals/cloud-credits" },
        { text: "SaaS Discounts", href: "/deals/saas-discounts" },
        { text: "Grants", href: "/programs/grants" },
        { text: "Ad Credits", href: "/deals/ad-credits" },
        { text: "Accelerators", href: "/programs/accelerators" },
        { text: "Incubators", href: "/programs/incubators" }
      ]
    },
    {
      title: "Startups",
      links: [
        { text: "Funded Database", href: "/startups" },
        { text: "Startup Ideas", href: "/ideas" }
      ]
    },
    {
      title: "Resources",
      links: [
        { text: "Templates & Guides", href: "/resources" },
        { text: "Search", href: "/search" }
      ]
    },
    {
      title: "Company",
      links: [
        { text: "About", href: "/about" },
        { text: "Pricing", href: "/pricing" },
        { text: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Legal",
      links: [
        { text: "Privacy Policy", href: "/privacy" },
        { text: "Terms of Service", href: "/terms" },
        { text: "Cookie Policy", href: "/cookie-policy" },
        { text: "Refund Policy", href: "/refund-policy" }
      ]
    }
  ]

  return (
    <footer className="bg-[#fafafa] border-t border-[#e5e5e5]">
      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-8 md:pt-14 pb-6 md:pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-x-8 gap-y-10">

          {/* Brand — full width on mobile, 2 cols on sm, 2 cols on lg */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 flex flex-col gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 no-underline w-fit"
            >
              <div className="w-[20px] h-[20px] relative flex-shrink-0">
                <Image
                  src="/logo.svg"
                  alt="FoundersPrime Logo"
                  fill
                  className="object-contain"
                  sizes="20px"
                />
              </div>
              <span className="font-mono font-bold text-[14px] tracking-widest text-[#0a0a0a] uppercase">
                FOUNDERS<span className="text-blue-600">[</span>PRIME<span className="text-blue-600">]</span>
              </span>
            </Link>
            <p className="font-mono text-[12px] text-gray-400 leading-relaxed max-w-[240px]">
              The unfair advantage for bootstrapped and funded startups. Save money, extend runway, build faster.
            </p>
          </div>

          {/* Nav columns */}
          {footerSections.map((section, index) => (
            <div key={index} className="flex flex-col gap-3">
              {/* Section label — no underline, muted caps */}
              <p className="font-mono text-[10px] font-semibold tracking-[0.14em] uppercase text-gray-400">
                {section.title}
              </p>
              <ul className="flex flex-col gap-[8px] list-none p-0 m-0">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="font-mono text-[12.5px] text-gray-500 no-underline hover:text-gray-900 transition-colors duration-150"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[#e5e5e5] bg-[#f3f4f6]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="font-mono text-[11px] font-medium text-gray-400">
            © 2026 FoundersPrime. Built by founders, for founders.
          </span>

          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
            <GoogleTranslate />
            <div className="inline-flex items-center gap-[6px] font-mono text-[10px] font-bold tracking-[0.08em] uppercase text-gray-600 px-3 py-[5px] bg-white border border-[#d1d5db] rounded-[4px]">
              <span className="w-[6px] h-[6px] rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              System Status: Operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
