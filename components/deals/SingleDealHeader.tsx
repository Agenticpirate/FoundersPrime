import Link from 'next/link'

export default function SingleDealHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-3 border-black bg-white px-4 py-3 md:px-6 md:py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-8">
          <Link className="flex items-center gap-3 text-black group" href="/">
            <div className="h-8 w-8 bg-black text-white flex items-center justify-center rounded-sm">
              <span className="material-symbols-outlined font-bold">diamond</span>
            </div>
            <h2 className="font-mono text-xl font-bold uppercase tracking-tight group-hover:underline decoration-3 underline-offset-4">FoundersPrime</h2>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link className="font-mono text-sm font-bold uppercase hover:bg-primary/20 px-2 py-1 rounded-sm transition-colors" href="/deals">Deals</Link>
            <a className="font-mono text-sm font-bold uppercase hover:bg-primary/20 px-2 py-1 rounded-sm transition-colors" href="#">Grants</a>
            <a className="font-mono text-sm font-bold uppercase hover:bg-primary/20 px-2 py-1 rounded-sm transition-colors" href="#">Incubators</a>
            <a className="font-mono text-sm font-bold uppercase hover:bg-primary/20 px-2 py-1 rounded-sm transition-colors" href="#">Ideas</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex border-3 border-black rounded-sm h-10 w-64 bg-white shadow-[3px_3px_0px_#111111] items-center px-3 focus-within:shadow-none focus-within:translate-x-[3px] focus-within:translate-y-[3px] transition-all">
            <span className="material-symbols-outlined text-gray-500 !text-[20px]">search</span>
            <input className="w-full border-none bg-transparent p-0 pl-2 text-sm font-medium focus:ring-0 placeholder:text-gray-400" placeholder="Search deals..." type="text"/>
          </div>
          <button className="flex h-10 items-center justify-center rounded-sm border-3 border-black bg-primary px-6 font-mono text-sm font-bold uppercase tracking-wide text-black shadow-[6px_6px_0px_#111111] hover:bg-primary-dark hover:shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
            Log In
          </button>
        </div>
      </div>
    </header>
  )
}