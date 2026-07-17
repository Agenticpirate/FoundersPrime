'use client'

import { useEffect, useState } from 'react'
import { Shield, Lock, AlertTriangle, LogIn, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { checkAdminStatus, type AdminUser } from '@/lib/admin/auth'

interface AdminAuthGuardProps {
  children: React.ReactNode
  requiredPermission?: 'deals' | 'users' | 'analytics' | 'settings'
}

function AdminGateShell({
  icon: Icon,
  iconClass,
  title,
  children,
}: {
  icon: typeof Shield
  iconClass: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#090a0f] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0d0e12] p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        <div
          className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl border mb-6 ${iconClass}`}
        >
          <Icon className="w-7 h-7" />
        </div>
        <h1 className="font-mono text-xl font-black uppercase tracking-wider text-white mb-3">
          {title}
        </h1>
        {children}
      </div>
    </div>
  )
}

export default function AdminAuthGuard({ children, requiredPermission }: AdminAuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const result = await checkAdminStatus()
        setIsAuthenticated(result.isAuthenticated)
        setIsAdmin(result.isAdmin)
        setAdminUser(result.adminUser)
      } catch (err) {
        console.error('Admin verification error:', err)
      } finally {
        setIsLoading(false)
      }
    }
    verifyAdmin()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#090a0f] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-accent-yellow/[0.06] blur-3xl"
        />

        <div className="relative flex flex-col items-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-2xl bg-accent-yellow/20 blur-xl animate-pulse" />
            <div className="relative w-16 h-16 rounded-2xl border border-accent-yellow/30 bg-[#0d0e12] flex items-center justify-center">
              <Shield className="w-8 h-8 text-accent-yellow" />
            </div>
          </div>

          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent-yellow mb-2">
            FoundersPrime Admin
          </p>
          <h2 className="font-mono text-lg font-black text-white tracking-wide mb-2">
            Verifying access
          </h2>
          <p className="font-mono text-xs text-zinc-500 mb-8 text-center max-w-xs">
            Checking session and administrative privileges
          </p>

          <div className="w-48 h-1 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full w-1/3 rounded-full bg-accent-yellow admin-load-bar" />
          </div>

          <ul className="mt-8 space-y-2 font-mono text-[11px] text-zinc-500">
            {['Secure session', 'Identity', 'Admin privileges'].map((line) => (
              <li key={line} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow/60 animate-pulse" />
                {line}
              </li>
            ))}
          </ul>
        </div>

        <style jsx>{`
          .admin-load-bar {
            animation: adminLoadBar 1.2s ease-in-out infinite;
          }
          @keyframes adminLoadBar {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(350%);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .admin-load-bar {
              animation: none;
              width: 100%;
            }
          }
        `}</style>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <AdminGateShell
        icon={Lock}
        iconClass="bg-red-500/15 border-red-500/30 text-red-400"
        title="Authentication required"
      >
        <p className="text-zinc-400 font-mono text-sm mb-6 leading-relaxed">
          Sign in with an admin account to open the command center.
        </p>
        <div className="space-y-2.5">
          <Link
            href="/login?redirect=/admin"
            className="flex items-center justify-center gap-2 w-full min-h-[48px] rounded-xl bg-accent-yellow text-black font-mono font-black text-xs uppercase tracking-wide hover:bg-yellow-300 transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Login to continue
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full min-h-[44px] rounded-xl border border-white/10 text-zinc-400 font-mono text-xs font-bold uppercase hover:border-white/20 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </AdminGateShell>
    )
  }

  if (!isAdmin) {
    return (
      <AdminGateShell
        icon={AlertTriangle}
        iconClass="bg-amber-500/15 border-amber-500/30 text-accent-yellow"
        title="Access denied"
      >
        <p className="text-zinc-400 font-mono text-sm mb-4 leading-relaxed">
          This account does not have administrative privileges.
        </p>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 mb-6 text-left">
          <p className="font-mono text-[11px] text-zinc-500 leading-relaxed">
            Need access? Contact{' '}
            <a
              href="mailto:support@foundersprime.com"
              className="text-accent-yellow hover:underline"
            >
              support@foundersprime.com
            </a>{' '}
            or confirm you&apos;re signed into the correct admin email.
          </p>
        </div>
        <div className="space-y-2.5">
          <Link
            href="/dashboard"
            className="flex items-center justify-center w-full min-h-[48px] rounded-xl bg-accent-yellow text-black font-mono font-black text-xs uppercase tracking-wide hover:bg-yellow-300 transition-colors"
          >
            Go to member dashboard
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center w-full min-h-[44px] rounded-xl border border-white/10 text-zinc-400 font-mono text-xs font-bold uppercase hover:border-white/20 hover:text-white transition-colors"
          >
            Back to home
          </Link>
        </div>
      </AdminGateShell>
    )
  }

  if (requiredPermission && adminUser && !adminUser.permissions?.[requiredPermission]) {
    return (
      <AdminGateShell
        icon={Shield}
        iconClass="bg-orange-500/15 border-orange-500/30 text-orange-400"
        title="Permission required"
      >
        <p className="text-zinc-400 font-mono text-sm mb-6 leading-relaxed">
          You don&apos;t have the{' '}
          <span className="text-white font-bold">{requiredPermission}</span> permission for this
          section.
        </p>
        <Link
          href="/admin"
          className="flex items-center justify-center w-full min-h-[48px] rounded-xl bg-accent-yellow text-black font-mono font-black text-xs uppercase tracking-wide hover:bg-yellow-300 transition-colors"
        >
          Back to admin
        </Link>
      </AdminGateShell>
    )
  }

  return <>{children}</>
}

export { type AdminUser }
