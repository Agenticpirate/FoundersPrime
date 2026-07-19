'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  LayoutDashboard,
  Handshake,
  Users,
  BarChart3,
  FileText,
  Menu,
  X,
  ExternalLink,
  Lightbulb,
} from 'lucide-react'

interface NavItem {
  name: string
  href: string
  icon: typeof LayoutDashboard
  badgeKey?: 'pending'
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Submissions', href: '/admin/submissions', icon: FileText, badgeKey: 'pending' },
  { name: 'Deals', href: '/admin/deals', icon: Handshake },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Ideas', href: '/admin/ideas', icon: Lightbulb },
]

/** Secondary ops links (not full admin modules) */
const secondaryNav: { name: string; href: string }[] = [
  { name: 'Flash deals', href: '/flash-deals' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Member HQ', href: '/dashboard' },
]

function AdminNavContent({
  pathname,
  pending,
  onNavigate,
}: {
  pathname: string
  pending: number
  onNavigate: () => void
}) {
  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1">
      {navigation.map((item) => {
        const active = isActive(item.href)
        const badge = item.badgeKey === 'pending' ? pending : 0
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-2.5 px-3 py-2.5 min-h-[44px] rounded-lg transition-all font-mono text-xs ${
              active
                ? 'bg-accent-yellow/10 text-accent-yellow border border-accent-yellow/25 font-bold'
                : 'hover:bg-white/5 text-zinc-400 hover:text-white font-medium border border-transparent'
            }`}
          >
            <item.icon
              className={`w-4 h-4 flex-shrink-0 ${active ? 'text-accent-yellow' : 'text-zinc-500'}`}
            />
            <span className="uppercase tracking-wider flex-1">{item.name}</span>
            {badge > 0 && (
              <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md min-w-[1.25rem] text-center">
                {badge > 99 ? '99+' : badge}
              </span>
            )}
          </Link>
        )
      })}

      <div className="mt-auto pt-3 border-t border-white/10 space-y-0.5">
        <p className="px-3 pt-2 pb-1 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-zinc-600">
          Quick links
        </p>
        {secondaryNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className="flex items-center gap-2 px-3 py-2 min-h-[36px] rounded-lg hover:bg-white/5 font-mono text-[10px] font-medium text-zinc-500 hover:text-zinc-300 transition-all"
          >
            <span className="uppercase tracking-wider">{item.name}</span>
          </Link>
        ))}
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-2.5 px-3 py-2.5 min-h-[44px] rounded-lg hover:bg-sky-500/10 font-mono text-xs font-medium text-sky-400 hover:text-sky-300 transition-all border border-transparent"
        >
          <ExternalLink className="w-4 h-4 flex-shrink-0" />
          <span className="uppercase tracking-wider">View Live Site</span>
        </Link>
      </div>
    </div>
  )
}

export default function AdminSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [pending, setPending] = useState(0)

  useEffect(() => {
    let alive = true
    fetch('/api/admin/submissions')
      .then((r) => r.json())
      .then((j) => {
        if (!alive || !Array.isArray(j?.submissions)) return
        setPending(
          j.submissions.filter((s: { status?: string }) => s.status === 'pending').length
        )
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [pathname])

  useEffect(() => {
    if (typeof document === 'undefined') return
    if (mobileOpen) document.body.classList.add('mobile-nav-open')
    else document.body.classList.remove('mobile-nav-open')
    return () => document.body.classList.remove('mobile-nav-open')
  }, [mobileOpen])

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <nav className="hidden md:flex w-56 bg-[#0d0e12] border-r border-white/10 flex-shrink-0 flex-col h-screen sticky top-0 z-50 overflow-hidden">
        <div className="px-4 py-4 border-b border-white/10 bg-[#121318] shrink-0">
          <h1 className="font-mono font-black text-sm tracking-wider text-white">FoundersPrime</h1>
          <p className="font-mono text-[8px] font-bold text-zinc-500 uppercase mt-0.5">
            Admin Command
          </p>
        </div>
        <AdminNavContent pathname={pathname} pending={pending} onNavigate={closeMobile} />
      </nav>

      <div className="md:hidden sticky top-0 z-50 bg-[#0d0e12] border-b border-white/10 flex items-center justify-between px-4 h-14">
        <div>
          <h1 className="font-mono font-black text-sm tracking-wider text-white leading-none">
            FoundersPrime
          </h1>
          <p className="font-mono text-[8px] font-bold text-zinc-500 uppercase mt-1">Admin</p>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-center w-10 h-10 border border-white/10 bg-[#121318] text-white rounded-xl"
          aria-label={mobileOpen ? 'Close sidebar' : 'Open sidebar'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {mobileOpen && (
        <>
          <button
            type="button"
            aria-label="Close sidebar"
            className="fixed inset-0 z-40 border-0 bg-black/60 p-0 md:hidden backdrop-blur-sm cursor-default"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="fixed inset-y-0 left-0 z-50 w-[min(80vw,280px)] bg-[#0d0e12] border-r border-white/10 flex flex-col md:hidden overflow-y-auto">
            <div className="px-4 py-4 border-b border-white/10 bg-[#121318] flex items-center justify-between">
              <div>
                <h1 className="font-mono font-black text-sm tracking-wider text-white">
                  FoundersPrime
                </h1>
                <p className="font-mono text-[8px] font-bold text-zinc-500 uppercase mt-0.5">
                  Admin Command
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-9 h-9 border border-white/10 text-white rounded-lg"
                aria-label="Close sidebar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <AdminNavContent pathname={pathname} pending={pending} onNavigate={closeMobile} />
          </nav>
        </>
      )}
    </>
  )
}
