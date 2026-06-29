'use client'

export default function ImportTroubleshoot() {
  return (
    <div className="bg-yellow-50 border-3 border-black p-6 mb-6">
      <h3 className="font-bold text-lg mb-4">🚨 Import Failed? Here&apos;s How to Fix It:</h3>
      
      <div className="space-y-4 text-sm">
        <div>
          <h4 className="font-bold text-red-600 mb-2">Common Issues & Solutions:</h4>
          
          <div className="space-y-3">
            <div className="bg-white border-2 border-gray-300 p-3">
              <div className="font-bold">❌ &quot;Title is required&quot; errors</div>
              <div className="text-gray-700 mt-1">
                <strong>Problem:</strong> Your JSON uses different field names (e.g., &quot;name&quot; instead of &quot;title&quot;)
              </div>
              <div className="text-green-700 mt-1">
                <strong>Solution:</strong> Use the &quot;Analyze &amp; Map&quot; tab to map your fields correctly
              </div>
            </div>
            
            <div className="bg-white border-2 border-gray-300 p-3">
              <div className="font-bold">❌ All deals skipped</div>
              <div className="text-gray-700 mt-1">
                <strong>Problem:</strong> JSON structure doesn&apos;t match expected format
              </div>
              <div className="text-green-700 mt-1">
                <strong>Solution:</strong> Check if your JSON is an array of objects: <code>[{"{...}"}, {"{...}"}]</code>
              </div>
            </div>
            
            <div className="bg-white border-2 border-gray-300 p-3">
              <div className="font-bold">❌ &quot;Invalid JSON&quot; error</div>
              <div className="text-gray-700 mt-1">
                <strong>Problem:</strong> JSON syntax is malformed
              </div>
              <div className="text-green-700 mt-1">
                <strong>Solution:</strong> Validate your JSON at <a href="https://jsonlint.com" target="_blank" className="text-blue-600 underline">jsonlint.com</a>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-blue-600 mb-2">Expected JSON Format:</h4>
          <div className="bg-gray-900 text-green-400 p-3 font-mono text-xs overflow-x-auto">
{`[
  {
    "title": "Deal Name",
    "company": "Company Name", 
    "category": "saas",
    "description": "Deal description...",
    "value": "$500",
    "link": "https://example.com/apply"
  }
]`}
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-purple-600 mb-2">Quick Fixes:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Make sure your JSON is an <strong>array</strong> (starts with [ and ends with ])</li>
            <li>Each deal should be an <strong>object</strong> (wrapped in curly braces)</li>
            <li>Use the <strong>&quot;Analyze &amp; Map&quot;</strong> tab if field names don&apos;t match</li>
            <li>Try the <strong>&quot;Sample Data&quot;</strong> tab to see working examples</li>
          </ul>
        </div>
      </div>
    </div>
  )
}