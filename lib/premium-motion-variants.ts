/** Shared motion tokens — kept out of component files for Fast Refresh. */

/** Shared premium easing — soft, not bouncy */
export const premiumEase = [0.22, 1, 0.36, 1] as const

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.04,
    },
  },
}

/** Soft opacity-only stagger — no scale/y so grids don't look like they shuffle */
export const staggerItem = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.28, ease: premiumEase },
  },
}
