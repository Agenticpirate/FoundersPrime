'use client'

import { Suspense, useMemo } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import PageBreadcrumb from '@/components/ui/PageBreadcrumb'

interface DealsHeaderProps {
  parentSection?: {
    name: string
    href?: string
  }
  currentSection?: string
  /**
   * When true (default on catalog pages), breadcrumb reflects live URL
   * (?type= / ?category= / path segment) so sidebar filters update the trail.
   */
  syncFromUrl?: boolean
}

const PROGRAM_LABELS: Record<string, string> = {
  all: 'All Programs',
  accelerators: 'Accelerators',
  incubators: 'Incubators',
  grants: 'Grants',
}

const STUDENT_LABELS: Record<string, string> = {
  all: 'All Benefits',
  'free-access': 'Campus Edge',
  'credits-savings': 'Credits & Savings',
  funding: 'Funding & Opps',
  programs: 'Programs',
}

const DEAL_CATEGORY_LABELS: Record<string, string> = {
  'cloud-credits': 'Cloud Credits',
  'saas-discounts': 'SaaS Discounts',
  'ad-credits': 'Ad Credits',
  grants: 'Grants',
  'startup-programs': 'Startup Programs',
}

function titleCaseSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function DealsHeaderInner({
  parentSection,
  currentSection,
  syncFromUrl = true,
}: DealsHeaderProps) {
  const pathname = usePathname() || '/'
  const searchParams = useSearchParams()

  const { parent, section } = useMemo(() => {
    const fallbackParent = parentSection || { name: 'Deals', href: '/deals' }
    const fallbackSection = currentSection ?? 'All Deals'

    if (!syncFromUrl) {
      return { parent: fallbackParent, section: fallbackSection }
    }

    // ── Programs catalog ──
    if (pathname === '/programs' || pathname.startsWith('/programs/')) {
      const pathType = pathname.match(/^\/programs\/(accelerators|incubators|grants)(?:\/|$)/)?.[1]
      // Query type wins (sidebar soft-nav); else path segment; else all
      const rawType = searchParams.get('type') || pathType || 'all'
      const type = PROGRAM_LABELS[rawType] ? rawType : 'all'
      return {
        parent: { name: 'Programs', href: '/programs' },
        section: PROGRAM_LABELS[type],
      }
    }

    // ── Deals catalog (not detail slug pages) ──
    if (pathname === '/deals' || pathname === '/deals/') {
      const category = (searchParams.get('category') || '').toLowerCase()
      if (!category) {
        return {
          parent: { name: 'Deals', href: '/deals' },
          section: 'All Deals',
        }
      }
      return {
        parent: { name: 'Deals', href: '/deals' },
        section: DEAL_CATEGORY_LABELS[category] || titleCaseSlug(category),
      }
    }

    // Legacy /deals/{accelerators|incubators|grants} routes
    const dealsType = pathname.match(/^\/deals\/(accelerators|incubators|grants)(?:\/|$)/)?.[1]
    if (dealsType) {
      return {
        parent: { name: 'Programs', href: '/programs' },
        section: PROGRAM_LABELS[dealsType] || titleCaseSlug(dealsType),
      }
    }

    // ── Student benefits list (not /student-benefits/[slug]) ──
    if (pathname === '/student-benefits') {
      const rawType = searchParams.get('type') || 'all'
      const type = STUDENT_LABELS[rawType] ? rawType : 'all'
      return {
        parent: { name: 'Student Benefits', href: '/student-benefits' },
        section: STUDENT_LABELS[type],
      }
    }

    return { parent: fallbackParent, section: fallbackSection }
  }, [pathname, searchParams, parentSection, currentSection, syncFromUrl])

  const items = [
    { label: 'Home', href: '/' },
    {
      label: parent.name,
      href: section ? parent.href : undefined,
    },
    ...(section ? [{ label: section }] : []),
  ]

  return <PageBreadcrumb items={items} />
}

function DealsHeaderFallback({
  parentSection = { name: 'Deals', href: '/deals' },
  currentSection = 'All Deals',
}: DealsHeaderProps) {
  const items = [
    { label: 'Home', href: '/' },
    {
      label: parentSection.name,
      href: currentSection ? parentSection.href : undefined,
    },
    ...(currentSection ? [{ label: currentSection }] : []),
  ]
  return <PageBreadcrumb items={items} />
}

/**
 * Catalog breadcrumb — stays in sync with sidebar filters via URL
 * (?type= / ?category= / /programs/{type}).
 */
export default function DealsHeader(props: DealsHeaderProps) {
  return (
    <Suspense fallback={<DealsHeaderFallback {...props} />}>
      <DealsHeaderInner {...props} />
    </Suspense>
  )
}
