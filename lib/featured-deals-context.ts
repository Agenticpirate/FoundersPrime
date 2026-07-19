'use client'

import { createContext } from 'react'
import type { Deal } from '@/lib/deals-database'

export interface FeaturedDealsContextType {
  featuredDeals: Deal[]
  isPro: boolean
  isNextFounder?: boolean
  loading: boolean
}

export const FeaturedDealsContext = createContext<FeaturedDealsContextType>({
  featuredDeals: [],
  isPro: false,
  isNextFounder: false,
  loading: true,
})
