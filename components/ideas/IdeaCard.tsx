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
    <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6 hover:shadow-[6px_6px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <h3 className="font-mono text-lg md:text-xl font-bold text-black leading-tight">
              {idea.title}
            </h3>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mb-4 flex-wrap">
            <span className="bg-primary/20 text-black px-2 py-1 font-mono text-xs font-bold rounded-sm border border-black">
              {idea.category}
            </span>
            {idea.tags && idea.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 font-mono text-xs rounded-sm border border-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Demand Score Badge - Only for Razorpay */}
        {isRazorpay && idea.itchScore && (
          <div className="ml-4">
            <div className="bg-primary text-black px-3 py-1 font-mono text-xs font-bold uppercase border-2 border-black">
              Demand: {idea.itchScore}
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="font-sans text-sm text-gray-700 leading-relaxed">
          {idea.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t-2 border-gray-200">
        <div className="flex items-center gap-2 text-gray-600 text-xs">
          <span className="material-symbols-outlined text-sm">category</span>
          <span className="font-mono">{idea.category}</span>
        </div>

        <div className="flex gap-2">
          <button className="p-2 border-2 border-black bg-white hover:bg-primary rounded-sm transition-colors">
            <span className="material-symbols-outlined text-lg">bookmark_border</span>
          </button>
          <button className="px-4 py-2 bg-primary hover:bg-black hover:text-white border-2 border-black text-black font-mono text-sm font-bold rounded-sm transition-all">
            Explore Idea
          </button>
        </div>
      </div>
    </div>
  )
}