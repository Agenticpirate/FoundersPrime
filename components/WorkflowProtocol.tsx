export default function WorkflowProtocol() {
  const steps = [
    {
      number: "01",
      icon: "search",
      title: "DISCOVER",
      headline: "See what’s available without digging.",
      description: "Explore verified credits, grants, and programs organized by category, relevance, and intent.",
      hoverColor: "group-hover:text-accent-yellow"
    },
    {
      number: "02",
      icon: "filter_alt",
      title: "FILTER",
      headline: "Focus on what actually fits.",
      description: "Narrow opportunities by stage, region, category, and eligibility so time isn’t wasted.",
      hoverColor: "group-hover:text-accent-orange"
    },
    {
      number: "03",
      icon: "bolt",
      title: "ACT",
      headline: "Move before windows close.",
      description: "Each opportunity includes context, links, and clarity on what to do next.",
      hoverColor: "group-hover:text-primary"
    }
  ]

  return (
    <section className="relative py-6 md:py-14 border-b-2 border-black grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-10">
          <div className="inline-block bg-black text-white text-xs md:text-sm font-mono font-bold px-4 py-1.5 mb-4 uppercase tracking-wider transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
            WORKFLOW
          </div>
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black text-black mb-3 leading-tight font-sans">
            From discovery to action<br />in minutes.
          </h2>
          <p className="text-sm md:text-lg text-gray-600 font-medium max-w-2xl mx-auto font-mono">
            No onboarding maze. No learning curve.<br />
            Just clear visibility and direct paths to action.
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-3 gap-0 border-2 border-black divide-x-2 md:divide-x-2 divide-black bg-white mb-4 md:mb-10">
          {steps.map((step, index) => (
            <div key={index} className="relative p-3 md:p-6 group hover:bg-gray-50 flex flex-col h-full overflow-hidden">
              <span className={`absolute top-2 right-2 text-3xl md:text-6xl font-black font-mono transition-colors z-0 ${step.hoverColor.replace('group-hover:', '')} md:text-gray-100 md:${step.hoverColor}`}>{step.number}</span>
              <div className="w-8 h-8 md:w-14 md:h-14 bg-black text-white neo-border flex items-center justify-center mb-2 md:mb-5 relative z-10">
                <span className="material-symbols-outlined text-base md:text-2xl">{step.icon}</span>
              </div>
              <h3 className="text-xs md:text-lg font-black mb-1 font-mono relative z-10">{step.title}</h3>
              <p className="font-bold text-black mb-1 relative z-10 text-[10px] md:text-sm hidden md:block">{step.headline}</p>
              <p className="text-gray-600 text-[10px] md:text-sm leading-relaxed relative z-10 hidden md:block">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wide">
            No paywalls on discovery. No dead links. No guesswork.
          </p>
        </div>
      </div>
    </section>
  )
}