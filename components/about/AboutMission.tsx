export default function AboutMission() {
  return (
    <div className="mb-10 md:mb-14">
      <div className="text-center mb-6 md:mb-4 md:mb-6">
        <h2 className="font-mono text-4xl font-bold text-black mb-6">
          Our Mission & Vision
        </h2>
        <p className="font-sans text-lg text-gray-600 max-w-3xl mx-auto">
          We're building the future where every founder has equal access to the resources, knowledge, and opportunities needed to build successful startups.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mission */}
        <div className="bg-primary/10 border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8 relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <span className="material-symbols-outlined text-6xl text-primary opacity-20">flag</span>
          </div>
          <div className="relative z-10">
            <h3 className="font-mono text-2xl font-bold text-black mb-6 flex items-center gap-3">
              <span className="bg-primary text-black size-10 flex items-center justify-center text-xl rounded-sm">M</span>
              Mission
            </h3>
            <p className="font-sans text-lg text-gray-700 leading-relaxed mb-6">
              To democratize startup success by making essential deals, resources, and knowledge accessible to founders everywhere, regardless of their network, location, or background.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                <span className="font-sans text-gray-700">Aggregate and verify startup deals from across the web</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                <span className="font-sans text-gray-700">Provide data-driven insights for better decision making</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                <span className="font-sans text-gray-700">Build tools that save founders time and money</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Vision */}
        <div className="bg-black text-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8 relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <span className="material-symbols-outlined text-6xl text-primary opacity-20">visibility</span>
          </div>
          <div className="relative z-10">
            <h3 className="font-mono text-2xl font-bold text-primary mb-6 flex items-center gap-3">
              <span className="bg-primary text-black size-10 flex items-center justify-center text-xl rounded-sm">V</span>
              Vision
            </h3>
            <p className="font-sans text-lg text-gray-300 leading-relaxed mb-6">
              A world where startup success is determined by the quality of ideas and execution, not by access to exclusive networks or insider knowledge.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5">star</span>
                <span className="font-sans text-gray-300">Every founder has equal access to opportunities</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5">star</span>
                <span className="font-sans text-gray-300">Innovation thrives through shared knowledge</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5">star</span>
                <span className="font-sans text-gray-300">Startup ecosystems are globally connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}