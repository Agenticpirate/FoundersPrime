'use client'

import { useState } from 'react'

interface JSONAnalyzerProps {
  jsonData: string
  onFieldMapping: (mapping: Record<string, string>) => void
}

export default function JSONAnalyzer({ jsonData, onFieldMapping }: JSONAnalyzerProps) {
  const [analysis, setAnalysis] = useState<any>(null)
  const [fieldMapping, setFieldMapping] = useState<Record<string, string>>({})

  const analyzeJSON = () => {
    try {
      const data = JSON.parse(jsonData)
      const firstItem = Array.isArray(data) ? data[0] : data
      
      if (!firstItem) {
        setAnalysis({ error: 'No data found in JSON' })
        return
      }

      const fields = Object.keys(firstItem)
      const sampleValues = Object.entries(firstItem).reduce((acc, [key, value]) => {
        acc[key] = typeof value === 'string' ? value.substring(0, 50) + (value.length > 50 ? '...' : '') : value
        return acc
      }, {} as Record<string, any>)

      setAnalysis({
        totalItems: Array.isArray(data) ? data.length : 1,
        fields,
        sampleValues,
        structure: firstItem
      })

      // Auto-suggest field mappings
      const autoMapping: Record<string, string> = {}
      const requiredFields = ['title', 'company', 'category', 'description', 'value', 'link']
      
      requiredFields.forEach(required => {
        const match = fields.find(field => 
          field.toLowerCase().includes(required) || 
          required.includes(field.toLowerCase())
        )
        if (match) {
          autoMapping[required] = match
        }
      })
      
      setFieldMapping(autoMapping)
    } catch (error) {
      setAnalysis({ error: `Invalid JSON: ${error}` })
    }
  }

  const handleMappingChange = (targetField: string, sourceField: string) => {
    const newMapping = { ...fieldMapping, [targetField]: sourceField }
    setFieldMapping(newMapping)
    onFieldMapping(newMapping)
  }

  const requiredFields = [
    { key: 'title', label: 'Deal Title', required: true },
    { key: 'company', label: 'Company/Provider', required: true },
    { key: 'category', label: 'Category', required: true },
    { key: 'description', label: 'Description', required: true },
    { key: 'value', label: 'Deal Value', required: true },
    { key: 'link', label: 'Application Link', required: true },
    { key: 'requirements', label: 'Requirements', required: false },
    { key: 'expires', label: 'Expiry Date', required: false }
  ]

  return (
    <div className="space-y-6">
      {/* Analyze Button */}
      <div className="text-center">
        <button
          onClick={analyzeJSON}
          className="bg-blue-500 text-white border-3 border-black shadow-hard px-6 py-2 font-bold hover:shadow-hard-hover hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
        >
          Analyze JSON Structure
        </button>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="bg-white border-3 border-black shadow-hard p-6">
          {analysis.error ? (
            <div className="text-red-600 font-bold">{analysis.error}</div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-bold">Total Items:</span> {analysis.totalItems}
                </div>
                <div>
                  <span className="font-bold">Fields Found:</span> {analysis.fields.length}
                </div>
              </div>

              {/* Available Fields */}
              <div>
                <h4 className="font-bold mb-2">Available Fields:</h4>
                <div className="bg-gray-50 border-2 border-gray-300 p-3 max-h-40 overflow-y-auto">
                  {analysis.fields.map((field: string) => (
                    <div key={field} className="text-sm font-mono mb-1">
                      <span className="font-bold">{field}:</span> {JSON.stringify(analysis.sampleValues[field])}
                    </div>
                  ))}
                </div>
              </div>

              {/* Field Mapping */}
              <div>
                <h4 className="font-bold mb-3">Map Your Fields to FoundersPrime Structure:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {requiredFields.map(field => (
                    <div key={field.key} className="flex items-center gap-3">
                      <label className={`text-sm font-bold min-w-[120px] ${field.required ? 'text-red-600' : 'text-gray-600'}`}>
                        {field.label}{field.required && ' *'}:
                      </label>
                      <select
                        value={fieldMapping[field.key] || ''}
                        onChange={(e) => handleMappingChange(field.key, e.target.value)}
                        className="flex-1 px-2 py-1 border-2 border-black text-sm"
                      >
                        <option value="">-- Select Field --</option>
                        {analysis.fields.map((availableField: string) => (
                          <option key={availableField} value={availableField}>
                            {availableField}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview */}
              {Object.keys(fieldMapping).length > 0 && (
                <div>
                  <h4 className="font-bold mb-2">Preview Mapped Data:</h4>
                  <div className="bg-gray-50 border-2 border-gray-300 p-3 text-sm font-mono">
                    {requiredFields.map(field => {
                      const sourceField = fieldMapping[field.key]
                      const value = sourceField ? analysis.sampleValues[sourceField] : 'Not mapped'
                      return (
                        <div key={field.key} className="mb-1">
                          <span className="font-bold text-blue-600">{field.key}:</span> {JSON.stringify(value)}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}