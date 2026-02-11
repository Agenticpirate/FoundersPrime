import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Coming Soon | FoundersPrime',
  description: 'Something big is coming. Be the first to know when we launch new features.',
}

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f6f8f8]">
      {/* Header */}
      <header className="w-full border-b-3 border-black bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-mono font-bold text-lg">
            <span className="material-symbols-outlined text-lg">terminal</span>
          </div>
          <h2 className="text-xl font-mono font-bold tracking-tight text-black group-hover:underline decoration-3 decoration-primary underline-offset-4">FOUNDERS[PRIME]</h2>
        </Link>
        <Link 
          href="/login"
          className="hidden sm:block font-mono font-bold text-sm hover:bg-black hover:text-white px-4 py-2 border-3 border-black transition-colors"
        >
          Access Portal
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 md:py-20 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 border-3 border-black bg-amber-400 rotate-12 -z-10 hidden md:block"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-3 border-black bg-primary rounded-full -z-10 hidden md:block"></div>
        
        <div className="max-w-3xl w-full">
          {/* Hero Card */}
          <div className="bg-white border-3 border-black shadow-[6px_6px_0px_#111111] p-8 md:p-12 mb-12 relative">
            {/* Decorative Label */}
            <div className="absolute -top-4 left-6 bg-primary border-3 border-black px-3 py-1 shadow-[3px_3px_0px_#111111]">
              <span className="font-mono font-bold text-xs uppercase tracking-wider">Announcement</span>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="text-6xl md:text-7xl animate-bounce select-none py-2">
                🚀
              </div>
              
              <div className="space-y-4 max-w-xl">
                <h1 className="font-mono font-bold text-3xl md:text-5xl leading-tight text-black">
                  Something Big is <span className="bg-amber-400 px-2 border-b-3 border-black inline-block rotate-1">Coming</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 font-medium">
                  We're building new features to help you save even more.
                </p>
              </div>

              {/* CTA Section */}
              <div className="w-full max-w-md pt-6">
                <label className="block text-left font-mono font-bold text-sm mb-2">Be the first to know when we launch:</label>
                <form className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="founder@startup.com"
                    className="flex-1 h-12 px-4 border-3 border-black bg-[#f8f9fa] font-mono text-sm placeholder:text-gray-500 focus:bg-amber-50 focus:shadow-[4px_4px_0px_#111111] focus:-translate-x-[2px] focus:-translate-y-[2px] outline-none transition-all"
                  />
                  <button 
                    type="button"
                    className="h-12 px-6 bg-primary border-3 border-black text-black font-mono font-bold text-sm uppercase tracking-wide shadow-[6px_6px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#111111] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0px_#111111] transition-all whitespace-nowrap"
                  >
                    Notify Me
                  </button>
                </form>
                <p className="text-xs text-gray-500 mt-2 font-mono text-left">* No spam. Unsubscribe anytime.</p>
              </div>
            </div>
          </div>

          {/* What's Coming Section */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-mono font-bold text-2xl border-b-3 border-black pb-1 inline-block">What's Coming</h2>
              <div className="h-1 flex-1 bg-black/10 border-b border-dashed border-black"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Feature 1 */}
              <div className="bg-white border-3 border-black p-5 shadow-[3px_3px_0px_#111111] hover:shadow-[6px_6px_0px_#111111] transition-all duration-200 group">
                <div className="flex items-start justify-between mb-3">
                  <span className="material-symbols-outlined text-3xl group-hover:text-primary transition-colors">groups</span>
                  <span className="font-mono text-xs border border-black px-2 py-0.5 bg-gray-100">Q3</span>
                </div>
                <h3 className="font-mono font-bold text-lg mb-1">Team Plans</h3>
                <p className="text-sm text-gray-600">Collaborative workspaces for startups to manage credits together.</p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white border-3 border-black p-5 shadow-[3px_3px_0px_#111111] hover:shadow-[6px_6px_0px_#111111] transition-all duration-200 group">
                <div className="flex items-start justify-between mb-3">
                  <span className="material-symbols-outlined text-3xl group-hover:text-blue-600 transition-colors">api</span>
                  <span className="font-mono text-xs border border-black px-2 py-0.5 bg-gray-100">API</span>
                </div>
                <h3 className="font-mono font-bold text-lg mb-1">API Access</h3>
                <p className="text-sm text-gray-600">Direct integration for partners to verify startup eligibility automatically.</p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white border-3 border-black p-5 shadow-[3px_3px_0px_#111111] hover:shadow-[6px_6px_0px_#111111] transition-all duration-200 group">
                <div className="flex items-start justify-between mb-3">
                  <span className="material-symbols-outlined text-3xl group-hover:text-amber-500 transition-colors">smartphone</span>
                  <span className="font-mono text-xs border border-black px-2 py-0.5 bg-gray-100">Mobile</span>
                </div>
                <h3 className="font-mono font-bold text-lg mb-1">Mobile App</h3>
                <p className="text-sm text-gray-600">Track grants and application status on the go.</p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white border-3 border-black p-5 shadow-[3px_3px_0px_#111111] hover:shadow-[6px_6px_0px_#111111] transition-all duration-200 group">
                <div className="flex items-start justify-between mb-3">
                  <span className="material-symbols-outlined text-3xl group-hover:text-red-500 transition-colors">forum</span>
                  <span className="font-mono text-xs border border-black px-2 py-0.5 bg-gray-100">Community</span>
                </div>
                <h3 className="font-mono font-bold text-lg mb-1">Community Features</h3>
                <p className="text-sm text-gray-600">Connect with other founders in our verified network.</p>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 font-mono font-bold text-black hover:bg-amber-400 border-b-3 border-transparent hover:border-black px-2 py-1 transition-colors"
            >
              <span className="material-symbols-outlined text-sm font-bold">arrow_back</span>
              Back to Homepage
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t-3 border-black bg-white py-8 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm font-mono font-medium">
            © 2025 FoundersPrime. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm font-mono font-bold hover:text-primary hover:underline decoration-2 underline-offset-2">Privacy</Link>
            <Link href="/terms" className="text-sm font-mono font-bold hover:text-primary hover:underline decoration-2 underline-offset-2">Terms</Link>
            <Link href="/contact" className="text-sm font-mono font-bold hover:text-primary hover:underline decoration-2 underline-offset-2">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
