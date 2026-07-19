/** Flash drop schedule helpers (Mon/Thu local midnight). */

export function nextDropTime(from: Date): number {
  // Drops happen Monday (1) and Thursday (4) at local 00:00.
  const target = new Date(from)
  target.setHours(0, 0, 0, 0)
  for (let i = 1; i <= 7; i++) {
    const candidate = new Date(target)
    candidate.setDate(target.getDate() + i)
    const day = candidate.getDay()
    if (day === 1 || day === 4) return candidate.getTime()
  }
  return target.getTime() + 24 * 3600 * 1000
}

/** Approx window between Mon↔Thu drops (~3.5 days average). */
export function dropWindowMs(targetMs: number): number {
  const d = new Date(targetMs)
  const day = d.getDay()
  // Next is Mon → came from Thu (~4d). Next is Thu → came from Mon (~3d).
  if (day === 1) return 4 * 24 * 3600 * 1000
  if (day === 4) return 3 * 24 * 3600 * 1000
  return 3.5 * 24 * 3600 * 1000
}
