'use client'

import React, { useMemo } from 'react'
import type { Deal } from '@/lib/deals-database'
import { FeaturedDealsContext } from '@/lib/featured-deals-context'

export function FeaturedDealsProvider({
  children,
  initialFeaturedDeals,
  initialIsPro,
  initialIsNextFounder,
}: {
  children: React.ReactNode
  initialFeaturedDeals: Deal[]
  initialIsPro: boolean
  initialIsNextFounder?: boolean
}) {
  const value = useMemo(
    () => ({
      featuredDeals: initialFeaturedDeals,
      isPro: initialIsPro,
      isNextFounder: initialIsNextFounder,
      loading: false,
    }),
    [initialFeaturedDeals, initialIsPro, initialIsNextFounder]
  )

  return (
    <FeaturedDealsContext.Provider value={value}>
      {children}
    </FeaturedDealsContext.Provider>
  )
}
