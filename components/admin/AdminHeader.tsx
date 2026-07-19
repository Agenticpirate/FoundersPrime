'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Search,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  ExternalLink,
  User,
  Shield,
  Users,
  Settings,
} from 'lucide-react'
import { checkAdminStatus, type AdminUser } from '@/lib/admin/auth'
import { createClient } from '@/lib/supabase/client'

interface AdminHeaderProps {
  title?: string
  subtitle?: string
}

const QUICK_LINKS: { q: string; href: string; label: string }[] = [
  { q: 'deal', href: '/admin/deals', label: 'Deals' },
  { q: 'user', href: '/admin/users', label: 'Users' },
  { q: 'sub', href: '/admin/submissions', label: 'Submissions' },
  { q: 'analytic', href: '/admin/analytics', label: 'Analytics' },
  { q: 'idea', href: '/admin/ideas', label: 'Ideas' },
  { q: 'import', href: '/admin/deals', label: 'Deals' },
  { q: 'feature', href: '/admin/submissions', label: 'Submissions' },
  { q: 'flash', href: '/flash-deals', label: 'Flash deals' },
  { q: 'price', href: '/pricing', label: 'Pricing' },
]

export default function AdminHeader({
  title = 'Command Center',
  subtitle,
}: AdminHeaderProps) {
  const router = useRouter()
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    checkAdminStatus().then((r) => {
      if (r.adminUser) setAdmin(r.adminUser)
    })
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onDoc = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const displayName = admin?.name || admin?.email?.split('@')[0] || 'Admin'
  const displayEmail = admin?.email || 'admin@foundersprime.com'
  const roleLabel = (admin?.role || 'admin').toString()

  const initials =
    (admin?.name || admin?.email || 'A')
      .split(/[\s@]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join('') || 'A'

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim().toLowerCase()
    if (!q) return
    const hit = QUICK_LINKS.find(
      (l) => q.includes(l.q) || l.label.toLowerCase().includes(q)
    )
    if (hit) {
      router.push(hit.href)
      setQuery('')
      return
    }
    if (q.includes('@') || q.length > 2) {
      router.push(`/admin/users?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
      return
    }
    router.push(`/admin/deals?q=${encodeURIComponent(query.trim())}`)
  }

  const signOut = async () => {
    setMenuOpen(false)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login?redirect=/admin')
  }

  return (
    <header className="px-4 md:px-6 lg:px-8 py-3 md:py-4 border-b border-white/[0.08] bg-[#0d0e12]/95 backdrop-blur-md flex justify-between items-center gap-3 sticky top-0 z-30 shrink-0">
      <div className="min-w-0 flex-1">
        <h2 className="font-mono text-base md:text-xl font-black uppercase tracking-wider text-white truncate">
          {title}
        </h2>
        <p className="font-mono text-[9px] md:text-[11px] text-zinc-500 mt-0.5 truncate">
          {subtitle ?? (
            <>
              Status: <span className="text-emerald-400 font-bold">ONLINE</span>
              {admin?.email && (
                <span className="text-zinc-600 hidden sm:inline"> · {admin.email}</span>
              )}
            </>
          )}
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <form onSubmit={onSearch} className="relative hidden sm:block w-44 md:w-60">
          <input
            className="w-full border border-white/10 pl-3 pr-9 py-2 bg-[#121318] text-white rounded-xl font-mono text-xs focus:outline-none focus:border-accent-yellow/50 placeholder-zinc-600 transition-colors"
            placeholder="Jump to deals, users…"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Admin search"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-accent-yellow"
            aria-label="Search"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Account menu */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className="group flex items-center gap-2 min-h-[40px] pl-1 pr-2 py-1 rounded-xl border border-white/10 bg-[#121318] hover:border-accent-yellow/35 hover:bg-[#16171d] transition-all"
          >
            <span className="w-8 h-8 rounded-lg bg-accent-yellow/15 border border-accent-yellow/30 flex items-center justify-center font-mono text-[11px] font-black text-accent-yellow uppercase">
              {initials}
            </span>
            <span className="hidden md:flex flex-col items-start min-w-0 max-w-[140px]">
              <span className="font-mono text-[11px] font-bold text-white truncate w-full text-left">
                {displayName}
              </span>
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider truncate w-full text-left">
                {roleLabel}
              </span>
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${menuOpen ? 'rotate-180 text-accent-yellow' : ''}`}
            />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-[calc(100%+8px)] w-[min(92vw,280px)] rounded-2xl border border-white/10 bg-[#0f1015] shadow-[0_20px_50px_rgba(0,0,0,0.55)] overflow-hidden z-50"
            >
              <div className="px-4 py-3.5 border-b border-white/10 bg-gradient-to-br from-accent-yellow/[0.08] to-transparent">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-accent-yellow/15 border border-accent-yellow/30 flex items-center justify-center font-mono text-sm font-black text-accent-yellow uppercase">
                    {initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[13px] font-black text-white truncate">
                      {displayName}
                    </p>
                    <p className="font-mono text-[10px] text-zinc-500 truncate">{displayEmail}</p>
                    <span className="inline-flex mt-1 items-center gap-1 rounded-md border border-accent-yellow/25 bg-accent-yellow/10 px-1.5 py-0.5 font-mono text-[8px] font-black uppercase tracking-wider text-accent-yellow">
                      <Shield className="w-2.5 h-2.5" />
                      {roleLabel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-1.5">
                <Link
                  href="/admin"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-mono text-[11px] font-bold text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-zinc-500" />
                  Admin dashboard
                </Link>
                <Link
                  href="/admin/users"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-mono text-[11px] font-bold text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <Users className="w-3.5 h-3.5 text-zinc-500" />
                  Manage users
                </Link>
                <Link
                  href="/dashboard"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-mono text-[11px] font-bold text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-zinc-500" />
                  Member dashboard
                </Link>
                <Link
                  href="/"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-mono text-[11px] font-bold text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                  View live site
                </Link>
                <Link
                  href="/pricing"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-mono text-[11px] font-bold text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-zinc-500" />
                  Pricing page
                </Link>
              </div>

              <div className="p-1.5 border-t border-white/10">
                <button
                  type="button"
                  role="menuitem"
                  onClick={signOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-mono text-[11px] font-bold text-red-300 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
