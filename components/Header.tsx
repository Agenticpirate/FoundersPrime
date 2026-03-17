'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth/hooks'
import { useEffect, useState } from 'react'
import { checkProStatus } from '@/lib/auth/user-context'

export default function Header() {
  const { user, loading, signOut } = useAuth()
  const [isPro, setIsPro] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAccess = async () => {
      if (user) {
        const { isPro: hasProAccess, isAdmin: hasAdminAccess } = await checkProStatus()
        setIsPro(hasProAccess)
        setIsAdmin(hasAdminAccess)
      }
    }
    checkAccess()
  }, [user])

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  // Close mobile menu when route changes or user logs out
  useEffect(() => {
    setMobileMenuOpen(false)
    setExpandedSection(null)
  }, [user])

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? null : section)
  }

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
      ]
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
        { label: 'Funding & Opps', href: '/resources/funding-opportunities', icon: 'monetization_on' },
      ]
    },
    {
      id: 'studentbenefits',
      label: 'Student Benefits',
      href: '#',
      icon: 'school',
      children: [
        { label: 'Campus Edge', href: '/resources/free-access', icon: 'workspace_premium' },
        { label: 'Credits & Savings', href: '/resources/credits-savings', icon: 'savings' },
      ]
    },
    {
      id: 'resources',
      label: 'Resources',
      href: '/resources',
      icon: 'folder_open',
      children: [
        { label: 'Templates & Guides', href: '/resources', icon: 'description' },
        { label: 'Verified Startups', href: '/startups', icon: 'verified' },
        { label: 'Startup Ideas', href: '/ideas', icon: 'emoji_objects' },
        { label: 'Contact', href: '/contact', icon: 'mail' },
      ]
    },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[#f6f8f8] border-b-2 border-black">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-20 gap-4">
          <div className="flex-shrink-0 flex items-center">
            <Link className="text-xl md:text-2xl font-bold tracking-tighter text-black flex items-center gap-2 font-mono" href="/">
              <div className="w-8 h-8 relative">
                <img src="/logo.svg" alt="FoundersPrime Logo" className="w-full h-full object-contain" />
              </div>
              <span>FOUNDERS<span className="text-blue-600">[</span>PRIME<span className="text-blue-600">]</span></span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-6 items-center font-mono text-sm uppercase tracking-tight">
            {/* Deals Dropdown */}
            <div className="relative group">
              <Link className="text-black font-bold hover:text-primary flex items-center gap-1 py-6" href="/deals">
                Deals <span className="material-symbols-outlined text-sm">expand_more</span>
              </Link>
              <div className="absolute left-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out z-50">
                <div className="bg-white border-3 border-black shadow-[6px_6px_0px_#111111] min-w-[220px]">
                  <Link href="/deals" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">local_offer</span>
                    All Deals
                  </Link>
                  <Link href="/deals/cloud-credits" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">cloud</span>
                    Cloud Credits
                  </Link>
                  <Link href="/deals/saas-discounts" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">apps</span>
                    SaaS Discounts
                  </Link>
                  <Link href="/deals/ad-credits" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">campaign</span>
                    Ad Credits
                  </Link>
                </div>
              </div>
            </div>

            {/* Programs Dropdown */}
            <div className="relative group">
              <Link className="text-black font-bold hover:text-primary flex items-center gap-1 py-6" href="/deals/accelerators">
                Programs <span className="material-symbols-outlined text-sm">expand_more</span>
              </Link>
              <div className="absolute left-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out z-50">
                <div className="bg-white border-3 border-black shadow-[6px_6px_0px_#111111] min-w-[220px]">
                  <Link href="/deals/accelerators" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">rocket_launch</span>
                    Accelerators
                  </Link>
                  <Link href="/deals/incubators" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">lightbulb</span>
                    Incubators
                  </Link>
                  <Link href="/deals/grants" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">payments</span>
                    Grants
                  </Link>
                  <Link href="/resources/funding-opportunities" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">monetization_on</span>
                    Funding &amp; Opportunities
                  </Link>
                </div>
              </div>
            </div>

            {/* Student Benefits Dropdown */}
            <div className="relative group">
              <Link className="text-black font-bold hover:text-primary flex items-center gap-1 py-6" href="#">
                <span className="relative inline-block">
                  Student Benefits 
                  <span className="absolute -top-3 -right-6 rotate-[12deg] bg-[#FF90E8] text-black text-[9px] px-1.5 py-0.5 border border-black font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] leading-none z-10">
                    FREE
                  </span>
                </span>
                <span className="material-symbols-outlined text-sm ml-1">expand_more</span>
              </Link>
              <div className="absolute left-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out z-50">
                <div className="bg-white border-3 border-black shadow-[6px_6px_0px_#111111] min-w-[240px]">
                  <Link href="/resources/free-access" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">workspace_premium</span>
                    Campus Edge
                  </Link>
                  <Link href="/resources/credits-savings" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">savings</span>
                    Credits &amp; Savings
                  </Link>
                </div>
              </div>
            </div>

            {/* Resources Dropdown */}
            <div className="relative group">
              <Link className="text-black font-bold hover:text-primary flex items-center gap-1 py-6" href="/resources">
                Resources <span className="material-symbols-outlined text-sm">expand_more</span>
              </Link>
              <div className="absolute left-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out z-50">
                <div className="bg-white border-3 border-black shadow-[6px_6px_0px_#111111] min-w-[220px]">
                  <Link href="/startups" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">verified</span>
                    Verified Startups
                  </Link>
                  <Link href="/ideas" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">emoji_objects</span>
                    Startup Ideas
                  </Link>
                  <Link href="/resources" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">folder_open</span>
                    Templates &amp; Guides
                  </Link>
                  <Link href="/contact" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">mail</span>
                    Contact
                  </Link>
                </div>
              </div>
            </div>

            <Link className="text-black font-bold hover:text-primary" href="/pricing">Pricing</Link>

          </nav>

          <div className="hidden md:flex items-center gap-4">
            {loading ? (
              <div className="w-24 h-10 bg-gray-200 animate-pulse"></div>
            ) : user ? (
              <>

                <div className="relative group">
                  <button className="neo-border neo-shadow bg-white text-black font-mono font-bold py-2 px-4 rounded-none text-sm transition-all uppercase flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">account_circle</span>
                    {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
                    {isPro && (
                      <span className="bg-accent-yellow text-black text-xs px-2 py-0.5 rounded-sm border border-black font-bold ml-1">
                        PRO
                      </span>
                    )}
                    {isAdmin && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-sm border border-black font-bold ml-1">
                        ADMIN
                      </span>
                    )}
                    <span className="material-symbols-outlined text-sm">expand_more</span>
                  </button>
                  <div className="absolute right-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out z-50">
                    <div className="bg-white border-3 border-black shadow-[6px_6px_0px_#111111] min-w-[180px]">
                      <Link href="/dashboard" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">dashboard</span>
                        Dashboard
                      </Link>
                      {isAdmin && (
                        <Link href="/admin" className="block px-4 py-3 text-sm font-bold hover:bg-red-50 border-b border-black/10 flex items-center gap-2 text-red-600">
                          <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
                          Admin Panel
                        </Link>
                      )}
                      <Link href="/billing" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">credit_card</span>
                        Billing
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="w-full text-left px-4 py-3 text-sm font-bold hover:bg-red-100 text-red-600 flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-lg">logout</span>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link className="text-black font-mono font-bold text-sm hover:underline uppercase" href="/login">Log In</Link>
                <Link href="/pricing" className="neo-border neo-shadow bg-accent-yellow text-black font-mono font-bold py-2 px-5 rounded-none text-sm transition-all uppercase flex items-center gap-2">
                  Get Started
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              className="text-black p-2 neo-border bg-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu — Accordion style with sub-menus */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 bg-white border-b-2 border-black shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-40 animate-slideDown max-h-[80vh] overflow-y-auto">
            <div className="px-3 py-2">

              {/* Accordion Nav Sections */}
              <div className="flex flex-col divide-y divide-black/8">
                {mobileNavSections.map((section) => (
                  <div key={section.id}>
                    {/* Section Header Row */}
                    <div className="flex items-center">
                      <Link
                        href={section.children && section.children.length > 0 ? '#' : section.href}
                        onClick={(e) => {
                          if (section.children && section.children.length > 0) {
                            e.preventDefault();
                            toggleSection(section.id);
                          } else {
                            setMobileMenuOpen(false);
                          }
                        }}
                        className="flex-1 flex items-center gap-2 py-3 text-xs font-mono font-black border-transparent border-b hover:border-black/5 uppercase text-black transition-colors relative"
                      >
                        <span className="material-symbols-outlined text-base text-gray-500">{section.icon}</span>
                        <span className="relative inline-block pr-6">
                          {section.label}
                          {section.id === 'studentbenefits' && (
                            <span className="absolute -top-2 right-0 rotate-[12deg] bg-[#FF90E8] text-black text-[8px] px-1 py-0.5 border border-black font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] leading-none z-10 w-fit h-fit">
                              FREE
                            </span>
                          )}
                        </span>
                      </Link>
                      {section.children && section.children.length > 0 && (
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="p-3 text-black hover:bg-gray-50 rounded-sm"
                          aria-label={`Expand ${section.label}`}
                        >
                          <span className="material-symbols-outlined text-sm transition-transform duration-300 ease-out" style={{ transform: expandedSection === section.id ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                            expand_more
                          </span>
                        </button>
                      )}
                    </div>

                    {/* Sub-links */}
                    {expandedSection === section.id && section.children && section.children.length > 0 && (
                      <div className="ml-6 mb-2 flex flex-col gap-0.5 bg-gray-50 border border-black/8 rounded-sm overflow-hidden animate-slideDown">
                        {section.children.map((child: any) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-3 text-[11px] font-mono font-bold uppercase text-gray-700 hover:bg-primary/10 hover:text-black border-b border-black/5 last:border-0 transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm text-gray-400">{child.icon}</span>
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Standalone links */}
                <Link
                  href="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-3 text-xs font-mono font-black uppercase text-black hover:bg-gray-50"
                >
                  <span className="material-symbols-outlined text-base text-gray-500">sell</span>
                  Pricing
                </Link>
                <Link
                  href="/ideas"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-3 text-xs font-mono font-black uppercase text-black hover:bg-gray-50"
                >
                  <span className="material-symbols-outlined text-base text-gray-500">emoji_objects</span>
                  Ideas
                </Link>
                <Link
                  href="/startups"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-3 text-xs font-mono font-black uppercase text-black hover:bg-gray-50"
                >
                  <span className="material-symbols-outlined text-base text-gray-500">verified</span>
                  Startups
                </Link>
              </div>

              <div className="border-t border-black/10 mt-2 pt-2">
                {/* Auth row */}
                {user ? (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                      <span className="material-symbols-outlined text-base text-gray-500">account_circle</span>
                      <span className="text-xs font-mono font-bold truncate">{user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}</span>
                      {isPro && <span className="bg-accent-yellow text-black text-[9px] px-1.5 py-0.5 font-bold uppercase border border-black">PRO</span>}
                    </div>
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-[11px] font-mono font-bold uppercase px-3 py-1.5 border border-black hover:bg-black hover:text-white transition-all">
                      Dashboard
                    </Link>
                    <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="text-[11px] font-mono font-bold uppercase px-3 py-1.5 border border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                      Out
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center py-2 text-xs font-mono font-bold uppercase border-2 border-black hover:bg-black hover:text-white transition-all">
                      Log In
                    </Link>
                    <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center py-2 text-xs font-mono font-bold uppercase border-2 border-black bg-accent-yellow hover:bg-yellow-400 transition-all">
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  )
}
