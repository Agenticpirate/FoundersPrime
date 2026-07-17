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

/** Stable URL slug — matches IdeaSaveButton.ideaIdFromTitle */
export function ideaSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
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
  return getAllIdeas().map((idea) => ideaSlugFromTitle(idea.title)).filter(Boolean)
}
