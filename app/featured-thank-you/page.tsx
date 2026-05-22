import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Featured Listing — Confirmed',
  description: 'Your Featured Listing payment is confirmed.',
}

export default function FeaturedThankYouPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
      <Header />
      <main className="flex-1 flex items-center justify-center py-10 md:py-20 px-4">
        <div className="max-w-lg w-full">
          <div className="bg-white border-2 border-black shadow-[6px_6px_0px_#FFD500] p-8 md:p-10 text-center relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-accent-yellow/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <span className="inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono text-[10px] font-black uppercase tracking-widest px-2.5 py-1 border border-black mb-4 shadow-[2px_2px_0px_#111]">
                <span className="material-symbols-outlined text-[12px]">star</span>
                Featured · Confirmed
              </span>

              <h1 className="font-mono text-2xl md:text-3xl font-black uppercase mb-3 leading-tight">
                You're pinned at the top.
              </h1>
              <p className="text-sm md:text-base text-gray-700 mb-6 leading-relaxed">
                Payment received. Your deal is now Featured for the next 30 days — pinned at the top of its category page with a Featured badge. We'll email you a confirmation receipt.
              </p>

              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="bg-gray-50 border-2 border-black p-2">
                  <p className="font-mono text-[8px] uppercase tracking-widest text-gray-500">Status</p>
                  <p className="font-mono font-black text-xs text-green-700">Active</p>
                </div>
                <div className="bg-gray-50 border-2 border-black p-2">
                  <p className="font-mono text-[8px] uppercase tracking-widest text-gray-500">Duration</p>
                  <p className="font-mono font-black text-xs">30 days</p>
                </div>
                <div className="bg-gray-50 border-2 border-black p-2">
                  <p className="font-mono text-[8px] uppercase tracking-widest text-gray-500">Tier</p>
                  <p className="font-mono font-black text-xs">⭐ Featured</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/deals"
                  className="flex-1 bg-black text-white font-mono font-black uppercase text-xs tracking-wider px-5 py-3 border-2 border-black hover:bg-accent-yellow hover:text-black transition-colors flex items-center justify-center gap-2"
                >
                  See your listing
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
                <a
                  href="mailto:hello@foundersprime.com"
                  className="flex-1 bg-white text-black font-mono font-black uppercase text-xs tracking-wider px-5 py-3 border-2 border-black hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">mail</span>
                  Need help?
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
