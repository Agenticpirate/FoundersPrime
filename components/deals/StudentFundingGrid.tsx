'use client'

import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { studentBenefits2026, StudentBenefit } from '@/data/student-benefits-2026'
import DealCard from './DealCard'
import AcceleratorsSearch from './AcceleratorsSearch'
import Pagination from '@/components/Pagination'

// Helper for logo - uses Google Favicons (fast, reliable)
const getLogo = (url: string, company: string) => {
    try {
        const domain = new URL(url).hostname.replace('www.', '');
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } catch (e) {
        const cleaned = company.toLowerCase().replace(/[^a-z0-9]/g, '');
        return `https://www.google.com/s2/favicons?domain=${cleaned}.com&sz=128`;
    }
}

type SortOption = 'relevance' | 'value' | 'alphabetical'

// Famous programs that should appear first
const PRIORITY_COMPANIES = [
  'thiel fellowship', 'peter thiel', 'y combinator', 'techstars', '500 global',
  'google', 'microsoft', 'apple', 'meta', 'amazon', 'aws',
  'stripe', 'shopify', 'github', 'notion', 'figma', 'openai',
  'ford foundation', 'gates foundation', 'knight foundation',
  'national science foundation', 'nsf', 'darpa', 'arpa',
  'xprize', 'hult prize', 'mit', 'stanford', 'harvard',
  'forbes', 'un', 'united nations', 'world bank',
  'mastercard', 'visa', 'paypal', 'square',
]

export default function StudentFundingGrid() {
    const [searchQuery, setSearchQuery] = useState('')
    const [fundingType, setFundingType] = useState('All')
    const [sortBy, setSortBy] = useState<SortOption>('relevance')
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 12

    // Filter for Funding only first
    const allFundingOpportunities = studentBenefits2026.filter(b => b.appCategory === 'Funding & Opportunities')

    const types = ['All', 'Grant', 'Scholarship', 'Competition', 'Investment', 'Fellowship']

    const filteredDeals = useMemo(() => {
        let results = allFundingOpportunities

        // Filter by type
        if (fundingType !== 'All') {
            results = results.filter(b =>
                b.benefitType.includes(fundingType) ||
                b.category.includes(fundingType) || // Check category too
                b.title.includes(fundingType)
            )
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            results = results.filter(b =>
                b.title.toLowerCase().includes(query) ||
                b.company.toLowerCase().includes(query) ||
                b.offerSummary.toLowerCase().includes(query)
            )
        }

        // Sort
        if (sortBy === 'value') {
            results = [...results].sort((a, b) => {
                const valA = parseInt(a.value.replace(/[^0-9]/g, '')) || 0;
                const valB = parseInt(b.value.replace(/[^0-9]/g, '')) || 0;
                return valB - valA;
            });
        } else if (sortBy === 'alphabetical') {
            results = [...results].sort((a, b) => a.title.localeCompare(b.title));
        } else {
            // Relevance: prioritize famous programs, then by value
            results = [...results].sort((a, b) => {
                const aName = (a.company + ' ' + a.title).toLowerCase()
                const bName = (b.company + ' ' + b.title).toLowerCase()
                const aPriority = PRIORITY_COMPANIES.some(p => aName.includes(p)) ? 0 : 1
                const bPriority = PRIORITY_COMPANIES.some(p => bName.includes(p)) ? 0 : 1
                if (aPriority !== bPriority) return aPriority - bPriority
                // Then by value descending
                const valA = parseInt(a.value.replace(/[^0-9]/g, '')) || 0
                const valB = parseInt(b.value.replace(/[^0-9]/g, '')) || 0
                return valB - valA
            });
        }

        return results
    }, [allFundingOpportunities, fundingType, searchQuery, sortBy])

    // Pagination Logic
    const totalPages = Math.ceil(filteredDeals.length / itemsPerPage)
    const paginatedDeals = filteredDeals.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 300, behavior: 'smooth' })
    }

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query)
        setCurrentPage(1)
    }, [])

    const handleClearFilters = () => {
        setFundingType('All')
        setSearchQuery('')
        setSortBy('relevance')
        setCurrentPage(1)
    }

    const convertToCard = (benefit: StudentBenefit, idx: number) => {
        return {
            id: `${benefit.company}-${idx}`,
            logo: benefit.logo || getLogo(benefit.url, benefit.company),
            category: 'Funding',
            badge: benefit.benefitType,
            badgeColor: benefit.benefitType.includes('Grant') ? 'bg-green-500' : 'bg-blue-500',
            title: benefit.title,
            provider: benefit.company,
            value: benefit.value === 'N/A' ? 'Variable' : benefit.value,
            valueSubtext: benefit.verification,
            valueStyle: 'bg-white text-ink border-2 border-ink',
            description: benefit.offerSummary,
            eligibility: benefit.eligibility,
            applicationUrl: benefit.url,
            verified: true
        }
    }

    const hasActiveFilters = fundingType !== 'All' || searchQuery !== '' || sortBy !== 'relevance'

    return (
        <div className="w-full">
            {/* Search Bar */}
            <div className="mb-3">
                <AcceleratorsSearch onSearch={handleSearch} placeholder="Search grants, scholarships..." />
            </div>

            {/* Filters and Sorting */}
            <div className="flex flex-col gap-1.5 mb-3">
                <div className="flex gap-1 overflow-x-auto mobile-scroll-hide pb-0.5">
                    {types.map(type => (
                        <button
                            key={type}
                            onClick={() => { setFundingType(type); setCurrentPage(1); }}
                            className={`px-2 py-0.5 font-mono text-[10px] border border-black rounded-sm whitespace-nowrap flex-shrink-0 transition-all ${fundingType === type
                                ? 'bg-black text-white'
                                : 'bg-white text-black hover:bg-gray-100'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full md:w-48 px-2 py-1.5 font-mono text-xs bg-white border-2 border-black rounded-sm focus:outline-none"
                >
                    <option value="relevance">Top Programs</option>
                    <option value="value">Value (High→Low)</option>
                    <option value="alphabetical">A-Z</option>
                </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-dashed border-gray-300">
                <div className="font-mono text-[10px] md:text-xs text-gray-600">
                    <span className="font-bold text-black">{filteredDeals.length}</span> opportunities
                </div>
                {hasActiveFilters && (
                    <button onClick={handleClearFilters} className="px-2 py-0.5 font-mono text-[10px] font-bold bg-white border border-black rounded-sm hover:bg-gray-100 flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[10px]">close</span>
                        Clear
                    </button>
                )}
            </div>

            {/* Grid */}
            {paginatedDeals.length > 0 ? (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
                        {paginatedDeals.map((benefit, idx) => {
                            const deal = convertToCard(benefit, idx);
                            return (
                                <DealCard key={`${benefit.company}-${idx}`} deal={deal} overrideHref={deal.applicationUrl} />
                            )
                        })}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-8 md:mt-10 mb-8 md:mb-10 w-full">
                            <Pagination 
                                currentPage={currentPage} 
                                totalPages={totalPages} 
                                onPageChange={handlePageChange} 
                            />
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-8 md:py-6 md:py-8 bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-sm">
                    <span className="material-symbols-outlined text-6xl text-gray-300 mb-4 block">search_off</span>
                    <p className="font-mono text-lg font-bold text-gray-700 mb-2">No opportunities found</p>
                    <button
                        onClick={handleClearFilters}
                        className="mt-4 px-4 py-2 font-mono text-sm font-bold bg-accent-yellow border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    )
}
