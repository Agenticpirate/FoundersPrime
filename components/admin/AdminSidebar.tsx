'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard, Handshake, Building2, Lightbulb, Users,
  MessageSquare, BarChart3, Settings, FileText, Menu, X, ExternalLink
} from 'lucide-react'

interface NavItem { name: string; href: string; icon: any }

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Submissions', href: '/admin/submissions', icon: FileText },
  { name: 'Deals', href: '/admin/deals', icon: Handshake },
  { name: 'Startups', href: '/admin/startups', icon: Building2 },
  { name: 'Ideas', href: '/admin/ideas', icon: Lightbulb },
  { name: 'Resources', href: '/admin/resources', icon: FileText },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Comments', href: '/admin/comments', icon: MessageSquare },
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
    <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-0.5">
      {navigation.map((item) => {
        const active = isActive(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-sm transition-all font-mono text-xs ${
              active
                ? 'bg-black text-white font-bold shadow-[2px_2px_0px_#333]'
                : 'hover:bg-primary/15 text-black/80 hover:text-black font-medium'
            }`}
          >
            <item.icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-primary' : 'text-black/40'}`} />
            <span className="uppercase tracking-wide">{item.name}</span>
          </Link>
        )
      })}

      <div className="mt-auto pt-3 border-t border-black/10">
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2.5 px-3 py-2 rounded-sm hover:bg-blue-50 font-mono text-xs font-medium text-blue-600 hover:text-blue-800 transition-all mb-1"
        >
          <ExternalLink className="w-4 h-4 flex-shrink-0" />
          <span className="uppercase tracking-wide">View Live Site</span>
        </Link>
        <Link
          href="/admin/settings"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2.5 px-3 py-2 rounded-sm hover:bg-gray-100 font-mono text-xs font-medium text-black/60 hover:text-black transition-all"
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          <span className="uppercase tracking-wide">Settings</span>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex w-56 bg-white border-r-2 border-black flex-shrink-0 flex-col h-screen sticky top-0 z-50">
        <div className="px-4 py-3 border-b-2 border-black bg-primary">
          <h1 className="font-mono font-black text-sm tracking-tight text-black">FoundersPrime</h1>
          <p className="font-mono text-[9px] font-bold text-black/60 uppercase">Admin v2.0</p>
        </div>
        <NavContent />
      </nav>

      {/* Mobile Top Bar */}
      <div className="md:hidden sticky top-0 z-50 bg-primary border-b-2 border-black flex items-center justify-between px-3 h-11">
        <div>
          <h1 className="font-mono font-black text-sm tracking-tight text-black leading-none">FoundersPrime</h1>
          <p className="font-mono text-[8px] font-bold text-black/60 uppercase">Admin</p>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-center w-8 h-8 border border-black bg-white"
          aria-label={mobileOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
          <nav className="fixed inset-y-0 left-0 z-50 w-60 bg-white border-r-2 border-black flex flex-col md:hidden overflow-y-auto">
            <div className="px-3 py-2.5 border-b-2 border-black bg-primary flex items-center justify-between">
              <div>
                <h1 className="font-mono font-black text-sm tracking-tight text-black">FoundersPrime</h1>
                <p className="font-mono text-[8px] font-bold text-black/60 uppercase">Admin v2.0</p>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-7 h-7 border border-black bg-white"
                aria-label="Close sidebar"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <NavContent />
          </nav>
        </>
      )}
    </>
  )
}
