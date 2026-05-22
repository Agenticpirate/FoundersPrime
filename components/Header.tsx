'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth/hooks'
import { useEffect, useRef, useState } from 'react'
import { checkProStatus } from '@/lib/auth/user-context'

export default function Header() {
  const { user, loading, signOut } = useAuth()
  const [isPro, setIsPro] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const hasCheckedRef = useRef<string | null>(null)

  useEffect(() => {
    const checkAccess = async () => {
      if (user && hasCheckedRef.current !== user.id) {
        hasCheckedRef.current = user.id
        const { isPro: hasProAccess, isAdmin: hasAdminAccess } = await checkProStatus()
        setIsPro(hasProAccess)
        setIsAdmin(hasAdminAccess)
      } else if (!user) {
        hasCheckedRef.current = null
        setIsPro(false)
        setIsAdmin(false)
      }
    }
    checkAccess()
  }, [user])

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  useEffect(() => {
    setMobileMenuOpen(false)
    setExpandedSection(null)
  }, [user])

  const toggleSection = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section))
  }

  const dropdownClasses =
    'invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out absolute left-0 top-full pt-2 z-50'
  const dropdownPanelClasses =
    'relative bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,221,0,0.08)] min-w-[240px] overflow-hidden header-dropdown-panel'
  const dropdownItemClasses =
    'group/item relative flex items-center gap-3 px-4 py-3 text-[11.5px] font-mono font-bold uppercase tracking-[0.04em] text-gray-300 hover:bg-white/[0.04] hover:text-accent-yellow border-b border-white/[0.06] last:border-0 transition-all'

  const mobileNavSections = [
    {
      id: 'deals',
      label: 'Deals',
      href: '/deals',
      icon: 'local_offer',
      children: [
        { label: 'All Deals', href: '/deals', icon: 'grid_view' },
        { label: 'Cloud Credits', href: '/deals/cloud-credits', icon: 'cloud' },
        { label: 'SaaS Discounts', href: '/deals/saas-discounts', icon: 'apps' },
        { label: 'Ad Credits', href: '/deals/ad-credits', icon: 'campaign' },
      ],
    },
    {
      id: 'programs',
      label: 'Programs',
      href: '/deals/accelerators',
      icon: 'rocket_launch',
      children: [
        { label: 'Accelerators', href: '/deals/accelerators', icon: 'rocket_launch' },
        { label: 'Incubators', href: '/deals/incubators', icon: 'lightbulb' },
        { label: 'Grants', href: '/deals/grants', icon: 'payments' },
      ],
    },
    {
      id: 'studentbenefits',
      label: 'Student Benefits',
      href: '#',
      icon: 'school',
      children: [
        { label: 'Funding & Opportunities', href: '/resources/funding-opportunities', icon: 'monetization_on' },
        { label: 'Campus Edge', href: '/resources/free-access', icon: 'workspace_premium' },
        { label: 'Credits & Savings', href: '/resources/credits-savings', icon: 'savings' },
      ],
    },
    {
      id: 'resources',
      label: 'Resources',
      href: '/resources',
      icon: 'folder_open',
      children: [
        { label: 'Verified Startups', href: '/startups', icon: 'verified' },
        { label: 'Startup Ideas', href: '/ideas', icon: 'emoji_objects' },
        { label: 'Templates & Guides', href: '/resources', icon: 'description' },
        { label: 'Contact', href: '/contact', icon: 'mail' },
      ],
    },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-xl text-white border-b border-white/10 shadow-[0_1px_0_0_rgba(255,221,0,0.18),0_8px_30px_-12px_rgba(0,0,0,0.8)] relative overflow-visible">
      {/* Animated gradient sweep on the very top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden pointer-events-none">
        <div
          className="h-full w-[200%] header-gradient-sweep"
          style={{
            background:
              'linear-gradient(90deg, transparent, transparent 30%, rgba(255,221,0,0.7) 50%, transparent 70%, transparent)',
          }}
        />
      </div>

      {/* Soft glow halo under the header */}
      <div
        className="absolute -bottom-px left-1/2 -translate-x-1/2 w-[60%] h-[1px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,221,0,0.35), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-14 md:h-16 gap-4">

          {/* ─── Brand — original logo ─── */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 no-underline group"
            >
              <div className="relative w-8 h-8 flex-shrink-0">
                <span className="absolute inset-0 rounded-sm bg-accent-yellow/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                <img
                  src="/logo-white.svg"
                  alt="FoundersPrime"
                  className="relative w-full h-full object-contain group-hover:rotate-6 transition-transform duration-300"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
              <span className="font-mono font-black text-base md:text-[17px] tracking-[0.18em] text-white uppercase whitespace-nowrap">
                FOUNDERS<span className="text-accent-yellow">[</span>PRIME<span className="text-accent-yellow">]</span>
              </span>
            </Link>
          </div>

          {/* ─── Desktop nav ─── */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 font-mono text-[12px] uppercase tracking-[0.06em]">
            {/* Deals */}
            <div className="relative group">
              <Link
                href="/deals"
                className="header-nav-link relative text-gray-200 font-bold hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-white/[0.05] transition-all"
              >
                <span className="header-nav-text">Deals</span>
                <span className="material-symbols-outlined text-[14px] text-gray-500 transition-all duration-300 group-hover:rotate-180 group-hover:text-accent-yellow">expand_more</span>
              </Link>
              <div className={dropdownClasses}>
                <div className={dropdownPanelClasses}>
                  <Link href="/deals" className={dropdownItemClasses}>
                    <span className="material-symbols-outlined text-base text-accent-yellow">grid_view</span>
                    All Deals
                  </Link>
                  <Link href="/deals/cloud-credits" className={dropdownItemClasses}>
                    <span className="material-symbols-outlined text-base text-sky-400">cloud</span>
                    Cloud Credits
                  </Link>
                  <Link href="/deals/saas-discounts" className={dropdownItemClasses}>
                    <span className="material-symbols-outlined text-base text-purple-400">apps</span>
                    SaaS Discounts
                  </Link>
                  <Link href="/deals/ad-credits" className={dropdownItemClasses}>
                    <span className="material-symbols-outlined text-base text-pink-400">campaign</span>
                    Ad Credits
                  </Link>
                </div>
              </div>
            </div>

            {/* Programs */}
            <div className="relative group">
              <Link
                href="/deals/accelerators"
                className="header-nav-link relative text-gray-200 font-bold hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-white/[0.05] transition-all"
              >
                <span className="header-nav-text">Programs</span>
                <span className="material-symbols-outlined text-[14px] text-gray-500 transition-all duration-300 group-hover:rotate-180 group-hover:text-accent-yellow">expand_more</span>
              </Link>
              <div className={dropdownClasses}>
                <div className={dropdownPanelClasses}>
                  <Link href="/deals/accelerators" className={dropdownItemClasses}>
                    <span className="material-symbols-outlined text-base text-orange-400">rocket_launch</span>
                    Accelerators
                  </Link>
                  <Link href="/deals/incubators" className={dropdownItemClasses}>
                    <span className="material-symbols-outlined text-base text-yellow-400">lightbulb</span>
                    Incubators
                  </Link>
                  <Link href="/deals/grants" className={dropdownItemClasses}>
                    <span className="material-symbols-outlined text-base text-green-400">payments</span>
                    Grants
                  </Link>
                </div>
              </div>
            </div>

            {/* Student Benefits */}
            <div className="relative group">
              <Link
                href="#"
                className="header-nav-link relative text-gray-200 font-bold hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-white/[0.05] transition-all"
              >
                <span className="header-nav-text">Student Benefits</span>
                <span className="material-symbols-outlined text-[14px] text-gray-500 transition-all duration-300 group-hover:rotate-180 group-hover:text-accent-yellow">expand_more</span>
              </Link>
              <div className={dropdownClasses}>
                <div className={dropdownPanelClasses}>
                  <Link href="/resources/funding-opportunities" className={dropdownItemClasses}>
                    <span className="material-symbols-outlined text-base text-emerald-400">monetization_on</span>
                    Funding &amp; Opportunities
                  </Link>
                  <Link href="/resources/free-access" className={dropdownItemClasses}>
                    <span className="material-symbols-outlined text-base text-pink-400">workspace_premium</span>
                    Campus Edge
                  </Link>
                  <Link href="/resources/credits-savings" className={dropdownItemClasses}>
                    <span className="material-symbols-outlined text-base text-green-400">savings</span>
                    Credits &amp; Savings
                  </Link>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="relative group">
              <Link
                href="/resources"
                className="header-nav-link relative text-gray-200 font-bold hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-white/[0.05] transition-all"
              >
                <span className="header-nav-text">Resources</span>
                <span className="material-symbols-outlined text-[14px] text-gray-500 transition-all duration-300 group-hover:rotate-180 group-hover:text-accent-yellow">expand_more</span>
              </Link>
              <div className={dropdownClasses}>
                <div className={dropdownPanelClasses}>
                  <Link href="/startups" className={dropdownItemClasses}>
                    <span className="material-symbols-outlined text-base text-blue-400">verified</span>
                    Verified Startups
                  </Link>
                  <Link href="/ideas" className={dropdownItemClasses}>
                    <span className="material-symbols-outlined text-base text-yellow-400">emoji_objects</span>
                    Startup Ideas
                  </Link>
                  <Link href="/resources" className={dropdownItemClasses}>
                    <span className="material-symbols-outlined text-base text-cyan-400">description</span>
                    Templates &amp; Guides
                  </Link>
                  <Link href="/contact" className={dropdownItemClasses}>
                    <span className="material-symbols-outlined text-base text-gray-400">mail</span>
                    Contact
                  </Link>
                </div>
              </div>
            </div>

            {/* Vertical divider */}
            <span className="hidden lg:block w-px h-5 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-2" aria-hidden="true" />

            <Link
              href="/pricing"
              className="header-nav-link relative text-accent-yellow font-bold hover:text-white flex items-center gap-2 px-3 py-2 rounded-sm hover:bg-accent-yellow/[0.08] transition-all"
            >
              <span className="header-nav-text">Pricing</span>
              <span className="hidden lg:inline-flex items-center gap-1 bg-accent-yellow text-black text-[8px] font-black uppercase tracking-[0.12em] px-1.5 py-0.5 leading-none animate-pulse-subtle shadow-[0_0_12px_rgba(255,221,0,0.4)]">
                <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                Sale
              </span>
            </Link>
          </nav>

          {/* ─── Right: Auth / CTA ─── */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="w-24 h-9 bg-white/10 animate-pulse rounded-sm" />
            ) : user ? (
              <div className="relative group">
                <button className="bg-white/[0.04] border border-white/10 hover:border-accent-yellow/40 text-white font-mono font-bold py-2 px-3 text-[12px] rounded-md transition-all uppercase tracking-[0.06em] flex items-center gap-2 hover:bg-white/[0.08]">
                  <span className="material-symbols-outlined text-base text-accent-yellow">account_circle</span>
                  <span className="hidden lg:inline">{user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}</span>
                  {isPro && (
                    <span className="bg-accent-yellow text-black text-[9px] px-1.5 py-0.5 font-bold uppercase ml-0.5 rounded-sm tracking-wider">
                      PRO
                    </span>
                  )}
                  {isAdmin && (
                    <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 font-bold uppercase ml-0.5 rounded-sm tracking-wider">
                      ADMIN
                    </span>
                  )}
                  <span className="material-symbols-outlined text-[14px] text-gray-400">expand_more</span>
                </button>
                <div className="absolute right-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className={`${dropdownPanelClasses} min-w-[200px]`}>
                    <Link href="/dashboard" className={dropdownItemClasses}>
                      <span className="material-symbols-outlined text-base text-accent-yellow">dashboard</span>
                      Dashboard
                    </Link>
                    {isAdmin && (
                      <Link href="/admin" className={`${dropdownItemClasses} hover:!text-red-400`}>
                        <span className="material-symbols-outlined text-base text-red-400">admin_panel_settings</span>
                        Admin Panel
                      </Link>
                    )}
                    <Link href="/billing" className={dropdownItemClasses}>
                      <span className="material-symbols-outlined text-base text-green-400">credit_card</span>
                      Billing
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-[12px] font-mono font-black uppercase tracking-tight text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">logout</span>
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-300 font-mono font-bold text-[12px] hover:text-white uppercase tracking-[0.06em] px-3 py-2 rounded-md hover:bg-white/[0.05] transition-all"
                >
                  Log In
                </Link>
                <Link
                  href="/pricing"
                  className="relative group bg-accent-yellow text-black font-mono font-black py-2 px-4 text-[12px] uppercase tracking-[0.1em] flex items-center gap-1.5 rounded-md hover:bg-white transition-all overflow-hidden shadow-[0_4px_20px_-4px_rgba(255,221,0,0.5)] hover:shadow-[0_8px_30px_-4px_rgba(255,221,0,0.7)]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" aria-hidden="true" />
                  <span className="relative">Get Started</span>
                  <span className="material-symbols-outlined text-sm relative group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                </Link>
              </>
            )}
          </div>

          {/* ─── Mobile toggle ─── */}
          <div className="md:hidden flex items-center gap-2">
            <button
              className="text-white p-2 bg-white/5 border border-white/15 hover:bg-white/10 hover:border-accent-yellow transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {/* ─── Mobile Menu ─── */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 bg-black text-white border-b-2 border-accent-yellow shadow-[0_8px_24px_rgba(0,0,0,0.4)] z-40 animate-slideDown max-h-[80vh] overflow-y-auto">
            <div className="px-3 py-2">
              <div className="flex flex-col divide-y divide-white/10">
                {mobileNavSections.map((section) => (
                  <div key={section.id}>
                    <div className="flex items-center">
                      <Link
                        href={section.children && section.children.length > 0 ? '#' : section.href}
                        onClick={(e) => {
                          if (section.children && section.children.length > 0) {
                            e.preventDefault()
                            toggleSection(section.id)
                          } else {
                            setMobileMenuOpen(false)
                          }
                        }}
                        className="flex-1 flex items-center gap-2.5 py-3 text-xs font-mono font-black uppercase text-white transition-colors"
                      >
                        <span
                          className={`w-7 h-7 flex items-center justify-center bg-white/5 border border-white/15 transition-transform duration-300 ${
                            expandedSection === section.id ? 'scale-110 rotate-[-4deg] bg-accent-yellow text-black border-accent-yellow' : 'text-accent-yellow'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">{section.icon}</span>
                        </span>
                        {section.label}
                      </Link>
                      {section.children && section.children.length > 0 && (
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="p-3 text-gray-400 hover:bg-white/5 hover:text-accent-yellow"
                          aria-label={`Expand ${section.label}`}
                        >
                          <span
                            className="material-symbols-outlined text-sm transition-transform duration-300 ease-out"
                            style={{ transform: expandedSection === section.id ? 'rotate(180deg)' : 'rotate(0deg)' }}
                          >
                            expand_more
                          </span>
                        </button>
                      )}
                    </div>

                    {expandedSection === section.id && section.children && section.children.length > 0 && (
                      <div className="ml-6 mb-2 flex flex-col bg-white/5 border border-white/10 overflow-hidden animate-slideDown">
                        {section.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 text-[11px] font-mono font-bold uppercase text-gray-300 hover:bg-white/10 hover:text-accent-yellow border-b border-white/10 last:border-0 transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm text-accent-yellow/70">{child.icon}</span>
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Pricing standalone */}
                <Link
                  href="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 py-3 text-xs font-mono font-black uppercase text-accent-yellow"
                >
                  <span className="w-7 h-7 flex items-center justify-center bg-accent-yellow text-black border border-accent-yellow">
                    <span className="material-symbols-outlined text-[16px]">sell</span>
                  </span>
                  Pricing
                </Link>
              </div>

              <div className="border-t border-white/10 mt-2 pt-3 pb-1">
                {user ? (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                      <span className="material-symbols-outlined text-base text-accent-yellow">account_circle</span>
                      <span className="text-xs font-mono font-bold truncate text-white">
                        {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
                      </span>
                      {isPro && (
                        <span className="bg-accent-yellow text-black text-[9px] px-1.5 py-0.5 font-bold uppercase border border-black">
                          PRO
                        </span>
                      )}
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[11px] font-mono font-bold uppercase px-3 py-1.5 border border-white/30 text-white hover:bg-accent-yellow hover:text-black hover:border-accent-yellow transition-all"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        signOut()
                        setMobileMenuOpen(false)
                      }}
                      className="text-[11px] font-mono font-bold uppercase px-3 py-1.5 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                    >
                      Out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center py-3 text-xs font-mono font-bold uppercase border border-white/30 text-white hover:bg-white/10 hover:border-accent-yellow transition-all"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/pricing"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center py-3 text-xs font-mono font-black uppercase border-2 border-accent-yellow bg-accent-yellow text-black hover:bg-white hover:border-white transition-all"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        /* Animated gradient sweep on top edge */
        @keyframes headerGradientSweep {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .header-gradient-sweep {
          animation: headerGradientSweep 6s linear infinite;
        }

        /* Hover underline reveal on nav links */
        .header-nav-link {
          position: relative;
        }
        .header-nav-text {
          position: relative;
        }
        .header-nav-text::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -6px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #FFD500, transparent);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .header-nav-link:hover .header-nav-text::after {
          transform: scaleX(1);
        }

        /* Dropdown panel top accent line */
        :global(.header-dropdown-panel)::before {
          content: '';
          position: absolute;
          top: 0;
          left: 12px;
          right: 12px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,221,0,0.4), transparent);
        }

        @media (prefers-reduced-motion: reduce) {
          .header-gradient-sweep {
            animation: none;
          }
          .header-nav-text::after {
            transition: none;
          }
        }
      `}</style>
    </header>
  )
}
