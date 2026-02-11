'use client'

import { useState, useRef } from 'react'
import { X, Upload, FileJson, CheckCircle, AlertCircle } from 'lucide-react'

interface DealImportModalProps {
  onClose: () => void
  onImport: () => void
}

export default function DealImportModal({ onClose, onImport }: DealImportModalProps) {
  const [jsonInput, setJsonInput] = useState('')
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [preview, setPreview] = useState<any[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setJsonInput(content)
      parseAndPreview(content)
    }
    reader.readAsText(file)
  }

  const parseAndPreview = (content: string) => {
    try {
      let data = JSON.parse(content)
      // Handle both array and object with deals property
      const deals = Array.isArray(data) ? data : (data.deals || [])
      setPreview(deals.slice(0, 5))
      setResult(null)
    } catch (err) {
      setResult({ success: false, message: 'Invalid JSON format' })
      setPreview([])
    }
  }

  const handleImport = async () => {
    if (!jsonInput.trim()) {
      setResult({ success: false, message: 'Please provide JSON data' })
      return
    }

    setImporting(true)
    setResult(null)

    try {
      let data = JSON.parse(jsonInput)
      const deals = Array.isArray(data) ? data : (data.deals || [])

      if (deals.length === 0) {
        setResult({ success: false, message: 'No deals found in the JSON' })
        return
      }

      const response = await fetch('/api/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deals })
      })

      const result = await response.json()
      if (result.success) {
        setResult({ success: true, message: result.message || `Imported ${deals.length} deals` })
        setTimeout(() => onImport(), 1500)
      } else {
        setResult({ success: false, message: result.error || 'Import failed' })
      }
    } catch (err) {
      setResult({ success: false, message: 'Failed to parse or import JSON' })
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b-3 border-black p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FileJson className="w-5 h-5" /> Import Deals from JSON
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6 space-y-6">
          {/* File Upload */}
          <div className="bg-blue-50 border-2 border-dashed border-blue-300 p-6 text-center">
            <input type="file" ref={fileInputRef} accept=".json" onChange={handleFileUpload} className="hidden" />
            <Upload className="w-12 h-12 text-blue-500 mx-auto mb-3" />
            <p className="font-bold mb-2">Upload JSON File</p>
            <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-blue-500 text-white border-2 border-black font-bold hover:bg-blue-600">
              Choose File
            </button>
            <p className="text-sm text-gray-500 mt-2">Or paste JSON below</p>
          </div>

          {/* JSON Input */}
          <div>
            <label className="block text-sm font-bold mb-2">JSON Data</label>
            <textarea
              rows={10}
              value={jsonInput}
              onChange={(e) => { setJsonInput(e.target.value); parseAndPreview(e.target.value) }}
              className="w-full px-3 py-2 border-2 border-black font-mono text-sm"
              placeholder='[{"title": "Deal Name", "provider": "Company", "category": "saas-discounts", "value": "$100", "description": "...", "applicationUrl": "https://..."}]'
            />
          </div>

          {/* Preview */}
          {preview.length > 0 && (
            <div className="bg-green-50 border-2 border-green-300 p-4">
              <h3 className="font-bold mb-2">Preview ({preview.length} of {JSON.parse(jsonInput || '[]').length || 0} deals)</h3>
              <div className="space-y-2">
                {preview.map((deal, i) => (
                  <div key={i} className="bg-white p-2 border border-green-300 text-sm">
                    <span className="font-bold">{deal.title}</span> - {deal.provider} ({deal.category})
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className={`p-4 border-2 ${result.success ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
              <div className="flex items-center gap-2">
                {result.success ? <CheckCircle className="w-5 h-5 text-green-600" /> : <AlertCircle className="w-5 h-5 text-red-600" />}
                <span className={result.success ? 'text-green-700' : 'text-red-700'}>{result.message}</span>
              </div>
            </div>
          )}

          {/* Expected Format */}
          <div className="bg-gray-50 border-2 border-gray-300 p-4">
            <h3 className="font-bold mb-2">Expected JSON Format</h3>
            <pre className="text-xs bg-gray-100 p-2 overflow-x-auto">{`[
  {
    "title": "Deal Title",
    "provider": "Company Name",
    "category": "saas-discounts",
    "value": "$100 or 50% off",
    "description": "Full description",
    "applicationUrl": "https://apply.example.com",
    "eligibility": ["Startups", "Less than 2 years"],
    "tags": ["cloud", "infrastructure"]
  }
]`}</pre>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t-2 border-gray-200">
            <button onClick={onClose} className="px-6 py-2 border-2 border-black font-bold hover:bg-gray-100">Cancel</button>
            <button onClick={handleImport} disabled={importing || !jsonInput.trim()} className="px-6 py-2 bg-purple-500 text-white border-2 border-black font-bold hover:bg-purple-600 disabled:opacity-50">
              {importing ? 'Importing...' : 'Import Deals'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
