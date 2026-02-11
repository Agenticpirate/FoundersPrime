'use client'

import { useMemo } from 'react'

interface Props {
    categories: { name: string; count: number }[]
    selectedCategory: string
    onSelectCategory: (category: string) => void
}

export default function StudentBenefitsSidebar({ categories, selectedCategory, onSelectCategory }: Props) {
    return (
        <aside className="w-56 flex-shrink-0 hidden lg:block">
            <div className="sticky top-24 bg-white border-2 border-black rounded-lg p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-3 px-2">Categories</h3>

                <div className="space-y-1">
                    <button
                        onClick={() => onSelectCategory('')}
                        className={`w-full flex items-center justify-between px-3 py-2 text-left transition-all rounded text-xs font-bold ${selectedCategory === ''
                                ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]'
                                : 'hover:bg-gray-100 text-gray-700'
                            }`}
                    >
                        <span>All Benefits</span>
                        {/* We could sum up counts here if needed, but not strictly required by design */}
                    </button>

                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => onSelectCategory(cat.name)}
                            className={`w-full flex items-center justify-between px-3 py-2 text-left transition-all rounded text-xs font-bold border-2 border-transparent ${selectedCategory === cat.name
                                    ? 'bg-primary/20 text-black border-black/10'
                                    : 'hover:bg-gray-100 text-gray-600'
                                }`}
                        >
                            <span className="truncate">{cat.name}</span>
                            <span className="text-[10px] bg-gray-200 px-1.5 py-0.5 rounded-full text-gray-600">{cat.count}</span>
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    )
}
