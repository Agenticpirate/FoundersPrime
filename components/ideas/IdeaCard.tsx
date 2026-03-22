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
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  const isRazorpay = idea.source.includes('Razorpay');

  return (
    <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-3 md:p-5 hover:shadow-[6px_6px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all group">
      {/* Title + Demand Score */}
      <div className="flex items-start gap-2 mb-2">
        <h3 className="font-mono text-sm md:text-lg font-bold text-black leading-tight flex-1 min-w-0 line-clamp-2">
          {idea.title}
        </h3>
        {/* Demand Score Badge — flex-shrink-0 to prevent overlap */}
        {isRazorpay && idea.itchScore && (
          <div className="flex-shrink-0">
            <div className="bg-primary text-black px-1.5 py-0.5 font-mono text-[9px] md:text-xs font-bold uppercase border border-black whitespace-nowrap">
              {idea.itchScore}
            </div>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex gap-1.5 mb-3 flex-wrap">
        <span className="bg-primary/20 text-black px-1.5 py-0.5 font-mono text-[9px] md:text-xs font-bold rounded-sm border border-black">
          {idea.category}
        </span>
        {idea.tags && idea.tags.slice(0, 2).map((tag, index) => (
          <span key={index} className="bg-gray-100 text-gray-700 px-1.5 py-0.5 font-mono text-[9px] md:text-xs rounded-sm border border-gray-300">
            {tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <div className="mb-3">
        <p className="font-sans text-xs md:text-sm text-gray-700 leading-relaxed line-clamp-3">
          {idea.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 md:pt-3 border-t-2 border-gray-200">
        <div className="flex items-center gap-1 text-gray-600 text-[10px] md:text-xs min-w-0">
          <span className="material-symbols-outlined text-xs md:text-sm flex-shrink-0">category</span>
          <span className="font-mono truncate">{idea.category}</span>
        </div>

        <div className="flex gap-1.5 flex-shrink-0">
          <button className="p-1.5 border-2 border-black bg-white hover:bg-primary rounded-sm transition-colors">
            <span className="material-symbols-outlined text-sm md:text-base">bookmark_border</span>
          </button>
          <button className="px-2 md:px-3 py-1 md:py-1.5 bg-primary hover:bg-black hover:text-white border-2 border-black text-black font-mono text-[10px] md:text-xs font-bold rounded-sm transition-all whitespace-nowrap">
            Explore
          </button>
        </div>
      </div>
    </div>
  )
}