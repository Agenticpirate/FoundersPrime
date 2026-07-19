'use client'

/**
 * Shared premium pagination — deals, programs, student benefits,
 * ideas, resources, startups, and all category grids.
 *
 * Mobile: compact Prev | page pills (current + neighbors + last 2–3) | Next
 * Desktop: full page number strip
 */

type PageSlot =
  | { kind: 'page'; page: number; key: string }
  | { kind: 'ellipsis'; key: string }

function buildPageList(
  currentPage: number,
  totalPages: number,
  /** Max numeric slots before collapsing with ellipses (mobile uses fewer). */
  maxSlots: number
): PageSlot[] {
  if (totalPages <= maxSlots) {
    return Array.from({ length: totalPages }, (_, i) => ({
      kind: 'page' as const,
      page: i + 1,
      key: `page-${i + 1}`,
    }))
  }

  const pages = new Set<number>()
  pages.add(1)

  // Neighbors around current (at least current ±1)
  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i >= 1 && i <= totalPages) pages.add(i)
  }

  // Always include last 2–3 pages
  const tailCount = Math.min(3, totalPages)
  for (let i = totalPages - tailCount + 1; i <= totalPages; i++) {
    if (i >= 1) pages.add(i)
  }

  // Near start: fill early pages
  if (currentPage <= 3) {
    for (let i = 1; i <= Math.min(4, totalPages); i++) pages.add(i)
  }
  // Near end: fill late pages
  if (currentPage >= totalPages - 2) {
    for (let i = Math.max(1, totalPages - 4); i <= totalPages; i++) pages.add(i)
  }

  const sorted = Array.from(pages).sort((a, b) => a - b)
  const result: PageSlot[] = []
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push({ kind: 'ellipsis', key: `ellipsis-after-${sorted[i - 1]}` })
    }
    result.push({ kind: 'page', page: sorted[i], key: `page-${sorted[i]}` })
  }
  return result
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  tone = 'auto',
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
  /** Force dark chrome (admin panels without html.dark) */
  tone?: 'auto' | 'dark'
}) {
  if (totalPages <= 1) return null

  const mobilePages = buildPageList(currentPage, totalPages, 6)
  const desktopPages = buildPageList(currentPage, totalPages, 9)
  const dark = tone === 'dark'

  return (
    <div className={`mt-5 md:mt-10 flex flex-col items-center gap-2 md:gap-3 ${className}`}>
      {/* ── Mobile compact bar: Prev | 1 2 3 … 27 28 29 | Next ── */}
      <div
        className={`flex md:hidden w-full max-w-md items-center justify-between gap-1 rounded-2xl border p-1 shadow-sm ${
          dark
            ? 'border-white/10 bg-[#0d0e12]'
            : 'border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#0c0c0c]'
        }`}
      >
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`inline-flex shrink-0 items-center justify-center gap-0.5 min-h-[36px] px-2 rounded-xl font-mono text-[9px] font-bold uppercase tracking-wider disabled:opacity-30 disabled:pointer-events-none ${
            dark
              ? 'text-zinc-400 active:bg-white/5'
              : 'text-gray-600 dark:text-gray-300 active:bg-black/5 dark:active:bg-white/5'
          }`}
          aria-label="Previous page"
        >
          <span aria-hidden className="text-[11px]">
            ←
          </span>
          <span className="hidden xs:inline">Prev</span>
        </button>

        <nav
          className="flex min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto scrollbar-none px-0.5"
          aria-label="Pagination"
        >
          {mobilePages.map((slot) =>
            slot.kind === 'page' ? (
              <button
                key={`m-${slot.key}`}
                type="button"
                onClick={() => onPageChange(slot.page)}
                aria-label={`Go to page ${slot.page}`}
                aria-current={currentPage === slot.page ? 'page' : undefined}
                className={`shrink-0 h-7 min-w-[1.75rem] px-1.5 flex items-center justify-center rounded-md font-mono text-[10px] font-bold tabular-nums transition-colors ${
                  currentPage === slot.page
                    ? 'bg-accent-yellow text-black shadow-sm'
                    : dark
                      ? 'text-zinc-400 active:bg-white/10'
                      : 'text-gray-500 dark:text-zinc-400 active:bg-black/5 dark:active:bg-white/10'
                }`}
              >
                {slot.page}
              </button>
            ) : (
              <span
                key={`m-${slot.key}`}
                className={`shrink-0 px-0.5 font-mono text-[9px] ${dark ? 'text-zinc-600' : 'text-gray-400 dark:text-zinc-600'}`}
                aria-hidden
              >
                …
              </span>
            )
          )}
        </nav>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`inline-flex shrink-0 items-center justify-center gap-0.5 min-h-[36px] px-2 rounded-xl font-mono text-[9px] font-bold uppercase tracking-wider disabled:opacity-30 disabled:pointer-events-none ${
            dark
              ? 'text-zinc-400 active:bg-white/5'
              : 'text-gray-600 dark:text-gray-300 active:bg-black/5 dark:active:bg-white/5'
          }`}
          aria-label="Next page"
        >
          <span className="hidden xs:inline">Next</span>
          <span aria-hidden className="text-[11px]">
            →
          </span>
        </button>
      </div>

      {/* Mobile page count caption */}
      <span
        className={`md:hidden font-mono text-[9px] uppercase tracking-widest ${
          dark ? 'text-zinc-500' : 'text-gray-400 dark:text-zinc-500'
        }`}
      >
        Page{' '}
        <span className={`font-bold tabular-nums ${dark ? 'text-white' : 'text-gray-800 dark:text-white'}`}>
          {currentPage}
        </span>
        {' of '}
        <span className={`font-bold tabular-nums ${dark ? 'text-white' : 'text-gray-800 dark:text-white'}`}>
          {totalPages}
        </span>
      </span>

      {/* ── Desktop full strip ── */}
      <div
        className={`hidden md:flex flex-wrap items-center justify-center gap-1.5 font-mono text-[10px] font-bold p-1.5 rounded-2xl border backdrop-blur-sm ${
          dark
            ? 'border-white/10 bg-[#0d0e12]'
            : 'border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] shadow-[0_1px_0_rgba(255,255,255,0.04)_inset]'
        }`}
      >
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3.5 py-2 rounded-xl bg-transparent disabled:opacity-30 disabled:pointer-events-none transition-all uppercase tracking-wider ${
            dark
              ? 'hover:bg-white/10 text-zinc-400 hover:text-white'
              : 'hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          &larr; Prev
        </button>

        {desktopPages.map((slot) =>
          slot.kind === 'page' ? (
            <button
              key={`d-${slot.key}`}
              type="button"
              onClick={() => onPageChange(slot.page)}
              aria-label={`Go to page ${slot.page}`}
              aria-current={currentPage === slot.page ? 'page' : undefined}
              className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-200 tabular-nums ${
                currentPage === slot.page
                  ? 'bg-accent-yellow text-black font-black border-accent-yellow shadow-[0_4px_14px_rgba(245,158,11,0.35)]'
                  : dark
                    ? 'bg-transparent hover:bg-white/10 text-zinc-400 hover:text-white border-transparent'
                    : 'bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-transparent'
              }`}
            >
              {slot.page}
            </button>
          ) : (
            <span
              key={`d-${slot.key}`}
              className={`px-1 ${dark ? 'text-zinc-600' : 'text-gray-400 dark:text-gray-600'}`}
              aria-hidden
            >
              …
            </span>
          )
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3.5 py-2 rounded-xl bg-transparent disabled:opacity-30 disabled:pointer-events-none transition-all uppercase tracking-wider ${
            dark
              ? 'hover:bg-white/10 text-zinc-400 hover:text-white'
              : 'hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Next &rarr;
        </button>
      </div>

      <span
        className={`hidden md:inline text-[10px] font-mono uppercase tracking-widest ${
          dark ? 'text-zinc-500' : 'text-gray-500'
        }`}
      >
        Page{' '}
        <span className={`font-bold tabular-nums ${dark ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
          {currentPage}
        </span>
        {' of '}
        <span className={`font-bold tabular-nums ${dark ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
          {totalPages}
        </span>
      </span>
    </div>
  )
}
