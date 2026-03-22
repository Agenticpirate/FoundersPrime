'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function DealsNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background-light border-b-3 border-[#1a1a1a]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-ink text-white flex items-center justify-center border-2 border-ink">
              <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
            </div>
            <Link className="text-xl md:text-2xl font-bold font-display tracking-tight uppercase" href="/">
              FoundersPrime
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-base font-bold font-mono hover:text-primary decoration-2 underline-offset-4 hover:underline" href="/deals">
              DEALS
            </Link>

            <div className="relative group">
              <button className="flex items-center gap-1 text-base font-bold font-mono hover:text-primary decoration-2 underline-offset-4 hover:underline uppercase">
                Programs
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>

              <div className="absolute top-full left-0 w-48 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="flex flex-col py-2">
                  <Link href="/programs/accelerators" className="px-4 py-2 text-sm font-bold hover:bg-black hover:text-white transition-colors font-mono uppercase">
                    Accelerators
                  </Link>
                  <Link href="/programs/incubators" className="px-4 py-2 text-sm font-bold hover:bg-black hover:text-white transition-colors font-mono uppercase">
                    Incubators
                  </Link>
                  <Link href="/programs/grants" className="px-4 py-2 text-sm font-bold hover:bg-black hover:text-white transition-colors font-mono uppercase">
                    Grants
                  </Link>
                </div>
              </div>
            </div>

            <Link className="text-base font-bold font-mono hover:text-primary decoration-2 underline-offset-4 hover:underline" href="/ideas">
              IDEAS
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="h-10 px-6 flex items-center border-3 border-ink font-bold hover:bg-ink hover:text-white transition-colors text-sm uppercase font-mono tracking-wider">
              Login
            </Link>
            <Link href="/pricing" className="h-10 px-6 flex items-center text-sm uppercase font-mono tracking-wider bg-accent-yellow border-3 border-ink shadow-[3px_3px_0px_0px_#111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_#111] transition-all font-bold">
              Sign Up
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 border-2 border-black"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="material-symbols-outlined text-xl">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t-2 border-black animate-slideDown">
          <nav className="flex flex-col divide-y divide-gray-100 px-4">
            <Link
              href="/deals"
              onClick={() => setMobileOpen(false)}
              className="py-3 text-sm font-bold font-mono uppercase tracking-wide text-black hover:text-primary"
            >
              All Deals
            </Link>
            <Link
              href="/deals/cloud-credits"
              onClick={() => setMobileOpen(false)}
              className="py-3 text-sm font-bold font-mono uppercase tracking-wide text-black hover:text-primary"
            >
              Cloud Credits
            </Link>
            <Link
              href="/deals/saas-discounts"
              onClick={() => setMobileOpen(false)}
              className="py-3 text-sm font-bold font-mono uppercase tracking-wide text-black hover:text-primary"
            >
              SaaS Discounts
            </Link>
            <Link
              href="/deals/ad-credits"
              onClick={() => setMobileOpen(false)}
              className="py-3 text-sm font-bold font-mono uppercase tracking-wide text-black hover:text-primary"
            >
              Ad Credits
            </Link>
            <Link
              href="/programs/accelerators"
              onClick={() => setMobileOpen(false)}
              className="py-3 text-sm font-bold font-mono uppercase tracking-wide text-black hover:text-primary"
            >
              Accelerators
            </Link>
            <Link
              href="/programs/incubators"
              onClick={() => setMobileOpen(false)}
              className="py-3 text-sm font-bold font-mono uppercase tracking-wide text-black hover:text-primary"
            >
              Incubators
            </Link>
            <Link
              href="/programs/grants"
              onClick={() => setMobileOpen(false)}
              className="py-3 text-sm font-bold font-mono uppercase tracking-wide text-black hover:text-primary"
            >
              Grants
            </Link>
            <Link
              href="/ideas"
              onClick={() => setMobileOpen(false)}
              className="py-3 text-sm font-bold font-mono uppercase tracking-wide text-black hover:text-primary"
            >
              Ideas
            </Link>
          </nav>
          <div className="flex gap-2 px-4 py-3 border-t-2 border-black">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center py-3 text-sm font-bold font-mono uppercase border-2 border-black hover:bg-black hover:text-white transition-all"
            >
              Log In
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center py-3 text-sm font-bold font-mono uppercase border-2 border-black bg-accent-yellow hover:bg-yellow-400 transition-all"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
