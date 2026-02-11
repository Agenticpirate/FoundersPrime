'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Deal, dealCategories } from '@/lib/deals-database'

interface DealEditModalProps {
  deal: Deal | null
  onClose: () => void
  onSave: () => void
}

export default function DealEditModal({ deal, onClose, onSave }: DealEditModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    provider: '',
    category: 'saas-discounts',
    description: '',
    shortDescription: '',
    value: '',
    applicationUrl: '',
    providerWebsite: '',
    status: 'active',
    difficulty: 'medium',
    timeToApply: '15 minutes',
    eligibility: '',
    requirements: '',
    proTips: '',
    tags: '',
    featured: false,
    verified: true,
    expiryDate: ''
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (deal) {
      setFormData({
        title: deal.title || '',
        provider: deal.provider || '',
        category: deal.category || 'saas-discounts',
        description: deal.description || '',
        shortDescription: deal.shortDescription || '',
        value: deal.value || '',
        applicationUrl: deal.applicationUrl || '',
        providerWebsite: deal.providerWebsite || '',
        status: deal.status || 'active',
        difficulty: deal.difficulty || 'medium',
        timeToApply: deal.timeToApply || '15 minutes',
        eligibility: (deal.eligibility || []).join('\n'),
        requirements: (deal.requirements || []).join('\n'),
        proTips: (deal.proTips || []).join('\n'),
        tags: (deal.tags || []).join(', '),
        featured: deal.featured || false,
        verified: deal.verified !== false,
        expiryDate: deal.expiryDate ? deal.expiryDate.split('T')[0] : ''
      })
    }
  }, [deal])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const dealData = {
        ...formData,
        eligibility: formData.eligibility.split('\n').filter(Boolean),
        requirements: formData.requirements.split('\n').filter(Boolean),
        proTips: formData.proTips.split('\n').filter(Boolean),
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        shortDescription: formData.shortDescription || formData.description.substring(0, 150),
        ...(deal ? { id: deal.id, slug: deal.slug } : {})
      }

      const response = await fetch('/api/deals', {
        method: deal ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dealData)
      })

      const result = await response.json()
      if (result.success) {
        onSave()
      } else {
        setError(result.error || 'Failed to save deal')
      }
    } catch (err) {
      setError('Failed to save deal')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b-3 border-black p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">{deal ? 'Edit Deal' : 'Add New Deal'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && <div className="bg-red-100 border-2 border-red-500 p-3 text-red-700">{error}</div>}

          {/* Basic Info */}
          <div className="bg-blue-50 border-2 border-black p-4">
            <h3 className="font-bold mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1">Title *</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border-2 border-black" placeholder="e.g., AWS Activate - $100K Credits" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Provider/Company *</label>
                <input type="text" required value={formData.provider} onChange={e => setFormData({...formData, provider: e.target.value})}
                  className="w-full px-3 py-2 border-2 border-black" placeholder="e.g., Amazon Web Services" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Category *</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border-2 border-black bg-white">
                  {dealCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Value *</label>
                <input type="text" required value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})}
                  className="w-full px-3 py-2 border-2 border-black" placeholder="e.g., $100K, 50% off" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-green-50 border-2 border-black p-4">
            <h3 className="font-bold mb-4">Description</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Full Description *</label>
                <textarea rows={4} required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border-2 border-black" placeholder="Detailed description of the deal..." />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Short Description</label>
                <input type="text" value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})}
                  className="w-full px-3 py-2 border-2 border-black" placeholder="Brief summary (auto-generated if empty)" />
              </div>
            </div>
          </div>

          {/* URLs */}
          <div className="bg-yellow-50 border-2 border-black p-4">
            <h3 className="font-bold mb-4">Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1">Application URL *</label>
                <input type="url" required value={formData.applicationUrl} onChange={e => setFormData({...formData, applicationUrl: e.target.value})}
                  className="w-full px-3 py-2 border-2 border-black" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Provider Website</label>
                <input type="url" value={formData.providerWebsite} onChange={e => setFormData({...formData, providerWebsite: e.target.value})}
                  className="w-full px-3 py-2 border-2 border-black" placeholder="https://..." />
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-purple-50 border-2 border-black p-4">
            <h3 className="font-bold mb-4">Requirements & Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1">Eligibility (one per line)</label>
                <textarea rows={3} value={formData.eligibility} onChange={e => setFormData({...formData, eligibility: e.target.value})}
                  className="w-full px-3 py-2 border-2 border-black" placeholder="Early-stage startup&#10;Less than $5M raised" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Requirements (one per line)</label>
                <textarea rows={3} value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})}
                  className="w-full px-3 py-2 border-2 border-black" placeholder="Valid business email&#10;Company registration" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-1">Pro Tips (one per line)</label>
                <textarea rows={3} value={formData.proTips} onChange={e => setFormData({...formData, proTips: e.target.value})}
                  className="w-full px-3 py-2 border-2 border-black" placeholder="Apply during Q4 for faster approval&#10;Mention your accelerator batch" />
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-gray-50 border-2 border-black p-4">
            <h3 className="font-bold mb-4">Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1">Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 border-2 border-black bg-white">
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="coming-soon">Coming Soon</option>
                  <option value="limited">Limited</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Difficulty</label>
                <select value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value})}
                  className="w-full px-3 py-2 border-2 border-black bg-white">
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Time to Apply</label>
                <input type="text" value={formData.timeToApply} onChange={e => setFormData({...formData, timeToApply: e.target.value})}
                  className="w-full px-3 py-2 border-2 border-black" placeholder="15 minutes" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Expiry Date</label>
                <input type="date" value={formData.expiryDate} onChange={e => setFormData({...formData, expiryDate: e.target.value})}
                  className="w-full px-3 py-2 border-2 border-black" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Tags (comma-separated)</label>
                <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})}
                  className="w-full px-3 py-2 border-2 border-black" placeholder="Cloud, Infrastructure, API" />
              </div>
              <div className="flex items-center gap-6 pt-6">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-4 h-4" />
                  <span className="text-sm font-bold">Featured</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.verified} onChange={e => setFormData({...formData, verified: e.target.checked})} className="w-4 h-4" />
                  <span className="text-sm font-bold">Verified</span>
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t-2 border-gray-200">
            <button type="button" onClick={onClose} className="px-6 py-2 border-2 border-black font-bold hover:bg-gray-100">Cancel</button>
            <button type="submit" disabled={saving} className="px-6 py-2 bg-[#13b6ec] text-white border-2 border-black font-bold hover:bg-[#0ea5db] disabled:opacity-50">
              {saving ? 'Saving...' : (deal ? 'Update Deal' : 'Create Deal')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
