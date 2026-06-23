'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth/hooks'
import { useEffect, useRef, useState } from 'react'
import { checkProStatus } from '@/lib/auth/user-context'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

type PlanType = 'free' | 'nextfounder' | 'founder' | 'legend'

// Maps a paid plan to its display badge (label + styling).
const PLAN_BADGES: Record<Exclude<PlanType, 'free'>, { label: string; className: string }> = {
  nextfounder: {
    label: 'Next Founder',
    className: 'bg-sky-400 text-black',
  },
  founder: {
    label: 'Founder',
    className: 'bg-accent-yellow text-black',
  },
  legend: {
    label: 'Legend',
    className: 'bg-gradient-to-r from-amber-400 to-orange-500 text-black',
  },
}

export default function Header() {
  const { user, loading, signOut } = useAuth()
  const [plan, setPlan] = useState<PlanType>('free')
  const [isAdmin, setIsAdmin] = useState(false)
  const hasCheckedRef = useRef<string | null>(null)

  useEffect(() => {
    const checkAccess = async () => {
      if (user && hasCheckedRef.current !== user.id) {
        hasCheckedRef.current = user.id
        const { isAdmin: hasAdminAccess, user: profile } = await checkProStatus()
        setPlan(profile?.plan ?? 'free')
        setIsAdmin(hasAdminAccess)
      } else if (!user) {
        hasCheckedRef.current = null
        setPlan('free')
        setIsAdmin(false)
      }
    }
    checkAccess()
  }, [user])

  const planBadge = plan !== 'free' ? PLAN_BADGES[plan] : null

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
        { label: 'All Deals', href: '/deals', icon: 'grid_view', colorClass: 'text-accent-yellow' },
        { label: 'Cloud Credits', href: '/deals?category=cloud-credits', icon: 'cloud', colorClass: 'text-sky-400' },
        { label: 'SaaS Discounts', href: '/deals?category=saas-discounts', icon: 'apps', colorClass: 'text-purple-400' },
        { label: 'Ad Credits', href: '/deals?category=ad-credits', icon: 'campaign', colorClass: 'text-pink-400' },
      ],
    },
    {
      id: 'programs',
      label: 'Programs',
      href: '/programs',
      icon: 'rocket_launch',
      children: [
        { label: 'All Programs', href: '/programs', icon: 'grid_view', colorClass: 'text-accent-yellow' },
        { label: 'Accelerators', href: '/programs?type=accelerators', icon: 'rocket_launch', colorClass: 'text-orange-400' },
        { label: 'Incubators', href: '/programs?type=incubators', icon: 'lightbulb', colorClass: 'text-yellow-400' },
        { label: 'Grants', href: '/programs?type=grants', icon: 'payments', colorClass: 'text-green-400' },
      ],
    },
    {
      id: 'studentbenefits',
      label: 'Student Benefits',
      href: '#',
      icon: 'school',
      children: [
        { label: 'Funding & Opportunities', href: '/student-benefits?type=funding', icon: 'monetization_on', colorClass: 'text-emerald-400' },
        { label: 'Campus Edge', href: '/student-benefits?type=free-access', icon: 'workspace_premium', colorClass: 'text-pink-400' },
        { label: 'Credits & Savings', href: '/student-benefits?type=credits-savings', icon: 'savings', colorClass: 'text-green-400' },
      ],
    },
    {
      id: 'resources',
      label: 'Resources',
      href: '/resources',
      icon: 'folder_open',
      children: [
        { label: 'Verified Startups', href: '/startups', icon: 'verified', colorClass: 'text-blue-400' },
        { label: 'Startup Ideas', href: '/ideas', icon: 'emoji_objects', colorClass: 'text-yellow-400' },
        { label: 'Templates & Guides', href: '/resources', icon: 'description', colorClass: 'text-cyan-400' },
        { label: 'Contact', href: '/contact', icon: 'mail', colorClass: 'text-gray-400' },
      ],
    },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#000000]/95 backdrop-blur-xl text-white border-b border-white/10 shadow-[0_1px_0_0_rgba(255,221,0,0.18),0_8px_30px_-12px_rgba(0,0,0,0.8)] relative overflow-visible">
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
              <img
                src="/logo-icon.png"
                alt="FoundersPrime"
                className="h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
              <span className="font-mono font-black text-xl md:text-2xl tracking-[0.18em] text-white uppercase whitespace-nowrap">
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
                  <Link href="/deals?category=cloud-credits" className={dropdownItemClasses}>
                    <span className="material-symbols-outlined text-base text-sky-400">cloud</span>
                    Cloud Credits
                  </Link>
                  <Link href="/deals?category=saas-discounts" className={dropdownItemClasses}>
                    <span className="material-symbols-outlined text-base text-purple-400">apps</span>
                    SaaS Discounts
                  </Link>
                  <Link href="/deals?category=ad-credits" className={dropdownItemClasses}>
                    <span className="material-symbols-outlined text-base text-pink-400">campaign</span>
                    Ad Credits
                  </Link>
                </div>
              </div>
            </div>

            {/* Programs */}
            <div className="relative group">
              <Link
                href="/programs"
                className="header-nav-link relative text-gray-200 font-bold hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-white/[0.05] transition-all"
              >
                <span className="header-nav-text">Programs</span>
                <span className="material-symbols-outlined text-[14px] text-gray-500 transition-all duration-300 group-hover:rotate-180 group-hover:text-accent-yellow">expand_more</span>
              </Link>
              <div className={dropdownClasses}>
                <div className={dropdownPanelClasses}>
                  <Link href="/programs" className={dropdownItemClasses}>
                    <span className="material-symbols-outlined text-base text-accent-yellow">grid_view</span>
                    All Programs
                  </Link>
                  <Link href="/programs?type=accelerators" className={dropdownItemClasses}>
                    <span className="material-symbols-outlined text-base text-orange-400">rocket_launch</span>
                    Accelerators
                  </Link>
                  <Link href="/programs?type=incubators" className={dropdownItemClasses}>
                    <span className="material-symbols-outlined text-base text-yellow-400">lightbulb</span>
                    Incubators
                  </Link>
                  <Link href="/programs?type=grants" className={dropdownItemClasses}>
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
                  <Link href="/student-benefits?type=funding" className={dropdownItemClasses}>
                    <span className="material-symbols-outlined text-base text-emerald-400">monetization_on</span>
                    Funding &amp; Opportunities
                  </Link>
                  <Link href="/student-benefits?type=free-access" className={dropdownItemClasses}>
                    <span className="material-symbols-outlined text-base text-pink-400">workspace_premium</span>
                    Campus Edge
                  </Link>
                  <Link href="/student-benefits?type=credits-savings" className={dropdownItemClasses}>
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

            {/* Flash Deals */}
            <Link
              href="/flash-deals"
              className="header-nav-link relative text-gray-200 font-bold hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-white/[0.05] transition-all"
            >
              <span className="header-nav-text flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-accent-yellow" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                Flash Deals
              </span>
              <span className="inline-flex items-center bg-accent-yellow text-black text-[8px] font-black uppercase tracking-[0.12em] px-1.5 py-0.5 leading-none">
                New
              </span>
            </Link>

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
            <ThemeToggle />
            {!loading && user ? (
              <div className="relative group">
                <button className="bg-white/[0.04] border border-white/10 hover:border-accent-yellow/40 text-white font-mono font-bold py-2 px-3 text-[12px] rounded-md transition-all uppercase tracking-[0.06em] flex items-center gap-2 hover:bg-white/[0.08]">
                  <span className="material-symbols-outlined text-base text-accent-yellow">account_circle</span>
                  <span className="hidden lg:inline">{user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}</span>
                  {planBadge && (
                    <span className={`${planBadge.className} text-[9px] px-1.5 py-0.5 font-bold uppercase ml-0.5 rounded-sm tracking-wider`}>
                      {planBadge.label}
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
                    <Link href="/dashboard?tab=billing" className={dropdownItemClasses}>
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
                  <span className="relative">Get Started</span>
                  <span className="material-symbols-outlined text-sm relative group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                </Link>
              </>
            )}
          </div>

          {/* ─── Mobile toggle ─── */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="text-white p-1.5 bg-white/5 border border-white/15 hover:bg-white/10 hover:border-accent-yellow transition-colors h-8 w-8 flex items-center justify-center !min-h-0 rounded"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined !text-[20px]">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
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

      {/* ─── Mobile Drawer ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 xl:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Drawer container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[70vw] max-w-[270px] bg-[#000000]/95 backdrop-blur-md border-l border-white/10 z-50 xl:hidden flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-4 h-14 border-b border-white/10 flex-shrink-0">
                <span className="font-mono font-black text-xs tracking-widest uppercase text-white">
                  MENU
                </span>
                <button
                  className="text-gray-400 hover:text-white p-1.5 rounded-lg bg-white/5 transition-colors h-8 w-8 flex items-center justify-center !min-h-0"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="material-symbols-outlined !text-[18px]">close</span>
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="flex flex-col gap-2">
                  {mobileNavSections.map((section) => (
                    <div key={section.id} className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between p-3 text-left font-mono font-bold uppercase text-[10.5px] text-gray-200 transition-colors hover:bg-white/5 !min-h-0"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-accent-yellow !text-base">{section.icon}</span>
                          {section.label}
                        </div>
                        {section.children && (
                          <span
                            className="material-symbols-outlined transition-transform duration-300 !text-base text-gray-400"
                            style={{ transform: expandedSection === section.id ? 'rotate(180deg)' : 'rotate(0deg)' }}
                          >
                            expand_more
                          </span>
                        )}
                      </button>
                      
                      <AnimatePresence>
                        {expandedSection === section.id && section.children && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-black/20"
                          >
                            <div className="px-3 pb-3 pt-1 flex flex-col gap-1">
                              {section.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center gap-2.5 p-2 rounded-lg text-[10px] font-mono font-bold uppercase text-gray-400 hover:text-accent-yellow hover:bg-white/5 transition-colors !min-h-0"
                                >
                                  <span className={`material-symbols-outlined text-sm ${child.colorClass || 'text-gray-500'}`}>{child.icon}</span>
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  {/* Flash Deals standalone */}
                  <Link
                    href="/flash-deals"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl font-mono font-bold uppercase text-[10.5px] text-gray-200 border border-white/10 bg-white/[0.02] !min-h-0"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-accent-yellow !text-base">bolt</span>
                      Flash Deals
                    </div>
                    <span className="bg-accent-yellow text-black text-[8px] px-1.5 py-0.5 rounded-sm font-black tracking-wider leading-none">NEW</span>
                  </Link>

                  {/* Pricing standalone */}
                  <Link
                    href="/pricing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl font-mono font-bold uppercase text-[10.5px] text-white border border-accent-yellow/50 bg-accent-yellow/5 mt-1 mb-2 !min-h-0"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-accent-yellow !text-base">sell</span>
                      Pricing
                    </div>
                  </Link>

                  {/* Auth Actions (Moved up to fill blank space) */}
                  {user ? (
                    <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2.5 p-2 bg-white/5 rounded-xl border border-white/10">
                        <span className="material-symbols-outlined text-accent-yellow">account_circle</span>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[11px] font-mono font-bold truncate text-white">
                            {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
                          </span>
                          {planBadge && (
                            <span className={`text-[8px] font-bold uppercase mt-0.5 ${planBadge.className === 'bg-accent-yellow text-black' ? 'text-accent-yellow' : 'text-sky-400'}`}>
                              {planBadge.label}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href="/dashboard"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-center gap-2 p-2 rounded-lg bg-[#FFD500] text-black font-mono font-bold text-[10px] uppercase transition-transform active:scale-95 !min-h-0"
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            signOut()
                            setMobileMenuOpen(false)
                          }}
                          className="flex items-center justify-center gap-2 p-2 rounded-lg border border-white/10 text-red-400 font-mono font-bold text-[10px] uppercase transition-transform active:scale-95 bg-transparent !min-h-0"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 pt-4 border-t border-white/10">
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center h-10 w-full rounded-xl border border-[#FFD500]/50 bg-[#FFD500]/5 hover:bg-[#FFD500]/15 text-[#FFD500] font-mono font-bold text-[11px] uppercase transition-all tracking-wider active:scale-95 !min-h-0"
                      >
                        Log In
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </>
  )
}
