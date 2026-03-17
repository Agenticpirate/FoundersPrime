'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import DealCard from './DealCard'
import { incubators2026, Incubator } from '@/data/incubators-2026'
import { useAuth } from '@/lib/auth/hooks'
import { checkProStatus } from '@/lib/auth/user-context'
import ProGateOverlay from '@/components/ProGateOverlay'

export default function IncubatorsGrid() {
  const { user } = useAuth()
  const [isPro, setIsPro] = useState(false)

  useEffect(() => {
    const checkAccess = async () => {
      if (user) {
        const { isPro: hasProAccess } = await checkProStatus()
        setIsPro(hasProAccess)
      } else {
        setIsPro(false)
      }
    }
    checkAccess()
  }, [user])

  const [filterRegion, setFilterRegion] = useState('All')

  const regions = ['All', 'Global', 'North America', 'India', 'Europe', 'Southeast Asia', 'MENA', 'Africa', 'LatAm', 'Oceania']

  const filteredDeals = filterRegion === 'All'
    ? incubators2026
    : incubators2026.filter(inc => inc.region === filterRegion || inc.region === 'Global')

  // Helper to convert Incubator to DealCard format
  const convertToCard = (inc: Incubator) => {
    return {
      id: inc.slug,
      logo: inc.logo || '',
      category: 'Incubator',
      badge: inc.applicationStatus === 'Active' ? 'Applications Open' : inc.applicationStatus,
      badgeColor: inc.applicationStatus === 'Active' ? 'bg-green-600' : 'bg-gray-500',
      title: inc.name,
      provider: inc.location,
      value: inc.support,
      valueSubtext: inc.equity === '0% (Equity-free)' ? 'Equity Free' : inc.equity,
      valueStyle: 'bg-white text-ink border-2 border-ink',
      description: inc.description,
      eligibility: inc.founderStage,
      validFor: inc.applicationDeadline ? `Deadline: ${inc.applicationDeadline}` : inc.applicationStatus,
      applicationUrl: inc.website,
      verified: true
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 md:mb-5 border-b-3 border-black pb-2">
        <div>
          <h2 className="font-mono text-3xl font-bold text-black">Top Programs 2026</h2>
          <span className="font-mono text-sm text-gray-500 mt-1 block">
            Verified incubators and venture studios for Q1 2026
          </span>
        </div>

        <div className="ml-auto flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {regions.map(region => (
            <button
              key={region}
              onClick={() => setFilterRegion(region)}
              className={`px-3 py-1 font-mono text-xs border-2 border-black rounded-sm whitespace-nowrap transition-all ${filterRegion === region
                ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]'
                : 'bg-white text-black hover:bg-gray-100'
                }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(isPro ? filteredDeals : filteredDeals.slice(0, 3)).map((inc) => (
          <DealCard
            key={inc.id}
            deal={convertToCard(inc)}
            overrideHref={isPro ? undefined : '/pricing'}
          />
        ))}
      </div>

      {!isPro && filteredDeals.length > 3 && (
        <ProGateOverlay
          totalCount={filteredDeals.length}
          visibleCount={3}
          label="Incubators"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDeals.slice(3, 9).map((inc) => (
              <DealCard key={inc.id} deal={convertToCard(inc)} />
            ))}
          </div>
        </ProGateOverlay>
      )}

      {filteredDeals.length === 0 && (
        <div className="text-center py-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="font-mono text-gray-500">No programs found for this region.</p>
        </div>
      )}
    </div>
  )
}