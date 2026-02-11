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
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
      {/* Simple Header */}
      <header className="sticky top-0 z-50 w-full border-b-3 border-black bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center bg-black text-white rounded-sm">
              <span className="material-symbols-outlined text-xl">token</span>
            </div>
            <span className="font-mono text-xl font-bold uppercase">FoundersPrime</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          {/* Error Code */}
          <div className="mb-8">
            <div className="inline-block border-3 border-black bg-accent-red px-6 py-3 shadow-[6px_6px_0px_#111111] mb-6">
              <span className="font-mono text-sm font-bold uppercase text-white">Server Error</span>
            </div>
            <h1 className="font-mono text-[120px] md:text-[180px] font-black leading-none text-black">
              500
            </h1>
          </div>

          {/* Message */}
          <div className="border-3 border-black bg-white p-8 shadow-[6px_6px_0px_#111111] mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="material-symbols-outlined text-4xl text-accent-red">warning</span>
              <h2 className="font-mono text-2xl font-bold uppercase">Something Went Wrong</h2>
            </div>
            <p className="text-gray-600 mb-6">
              We encountered an unexpected error. Our team has been notified and is working on it.
              Please try again in a few moments.
            </p>
            <div className="font-mono text-sm text-gray-500 bg-gray-100 p-3 border-2 border-gray-200 rounded-sm">
              <code>ERROR: INTERNAL_SERVER_ERROR</code>
              {error.digest && (
                <span className="block mt-1 text-xs">Reference: {error.digest}</span>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="border-3 border-black bg-white p-6 shadow-[6px_6px_0px_#111111] mb-8">
            <h3 className="font-mono text-lg font-bold uppercase mb-4 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">info</span>
              System Status
            </h3>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="h-3 w-3 rounded-full bg-yellow-500 animate-pulse"></span>
              <span className="font-mono">Investigating issue...</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Check our <a href="/changelog" className="text-primary underline">status page</a> for updates
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 border-3 border-black bg-primary px-8 py-3 font-mono text-sm font-bold uppercase tracking-wide text-black shadow-[6px_6px_0px_#111111] hover:bg-primary-dark hover:shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <span className="material-symbols-outlined">refresh</span>
              Try Again
            </button>
            <Link 
              href="/"
              className="inline-flex items-center justify-center gap-2 border-3 border-black bg-white px-8 py-3 font-mono text-sm font-bold uppercase tracking-wide text-black shadow-[6px_6px_0px_#111111] hover:bg-gray-50 hover:shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <span className="material-symbols-outlined">home</span>
              Go Home
            </Link>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t-3 border-black bg-black py-6">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="font-mono text-sm text-gray-400">
            © 2024 FoundersPrime. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
