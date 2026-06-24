'use client'

import { useState, useEffect } from 'react'
import { Deal, dealCategories } from '@/lib/deals-database'
import SmartDealImporter from '@/components/admin/SmartDealImporter'

export default function AdminDealsPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDeals, setSelectedDeals] = useState<Set<string>>(new Set())
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [sortBy, setSortBy] = useState<'title' | 'provider' | 'category' | 'createdAt'>('createdAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [showDuplicatesOnly, setShowDuplicatesOnly] = useState(false)

  const loadDeals = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/deals')
      const data = await res.json()
      if (data.success) setDeals(data.deals || [])
    } catch (e) { console.error('Load error:', e) }
    setLoading(false)
  }

  useEffect(() => { loadDeals() }, [])

  // Detect duplicates based on title similarity and provider
  const detectDuplicates = () => {
    const duplicateGroups: { [key: string]: Deal[] } = {}

    deals.forEach(deal => {
      // Create a normalized key for comparison
      const normalizedTitle = deal.title?.toLowerCase().trim().replace(/[^a-z0-9]/g, '') || ''
      const normalizedProvider = deal.provider?.toLowerCase().trim() || ''
      const key = `${normalizedProvider}-${normalizedTitle}`

      if (!duplicateGroups[key]) {
        duplicateGroups[key] = []
      }
      duplicateGroups[key].push(deal)
    })

    // Return only groups with more than one deal
    return Object.values(duplicateGroups).filter(group => group.length > 1).flat()
  }

  const duplicateDeals = detectDuplicates()
  const duplicateIds = new Set(duplicateDeals.map(d => d.id))

  // Filter and sort deals
  const filtered = deals
    .filter(d => {
      const catMatch = selectedCategory === 'all' || d.category === selectedCategory
      const searchMatch = !searchQuery ||
        d.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.provider?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.description?.toLowerCase().includes(searchQuery.toLowerCase())
      const duplicateMatch = !showDuplicatesOnly || duplicateIds.has(d.id)
      return catMatch && searchMatch && duplicateMatch
    })
    .sort((a, b) => {
      const aVal = a[sortBy] || ''
      const bVal = b[sortBy] || ''
      const cmp = String(aVal).localeCompare(String(bVal))
      return sortOrder === 'asc' ? cmp : -cmp
    })

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedDeals)
    if (newSet.has(id)) newSet.delete(id)
    else newSet.add(id)
    setSelectedDeals(newSet)
  }

  const toggleSelectAll = () => {
    if (selectedDeals.size === filtered.length) setSelectedDeals(new Set())
    else setSelectedDeals(new Set(filtered.map(d => d.id)))
  }

  const deleteDeal = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return
    const res = await fetch(`/api/deals?id=${id}`, { method: 'DELETE' })
    if (res.ok) { loadDeals() }
    else alert('Delete failed')
  }

  const bulkDelete = async () => {
    if (selectedDeals.size === 0) return
    if (!confirm(`Delete ${selectedDeals.size} deals?`)) return
    const ids = Array.from(selectedDeals).join(',')
    const res = await fetch(`/api/deals?ids=${ids}`, { method: 'DELETE' })
    if (res.ok) { setSelectedDeals(new Set()); loadDeals() }
  }

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/deals', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) })
    loadDeals()
  }

  const exportDeals = () => {
    const data = JSON.stringify(filtered, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `deals-export-${new Date().toISOString().split('T')[0]}.json`
    a.click()
  }

  const exportAsPdf = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    let html = `
      <html>
      <head>
        <title>FoundersPrime Database Export - PDF</title>
        <style>
          body { font-family: monospace; padding: 25px; color: #000; background-color: #fff; line-height: 1.4; }
          h1 { text-transform: uppercase; border-bottom: 3px solid #000; padding-bottom: 12px; margin-bottom: 8px; font-size: 20px; }
          .summary { font-size: 11px; margin-bottom: 25px; font-weight: bold; text-transform: uppercase; }
          .record { border-bottom: 1px dashed #000; padding: 15px 0; page-break-inside: avoid; }
          .title { font-weight: bold; font-size: 14px; text-transform: uppercase; }
          .meta { font-size: 10px; color: #444; margin: 6px 0; font-weight: bold; }
          .desc { font-size: 11px; margin-top: 8px; color: #222; }
        </style>
      </head>
      <body>
        <h1>FoundersPrime Database Catalog</h1>
        <div class="summary">Total Records: ${filtered.length} | Export Date: ${new Date().toLocaleString()}</div>
    `

    filtered.forEach((r, idx) => {
      html += `
        <div class="record">
          <div class="title">[#${idx + 1}] ${r.title}</div>
          <div class="meta">Provider: ${r.provider || 'N/A'} | Category: ${r.category || 'N/A'} | Value: ${r.value || 'N/A'}</div>
          <div class="desc">${r.description || 'No description available.'}</div>
        </div>
      `
    })

    html += `
        <script>
          window.onload = function() {
            window.print();
            setTimeout(function() { window.close(); }, 500);
          }
        </script>
      </body>
      </html>
    `

    printWindow.document.write(html)
    printWindow.document.close()
  }

  // Stats
  const stats = {
    total: deals.length,
    active: deals.filter(d => d.status === 'active').length,
    expired: deals.filter(d => d.status === 'expired').length,
    categories: new Set(deals.map(d => d.category)).size
  }

  return (
    <div className="p-3 md:p-6 space-y-4 bg-gray-50 min-h-full">
      {/* Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg md:text-xl font-black text-black font-mono uppercase">Deals</h1>
          <p className="text-gray-500 font-mono text-[10px]">{stats.total} deals in database</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowAddModal(true)} className="bg-cyan-500 text-white px-3 py-1.5 border-2 border-black font-bold hover:bg-cyan-600 shadow-[2px_2px_0_0_#000] transition-all font-mono uppercase text-[10px]">+ Add</button>
          <button onClick={() => setShowImportModal(true)} className="bg-purple-500 text-white px-3 py-1.5 border-2 border-black font-bold hover:bg-purple-600 shadow-[2px_2px_0_0_#000] transition-all font-mono uppercase text-[10px]">Import</button>
          <div className="inline-flex gap-1">
            <a href="/api/admin/export?format=txt" download className="bg-green-500 text-white px-2.5 py-1.5 border-2 border-black font-bold hover:bg-green-600 shadow-[2px_2px_0_0_#000] transition-all font-mono uppercase text-[10px] flex items-center gap-1">
              Notepad
            </a>
            <a href="/api/admin/export?format=csv" download className="bg-emerald-600 text-white px-2.5 py-1.5 border-2 border-black font-bold hover:bg-emerald-700 shadow-[2px_2px_0_0_#000] transition-all font-mono uppercase text-[10px] flex items-center gap-1">
              Excel
            </a>
            <button onClick={exportAsPdf} className="bg-red-500 text-white px-2.5 py-1.5 border-2 border-black font-bold hover:bg-red-600 shadow-[2px_2px_0_0_#000] transition-all font-mono uppercase text-[10px] flex items-center gap-1">
              PDF
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-2">
        {[
          { label: 'Total', value: stats.total, color: 'text-cyan-500' },
          { label: 'Active', value: stats.active, color: 'text-green-500' },
          { label: 'Expired', value: stats.expired, color: 'text-red-500' },
          { label: 'Categories', value: stats.categories, color: 'text-purple-500' },
          { label: 'Duplicates', value: duplicateDeals.length, color: 'text-orange-500', clickable: true },
        ].map(s => (
          <div key={s.label} className={`bg-white border-2 border-black p-2 shadow-[2px_2px_0_0_#000] ${s.clickable ? 'cursor-pointer hover:bg-yellow-50' : ''}`} onClick={s.clickable ? () => setShowDuplicatesOnly(!showDuplicatesOnly) : undefined}>
            <div className={`text-xl md:text-2xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-gray-500 font-bold text-[9px] uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white border-2 border-black p-2 shadow-[2px_2px_0_0_#000]">
        <div className="flex flex-wrap gap-2 items-center">
          <input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="px-3 py-1.5 border-2 border-black w-48 font-mono text-xs" />
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="px-2 py-1.5 border-2 border-black bg-white font-mono text-xs">
            <option value="all">All ({deals.length})</option>
            {dealCategories.map(c => <option key={c.id} value={c.id}>{c.name} ({deals.filter(d => d.category === c.id).length})</option>)}
          </select>
          <select value={`${sortBy}-${sortOrder}`} onChange={e => { const [f, o] = e.target.value.split('-'); setSortBy(f as any); setSortOrder(o as any) }} className="px-2 py-1.5 border-2 border-black bg-white font-mono text-xs">
            <option value="createdAt-desc">Newest</option>
            <option value="createdAt-asc">Oldest</option>
            <option value="title-asc">A-Z</option>
            <option value="provider-asc">Provider</option>
          </select>
          <button onClick={() => setShowDuplicatesOnly(!showDuplicatesOnly)} className={`px-2 py-1.5 border-2 border-black font-bold text-[10px] font-mono ${showDuplicatesOnly ? 'bg-orange-500 text-white' : 'bg-white'}`}>
            {showDuplicatesOnly ? 'Dupes ✓' : 'Dupes'}
          </button>
          <div className="ml-auto flex gap-1">
            <button onClick={() => setViewMode('table')} className={`p-1.5 border-2 border-black text-xs ${viewMode === 'table' ? 'bg-cyan-500 text-white' : 'bg-white'}`}>☰</button>
            <button onClick={() => setViewMode('grid')} className={`p-1.5 border-2 border-black text-xs ${viewMode === 'grid' ? 'bg-cyan-500 text-white' : 'bg-white'}`}>⊞</button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedDeals.size > 0 && (
        <div className="bg-yellow-100 border-2 border-black p-2 shadow-[2px_2px_0_0_#000]">
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="font-bold">{selectedDeals.size} selected</span>
            <button onClick={bulkDelete} className="bg-red-500 text-white px-3 py-1 border border-black font-bold hover:bg-red-600 text-[10px]">Delete</button>
            <button onClick={() => setSelectedDeals(new Set())} className="bg-gray-300 px-3 py-1 border border-black font-bold text-[10px]">Clear</button>
          </div>
        </div>
      )}

      {/* Deals Display */}
      <div className="bg-white border-2 border-black shadow-[2px_2px_0_0_#000] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="text-4xl animate-spin inline-block">⚡</div>
            <p className="mt-4 font-bold">Loading deals...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl font-bold mb-2">No deals found</p>
            <p className="text-gray-500 mb-4">Try adjusting your filters or import some deals</p>
            <button
              onClick={() => setShowImportModal(true)}
              className="bg-purple-500 text-white px-6 py-3 border-2 border-black font-bold hover:bg-purple-600"
            >
              📥 Import Deals
            </button>
          </div>
        ) : viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-[11px] md:text-xs">
              <thead className="bg-gray-100 border-b-2 border-black">
                <tr>
                  <th className="p-2 text-left w-8">
                    <input type="checkbox" checked={selectedDeals.size === filtered.length && filtered.length > 0} onChange={toggleSelectAll} className="w-4 h-4 cursor-pointer accent-cyan-500" />
                  </th>
                  <th className="p-2 text-left font-bold uppercase">Deal</th>
                  <th className="p-2 text-left font-bold uppercase hidden sm:table-cell">Category</th>
                  <th className="p-2 text-left font-bold uppercase">Value</th>
                  <th className="p-2 text-left font-bold uppercase hidden md:table-cell">Status</th>
                  <th className="p-2 text-left font-bold uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 100).map(deal => {
                  const isDuplicate = duplicateIds.has(deal.id)
                  return (
                    <tr key={deal.id} className={`border-b border-gray-100 hover:bg-gray-50 ${isDuplicate ? 'bg-orange-50' : ''}`}>
                      <td className="p-2">
                        <input type="checkbox" checked={selectedDeals.has(deal.id)} onChange={() => toggleSelect(deal.id)} className="w-4 h-4 cursor-pointer accent-cyan-500" />
                      </td>
                      <td className="p-2">
                        <div className="font-bold truncate max-w-[200px]">{deal.title}</div>
                        <div className="text-[10px] text-gray-400">{deal.provider}</div>
                      </td>
                      <td className="p-2 hidden sm:table-cell">
                        <span className="bg-gray-100 px-1.5 py-0.5 text-[9px] font-bold border border-black">
                          {dealCategories.find(c => c.id === deal.category)?.name || deal.category}
                        </span>
                      </td>
                      <td className="p-2 font-bold text-green-600">{deal.value}</td>
                      <td className="p-2 hidden md:table-cell">
                        <select value={deal.status || 'active'} onChange={e => updateStatus(deal.id, e.target.value)} className={`px-1.5 py-0.5 border border-black text-[9px] font-bold cursor-pointer ${deal.status === 'active' ? 'bg-green-200' : deal.status === 'expired' ? 'bg-red-200' : 'bg-yellow-200'}`}>
                          <option value="active">Active</option>
                          <option value="expired">Expired</option>
                          <option value="coming-soon">Soon</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <div className="flex gap-1">
                          <button onClick={() => setEditingDeal(deal)} className="bg-blue-500 text-white px-2 py-0.5 text-[10px] font-bold border border-black">Edit</button>
                          <a href={`/deals/${deal.slug}`} target="_blank" className="bg-green-500 text-white px-2 py-0.5 text-[10px] font-bold border border-black">View</a>
                          <button onClick={() => deleteDeal(deal.id, deal.title)} className="bg-red-500 text-white px-2 py-0.5 text-[10px] font-bold border border-black">Del</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {filtered.length > 100 && (
              <div className="p-4 text-center bg-gray-100 border-t-2 border-black">
                <p className="text-gray-600">Showing 100 of {filtered.length} deals</p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.slice(0, 50).map(deal => (
              <div key={deal.id} className="border-2 border-black p-4 hover:shadow-[4px_4px_0_0_#000] transition-all">
                <div className="flex items-start justify-between mb-2">
                  <input
                    type="checkbox"
                    checked={selectedDeals.has(deal.id)}
                    onChange={() => toggleSelect(deal.id)}
                    className="w-5 h-5 cursor-pointer accent-cyan-500"
                  />
                  <span className={`px-2 py-1 text-xs font-bold ${deal.status === 'active' ? 'bg-green-200' :
                    deal.status === 'expired' ? 'bg-red-200' : 'bg-yellow-200'
                    }`}>
                    {deal.status}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-1">{deal.title}</h3>
                <p className="text-gray-500 text-sm mb-2">{deal.provider}</p>
                <p className="text-green-600 font-bold mb-3">{deal.value}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingDeal(deal)}
                    className="flex-1 bg-blue-500 text-white py-1 text-sm font-bold border-2 border-black"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteDeal(deal.id, deal.title)}
                    className="bg-red-500 text-white px-3 py-1 text-sm font-bold border-2 border-black"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}


      </div>
      {/* Modals */}
      {
        (showAddModal || editingDeal) && (
          <DealModal
            deal={editingDeal}
            onClose={() => { setShowAddModal(false); setEditingDeal(null) }}
            onSave={() => { setShowAddModal(false); setEditingDeal(null); loadDeals() }}
          />
        )
      }
      {
        showImportModal && (
          <SmartDealImporter
            onClose={() => setShowImportModal(false)}
            onImport={() => { setShowImportModal(false); loadDeals() }}
          />
        )
      }
    </div>
  )
}

function DealModal({ deal, onClose, onSave }: { deal: Deal | null; onClose: () => void; onSave: () => void }) {
  const [form, setForm] = useState({
    title: deal?.title || '',
    provider: deal?.provider || '',
    category: deal?.category || 'saas-discounts',
    value: deal?.value || '',
    description: deal?.description || '',
    applicationUrl: deal?.applicationUrl || '',
    status: (deal?.status || 'active') as 'active' | 'expired' | 'coming-soon' | 'limited',
    eligibility: deal?.eligibility?.join('\n') || '',
    tags: deal?.tags?.join(', ') || ''
  })
  const [saving, setSaving] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const payload = {
      ...form,
      eligibility: form.eligibility.split('\n').filter(Boolean),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
    }

    const res = await fetch('/api/deals', {
      method: deal ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deal ? { ...payload, id: deal.id } : payload)
    })
    const data = await res.json()
    if (data.success) { onSave() }
    else alert(data.error || 'Failed')
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0_0_#000] w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="bg-cyan-500 p-4 border-b-4 border-black">
          <h2 className="text-xl font-black text-white">{deal ? '✏️ Edit Deal' : '➕ Add New Deal'}</h2>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <div>
            <label className="font-bold block mb-1">Title *</label>
            <input
              required
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full p-3 border-2 border-black"
              placeholder="e.g., AWS Activate Credits"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold block mb-1">Provider *</label>
              <input
                required
                value={form.provider}
                onChange={e => setForm({ ...form, provider: e.target.value })}
                className="w-full p-3 border-2 border-black"
                placeholder="e.g., Amazon Web Services"
              />
            </div>
            <div>
              <label className="font-bold block mb-1">Value *</label>
              <input
                required
                value={form.value}
                onChange={e => setForm({ ...form, value: e.target.value })}
                className="w-full p-3 border-2 border-black"
                placeholder="e.g., $100,000 or 50% off"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold block mb-1">Category</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full p-3 border-2 border-black bg-white"
              >
                {dealCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="font-bold block mb-1">Status</label>
              <select
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value as any })}
                className="w-full p-3 border-2 border-black bg-white"
              >
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="coming-soon">Coming Soon</option>
              </select>
            </div>
          </div>
          <div>
            <label className="font-bold block mb-1">Description *</label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full p-3 border-2 border-black"
              placeholder="Describe the deal, what's included, and any important details..."
            />
          </div>
          <div>
            <label className="font-bold block mb-1">Application URL *</label>
            <input
              required
              type="url"
              value={form.applicationUrl}
              onChange={e => setForm({ ...form, applicationUrl: e.target.value })}
              className="w-full p-3 border-2 border-black"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="font-bold block mb-1">Eligibility (one per line)</label>
            <textarea
              rows={3}
              value={form.eligibility}
              onChange={e => setForm({ ...form, eligibility: e.target.value })}
              className="w-full p-3 border-2 border-black"
              placeholder="Early-stage startups&#10;Less than 2 years old&#10;Under $10M funding"
            />
          </div>
          <div>
            <label className="font-bold block mb-1">Tags (comma separated)</label>
            <input
              value={form.tags}
              onChange={e => setForm({ ...form, tags: e.target.value })}
              className="w-full p-3 border-2 border-black"
              placeholder="cloud, aws, credits, startup"
            />
          </div>
          <div className="flex gap-4 pt-4 border-t-2 border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 p-3 border-2 border-black font-bold hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 p-3 bg-cyan-500 text-white border-2 border-black font-bold hover:bg-cyan-600 disabled:opacity-50"
            >
              {saving ? 'Saving...' : deal ? 'Update Deal' : 'Create Deal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
