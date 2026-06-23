import type { Metadata } from 'next'

const COUNTRY_NAMES: Record<string, string> = {
  us: 'United States',
  uk: 'United Kingdom',
  in: 'India',
  eu: 'Europe',
  sea: 'Southeast Asia',
  mena: 'Middle East & North Africa',
  af: 'Africa',
  global: 'Global',
}

interface Props {
  params: {
    country: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const countrySlug = (params.country || 'global').toLowerCase()
  const countryName = COUNTRY_NAMES[countrySlug] || 'Global'

  const title = `Startup Grants in ${countryName} | Non-Dilutive Funding`
  const description = `Verified startup grants, competitions, and non-dilutive capital in ${countryName} from government agencies, foundations, and global programs.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.foundersprime.com/deals/grants/${countrySlug}`,
      languages: {
        'en-US': 'https://www.foundersprime.com/deals/grants/us',
        'en-GB': 'https://www.foundersprime.com/deals/grants/uk',
        'en-IN': 'https://www.foundersprime.com/deals/grants/in',
        'x-default': 'https://www.foundersprime.com/deals/grants',
      },
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `https://www.foundersprime.com/deals/grants/${countrySlug}`,
      siteName: 'FoundersPrime',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default function LocalizedGrantsLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { country: string }
}) {
  const countrySlug = (params.country || 'global').toLowerCase()
  const countryName = COUNTRY_NAMES[countrySlug] || 'Global'

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Startup Grants in ${countryName}`,
    description: `Verified startup grants, competitions, and non-dilutive capital in ${countryName}.`,
    url: `https://www.foundersprime.com/deals/grants/${countrySlug}`,
    areaServed: {
      '@type': 'Country',
      name: countryName,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.foundersprime.com' },
        { '@type': 'ListItem', position: 2, name: 'Deals', item: 'https://www.foundersprime.com/deals' },
        { '@type': 'ListItem', position: 3, name: 'Grants', item: 'https://www.foundersprime.com/deals/grants' },
        { '@type': 'ListItem', position: 4, name: countryName, item: `https://www.foundersprime.com/deals/grants/${countrySlug}` },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  )
}
