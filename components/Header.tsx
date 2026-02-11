'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth/hooks'
import { useEffect, useState } from 'react'
import { checkProStatus } from '@/lib/auth/user-context'

export default function Header() {
  const { user, loading, signOut } = useAuth()
  const [isPro, setIsPro] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAccess = async () => {
      if (user) {
        const { isPro: hasProAccess, isAdmin: hasAdminAccess } = await checkProStatus()
        setIsPro(hasProAccess)
        setIsAdmin(hasAdminAccess)
      }
    }
    checkAccess()
  }, [user])

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu when route changes or user logs out
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [user])

  return (
    <header className="sticky top-0 z-50 bg-[#f6f8f8] border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          <div className="flex-shrink-0 flex items-center">
            <Link className="text-xl md:text-2xl font-bold tracking-tighter text-black flex items-center gap-2 font-mono" href="/">
              <div className="w-8 h-8 relative">
                <img src="/logo.svg" alt="FoundersPrime Logo" className="w-full h-full object-contain" />
              </div>
              <span>FOUNDERS<span className="text-blue-600">[</span>PRIME<span className="text-blue-600">]</span></span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-6 items-center font-mono text-sm uppercase tracking-tight">
            {/* Deals Dropdown */}
            <div className="relative group">
              <Link className="text-black font-bold hover:text-primary flex items-center gap-1 py-6" href="/deals">
                Deals <span className="material-symbols-outlined text-sm">expand_more</span>
              </Link>
              <div className="absolute left-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white border-3 border-black shadow-[6px_6px_0px_#111111] min-w-[220px]">
                  <Link href="/deals" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">local_offer</span>
                    All Deals
                  </Link>
                  <Link href="/deals/cloud-credits" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">cloud</span>
                    Cloud Credits
                  </Link>
                  <Link href="/deals/saas-discounts" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">apps</span>
                    SaaS Discounts
                  </Link>
                  <Link href="/deals/ad-credits" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">campaign</span>
                    Ad Credits
                  </Link>
                </div>
              </div>
            </div>

            {/* Programs Dropdown */}
            <div className="relative group">
              <Link className="text-black font-bold hover:text-primary flex items-center gap-1 py-6" href="/deals/accelerators">
                Programs <span className="material-symbols-outlined text-sm">expand_more</span>
              </Link>
              <div className="absolute left-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white border-3 border-black shadow-[6px_6px_0px_#111111] min-w-[220px]">
                  <Link href="/deals/accelerators" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">rocket_launch</span>
                    Accelerators
                  </Link>
                  <Link href="/deals/incubators" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">lightbulb</span>
                    Incubators
                  </Link>
                  <Link href="/deals/grants" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">payments</span>
                    Grants
                  </Link>
                </div>
              </div>
            </div>

            {/* Student Benefits Dropdown */}
            <div className="relative group">
              <Link className="text-black font-bold hover:text-primary flex items-center gap-1 py-6" href="#">
                Student Benefits <span className="material-symbols-outlined text-sm">expand_more</span>
              </Link>
              <div className="absolute left-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white border-3 border-black shadow-[6px_6px_0px_#111111] min-w-[240px]">
                  <Link href="/resources/free-access" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">school</span>
                    Free Access
                  </Link>
                  <Link href="/resources/credits-savings" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">savings</span>
                    Credits & Savings
                  </Link>
                  <Link href="/resources/funding-opportunities" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">monetization_on</span>
                    Funding & Opportunities
                  </Link>
                </div>
              </div>
            </div>

            {/* Resources Dropdown */}
            <div className="relative group">
              <Link className="text-black font-bold hover:text-primary flex items-center gap-1 py-6" href="/resources">
                Resources <span className="material-symbols-outlined text-sm">expand_more</span>
              </Link>
              <div className="absolute left-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white border-3 border-black shadow-[6px_6px_0px_#111111] min-w-[220px]">
                  <Link href="/startups" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">verified</span>
                    Verified Startups
                  </Link>
                  <Link href="/ideas" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">emoji_objects</span>
                    Startup Ideas
                  </Link>
                  <Link href="/community" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">groups</span>
                    Community
                  </Link>
                  <Link href="/resources" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">folder_open</span>
                    Templates & Guides
                  </Link>
                  <Link href="/blog" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">article</span>
                    Blog
                  </Link>
                  <Link href="/about" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">info</span>
                    About Us
                  </Link>
                  <Link href="/contact" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">mail</span>
                    Contact
                  </Link>
                </div>
              </div>
            </div>

            <Link className="text-black font-bold hover:text-primary" href="/pricing">Pricing</Link>

          </nav>

          <div className="hidden md:flex items-center gap-4">
            {loading ? (
              <div className="w-24 h-10 bg-gray-200 animate-pulse"></div>
            ) : user ? (
              <>

                <div className="relative group">
                  <button className="neo-border neo-shadow bg-white text-black font-mono font-bold py-2 px-4 rounded-none text-sm transition-all uppercase flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">account_circle</span>
                    {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
                    {isPro && (
                      <span className="bg-accent-yellow text-black text-xs px-2 py-0.5 rounded-sm border border-black font-bold ml-1">
                        PRO
                      </span>
                    )}
                    {isAdmin && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-sm border border-black font-bold ml-1">
                        ADMIN
                      </span>
                    )}
                    <span className="material-symbols-outlined text-sm">expand_more</span>
                  </button>
                  <div className="absolute right-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white border-3 border-black shadow-[6px_6px_0px_#111111] min-w-[180px]">
                      <Link href="/dashboard" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">dashboard</span>
                        Dashboard
                      </Link>
                      {isAdmin && (
                        <Link href="/admin" className="block px-4 py-3 text-sm font-bold hover:bg-red-50 border-b border-black/10 flex items-center gap-2 text-red-600">
                          <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
                          Admin Panel
                        </Link>
                      )}
                      <Link href="/billing" className="block px-4 py-3 text-sm font-bold hover:bg-primary/20 border-b border-black/10 flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">credit_card</span>
                        Billing
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="w-full text-left px-4 py-3 text-sm font-bold hover:bg-red-100 text-red-600 flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-lg">logout</span>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link className="text-black font-mono font-bold text-sm hover:underline uppercase" href="/login">Log In</Link>
                <Link href="/pricing" className="neo-border neo-shadow bg-accent-yellow text-black font-mono font-bold py-2 px-5 rounded-none text-sm transition-all uppercase flex items-center gap-2">
                  Get Started
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              className="text-black p-2 neo-border bg-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 hidden-scrollbar bg-[#f6f8f8] border-b-2 border-black border-t-2 overflow-y-auto max-h-[calc(100vh-80px)] shadow-xl z-40">
            <div className="p-4 space-y-4">
              <nav className="flex flex-col space-y-2">
                <Link href="/deals" className="block px-4 py-3 font-mono font-bold uppercase hover:bg-primary/10 border-2 border-transparent hover:border-black transition-all" onClick={() => setMobileMenuOpen(false)}>
                  Deals
                </Link>
                <Link href="/deals/accelerators" className="block px-4 py-3 font-mono font-bold uppercase hover:bg-primary/10 border-2 border-transparent hover:border-black transition-all" onClick={() => setMobileMenuOpen(false)}>
                  Programs
                </Link>
                <Link href="/startups" className="block px-4 py-3 font-mono font-bold uppercase hover:bg-primary/10 border-2 border-transparent hover:border-black transition-all" onClick={() => setMobileMenuOpen(false)}>
                  Startups
                </Link>
                <Link href="/resources" className="block px-4 py-3 font-mono font-bold uppercase hover:bg-primary/10 border-2 border-transparent hover:border-black transition-all" onClick={() => setMobileMenuOpen(false)}>
                  Resources
                </Link>
                <Link href="/pricing" className="block px-4 py-3 font-mono font-bold uppercase hover:bg-primary/10 border-2 border-transparent hover:border-black transition-all" onClick={() => setMobileMenuOpen(false)}>
                  Pricing
                </Link>
              </nav>

              <hr className="border-black/10" />

              <div className="space-y-4 pt-2">
                {user ? (
                  <>
                    <div className="px-4 py-2 flex items-center gap-2 font-mono font-bold">
                      <span className="material-symbols-outlined">account_circle</span>
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </div>
                    <Link href="/dashboard" className="w-full block text-center px-4 py-3 neo-border bg-white font-mono font-bold uppercase hover:shadow-[4px_4px_0px_#111111] transition-all" onClick={() => setMobileMenuOpen(false)}>
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { signOut(); setMobileMenuOpen(false); }}
                      className="w-full text-center px-4 py-3 neo-border bg-red-100 text-red-600 font-mono font-bold uppercase hover:bg-red-200 transition-all"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="w-full block text-center px-4 py-3 neo-border bg-white font-mono font-bold uppercase hover:shadow-[4px_4px_0px_#111111] transition-all" onClick={() => setMobileMenuOpen(false)}>
                      Log In
                    </Link>
                    <Link href="/pricing" className="w-full block text-center px-4 py-3 neo-border bg-accent-yellow font-mono font-bold uppercase hover:shadow-[4px_4px_0px_#111111] transition-all" onClick={() => setMobileMenuOpen(false)}>
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
