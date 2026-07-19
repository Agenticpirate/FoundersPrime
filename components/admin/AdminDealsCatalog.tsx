'use client'

import { Deal, dealCategories } from '@/lib/deals-database'

type Props = {
  loading: boolean
  filtered: Deal[]
  viewMode: 'table' | 'grid'
  selectedDeals: Set<string>
  duplicateIds: Set<string>
  onToggleSelect: (id: string) => void
  onToggleSelectAll: () => void
  onEdit: (deal: Deal) => void
  onDelete: (id: string, title: string) => void
  onUpdateStatus: (id: string, status: string) => void
  onOpenImport: () => void
}

export default function AdminDealsCatalog({
  loading,
  filtered,
  viewMode,
  selectedDeals,
  duplicateIds,
  onToggleSelect,
  onToggleSelectAll,
  onEdit,
  onDelete,
  onUpdateStatus,
  onOpenImport,
}: Props) {
  if (loading) {
    return (
      <div className="bg-[#0d0e12] border border-white/10 overflow-hidden">
        <div className="p-12 text-center">
          <div className="text-4xl animate-spin inline-block">⚡</div>
          <p className="mt-4 font-bold">Loading deals...</p>
        </div>
      </div>
    )
  }

  if (filtered.length === 0) {
    return (
      <div className="bg-[#0d0e12] border border-white/10 overflow-hidden">
        <div className="p-12 text-center">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-xl font-bold mb-2">No deals found</p>
          <p className="text-zinc-500 mb-4">Try adjusting your filters or import some deals</p>
          <button
            type="button"
            onClick={onOpenImport}
            className="bg-purple-500 text-white px-6 py-3 border border-white/15 font-bold hover:bg-purple-600"
          >
            📥 Import Deals
          </button>
        </div>
      </div>
    )
  }

  if (viewMode === 'table') {
    return (
      <div className="bg-[#0d0e12] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full font-mono text-[11px] md:text-xs">
            <thead className="bg-[#121318] border-b border-white/10">
              <tr>
                <th className="p-2 text-left w-8">
                  <input
                    type="checkbox"
                    aria-label="Select all deals"
                    checked={selectedDeals.size === filtered.length && filtered.length > 0}
                    onChange={onToggleSelectAll}
                    className="w-4 h-4 cursor-pointer accent-cyan-500"
                  />
                </th>
                <th className="p-2 text-left font-bold uppercase">Deal</th>
                <th className="p-2 text-left font-bold uppercase hidden sm:table-cell">Category</th>
                <th className="p-2 text-left font-bold uppercase">Value</th>
                <th className="p-2 text-left font-bold uppercase hidden md:table-cell">Status</th>
                <th className="p-2 text-left font-bold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 100).map((deal) => {
                const isDuplicate = duplicateIds.has(deal.id)
                return (
                  <tr
                    key={deal.id}
                    className={`border-b border-white/5 hover:bg-white/[0.03] ${isDuplicate ? 'bg-orange-500/10' : ''}`}
                  >
                    <td className="p-2">
                      <input
                        type="checkbox"
                        aria-label={`Select ${deal.title}`}
                        checked={selectedDeals.has(deal.id)}
                        onChange={() => onToggleSelect(deal.id)}
                        className="w-4 h-4 cursor-pointer accent-cyan-500"
                      />
                    </td>
                    <td className="p-2">
                      <div className="font-bold truncate max-w-[200px]">{deal.title}</div>
                      <div className="text-[10px] text-zinc-500">{deal.provider}</div>
                    </td>
                    <td className="p-2 hidden sm:table-cell">
                      <span className="bg-gray-100 px-1.5 py-0.5 text-[9px] font-bold border border-white/15">
                        {dealCategories.find((c) => c.id === deal.category)?.name || deal.category}
                      </span>
                    </td>
                    <td className="p-2 font-bold text-green-600">{deal.value}</td>
                    <td className="p-2 hidden md:table-cell">
                      <select
                        aria-label={`Status for ${deal.title}`}
                        value={deal.status || 'active'}
                        onChange={(e) => onUpdateStatus(deal.id, e.target.value)}
                        className={`px-1.5 py-0.5 border border-white/15 text-[9px] font-bold cursor-pointer ${
                          deal.status === 'active'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : deal.status === 'expired'
                              ? 'bg-red-500/20 text-red-300'
                              : 'bg-amber-500/20 text-amber-200'
                        }`}
                      >
                        <option value="active">Active</option>
                        <option value="expired">Expired</option>
                        <option value="coming-soon">Soon</option>
                      </select>
                    </td>
                    <td className="p-2">
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => onEdit(deal)}
                          className="bg-blue-500 text-white px-2 py-0.5 text-[10px] font-bold border border-white/15"
                        >
                          Edit
                        </button>
                        <a
                          href={`/deals/${deal.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-green-500 text-white px-2 py-0.5 text-[10px] font-bold border border-white/15"
                        >
                          View
                        </a>
                        <button
                          type="button"
                          onClick={() => onDelete(deal.id, deal.title)}
                          className="bg-red-500 text-white px-2 py-0.5 text-[10px] font-bold border border-white/15"
                        >
                          Del
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length > 100 && (
            <div className="p-4 text-center bg-[#121318] border-t border-white/10">
              <p className="text-gray-600">Showing 100 of {filtered.length} deals</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#0d0e12] border border-white/10 overflow-hidden">
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.slice(0, 50).map((deal) => (
          <div key={deal.id} className="border border-white/15 p-4 hover:border-accent-yellow/30 transition-all">
            <div className="flex items-start justify-between mb-2">
              <input
                type="checkbox"
                aria-label={`Select ${deal.title}`}
                checked={selectedDeals.has(deal.id)}
                onChange={() => onToggleSelect(deal.id)}
                className="w-5 h-5 cursor-pointer accent-cyan-500"
              />
              <span
                className={`px-2 py-1 text-xs font-bold ${
                  deal.status === 'active'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : deal.status === 'expired'
                      ? 'bg-red-500/20 text-red-300'
                      : 'bg-amber-500/20 text-amber-200'
                }`}
              >
                {deal.status}
              </span>
            </div>
            <h3 className="font-bold text-lg mb-1">{deal.title}</h3>
            <p className="text-zinc-500 text-sm mb-2">{deal.provider}</p>
            <p className="text-green-600 font-bold mb-3">{deal.value}</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onEdit(deal)}
                className="flex-1 bg-blue-500 text-white py-1 text-sm font-bold border border-white/15"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(deal.id, deal.title)}
                className="bg-red-500 text-white px-3 py-1 text-sm font-bold border border-white/15"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
