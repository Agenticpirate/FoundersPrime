import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-[#FAF9F5] dark:bg-[#000000] text-black dark:text-white transition-colors duration-300 p-4">
        <div className="mx-auto max-w-2xl px-4 py-8 text-center">
          {/* Error Code */}
          <div className="mb-4 md:mb-6">
            <div className="inline-block border-2 border-black dark:border-accent-yellow/40 bg-accent-yellow px-6 py-2 shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,221,0,0.2)] mb-6 rounded-md">
              <span className="font-mono text-xs font-bold uppercase text-black">Error Code</span>
            </div>
            <h1 className="font-mono text-[100px] md:text-[150px] font-black leading-none text-black dark:text-white">
              404
            </h1>
          </div>

          {/* Message */}
          <div className="border-2 border-black dark:border-white/10 bg-white dark:bg-[#0c0c0c] p-6 md:p-8 shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_rgba(255,255,255,0.05)] mb-4 md:mb-6 rounded-xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="material-symbols-outlined text-3xl text-accent-red" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
              <h2 className="font-mono text-lg font-black uppercase text-black dark:text-white tracking-wide">Page Not Found</h2>
            </div>
            <p className="font-sans text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              The page you're looking for doesn't exist or has been moved. 
              Don't worry, even the best founders take wrong turns sometimes.
            </p>
            <div className="font-mono text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 p-3 border border-black/10 dark:border-white/10 rounded-lg">
              <code>ERROR: RESOURCE_NOT_FOUND</code>
            </div>
          </div>

          {/* Suggestions */}
          <div className="border-2 border-black dark:border-white/10 bg-white dark:bg-[#0c0c0c] p-6 shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_rgba(255,255,255,0.05)] mb-6 rounded-xl">
            <h3 className="font-mono text-sm font-black uppercase mb-4 flex items-center justify-center gap-2 text-black dark:text-white">
              <span className="material-symbols-outlined text-accent-yellow" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
              Suggestions
            </h3>
            <ul className="text-left space-y-3 font-sans text-xs md:text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-green-500 text-base flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span>Check the URL for typos</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-green-500 text-base flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span>Use search to find what you're looking for</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-green-500 text-base flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span>Browse our deals, startups, or ideas sections</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              href="/"
              className="inline-flex items-center justify-center gap-2 border-2 border-black bg-accent-yellow px-8 py-3 font-mono text-xs font-black uppercase tracking-wider text-black shadow-[4px_4px_0px_#000] hover:bg-white hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-md"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              Go Home
            </Link>
            <Link 
              href="/deals"
              className="inline-flex items-center justify-center gap-2 border-2 border-black dark:border-white/10 bg-white dark:bg-white/5 px-8 py-3 font-mono text-xs font-black uppercase tracking-wider text-black dark:text-white shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.05)] hover:bg-black hover:text-white dark:hover:text-black dark:hover:bg-white hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-md"
            >
              <span className="material-symbols-outlined text-sm">local_offer</span>
              Browse Deals
            </Link>
            <Link 
              href="/search"
              className="inline-flex items-center justify-center gap-2 border-2 border-black dark:border-white/10 bg-white dark:bg-white/5 px-8 py-3 font-mono text-xs font-black uppercase tracking-wider text-black dark:text-white shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.05)] hover:bg-black hover:text-white dark:hover:text-black dark:hover:bg-white hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-md"
            >
              <span className="material-symbols-outlined text-sm">search</span>
              Search
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
