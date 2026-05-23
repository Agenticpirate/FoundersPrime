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

    // Page numbers with ellipses
    const getPageNumbers = (): (number | string)[] => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }
        if (currentPage <= 4) {
            return [1, 2, 3, 4, 5, '...', totalPages]
        }
        if (currentPage >= totalPages - 3) {
            return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
        }
        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
    }

    const navBtnBase =
        'flex items-center justify-center gap-1.5 px-3.5 py-2 font-mono text-[11px] md:text-xs font-black uppercase tracking-[0.08em] border-2 border-black rounded-sm transition-all'

    const numBtnBase =
        'min-w-[34px] h-[34px] md:min-w-[38px] md:h-[38px] flex items-center justify-center text-[12px] md:text-[13px] font-mono font-black border-2 border-black rounded-sm transition-all tabular-nums'

    return (
        <div className={`relative bg-white border-2 border-black shadow-[3px_3px_0px_#111] mt-6 overflow-hidden ${className}`}>
            {/* Soft yellow accent strip on top */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-accent-yellow to-transparent opacity-70" aria-hidden="true" />

            <div className="flex flex-col sm:flex-row justify-between items-center p-3 sm:p-3.5 gap-3 sm:gap-4">
                {/* Previous (Desktop) */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`${navBtnBase} hidden sm:flex ${
                        currentPage === 1
                            ? 'bg-white text-gray-300 cursor-not-allowed border-gray-200 shadow-none'
                            : 'bg-white text-black hover:bg-gray-50 shadow-[2px_2px_0px_#111] hover:shadow-[3px_3px_0px_#111] hover:-translate-x-px hover:-translate-y-px'
                    }`}
                >
                    <span className="material-symbols-outlined !text-[14px]">arrow_back</span>
                    <span>Previous</span>
                </button>

                {/* Page numbers */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2 order-1 sm:order-none flex-1 w-full sm:w-auto">
                    {getPageNumbers().map((pageNum, idx) => (
                        typeof pageNum === 'number' ? (
                            <button
                                key={idx}
                                onClick={() => onPageChange(pageNum)}
                                aria-label={`Go to page ${pageNum}`}
                                aria-current={currentPage === pageNum ? 'page' : undefined}
                                className={`${numBtnBase} ${
                                    currentPage === pageNum
                                        ? 'bg-accent-yellow text-black shadow-[2px_2px_0px_#111] hover:shadow-[3px_3px_0px_#111] hover:-translate-x-px hover:-translate-y-px'
                                        : 'bg-white text-black hover:bg-accent-yellow/20 hover:shadow-[2px_2px_0px_#111] hover:-translate-x-px hover:-translate-y-px'
                                }`}
                            >
                                {pageNum}
                            </button>
                        ) : (
                            <span
                                key={idx}
                                className="min-w-[24px] h-[34px] md:min-w-[28px] md:h-[38px] flex items-center justify-center font-mono font-black text-gray-400 text-[14px] tracking-widest"
                                aria-hidden="true"
                            >
                                ···
                            </span>
                        )
                    ))}
                </div>

                {/* Next (Desktop) */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`${navBtnBase} hidden sm:flex ${
                        currentPage === totalPages
                            ? 'bg-white text-gray-300 cursor-not-allowed border-gray-200 shadow-none'
                            : 'bg-accent-yellow text-black shadow-[2px_2px_0px_#111] hover:bg-amber-300 hover:shadow-[3px_3px_0px_#111] hover:-translate-x-px hover:-translate-y-px'
                    }`}
                >
                    <span>Next</span>
                    <span className="material-symbols-outlined !text-[14px]">arrow_forward</span>
                </button>

                {/* Mobile Prev/Next */}
                <div className="grid grid-cols-2 gap-2.5 w-full sm:hidden order-2">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`${navBtnBase} ${
                            currentPage === 1
                                ? 'bg-white text-gray-300 border-gray-200 cursor-not-allowed shadow-none'
                                : 'bg-white text-black shadow-[2px_2px_0px_#111]'
                        }`}
                    >
                        <span className="material-symbols-outlined !text-[14px]">arrow_back</span>
                        Prev
                    </button>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`${navBtnBase} ${
                            currentPage === totalPages
                                ? 'bg-white text-gray-300 border-gray-200 cursor-not-allowed shadow-none'
                                : 'bg-accent-yellow text-black shadow-[2px_2px_0px_#111]'
                        }`}
                    >
                        Next
                        <span className="material-symbols-outlined !text-[14px]">arrow_forward</span>
                    </button>
                </div>
            </div>

            {/* Page count footer (subtle) */}
            <div className="hidden md:flex items-center justify-center gap-1.5 pb-2 -mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-gray-400">
                <span className="w-1 h-1 rounded-full bg-accent-yellow" />
                Page <span className="text-black font-bold tabular-nums">{currentPage}</span> of <span className="text-black font-bold tabular-nums">{totalPages}</span>
                <span className="w-1 h-1 rounded-full bg-accent-yellow" />
            </div>
        </div>
    )
}
