// Instant skeleton shown while DealsContent streams in
export default function DealsLoading() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
      {/* Thin top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-accent-yellow animate-pulse" />

      <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-2 lg:py-4 pt-20">
        {/* Hero skeleton */}
        <div className="h-24 md:h-32 bg-gray-100 border-2 border-gray-200 animate-pulse mb-4 rounded-sm" />

        <div className="flex gap-4 lg:gap-6 items-start">
          {/* Sidebar skeleton — desktop only */}
          <div className="w-56 flex-shrink-0 hidden lg:block">
            <div className="space-y-2">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-9 bg-gray-100 border border-gray-200 animate-pulse rounded-sm" style={{ animationDelay: `${i * 40}ms` }} />
              ))}
            </div>
          </div>

          {/* Grid skeleton */}
          <div className="flex-1 min-w-0">
            {/* Filter bar skeleton */}
            <div className="h-12 bg-gray-100 border-2 border-gray-200 animate-pulse mb-4 rounded-sm" />

            {/* Deal cards skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-gray-100 p-4 animate-pulse rounded-sm"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-sm flex-shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3 bg-gray-100 rounded w-3/4" />
                      <div className="h-2.5 bg-gray-100 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-2.5 bg-gray-100 rounded w-full" />
                    <div className="h-2.5 bg-gray-100 rounded w-5/6" />
                  </div>
                  <div className="h-6 bg-gray-100 rounded w-1/3 mb-3" />
                  <div className="h-8 bg-gray-100 rounded-sm w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
