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

import IdeaSaveButton, { ideaIdFromTitle } from './IdeaSaveButton'

export default function IdeaCard({ idea, index = 0 }: IdeaCardProps) {
  return (
    <div
      className="idea-card relative bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 shadow-sm rounded-xl p-4 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)] hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
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
          <h3 className="font-mono text-sm md:text-lg font-bold text-gray-900 dark:text-white leading-tight flex-1 min-w-0 line-clamp-2 group-hover:text-accent-yellow transition-colors">
            {idea.title}
          </h3>
          {idea.itchScore ? (
            <div className="flex-shrink-0">
              <div className="inline-flex items-center gap-0.5 bg-accent-yellow text-black px-1.5 py-0.5 font-mono text-[9px] md:text-xs font-bold uppercase rounded-md whitespace-nowrap">
                <span className="material-symbols-outlined text-[11px]">trending_up</span>
                {idea.itchScore}
              </div>
            </div>
          ) : null}
        </div>

        {/* Tags */}
        <div className="flex gap-1.5 mb-3 flex-wrap">
          <span className="bg-accent-yellow/20 text-accent-yellow px-2 py-0.5 font-mono text-[9px] md:text-xs font-bold rounded-md border border-accent-yellow/30">
            {idea.category}
          </span>
          {idea.tags && idea.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 px-2 py-0.5 font-mono text-[9px] md:text-xs rounded-md border border-gray-200 dark:border-white/10">
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="font-sans text-xs md:text-sm text-gray-700 leading-relaxed line-clamp-3 mb-3">
          {idea.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-gray-100 dark:border-white/10 gap-2">
          <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-[10px] md:text-xs min-w-0">
            <span className="material-symbols-outlined text-[14px] md:text-base flex-shrink-0 text-gray-400">source</span>
            <span className="font-mono truncate">{idea.source}</span>
          </div>

          <div className="flex gap-1.5 flex-shrink-0">
            <IdeaSaveButton ideaId={ideaIdFromTitle(idea.title)} variant="icon" />
            <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:bg-accent-yellow hover:text-black font-mono text-[10px] md:text-xs font-bold rounded-lg transition-all whitespace-nowrap shadow-sm hover:shadow-md">
              Explore
              <span className="material-symbols-outlined text-[14px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
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
