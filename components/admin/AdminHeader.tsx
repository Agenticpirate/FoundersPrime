import { Search } from 'lucide-react'
import Link from 'next/link'

export default function AdminHeader() {
  return (
    <header className="p-6 md:px-10 md:py-8 border-b-3 border-black bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 className="font-display text-4xl font-black uppercase tracking-tight text-black">Command Center</h2>
        <p className="font-mono text-sm text-black/70 mt-1">
          Welcome back, Admin. System status: <span className="text-green-600 font-bold">ONLINE</span>
        </p>
      </div>
      
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative w-full md:w-64">
          <input 
            className="w-full border-3 border-black px-3 py-2 bg-paper font-mono text-sm focus:outline-none focus:bg-primary/10 placeholder-black/50" 
            placeholder="Search database..." 
            type="text"
          />
          <Search className="absolute right-3 top-2.5 w-5 h-5 text-black pointer-events-none" />
        </div>
        <div className="w-10 h-10 bg-black text-white border-3 border-black flex items-center justify-center font-bold">
          A
        </div>
      </div>
    </header>
  )
}