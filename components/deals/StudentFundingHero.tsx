export default function StudentFundingHero() {
  return (
    <div className="mb-4 md:mb-6">
      <div className="mb-3 md:mb-4">
        <div className="inline-block border-2 border-black bg-blue-500 text-white px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide rounded-sm mb-2">
          GRANTS + SCHOLARSHIPS
        </div>
        <h1 className="font-mono text-xl md:text-3xl lg:text-4xl font-bold tracking-tight text-black mb-1 leading-tight">
          Student Funding &amp; Opportunities
        </h1>
        <p className="font-sans text-sm md:text-base text-gray-700 leading-relaxed max-w-3xl">
          Access grants, scholarships, and competitions designed for student founders.
          Over <span className="font-bold text-black bg-primary/20 px-1">$500K+</span> in funding opportunities available to verified students.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 md:gap-4">
        <div className="bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-3 md:p-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Value</p>
            <p className="font-mono text-xl md:text-2xl font-bold text-white">$500K+</p>
          </div>
          <span className="material-symbols-outlined text-xl text-primary hidden sm:block">trending_up</span>
        </div>
        <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-3 md:p-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Eligibility</p>
            <p className="font-mono text-xl md:text-2xl font-bold text-black">Students</p>
          </div>
          <span className="material-symbols-outlined text-xl text-black hidden sm:block">school</span>
        </div>
      </div>
    </div>
  )
}
