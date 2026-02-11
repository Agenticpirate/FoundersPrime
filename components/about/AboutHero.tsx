export default function AboutHero() {
  return (
    <div className="text-center mb-20">
      <div className="inline-block border-2 border-black bg-accent-yellow px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide rounded-sm mb-6">
        OUR STORY
      </div>
      <h1 className="font-mono text-5xl md:text-6xl font-bold tracking-tight text-black mb-6 leading-[1.1]">
        Empowering Every <br className="hidden md:block"/> Founder's Journey
      </h1>
      <p className="font-sans text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-12">
        We believe every great startup begins with access to the right resources, connections, and opportunities. FoundersPrime was built to democratize startup success by making essential deals, insights, and knowledge accessible to founders everywhere.
      </p>
      
      {/* Hero Visual */}
      <div className="relative max-w-4xl mx-auto">
        <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-8 gap-4 h-full">
              {Array.from({ length: 32 }).map((_, i) => (
                <div key={i} className="bg-black rounded-sm"></div>
              ))}
            </div>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="size-20 bg-primary border-2 border-black rounded-sm flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl text-black">lightbulb</span>
                </div>
                <h3 className="font-mono text-lg font-bold mb-2">Discover</h3>
                <p className="font-sans text-sm text-gray-600">Find the perfect deals, ideas, and opportunities for your startup</p>
              </div>
              
              <div className="text-center">
                <div className="size-20 bg-primary border-2 border-black rounded-sm flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl text-black">analytics</span>
                </div>
                <h3 className="font-mono text-lg font-bold mb-2">Validate</h3>
                <p className="font-sans text-sm text-gray-600">Access data-driven insights and market research to make informed decisions</p>
              </div>
              
              <div className="text-center">
                <div className="size-20 bg-primary border-2 border-black rounded-sm flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl text-black">rocket_launch</span>
                </div>
                <h3 className="font-mono text-lg font-bold mb-2">Execute</h3>
                <p className="font-sans text-sm text-gray-600">Launch faster with templates, tools, and resources from successful founders</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}