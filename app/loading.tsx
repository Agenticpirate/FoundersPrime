export default function Loading() {
  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center">
      <div className="text-center">
        {/* Loading Animation */}
        <div className="relative mb-4 md:mb-6">
          <div className="border-3 border-black bg-white p-8 shadow-[6px_6px_0px_#111111]">
            <div className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="h-4 w-4 bg-primary animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="h-4 w-4 bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="font-mono text-sm font-bold uppercase tracking-wide text-gray-600">
          Loading...
        </div>
        
        {/* Terminal Style Status */}
        <div className="mt-4 font-mono text-xs text-gray-400">
          <span className="text-primary">$</span> fetching data...
        </div>
      </div>
    </div>
  )
}
