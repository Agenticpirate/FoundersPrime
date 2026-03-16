'use client'

import React from 'react'

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    className?: string
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    className = ''
}: PaginationProps) {
    if (totalPages <= 1) return null

    // Helper to generate page numbers with ellipses
    const getPageNumbers = (): (number | string)[] => {
        // If total pages is small (<= 7), show all
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }

        // Cases for ellipses
        if (currentPage <= 4) {
            // Start: 1 2 3 4 5 ... 10
            return [1, 2, 3, 4, 5, '...', totalPages]
        }

        if (currentPage >= totalPages - 3) {
            // End: 1 ... 6 7 8 9 10
            return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
        }

        // Middle: 1 ... 4 5 6 ... 10
        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
    }

    return (
        <div className={`bg-white border-3 border-ink shadow-hard-sm mt-6 ${className}`}>
            {/* Mobile: prev / page X of Y / next */}
            <div className="flex md:hidden items-center justify-between p-3 gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-1 px-3 py-2 border-2 border-ink font-mono text-xs font-bold transition-colors ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-ink hover:text-white'}`}
                >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Prev
                </button>

                <span className="font-mono text-xs font-bold text-gray-600">
                    Page {currentPage} / {totalPages}
                </span>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-1 px-3 py-2 border-2 border-ink font-mono text-xs font-bold transition-colors ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'bg-primary text-ink hover:shadow-hard-hover'}`}
                >
                    Next
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
            </div>

            {/* Desktop: full numbered pagination */}
            <div className="hidden md:flex justify-between items-center p-4">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-2 px-4 py-2 border-2 border-ink font-mono text-sm font-bold transition-colors ${currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'hover:bg-ink hover:text-white'
                        }`}
                >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Previous
                </button>

                <div className="flex items-center gap-2">
                    {getPageNumbers().map((pageNum, idx) => (
                        typeof pageNum === 'number' ? (
                            <button
                                key={idx}
                                onClick={() => onPageChange(pageNum)}
                                className={`w-8 h-8 text-sm font-mono font-bold border-2 border-ink transition-colors ${currentPage === pageNum
                                    ? 'bg-primary text-white'
                                    : 'bg-white text-ink hover:bg-gray-100'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        ) : (
                            <span key={idx} className="w-8 h-8 flex items-center justify-center font-mono font-bold text-black">
                                ...
                            </span>
                        )
                    ))}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-2 px-4 py-2 border-2 border-ink font-mono text-sm font-bold transition-colors ${currentPage === totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'bg-primary text-ink hover:shadow-hard-hover hover:translate-x-[-2px] hover:translate-y-[-2px]'
                        }`}
                >
                    Next
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
            </div>
        </div>
    )
}
