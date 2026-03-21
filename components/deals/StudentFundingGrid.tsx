'use client'

import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { studentBenefits2026, StudentBenefit } from '@/data/student-benefits-2026'
import DealCard from './DealCard'
import AcceleratorsSearch from './AcceleratorsSearch'

// Helper for logo
const getLogo = (url: string, company: string) => {
    try {
        const domain = new URL(url).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } catch (e) {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(company)}&background=random`;
    }
}

// Pagination Helper
function getPaginationRange(current: number, total: number): (number | string)[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    if (current <= 4) {
        return [1, 2, 3, 4, 5, '...', total];
    }
    if (current >= total - 3) {
        return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
    }

    return [1, '...', current - 1, current, current + 1, '...', total];
}

type SortOption = 'relevance' | 'value' | 'alphabetical'

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
            <div className="mb-6">
                <AcceleratorsSearch onSearch={handleSearch} placeholder="Search grants, scholarships, competitions..." />
            </div>

            {/* Filters and Sorting */}
            <div className="flex flex-col gap-2 mb-4 md:mb-6">
                {/* Type Filter Pills - always horizontal scroll */}
                <div className="flex gap-1.5 overflow-x-auto mobile-scroll-hide pb-0.5">
                    {types.map(type => (
                        <button
                            key={type}
                            onClick={() => { setFundingType(type); setCurrentPage(1); }}
                            className={`px-2.5 py-1 font-mono text-xs border-2 border-black rounded-sm whitespace-nowrap flex-shrink-0 transition-all ${fundingType === type
                                ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]'
                                : 'bg-white text-black hover:bg-gray-100'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                {/* Sort */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full md:w-64 px-3 py-2 font-mono text-xs md:text-sm bg-white border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                >
                    <option value="relevance">Sort: Relevance</option>
                    <option value="value">Value (High to Low)</option>
                    <option value="alphabetical">Name (A-Z)</option>
                </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-3 md:mb-6 pb-2 md:pb-2 border-b-2 border-dashed border-gray-300">
                <div className="font-mono text-xs md:text-sm text-gray-600">
                    <span className="font-bold text-black">{filteredDeals.length}</span> opportunities
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={handleClearFilters}
                        className="px-2.5 py-1 font-mono text-xs font-bold bg-white border-2 border-black rounded-sm hover:bg-gray-100 transition-colors flex items-center gap-1"
                    >
                        <span className="material-symbols-outlined text-xs">close</span>
                        Clear
                    </button>
                )}
            </div>

            {/* Grid */}
            {paginatedDeals.length > 0 ? (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                        {paginatedDeals.map((benefit, idx) => (
                            <DealCard key={`${benefit.company}-${idx}`} deal={convertToCard(benefit, idx)} />
                        ))}
                    </div>

                    {/* Pagination (Neo-Brutalist) */}
                    {totalPages > 1 && (
                        <div className="w-full border-2 border-black p-2 md:p-4 flex flex-wrap justify-between items-center gap-2 bg-white mb-10 mt-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            {/* Previous */}
                            <button
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="px-2 sm:px-4 py-2 border-2 border-black font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-1 sm:gap-2 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm sm:text-base">arrow_back</span>
                                <span className="hidden sm:inline">Previous</span>
                                <span className="sm:hidden">Prev</span>
                            </button>

                            {/* Page Numbers */}
                            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 flex-1">
                                {getPaginationRange(currentPage, totalPages).map((p, i) => (
                                    typeof p === 'number' ? (
                                        <button
                                            key={i}
                                            onClick={() => handlePageChange(p)}
                                            className={`w-7 h-7 sm:w-10 sm:h-10 border-1 sm:border-2 border-black font-mono text-xs sm:text-sm font-bold flex items-center justify-center transition-all ${currentPage === p
                                                ? 'bg-[#00D4FF] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                                : 'bg-white hover:bg-gray-50 text-black'
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    ) : (
                                        <span key={i} className="w-5 h-7 sm:w-10 sm:h-10 flex items-center justify-center font-mono font-bold text-black text-xs sm:text-sm">...</span>
                                    )
                                ))}
                            </div>

                            {/* Next */}
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="px-2 sm:px-4 py-2 border-2 border-black bg-[#00D4FF] text-black font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-1 sm:gap-2 hover:bg-[#00B8E6] disabled:opacity-50 disabled:bg-gray-300 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                            >
                                <span className="hidden sm:inline">Next</span>
                                <span className="sm:hidden">Next</span>
                                <span className="material-symbols-outlined text-sm sm:text-base">arrow_forward</span>
                            </button>
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
