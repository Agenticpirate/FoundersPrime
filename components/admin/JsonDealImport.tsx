'use client'

import { useState, useRef } from 'react'
import { Deal, dealCategories, getAllCategories } from '@/lib/deals-database'

interface JsonDealImportProps {
  onImportComplete?: (deals: Deal[]) => void
}

interface ImportedDeal {
  title: string
  provider: string
  category?: string
  subcategory?: string
  description: string
  value: string
  originalPrice?: string
  discountedPrice?: string
  savings?: string
  eligibility?: string[]
  requirements?: string[]
  applicationProcess?: string[]
  proTips?: string[]
  tags?: string[]
  status?: 'active' | 'expired' | 'coming-soon' | 'limited'
  expiryDate?: string
  applicationUrl: string
  providerWebsite?: string
  logoUrl?: string
  featured?: boolean
  verified?: boolean
  difficulty?: 'easy' | 'medium' | 'hard'
  timeToApply?: string
  successRate?: string
}

export default function JsonDealImport({ onImportComplete }: JsonDealImportProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [previewDeals, setPreviewDeals] = useState<Deal[]>([])
  const [showPreview, setShowPreview] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const categories = getAllCategories()

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const validateDeal = (deal: ImportedDeal): string[] => {
    const errors: string[] = []

    if (!deal.title?.trim()) errors.push('Title is required')
    if (!deal.provider?.trim()) errors.push('Provider is required')
    if (!deal.description?.trim()) errors.push('Description is required')
    if (!deal.value?.trim()) errors.push('Value is required')
    if (!deal.applicationUrl?.trim()) errors.push('Application URL is required')

    // Validate URL format
    if (deal.applicationUrl && !deal.applicationUrl.match(/^https?:\/\/.+/)) {
      errors.push('Application URL must be a valid HTTP/HTTPS URL')
    }

    return errors
  }

  const convertImportedDeal = (importedDeal: ImportedDeal, index: number): Deal => {
    const now = new Date().toISOString().split('T')[0]
    const slug = generateSlug(importedDeal.title)

    return {
      id: `imported-${Date.now()}-${index}`,
      slug: slug,
      title: importedDeal.title,
      provider: importedDeal.provider,
      category: importedDeal.category || 'saas-discounts',
      subcategory: importedDeal.subcategory,
      description: importedDeal.description,
      shortDescription: importedDeal.description.substring(0, 120) + (importedDeal.description.length > 120 ? '...' : ''),
      value: importedDeal.value,
      originalPrice: importedDeal.originalPrice,
      discountedPrice: importedDeal.discountedPrice,
      savings: importedDeal.savings,
      eligibility: importedDeal.eligibility || [],
      requirements: importedDeal.requirements || [],
      applicationProcess: importedDeal.applicationProcess || ['Visit provider website', 'Complete application', 'Await approval'],
      proTips: importedDeal.proTips || [],
      tags: importedDeal.tags || [],
      status: importedDeal.status || 'active',
      expiryDate: importedDeal.expiryDate,
      applicationUrl: importedDeal.applicationUrl,
      providerWebsite: importedDeal.providerWebsite || importedDeal.applicationUrl,
      logoUrl: importedDeal.logoUrl,
      featured: importedDeal.featured || false,
      recommended: false,
      verified: importedDeal.verified || false,
      difficulty: importedDeal.difficulty || 'medium',
      timeToApply: importedDeal.timeToApply || '15 minutes',
      successRate: importedDeal.successRate,
      lastUpdated: now,
      createdAt: now,
      updatedAt: now,
      sourceVerified: true,
      dataSource: 'import' as const
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.json')) {
      setErrorMessage('Please upload a JSON file')
      setUploadStatus('error')
      return
    }

    setIsUploading(true)
    setUploadStatus('idle')
    setErrorMessage('')

    try {
      const text = await file.text()
      const jsonData = JSON.parse(text)

      // Handle both single deal object and array of deals
      const dealsArray = Array.isArray(jsonData) ? jsonData : [jsonData]

      if (dealsArray.length === 0) {
        throw new Error('No deals found in the JSON file')
      }

      // Validate all deals
      const validationErrors: string[] = []
      dealsArray.forEach((deal, index) => {
        const errors = validateDeal(deal)
        if (errors.length > 0) {
          validationErrors.push(`Deal ${index + 1}: ${errors.join(', ')}`)
        }
      })

      if (validationErrors.length > 0) {
        throw new Error(`Validation errors:\n${validationErrors.join('\n')}`)
      }

      // Convert to Deal objects
      const convertedDeals = dealsArray.map((deal, index) => convertImportedDeal(deal, index))

      setPreviewDeals(convertedDeals)
      setShowPreview(true)
      setUploadStatus('success')

    } catch (error) {
      console.error('Error processing JSON file:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Failed to process JSON file')
      setUploadStatus('error')
    } finally {
      setIsUploading(false)
    }
  }

  const handleConfirmImport = () => {
    onImportComplete?.(previewDeals)
    setShowPreview(false)
    setPreviewDeals([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleCancelImport = () => {
    setShowPreview(false)
    setPreviewDeals([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="bg-white border-3 border-ink p-6 shadow-hard-sm">
      <div className="flex items-center gap-3 mb-4">
        <span className="material-symbols-outlined text-2xl text-primary">upload_file</span>
        <div>
          <h3 className="text-lg font-bold text-ink">Import Deals from JSON</h3>
          <p className="text-sm text-gray-600">Upload a JSON file containing deal data to add multiple deals at once</p>
        </div>
      </div>

      {!showPreview && (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
              id="json-upload"
            />
            <label
              htmlFor="json-upload"
              className="cursor-pointer flex flex-col items-center gap-3"
            >
              <span className="material-symbols-outlined text-4xl text-gray-400">cloud_upload</span>
              <div>
                <p className="text-lg font-semibold text-gray-700">Click to upload JSON file</p>
                <p className="text-sm text-gray-500">Supports single deal object or array of deals</p>
              </div>
            </label>
          </div>

          {isUploading && (
            <div className="flex items-center gap-2 text-primary">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
              <span className="text-sm">Processing JSON file...</span>
            </div>
          )}

          {uploadStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-red-500 text-sm mt-0.5">error</span>
                <div>
                  <p className="text-sm font-semibold text-red-800">Import Error</p>
                  <pre className="text-xs text-red-700 mt-1 whitespace-pre-wrap">{errorMessage}</pre>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-sm text-gray-800 mb-2">Expected JSON Format:</h4>
            <pre className="text-xs text-gray-600 overflow-x-auto">
              {`{
  "title": "Deal Title",
  "provider": "Company Name",
  "category": "ai", // Optional, defaults to saas-discounts
  "subcategory": "ai-development", // Optional
  "description": "Detailed description...",
  "value": "$10,000",
  "applicationUrl": "https://example.com/apply",
  "eligibility": ["Startups", "Early stage"],
  "requirements": ["Valid business", "Under 2 years old"],
  "tags": ["AI", "Development"],
  "status": "active", // active, expired, coming-soon, limited
  "featured": false,
  "verified": true
}`}
            </pre>
          </div>
        </div>
      )}

      {showPreview && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-green-500">check_circle</span>
              <p className="text-sm font-semibold text-green-800">
                Successfully processed {previewDeals.length} deal{previewDeals.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-3 font-semibold">Title</th>
                  <th className="text-left p-3 font-semibold">Provider</th>
                  <th className="text-left p-3 font-semibold">Category</th>
                  <th className="text-left p-3 font-semibold">Value</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {previewDeals.map((deal, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="p-3 font-medium">{deal.title}</td>
                    <td className="p-3">{deal.provider}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {categories.find(c => c.id === deal.category)?.name || deal.category}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-green-600">{deal.value}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 text-xs rounded ${deal.status === 'active' ? 'bg-green-100 text-green-800' :
                          deal.status === 'expired' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                        }`}>
                        {deal.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleConfirmImport}
              className="px-6 py-2 bg-primary text-white font-semibold border-2 border-primary hover:bg-primary-dark transition-colors"
            >
              Import {previewDeals.length} Deal{previewDeals.length !== 1 ? 's' : ''}
            </button>
            <button
              onClick={handleCancelImport}
              className="px-6 py-2 bg-white text-gray-700 font-semibold border-2 border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}