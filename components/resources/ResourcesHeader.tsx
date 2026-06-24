import Link from 'next/link'

interface ResourcesHeaderProps {
  currentSection?: string
  parentSection?: { name: string; href: string }
}

export default function ResourcesHeader({
  currentSection,
  parentSection = { name: 'Resources', href: '/resources' }
}: ResourcesHeaderProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex mb-4 md:mb-5">
      <ol className="inline-flex items-center gap-1.5 font-mono text-[11px] md:text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
        <li>
          <Link className="hover:text-gray-900 dark:hover:text-white transition-colors" href="/">
            Home
          </Link>
        </li>
        <li className="text-gray-300 dark:text-white/20">/</li>
        {currentSection ? (
          <>
            <li>
              <Link className="hover:text-gray-900 dark:hover:text-white transition-colors" href={parentSection.href}>
                {parentSection.name}
              </Link>
            </li>
            <li className="text-gray-300 dark:text-white/20">/</li>
            <li aria-current="page">
              <span className="text-gray-950 dark:text-white font-semibold">{currentSection}</span>
            </li>
          </>
        ) : (
          <li aria-current="page">
            <span className="text-gray-950 dark:text-white font-semibold">{parentSection.name}</span>
          </li>
        )}
      </ol>
    </nav>
  )
}
