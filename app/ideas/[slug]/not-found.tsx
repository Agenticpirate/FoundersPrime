import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-12">
            <div className="size-24 bg-gray-100 border-2 border-black rounded-sm flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl text-gray-400">lightbulb_outline</span>
            </div>
            
            <h1 className="font-mono text-4xl font-bold text-black mb-4">Idea Not Found</h1>
            <p className="font-sans text-lg text-gray-600 mb-4 md:mb-6">
              The startup idea you're looking for doesn't exist in our database or may have been removed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ideas">
                <button className="px-6 py-3 bg-primary hover:bg-black hover:text-white border-3 border-black text-black font-mono font-bold rounded-sm shadow-[4px_4px_0px_0px_#1a1a1a] hover:shadow-[2px_2px_0px_0px_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  Browse All Ideas
                </button>
              </Link>
              <Link href="/">
                <button className="px-6 py-3 bg-white hover:bg-gray-100 border-3 border-black text-black font-mono font-bold rounded-sm shadow-[4px_4px_0px_0px_#1a1a1a] hover:shadow-[2px_2px_0px_0px_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}