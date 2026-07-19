/**
 * Minimal HTML sanitizer for trusted static legal/copy blocks.
 * Strips scripts, event handlers, and javascript: URLs while preserving
 * the same tags/structure used in privacy/terms sections (h3, p, ul, li, strong, etc.).
 * Does not change visible text when content is already clean static HTML.
 */
export function sanitizeStaticHtml(html: string): string {
  if (!html) return ''

  let out = html
    // Remove dangerous tags and their contents
    .replace(/<\s*(script|style|iframe|object|embed|link|meta|base)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '')
    .replace(/<\s*(script|style|iframe|object|embed|link|meta|base)[^>]*\/?\s*>/gi, '')
    // Remove inline event handlers (onclick=, onerror=, …)
    .replace(/\s+on[a-z]+\s*=\s*(['"])[\s\S]*?\1/gi, '')
    .replace(/\s+on[a-z]+\s*=\s*[^\s>]+/gi, '')
    // Neutralize javascript: / data:text/html URLs in href/src
    .replace(
      /\s(href|src|xlink:href)\s*=\s*(['"])\s*javascript:[\s\S]*?\2/gi,
      ' $1="#"'
    )
    .replace(
      /\s(href|src)\s*=\s*(['"])\s*data\s*:\s*text\/html[\s\S]*?\2/gi,
      ' $1="#"'
    )

  return out
}
