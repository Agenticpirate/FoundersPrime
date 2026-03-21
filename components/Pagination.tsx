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
        <div className={`bg-white border-2 md:border-3 border-ink shadow-hard-sm mt-6 ${className}`}>
            <div className="flex flex-col sm:flex-row justify-between items-center p-3 sm:p-4 gap-3 sm:gap-4">
                
                {/* Previous Button (Desktop) */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`hidden sm:flex items-center justify-center gap-2 px-4 py-2 border-2 border-ink font-mono text-sm font-bold transition-colors ${currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'hover:bg-ink hover:text-white'
                        }`}
                >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    <span>Previous</span>
                </button>

                {/* Page Numbers (All screens) - Top on mobile, center on desktop */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2 order-1 sm:order-none flex-1 w-full sm:w-auto">
                    {getPageNumbers().map((pageNum, idx) => (
                        typeof pageNum === 'number' ? (
                            <button
                                key={idx}
                                onClick={() => onPageChange(pageNum)}
                                className={`min-w-[32px] h-[32px] md:min-w-[40px] md:h-[40px] px-1 flex items-center justify-center text-xs sm:text-sm font-mono font-bold border-2 border-ink transition-colors ${currentPage === pageNum
                                    ? 'bg-primary text-ink shadow-[2px_2px_0px_#111111]'
                                    : 'bg-white text-ink hover:bg-gray-100'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        ) : (
                            <span key={idx} className="min-w-[24px] h-[32px] md:min-w-[32px] md:h-[40px] flex items-center justify-center font-mono font-bold text-black text-xs sm:text-sm tracking-widest">
                                ...
                            </span>
                        )
                    ))}
                </div>

                {/* Next Button (Desktop) */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`hidden sm:flex items-center justify-center gap-2 px-4 py-2 border-2 border-ink font-mono text-sm font-bold transition-colors ${currentPage === totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'bg-primary text-ink hover:shadow-[3px_3px_0px_#111111] hover:translate-x-[-1px] hover:translate-y-[-1px]'
                        }`}
                >
                    <span>Next</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>

                {/* Mobile Prev/Next Container - Bottom row on mobile */}
                <div className="grid grid-cols-2 gap-3 w-full sm:hidden order-2">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`flex items-center justify-center gap-1 px-3 py-2.5 border-2 border-ink font-mono text-xs font-bold uppercase transition-colors ${currentPage === 1
                            ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                            : 'bg-white text-ink hover:bg-gray-100'
                            }`}
                    >
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Prev
                    </button>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`flex items-center justify-center gap-1 px-3 py-2.5 border-2 border-ink font-mono text-xs font-bold uppercase transition-colors ${currentPage === totalPages
                            ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                            : 'bg-primary text-ink shadow-[2px_2px_0px_#111111]'
                            }`}
                    >
                        Next
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                </div>

            </div>
        </div>
    )
}
