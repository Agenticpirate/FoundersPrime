'use client'

import Link from 'next/link'

export type BreadcrumbItem = {
  label: string
  href?: string
  /** Optional material symbol name for the current/last crumb */
  icon?: string
}

/**
 * Site-wide breadcrumb foundation.
 * Placement: top of main content, left-aligned, same max-width as page content.
 * Visual: mono, “Home / Section / Current” — no chevrons, no uppercase tracking.
 */
export default function PageBreadcrumb({
  items,
  className = '',
  /** Highlight current crumb with soft yellow pill (e.g. contact). */
  highlightCurrent = false,
}: {
  items: BreadcrumbItem[]
  className?: string
  highlightCurrent?: boolean
}) {
  if (!items.length) return null

  // Default spacing is the site foundation; className can override (e.g. mb-4 md:mb-5)
  const spacing = className.includes('mb-') ? '' : 'mb-3 md:mb-3.5'

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex ${spacing} ${className}`.trim()}
    >
      <ol className="inline-flex items-center gap-1.5 font-mono text-[11px] md:text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap flex-wrap">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.href || `${item.label}-${isLast ? 'current' : 'crumb'}`} className="inline-flex items-center gap-1.5">
              {i > 0 && (
                <span className="text-gray-300 dark:text-white/20" aria-hidden>
                  /
                </span>
              )}
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={
                    isLast
                      ? highlightCurrent
                        ? 'inline-flex items-center gap-1 text-gray-900 dark:text-white font-semibold bg-accent-yellow/20 dark:bg-accent-yellow/15 px-2 py-0.5 rounded-md border border-black/5 dark:border-white/10'
                        : 'inline-flex items-center gap-1 text-gray-900 dark:text-white font-semibold'
                      : 'inline-flex items-center gap-1'
                  }
                >
                  {item.icon && (
                    <span
                      className="material-symbols-outlined !text-[12px] text-accent-yellow"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                      aria-hidden
                    >
                      {item.icon}
                    </span>
                  )}
                  <span className="truncate max-w-[180px] sm:max-w-[280px] md:max-w-none">
                    {item.label}
                  </span>
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
