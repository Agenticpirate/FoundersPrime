'use client'

import React, { createContext, useContext } from 'react'
import type { Deal } from '@/lib/deals-database'

interface FeaturedDealsContextType {
  featuredDeals: Deal[]
  isPro: boolean
  isNextFounder?: boolean
  loading: boolean
}

const FeaturedDealsContext = createContext<FeaturedDealsContextType>({
  featuredDeals: [],
  isPro: false,
  isNextFounder: false,
  loading: true,
})

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
  return (
    <FeaturedDealsContext.Provider
      value={{
        featuredDeals: initialFeaturedDeals,
        isPro: initialIsPro,
        isNextFounder: initialIsNextFounder,
        loading: false,
      }}
    >
      {children}
    </FeaturedDealsContext.Provider>
  )
}

export function useHydratedDeals() {
  return useContext(FeaturedDealsContext)
}
