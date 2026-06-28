import { Search } from 'lucide-react'

export default function AdminHeader() {
  return (
    <header className="px-4 md:px-8 py-4 border-b border-white/10 bg-[#0d0e12] flex justify-between items-center gap-3">
      <div className="min-w-0">
        <h2 className="font-mono text-lg md:text-xl font-black uppercase tracking-wider text-white">Command Center</h2>
        <p className="font-mono text-[9px] md:text-xs text-zinc-500 mt-1">
          Status: <span className="text-emerald-400 font-bold">ONLINE</span>
        </p>
      </div>
      <div className="flex items-center gap-2.5">
        <div className="relative hidden sm:block w-48 md:w-56">
          <input
            className="w-full border border-white/10 px-3 py-1.5 bg-[#121318] text-white rounded font-mono text-xs focus:outline-none focus:border-accent-yellow/50 placeholder-zinc-600 transition-colors"
            placeholder="Search..."
            type="text"
          />
          <Search className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
        </div>
        <div className="w-8 h-8 bg-[#121318] text-white border border-white/10 flex items-center justify-center font-bold font-mono text-xs rounded">
          A
        </div>
      </div>
    </header>
  )
}
