'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, LogOut } from 'lucide-react'
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
]

export default function AdminHeader({
  title = 'Command Center',
  subtitle,
}: AdminHeaderProps) {
  const router = useRouter()
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    checkAdminStatus().then((r) => {
      if (r.adminUser) setAdmin(r.adminUser)
    })
  }, [])

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
    router.push(`/admin/deals?q=${encodeURIComponent(query.trim())}`)
  }

  const signOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login?redirect=/admin')
  }

  return (
    <header className="px-4 md:px-8 py-4 border-b border-white/10 bg-[#0d0e12] flex justify-between items-center gap-3 sticky top-0 z-30 md:static">
      <div className="min-w-0">
        <h2 className="font-mono text-lg md:text-xl font-black uppercase tracking-wider text-white truncate">
          {title}
        </h2>
        <p className="font-mono text-[9px] md:text-xs text-zinc-500 mt-1 truncate">
          {subtitle ?? (
            <>
              Status: <span className="text-emerald-400 font-bold">ONLINE</span>
              {admin?.email && <span className="text-zinc-600"> · {admin.email}</span>}
            </>
          )}
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <form onSubmit={onSearch} className="relative hidden sm:block w-44 md:w-56">
          <input
            className="w-full border border-white/10 pl-3 pr-9 py-2 bg-[#121318] text-white rounded-lg font-mono text-xs focus:outline-none focus:border-accent-yellow/50 placeholder-zinc-600 transition-colors"
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
        <div
          className="w-9 h-9 bg-[#121318] text-accent-yellow border border-white/10 flex items-center justify-center font-bold font-mono text-xs rounded-lg"
          title={admin?.name || admin?.email || 'Admin'}
        >
          {initials}
        </div>
        <button
          type="button"
          onClick={signOut}
          className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
          aria-label="Sign out"
          title="Sign out"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  )
}
