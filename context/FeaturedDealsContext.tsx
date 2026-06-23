'use client'

import React, { createContext, useContext } from 'react'
import type { Deal } from '@/lib/deals-database'

interface FeaturedDealsContextType {
  featuredDeals: Deal[]
  isPro: boolean
  loading: boolean
}

const FeaturedDealsContext = createContext<FeaturedDealsContextType>({
  featuredDeals: [],
  isPro: false,
  loading: true,
})

export function FeaturedDealsProvider({
  children,
  initialFeaturedDeals,
  initialIsPro,
}: {
  children: React.ReactNode
  initialFeaturedDeals: Deal[]
  initialIsPro: boolean
}) {
  return (
    <FeaturedDealsContext.Provider
      value={{
        featuredDeals: initialFeaturedDeals,
        isPro: initialIsPro,
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
