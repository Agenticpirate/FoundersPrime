/** Header nav matching helpers + mobile section config. */

/** Section-level match: path matches (ignores most query params). */
export function navIsActive(pathname: string, _search: string, href: string): boolean {
  if (!href || href === '#') return false
  try {
    const url = new URL(href, 'http://local')
    if (url.pathname === '/') return pathname === '/'
    return pathname === url.pathname || pathname.startsWith(`${url.pathname}/`)
  } catch {
    return pathname === href
  }
}

/** Exact dropdown match: path + relevant query (category / type). */
export function navIsExact(pathname: string, search: string, href: string): boolean {
  if (!href || href === '#') return false
  try {
    const url = new URL(href, 'http://local')
    if (url.pathname !== pathname) return false
    const have = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
    const want = url.searchParams
    if ([...want.keys()].length === 0) {
      // "All X" — active only when no category/type filter is set
      return !have.get('category') && !have.get('type')
    }
    for (const [k, v] of want.entries()) {
      if (have.get(k) !== v) return false
    }
    return true
  } catch {
    return false
  }
}

export type PlanType = 'free' | 'nextfounder' | 'founder' | 'legend'

export type PlanBadge = {
  label: string
  className: string
  style: {
    background: string
    color: string
    boxShadow?: string
  }
}

// Maps a paid plan to its display badge. Inline color tokens guarantee these
// dynamic plan styles render even when Tailwind does not scan this lib file.
export const PLAN_BADGES: Record<Exclude<PlanType, 'free'>, PlanBadge> = {
  nextfounder: {
    label: 'Next Founder',
    className: 'ring-1 ring-inset ring-sky-100/80',
    style: {
      background: 'linear-gradient(135deg, #E0F2FE 0%, #38BDF8 55%, #0284C7 100%)',
      color: '#020617',
      boxShadow: '0 0 10px rgba(56, 189, 248, 0.28)',
    },
  },
  founder: {
    label: 'Founder',
    className: 'ring-1 ring-inset ring-yellow-100/80',
    style: {
      background: 'linear-gradient(135deg, #FEF9C3 0%, #FFD500 58%, #F59E0B 100%)',
      color: '#050505',
      boxShadow: '0 0 10px rgba(255, 213, 0, 0.3)',
    },
  },
  legend: {
    label: 'Legend',
    className: 'ring-1 ring-inset ring-amber-200/80',
    style: {
      background: 'linear-gradient(135deg, #FDE68A 0%, #FBBF24 50%, #F97316 100%)',
      color: '#050505',
      boxShadow: '0 0 12px rgba(251, 191, 36, 0.32)',
    },
  },
}

export const mobileNavSections = [
  {
    id: 'deals',
    label: 'Deals',
    href: '/deals',
    icon: 'local_offer',
    children: [
      { label: 'All deals', href: '/deals', icon: 'grid_view', colorClass: 'text-accent-yellow' },
      { label: 'Cloud Credits', href: '/deals?category=cloud-credits', icon: 'cloud', colorClass: 'text-sky-400' },
      { label: 'SaaS & Tools', href: '/deals?category=saas-discounts', icon: 'apps', colorClass: 'text-purple-400' },
      { label: 'Ad Credits', href: '/deals?category=ad-credits', icon: 'campaign', colorClass: 'text-pink-400' },
    ],
  },
  {
    id: 'programs',
    label: 'Programs',
    href: '/programs',
    icon: 'rocket_launch',
    children: [
      { label: 'All Programs', href: '/programs', icon: 'grid_view', colorClass: 'text-accent-yellow' },
      { label: 'Accelerators', href: '/programs?type=accelerators', icon: 'rocket_launch', colorClass: 'text-orange-400' },
      { label: 'Incubators', href: '/programs?type=incubators', icon: 'lightbulb', colorClass: 'text-violet-400' },
      { label: 'Grants', href: '/programs?type=grants', icon: 'payments', colorClass: 'text-sky-400' },
    ],
  },
  {
    id: 'studentbenefits',
    label: 'Students',
    href: '/student-benefits',
    icon: 'school',
    children: [
      { label: 'Credits & Savings', href: '/student-benefits?type=credits-savings', icon: 'savings', colorClass: 'text-sky-400' },
      { label: 'Campus Edge', href: '/student-benefits?type=free-access', icon: 'workspace_premium', colorClass: 'text-violet-400' },
      { label: 'Funding & Opportunities', href: '/student-benefits?type=funding', icon: 'monetization_on', colorClass: 'text-orange-400' },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    href: '/resources',
    icon: 'folder_open',
    children: [
      { label: 'Startup Ideas', href: '/ideas', icon: 'emoji_objects', colorClass: 'text-accent-yellow' },
      { label: 'Founder Vault', href: '/resources', icon: 'lock', colorClass: 'text-violet-400' },
      { label: 'Contact', href: '/contact', icon: 'mail', colorClass: 'text-gray-400' },
    ],
  },
] as const
