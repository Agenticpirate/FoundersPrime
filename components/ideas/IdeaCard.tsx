interface IdeaCardProps {
  idea: {
    title: string
    description: string
    category: string
    tags: string[]
    author: string
    source: string
    itchScore?: string
  }
  index?: number
}

export default function IdeaCard({ idea, index = 0 }: IdeaCardProps) {
  return (
    <div
      className="idea-card relative bg-white border-2 border-black shadow-[4px_4px_0px_0px_#111] rounded-sm p-3 md:p-5 hover:shadow-[6px_6px_0px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all duration-200 group overflow-hidden"
      style={{ animationDelay: `${Math.min(index, 8) * 0.05}s` }}
    >
      {/* Hover sheen */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(115deg, transparent 35%, rgba(255,221,0,0.06) 50%, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="relative">
        {/* Title + Source badge */}
        <div className="flex items-start gap-2 mb-2">
          <h3 className="font-mono text-sm md:text-lg font-bold text-black leading-tight flex-1 min-w-0 line-clamp-2 group-hover:text-black">
            {idea.title}
          </h3>
          {idea.itchScore ? (
            <div className="flex-shrink-0">
              <div className="inline-flex items-center gap-0.5 bg-accent-yellow text-black px-1.5 py-0.5 font-mono text-[9px] md:text-xs font-bold uppercase border border-black rounded-sm whitespace-nowrap">
                <span className="material-symbols-outlined text-[11px]">trending_up</span>
                {idea.itchScore}
              </div>
            </div>
          ) : null}
        </div>

        {/* Tags */}
        <div className="flex gap-1.5 mb-3 flex-wrap">
          <span className="bg-accent-yellow/30 text-black px-1.5 py-0.5 font-mono text-[9px] md:text-xs font-bold rounded-sm border border-black">
            {idea.category}
          </span>
          {idea.tags && idea.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="bg-gray-100 text-gray-700 px-1.5 py-0.5 font-mono text-[9px] md:text-xs rounded-sm border border-gray-300">
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="font-sans text-xs md:text-sm text-gray-700 leading-relaxed line-clamp-3 mb-3">
          {idea.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 md:pt-3 border-t border-gray-200 gap-2">
          <div className="flex items-center gap-1.5 text-gray-500 text-[10px] md:text-xs min-w-0">
            <span className="material-symbols-outlined text-[14px] md:text-base flex-shrink-0 text-gray-400">source</span>
            <span className="font-mono truncate">{idea.source}</span>
          </div>

          <div className="flex gap-1.5 flex-shrink-0">
            <button
              className="p-1.5 border-2 border-black bg-white hover:bg-accent-yellow rounded-sm transition-colors"
              aria-label="Bookmark idea"
            >
              <span className="material-symbols-outlined text-sm md:text-base align-middle">bookmark_border</span>
            </button>
            <button className="inline-flex items-center gap-0.5 px-2.5 md:px-3 py-1 md:py-1.5 bg-black text-white hover:bg-accent-yellow hover:text-black border-2 border-black font-mono text-[10px] md:text-xs font-bold rounded-sm transition-all whitespace-nowrap shadow-[2px_2px_0px_#333] hover:shadow-[3px_3px_0px_#111]">
              Explore
              <span className="material-symbols-outlined text-[12px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ideaCardFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .idea-card {
          animation: ideaCardFadeIn 0.45s cubic-bezier(0.4, 0, 0.2, 1) backwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .idea-card { animation: none; }
        }
      `}</style>
    </div>
  )
}
