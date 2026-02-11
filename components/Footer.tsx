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
        { text: "Startup Ideas", href: "/ideas" },
        { text: "Community", href: "/community" }
      ]
    },
    {
      title: "Resources",
      links: [
        { text: "Templates & Guides", href: "/resources" },
        { text: "Blog", href: "/blog" },
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
    <footer className="bg-white text-black border-t-2 border-black pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-7 gap-8 mb-12">
          <div className="col-span-2">
            <Link className="text-2xl font-bold tracking-tight text-black flex items-center gap-2 mb-4 font-mono" href="/">
              <div className="w-6 h-6 relative">
                <img src="/logo.svg" alt="FoundersPrime Logo" className="w-full h-full object-contain" />
              </div>
              <span>FOUNDERS<span className="text-blue-600">[</span>PRIME<span className="text-blue-600">]</span></span>
            </Link>
            <p className="text-gray-600 text-sm max-w-xs font-mono">The unfair advantage for bootstrapped and funded startups. Save money, extend runway, build faster.</p>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-bold mb-4 font-mono uppercase text-sm border-b-2 border-black inline-block pb-1">{section.title}</h4>
              <ul className="space-y-2 text-sm text-gray-600 font-mono">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link className="hover:text-primary hover:underline" href={link.href}>{link.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t-2 border-black py-4 bg-[#f6f6f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs font-bold font-mono">© 2026 FoundersPrime. Built by founders, for founders.</div>
          <div className="flex items-center gap-4">
            <GoogleTranslate />
            <div className="flex items-center gap-2 text-xs font-bold px-3 py-1 bg-white border border-black rounded-none font-mono uppercase">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              System Status: Operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
