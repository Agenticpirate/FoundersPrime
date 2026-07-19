export interface DealDescriptionInput {
  slug?: string | null
  provider?: string | null
  title?: string | null
  description?: string | null
  shortDescription?: string | null
}

export interface ResolvedDealDescription {
  description: string
  shortDescription: string
}

interface DealDescriptionFallback {
  slugs: readonly string[]
  identities: readonly string[]
  placeholderCopy: readonly string[]
  description: string
  shortDescription: string
}

const DESCRIPTION_FALLBACKS: readonly DealDescriptionFallback[] = [
  {
    slugs: ['instatus'],
    identities: ['instatus'],
    placeholderCopy: ['real-time status page creation tool'],
    description:
      'Create branded real-time status pages, communicate incidents, and keep customers updated—free on the Pro plan for one year.',
    shortDescription:
      'Create branded status pages, communicate incidents, and keep customers updated.',
  },
  {
    slugs: ['leadgen-app'],
    identities: ['leadgen app'],
    placeholderCopy: ['leadgen app'],
    description:
      'Build customizable multi-step lead capture forms with conditional logic, conversion analytics, A/B testing, and marketing integrations.',
    shortDescription:
      'Build customizable multi-step forms with conditional logic, analytics, and integrations to capture more leads.',
  },
]

function cleanText(value?: string | null): string {
  return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : ''
}

function normalizeIdentity(value?: string | null): string {
  return cleanText(value).toLowerCase()
}

function findFallback({ slug, provider, title }: DealDescriptionInput): DealDescriptionFallback | undefined {
  const normalizedSlug = normalizeIdentity(slug)
  const identities = [provider, title].map(normalizeIdentity)

  return DESCRIPTION_FALLBACKS.find((fallback) =>
    fallback.slugs.some(
      (candidate) => normalizedSlug === candidate || normalizedSlug.startsWith(`${candidate}-`)
    ) || fallback.identities.some((candidate) => identities.includes(candidate))
  )
}

function isPlaceholderCopy(value: string, fallback?: DealDescriptionFallback): boolean {
  if (!value || !fallback) return false
  const normalizedValue = normalizeIdentity(value)
  return fallback.placeholderCopy.some(
    (placeholder) => normalizedValue === normalizeIdentity(placeholder)
  )
}

/**
 * Resolves useful deal copy while preserving meaningful descriptions supplied
 * by the canonical data source. Known fallbacks repair empty or placeholder
 * catalog copy, and either existing field can backfill the other elsewhere.
 */
export function resolveDealDescription(input: DealDescriptionInput): ResolvedDealDescription {
  const description = cleanText(input.description)
  const shortDescription = cleanText(input.shortDescription)
  const fallback = findFallback(input)

  return {
    description:
      (!description || isPlaceholderCopy(description, fallback))
        ? fallback?.description || shortDescription
        : description,
    shortDescription:
      (!shortDescription || isPlaceholderCopy(shortDescription, fallback))
        ? fallback?.shortDescription || description
        : shortDescription,
  }
}
