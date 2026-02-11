'use client'

import { ArrowLeft, Cookie, Eye, Settings, Shield } from 'lucide-react'
import Link from 'next/link'
import { useCookieConsent } from '@/context/CookieConsentContext'

export default function CookieHeader() {
  const { openModal } = useCookieConsent()
  return (
    <div className="mb-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-6">
        <Link href="/" className="hover:text-black transition-colors uppercase">
          Home
        </Link>
        <span>/</span>
        <span className="text-black font-bold uppercase">Cookie Policy</span>
      </div>

      {/* Header */}
      <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-6 mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="bg-accent-yellow border-2 border-black p-2 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm hidden sm:block">
            <Cookie className="w-6 h-6 text-black" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold font-mono text-black mb-2 uppercase tracking-tight">
              COOKIE_POLICY
            </h1>
            <p className="text-sm text-gray-800 leading-relaxed max-w-2xl font-sans">
              We use cookies to improve your experience, analyze site traffic, and personalize content.
              Here is everything you need to know about how and why we use them.
            </p>
          </div>
        </div>

        {/* Key Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm hover:-translate-y-0.5 transition-transform duration-200">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-black" />
              <span className="font-bold text-black font-mono text-sm">Full Transparency</span>
            </div>
            <p className="text-xs text-gray-600 font-sans">
              Complete list of all cookies we use and why
            </p>
          </div>

          <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm hover:-translate-y-0.5 transition-transform duration-200">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4 text-black" />
              <span className="font-bold text-black font-mono text-sm">Your Control</span>
            </div>
            <p className="text-xs text-gray-600 font-sans">
              Easy ways to manage and control your preferences
            </p>
          </div>

          <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm hover:-translate-y-0.5 transition-transform duration-200">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-black" />
              <span className="font-bold text-black font-mono text-sm">Privacy First</span>
            </div>
            <p className="text-xs text-gray-600 font-sans">
              No unnecessary tracking or data collection
            </p>
          </div>
        </div>

        {/* Cookie Settings Bar */}
        <div className="mt-6 pt-4 border-t-2 border-gray-100 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm font-bold text-black font-mono mb-1">
              Your Current Cookie Settings:
            </p>
            <p className="text-xs text-gray-600 font-sans">
              Essential cookies enabled, Analytics cookies enabled
            </p>
          </div>
          <button
            onClick={openModal}
            className="bg-[#13b6ec] hover:bg-black hover:text-white text-white font-bold py-2 px-4 border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-200 text-xs font-mono"
          >
            Manage Preferences
          </button>
        </div>
      </div>
    </div>
  )
}