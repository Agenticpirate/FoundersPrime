/**
 * Deterministic date formatting for admin/dashboard surfaces.
 * Uses fixed locale + UTC so server/client match (no hydration drift).
 * Does not change public marketing copy — only date strings.
 */

const DATE_OPTS: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
}

const DATE_LONG_OPTS: Intl.DateTimeFormatOptions = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
}

const MONTH_YEAR_OPTS: Intl.DateTimeFormatOptions = {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
}

export function formatDateShort(iso: string | null | undefined): string {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString('en-US', DATE_OPTS)
  } catch {
    return '—'
  }
}

export function formatDateLong(iso: string | null | undefined): string {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString('en-US', DATE_LONG_OPTS)
  } catch {
    return '—'
  }
}

export function formatMonthYear(iso: string | null | undefined): string {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString('en-US', MONTH_YEAR_OPTS)
  } catch {
    return '—'
  }
}

/** Month + day only (e.g. "Jul 18") — fixed en-US + UTC. */
export function formatDateMonthDay(iso: string | null | undefined): string {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    })
  } catch {
    return '—'
  }
}
