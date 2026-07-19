'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth/hooks'
import { useEffect, useRef, useState } from 'react'
import { checkProStatus, normalizeUserPlan } from '@/lib/auth/user-context'
import { m, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import HeaderMobileDrawer from './HeaderMobileDrawer'
import {
  navIsActive,
  navIsExact,
  PLAN_BADGES,
  mobileNavSections,
  type PlanType,
} from '@/lib/header-nav'

export default function Header() {
  const { user, loading, signOut } = useAuth()
  const pathname = usePathname() || '/'
  const [search, setSearch] = useState('')
  const [plan, setPlan] = useState<PlanType>('free')
  const [isAdmin, setIsAdmin] = useState(false)
  const [pressedHref, setPressedHref] = useState<string | null>(null)
  const hasCheckedRef = useRef<string | null>(null)

  // Keep query string in sync for exact active states (no useSearchParams / Suspense)
  useEffect(() => {
    const sync = () => setSearch(typeof window !== 'undefined' ? window.location.search : '')
    sync()
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [pathname])

  // Brief press flash so clicks feel registered even before route paint
  useEffect(() => {
    if (!pressedHref) return
    const t = setTimeout(() => setPressedHref(null), 320)
    return () => clearTimeout(t)
  }, [pressedHref])

  const markPress = (href: string) => {
    if (href && href !== '#') setPressedHref(href)
  }

  /** Shared desktop nav chip — fixed height so all items align on one baseline */
  const navChipBase =
    'header-nav-link relative inline-flex h-9 items-center justify-center gap-1 px-2.5 xl:px-3 rounded-lg font-mono text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.04em] leading-none whitespace-nowrap transition-colors duration-150'

  const navLinkClass = (href: string, opts?: { accent?: boolean; activeOverride?: boolean }) => {
    const active = opts?.activeOverride ?? navIsActive(pathname, search, href)
    const pressed = pressedHref === href
    return [
      navChipBase,
      opts?.accent ? 'text-accent-yellow hover:text-white hover:bg-accent-yellow/10' : 'text-gray-300 hover:text-white hover:bg-white/[0.06]',
      active
        ? 'text-white bg-white/[0.08] ring-1 ring-inset ring-accent-yellow/35'
        : '',
      pressed ? 'bg-accent-yellow/15 text-accent-yellow ring-1 ring-accent-yellow/40' : '',
      'active:scale-[0.98]',
    ]
      .filter(Boolean)
      .join(' ')
  }

  const chevronClass =
    'material-symbols-outlined !text-[16px] !leading-none !w-4 !h-4 text-gray-500 group-hover:text-accent-yellow group-hover:rotate-180 transition-all duration-200 flex-shrink-0'

  const dropdownItemClass = (href: string) => {
    const active = navIsExact(pathname, search, href)
    const pressed = pressedHref === href
    return [
      dropdownItemClasses,
      'active:scale-[0.98] active:bg-accent-yellow/10',
      active ? 'bg-white/[0.06] text-accent-yellow' : '',
      pressed ? 'bg-accent-yellow/15 text-accent-yellow' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  useEffect(() => {
    const checkAccess = async () => {
      if (user && hasCheckedRef.current !== user.id) {
        hasCheckedRef.current = user.id
        const { isAdmin: hasAdminAccess, user: profile } = await checkProStatus()
        setPlan(normalizeUserPlan(profile?.plan))
        setIsAdmin(hasAdminAccess)
      } else if (!user) {
        hasCheckedRef.current = null
        setPlan('free')
        setIsAdmin(false)
      }
    }
    checkAccess()
  }, [user])

  useEffect(() => {
    const syncAccess = (event: Event) => {
      const detail = (event as CustomEvent<{
        isAdmin?: boolean
        user?: { plan?: string | null } | null
      }>).detail
      setPlan(normalizeUserPlan(detail?.user?.plan))
      setIsAdmin(Boolean(detail?.isAdmin))
    }

    window.addEventListener('foundersprime:access-updated', syncAccess)
    return () => window.removeEventListener('foundersprime:access-updated', syncAccess)
  }, [])

  const planBadge = plan !== 'free' ? PLAN_BADGES[plan] : null

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  useEffect(() => {
    setMobileMenuOpen(false)
    setExpandedSection(null)
  }, [user])

  // Close drawer on route change + lock body scroll while open (mobile UX)
  useEffect(() => {
    setMobileMenuOpen(false)
    setExpandedSection(null)
  }, [pathname, search])

  useEffect(() => {
    if (typeof document === 'undefined') return
    if (mobileMenuOpen) {
      document.body.classList.add('mobile-nav-open')
    } else {
      document.body.classList.remove('mobile-nav-open')
    }
    return () => document.body.classList.remove('mobile-nav-open')
  }, [mobileMenuOpen])

  const toggleSection = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section))
  }

  const dropdownClasses =
    'header-dropdown-wrapper invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out absolute left-0 top-full pt-2 z-50'
  const dropdownPanelClasses =
    'relative bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,221,0,0.08)] min-w-[240px] overflow-hidden header-dropdown-panel'
  const dropdownItemClasses =
    'group/item relative flex items-center gap-3 px-4 py-3 text-[11.5px] font-mono font-bold uppercase tracking-[0.04em] text-gray-300 hover:bg-white/[0.04] hover:text-accent-yellow border-b border-white/[0.06] last:border-0 transition-all'


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

      <div className="max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-6 relative">
        {/* Three zones: brand | nav | actions — all items-center for one baseline */}
        <div className="flex items-center h-14 md:h-[3.75rem] gap-2 lg:gap-3">

          {/* ─── Brand — logo always visible on dark header ─── */}
          <div className="flex-shrink-0 min-w-0">
            <Link
              href="/"
              className="inline-flex items-center gap-2 sm:gap-2.5 no-underline group h-10 max-w-[min(100vw-7rem,280px)]"
              aria-label="FoundersPrime home"
            >
              <span className="relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] border border-white/15 ring-1 ring-accent-yellow/20 overflow-hidden group-hover:border-accent-yellow/45 group-hover:ring-accent-yellow/35 transition-all">
                <Image
                  src="/logo-icon.png"
                  alt=""
                  width={40}
                  height={40}
                  priority
                  className="h-7 w-7 sm:h-8 sm:w-8 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </span>
              <span className="font-mono font-black text-[13px] sm:text-[15px] md:text-[17px] tracking-[0.06em] text-white uppercase whitespace-nowrap leading-none">
                <span className="inline min-[400px]:hidden">
                  FP<span className="text-accent-yellow">[</span>PRIME<span className="text-accent-yellow">]</span>
                </span>
                <span className="hidden min-[400px]:inline">
                  FOUNDERS<span className="text-accent-yellow">[</span>PRIME<span className="text-accent-yellow">]</span>
                </span>
              </span>
            </Link>
          </div>

          {/* ─── Desktop nav (centered on large screens) ─── */}
          <nav className="hidden md:flex flex-1 min-w-0 items-center justify-center gap-0.5 lg:gap-1">
            {/* Deals */}
            <div className="relative group">
              <Link
                href="/deals"
                onClick={() => markPress('/deals')}
                aria-current={navIsActive(pathname, search, '/deals') ? 'page' : undefined}
                className={navLinkClass('/deals')}
              >
                <span className="header-nav-text">Deals</span>
                <span className={chevronClass}>expand_more</span>
              </Link>
              <div className={dropdownClasses}>
                <div className={dropdownPanelClasses}>
                  <Link href="/deals" onClick={() => markPress('/deals')} className={dropdownItemClass('/deals')}>
                    <span className="material-symbols-outlined text-base text-accent-yellow">grid_view</span>
                    All deals
                  </Link>
                  <Link href="/deals?category=cloud-credits" onClick={() => markPress('/deals?category=cloud-credits')} className={dropdownItemClass('/deals?category=cloud-credits')}>
                    <span className="material-symbols-outlined text-base text-sky-400">cloud</span>
                    Cloud Credits
                  </Link>
                  <Link href="/deals?category=saas-discounts" onClick={() => markPress('/deals?category=saas-discounts')} className={dropdownItemClass('/deals?category=saas-discounts')}>
                    <span className="material-symbols-outlined text-base text-purple-400">apps</span>
                    SaaS &amp; Tools
                  </Link>
                  <Link href="/deals?category=ad-credits" onClick={() => markPress('/deals?category=ad-credits')} className={dropdownItemClass('/deals?category=ad-credits')}>
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
                onClick={() => markPress('/programs')}
                aria-current={navIsActive(pathname, search, '/programs') ? 'page' : undefined}
                className={navLinkClass('/programs')}
              >
                <span className="header-nav-text">Programs</span>
                <span className={chevronClass}>expand_more</span>
              </Link>
              <div className={dropdownClasses}>
                <div className={dropdownPanelClasses}>
                  <Link href="/programs" onClick={() => markPress('/programs')} className={dropdownItemClass('/programs')}>
                    <span className="material-symbols-outlined text-base text-accent-yellow">grid_view</span>
                    All Programs
                  </Link>
                  <Link href="/programs?type=accelerators" onClick={() => markPress('/programs?type=accelerators')} className={dropdownItemClass('/programs?type=accelerators')}>
                    <span className="material-symbols-outlined text-base text-orange-400">rocket_launch</span>
                    Accelerators
                  </Link>
                  <Link href="/programs?type=incubators" onClick={() => markPress('/programs?type=incubators')} className={dropdownItemClass('/programs?type=incubators')}>
                    <span className="material-symbols-outlined text-base text-violet-400">lightbulb</span>
                    Incubators
                  </Link>
                  <Link href="/programs?type=grants" onClick={() => markPress('/programs?type=grants')} className={dropdownItemClass('/programs?type=grants')}>
                    <span className="material-symbols-outlined text-base text-sky-400">payments</span>
                    Grants
                  </Link>
                </div>
              </div>
            </div>

            {/* Students (short label — full meaning in dropdown) */}
            <div className="relative group">
              <Link
                href="/student-benefits"
                onClick={() => markPress('/student-benefits')}
                aria-current={pathname.startsWith('/student-benefits') ? 'page' : undefined}
                className={navLinkClass('/student-benefits', {
                  activeOverride: pathname.startsWith('/student-benefits'),
                })}
              >
                <span className="header-nav-text">
                  <span className="lg:hidden">Students</span>
                  <span className="hidden lg:inline">Students</span>
                </span>
                <span className={chevronClass}>expand_more</span>
              </Link>
              <div className={dropdownClasses}>
                <div className={dropdownPanelClasses}>
                  <Link href="/student-benefits?type=credits-savings" onClick={() => markPress('/student-benefits?type=credits-savings')} className={dropdownItemClass('/student-benefits?type=credits-savings')}>
                    <span className="material-symbols-outlined text-base text-sky-400">savings</span>
                    Credits &amp; Savings
                  </Link>
                  <Link href="/student-benefits?type=free-access" onClick={() => markPress('/student-benefits?type=free-access')} className={dropdownItemClass('/student-benefits?type=free-access')}>
                    <span className="material-symbols-outlined text-base text-violet-400">workspace_premium</span>
                    Campus Edge
                  </Link>
                  <Link href="/student-benefits?type=funding" onClick={() => markPress('/student-benefits?type=funding')} className={dropdownItemClass('/student-benefits?type=funding')}>
                    <span className="material-symbols-outlined text-base text-orange-400">monetization_on</span>
                    Funding &amp; Opportunities
                  </Link>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="relative group">
              <Link
                href="/resources"
                onClick={() => markPress('/resources')}
                aria-current={
                  navIsActive(pathname, search, '/resources') ||
                  pathname.startsWith('/ideas') ||
                  pathname.startsWith('/contact')
                    ? 'page'
                    : undefined
                }
                className={navLinkClass('/resources', {
                  activeOverride:
                    navIsActive(pathname, search, '/resources') ||
                    pathname.startsWith('/ideas') ||
                    pathname.startsWith('/contact'),
                })}
              >
                <span className="header-nav-text">Resources</span>
                <span className={chevronClass}>expand_more</span>
              </Link>
              <div className={dropdownClasses}>
                <div className={dropdownPanelClasses}>
                  <Link href="/ideas" onClick={() => markPress('/ideas')} className={dropdownItemClass('/ideas')}>
                    <span className="material-symbols-outlined text-base text-accent-yellow">emoji_objects</span>
                    Startup Ideas
                  </Link>
                  <Link href="/resources" onClick={() => markPress('/resources')} className={dropdownItemClass('/resources')}>
                    <span className="material-symbols-outlined text-base text-violet-400">lock</span>
                    Founder Vault
                  </Link>
                  <Link href="/contact" onClick={() => markPress('/contact')} className={dropdownItemClass('/contact')}>
                    <span className="material-symbols-outlined text-base text-gray-400">mail</span>
                    Contact
                  </Link>
                </div>
              </div>
            </div>

            {/* Flash */}
            <Link
              href="/flash-deals"
              onClick={() => markPress('/flash-deals')}
              aria-current={navIsActive(pathname, search, '/flash-deals') ? 'page' : undefined}
              className={navLinkClass('/flash-deals')}
            >
              <span
                className="material-symbols-outlined !text-[14px] !leading-none text-accent-yellow flex-shrink-0"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
              <span className="header-nav-text">Flash</span>
              <span className="inline-flex h-4 items-center rounded bg-accent-yellow px-1 text-[8px] font-black uppercase tracking-wide text-black leading-none">
                New
              </span>
            </Link>

            <span
              className="hidden xl:block w-px h-4 bg-white/15 mx-1 flex-shrink-0"
              aria-hidden="true"
            />

            {/* Pricing */}
            <Link
              href="/pricing"
              onClick={() => markPress('/pricing')}
              aria-current={navIsActive(pathname, search, '/pricing') ? 'page' : undefined}
              className={navLinkClass('/pricing', { accent: true })}
            >
              <span className="header-nav-text">Pricing</span>
              <span className="inline-flex h-4 items-center gap-0.5 rounded bg-accent-yellow px-1.5 text-[8px] font-black uppercase tracking-wide text-black leading-none">
                <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                Sale
              </span>
            </Link>
          </nav>

          {/* ─── Right actions ─── */}
          <div className="hidden md:flex flex-shrink-0 items-center gap-2">
            <ThemeToggle />
            {!loading && user ? (
              <div className="relative group">
                <button
                  type="button"
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 text-white font-mono text-[11px] font-bold uppercase tracking-[0.04em] leading-none hover:border-accent-yellow/40 hover:bg-white/[0.08] transition-colors"
                >
                  <span className="material-symbols-outlined !text-[18px] !leading-none text-accent-yellow">
                    account_circle
                  </span>
                  <span className="hidden xl:inline max-w-[5.5rem] truncate">
                    {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
                  </span>
                  {planBadge && (
                    <span
                      className={`${planBadge.className} inline-flex h-4 items-center rounded-md border border-white/10 px-1.5 text-[8px] font-black uppercase tracking-[0.08em] leading-none`}
                      style={planBadge.style}
                    >
                      {planBadge.label}
                    </span>
                  )}
                  {isAdmin && (
                    <span className="inline-flex h-4 items-center rounded bg-red-500 px-1.5 text-[8px] font-black uppercase tracking-wide text-white leading-none">
                      Admin
                    </span>
                  )}
                  <span className="material-symbols-outlined !text-[16px] !leading-none text-gray-500">
                    expand_more
                  </span>
                </button>
                <div className="absolute right-0 top-full pt-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
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
                      <span className="material-symbols-outlined text-base text-accent-yellow">credit_card</span>
                      Billing
                    </Link>
                    <button type="button"
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
                  className="inline-flex h-9 items-center px-3 rounded-lg font-mono text-[11px] font-bold uppercase tracking-[0.04em] text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors leading-none"
                >
                  Log In
                </Link>
                <Link
                  href="/pricing"
                  className="group inline-flex h-9 items-center gap-1.5 rounded-lg bg-accent-yellow px-3.5 font-mono text-[11px] font-black uppercase tracking-[0.06em] text-black hover:bg-white transition-colors leading-none shadow-[0_4px_16px_-4px_rgba(255,221,0,0.45)]"
                >
                  <span className="leading-none">Get Started</span>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="block shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden>
                    <path d="M2.5 7h9M7.5 3.5 11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </>
            )}
          </div>

          {/* ─── Mobile toggle ─── */}
          <div className="md:hidden flex items-center gap-1.5 ml-auto">
            <ThemeToggle />
            <button
              type="button"
              className="text-white bg-white/5 border border-white/15 hover:bg-white/10 hover:border-accent-yellow active:scale-95 transition-all h-10 w-10 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              <span className="material-symbols-outlined !text-[22px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes headerGradientSweep {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .header-gradient-sweep {
          animation: headerGradientSweep 6s linear infinite;
        }

        /* Active / hover underline sits inside the fixed-height chip */
        .header-nav-link {
          position: relative;
        }
        .header-nav-text {
          position: relative;
          line-height: 1;
        }
        .header-nav-link::after {
          content: '';
          position: absolute;
          left: 10px;
          right: 10px;
          bottom: 4px;
          height: 1.5px;
          border-radius: 1px;
          background: #FFD500;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }
        .header-nav-link:hover::after,
        .header-nav-link[aria-current="page"]::after {
          transform: scaleX(1);
        }

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
          .header-gradient-sweep { animation: none; }
          .header-nav-link::after { transition: none; }
        }
      `}</style>
    </header>

      <HeaderMobileDrawer
        open={mobileMenuOpen}
        onClose={() => {
          setMobileMenuOpen(false)
          setExpandedSection(null)
        }}
        pathname={pathname}
        search={search}
        user={user}
        planBadge={planBadge}
        expandedSection={expandedSection}
        setExpandedSection={setExpandedSection}
        signOut={signOut}
      />

    </>
  )
}
