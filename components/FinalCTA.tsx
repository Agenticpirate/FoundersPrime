export default function FinalCTA() {
  return (
    <section className="py-12 bg-black text-white border-t-2 border-black border-b-4 border-b-accent-yellow relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

          {/* Text Content */}
          <div className="text-center lg:text-left flex-1 min-w-0">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 font-mono tracking-tighter text-white">
              STOP LEAVING MONEY <span className="text-accent-yellow">ON THE TABLE.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 font-mono">
              Join 12,000+ founders saving millions today.
            </p>
          </div>

          {/* Form Content */}
          <div className="w-full max-w-md flex-shrink-0">
            <form className="flex flex-col sm:flex-row gap-0 w-full neo-shadow mb-4">
              <input
                className="flex-grow bg-white text-black text-base p-3 neo-border-top neo-border-bottom neo-border-left sm:neo-border-right-0 border-r-0 focus:ring-0 focus:outline-none font-mono rounded-none placeholder-gray-500 min-w-0"
                placeholder="ENTER WORK EMAIL"
                type="email"
              />
              <button className="bg-accent-yellow text-black text-base font-bold px-6 py-3 neo-border hover:bg-white transition-all whitespace-nowrap font-mono uppercase rounded-none flex items-center justify-center gap-2">
                Get Access
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </form>
            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs text-gray-500 font-mono uppercase tracking-widest">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-green-500">check</span>
                No Credit Card
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-green-500">check</span>
                Unsubscribe Anytime
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}