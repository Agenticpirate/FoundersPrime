import React from 'react'
import Link from 'next/link'

export default function PricingComparisonTable() {
    const features = [
        {
            category: "Core Access",
            items: [
                { name: "Deal Directory Access", free: "Limited", pro: "Unlimited", lifetime: "Unlimited" },
                { name: "Deal Value", free: "< $1k", pro: "$500k+", lifetime: "$500k+" },
                { name: "Update Frequency", free: "Monthly", pro: "Daily", lifetime: "Daily" },
            ]
        },
        {
            category: "Premium Perks",
            items: [
                { name: "Cloud Credits (AWS, Google)", free: "-", pro: "Included", lifetime: "Included" },
                { name: "SaaS Discounts", free: "-", pro: "Included", lifetime: "Included" },
                { name: "Founder Community", free: "Public", pro: "Private", lifetime: "Elite" },
            ]
        },
        {
            category: "Support & Resources",
            items: [
                { name: "Support Level", free: "Community", pro: "Priority", lifetime: "1:1 Dedicated" },
                { name: "Mentorship", free: "-", pro: "Group", lifetime: "1:1 Session" },
                { name: "Resource Library", free: "Basic", pro: "Full Access", lifetime: "Full Access" },
            ]
        }
    ]

    return (
        <section className="w-full py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="font-mono text-2xl font-black text-[#111111] mb-2 uppercase tracking-tight">
                        Detailed Comparison
                    </h2>
                    <p className="font-sans text-sm font-medium text-gray-500">
                        Compare plans side by side.
                    </p>
                </div>

                <div className="overflow-x-auto border-2 border-[#111111] shadow-[4px_4px_0_0_#111111] rounded-sm">
                    <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                        <thead>
                            <tr className="bg-[#111111] text-white font-mono text-xs uppercase tracking-wider">
                                <th className="p-4 w-1/3 border-r border-gray-800">Feature</th>
                                <th className="p-4 w-1/5 text-center border-r border-gray-800 text-gray-400 font-medium">Explorer</th>
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
                                            <td className="p-3 text-center border-r border-gray-100 text-gray-400 text-xs font-medium">{item.free}</td>
                                            <td className="p-3 text-center border-r border-gray-100 font-bold text-xs text-[#111111] bg-[#f0f9ff]">
                                                {item.pro}
                                            </td>
                                            <td className="p-3 text-center font-bold text-xs text-[#111111]">{item.lifetime}</td>
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
