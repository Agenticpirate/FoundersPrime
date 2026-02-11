'use client'

import { useEffect, useState } from 'react'

export default function DebugLogos() {
  const [deals, setDeals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/deals?limit=20')
      .then(res => res.json())
      .then(data => {
        console.log('DEBUG: API Response received', data.deals?.length, 'deals')
        if (data.deals) {
          data.deals.forEach((d: any) => {
            console.log(`Deal: ${d.slug} | Logo: ${d.logoUrl}`)
          })
        }
        setDeals(data.deals || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('DEBUG: API Error', err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Logo Debug Page</h1>
      <p className="mb-4 text-gray-600">
        This page shows the actual logo URLs being loaded from the API.
        Timestamp: {new Date().toISOString()}
      </p>
      
      <div className="space-y-4">
        {deals.map(deal => (
          <div key={deal.id} className="border-2 border-black p-4 rounded">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 border-2 border-gray-300 rounded flex items-center justify-center p-2 flex-shrink-0">
                <img 
                  src={deal.logoUrl} 
                  alt={deal.provider}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.border = '2px solid red'
                  }}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{deal.title}</h3>
                <p className="text-sm text-gray-600 mb-2">Provider: {deal.provider}</p>
                <p className="text-xs font-mono bg-gray-100 p-2 rounded break-all">
                  Logo URL: {deal.logoUrl || 'NOT SET'}
                </p>
                <p className="text-xs text-gray-500 mt-1">Slug: {deal.slug}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
