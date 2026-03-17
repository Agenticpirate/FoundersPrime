'use client'

import { useState, useRef } from 'react'
import { X, Upload, FileJson, FileText, FileSpreadsheet, Wand2, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { dealCategories } from '@/lib/deals-database'

interface UniversalDealImporterProps {
  onClose: () => void
  onImport: () => void
}

type ImportMode = 'text' | 'json' | 'csv' | 'file'

interface ExtractedDeal {
  title: string
  provider: string
  category: string
  value: string
  description: string
  applicationUrl: string
  eligibility?: string[]
  tags?: string[]
}

export default function UniversalDealImporter({ onClose, onImport }: UniversalDealImporterProps) {
  const [mode, setMode] = useState<ImportMode>('text')
  const [textInput, setTextInput] = useState('')
  const [extractedDeals, setExtractedDeals] = useState<ExtractedDeal[]>([])
  const [importing, setImporting] = useState(false)
  const [extracting, setExtracting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Smart text parser - extracts deal information from unstructured text
  const extractDealsFromText = (text: string): ExtractedDeal[] => {
    const deals: ExtractedDeal[] = []
    
    // Split by common separators (double newlines, dashes, numbers)
    const sections = text.split(/\n\n+|\n---+\n|\n\d+\.\s+/).filter(s => s.trim())
    
    for (const section of sections) {
      const deal = parseSection(section)
      if (deal && deal.title && deal.provider) {
        deals.push(deal)
      }
    }
    
    // If no deals found with sections, try to parse as single deal
    if (deals.length === 0 && text.trim()) {
      const singleDeal = parseSection(text)
      if (singleDeal && singleDeal.title) {
        deals.push(singleDeal)
      }
    }
    
    return deals
  }

  // Parse a text section into a deal object
  const parseSection = (text: string): ExtractedDeal | null => {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
    if (lines.length === 0) return null

    const deal: ExtractedDeal = {
      title: '',
      provider: '',
      category: 'saas-discounts',
      value: '',
      description: '',
      applicationUrl: '',
      eligibility: [],
      tags: []
    }

    // Pattern matching for common formats
    const patterns = {
      title: /^(?:title|name|deal|offer)[\s:]+(.+)/i,
      provider: /^(?:provider|company|from|by|vendor)[\s:]+(.+)/i,
      value: /^(?:value|worth|discount|savings?|credits?|amount)[\s:]+(.+)/i,
      url: /^(?:url|link|apply|website|application)[\s:]+(.+)/i,
      category: /^(?:category|type)[\s:]+(.+)/i,
      description: /^(?:description|details|about)[\s:]+(.+)/i,
    }

    // Extract URL from anywhere in text
    const urlMatch = text.match(/https?:\/\/[^\s<>"{}|\\^`\[\]]+/i)
    if (urlMatch) deal.applicationUrl = urlMatch[0]

    // Extract value patterns like "$100K", "50% off", "6 months free"
    const valuePatterns = [
      /\$[\d,]+[KMB]?\+?(?:\s*(?:credits?|worth|value))?/i,
      /\d+%\s*(?:off|discount)/i,
      /\d+\s*(?:months?|years?)\s*free/i,
      /free\s*(?:for\s*)?\d+\s*(?:months?|years?)/i,
      /up\s*to\s*\$[\d,]+[KMB]?/i,
    ]
    for (const pattern of valuePatterns) {
      const match = text.match(pattern)
      if (match && !deal.value) {
        deal.value = match[0]
        break
      }
    }

    // Parse each line
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      
      // Check patterns
      for (const [key, pattern] of Object.entries(patterns)) {
        const match = line.match(pattern)
        if (match) {
          (deal as any)[key] = match[1].trim()
        }
      }

      // First line often is the title
      if (i === 0 && !deal.title && line.length < 100) {
        deal.title = line.replace(/^[-*•]\s*/, '')
      }
    }

    // Try to extract provider from title if not found
    if (!deal.provider && deal.title) {
      // Common patterns: "Company - Deal", "Deal by Company", "Deal from Company"
      const providerPatterns = [
        /^(.+?)\s*[-–—]\s*.+/,
        /.+\s+(?:by|from)\s+(.+)/i,
      ]
      for (const pattern of providerPatterns) {
        const match = deal.title.match(pattern)
        if (match) {
          deal.provider = match[1].trim()
          break
        }
      }
    }

    // Use full text as description if not found
    if (!deal.description) {
      deal.description = text.substring(0, 500)
    }

    // Auto-detect category based on keywords
    deal.category = detectCategory(text)

    // Extract tags from text
    deal.tags = extractTags(text)

    return deal
  }

  const detectCategory = (text: string): string => {
    const lower = text.toLowerCase()
    const categoryKeywords: Record<string, string[]> = {
      'cloud-credits': ['aws', 'azure', 'gcp', 'google cloud', 'cloud credits', 'infrastructure'],
      'ai': ['ai', 'artificial intelligence', 'machine learning', 'ml', 'gpt', 'llm'],
      'grants': ['grant', 'funding', 'non-dilutive', 'award'],
      'accelerators': ['accelerator', 'yc', 'y combinator', 'techstars', 'batch'],
      'incubators': ['incubator', 'incubation'],
      'ad-credits': ['ad credits', 'advertising', 'google ads', 'facebook ads', 'marketing credits'],
      'marketing': ['marketing', 'seo', 'email', 'social media'],
      'development': ['developer', 'api', 'sdk', 'development tools'],
      'finance': ['payment', 'banking', 'fintech', 'accounting'],
    }

    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(kw => lower.includes(kw))) {
        return category
      }
    }
    return 'saas-discounts'
  }

  const extractTags = (text: string): string[] => {
    const tags: string[] = []
    const lower = text.toLowerCase()
    const commonTags = ['startup', 'saas', 'cloud', 'ai', 'api', 'free', 'discount', 'credits', 'tools', 'software']
    for (const tag of commonTags) {
      if (lower.includes(tag)) tags.push(tag)
    }
    return Array.from(new Set(tags)).slice(0, 5)
  }

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    setExtracting(true)
    setResult(null)

    try {
      const fileName = file.name.toLowerCase()
      
      if (fileName.endsWith('.json')) {
        // JSON file
        const text = await file.text()
        const data = JSON.parse(text)
        const deals = Array.isArray(data) ? data : (data.deals || [])
        setExtractedDeals(deals)
        setMode('json')
      } else if (fileName.endsWith('.csv')) {
        // CSV file
        const text = await file.text()
        const deals = parseCSV(text)
        setExtractedDeals(deals)
        setMode('csv')
      } else if (fileName.endsWith('.txt') || fileName.endsWith('.md')) {
        // Text file
        const text = await file.text()
        setTextInput(text)
        const deals = extractDealsFromText(text)
        setExtractedDeals(deals)
        setMode('text')
      } else if (fileName.endsWith('.pdf')) {
        // PDF - read as text (basic extraction)
        setResult({ success: false, message: 'PDF support: Please copy the text from your PDF and paste it in the text area.' })
        setMode('text')
      } else {
        // Try to read as text
        const text = await file.text()
        setTextInput(text)
        const deals = extractDealsFromText(text)
        setExtractedDeals(deals)
        setMode('text')
      }
    } catch (err) {
      setResult({ success: false, message: 'Failed to parse file. Try pasting the content as text.' })
    } finally {
      setExtracting(false)
    }
  }

  // Parse CSV to deals
  const parseCSV = (csv: string): ExtractedDeal[] => {
    const lines = csv.split('\n').filter(l => l.trim())
    if (lines.length < 2) return []

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/['"]/g, ''))
    const deals: ExtractedDeal[] = []

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i])
      if (values.length < headers.length) continue

      const deal: any = {
        title: '',
        provider: '',
        category: 'saas-discounts',
        value: '',
        description: '',
        applicationUrl: '',
      }

      headers.forEach((header, idx) => {
        const value = values[idx]?.trim() || ''
        if (header.includes('title') || header.includes('name') || header.includes('deal')) deal.title = value
        else if (header.includes('provider') || header.includes('company')) deal.provider = value
        else if (header.includes('category') || header.includes('type')) deal.category = value || 'saas-discounts'
        else if (header.includes('value') || header.includes('discount') || header.includes('amount')) deal.value = value
        else if (header.includes('description') || header.includes('details')) deal.description = value
        else if (header.includes('url') || header.includes('link')) deal.applicationUrl = value
      })

      if (deal.title) deals.push(deal)
    }

    return deals
  }

  const parseCSVLine = (line: string): string[] => {
    const result: string[] = []
    let current = ''
    let inQuotes = false

    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    result.push(current.trim())
    return result
  }

  // Extract from text input
  const handleExtractFromText = () => {
    setExtracting(true)
    setResult(null)
    
    setTimeout(() => {
      const deals = extractDealsFromText(textInput)
      setExtractedDeals(deals)
      setExtracting(false)
      
      if (deals.length === 0) {
        setResult({ success: false, message: 'Could not extract any deals. Try formatting with clear labels like "Title:", "Provider:", "Value:"' })
      }
    }, 500)
  }

  // Import extracted deals
  const handleImport = async () => {
    if (extractedDeals.length === 0) {
      setResult({ success: false, message: 'No deals to import' })
      return
    }

    setImporting(true)
    setResult(null)

    try {
      const response = await fetch('/api/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deals: extractedDeals })
      })

      const data = await response.json()
      if (data.success) {
        setResult({ success: true, message: data.message || `Imported ${extractedDeals.length} deals!` })
        setTimeout(() => onImport(), 1500)
      } else {
        setResult({ success: false, message: data.error || 'Import failed' })
      }
    } catch (err) {
      setResult({ success: false, message: 'Failed to import deals' })
    } finally {
      setImporting(false)
    }
  }

  // Update a single extracted deal
  const updateDeal = (index: number, field: string, value: string) => {
    setExtractedDeals(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  // Remove a deal from extraction
  const removeDeal = (index: number) => {
    setExtractedDeals(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-[1600px] w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b-3 border-black p-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Wand2 className="w-5 h-5" /> Universal Deal Importer
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6 space-y-6">
          {/* Mode Tabs */}
          <div className="flex gap-2 border-b-2 border-gray-200 pb-4">
            <button onClick={() => setMode('text')} className={`px-4 py-2 font-bold border-2 border-black ${mode === 'text' ? 'bg-[#13b6ec] text-white' : 'bg-white'}`}>
              <FileText className="w-4 h-4 inline mr-2" /> Paste Text
            </button>
            <button onClick={() => setMode('json')} className={`px-4 py-2 font-bold border-2 border-black ${mode === 'json' ? 'bg-[#13b6ec] text-white' : 'bg-white'}`}>
              <FileJson className="w-4 h-4 inline mr-2" /> JSON
            </button>
            <button onClick={() => setMode('csv')} className={`px-4 py-2 font-bold border-2 border-black ${mode === 'csv' ? 'bg-[#13b6ec] text-white' : 'bg-white'}`}>
              <FileSpreadsheet className="w-4 h-4 inline mr-2" /> CSV
            </button>
            <button onClick={() => setMode('file')} className={`px-4 py-2 font-bold border-2 border-black ${mode === 'file' ? 'bg-[#13b6ec] text-white' : 'bg-white'}`}>
              <Upload className="w-4 h-4 inline mr-2" /> Upload File
            </button>
          </div>

          {/* File Upload Area */}
          {mode === 'file' && (
            <div className="bg-blue-50 border-2 border-dashed border-blue-400 p-8 text-center">
              <input type="file" ref={fileInputRef} accept=".json,.csv,.txt,.md" onChange={handleFileUpload} className="hidden" />
              <Upload className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <p className="font-bold text-lg mb-2">Drop your file here or click to upload</p>
              <p className="text-gray-600 mb-4">Supports: JSON, CSV, TXT, MD files</p>
              <button onClick={() => fileInputRef.current?.click()} className="px-6 py-3 bg-blue-500 text-white border-2 border-black font-bold hover:bg-blue-600">
                Choose File
              </button>
              {selectedFile && <p className="mt-4 text-sm text-gray-600">Selected: {selectedFile.name}</p>}
            </div>
          )}

          {/* Text Input */}
          {mode === 'text' && (
            <div className="space-y-4">
              <div className="bg-yellow-50 border-2 border-yellow-400 p-4">
                <h3 className="font-bold mb-2">💡 Smart Text Extraction</h3>
                <p className="text-sm text-gray-700">Paste any text containing deal information. The system will automatically extract deal details. For best results, include labels like "Title:", "Company:", "Value:", "URL:"</p>
              </div>
              <textarea
                rows={12}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black font-mono text-sm"
                placeholder={`Example formats:

AWS Activate - $100K Credits
Provider: Amazon Web Services
Value: Up to $100,000 in credits
Description: Cloud credits for startups
URL: https://aws.amazon.com/activate

---

Or just paste any text with deal information and we'll extract it!`}
              />
              <button 
                onClick={handleExtractFromText} 
                disabled={!textInput.trim() || extracting}
                className="px-6 py-2 bg-purple-500 text-white border-2 border-black font-bold hover:bg-purple-600 disabled:opacity-50 flex items-center gap-2"
              >
                {extracting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                Extract Deals
              </button>
            </div>
          )}

          {/* JSON Input */}
          {mode === 'json' && (
            <div className="space-y-4">
              <textarea
                rows={12}
                value={textInput}
                onChange={(e) => {
                  setTextInput(e.target.value)
                  try {
                    const data = JSON.parse(e.target.value)
                    setExtractedDeals(Array.isArray(data) ? data : (data.deals || []))
                  } catch { setExtractedDeals([]) }
                }}
                className="w-full px-4 py-3 border-2 border-black font-mono text-sm"
                placeholder='[{"title": "Deal Name", "provider": "Company", "category": "saas-discounts", "value": "$100", "description": "...", "applicationUrl": "https://..."}]'
              />
            </div>
          )}

          {/* CSV Input */}
          {mode === 'csv' && (
            <div className="space-y-4">
              <div className="bg-green-50 border-2 border-green-400 p-4">
                <h3 className="font-bold mb-2">📊 CSV Format</h3>
                <p className="text-sm text-gray-700">First row should be headers: title, provider, category, value, description, applicationUrl</p>
              </div>
              <textarea
                rows={12}
                value={textInput}
                onChange={(e) => {
                  setTextInput(e.target.value)
                  setExtractedDeals(parseCSV(e.target.value))
                }}
                className="w-full px-4 py-3 border-2 border-black font-mono text-sm"
                placeholder={`title,provider,category,value,description,applicationUrl
"AWS Activate","Amazon Web Services","cloud-credits","$100K","Cloud credits for startups","https://aws.amazon.com/activate"
"Stripe Atlas","Stripe","business","$500 off","Startup incorporation","https://stripe.com/atlas"`}
              />
            </div>
          )}

          {/* Extracted Deals Preview */}
          {extractedDeals.length > 0 && (
            <div className="bg-green-50 border-2 border-green-500 p-4">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Extracted {extractedDeals.length} Deal(s) - Review & Edit
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {extractedDeals.map((deal, index) => (
                  <div key={index} className="bg-white border-2 border-gray-300 p-4">
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-gray-800 text-white px-2 py-1 text-xs font-bold">Deal #{index + 1}</span>
                      <button onClick={() => removeDeal(index)} className="text-red-500 hover:text-red-700 text-sm font-bold">Remove</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-gray-600">Title</label>
                        <input type="text" value={deal.title} onChange={(e) => updateDeal(index, 'title', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 text-sm" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-600">Provider</label>
                        <input type="text" value={deal.provider} onChange={(e) => updateDeal(index, 'provider', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 text-sm" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-600">Category</label>
                        <select value={deal.category} onChange={(e) => updateDeal(index, 'category', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 text-sm bg-white">
                          {dealCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-600">Value</label>
                        <input type="text" value={deal.value} onChange={(e) => updateDeal(index, 'value', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 text-sm" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs font-bold text-gray-600">Application URL</label>
                        <input type="text" value={deal.applicationUrl} onChange={(e) => updateDeal(index, 'applicationUrl', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 text-sm" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Result Message */}
          {result && (
            <div className={`p-4 border-2 flex items-center gap-2 ${result.success ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
              {result.success ? <CheckCircle className="w-5 h-5 text-green-600" /> : <AlertCircle className="w-5 h-5 text-red-600" />}
              <span className={result.success ? 'text-green-700' : 'text-red-700'}>{result.message}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t-2 border-gray-200">
            <button onClick={onClose} className="px-6 py-2 border-2 border-black font-bold hover:bg-gray-100">Cancel</button>
            <button 
              onClick={handleImport} 
              disabled={importing || extractedDeals.length === 0}
              className="px-6 py-2 bg-green-500 text-white border-2 border-black font-bold hover:bg-green-600 disabled:opacity-50 flex items-center gap-2"
            >
              {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
              Import {extractedDeals.length} Deal(s)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
