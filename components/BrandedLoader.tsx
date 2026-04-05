export default function BrandedLoader() {
  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="w-12 h-12 border-3 border-black bg-white flex items-center justify-center shadow-[4px_4px_0px_#111]">
          <img src="/logo.svg" alt="" className="w-7 h-7 object-contain animate-pulse" />
        </div>
        <div className="font-mono text-lg font-bold tracking-tight text-black">
          <span>FOUNDERS</span>
          <span className="text-blue-600">[</span>
          <span>PRIME</span>
          <span className="text-blue-600">]</span>
        </div>
        <div className="w-32 h-0.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-black rounded-full animate-loading-bar" />
        </div>
        <style>{`
          @keyframes loading-bar {
            0% { width: 0%; margin-left: 0; }
            50% { width: 60%; margin-left: 20%; }
            100% { width: 0%; margin-left: 100%; }
          }
          .animate-loading-bar {
            animation: loading-bar 1.2s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  )
}
