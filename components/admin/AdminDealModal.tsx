'use client'

import { useState } from 'react'
import { Deal, dealCategories } from '@/lib/deals-database'

export default function AdminDealModal({ deal, onClose, onSave }: { deal: Deal | null; onClose: () => void; onSave: () => void }) {
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
      <div className="bg-[#0d0e12] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="bg-[#121318] p-4 border-b border-white/10 rounded-t-2xl">
          <h2 className="text-xl font-black text-white">{deal ? '✏️ Edit Deal' : '➕ Add New Deal'}</h2>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <div>
            <label className="font-bold block mb-1" htmlFor="admin-deal-title">Title *</label>
            <input id="admin-deal-title"
              required
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full p-3 rounded-lg bg-[#121318] text-white border border-white/15"
              placeholder="e.g., AWS Activate Credits"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold block mb-1" htmlFor="admin-deal-provider">Provider *</label>
              <input id="admin-deal-provider"
                required
                value={form.provider}
                onChange={e => setForm({ ...form, provider: e.target.value })}
                className="w-full p-3 rounded-lg bg-[#121318] text-white border border-white/15"
                placeholder="e.g., Amazon Web Services"
              />
            </div>
            <div>
              <label className="font-bold block mb-1" htmlFor="admin-deal-value">Value *</label>
              <input id="admin-deal-value"
                required
                value={form.value}
                onChange={e => setForm({ ...form, value: e.target.value })}
                className="w-full p-3 rounded-lg bg-[#121318] text-white border border-white/15"
                placeholder="e.g., $100,000 or 50% off"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold block mb-1" htmlFor="admin-deal-category">Category</label>
              <select id="admin-deal-category"
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full p-3 border border-white/15 bg-[#121318] text-white rounded-lg"
              >
                {dealCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="font-bold block mb-1" htmlFor="admin-deal-status">Status</label>
              <select id="admin-deal-status"
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value as any })}
                className="w-full p-3 border border-white/15 bg-[#121318] text-white rounded-lg"
              >
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="coming-soon">Coming Soon</option>
              </select>
            </div>
          </div>
          <div>
            <label className="font-bold block mb-1" htmlFor="admin-deal-description">Description *</label>
            <textarea id="admin-deal-description"
              required
              rows={4}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full p-3 rounded-lg bg-[#121318] text-white border border-white/15"
              placeholder="Describe the deal, what's included, and any important details..."
            />
          </div>
          <div>
            <label className="font-bold block mb-1" htmlFor="admin-deal-application-url">Application URL *</label>
            <input id="admin-deal-application-url"
              required
              type="url"
              value={form.applicationUrl}
              onChange={e => setForm({ ...form, applicationUrl: e.target.value })}
              className="w-full p-3 rounded-lg bg-[#121318] text-white border border-white/15"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="font-bold block mb-1" htmlFor="admin-deal-eligibility">Eligibility (one per line)</label>
            <textarea id="admin-deal-eligibility"
              rows={3}
              value={form.eligibility}
              onChange={e => setForm({ ...form, eligibility: e.target.value })}
              className="w-full p-3 rounded-lg bg-[#121318] text-white border border-white/15"
              placeholder="Early-stage startups&#10;Less than 2 years old&#10;Under $10M funding"
            />
          </div>
          <div>
            <label className="font-bold block mb-1" htmlFor="admin-deal-tags">Tags (comma separated)</label>
            <input id="admin-deal-tags"
              value={form.tags}
              onChange={e => setForm({ ...form, tags: e.target.value })}
              className="w-full p-3 rounded-lg bg-[#121318] text-white border border-white/15"
              placeholder="cloud, aws, credits, startup"
            />
          </div>
          <div className="flex gap-4 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 p-3 border border-white/15 font-bold hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 p-3 bg-cyan-600 text-white border border-white/15 font-bold hover:bg-cyan-600 disabled:opacity-50"
            >
              {saving ? 'Saving...' : deal ? 'Update Deal' : 'Create Deal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
