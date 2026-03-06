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
    <footer style={{ backgroundColor: '#fafafa', borderTop: '1px solid #e5e5e5' }}>
      {/* Main footer body */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 24px 48px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '40px 32px',
          alignItems: 'start'
        }}>

          {/* Brand column — always full width on mobile */}
          <div style={{
            gridColumn: '1 / -1',
            marginBottom: '8px'
          }}
            className="footer-brand-col"
          >
            {/* Inner wrapper so brand + tagline sit side-by-side on md+ */}
            <div className="footer-brand-inner">
              <Link href="/" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none'
              }}>
                <div style={{ width: '22px', height: '22px', position: 'relative', flexShrink: 0 }}>
                  <Image src="/logo.svg" alt="FoundersPrime Logo" fill className="object-contain" sizes="22px" />
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontWeight: 700,
                  fontSize: '15px',
                  letterSpacing: '0.04em',
                  color: '#0a0a0a'
                }}>
                  FOUNDERS<span style={{ color: '#2563eb' }}>[</span>PRIME<span style={{ color: '#2563eb' }}>]</span>
                </span>
              </Link>
              <p style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '12px',
                color: '#6b7280',
                lineHeight: 1.65,
                marginTop: '10px',
                maxWidth: '260px'
              }}>
                The unfair advantage for bootstrapped and funded startups. Save money, extend runway, build faster.
              </p>
            </div>
          </div>

          {/* Nav columns */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <p style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#9ca3af',
                marginBottom: '14px'
              }}>
                {section.title}
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="footer-nav-link"
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '13px',
                        color: '#374151',
                        textDecoration: 'none',
                        display: 'inline-block',
                        transition: 'color 0.15s ease'
                      }}
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

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #e5e5e5', backgroundColor: '#f3f4f6' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '14px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '11px',
            fontWeight: 600,
            color: '#6b7280'
          }}>
            © 2026 FoundersPrime. Built by founders, for founders.
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <GoogleTranslate />
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#374151',
              padding: '5px 10px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              backgroundColor: '#fff'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', animation: 'pulse 2s infinite' }} />
              System Status: Operational
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Hover state for nav links */
        :global(.footer-nav-link:hover) {
          color: #0a0a0a !important;
        }

        /* On md+ screens: brand col is only 2 grid columns wide, not full-width */
        @media (min-width: 640px) {
          :global(.footer-brand-col) {
            grid-column: 1 / 3 !important;
          }
          :global(.footer-brand-inner) {
            display: flex;
            flex-direction: column;
          }
        }

        /* On larger screens keep brand as its own column beside nav */
        @media (min-width: 900px) {
          :global(.footer-brand-col) {
            grid-column: 1 / 1 !important;
            margin-bottom: 0 !important;
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </footer>
  )
}
