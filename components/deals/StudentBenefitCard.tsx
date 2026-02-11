'use client'

import Image from 'next/image'
import Link from 'next/link'
import { StudentBenefit } from '@/data/student-benefits-2026'

// Helper to extract domain for logo
const getLogo = (benefit: StudentBenefit) => {
    if (benefit.logo) {
        return benefit.logo;
    }
    try {
        const domain = new URL(benefit.url).hostname;
        return `https://logo.clearbit.com/${domain}`;
    } catch (e) {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(benefit.company)}&background=random`;
    }
}

export default function StudentBenefitCard({ benefit }: { benefit: StudentBenefit }) {
    return (
        <div className="bg-white border-2 border-black p-5 flex flex-col h-full hover:shadow-[6px_6px_0px_#111111] transition-all duration-200 group relative">
            {/* Tag */}
            <div className={`absolute top-0 right-0 px-2 py-1 text-[10px] font-mono font-bold uppercase border-l-2 border-b-2 border-black ${benefit.appCategory === 'Free Access' ? 'bg-accent-yellow' :
                benefit.appCategory === 'Credits & Savings' ? 'bg-green-400' :
                    'bg-blue-400 text-white'
                }`}>
                {benefit.appCategory === 'Free Access' ? 'FREE' :
                    benefit.appCategory === 'Credits & Savings' ? 'DEAL' : 'GRANT'}
            </div>

            <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 border-2 border-black p-1 flex-shrink-0 bg-gray-50">
                    <img
                        src={getLogo(benefit)}
                        alt={benefit.company}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(benefit.company)}&background=random`
                        }}
                    />
                </div>
                <div>
                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">
                        {benefit.title}
                    </h3>
                    <p className="text-sm font-mono text-gray-500">{benefit.company}</p>
                </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                {benefit.offerSummary}
            </p>

            <div className="mt-auto space-y-3">
                <div className="flex flex-wrap gap-2">
                    {benefit.value && (
                        <div className="inline-flex items-center gap-1.5 border border-black px-2 py-1 bg-green-50">
                            <span className="material-symbols-outlined text-green-600 text-base">attach_money</span>
                            <span className="text-xs font-bold font-mono text-green-700">{benefit.value}</span>
                        </div>
                    )}
                    <div className="inline-flex items-center gap-1.5 border border-black px-2 py-1 bg-gray-50">
                        <span className="material-symbols-outlined text-gray-500 text-base">verified</span>
                        <span className="text-xs font-bold font-mono text-gray-600">{benefit.verification}</span>
                    </div>
                </div>

                <a
                    href={benefit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-2 bg-black text-white font-mono text-sm font-bold hover:bg-primary transition-colors border-2 border-transparent hover:border-black"
                >
                    GET ACCESS
                </a>
            </div>
        </div>
    )
}
