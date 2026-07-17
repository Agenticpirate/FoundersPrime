/**
 * Shared premium card hover — same lift + soft yellow shade as Programs cards.
 * Use `cardHoverClass` on the interactive card root (must include `group` + `relative` + `overflow-hidden`).
 * Place `<CardHoverGlow />` as the first child inside that root.
 */

/** Classes to merge onto card root elements.
 *  Lift only from md+ so mobile 2-col grids don’t crop neighbors. */
export const cardHoverClass =
  'relative overflow-hidden group transition-all duration-300 ' +
  'md:hover:-translate-y-1.5 ' +
  'hover:border-accent-yellow/40 dark:hover:border-accent-yellow/40 ' +
  'md:hover:shadow-[0_16px_48px_rgba(0,0,0,0.18),0_0_0_1px_rgba(245,158,11,0.10)] ' +
  'dark:md:hover:shadow-[0_16px_48px_rgba(0,0,0,0.45),0_0_0_1px_rgba(245,158,11,0.12)]'

/** Soft yellow orb that appears on hover (parent needs `group`) */
export function CardHoverGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-accent-yellow/0 group-hover:bg-accent-yellow/[0.08] blur-2xl transition-colors duration-500"
    />
  )
}

/** Logo plate ring on hover */
export const cardLogoHoverClass =
  'ring-0 group-hover:ring-2 group-hover:ring-accent-yellow/25 transition-all duration-300'

/** Title turns yellow on hover */
export const cardTitleHoverClass = 'group-hover:text-accent-yellow transition-colors duration-300'
