export default function DealLoading() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-accent-yellow animate-pulse" />

      <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-6 pt-20 w-full">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-4 w-12 bg-gray-100 rounded-sm animate-pulse" />
          <div className="h-4 w-4 bg-gray-100 rounded-sm" />
          <div className="h-4 w-14 bg-gray-100 rounded-sm animate-pulse" />
          <div className="h-4 w-4 bg-gray-100 rounded-sm" />
          <div className="h-6 w-40 bg-gray-100 rounded-sm animate-pulse" />
        </div>

        {/* Header skeleton */}
        <div className="bg-white border-2 border-gray-200 p-5 mb-6 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gray-100 rounded-sm flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-6 bg-gray-100 rounded w-2/3" />
              <div className="h-4 bg-gray-100 rounded w-1/3" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar skeleton */}
          <div className="lg:col-span-1 order-first lg:order-last">
            <div className="bg-white border-2 border-gray-200 p-5 animate-pulse space-y-4">
              <div className="h-5 bg-gray-100 rounded w-1/2" />
              <div className="h-8 bg-gray-100 rounded w-2/3" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-full" />
              </div>
              <div className="h-12 bg-gray-200 rounded-sm w-full" />
            </div>
          </div>

          {/* Main content skeleton */}
          <div className="lg:col-span-2 space-y-4 order-last lg:order-first">
            {/* Stats bar */}
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white border-2 border-gray-200 p-3 animate-pulse" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="h-3 bg-gray-100 rounded w-1/2 mb-2" />
                  <div className="h-5 bg-gray-100 rounded w-2/3" />
                </div>
              ))}
            </div>

            {/* Content sections */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white border-2 border-gray-200 p-5 animate-pulse space-y-3" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="h-5 bg-gray-100 rounded w-1/3 mb-3" />
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-5/6" />
                <div className="h-3 bg-gray-100 rounded w-4/6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
