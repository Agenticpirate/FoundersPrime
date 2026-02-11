'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Handshake,
  Building2,
  Lightbulb,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  FileText
} from 'lucide-react'

interface NavItem {
  name: string
  href: string
  icon: any
}

const navigation: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    name: 'Submissions',
    href: '/admin/submissions',
    icon: FileText,
  },
  {
    name: 'Deals',
    href: '/admin/deals',
    icon: Handshake,
  },
  {
    name: 'Startups',
    href: '/admin/startups',
    icon: Building2,
  },
  {
    name: 'Ideas',
    href: '/admin/ideas',
    icon: Lightbulb,
  },
  {
    name: 'Resources',
    href: '/admin/resources',
    icon: FileText,
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    name: 'Comments',
    href: '/admin/comments',
    icon: MessageSquare,
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="w-full md:w-72 bg-paper border-b-3 md:border-b-0 md:border-r-3 border-black flex-shrink-0 flex flex-col h-auto md:h-screen sticky top-0 z-50">
      {/* Header */}
      <div className="p-6 border-b-3 border-black bg-primary">
        <h1 className="font-display font-bold text-2xl tracking-tight text-black">FoundersPrime</h1>
        <p className="font-mono text-sm font-medium mt-1">ADMIN PORTAL v2.0</p>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {navigation.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 border-3 transition-all font-mono ${active
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

        {/* Settings at bottom */}
        <div className="mt-auto pt-4 border-t-3 border-black">
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 hover:bg-accent-yellow/20 border-3 border-transparent hover:border-black transition-all hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-mono font-medium"
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}