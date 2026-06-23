import React from 'react'
import Link from 'next/link'

export default function PricingComparisonTable() {
    const features = [
        {
            category: "Core Access & Usage Limits",
            items: [
                { name: "SaaS Deals & Cloud Credits", nextfounder: "Premium AI & SaaS credits", founder: "Unlimited Pages", legend: "Unlimited Pages" },
                { name: "Monthly Deal Applications", nextfounder: "20 per month", founder: "Unlimited", legend: "Unlimited" },
                { name: "Update Frequency", nextfounder: "Daily", founder: "Daily", legend: "Daily" },
            ]
        },
        {
            category: "Programs & Databases",
            items: [
                { name: "Hackathons, Internships, Fellowships", nextfounder: "✓", founder: "—", legend: "—" },
                { name: "Startup Grants & Founder Programs", nextfounder: "✓", founder: "✓ All Pages", legend: "✓ All Pages" },
                { name: "Opportunity Hub (Career & Growth)", nextfounder: "✓", founder: "—", legend: "—" },
                { name: "Curated Tools & Opportunities", nextfounder: "✓", founder: "✓", legend: "✓" },
                { name: "Accelerator Programs", nextfounder: "—", founder: "✓ All Pages", legend: "✓ All Pages" },
                { name: "Incubator Programs", nextfounder: "—", founder: "✓ All Pages", legend: "✓ All Pages" },
                { name: "Founders Resources (Ideas database, existing startups & more)", nextfounder: "—", founder: "✓", legend: "✓" },
                { name: "Investor Database", nextfounder: "—", founder: "✓", legend: "✓" },
            ]
        },
        {
            category: "Resources & Support",
            items: [
                { name: "Master Resources Library", nextfounder: "—", founder: "✓", legend: "✓" },
                { name: "All Future Updates", nextfounder: "✓", founder: "✓", legend: "✓" },
                { name: "Lifetime Access", nextfounder: "—", founder: "—", legend: "✓ One-time" },
            ]
        }
    ]

    return (
        <section className="w-full py-8 md:py-6 md:py-8 bg-white">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="font-mono text-2xl font-black text-[#111111] mb-2 uppercase tracking-tight">
                        Detailed Comparison
                    </h2>
                    <p className="font-sans text-sm font-medium text-gray-500">
                        Compare plans side by side.
                    </p>
                </div>

                {/* Mobile scroll hint */}
                <div className="flex items-center gap-2 mb-2 md:hidden text-xs font-mono text-gray-500">
                    <span className="material-symbols-outlined text-sm">swipe</span>
                    Swipe left to see all plans
                </div>

                <div className="overflow-x-auto border-2 border-[#111111] shadow-[4px_4px_0_0_#111111] rounded-sm">
                    <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                        <thead>
                            <tr className="bg-[#111111] text-white font-mono text-xs uppercase tracking-wider">
                                <th className="p-4 w-1/3 border-r border-gray-800">Feature</th>
                                <th className="p-4 w-1/5 text-center border-r border-gray-800 text-gray-400 font-medium">NextFounder</th>
                                <th className="p-4 w-1/5 text-center border-r border-gray-800 text-[#13b6ec] font-black bg-[#1a1a1a]">Founder</th>
                                <th className="p-4 w-1/5 text-center text-[#ffd700] font-black">Legend</th>
                            </tr>
                        </thead>
                        <tbody className="text-[#111111]">
                            {features.map((section, sIdx) => (
                                <React.Fragment key={sIdx}>
                                    <tr className="bg-gray-50 font-mono font-bold uppercase text-[10px] tracking-widest">
                                        <td colSpan={4} className="p-2 pl-4 border-b border-gray-200 text-gray-500">{section.category}</td>
                                    </tr>
                                    {section.items.map((item, iIdx) => (
                                        <tr key={iIdx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                            <td className="p-3 pl-4 border-r border-gray-100 font-bold text-xs">{item.name}</td>
                                            <td className={`p-3 text-center border-r border-gray-100 text-xs font-medium ${item.nextfounder === '✓' ? 'text-green-600 font-bold' : item.nextfounder === '—' ? 'text-gray-300' : 'text-gray-500'}`}>
                                                {item.nextfounder}
                                            </td>
                                            <td className={`p-3 text-center border-r border-gray-100 text-xs font-bold bg-[#f0f9ff] ${item.founder === '✓' ? 'text-green-600' : item.founder === '—' ? 'text-gray-300' : 'text-[#111111]'}`}>
                                                {item.founder}
                                            </td>
                                            <td className={`p-3 text-center text-xs font-bold ${item.legend === '✓' || item.legend.startsWith('✓') ? 'text-green-600' : item.legend === '—' ? 'text-gray-300' : 'text-[#111111]'}`}>
                                                {item.legend}
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
