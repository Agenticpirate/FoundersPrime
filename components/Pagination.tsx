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
            <div className="flex justify-between items-center p-2 sm:p-4 gap-2 sm:gap-4">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex flex-1 sm:flex-none items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 border-2 border-ink font-mono text-xs sm:text-sm font-bold transition-colors ${currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'hover:bg-ink hover:text-white'
                        }`}
                >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">Prev</span>
                </button>

                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 flex-1">
                    {getPageNumbers().map((pageNum, idx) => (
                        typeof pageNum === 'number' ? (
                            <button
                                key={idx}
                                onClick={() => onPageChange(pageNum)}
                                className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-mono font-bold border-1 sm:border-2 border-ink transition-colors ${currentPage === pageNum
                                    ? 'bg-primary text-ink'
                                    : 'bg-white text-ink hover:bg-gray-100'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        ) : (
                            <span key={idx} className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center font-mono font-bold text-black text-xs sm:text-sm tracking-widest">
                                ...
                            </span>
                        )
                    ))}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex flex-1 sm:flex-none items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 border-2 border-ink font-mono text-xs sm:text-sm font-bold transition-colors ${currentPage === totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'bg-primary text-ink sm:hover:shadow-[3px_3px_0px_#111111] hover:translate-x-[-1px] hover:translate-y-[-1px]'
                        }`}
                >
                    <span className="hidden sm:inline">Next</span>
                    <span className="sm:hidden">Next</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
            </div>
        </div>
    )
}
