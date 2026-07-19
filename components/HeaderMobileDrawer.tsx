'use client'

import Link from 'next/link'
import { m, AnimatePresence } from 'framer-motion'
import { mobileNavSections, navIsExact, type PlanBadge } from '@/lib/header-nav'

type UserLike = {
  email?: string | null
  user_metadata?: { full_name?: string }
} | null

type Props = {
  open: boolean
  onClose: () => void
  pathname: string
  search: string
  user: UserLike
  planBadge: PlanBadge | null
  expandedSection: string | null
  setExpandedSection: (id: string | null | ((prev: string | null) => string | null)) => void
  signOut: () => void
}

export default function HeaderMobileDrawer({
  open,
  onClose,
  pathname,
  search,
  user,
  planBadge,
  expandedSection,
  setExpandedSection,
  signOut,
}: Props) {
  const toggleSection = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section))
  }

  return (
      <AnimatePresence>
        {open && (
          <>
            {/* Solid dim — no blur (blur samples yellow hero CTAs and causes glow glitch) */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 bg-black/80 z-40 xl:hidden"
              onClick={() => onClose()}
              aria-hidden
            />
            {/* Solid drawer — fully opaque so page glow never bleeds through */}
            <m.div
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
                  onClick={() => onClose()}
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
                          <m.div
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
                                    onClose()
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
                          </m.div>
                        )}
                      </AnimatePresence>
                    </div>
                    )
                  })}

                  {/* Flash Deals standalone */}
                  <Link
                    href="/flash-deals"
                    onClick={() => {
                      onClose()
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
                      onClose()
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
                            <span
                              className={`${planBadge.className} mt-1 inline-flex w-fit items-center rounded-md border border-white/10 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-[0.08em] leading-none`}
                              style={planBadge.style}
                            >
                              {planBadge.label}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href="/dashboard"
                          onClick={() => {
                            onClose()
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
                            onClose()
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
                          onClose()
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
            </m.div>
          </>
        )}
      </AnimatePresence>

  )
}
