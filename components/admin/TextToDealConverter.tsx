'use client'

import { useState } from 'react'

interface TextToDealConverterProps {
  onConvert: (dealData: any) => void
  onClose: () => void
}

export default function TextToDealConverter({ onConvert, onClose }: TextToDealConverterProps) {
  const [textInput, setTextInput] = useState('')
  const [extractedData, setExtractedData] = useState<any>(null)

  const extractDealFromText = () => {
    const text = textInput.trim()
    if (!text) return

    // Smart extraction patterns
    const extracted = {
      title: extractTitle(text),
      company: extractCompany(text),
      value: extractValue(text),
      description: extractDescription(text),
      link: extractLink(text),
      category: 'saas' // default
    }

    setExtractedData(extracted)
  }

  const extractTitle = (text: string): string => {
    // Look for common title patterns
    const patterns = [
      /^([^.\n]+)/,  // First line
      /Title:\s*(.+)/i,
      /Deal:\s*(.+)/i,
      /Offer:\s*(.+)/i
    ]

    for (const pattern of patterns) {
      const match = text.match(pattern)
      if (match && match[1]) {
        return match[1].trim()
      }
    }

    return 'Untitled Deal'
  }

  const extractCompany = (text: string): string => {
    const patterns = [
      /Company:\s*(.+)/i,
      /Provider:\s*(.+)/i,
      /From:\s*(.+)/i,
      /([A-Z][a-zA-Z0-9]+(?:\s+[A-Z][a-zA-Z0-9]+)*)\s+(?:offers?|provides?|gives?)/i
    ]

    for (const pattern of patterns) {
      const match = text.match(pattern)
      if (match && match[1]) {
        return match[1].trim()
      }
    }

    return 'Unknown Company'
  }

  const extractValue = (text: string): string => {
    const patterns = [
      /\$(\d+(?:,\d{3})*(?:\.\d{2})?)/,
      /(\d+)%\s*(?:off|discount)/i,
      /(\d+)\s*months?\s*free/i,
      /Value:\s*(.+)/i,
      /Worth:\s*(.+)/i,
      /(free|complimentary)/i
    ]

    for (const pattern of patterns) {
      const match = text.match(pattern)
      if (match) {
        return match[0]
      }
    }

    return 'Special Offer'
  }

  const extractDescription = (text: string): string => {
    // Remove URLs and clean up
    let desc = text.replace(/https?:\/\/[^\s]+/g, '').trim()
    
    // Take first few sentences or up to 200 chars
    const sentences = desc.split(/[.!?]+/)
    if (sentences.length > 1) {
      return sentences.slice(0, 2).join('. ') + '.'
    }
    
    return desc.length > 200 ? desc.substring(0, 200) + '...' : desc
  }

  const extractLink = (text: string): string => {
    const urlPattern = /https?:\/\/[^\s]+/g
    const match = text.match(urlPattern)
    return match ? match[0] : ''
  }

  const handleUseExtracted = () => {
    if (extractedData) {
      onConvert(extractedData)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white border-3 border-black shadow-hard max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Convert Text to Deal</h2>
              <p className="text-gray-600 mt-1">Paste deal information and we&apos;ll extract the key details</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Paste Deal Information
              </label>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                rows={15}
                className="w-full px-3 py-2 border-3 border-black focus:outline-none focus:shadow-hard font-mono text-sm"
                placeholder={`Paste any deal information here, for example:

AWS Activate Program
Company: Amazon Web Services
Get up to $100,000 in AWS credits for your startup
Perfect for early-stage companies building on cloud infrastructure
Apply at: https://aws.amazon.com/activate/
Requirements: Early-stage startup, less than 10 years old

Or just paste a link and description:
https://stripe.com/atlas - Stripe Atlas helps you incorporate your startup for free. Usually costs $500.`}
              />
              
              <button
                onClick={extractDealFromText}
                disabled={!textInput.trim()}
                className="mt-3 w-full bg-blue-500 text-white border-3 border-black shadow-hard px-4 py-2 font-bold hover:shadow-hard-hover hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50"
              >
                Extract Deal Information
              </button>
            </div>

            {/* Extracted Data Section */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Extracted Information
              </label>
              
              {extractedData ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border-2 border-green-300 p-4">
                    <h4 className="font-bold text-green-800 mb-2">✅ Successfully Extracted:</h4>
                    
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-bold text-gray-700">Title:</span>
                        <div className="bg-white border border-gray-300 p-2 mt-1">{extractedData.title}</div>
                      </div>
                      
                      <div>
                        <span className="font-bold text-gray-700">Company:</span>
                        <div className="bg-white border border-gray-300 p-2 mt-1">{extractedData.company}</div>
                      </div>
                      
                      <div>
                        <span className="font-bold text-gray-700">Value:</span>
                        <div className="bg-white border border-gray-300 p-2 mt-1">{extractedData.value}</div>
                      </div>
                      
                      <div>
                        <span className="font-bold text-gray-700">Description:</span>
                        <div className="bg-white border border-gray-300 p-2 mt-1">{extractedData.description}</div>
                      </div>
                      
                      {extractedData.link && (
                        <div>
                          <span className="font-bold text-gray-700">Link:</span>
                          <div className="bg-white border border-gray-300 p-2 mt-1 break-all">{extractedData.link}</div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={handleUseExtracted}
                        className="bg-primary border-3 border-black shadow-hard px-4 py-2 font-bold hover:shadow-hard-hover hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-sm"
                      >
                        Use This Data
                      </button>
                      <button
                        onClick={() => setExtractedData(null)}
                        className="bg-gray-200 border-3 border-black shadow-hard px-4 py-2 font-bold hover:shadow-hard-hover hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-sm"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border-2 border-gray-300 p-8 text-center text-gray-500">
                  <span className="material-symbols-outlined text-4xl mb-2 block">smart_toy</span>
                  <p>Paste your deal information and click &quot;Extract&quot; to see the magic!</p>
                </div>
              )}
            </div>
          </div>

          {/* Examples */}
          <div className="mt-6 bg-blue-50 border-3 border-black p-4">
            <h4 className="font-bold mb-2">💡 Examples of Text Formats That Work:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-bold">Structured Format:</div>
                <div className="bg-white border border-gray-300 p-2 mt-1 font-mono text-xs">
                  Title: AWS Activate<br/>
                  Company: Amazon<br/>
                  Value: $100K credits<br/>
                  Link: https://aws.com/activate
                </div>
              </div>
              <div>
                <div className="font-bold">Natural Text:</div>
                <div className="bg-white border border-gray-300 p-2 mt-1 font-mono text-xs">
                  Stripe offers free incorporation through Atlas. Usually costs $500. Apply at stripe.com/atlas
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t-2 border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 border-3 border-black shadow-hard font-bold hover:shadow-hard-hover hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}