/**
 * Update the address bar without a Next.js client navigation.
 * Used for filter/query sync so we avoid router.replace() inside useEffect
 * (which React Doctor flags as a flashy client-side redirect).
 */
export function replaceUrlQuiet(url: string): void {
  if (typeof window === 'undefined') return
  const next = url.startsWith('http') ? url : url || window.location.pathname
  const current = `${window.location.pathname}${window.location.search}`
  if (current === next) return
  window.history.replaceState(window.history.state, '', next)
}
