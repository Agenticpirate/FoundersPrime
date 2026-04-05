export default function StudentFundingHero() {
  return (
    <div className="mb-3 md:mb-5">
      <div className="mb-2">
        <div className="inline-block border border-black bg-blue-500 text-white px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide rounded-sm mb-1.5">
          Grants + Scholarships
        </div>
        <h1 className="font-mono text-lg md:text-3xl font-bold tracking-tight text-black mb-1 leading-tight">
          Student Funding & Opportunities
        </h1>
        <p className="text-xs md:text-sm text-gray-600 max-w-2xl">
          Grants, scholarships, and competitions for student founders. Over <span className="font-bold text-black">$500K+</span> in funding available.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-1.5 md:gap-3">
        <div className="bg-black text-white border-2 border-black shadow-[2px_2px_0px_#111] p-2 md:p-3">
          <p className="font-mono text-[8px] md:text-[10px] font-bold text-gray-500 uppercase">Total Value</p>
          <p className="font-mono text-lg md:text-2xl font-bold">$500K+</p>
        </div>
        <div className="bg-white border-2 border-black shadow-[2px_2px_0px_#111] p-2 md:p-3">
          <p className="font-mono text-[8px] md:text-[10px] font-bold text-gray-400 uppercase">Eligibility</p>
          <p className="font-mono text-lg md:text-2xl font-bold text-black">Students</p>
        </div>
      </div>
    </div>
  )
}
