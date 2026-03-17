import Link from 'next/link'

interface DealsHeaderProps {
  parentSection?: {
    name: string
    href?: string
  }
  currentSection?: string
}

export default function DealsHeader({
  parentSection = { name: "Deals", href: "/deals" },
  currentSection = "All Deals"
}: DealsHeaderProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex mb-3 md:mb-5">
      <ol className="inline-flex items-center space-x-1 md:space-x-3 font-mono text-sm font-medium">
        <li className="inline-flex items-center">
          <Link className="text-gray-500 hover:text-black" href="/">Home</Link>
        </li>
        <li>
          <div className="flex items-center">
            <span className="material-symbols-outlined text-gray-400 text-base mx-1">chevron_right</span>
            {parentSection.href ? (
              <Link className="text-gray-500 hover:text-black" href={parentSection.href}>{parentSection.name}</Link>
            ) : (
              <span className="text-gray-500">{parentSection.name}</span>
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