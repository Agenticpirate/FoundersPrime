'use client'

import { useEffect, useState } from 'react'
import { Shield, Lock, AlertTriangle, LogIn } from 'lucide-react'
import Link from 'next/link'
import { checkAdminStatus, AdminUser } from '@/lib/admin/auth'

interface AdminAuthGuardProps {
  children: React.ReactNode
  requiredPermission?: 'deals' | 'users' | 'analytics' | 'settings'
}

export default function AdminAuthGuard({ children, requiredPermission }: AdminAuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const result = await checkAdminStatus()
        
        setIsAuthenticated(result.isAuthenticated)
        setIsAdmin(result.isAdmin)
        setAdminUser(result.adminUser)
        
        if (result.error && !result.isAdmin) {
          setError(result.error)
        }
      } catch (err) {
        console.error('Admin verification error:', err)
        setError('Failed to verify admin status')
      } finally {
        setIsLoading(false)
      }
    }

    verifyAdmin()
  }, [])

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
        <div className="relative bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-10 text-center w-full max-w-sm">
          {/* top scan line */}
          <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
            <div className="h-full w-1/3 bg-[#13b6ec]" style={{ animation: 'agScan 1.4s ease-in-out infinite' }} />
          </div>

          {/* shield with expanding pulse rings */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <span className="absolute inline-flex h-20 w-20 rounded-full bg-[#13b6ec]/30" style={{ animation: 'agPing 1.8s cubic-bezier(0,0,0.2,1) infinite' }} />
            <span className="absolute inline-flex h-20 w-20 rounded-full bg-[#13b6ec]/20" style={{ animation: 'agPing 1.8s cubic-bezier(0,0,0.2,1) infinite', animationDelay: '0.6s' }} />
            <div className="relative bg-[#13b6ec] border-[3px] border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Shield className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>

          <h2 className="text-xl font-black font-mono text-black mb-2 tracking-tight">
            VERIFYING_ACCESS
            <span className="text-[#13b6ec]" style={{ animation: 'agBlink 1s step-end infinite' }}>_</span>
          </h2>
          <p className="text-gray-600 font-mono text-sm mb-6">
            Checking administrative privileges
            <span style={{ animation: 'agBlink 1.2s step-end infinite' }}>.</span>
            <span style={{ animation: 'agBlink 1.2s step-end infinite', animationDelay: '0.2s' }}>.</span>
            <span style={{ animation: 'agBlink 1.2s step-end infinite', animationDelay: '0.4s' }}>.</span>
          </p>

          {/* live status checklist */}
          <div className="text-left font-mono text-[11px] space-y-2 mb-6">
            {[
              'Establishing secure session',
              'Authenticating identity',
              'Resolving admin privileges',
            ].map((line, i) => (
              <div
                key={line}
                className="flex items-center gap-2 text-gray-700"
                style={{ animation: 'agFade 0.5s ease both', animationDelay: `${i * 0.35}s` }}
              >
                <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full inline-block animate-spin" />
                {line}
              </div>
            ))}
          </div>

          {/* indeterminate progress bar */}
          <div className="relative h-2 w-full border-2 border-black bg-white overflow-hidden">
            <div className="absolute inset-y-0 w-1/3 bg-black" style={{ animation: 'agBar 1.3s ease-in-out infinite' }} />
          </div>
        </div>

        <style jsx global>{`
          @keyframes agPing { 0% { transform: scale(1); opacity: 0.6 } 80%, 100% { transform: scale(1.9); opacity: 0 } }
          @keyframes agBlink { 0%, 50% { opacity: 1 } 50.01%, 100% { opacity: 0 } }
          @keyframes agFade { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
          @keyframes agScan { 0% { transform: translateX(-100%) } 100% { transform: translateX(400%) } }
          @keyframes agBar { 0% { left: -35% } 100% { left: 100% } }
          @media (prefers-reduced-motion: reduce) {
            [style*="agPing"], [style*="agBlink"], [style*="agScan"], [style*="agBar"] { animation: none !important }
          }
        `}</style>
      </div>
    )
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 text-center">
            <div className="bg-red-500 border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block mb-6">
              <Lock className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-2xl font-bold font-mono text-black mb-4">
              AUTHENTICATION_REQUIRED
            </h1>
            
            <p className="text-gray-700 mb-6">
              You must be logged in to access the admin panel.
            </p>
            
            <div className="space-y-4">
              <Link 
                href="/login?redirect=/admin"
                className="flex items-center justify-center gap-2 w-full bg-[#13b6ec] hover:bg-[#0ea5db] text-white font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
              >
                <LogIn className="w-5 h-5" />
                Login to Continue
              </Link>
              
              <Link 
                href="/"
                className="block w-full bg-gray-200 hover:bg-gray-100 text-black font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Authenticated but not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 text-center">
            <div className="bg-yellow-500 border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block mb-6">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-2xl font-bold font-mono text-black mb-4">
              ACCESS_DENIED
            </h1>
            
            <p className="text-gray-700 mb-4">
              You don't have administrative privileges to access this area.
            </p>
            
            <div className="bg-gray-100 border-2 border-gray-300 p-4 mb-6 text-left">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Need admin access?</strong>
              </p>
              <p className="text-sm text-gray-600">
                If you believe you should have access, please contact the system administrator or ensure you&apos;re logged into the correct account. Contact us at <a href="mailto:support@foundersprime.com" className="text-[#13b6ec] hover:underline">
                  support@foundersprime.com
                </a>
              </p>
            </div>
            
            <div className="space-y-4">
              <Link 
                href="/dashboard"
                className="block w-full bg-[#13b6ec] hover:bg-[#0ea5db] text-white font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
              >
                Go to Dashboard
              </Link>
              
              <Link 
                href="/"
                className="block w-full bg-gray-200 hover:bg-gray-100 text-black font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Check specific permission if required
  if (requiredPermission && adminUser && !adminUser.permissions[requiredPermission]) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 text-center">
            <div className="bg-orange-500 border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-2xl font-bold font-mono text-black mb-4">
              PERMISSION_REQUIRED
            </h1>
            
            <p className="text-gray-700 mb-6">
              You don't have the <strong>{requiredPermission}</strong> permission to access this section.
            </p>
            
            <Link 
              href="/admin"
              className="block w-full bg-[#13b6ec] hover:bg-[#0ea5db] text-white font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
            >
              Back to Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Authenticated and admin - show admin content
  return <>{children}</>
}

// Export admin context for use in child components
export { type AdminUser }
