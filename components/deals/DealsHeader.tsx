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
    <nav aria-label="Breadcrumb" className="flex mb-3 md:mb-3.5">
      <ol className="inline-flex items-center gap-1.5 font-mono text-[11px] md:text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
        <li>
          <Link className="hover:text-gray-900 dark:hover:text-white transition-colors" href="/">Home</Link>
        </li>
        <li className="text-gray-300 dark:text-white/20">/</li>
        <li>
          {parentSection.href ? (
            <Link className="hover:text-gray-900 dark:hover:text-white transition-colors" href={parentSection.href}>{parentSection.name}</Link>
          ) : (
            <span>{parentSection.name}</span>
          )}
        </li>
        {currentSection && (
          <>
            <li className="text-gray-300 dark:text-white/20">/</li>
            <li aria-current="page">
              <span className="text-gray-900 dark:text-white font-semibold">{currentSection}</span>
            </li>
          </>
        )}
      </ol>
    </nav>
  )
}
