'use client'

import { useState } from 'react'
import { processImportedDeals } from '@/lib/manual-deal-processor'
import { Deal } from '@/lib/deals-database'

interface DirectImportProps {
  onImportComplete: (deals: Deal[]) => void
  onClose: () => void
}

export default function DirectImport({ onImportComplete, onClose }: DirectImportProps) {
  const [jsonData, setJsonData] = useState('')
  const [processedDeals, setProcessedDeals] = useState<Deal[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleProcess = () => {
    setIsProcessing(true)
    try {
      const rawData = JSON.parse(jsonData)
      const dealsArray = Array.isArray(rawData) ? rawData : [rawData]
      const processed = processImportedDeals(dealsArray)
      setProcessedDeals(processed)
    } catch (error) {
      alert(`Error processing JSON: ${error}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleImport = () => {
    onImportComplete(processedDeals)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white border-3 border-black shadow-hard max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">🚀 Direct Import - Paste Your JSON</h2>
              <p className="text-gray-600 mt-1">I'll automatically fix missing fields and import your deals</p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Paste Your JSON Data Here:
                </label>
                <textarea
                  value={jsonData}
                  onChange={(e) => setJsonData(e.target.value)}
                  rows={20}
                  className="w-full px-3 py-2 border-3 border-black focus:outline-none focus:shadow-hard font-mono text-sm"
                  placeholder={`Paste your JSON here, for example:
[
  {
    "title": "Gemini API Promo code",
    "value": "$200 credits"
  },
  {
    "title": "Notion Discount", 
    "value": "50% off"
  }
]`}
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleProcess}
                  disabled={!jsonData || isProcessing}
                  className="bg-blue-500 text-white border-3 border-black shadow-hard px-6 py-2 font-bold hover:shadow-hard-hover hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : 'Process & Preview'}
                </button>
              </div>
            </div>

            {/* Preview Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Preview Processed Deals:</h3>
              
              {processedDeals.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {processedDeals.map((deal, index) => (
                    <div key={index} className="bg-gray-50 border-2 border-gray-300 p-3 text-sm">
                      <div className="font-bold text-blue-600">{deal.title}</div>
                      <div className="text-gray-600">Company: {deal.provider}</div>
                      <div className="text-gray-600">Category: {deal.category}</div>
                      <div className="text-gray-600">Value: {deal.value}</div>
                      <div className="text-gray-500 text-xs mt-1">{deal.shortDescription}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-100 border-2 border-gray-300 p-8 text-center text-gray-500">
                  Process your JSON to see preview here
                </div>
              )}
              
              {processedDeals.length > 0 && (
                <div className="bg-green-50 border-3 border-green-600 p-4">
                  <div className="font-bold text-green-800">✅ Ready to Import!</div>
                  <div className="text-green-700 text-sm">
                    {processedDeals.length} deals processed successfully with auto-generated:
                  </div>
                  <ul className="text-green-600 text-xs mt-2 list-disc pl-4">
                    <li>Company names extracted from titles</li>
                    <li>Descriptions auto-generated</li>
                    <li>Categories assigned automatically</li>
                    <li>Application URLs created</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t-2 border-gray-200 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 border-3 border-black shadow-hard font-bold hover:shadow-hard-hover hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleImport}
              disabled={processedDeals.length === 0}
              className="px-6 py-2 bg-primary border-3 border-black shadow-hard font-bold hover:shadow-hard-hover hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Import {processedDeals.length} Deals
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}