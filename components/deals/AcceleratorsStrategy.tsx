export default function AcceleratorsStrategy() {
 const trends2026 = [
 { tip: 'Flight to Quality', description: 'Founders are prioritizing programs with tangible customer pipelines over just mentorship.' },
 { tip: 'Day Zero Residency', description: 'Rise of resident models (Antler, EF) where individuals form teams post-acceptance.' },
 { tip: 'Vertical Specialization', description: 'Shift from generalist programs to deep domain experts in AI, Climate, and Defense.' },
 { tip: 'Sovereign Capital', description: 'Input of sovereign-backed capital (e.g. Saudi Vision 2030) driving new program launches.' }
 ]

 return (
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-4 md:mb-6 md:mb-4 md:mb-6">
 <div className="lg:col-span-8">
 <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] md:shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-4 md:p-8 relative overflow-hidden">
 {/* Decorative background pattern */}
 <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
 <span className="material-symbols-outlined text-[150px]">psychology</span>
 </div>

 <h2 className="font-mono text-lg md:text-2xl font-bold text-black mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
 <span className="bg-black text-white size-6 md:size-8 flex items-center justify-center text-sm md:text-lg rounded-sm flex-shrink-0">1</span>
 Global State of Acceleration
 </h2>

 <div className="prose prose-neutral max-w-none">
 <h3 className="font-mono text-lg font-bold uppercase mb-3 text-primary bg-black inline-block px-2 text-white">
 The Current Landscape
 </h3>
 <p className="font-sans text-gray-700 mb-4 text-base">
 The global startup accelerator ecosystem in January reflects a stabilized and highly professionalized market.
 The surviving and active accelerators2026have bifurcated into two dominant archetypes: Global Asset Managers (serving as index funds) and Vertical Specialists.
 </p>

 <div className="bg-gray-100 border-2 border-dashed border-gray-400 p-4 rounded-sm mb-6">
 <p className="font-mono text-xs font-bold text-gray-500 uppercase mb-3">Key Trends</p>
 <div className="space-y-3">
 {trends2026.map((item, index) => (
 <div key={index} className="flex items-start gap-3 border-b border-gray-300 pb-2 last:border-b-0">
 <div className="bg-primary text-black size-6 flex items-center justify-center text-xs font-bold rounded-sm flex-shrink-0">
 {index + 1}
 </div>
 <div className="flex-1">
 <div className="font-mono font-bold text-xs mb-1">{item.tip}</div>
 <p className="font-sans text-xs text-gray-600">{item.description}</p>
 </div>
 </div>
 ))}
 </div>
 </div>

 <h3 className="font-mono text-lg font-bold uppercase mb-3 text-primary bg-black inline-block px-2 text-white">
 Geographic Shifts
 </h3>
 <p className="font-sans text-gray-700 text-base">
 While North America retains the highest density of capital, Southeast Asia (SEA) and the Middle East (MENA) show the highest acceleration of new program launches, driven by national economic diversification mandates.
 </p>
 </div>
 </div>
 </div>

 <div className="lg:col-span-4 space-y-3 md:space-y-4">
 {/* Pro Tip Card */}
 <div className="bg-accent-yellow border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-4 md:p-6 relative overflow-hidden">
 <div className="absolute -right-4 -top-4 bg-white border-2 border-black rounded-full p-2 size-12 md:size-16 flex items-end justify-center">
 <span className="material-symbols-outlined text-2xl md:text-3xl mb-1">network_node</span>
 </div>
 <h3 className="font-mono text-base md:text-xl font-bold mb-2 md:mb-3 uppercase">Valuation Bifurcation</h3>
 <p className="font-mono text-xs leading-relaxed font-medium">
 "Elite Dev Tools" accelerators2026(like HF0) are currently the highest-valued asset class, commanding up to 10x the valuation of standard pre-seed startups.
 </p>
 </div>

 {/* Program Terms Card */}
 <div className="bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
 <h3 className="font-mono text-lg font-bold mb-3 text-primary">Deal Terms</h3>
 <div className="space-y-2 text-sm">
 <div className="flex justify-between items-center">
 <span className="text-gray-300">Y Combinator</span>
 <span className="font-bold text-right">$500k<br /><span className="text-xs text-gray-500">7% + MFN</span></span>
 </div>
 <div className="flex justify-between items-center">
 <span className="text-gray-300">Techstars</span>
 <span className="font-bold text-right">$120k<br /><span className="text-xs text-gray-500">6%</span></span>
 </div>
 <div className="flex justify-between items-center">
 <span className="text-gray-300">HF0</span>
 <span className="font-bold text-right">$1M<br /><span className="text-xs text-gray-500">5%</span></span>
 </div>
 </div>
 <div className="mt-4 pt-3 border-t border-gray-700">
 <p className="text-xs text-gray-400 font-mono">
 💡 Beware of "Program Fees" heavily reducing net investment in some programs.
 </p>
 </div>
 </div>
 </div>
 </div>
 )
}