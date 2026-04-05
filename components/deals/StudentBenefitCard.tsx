'use client'

import { useState, useEffect } from 'react'
import { StudentBenefit } from '@/data/student-benefits-2026'

// Extract domain from URL
const extractDomain = (url: string): string | null => {
    try {
        return new URL(url).hostname.replace('www.', '')
    } catch {
        return null
    }
}

// Company to domain mapping for common brands
const companyToDomain = (company: string): string => {
    const cleaned = company.toLowerCase().replace(/[^a-z0-9]/g, '')
    const domainMap: Record<string, string> = {
        'spotify': 'spotify.com',
        'medium': 'medium.com',
        'figma': 'figma.com',
        'gitlab': 'gitlab.com',
        'cursor': 'cursor.com',
        'framer': 'framer.com',
        'microsoft': 'microsoft.com',
        'miro': 'miro.com',
        'google': 'google.com',
        'youtube': 'youtube.com',
        'amazon': 'amazon.com',
        'adobe': 'adobe.com',
        'thenewyorktimes': 'nytimes.com',
        'nytimes': 'nytimes.com',
        'wallstreetjournal': 'wsj.com',
        'wsj': 'wsj.com',
        'theeconomist': 'economist.com',
        'economist': 'economist.com',
        'babbel': 'babbel.com',
        'youneedabudget': 'ynab.com',
        'ynab': 'ynab.com',
        'everyplate': 'everyplate.com',
        'homechef': 'homechef.com',
        'zipcar': 'zipcar.com',
        'unitedairlines': 'united.com',
        'united': 'united.com',
        'studentuniverse': 'studentuniverse.com',
        'thenorthface': 'thenorthface.com',
        'northface': 'thenorthface.com',
        'jcrew': 'jcrew.com',
        'madewell': 'madewell.com',
        'katespade': 'katespade.com',
        'tommyhilfiger': 'tommy.com',
        'reebok': 'reebok.com',
        'apple': 'apple.com',
        'notion': 'notion.so',
        'github': 'github.com',
        'slack': 'slack.com',
        'discord': 'discord.com',
        'canva': 'canva.com',
        'airtable': 'airtable.com',
    }
    return domainMap[cleaned] || `${cleaned}.com`
}

function BenefitLogo({ benefit }: { benefit: StudentBenefit }) {
    const [fallbackIndex, setFallbackIndex] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [failed, setFailed] = useState(false)

    const domain = extractDomain(benefit.url) || companyToDomain(benefit.company)
    const fallbackChain = [
        `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
        `https://logo.clearbit.com/${domain}`,
        `https://ui-avatars.com/api/?name=${encodeURIComponent(benefit.company)}&background=f3f4f6&color=374151&bold=true&size=128`
    ]

    const currentSrc = fallbackChain[fallbackIndex]

    const handleError = () => {
        const nextIndex = fallbackIndex + 1
        if (nextIndex < fallbackChain.length) {
            setFallbackIndex(nextIndex)
            setLoaded(false)
        } else {
            setFailed(true)
        }
    }

    useEffect(() => {
        setFallbackIndex(0)
        setLoaded(false)
        setFailed(false)
    }, [benefit.company])

    if (failed) {
        return (
            <span className="text-xs font-black font-mono text-gray-400">
                {benefit.company.substring(0, 2).toUpperCase()}
            </span>
        )
    }

    return (
        <img
            src={currentSrc}
            alt={benefit.company}
            className={`w-full h-full object-contain transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setLoaded(true)}
            onError={handleError}
        />
    )
}

export default function StudentBenefitCard({ benefit }: { benefit: StudentBenefit }) {
    return (
        <div className="bg-white border-2 border-black p-3 md:p-5 flex flex-col h-full hover:shadow-[4px_4px_0px_#111111] transition-all duration-200 group relative">
            {/* Tag */}
            <div className={`absolute top-0 right-0 px-1.5 py-0.5 text-[9px] md:text-[10px] font-mono font-bold uppercase border-l-2 border-b-2 border-black ${benefit.appCategory === 'Free Access' ? 'bg-accent-yellow' :
                benefit.appCategory === 'Credits & Savings' ? 'bg-green-400' :
                    'bg-blue-400 text-white'
                }`}>
                {benefit.appCategory === 'Free Access' ? 'FREE' :
                    benefit.appCategory === 'Credits & Savings' ? 'DEAL' : 'GRANT'}
            </div>

            <div className="flex items-start gap-2 mb-2 md:mb-4">
                <div className="w-9 h-9 md:w-12 md:h-12 border-2 border-black p-0.5 md:p-1 flex-shrink-0 bg-gray-50 flex items-center justify-center">
                    <BenefitLogo benefit={benefit} />
                </div>
                <div className="min-w-0">
                    <h3 className="font-bold text-sm md:text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">
                        {benefit.title}
                    </h3>
                    <p className="text-xs font-mono text-gray-500 truncate">{benefit.company}</p>
                </div>
            </div>

            <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-4 line-clamp-2 flex-grow">
                {benefit.offerSummary}
            </p>

            <div className="mt-auto space-y-2">
                <div className="flex flex-wrap gap-1">
                    {benefit.value && (
                        <div className="inline-flex items-center gap-1 border border-black px-1.5 py-0.5 bg-green-50">
                            <span className="material-symbols-outlined text-green-600 text-sm">attach_money</span>
                            <span className="text-[10px] font-bold font-mono text-green-700">{benefit.value}</span>
                        </div>
                    )}
                    <div className="inline-flex items-center gap-1 border border-black px-1.5 py-0.5 bg-gray-50">
                        <span className="material-symbols-outlined text-gray-500 text-sm">verified</span>
                        <span className="text-[10px] font-bold font-mono text-gray-600">{benefit.verification}</span>
                    </div>
                </div>

                <a
                    href={benefit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-1.5 md:py-2 bg-black text-white font-mono text-xs md:text-sm font-bold hover:bg-primary transition-colors border-2 border-transparent hover:border-black"
                >
                    GET ACCESS
                </a>
            </div>
        </div>
    )
}
