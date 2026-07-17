'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth/hooks'
import { useEffect, useRef, useState } from 'react'
import { checkProStatus } from '@/lib/auth/user-context'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

/** Section-level match: path matches (ignores most query params). */
function navIsActive(pathname: string, _search: string, href: string): boolean {
  if (!href || href === '#') return false
  try {
    const url = new URL(href, 'http://local')
    if (url.pathname === '/') return pathname === '/'
    return pathname === url.pathname || pathname.startsWith(`${url.pathname}/`)
  } catch {
    return pathname === href
  }
}

/** Exact dropdown match: path + relevant query (category / type). */
function navIsExact(pathname: string, search: string, href: string): boolean {
  if (!href || href === '#') return false
  try {
    const url = new URL(href, 'http://local')
    if (url.pathname !== pathname) return false
    const have = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
    const want = url.searchParams
    if ([...want.keys()].length === 0) {
      // "All X" — active only when no category/type filter is set
      return !have.get('category') && !have.get('type')
    }
    for (const [k, v] of want.entries()) {
      if (have.get(k) !== v) return false
    }
    return true
  } catch {
    return false
  }
}

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

  const mobileNavSections = [
    {
      id: 'deals',
      label: 'Deals',
      href: '/deals',
      icon: 'local_offer',
      children: [
        { label: 'All deals', href: '/deals', icon: 'grid_view', colorClass: 'text-accent-yellow' },
        { label: 'Cloud Credits', href: '/deals?category=cloud-credits', icon: 'cloud', colorClass: 'text-sky-400' },
        { label: 'SaaS & Tools', href: '/deals?category=saas-discounts', icon: 'apps', colorClass: 'text-purple-400' },
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
        { label: 'Incubators', href: '/programs?type=incubators', icon: 'lightbulb', colorClass: 'text-violet-400' },
        { label: 'Grants', href: '/programs?type=grants', icon: 'payments', colorClass: 'text-sky-400' },
      ],
    },
    {
      id: 'studentbenefits',
      label: 'Students',
      href: '/student-benefits',
      icon: 'school',
      children: [
        { label: 'Credits & Savings', href: '/student-benefits?type=credits-savings', icon: 'savings', colorClass: 'text-sky-400' },
        { label: 'Campus Edge', href: '/student-benefits?type=free-access', icon: 'workspace_premium', colorClass: 'text-violet-400' },
        { label: 'Funding & Opportunities', href: '/student-benefits?type=funding', icon: 'monetization_on', colorClass: 'text-orange-400' },
      ],
    },
    {
      id: 'resources',
      label: 'Resources',
      href: '/resources',
      icon: 'folder_open',
      children: [
        { label: 'Startup Ideas', href: '/ideas', icon: 'emoji_objects', colorClass: 'text-accent-yellow' },
        { label: 'Founder Vault', href: '/resources', icon: 'lock', colorClass: 'text-violet-400' },
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
                      className={`${planBadge.className} inline-flex h-4 items-center rounded px-1.5 text-[8px] font-black uppercase tracking-wide leading-none`}
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

      {/* ─── Mobile Drawer ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Solid dim — no blur (blur samples yellow hero CTAs and causes glow glitch) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 bg-black/80 z-40 xl:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden
            />
            {/* Solid drawer — fully opaque so page glow never bleeds through */}
            <motion.div
              id="mobile-nav-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-[min(86vw,320px)] bg-[#050505] border-l border-white/10 z-50 xl:hidden flex flex-col shadow-[-12px_0_40px_rgba(0,0,0,0.65)] pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-4 h-14 border-b border-white/10 flex-shrink-0 bg-[#050505]">
                <span className="font-mono font-black text-xs tracking-widest uppercase text-white">
                  Menu
                </span>
                <button
                  type="button"
                  className="text-gray-400 rounded-xl bg-white/5 transition-colors h-10 w-10 min-h-[40px] min-w-[40px] flex items-center justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <span className="material-symbols-outlined !text-[20px]">close</span>
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-3.5 py-4 bg-[#050505]">
                <div className="flex flex-col gap-2">
                  {mobileNavSections.map((section) => {
                    const isOpen = expandedSection === section.id
                    return (
                    <div
                      key={section.id}
                      className={`border rounded-xl overflow-hidden bg-[#0c0c0c] ${
                        isOpen ? 'border-white/15' : 'border-white/10'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between min-h-[48px] px-3.5 py-3 text-left font-mono font-bold uppercase text-[11px] text-gray-200 bg-[#0c0c0c]"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-accent-yellow !text-base">{section.icon}</span>
                          {section.label}
                        </div>
                        {section.children && (
                          <span
                            className="material-symbols-outlined transition-transform duration-200 !text-base text-gray-400"
                            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                          >
                            expand_more
                          </span>
                        )}
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && section.children && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="overflow-hidden bg-[#080808]"
                          >
                            <div className="px-3 pb-3 pt-1 flex flex-col gap-0.5">
                              {section.children.map((child) => {
                                const active = navIsExact(pathname, search, child.href)
                                return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => {
                                    setMobileMenuOpen(false)
                                    setExpandedSection(null)
                                  }}
                                  aria-current={active ? 'page' : undefined}
                                  className={`mobile-nav-item flex items-center gap-2.5 min-h-[44px] px-2.5 py-2.5 rounded-lg text-[11px] font-mono font-bold uppercase ${
                                    active
                                      ? 'text-accent-yellow bg-white/[0.06]'
                                      : 'text-gray-400'
                                  }`}
                                >
                                  <span className={`material-symbols-outlined text-sm ${child.colorClass || 'text-gray-500'}`}>{child.icon}</span>
                                  {child.label}
                                </Link>
                                )
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    )
                  })}

                  {/* Flash Deals standalone */}
                  <Link
                    href="/flash-deals"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      setExpandedSection(null)
                    }}
                    aria-current={pathname.startsWith('/flash-deals') ? 'page' : undefined}
                    className={`mobile-nav-item flex items-center justify-between min-h-[48px] px-3.5 py-3 rounded-xl font-mono font-bold uppercase text-[11px] border ${
                      pathname.startsWith('/flash-deals')
                        ? 'text-white border-white/20 bg-[#0c0c0c]'
                        : 'text-gray-200 border-white/10 bg-[#0c0c0c]'
                    }`}
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
                    onClick={() => {
                      setMobileMenuOpen(false)
                      setExpandedSection(null)
                    }}
                    aria-current={pathname.startsWith('/pricing') ? 'page' : undefined}
                    className="mobile-nav-item flex items-center justify-between min-h-[48px] px-3.5 py-3 rounded-xl font-mono font-bold uppercase text-[11px] text-white border border-white/15 bg-[#0c0c0c] mt-1 mb-2"
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
                          onClick={() => {
                            setMobileMenuOpen(false)
                            setExpandedSection(null)
                          }}
                          className="flex items-center justify-center gap-2 p-2 rounded-lg bg-accent-yellow text-black font-mono font-bold text-[10px] uppercase !min-h-0"
                        >
                          Dashboard
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            signOut()
                            setMobileMenuOpen(false)
                            setExpandedSection(null)
                          }}
                          className="flex items-center justify-center gap-2 p-2 rounded-lg border border-white/10 text-red-400 font-mono font-bold text-[10px] uppercase bg-transparent !min-h-0"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 pt-4 border-t border-white/10">
                      <Link
                        href="/login"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setExpandedSection(null)
                        }}
                        className="flex items-center justify-center h-10 w-full rounded-xl border border-white/15 bg-[#0c0c0c] text-accent-yellow font-mono font-bold text-[11px] uppercase tracking-wider !min-h-0"
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
