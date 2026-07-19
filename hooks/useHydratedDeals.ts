'use client'

import { useContext } from 'react'
import { FeaturedDealsContext } from '@/lib/featured-deals-context'

export function useHydratedDeals() {
  return useContext(FeaturedDealsContext)
}
