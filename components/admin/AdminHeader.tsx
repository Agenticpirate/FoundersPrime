import { Search } from 'lucide-react'

export default function AdminHeader() {
  return (
    <header className="px-4 md:px-8 py-3 md:py-4 border-b-3 border-black bg-white flex justify-between items-center gap-3">
      <div className="min-w-0">
        <h2 className="font-mono text-lg md:text-2xl font-black uppercase tracking-tight text-black">Command Center</h2>
        <p className="font-mono text-[10px] md:text-xs text-black/50 mt-0.5">
          Status: <span className="text-green-600 font-bold">ONLINE</span>
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative hidden sm:block w-48 md:w-56">
          <input
            className="w-full border-2 border-black px-2.5 py-1.5 bg-gray-50 font-mono text-xs focus:outline-none focus:bg-primary/10 placeholder-black/40"
            placeholder="Search..."
            type="text"
          />
          <Search className="absolute right-2 top-2 w-4 h-4 text-black/40 pointer-events-none" />
        </div>
        <div className="w-8 h-8 bg-black text-white border-2 border-black flex items-center justify-center font-bold text-xs">
          A
        </div>
      </div>
    </header>
  )
}
