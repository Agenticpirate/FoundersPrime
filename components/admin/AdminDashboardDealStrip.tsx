'use client'

type DealsSummary = {
  total: number
  active: number
  featured: number
  expired: number
}

/** Identical markup — secondary deal counts strip */
export default function AdminDashboardDealStrip({
  loading,
  deals,
}: {
  loading: boolean
  deals: DealsSummary
}) {
  const items = [
    { label: 'Catalog deals', value: deals.total },
    { label: 'Active deals', value: deals.active },
    { label: 'Featured', value: deals.featured },
    { label: 'Expired', value: deals.expired },
  ]
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
      {items.map((x) => (
        <div
          key={x.label}
          className="rounded-lg border border-white/10 bg-[#0d0e12] px-3 py-2.5"
        >
          <p className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">{x.label}</p>
          <p className="font-mono text-lg font-black text-white tabular-nums mt-0.5">
            {loading ? '—' : x.value}
          </p>
        </div>
      ))}
    </div>
  )
}
