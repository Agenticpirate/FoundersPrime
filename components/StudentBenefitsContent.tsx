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

    // Logo helper - use logo from data if available, otherwise fallback to Clearbit
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
                <div className="mb-6 bg-blue-50 border-1 border-blue-200 p-4 rounded-lg flex items-start gap-3">
                    <span className="material-symbols-outlined text-blue-600 mt-0.5">school</span>
                    <div>
                        <p className="text-sm text-blue-800 font-medium">
                            <span className="font-bold">Student Verification:</span> Please use your educational email address (e.g. name@university.edu) to verify your student status for these benefits.
                        </p>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    {/* Search */}
                    <div className="relative flex-1">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                        <input
                            type="text"
                            placeholder="Search benefits..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); resetPage(); }}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none text-sm transition-colors"
                        />
                    </div>

                    {/* Sort & Mobile Category */}
                    <div className="flex gap-2">
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:border-black outline-none cursor-pointer"
                        >
                            <option value="relevance">Relevance</option>
                            <option value="value-high">Value: High to Low</option>
                            <option value="alphabetical">A-Z</option>
                        </select>

                        {/* Mobile Category Dropdown (shown only on small screens) */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            className="lg:hidden px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:border-black outline-none cursor-pointer flex-1"
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat.name} value={cat.name}>{cat.name} ({cat.count})</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Grid */}
                {filteredBenefits.length > 0 ? (
                    <>
                        <div className="mb-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Showing {Math.min(filteredBenefits.length, (currentPage - 1) * itemsPerPage + 1)}-{Math.min(filteredBenefits.length, currentPage * itemsPerPage)} of {filteredBenefits.length} benefits
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
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
                    <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-lg">
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
                    className="mb-10 mt-8"
                />
            </div>
        </div>
    )
}

// Helper for pagination range

