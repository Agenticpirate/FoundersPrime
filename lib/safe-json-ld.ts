/**
 * Serialize structured data for <script type="application/ld+json">.
 * Escapes characters that can break out of a script context when embedded
 * via dangerouslySetInnerHTML (</script, U+2028/2029, etc.).
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}
