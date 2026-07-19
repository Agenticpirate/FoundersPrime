'use client'

import { m, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import { type CSSProperties, type ReactNode } from 'react'
import { premiumEase, staggerContainer, staggerItem } from '@/lib/premium-motion-variants'

type FadeProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
} & Omit<HTMLMotionProps<'div'>, 'children'>

/** Entrance fade-up; respects prefers-reduced-motion */
export function FadeUp({ children, className, delay = 0, y = 14, ...rest }: FadeProps) {
  const reduce = useReducedMotion()
  if (reduce) {
    return <div className={className}>{children}</div>
  }
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: premiumEase }}
      {...rest}
    >
      {children}
    </m.div>
  )
}

/** Scroll-triggered reveal (once) */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  if (reduce) {
    return <div className={className}>{children}</div>
  }
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px 0px' }}
      transition={{ duration: 0.5, delay, ease: premiumEase }}
    >
      {children}
    </m.div>
  )
}



/** Scroll-triggered stagger (homepage sections) */
export function RevealStagger({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  if (reduce) {
    return <div className={className}>{children}</div>
  }
  return (
    <m.div
      className={className}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.06,
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px 0px' }}
    >
      {children}
    </m.div>
  )
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  if (reduce) {
    return <div className={className}>{children}</div>
  }
  return (
    <m.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 18, scale: 0.985 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.45, ease: premiumEase },
        },
      }}
    >
      {children}
    </m.div>
  )
}

/** Subtle continuous float for ambient accents (hero glows, etc.) */
export function SoftFloat({
  children,
  className,
  duration = 8,
}: {
  children: ReactNode
  className?: string
  duration?: number
}) {
  const reduce = useReducedMotion()
  if (reduce) {
    return <div className={className}>{children}</div>
  }
  return (
    <m.div
      className={className}
      animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </m.div>
  )
}



/**
 * Animated card grid for category listings.
 * Re-animates when `animKey` changes (page, filters, tab).
 */
export function StaggerGrid({
  children,
  className,
  animKey,
  style,
  ...rest
}: {
  children: ReactNode
  className?: string
  /** Change this to re-run stagger (e.g. page number or filter key) */
  animKey?: string | number
  style?: CSSProperties
} & Omit<HTMLMotionProps<'div'>, 'children' | 'variants' | 'initial' | 'animate'>) {
  const reduce = useReducedMotion()
  if (reduce) {
    return (
      <div key={animKey} className={className} style={style} {...(rest as any)}>
        {children}
      </div>
    )
  }
  return (
    <m.div
      key={animKey}
      className={className}
      style={style}
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      {...rest}
    >
      {children}
    </m.div>
  )
}

/** Wrap each card inside StaggerGrid */
export function StaggerGridItem({
  children,
  className = 'h-full',
  /** When false, skip layout animations (avoids grid shuffle on data refresh) */
  layout = false,
}: {
  children: ReactNode
  className?: string
  layout?: boolean
}) {
  const reduce = useReducedMotion()
  if (reduce) {
    return <div className={className}>{children}</div>
  }
  return (
    <m.div className={className} variants={staggerItem} layout={layout || undefined}>
      {children}
    </m.div>
  )
}
