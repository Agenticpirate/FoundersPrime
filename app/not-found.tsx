import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-background-light">
        <div className="mx-auto max-w-2xl px-4 py-5 md:py-6 md:py-14 text-center">
          {/* Error Code */}
          <div className="mb-4 md:mb-6">
            <div className="inline-block border-3 border-black bg-accent-yellow px-6 py-3 shadow-[6px_6px_0px_#111111] mb-6">
              <span className="font-mono text-sm font-bold uppercase">Error Code</span>
            </div>
            <h1 className="font-mono text-[120px] md:text-[180px] font-black leading-none text-black">
              404
            </h1>
          </div>

          {/* Message */}
          <div className="border-3 border-black bg-white p-8 shadow-[6px_6px_0px_#111111] mb-4 md:mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="material-symbols-outlined text-4xl text-accent-red">error</span>
              <h2 className="font-mono text-2xl font-bold uppercase">Page Not Found</h2>
            </div>
            <p className="text-gray-600 mb-6">
              The page you're looking for doesn't exist or has been moved. 
              Don't worry, even the best founders take wrong turns sometimes.
            </p>
            <div className="font-mono text-sm text-gray-500 bg-gray-100 p-3 border-2 border-gray-200 rounded-sm">
              <code>ERROR: RESOURCE_NOT_FOUND</code>
            </div>
          </div>

          {/* Suggestions */}
          <div className="border-3 border-black bg-white p-6 shadow-[6px_6px_0px_#111111] mb-4 md:mb-6">
            <h3 className="font-mono text-lg font-bold uppercase mb-4 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">lightbulb</span>
              Suggestions
            </h3>
            <ul className="text-left space-y-3">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>
                <span>Check the URL for typos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>
                <span>Use the search to find what you're looking for</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>
                <span>Browse our deals, startups, or ideas sections</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="inline-flex items-center justify-center gap-2 border-3 border-black bg-primary px-8 py-3 font-mono text-sm font-bold uppercase tracking-wide text-black shadow-[6px_6px_0px_#111111] hover:bg-primary-dark hover:shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <span className="material-symbols-outlined">home</span>
              Go Home
            </Link>
            <Link 
              href="/deals"
              className="inline-flex items-center justify-center gap-2 border-3 border-black bg-white px-8 py-3 font-mono text-sm font-bold uppercase tracking-wide text-black shadow-[6px_6px_0px_#111111] hover:bg-gray-50 hover:shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <span className="material-symbols-outlined">local_offer</span>
              Browse Deals
            </Link>
            <Link 
              href="/search"
              className="inline-flex items-center justify-center gap-2 border-3 border-black bg-accent-yellow px-8 py-3 font-mono text-sm font-bold uppercase tracking-wide text-black shadow-[6px_6px_0px_#111111] hover:bg-[#ffe033] hover:shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <span className="material-symbols-outlined">search</span>
              Search
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
