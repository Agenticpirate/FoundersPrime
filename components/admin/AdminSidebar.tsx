'use client'

import Link from 'Link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard, Handshake, Users,
  BarChart3, FileText, Menu, X, ExternalLink
} from 'lucide-react'

interface NavItem { name: string; href: string; icon: any }

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Submissions', href: '/admin/submissions', icon: FileText },
  { name: 'Deals', href: '/admin/deals', icon: Handshake },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  const NavContent = () => (
    <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1">
      {navigation.map((item) => {
        const active = isActive(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded transition-all font-mono text-xs ${
              active
                ? 'bg-accent-yellow/10 text-accent-yellow border border-accent-yellow/20 font-bold'
                : 'hover:bg-white/5 text-zinc-400 hover:text-white font-medium border border-transparent'
            }`}
          >
            <item.icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-accent-yellow' : 'text-zinc-500'}`} />
            <span className="uppercase tracking-wider">{item.name}</span>
          </Link>
        )
      })}

      <div className="mt-auto pt-4 border-t border-white/10">
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded hover:bg-sky-500/10 font-mono text-xs font-medium text-sky-400 hover:text-sky-300 transition-all border border-transparent"
        >
          <ExternalLink className="w-4 h-4 flex-shrink-0" />
          <span className="uppercase tracking-wider">View Live Site</span>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex w-56 bg-[#0d0e12] border-r border-white/10 flex-shrink-0 flex-col h-screen sticky top-0 z-50">
        <div className="px-4 py-4.5 border-b border-white/10 bg-[#121318]">
          <h1 className="font-mono font-black text-sm tracking-wider text-white">FoundersPrime</h1>
          <p className="font-mono text-[8px] font-bold text-zinc-500 uppercase mt-0.5">Admin v2.0</p>
        </div>
        <NavContent />
      </nav>

      {/* Mobile Top Bar */}
      <div className="md:hidden sticky top-0 z-50 bg-[#0d0e12] border-b border-white/10 flex items-center justify-between px-4 h-14">
        <div>
          <h1 className="font-mono font-black text-sm tracking-wider text-white leading-none">FoundersPrime</h1>
          <p className="font-mono text-[8px] font-bold text-zinc-500 uppercase mt-1">Admin</p>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-center w-9 h-9 border border-white/10 bg-[#121318] text-white rounded hover:bg-white/5 transition-colors"
          aria-label={mobileOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {mobileOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <nav className="fixed inset-y-0 left-0 z-50 w-60 bg-[#0d0e12] border-r border-white/10 flex flex-col md:hidden overflow-y-auto">
            <div className="px-4 py-4 border-b border-white/10 bg-[#121318] flex items-center justify-between">
              <div>
                <h1 className="font-mono font-black text-sm tracking-wider text-white">FoundersPrime</h1>
                <p className="font-mono text-[8px] font-bold text-zinc-500 uppercase mt-0.5">Admin v2.0</p>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-8 h-8 border border-white/10 bg-[#121318] text-white rounded"
                aria-label="Close sidebar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <NavContent />
          </nav>
        </>
      )}
    </>
  )
}
