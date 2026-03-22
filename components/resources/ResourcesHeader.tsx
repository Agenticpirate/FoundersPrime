import Link from 'next/link'

interface ResourcesHeaderProps {
  currentSection?: string
  parentSection?: { name: string; href: string }
}

export default function ResourcesHeader({
  currentSection,
  parentSection = { name: 'Student Benefits', href: '/student-benefits' }
}: ResourcesHeaderProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex mb-4 md:mb-6">
      <ol className="inline-flex items-center space-x-1 md:space-x-3 font-mono text-sm font-medium">
        <li className="inline-flex items-center">
          <Link className="text-gray-500 hover:text-black" href="/">Home</Link>
        </li>
        <li>
          <div className="flex items-center">
            <span className="material-symbols-outlined text-gray-400 text-base mx-1">chevron_right</span>
            {currentSection ? (
              <Link className="text-gray-500 hover:text-black" href={parentSection.href}>{parentSection.name}</Link>
            ) : (
              <span className="text-black bg-primary/20 px-2 py-0.5 rounded-sm border border-black" aria-current="page">{parentSection.name}</span>
            )}
          </div>
        </li>
        {currentSection && (
          <li aria-current="page">
            <div className="flex items-center">
              <span className="material-symbols-outlined text-gray-400 text-base mx-1">chevron_right</span>
              <span className="text-black bg-primary/20 px-2 py-0.5 rounded-sm border border-black">{currentSection}</span>
            </div>
          </li>
        )}
      </ol>
    </nav>
  )
}