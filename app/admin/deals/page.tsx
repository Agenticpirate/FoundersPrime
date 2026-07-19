'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Deal, dealCategories } from '@/lib/deals-database'
import SmartDealImporter from '@/components/admin/SmartDealImporter'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminDealModal from '@/components/admin/AdminDealModal'
import AdminDealsCatalog from '@/components/admin/AdminDealsCatalog'

export default function AdminDealsPage() {
  const searchParams = useSearchParams()
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
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
    <>
    <AdminHeader title="Deals" subtitle="Catalog CRUD · import · export" />
    <div className="p-3 md:p-6 space-y-4 bg-[#090a0f] min-h-full text-white">
      {/* Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg md:text-xl font-black text-white font-mono uppercase">Deals</h1>
          <p className="text-zinc-500 font-mono text-[10px]">{stats.total} deals in database</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => setShowAddModal(true)} className="bg-cyan-600 text-white px-3 py-1.5 border border-white/15 font-bold hover:bg-cyan-600  transition-all font-mono uppercase text-[10px]">+ Add</button>
          <button type="button" onClick={() => setShowImportModal(true)} className="bg-purple-500 text-white px-3 py-1.5 border border-white/15 font-bold hover:bg-purple-600  transition-all font-mono uppercase text-[10px]">Import</button>
          <div className="inline-flex gap-1">
            <a href="/api/admin/export?format=txt" download className="bg-green-500 text-white px-2.5 py-1.5 border border-white/15 font-bold hover:bg-green-600  transition-all font-mono uppercase text-[10px] flex items-center gap-1">
              Notepad
            </a>
            <a href="/api/admin/export?format=csv" download className="bg-emerald-600 text-white px-2.5 py-1.5 border border-white/15 font-bold hover:bg-emerald-700  transition-all font-mono uppercase text-[10px] flex items-center gap-1">
              Excel
            </a>
            <button type="button" onClick={exportAsPdf} className="bg-red-500 text-white px-2.5 py-1.5 border border-white/15 font-bold hover:bg-red-600  transition-all font-mono uppercase text-[10px] flex items-center gap-1">
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
          <div
            key={s.label}
            role={s.clickable ? 'button' : undefined}
            tabIndex={s.clickable ? 0 : undefined}
            aria-label={s.clickable ? 'Toggle duplicates filter' : undefined}
            className={`bg-[#0d0e12] border border-white/10 p-2  ${s.clickable ? 'cursor-pointer hover:bg-white/5' : ''}`}
            onClick={s.clickable ? () => setShowDuplicatesOnly(!showDuplicatesOnly) : undefined}
            onKeyDown={
              s.clickable
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setShowDuplicatesOnly(!showDuplicatesOnly)
                    }
                  }
                : undefined
            }
          >
            <div className={`text-xl md:text-2xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-zinc-500 font-bold text-[9px] uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-[#0d0e12] border border-white/10 p-2 ">
        <div className="flex flex-wrap gap-2 items-center">
          <input type="text" aria-label="Search deals" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="px-3 py-1.5 border border-white/15 bg-[#121318] text-white w-full sm:w-48 font-mono text-xs rounded-lg" />
          <select aria-label="Filter by category" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="px-2 py-1.5 border border-white/15 bg-[#121318] text-white font-mono text-xs rounded-lg">
            <option value="all">All ({deals.length})</option>
            {dealCategories.map(c => <option key={c.id} value={c.id}>{c.name} ({deals.filter(d => d.category === c.id).length})</option>)}
          </select>
          <select aria-label="Sort deals" value={`${sortBy}-${sortOrder}`} onChange={e => { const [f, o] = e.target.value.split('-'); setSortBy(f as any); setSortOrder(o as any) }} className="px-2 py-1.5 border border-white/15 bg-[#121318] text-white font-mono text-xs rounded-lg">
            <option value="createdAt-desc">Newest</option>
            <option value="createdAt-asc">Oldest</option>
            <option value="title-asc">A-Z</option>
            <option value="provider-asc">Provider</option>
          </select>
          <button type="button" onClick={() => setShowDuplicatesOnly(!showDuplicatesOnly)} className={`px-2 py-1.5 border border-white/15 font-bold text-[10px] font-mono rounded-lg ${showDuplicatesOnly ? 'bg-orange-500 text-white' : 'bg-[#121318] text-zinc-300'}`}>
            {showDuplicatesOnly ? 'Dupes ✓' : 'Dupes'}
          </button>
          <div className="ml-auto flex gap-1">
            <button type="button" aria-label="Table view" onClick={() => setViewMode('table')} className={`p-1.5 border border-white/15 text-xs rounded-lg ${viewMode === 'table' ? 'bg-cyan-600 text-white' : 'bg-[#121318] text-zinc-300'}`}>☰</button>
            <button type="button" aria-label="Grid view" onClick={() => setViewMode('grid')} className={`p-1.5 border border-white/15 text-xs rounded-lg ${viewMode === 'grid' ? 'bg-cyan-600 text-white' : 'bg-[#121318] text-zinc-300'}`}>⊞</button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedDeals.size > 0 && (
        <div className="bg-yellow-100 border border-white/15 p-2 ">
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="font-bold">{selectedDeals.size} selected</span>
            <button type="button" onClick={bulkDelete} className="bg-red-500 text-white px-3 py-1 border border-white/15 font-bold hover:bg-red-600 text-[10px]">Delete</button>
            <button type="button" onClick={() => setSelectedDeals(new Set())} className="bg-zinc-700 text-white px-3 py-1 border border-white/15 font-bold text-[10px]">Clear</button>
          </div>
        </div>
      )}

      <AdminDealsCatalog
        loading={loading}
        filtered={filtered}
        viewMode={viewMode}
        selectedDeals={selectedDeals}
        duplicateIds={duplicateIds}
        onToggleSelect={toggleSelect}
        onToggleSelectAll={toggleSelectAll}
        onEdit={setEditingDeal}
        onDelete={deleteDeal}
        onUpdateStatus={updateStatus}
        onOpenImport={() => setShowImportModal(true)}
      />
      {/* Modals */}
      {
        (showAddModal || editingDeal) && (
          <AdminDealModal
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
    </>
  )
}
