import PageBreadcrumb from '@/components/ui/PageBreadcrumb'

interface ResourcesHeaderProps {
  parentSection?: {
    name: string
    href: string
  }
  currentSection?: string
}

export default function ResourcesHeader({
  parentSection = { name: 'Resources', href: '/resources' },
  currentSection,
}: ResourcesHeaderProps) {
  const items = currentSection
    ? [
        { label: 'Home', href: '/' },
        { label: parentSection.name, href: parentSection.href },
        { label: currentSection },
      ]
    : [
        { label: 'Home', href: '/' },
        { label: parentSection.name },
      ]

  return <PageBreadcrumb className="mb-4 md:mb-5" items={items} />
}
