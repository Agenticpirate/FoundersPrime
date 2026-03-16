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
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 md:pt-14 pb-4 md:pb-12">

        {/* Brand row — compact on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5 md:mb-0 pb-4 md:pb-0 border-b md:border-b-0 border-[#e5e5e5]">
          <div className="flex flex-col gap-2">
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
            <p className="font-mono text-[11px] text-gray-400 leading-relaxed max-w-[220px]">
              The unfair advantage for bootstrapped startups. Save money, extend runway, build faster.
            </p>
          </div>

          {/* Mobile: show a quick 2×3 link grid of most important links */}
          <div className="sm:hidden grid grid-cols-2 gap-x-6 gap-y-1.5">
            {[
              { text: 'All Deals', href: '/deals' },
              { text: 'Cloud Credits', href: '/deals/cloud-credits' },
              { text: 'Grants', href: '/programs/grants' },
              { text: 'Accelerators', href: '/programs/accelerators' },
              { text: 'Pricing', href: '/pricing' },
              { text: 'About', href: '/about' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="font-mono text-[11px] text-gray-500 hover:text-gray-900 transition-colors">
                {link.text}
              </Link>
            ))}
          </div>
        </div>

        {/* Full link grid — hidden on mobile, shown on sm+ */}
        <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10 mt-6 md:mt-12">
          {footerSections.map((section, index) => (
            <div key={index} className="flex flex-col gap-4">
              <p className="font-mono text-[10px] font-semibold tracking-[0.14em] uppercase text-gray-400">
                {section.title}
              </p>
              <ul className="flex flex-col gap-[7px] list-none p-0 m-0">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="font-mono text-[12px] text-gray-500 no-underline hover:text-gray-900 transition-colors duration-150"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="font-mono text-[10px] font-medium text-gray-400 text-center sm:text-left leading-relaxed">
            © 2026 FoundersPrime. Built by founders, for founders.
          </span>

          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
            <GoogleTranslate />
            <div className="inline-flex items-center gap-[5px] font-mono text-[9px] font-bold tracking-[0.06em] uppercase text-gray-600 px-2.5 py-[4px] bg-white border border-[#d1d5db] rounded-[4px]">
              <span className="w-[5px] h-[5px] rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              Operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
