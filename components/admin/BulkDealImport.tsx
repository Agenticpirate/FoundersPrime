'use client'

import { useState } from 'react'
import { Deal } from '@/lib/deals-database'

interface BulkDealImportProps {
  onImportComplete?: (deals: Deal[]) => void
}

export default function BulkDealImport({ onImportComplete }: BulkDealImportProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [importedCount, setImportedCount] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')

  const loadBulkDeals = async () => {
    setIsLoading(true)
    setImportStatus('idle')
    setErrorMessage('')

    try {
      // Load the processed deals from our bulk import
      const response = await fetch('/data/all-deals.json')
      
      if (!response.ok) {
        throw new Error('Failed to load bulk deals file')
      }

      const deals: Deal[] = await response.json()
      
      if (!Array.isArray(deals) || deals.length === 0) {
        throw new Error('No valid deals found in bulk import file')
      }

      // Save deals via API
      const saveResponse = await fetch('/api/deals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deals })
      })

      const saveResult = await saveResponse.json()
      
      if (!saveResult.success) {
        throw new Error(saveResult.error || 'Failed to save deals')
      }

      setImportedCount(deals.length)
      setImportStatus('success')
      onImportComplete?.(deals)

    } catch (error) {
      console.error('Bulk import error:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Failed to import bulk deals')
      setImportStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white border-3 border-ink p-6 shadow-hard-sm">
      <div className="flex items-center gap-3 mb-4">
        <span className="material-symbols-outlined text-2xl text-purple-600">cloud_sync</span>
        <div>
          <h3 className="text-lg font-bold text-ink">Bulk Import Processed Deals</h3>
          <p className="text-sm text-gray-600">Import all 204 pre-processed deals from your JSON files</p>
        </div>
      </div>

      {importStatus === 'idle' && (
        <div className="space-y-4">
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-2">Ready to Import</h4>
            <div className="text-sm text-purple-700 space-y-2">
              <p>✅ <strong>204 deals</strong> processed from your JSON files</p>
              <p>✅ <strong>11 categories</strong> automatically mapped</p>
              <p>✅ All deals validated and formatted</p>
              <p>✅ Categories include: AI Development, AI Marketing, AI Productivity, and more</p>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Import Breakdown</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div>• AI Development: 31 deals</div>
              <div>• AI Marketing: 31 deals</div>
              <div>• AI Productivity: 29 deals</div>
              <div>• AI Customer Support: 22 deals</div>
              <div>• AI Design: 20 deals</div>
              <div>• AI Automation: 17 deals</div>
              <div>• AI Agents: 16 deals</div>
              <div>• AI Writing: 13 deals</div>
              <div>• AI Sales & Business: 13 deals</div>
              <div>• AI Data Analysis: 7 deals</div>
              <div>• HR Recruitment: 5 deals</div>
            </div>
          </div>

          <button
            onClick={loadBulkDeals}
            disabled={isLoading}
            className="w-full px-6 py-3 bg-purple-600 text-white font-bold border-2 border-ink shadow-hard hover:shadow-hard-hover hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Importing Deals...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">cloud_download</span>
                Import All 204 Deals
              </div>
            )}
          </button>
        </div>
      )}

      {importStatus === 'success' && (
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-green-600">check_circle</span>
            <h4 className="font-semibold text-green-800">Import Successful!</h4>
          </div>
          <p className="text-sm text-green-700">
            Successfully imported <strong>{importedCount} deals</strong> to your website. 
            They are now visible in the deals section with proper categorization.
          </p>
          <div className="mt-3 flex gap-2">
            <a 
              href="/deals" 
              target="_blank"
              className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded hover:bg-green-700 transition-colors"
            >
              View Deals on Website
            </a>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-white text-green-600 border border-green-600 text-sm font-semibold rounded hover:bg-green-50 transition-colors"
            >
              Refresh Admin
            </button>
          </div>
        </div>
      )}

      {importStatus === 'error' && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-red-600">error</span>
            <h4 className="font-semibold text-red-800">Import Failed</h4>
          </div>
          <p className="text-sm text-red-700 mb-3">{errorMessage}</p>
          <div className="space-y-2 text-sm text-red-600">
            <p><strong>Troubleshooting:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Make sure the bulk import script was run successfully</li>
              <li>Check that the file exists at <code>data/imported-deals/all-deals.json</code></li>
              <li>Verify the JSON file is valid and contains deal objects</li>
              <li>Try refreshing the page and importing again</li>
            </ul>
          </div>
          <button
            onClick={loadBulkDeals}
            className="mt-3 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
        <p><strong>Note:</strong> This will import all processed deals at once. Individual deals can still be edited after import through the admin interface.</p>
      </div>
    </div>
  )
}