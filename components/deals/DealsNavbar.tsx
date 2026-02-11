import Link from 'next/link'

export default function DealsNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#f6f8f8] border-b-3 border-[#1a1a1a]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-ink text-white flex items-center justify-center border-2 border-ink">
              <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
            </div>
            <Link className="text-2xl font-bold font-display tracking-tight uppercase" href="/">
              FoundersPrime
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-base font-bold font-mono hover:text-primary decoration-2 underline-offset-4 hover:underline" href="/deals">
              DEALS
            </Link>

            <div className="relative group">
              <button className="flex items-center gap-1 text-base font-bold font-mono hover:text-primary decoration-2 underline-offset-4 hover:underline uppercase">
                Programs
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>

              <div className="absolute top-full left-0 w-48 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="flex flex-col py-2">
                  <Link href="/programs/accelerators" className="px-4 py-2 text-sm font-bold hover:bg-black hover:text-white transition-colors font-mono uppercase">
                    Accelerators
                  </Link>
                  <Link href="/programs/incubators" className="px-4 py-2 text-sm font-bold hover:bg-black hover:text-white transition-colors font-mono uppercase">
                    Incubators
                  </Link>
                  <Link href="/programs/grants" className="px-4 py-2 text-sm font-bold hover:bg-black hover:text-white transition-colors font-mono uppercase">
                    Grants
                  </Link>
                </div>
              </div>
            </div>

            <Link className="text-base font-bold font-mono hover:text-primary decoration-2 underline-offset-4 hover:underline" href="/ideas">
              IDEAS
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden md:flex h-10 px-6 items-center border-3 border-ink font-bold hover:bg-ink hover:text-white transition-colors text-sm uppercase font-mono tracking-wider">
              Login
            </button>
            <button className="neo-btn h-10 px-6 flex items-center text-sm uppercase font-mono tracking-wider">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}