import PageBreadcrumb from '@/components/ui/PageBreadcrumb'

export default function SearchHeader() {
  return (
    <div className="mb-4 md:mb-6">
      <PageBreadcrumb
        className="mb-4 md:mb-6"
        items={[{ label: 'Home', href: '/' }, { label: 'Search' }]}
      />

      <div className="text-center">
        <h1 className="font-mono text-2xl md:text-4xl font-bold text-black dark:text-white mb-2 md:mb-4">
          Universal Search
        </h1>
        <p className="font-sans text-sm md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Search across deals, startups, ideas, resources, and blog posts. Find exactly what you need
          with our powerful search and filtering system.
        </p>
      </div>
    </div>
  )
}
