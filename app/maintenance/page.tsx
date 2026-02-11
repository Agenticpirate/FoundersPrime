import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Maintenance | FoundersPrime',
  description: 'FoundersPrime is currently undergoing scheduled maintenance. We\'ll be back shortly.',
}

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f6f8f8]">
      {/* Header */}
      <header className="w-full border-b-3 border-black bg-white px-6 py-4 md:px-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary border-3 border-black flex items-center justify-center">
              <span className="material-symbols-outlined text-black font-bold text-lg">terminal</span>
            </div>
            <h2 className="text-black text-xl font-bold font-mono tracking-tight uppercase">FOUNDERS[PRIME]</h2>
          </Link>
          {/* Disabled Nav for Maintenance */}
          <div className="hidden md:flex gap-6 font-mono text-sm opacity-50 cursor-not-allowed select-none">
            <span>Deals</span>
            <span>Pricing</span>
            <span>Resources</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6 py-12 md:py-20">
        <div className="w-full max-w-[640px]">
          {/* Maintenance Card */}
          <div className="bg-white border-3 border-black shadow-[6px_6px_0px_#111111] w-full p-8 md:p-12 relative overflow-hidden">
            {/* Decor Strip */}
            <div className="absolute top-0 left-0 w-full h-4 bg-amber-400 border-b-3 border-black"></div>
            
            <div className="flex flex-col items-center text-center pt-4">
              {/* Icon */}
              <div className="mb-6 relative">
                <div className="w-20 h-20 bg-[#f6f8f8] border-3 border-black rounded-full flex items-center justify-center shadow-[3px_3px_0px_#111111] z-10 relative">
                  <span className="text-4xl">🔧</span>
                </div>
                {/* Decorative background circle */}
                <div className="absolute top-2 left-2 w-20 h-20 bg-primary rounded-full border-3 border-black -z-0"></div>
              </div>

              {/* Headline */}
              <h1 className="font-mono text-3xl md:text-4xl font-bold text-black mb-4 uppercase tracking-tighter">
                We're Upgrading
              </h1>

              {/* Body Text */}
              <p className="text-lg text-black/80 font-medium leading-relaxed max-w-md mx-auto mb-8">
                FoundersPrime is currently undergoing scheduled maintenance. We'll be back shortly with improvements.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-8">
                {/* Started At */}
                <div className="border-3 border-black bg-white p-4 text-left shadow-[4px_4px_0px_#111111]">
                  <div className="flex items-center gap-2 mb-2 text-red-500 font-bold font-mono text-sm uppercase">
                    <span className="material-symbols-outlined text-lg">schedule</span>
                    Started At
                  </div>
                  <p className="text-2xl font-bold font-mono text-black">2:00 AM UTC</p>
                </div>
                
                {/* Expected Duration */}
                <div className="border-3 border-black bg-white p-4 text-left shadow-[4px_4px_0px_#111111]">
                  <div className="flex items-center gap-2 mb-2 text-black font-bold font-mono text-sm uppercase">
                    <span className="material-symbols-outlined text-lg">hourglass_top</span>
                    Duration
                  </div>
                  <p className="text-2xl font-bold font-mono text-black">~30 minutes</p>
                </div>
              </div>

              {/* Status Updates Section */}
              <div className="w-full border-t-3 border-black border-dashed pt-8 mt-2">
                <p className="font-mono text-sm font-bold mb-4 uppercase tracking-wide">Status Updates</p>
                <a 
                  href="https://twitter.com/foundersprime" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 py-3 bg-primary border-3 border-black font-bold text-black shadow-[6px_6px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#111111] transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                  <span>Check @foundersprime on X</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="mt-8 text-center">
            <p className="font-mono text-sm text-black/60">
              Need urgent help?{' '}
              <a 
                href="mailto:support@foundersprime.com" 
                className="text-black font-bold underline decoration-2 decoration-primary underline-offset-2 hover:bg-primary/20"
              >
                Email Support
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t-3 border-black bg-white px-6 py-6 md:px-10 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs md:text-sm font-medium text-black">
            © 2025 FoundersPrime. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-amber-500 rounded-full border-2 border-black animate-pulse"></div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider">System: Maintenance</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
