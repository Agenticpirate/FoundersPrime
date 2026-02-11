'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
    counts?: {
        all: number
        free: number
        credits: number
        funding: number
    }
    // New props for filtering mode
    categories?: { name: string, count: number }[]
    selectedCategory?: string
    onSelectCategory?: (category: string) => void
}

export default function StudentBenefitsSidebar({
    counts,
    categories,
    selectedCategory,
    onSelectCategory
}: SidebarProps) {
    const pathname = usePathname()

    // MODE 1: Navigation Mode (Original)
    if (counts && !categories) {
        const isActive = (path: string) => {
            if (path === '/student-benefits' && pathname === '/student-benefits') return true
            if (path !== '/student-benefits' && pathname?.startsWith(path)) return true
            // Handle cross-section active state if needed, but simple startswith works for new paths
            return false
        }

        const menuItems = [
            { name: 'All Benefits', path: '/student-benefits', count: counts.all, icon: 'apps' },
            { name: 'Free Access', path: '/resources/free-access', count: counts.free, icon: 'school' },
            { name: 'Credits & Savings', path: '/resources/credits-savings', count: counts.credits, icon: 'savings' },
            { name: 'Funding & Opportunities', path: '/resources/funding-opportunities', count: counts.funding, icon: 'monetization_on' }
        ]

        return (
            <aside className="w-56 flex-shrink-0 hidden lg:block">
                <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto bg-white border border-gray-200 rounded-lg p-3">
                    <div className="mb-2">
                        <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wide px-2">Sections</h3>
                    </div>
                    <nav className="space-y-0.5">
                        {menuItems.map((item) => {
                            const active = isActive(item.path)
                            const isAllBenefits = item.path === '/student-benefits';

                            let activeClass = '';
                            if (active) {
                                if (isAllBenefits) {
                                    activeClass = 'bg-black text-white font-medium';
                                } else {
                                    activeClass = 'bg-gray-100 text-gray-900 font-medium';
                                }
                            } else {
                                activeClass = 'hover:bg-gray-50 text-gray-700';
                            }

                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`flex items-center justify-between px-2 py-1.5 transition-colors rounded text-sm ${activeClass}`}
                                >
                                    <div className="flex items-center gap-1.5">
                                        {isAllBenefits && <span className="material-symbols-outlined text-base">{item.icon}</span>}
                                        <span>{item.name}</span>
                                    </div>
                                    <span className="text-xs font-medium opacity-80">
                                        {item.count}
                                    </span>
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </aside>
        )
    }

    // MODE 2: Filtering Mode
    if (categories && onSelectCategory) {
        return (
            <aside className="w-56 flex-shrink-0 hidden lg:block">
                <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto bg-white border border-gray-200 rounded-lg p-3">

                    {/* All Categories Option */}
                    <button
                        onClick={() => onSelectCategory('')}
                        className={`w-full flex items-center justify-between px-2 py-1.5 text-left transition-colors rounded text-sm mb-2 ${!selectedCategory
                            ? 'bg-black text-white font-medium'
                            : 'hover:bg-gray-50 text-gray-700'
                            }`}
                    >
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base">apps</span>
                            <span>All Categories</span>
                        </div>
                    </button>

                    <div className="mb-2 mt-4">
                        <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wide px-2">Categories</h3>
                    </div>
                    <nav className="space-y-0.5">
                        {categories.map((cat) => {
                            const isActive = selectedCategory === cat.name
                            return (
                                <button
                                    key={cat.name}
                                    onClick={() => onSelectCategory(cat.name)}
                                    className={`w-full flex items-center justify-between px-2 py-1.5 text-left transition-colors rounded text-sm ${isActive
                                        ? 'bg-gray-100 text-gray-900 font-medium'
                                        : 'hover:bg-gray-50 text-gray-700'
                                        }`}
                                >
                                    <span>{cat.name}</span>
                                    <span className="text-xs font-medium opacity-60">
                                        {cat.count}
                                    </span>
                                </button>
                            )
                        })}
                    </nav>
                </div>
            </aside>
        )
    }

    return null
}
