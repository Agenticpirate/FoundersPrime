import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-4 md:mb-6">
          <div className="w-24 h-24 bg-black text-white flex items-center justify-center rounded-sm mx-auto mb-4">
            <span className="material-symbols-outlined text-4xl">search_off</span>
          </div>
          <h1 className="font-mono text-4xl font-bold uppercase tracking-tight text-black mb-2">
            Deal Not Found
          </h1>
          <p className="text-gray-600 font-mono text-sm">
            The deal you're looking for doesn't exist or has been removed.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/deals"
            className="block w-full py-3 px-6 bg-primary text-black font-mono font-bold uppercase text-sm border-3 border-black shadow-[6px_6px_0px_#111111] hover:shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            Browse All Deals
          </Link>
          <Link 
            href="/"
            className="block w-full py-3 px-6 bg-white text-black font-mono font-bold uppercase text-sm border-3 border-black shadow-[6px_6px_0px_#111111] hover:shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}