import ideasData from '@/data/startup_ideas.json'

export type StartupIdea = {
  title: string
  description: string
  author?: string
  category: string
  source?: string
  tags?: string[]
  itchScore?: string
}

/** Stable URL slug / save-id from an idea title */
export function ideaSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

/** Alias used by save button / cards (same algorithm as ideaSlugFromTitle) */
export const ideaIdFromTitle = ideaSlugFromTitle

/** Stable pseudo-signal from title when itchScore missing (Ideas grid sort/cards) */
export function getSignalScore(title: string, itchScore?: string): number {
  if (itchScore) {
    const n = parseInt(itchScore, 10)
    if (!Number.isNaN(n)) return Math.min(99, Math.max(1, n))
  }
  let hash = 0
  for (let i = 0; i < title.length; i++) hash = ((hash << 5) - hash + title.charCodeAt(i)) | 0
  return 75 + (Math.abs(hash) % 25)
}

export function getAllIdeas(): StartupIdea[] {
  return (ideasData as StartupIdea[]) || []
}

export function getIdeaBySlug(slug: string): (StartupIdea & { slug: string }) | null {
  const all = getAllIdeas()
  const match = all.find((idea) => ideaSlugFromTitle(idea.title) === slug)
  if (!match) return null
  return { ...match, slug }
}

export function getAllIdeaSlugs(): string[] {
  return getAllIdeas().flatMap((idea) => {
    const slug = ideaSlugFromTitle(idea.title)
    return slug ? [slug] : []
  })
}
