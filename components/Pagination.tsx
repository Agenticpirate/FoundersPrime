'use client'

/**
 * Shared premium pagination — used by deals, programs, student benefits,
 * ideas, resources, startups, and all category grids.
 *
 * Mobile: compact Prev | page/total | Next (no long page strip).
 * Desktop: full page number strip (unchanged behavior).
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}) {
  if (totalPages <= 1) return null

  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages]
    }
    if (currentPage >= totalPages - 3) {
      return [
        1,
        '...',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ]
    }
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
  }

  return (
    <div className={`mt-6 md:mt-10 flex flex-col items-center gap-2 md:gap-3 ${className}`}>
      {/* ── Mobile compact bar ── */}
      <div className="flex md:hidden w-full max-w-sm items-center justify-between gap-2 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#0c0c0c] p-1.5 shadow-sm">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center justify-center gap-1 min-h-[40px] min-w-[72px] px-3 rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 disabled:opacity-30 disabled:pointer-events-none active:bg-black/5 dark:active:bg-white/5"
          aria-label="Previous page"
        >
          <span aria-hidden>←</span> Prev
        </button>

        <div className="flex items-center gap-1.5 px-2 font-mono text-[11px] tabular-nums">
          <span className="inline-flex h-8 min-w-[2rem] items-center justify-center rounded-lg bg-accent-yellow text-black font-black px-2">
            {currentPage}
          </span>
          <span className="text-gray-400 dark:text-zinc-500">/</span>
          <span className="text-gray-600 dark:text-zinc-300 font-bold">{totalPages}</span>
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center justify-center gap-1 min-h-[40px] min-w-[72px] px-3 rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 disabled:opacity-30 disabled:pointer-events-none active:bg-black/5 dark:active:bg-white/5"
          aria-label="Next page"
        >
          Next <span aria-hidden>→</span>
        </button>
      </div>

      {/* ── Desktop full strip ── */}
      <div className="hidden md:flex flex-wrap items-center justify-center gap-1.5 font-mono text-[10px] font-bold p-1.5 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] backdrop-blur-sm shadow-[0_1px_0_rgba(255,255,255,0.04)_inset]">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3.5 py-2 rounded-xl bg-transparent hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all uppercase tracking-wider"
        >
          &larr; Prev
        </button>

        {getPageNumbers().map((pageNum, idx) =>
          typeof pageNum === 'number' ? (
            <button
              key={idx}
              type="button"
              onClick={() => onPageChange(pageNum)}
              aria-label={`Go to page ${pageNum}`}
              aria-current={currentPage === pageNum ? 'page' : undefined}
              className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-200 tabular-nums ${
                currentPage === pageNum
                  ? 'bg-accent-yellow text-black font-black border-accent-yellow shadow-[0_4px_14px_rgba(245,158,11,0.35)]'
                  : 'bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-transparent'
              }`}
            >
              {pageNum}
            </button>
          ) : (
            <span key={idx} className="px-1 text-gray-400 dark:text-gray-600" aria-hidden>
              …
            </span>
          )
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3.5 py-2 rounded-xl bg-transparent hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all uppercase tracking-wider"
        >
          Next &rarr;
        </button>
      </div>

      <span className="hidden md:inline text-[10px] font-mono text-gray-500 dark:text-gray-500 uppercase tracking-widest">
        Page{' '}
        <span className="text-gray-900 dark:text-white font-bold tabular-nums">{currentPage}</span>
        {' '}of{' '}
        <span className="text-gray-900 dark:text-white font-bold tabular-nums">{totalPages}</span>
      </span>
    </div>
  )
}
