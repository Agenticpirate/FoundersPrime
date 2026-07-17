import type { Metadata } from 'next'

const CATEGORY_META: Record<
  string,
  { title: string; description: string; h1: string }
> = {
  'cloud-credits': {
    title: 'Cloud Credits for Startups',
    description:
      'Verified cloud credits for startups: AWS Activate, Google for Startups, Microsoft Founders Hub, DigitalOcean, Cloudflare, and more. Apply with direct links.',
    h1: 'Cloud Credits',
  },
  'saas-discounts': {
    title: 'SaaS Discounts for Startups',
    description:
      'Verified SaaS discounts and free tiers for startups — Notion, Airtable, Linear, Stripe, HubSpot, Intercom, and hundreds more.',
    h1: 'SaaS Discounts',
  },
  'ad-credits': {
    title: 'Ad Credits for Startups',
    description:
      'Verified advertising credits for startups: Google Ads, LinkedIn Ads, Meta, TikTok, and more growth programs.',
    h1: 'Ad Credits',
  },
  grants: {
    title: 'Startup Grants & Non-Dilutive Funding',
    description:
      'Non-dilutive startup grants and funding programs. Browse verified opportunities with eligibility and apply links.',
    h1: 'Grants',
  },
  'startup-programs': {
    title: 'Startup Programs & Perks',
    description:
      'Verified startup programs, partner perks, and founder offers in one catalog.',
    h1: 'Startup Programs',
  },
}

export function dealsPageMetadata(opts: {
  category?: string
  q?: string
}): Metadata {
  const category = (opts.category || '').toLowerCase()
  const cat = CATEGORY_META[category]

  if (cat) {
    const url = `https://www.foundersprime.com/deals?category=${encodeURIComponent(category)}`
    return {
      title: cat.title,
      description: cat.description,
      alternates: { canonical: url },
      openGraph: {
        title: `${cat.title} | FoundersPrime`,
        description: cat.description,
        url,
      },
    }
  }

  if (opts.q) {
    return {
      title: `Search deals: ${opts.q}`,
      description: `Results for “${opts.q}” across verified startup deals, credits, and programs on FoundersPrime.`,
      alternates: {
        canonical: `https://www.foundersprime.com/deals?q=${encodeURIComponent(opts.q)}`,
      },
      robots: { index: false, follow: true },
    }
  }

  return {
    title: 'All Deals',
    description:
      'Browse verified startup deals, cloud credits, grants, SaaS discounts and accelerator programs.',
    alternates: {
      canonical: 'https://www.foundersprime.com/deals',
    },
    openGraph: {
      title: 'All Startup Deals | FoundersPrime',
      description:
        'Browse verified startup deals, cloud credits, grants, SaaS discounts and programs.',
      url: 'https://www.foundersprime.com/deals',
    },
  }
}

export function categoryLabel(category?: string): string | undefined {
  if (!category) return undefined
  return CATEGORY_META[category.toLowerCase()]?.h1 || category.replace(/-/g, ' ')
}
