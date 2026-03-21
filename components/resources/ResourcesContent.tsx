export default function ResourcesContent() {
  return (
    <div className="w-full py-6 md:py-10">

      {/* Under Construction Banner */}
      <div className="border-2 border-black shadow-[4px_4px_0_0_#000] bg-white overflow-hidden">

        {/* Top accent stripe */}
        <div className="h-1.5 w-full bg-[repeating-linear-gradient(45deg,#111_0,#111_10px,#f5d000_10px,#f5d000_20px)]" />

        <div className="px-6 md:px-12 py-8 md:py-14 flex flex-col items-center text-center gap-4">

          {/* Icon block */}
          <div className="w-16 h-16 md:w-20 md:h-20 bg-accent-yellow border-2 border-black shadow-[3px_3px_0_0_#000] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-3xl md:text-4xl text-black">construction</span>
          </div>

          {/* Label */}
          <div className="inline-flex items-center gap-1.5 border-2 border-black bg-black text-white px-3 py-0.5 font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow animate-pulse flex-shrink-0" />
            Work In Progress
          </div>

          {/* Heading */}
          <h2 className="font-mono text-xl md:text-3xl font-black uppercase tracking-tight text-black leading-tight">
            Resources Coming Soon
          </h2>

          {/* Description */}
          <p className="font-mono text-xs md:text-sm text-gray-600 leading-relaxed max-w-lg">
            We&apos;re curating a premium library of startup resources — guides, templates, checklists, and tools hand-picked for founders.<br className="hidden md:block" />
            <span className="font-bold text-black"> Check back soon. It&apos;ll be worth the wait.</span>
          </p>

          {/* Divider */}
          <div className="w-16 h-0.5 bg-black/20 my-1" />

          {/* What's coming */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full max-w-xl mt-1">
            {[
              { icon: 'description', label: 'Templates' },
              { icon: 'menu_book', label: 'Guides' },
              { icon: 'checklist', label: 'Checklists' },
              { icon: 'build', label: 'Tools' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1.5 border-2 border-black/10 bg-gray-50 px-3 py-3 group">
                <span className="material-symbols-outlined text-xl text-gray-400 group-hover:text-black transition-colors">{item.icon}</span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-black transition-colors">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Subtext */}
          <p className="text-[10px] md:text-xs text-gray-400 font-mono mt-2">
            Last updated: Q1 2026 &nbsp;·&nbsp; Resources will be added progressively
          </p>

        </div>

        {/* Bottom accent stripe */}
        <div className="h-1.5 w-full bg-[repeating-linear-gradient(45deg,#f5d000_0,#f5d000_10px,#111_10px,#111_20px)]" />
      </div>

    </div>
  )
}