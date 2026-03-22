import Link from 'next/link'
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
    <footer className="bg-background-light border-t border-[#e5e5e5]">
      {/* ── Main grid ── */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 pt-6 pb-4">

        {/* Brand row and Full link grid combined for better desktop flow */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-2 lg:max-w-[240px]">
            <Link href="/" className="inline-flex items-center gap-2 no-underline w-fit">
              <div className="w-[16px] h-[16px] relative flex-shrink-0">
                <img
                  src="/logo.svg"
                  alt="FoundersPrime Logo"
                  width={16}
                  height={16}
                  className="object-contain w-full h-full"
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
          <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-6 lg:ml-auto w-full lg:w-auto">
            {footerSections.map((section, index) => (
              <div key={index} className="flex flex-col gap-2">
                <p className="font-mono text-[10px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-0.5">
                  {section.title}
                </p>
                <ul className="flex flex-col gap-1 list-none p-0 m-0">
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

          {/* Mobile Accordion Links */}
          <div className="md:hidden flex flex-col w-full gap-2 mt-4 lg:ml-auto">
            {footerSections.map(section => (
              <details key={section.title} className="group border-b border-gray-200 pb-2">
                <summary className="flex justify-between items-center font-mono text-[11px] font-bold tracking-[0.1em] uppercase text-gray-700 cursor-pointer list-none py-2 outline-none">
                  {section.title}
                  <span className="material-symbols-outlined text-sm transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <ul className="flex flex-col gap-3 pt-2 pb-2 pl-1 list-none m-0">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="font-mono text-[12px] text-gray-500 no-underline"
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
      <div className="border-t border-[#f0f0f0] bg-background-light">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-2 md:py-3 flex flex-col sm:flex-row justify-between items-center gap-4">
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
