'use client'

import { LazyMotion, domAnimation } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Loads Framer Motion's animation features once for the whole app so
 * components can import the lightweight `m` component instead of `motion`.
 * (~30kb savings per the React Doctor lazy-motion rule)
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
