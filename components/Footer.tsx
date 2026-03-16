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
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 md:pt-12 pb-6 md:pb-10">

        {/* Brand row and Full link grid combined for better desktop flow */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 md:gap-12">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-3 lg:max-w-[240px]">
            <Link href="/" className="inline-flex items-center gap-2 no-underline w-fit">
              <div className="w-[18px] h-[18px] relative flex-shrink-0">
                <Image
                  src="/logo.svg"
                  alt="FoundersPrime Logo"
                  fill
                  className="object-contain"
                  sizes="18px"
                />
              </div>
              <span className="font-mono font-bold text-[13px] tracking-widest text-[#0a0a0a] uppercase">
                FOUNDERS<span className="text-blue-600">[</span>PRIME<span className="text-blue-600">]</span>
              </span>
            </Link>
            <p className="font-mono text-[11px] text-gray-400 leading-relaxed">
              The unfair advantage for bootstrapped startups. Save money, extend runway, build faster.
            </p>
          </div>

          {/* Link Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-4 gap-y-8 flex-1 lg:justify-items-end">
            {footerSections.map((section, index) => (
              <div key={index} className="flex flex-col gap-3 min-w-[120px]">
                <p className="font-mono text-[10px] font-bold tracking-[0.1em] uppercase text-gray-500">
                  {section.title}
                </p>
                <ul className="flex flex-col gap-[6px] list-none p-0 m-0">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="font-mono text-[11px] text-gray-400 no-underline hover:text-gray-900 transition-colors duration-150"
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
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[#f0f0f0] bg-[#fafafa]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-mono text-[10px] text-gray-400 text-center sm:text-left">
            © 2026 FoundersPrime. Built by founders, for founders.
          </span>

          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
            <GoogleTranslate />
            <div className="inline-flex items-center gap-2 font-mono text-[9px] font-bold tracking-widest uppercase text-gray-400 px-2 py-1 bg-white border border-[#e5e5e5]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
