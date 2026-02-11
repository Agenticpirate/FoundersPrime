'use client'

import { useState, useRef, useCallback } from 'react'
import { dealCategories } from '@/lib/deals-database'

interface SmartDealImporterProps {
  onClose: () => void
  onImport: () => void
}

interface ParsedDeal {
  title: string
  provider: string
  category: string
  value: string
  description: string
  applicationUrl: string
  eligibility?: string[]
  tags?: string[]
  status?: string
  [key: string]: any
}

interface FieldMapping {
  sourceField: string
  targetField: string
  sampleValue: string
}

const TARGET_FIELDS = [
  { key: 'title', label: 'Title', required: true },
  { key: 'provider', label: 'Provider/Company', required: true },
  { key: 'value', label: 'Value/Discount', required: true },
  { key: 'description', label: 'Description', required: true },
  { key: 'applicationUrl', label: 'URL/Link', required: true },
  { key: 'category', label: 'Category', required: false },
  { key: 'eligibility', label: 'Eligibility', required: false },
  { key: 'tags', label: 'Tags', required: false },
  { key: 'status', label: 'Status', required: false },
]

export default function SmartDealImporter({ onClose, onImport }: SmartDealImporterProps) {
  const [step, setStep] = useState<'upload' | 'mapping' | 'preview' | 'importing'>('upload')
  const [rawData, setRawData] = useState<any[]>([])
  const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>([])
  const [parsedDeals, setParsedDeals] = useState<ParsedDeal[]>([])
  const [importing, setImporting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<{ success: number; failed: number; errors: string[] } | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [inputText, setInputText] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Smart field name matching
  const guessTargetField = (sourceField: string): string => {
    const field = sourceField.toLowerCase().replace(/[_-]/g, ' ')
    const mappings: Record<string, string[]> = {
      title: ['title', 'name', 'deal', 'offer', 'deal name', 'offer name'],
      provider: ['provider', 'company', 'vendor', 'brand', 'from', 'by', 'company name'],
      value: ['value', 'discount', 'amount', 'price', 'savings', 'worth', 'credits', 'deal value'],
      description: ['description', 'details', 'about', 'summary', 'info', 'content', 'body'],
      applicationUrl: ['url', 'link', 'apply', 'website', 'application url', 'apply url', 'href'],
      category: ['category', 'type', 'kind', 'group', 'section'],
      eligibility: ['eligibility', 'requirements', 'who', 'eligible', 'criteria'],
      tags: ['tags', 'keywords', 'labels'],
      status: ['status', 'state', 'active'],
    }
    
    for (const [target, sources] of Object.entries(mappings)) {
      if (sources.some(s => field.includes(s) || s.includes(field))) {
        return target
      }
    }
    return ''
  }

  // Parse various input formats
  const parseInput = useCallback((input: string): any[] => {
    const trimmed = input.trim()
    
    // Try JSON first
    try {
      const json = JSON.parse(trimmed)
      return Array.isArray(json) ? json : (json.deals || json.data || [json])
    } catch {}

    // Try CSV
    if (trimmed.includes(',') && trimmed.includes('\n')) {
      const lines = trimmed.split('\n').filter(l => l.trim())
      if (lines.length >= 2) {
        const headers = parseCSVLine(lines[0])
        const data: any[] = []
        for (let i = 1; i < lines.length; i++) {
          const values = parseCSVLine(lines[i])
          if (values.length >= headers.length) {
            const obj: any = {}
            headers.forEach((h, idx) => { obj[h.trim()] = values[idx]?.trim() || '' })
            data.push(obj)
          }
        }
        if (data.length > 0) return data
      }
    }

    // Try line-by-line key:value format
    const deals: any[] = []
    const sections = trimmed.split(/\n\n+|\n---+\n/)
    
    for (const section of sections) {
      const deal: any = {}
      const lines = section.split('\n')
      
      for (const line of lines) {
        const colonIdx = line.indexOf(':')
        if (colonIdx > 0) {
          const key = line.slice(0, colonIdx).trim()
          const value = line.slice(colonIdx + 1).trim()
          if (key && value) deal[key] = value
        }
      }
      
      // Extract URL if not found
      if (!deal.url && !deal.applicationUrl && !deal.link) {
        const urlMatch = section.match(/https?:\/\/[^\s<>"{}|\\^`\[\]]+/i)
        if (urlMatch) deal.url = urlMatch[0]
      }
      
      // Extract value pattern if not found
      if (!deal.value && !deal.discount && !deal.amount) {
        const valueMatch = section.match(/\$[\d,]+[KMB]?\+?|\d+%\s*(?:off|discount)?/i)
        if (valueMatch) deal.value = valueMatch[0]
      }
      
      if (Object.keys(deal).length > 0) deals.push(deal)
    }
    
    // If still no deals, treat entire text as single deal
    if (deals.length === 0 && trimmed) {
      const lines = trimmed.split('\n').filter(l => l.trim())
      const deal: any = { title: lines[0] || 'Untitled', description: trimmed.slice(0, 500) }
      const urlMatch = trimmed.match(/https?:\/\/[^\s]+/)
      if (urlMatch) deal.url = urlMatch[0]
      const valueMatch = trimmed.match(/\$[\d,]+[KMB]?\+?|\d+%/i)
      if (valueMatch) deal.value = valueMatch[0]
      deals.push(deal)
    }
    
    return deals
  }, [])

  const parseCSVLine = (line: string): string[] => {
    const result: string[] = []
    let current = ''
    let inQuotes = false
    for (const char of line) {
      if (char === '"') inQuotes = !inQuotes
      else if (char === ',' && !inQuotes) { result.push(current); current = '' }
      else current += char
    }
    result.push(current)
    return result.map(s => s.replace(/^"|"$/g, '').trim())
  }

  // Handle file upload
  const handleFile = async (file: File) => {
    try {
      const text = await file.text()
      processInput(text)
    } catch (err) {
      alert('Failed to read file')
    }
  }

  // Process input and detect fields
  const processInput = (input: string) => {
    const data = parseInput(input)
    if (data.length === 0) {
      alert('No data found. Please check your input format.')
      return
    }
    
    setRawData(data)
    
    // Auto-detect field mappings from first item
    const firstItem = data[0]
    const sourceFields = Object.keys(firstItem)
    const mappings: FieldMapping[] = sourceFields.map(sf => ({
      sourceField: sf,
      targetField: guessTargetField(sf),
      sampleValue: String(firstItem[sf] || '').slice(0, 100)
    }))
    
    setFieldMappings(mappings)
    setStep('mapping')
  }

  // Apply mappings and generate preview
  const applyMappings = () => {
    const deals: ParsedDeal[] = rawData.map(item => {
      const deal: ParsedDeal = {
        title: '',
        provider: '',
        category: 'saas-discounts',
        value: '',
        description: '',
        applicationUrl: '',
      }
      
      for (const mapping of fieldMappings) {
        if (mapping.targetField && item[mapping.sourceField] !== undefined) {
          const value = item[mapping.sourceField]
          if (mapping.targetField === 'eligibility' || mapping.targetField === 'tags') {
            deal[mapping.targetField] = Array.isArray(value) ? value : String(value).split(',').map(s => s.trim())
          } else {
            deal[mapping.targetField] = String(value)
          }
        }
      }
      
      // Auto-detect category if not mapped
      if (!deal.category || deal.category === 'saas-discounts') {
        deal.category = detectCategory(JSON.stringify(item))
      }
      
      return deal
    })
    
    setParsedDeals(deals)
    setStep('preview')
  }

  const detectCategory = (text: string): string => {
    const lower = text.toLowerCase()
    const keywords: Record<string, string[]> = {
      'cloud-credits': ['aws', 'azure', 'gcp', 'google cloud', 'cloud credits', 'infrastructure'],
      'ai': ['ai', 'artificial intelligence', 'machine learning', 'gpt', 'llm', 'openai'],
      'grants': ['grant', 'funding', 'non-dilutive', 'award'],
      'accelerators': ['accelerator', 'yc', 'y combinator', 'techstars'],
      'incubators': ['incubator', 'incubation'],
      'ad-credits': ['ad credits', 'advertising', 'google ads', 'facebook ads', 'meta ads'],
      'marketing': ['marketing', 'seo', 'email marketing', 'social media'],
      'development': ['developer', 'api', 'sdk', 'github', 'coding'],
      'finance': ['payment', 'banking', 'fintech', 'stripe', 'accounting'],
    }
    for (const [cat, kws] of Object.entries(keywords)) {
      if (kws.some(kw => lower.includes(kw))) return cat
    }
    return 'saas-discounts'
  }

  // Import deals
  const handleImport = async () => {
    setStep('importing')
    setImporting(true)
    setProgress(0)
    
    const results = { success: 0, failed: 0, errors: [] as string[] }
    const batchSize = 10
    
    for (let i = 0; i < parsedDeals.length; i += batchSize) {
      const batch = parsedDeals.slice(i, i + batchSize)
      
      try {
        const res = await fetch('/api/deals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deals: batch })
        })
        const data = await res.json()
        
        if (data.success) {
          results.success += batch.length
        } else {
          results.failed += batch.length
          results.errors.push(data.error || 'Unknown error')
        }
      } catch (err) {
        results.failed += batch.length
        results.errors.push('Network error')
      }
      
      setProgress(Math.round(((i + batch.length) / parsedDeals.length) * 100))
    }
    
    setResult(results)
    setImporting(false)
    
    if (results.success > 0) {
      setTimeout(() => onImport(), 2000)
    }
  }

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
    else if (e.type === 'dragleave') setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0])
  }

  // Update deal in preview
  const updateDeal = (index: number, field: string, value: string) => {
    setParsedDeals(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const removeDeal = (index: number) => {
    setParsedDeals(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0_0_#000] w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-4 border-b-4 border-black flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-white">🚀 Smart Deal Importer</h2>
            <p className="text-white/80 text-sm">Paste any format - we'll figure it out</p>
          </div>
          <button onClick={onClose} className="bg-white/20 hover:bg-white/30 text-white p-2 rounded">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Progress Steps */}
        <div className="bg-gray-100 border-b-2 border-black px-6 py-3">
          <div className="flex items-center gap-4">
            {['upload', 'mapping', 'preview', 'importing'].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-bold ${
                  step === s ? 'bg-cyan-500 text-white' : 
                  ['upload', 'mapping', 'preview', 'importing'].indexOf(step) > i ? 'bg-green-500 text-white' : 'bg-white'
                }`}>{i + 1}</div>
                <span className={`font-bold capitalize ${step === s ? 'text-cyan-600' : 'text-gray-500'}`}>{s}</span>
                {i < 3 && <div className="w-8 h-0.5 bg-gray-300" />}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Step 1: Upload */}
          {step === 'upload' && (
            <div className="space-y-6">
              {/* Drag & Drop Zone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-4 border-dashed p-12 text-center transition-colors ${
                  dragActive ? 'border-cyan-500 bg-cyan-50' : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,.csv,.txt,.md"
                  onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
                  className="hidden"
                />
                <div className="text-6xl mb-4">📁</div>
                <p className="text-xl font-bold mb-2">Drop your file here</p>
                <p className="text-gray-500 mb-4">Supports JSON, CSV, TXT files</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-cyan-500 text-white px-6 py-2 border-2 border-black font-bold hover:bg-cyan-600"
                >
                  Choose File
                </button>
              </div>

              <div className="text-center text-gray-500 font-bold">— OR —</div>

              {/* Text Input */}
              <div>
                <label className="font-bold block mb-2">Paste your data (JSON, CSV, or plain text)</label>
                <textarea
                  rows={10}
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  className="w-full p-4 border-2 border-black font-mono text-sm"
                  placeholder={`Paste any format:

JSON: [{"title": "AWS Credits", "provider": "Amazon", "value": "$100K"}]

CSV:
title,provider,value,url
AWS Credits,Amazon,$100K,https://aws.amazon.com

Or plain text:
Title: AWS Credits
Provider: Amazon
Value: $100K
URL: https://aws.amazon.com`}
                />
                <button
                  onClick={() => inputText.trim() && processInput(inputText)}
                  disabled={!inputText.trim()}
                  className="mt-4 bg-purple-500 text-white px-6 py-3 border-2 border-black font-bold hover:bg-purple-600 disabled:opacity-50"
                >
                  🔍 Analyze Data
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Field Mapping */}
          {step === 'mapping' && (
            <div className="space-y-6">
              <div className="bg-yellow-100 border-2 border-yellow-500 p-4">
                <p className="font-bold">📊 Found {rawData.length} items. Map the fields below:</p>
              </div>

              <div className="space-y-3">
                {fieldMappings.map((mapping, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 border-2 border-gray-200">
                    <div className="w-1/4">
                      <span className="font-mono text-sm bg-gray-200 px-2 py-1">{mapping.sourceField}</span>
                    </div>
                    <div className="text-2xl">→</div>
                    <div className="w-1/4">
                      <select
                        value={mapping.targetField}
                        onChange={e => {
                          const updated = [...fieldMappings]
                          updated[idx].targetField = e.target.value
                          setFieldMappings(updated)
                        }}
                        className="w-full p-2 border-2 border-black bg-white"
                      >
                        <option value="">-- Skip --</option>
                        {TARGET_FIELDS.map(f => (
                          <option key={f.key} value={f.key}>{f.label} {f.required ? '*' : ''}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1 text-sm text-gray-500 truncate" title={mapping.sampleValue}>
                      Sample: {mapping.sampleValue || '(empty)'}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep('upload')} className="px-6 py-2 border-2 border-black font-bold hover:bg-gray-100">
                  ← Back
                </button>
                <button onClick={applyMappings} className="px-6 py-2 bg-cyan-500 text-white border-2 border-black font-bold hover:bg-cyan-600">
                  Apply Mappings →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Preview */}
          {step === 'preview' && (
            <div className="space-y-6">
              <div className="bg-green-100 border-2 border-green-500 p-4 flex justify-between items-center">
                <p className="font-bold">✅ {parsedDeals.length} deals ready to import</p>
                <button
                  onClick={() => setParsedDeals(parsedDeals.filter(d => d.title && d.provider && d.applicationUrl))}
                  className="text-sm bg-white px-3 py-1 border border-green-500 font-bold"
                >
                  Remove Invalid
                </button>
              </div>

              <div className="space-y-4 max-h-[400px] overflow-auto">
                {parsedDeals.slice(0, 50).map((deal, idx) => (
                  <div key={idx} className="border-2 border-gray-300 p-4 bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-gray-800 text-white px-2 py-1 text-xs font-bold">#{idx + 1}</span>
                      <button onClick={() => removeDeal(idx)} className="text-red-500 hover:text-red-700 text-sm font-bold">✕ Remove</button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs font-bold text-gray-500">Title *</label>
                        <input
                          value={deal.title}
                          onChange={e => updateDeal(idx, 'title', e.target.value)}
                          className={`w-full p-2 border text-sm ${!deal.title ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500">Provider *</label>
                        <input
                          value={deal.provider}
                          onChange={e => updateDeal(idx, 'provider', e.target.value)}
                          className={`w-full p-2 border text-sm ${!deal.provider ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500">Value *</label>
                        <input
                          value={deal.value}
                          onChange={e => updateDeal(idx, 'value', e.target.value)}
                          className={`w-full p-2 border text-sm ${!deal.value ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500">Category</label>
                        <select
                          value={deal.category}
                          onChange={e => updateDeal(idx, 'category', e.target.value)}
                          className="w-full p-2 border border-gray-300 text-sm bg-white"
                        >
                          {dealCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs font-bold text-gray-500">URL *</label>
                        <input
                          value={deal.applicationUrl}
                          onChange={e => updateDeal(idx, 'applicationUrl', e.target.value)}
                          className={`w-full p-2 border text-sm ${!deal.applicationUrl ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {parsedDeals.length > 50 && (
                  <p className="text-center text-gray-500">...and {parsedDeals.length - 50} more deals</p>
                )}
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep('mapping')} className="px-6 py-2 border-2 border-black font-bold hover:bg-gray-100">
                  ← Back
                </button>
                <button
                  onClick={handleImport}
                  disabled={parsedDeals.length === 0}
                  className="px-6 py-3 bg-green-500 text-white border-2 border-black font-bold hover:bg-green-600 disabled:opacity-50"
                >
                  🚀 Import {parsedDeals.length} Deals
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Importing */}
          {step === 'importing' && (
            <div className="text-center py-12">
              {importing ? (
                <>
                  <div className="text-6xl mb-6 animate-bounce">⚡</div>
                  <h3 className="text-2xl font-bold mb-4">Importing Deals...</h3>
                  <div className="w-full max-w-md mx-auto bg-gray-200 h-4 border-2 border-black mb-4">
                    <div className="bg-cyan-500 h-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-gray-600">{progress}% complete</p>
                </>
              ) : result && (
                <>
                  <div className="text-6xl mb-6">{result.failed === 0 ? '🎉' : '⚠️'}</div>
                  <h3 className="text-2xl font-bold mb-4">Import Complete!</h3>
                  <div className="space-y-2 mb-6">
                    <p className="text-green-600 font-bold">✅ {result.success} deals imported successfully</p>
                    {result.failed > 0 && <p className="text-red-600 font-bold">❌ {result.failed} deals failed</p>}
                  </div>
                  <button onClick={onClose} className="px-6 py-3 bg-cyan-500 text-white border-2 border-black font-bold hover:bg-cyan-600">
                    Done
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
