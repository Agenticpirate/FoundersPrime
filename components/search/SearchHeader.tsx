export default function SearchHeader() {
  return (
    <div className="mb-4 md:mb-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs md:text-sm font-mono mb-4 md:mb-6">
        <a href="/" className="text-gray-500 hover:text-black transition-colors">
          Home
        </a>
        <span className="text-gray-400">/</span>
        <span className="text-black font-bold">Search</span>
      </nav>

      {/* Page Title */}
      <div className="text-center">
        <h1 className="font-mono text-2xl md:text-4xl font-bold text-black mb-2 md:mb-4">
          Universal Search
        </h1>
        <p className="font-sans text-sm md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Search across deals, startups, ideas, resources, and blog posts. Find exactly what you need with our powerful search and filtering system.
        </p>
      </div>
    </div>
  )
}