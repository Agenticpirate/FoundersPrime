'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#FAF9F5] dark:bg-[#000000] text-black dark:text-white transition-colors duration-300">
      {/* Simple Header */}
      <header className="sticky top-0 z-50 w-full border-b-2 border-black dark:border-white/10 bg-[#FAF9F5] dark:bg-[#000000]">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <img
              src="/logo-icon.png"
              alt="FoundersPrime"
              className="h-10 w-auto object-contain"
            />
            <span className="font-mono text-xl font-black tracking-widest uppercase text-black dark:text-white">
              FOUNDERS<span className="text-accent-yellow">[</span>PRIME<span className="text-accent-yellow">]</span>
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="mx-auto max-w-2xl px-4 py-8 text-center">
          {/* Error Code */}
          <div className="mb-4 md:mb-6">
            <div className="inline-block border-2 border-black dark:border-accent-red/40 bg-accent-red px-6 py-2 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(239,68,68,0.2)] mb-6 rounded-md">
              <span className="font-mono text-xs font-bold uppercase text-white tracking-wider">Server Error</span>
            </div>
            <h1 className="font-mono text-[100px] md:text-[150px] font-black leading-none text-black dark:text-white">
              500
            </h1>
          </div>

          {/* Message */}
          <div className="border-2 border-black dark:border-white/10 bg-white dark:bg-[#0c0c0c] p-6 md:p-8 shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_rgba(255,255,255,0.05)] mb-4 md:mb-6 rounded-xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="material-symbols-outlined text-3xl text-accent-red" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              <h2 className="font-mono text-lg font-black uppercase text-black dark:text-white tracking-wide">Something Went Wrong</h2>
            </div>
            <p className="font-sans text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              We encountered an unexpected error. Our team has been notified and is working on it.
              Please try again in a few moments.
            </p>
            <div className="font-mono text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 p-3 border border-black/10 dark:border-white/10 rounded-lg">
              <code>ERROR: INTERNAL_SERVER_ERROR</code>
              {error.digest && (
                <span className="block mt-1.5 text-[10px] text-gray-400 dark:text-gray-500">Reference: {error.digest}</span>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="border-2 border-black dark:border-white/10 bg-white dark:bg-[#0c0c0c] p-6 shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_rgba(255,255,255,0.05)] mb-6 rounded-xl">
            <h3 className="font-mono text-sm font-black uppercase mb-3.5 flex items-center justify-center gap-2 text-black dark:text-white">
              <span className="material-symbols-outlined text-accent-yellow" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
              System Status
            </h3>
            <div className="flex items-center justify-center gap-2 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
              <span className="font-mono text-gray-700 dark:text-gray-300">Investigating issue...</span>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2.5">
              Check our <Link href="/status" className="text-accent-yellow underline hover:text-white transition-colors">status page</Link> for updates
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 border-2 border-black bg-accent-yellow px-8 py-3 font-mono text-xs font-black uppercase tracking-wider text-black shadow-[4px_4px_0px_#000] hover:bg-white hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-md"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
              Try Again
            </button>
            <Link 
              href="/"
              className="inline-flex items-center justify-center gap-2 border-2 border-black dark:border-white/10 bg-white dark:bg-white/5 px-8 py-3 font-mono text-xs font-black uppercase tracking-wider text-black dark:text-white shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.05)] hover:bg-black hover:text-white dark:hover:text-black dark:hover:bg-white hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-md"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              Go Home
            </Link>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-white/10 bg-black py-6">
        <div className="mx-auto max-w-[1600px] px-4 text-center">
          <p className="font-mono text-xs text-gray-500">
            © 2026 FoundersPrime. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
