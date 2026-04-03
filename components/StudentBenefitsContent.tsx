'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { StudentBenefit } from '@/data/student-benefits-2026'
import DealCard from '@/components/deals/DealCard'
import StudentBenefitsSidebar from '@/components/deals/StudentBenefitsSidebar'
import Pagination from '@/components/Pagination'

interface Props {
    benefits: StudentBenefit[]
    title: string
    description?: string
}

export default function StudentBenefitsContent({ benefits, title, description }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [sort, setSort] = useState('relevance')

    // Read page from URL, default to 1
    const currentPage = Number(searchParams.get('page')) || 1
    const itemsPerPage = 12

    // Extract categories dynamically
    const categories = useMemo(() => {
        const counts: Record<string, number> = {}
        benefits.forEach(b => {
            counts[b.category] = (counts[b.category] || 0) + 1
        })
        return Object.entries(counts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
    }, [benefits])

    // Filter logic
    const filteredBenefits = useMemo(() => {
        let result = benefits

        if (selectedCategory) {
            result = result.filter(b => b.category === selectedCategory)
        }

        if (search) {
            const q = search.toLowerCase()
            result = result.filter(b =>
                b.title.toLowerCase().includes(q) ||
                b.company.toLowerCase().includes(q) ||
                b.offerSummary.toLowerCase().includes(q)
            )
        }

        // Sort logic
        if (sort === 'value-high') {
            result = [...result].sort((a, b) => {
                const valA = parseInt(a.value.replace(/[^0-9]/g, '')) || 0;
                const valB = parseInt(b.value.replace(/[^0-9]/g, '')) || 0;
                return valB - valA;
            });
        } else if (sort === 'alphabetical') {
            result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        }

        return result
    }, [benefits, selectedCategory, search, sort])

    // Pagination
    const totalPages = Math.ceil(filteredBenefits.length / itemsPerPage)
    const paginatedBenefits = filteredBenefits.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString())
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Helper to reset page without scroll (e.g. for search)
    const resetPage = () => {
        const params = new URLSearchParams(searchParams)
        params.set('page', '1')
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    // Reset page to 1 when category changes
    const handleCategoryChange = (cat: string) => {
        setSelectedCategory(cat);
        const params = new URLSearchParams(searchParams)
        params.set('page', '1')
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }

    // Logo helper - use logo from data if available, otherwise fallback to Google Favicon
    const getLogo = (benefit: StudentBenefit) => {
        if (benefit.logo) {
            return benefit.logo;
        }
        try {
            const domain = new URL(benefit.url).hostname;
            return `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=128`;
        } catch (e) {
            return `https://ui-avatars.com/api/?name=${encodeURIComponent(benefit.company)}&background=random`;
        }
    }

    return (
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start">
            {/* Sidebar with Categories */}
            <StudentBenefitsSidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategoryChange}
            />

            {/* Main Content */}
            <div className="flex-1 min-w-0 w-full">
                {/* Pro Tip Alert */}
                <div className="mb-3 bg-blue-50 border border-blue-200 px-3 py-2 rounded-lg flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-600 text-base flex-shrink-0">school</span>
                    <p className="text-xs text-blue-800 font-medium">
                        <span className="font-bold">Student Tip:</span> Use your .edu email to unlock all benefits.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-row gap-2 mb-3 md:mb-6">
                    {/* Search */}
                    <div className="relative flex-1">
                        <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-base">search</span>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); resetPage(); }}
                            className="w-full pl-9 pr-2 py-1.5 md:py-2 bg-white border border-gray-300 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none text-xs md:text-sm transition-colors"
                        />
                    </div>

                    {/* Sort */}
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="px-2 py-1.5 md:py-2 bg-white border border-gray-300 rounded-lg text-xs md:text-sm focus:border-black outline-none cursor-pointer"
                    >
                        <option value="relevance">Sort</option>
                        <option value="value-high">Value ↓</option>
                        <option value="alphabetical">A-Z</option>
                    </select>

                    {/* Mobile Category Dropdown */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="lg:hidden px-2 py-1.5 bg-white border border-gray-300 rounded-lg text-xs focus:border-black outline-none cursor-pointer"
                    >
                        <option value="">All</option>
                        {categories.map(cat => (
                            <option key={cat.name} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                {/* Grid */}
                {filteredBenefits.length > 0 ? (
                    <>
                        <div className="mb-2 text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wide">
                            {Math.min(filteredBenefits.length, (currentPage - 1) * itemsPerPage + 1)}–{Math.min(filteredBenefits.length, currentPage * itemsPerPage)} of {filteredBenefits.length} benefits
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4 mb-4">
                            {paginatedBenefits.map((benefit, idx) => {
                                // Map to DealCard props
                                const dealProps = {
                                    id: benefit.slug || `${benefit.company}-${idx}`,
                                    logo: getLogo(benefit),
                                    category: benefit.category,
                                    badge: benefit.benefitType === 'Free' ? 'Free Forever' : benefit.benefitType,
                                    badgeColor: benefit.benefitType === 'Free' ? 'bg-green-500' : 'bg-blue-500',
                                    title: benefit.title,
                                    provider: benefit.company,
                                    value: benefit.value === 'N/A' || benefit.value === 'Free' ? 'Free' : benefit.value,
                                    valueSubtext: benefit.benefitType,
                                    valueStyle: 'bg-white text-ink border-2 border-ink',
                                    description: benefit.offerSummary,
                                    eligibility: benefit.eligibility,
                                    // Link to internal detail page if slug exists, otherwise external URL
                                    applicationUrl: benefit.slug ? undefined : benefit.url,
                                    verified: true
                                }
                                return <DealCard key={`${benefit.company}-${idx}`} deal={dealProps} basePath="/student-benefits" />
                            })}
                        </div>
                    </>
                ) : (
                    /* Empty State */
                    <div className="text-center py-8 md:py-6 md:py-8 bg-white border border-dashed border-gray-300 rounded-lg">
                        <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">search_off</span>
                        <p className="text-gray-500 font-medium">No benefits found matching your criteria.</p>
                        <button onClick={() => { setSearch(''); setSelectedCategory(''); }} className="mt-4 text-black font-bold hover:underline">Clear Filters</button>
                    </div>
                )}

                {/* Pagination */}
                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    className="mb-10 mt-4 md:mt-6"
                />
            </div>
        </div>
    )
}

// Helper for pagination range

