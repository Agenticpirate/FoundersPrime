'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  Handshake,
  Building2,
  Lightbulb,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  FileText,
  Menu,
  X
} from 'lucide-react'

interface NavItem {
  name: string
  href: string
  icon: any
}

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
    <>
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {navigation.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 border-3 transition-all font-mono min-h-[44px] ${
                active
                  ? 'bg-black text-white border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group'
                  : 'hover:bg-primary/20 border-transparent hover:border-black hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${active ? 'group-hover:text-primary transition-colors' : ''}`} />
              <span className={`${active ? 'font-bold uppercase' : 'font-medium'}`}>
                {item.name}
              </span>
            </Link>
          )
        })}

        <div className="mt-auto pt-4 border-t-3 border-black">
          <Link
            href="/admin/settings"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-4 py-3 hover:bg-accent-yellow/20 border-3 border-transparent hover:border-black transition-all hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-mono font-medium min-h-[44px]"
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex w-72 bg-paper border-r-3 border-black flex-shrink-0 flex-col h-screen sticky top-0 z-50">
        <div className="p-6 border-b-3 border-black bg-primary">
          <h1 className="font-display font-bold text-2xl tracking-tight text-black">FoundersPrime</h1>
          <p className="font-mono text-sm font-medium mt-1">ADMIN PORTAL v2.0</p>
        </div>
        <NavContent />
      </nav>

      {/* Mobile Top Bar */}
      <div className="md:hidden sticky top-0 z-50 bg-primary border-b-3 border-black flex items-center justify-between px-4 h-14">
        <div>
          <h1 className="font-display font-bold text-lg tracking-tight text-black leading-none">FoundersPrime</h1>
          <p className="font-mono text-[10px] font-medium text-black/70">ADMIN PORTAL</p>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-center w-10 h-10 border-2 border-black bg-white"
          aria-label={mobileOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="fixed inset-y-0 left-0 z-50 w-72 bg-paper border-r-3 border-black flex flex-col md:hidden overflow-y-auto">
            <div className="p-4 border-b-3 border-black bg-primary flex items-center justify-between">
              <div>
                <h1 className="font-display font-bold text-xl tracking-tight text-black">FoundersPrime</h1>
                <p className="font-mono text-xs font-medium mt-0.5">ADMIN PORTAL v2.0</p>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-8 h-8 border-2 border-black bg-white"
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
