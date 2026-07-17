import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import IdeaSaveButton from '@/components/ideas/IdeaSaveButton'
import {
  getAllIdeaSlugs,
  getAllIdeas,
  getIdeaBySlug,
  ideaSlugFromTitle,
} from '@/lib/ideas'

export const dynamic = 'force-static'
export const revalidate = 86400

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllIdeaSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const idea = getIdeaBySlug(params.slug)
  if (!idea) {
    return { title: 'Idea not found' }
  }
  const title = idea.title
  const description =
    idea.description?.slice(0, 155) ||
    `${idea.title} — startup idea in ${idea.category} on FoundersPrime.`
  const url = `https://www.foundersprime.com/ideas/${idea.slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | FoundersPrime Ideas`,
      description,
      url,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default function SingleIdeaPage({ params }: PageProps) {
  const idea = getIdeaBySlug(params.slug)
  if (!idea) notFound()

  const related = getAllIdeas()
    .filter((i) => i.category === idea.category && i.title !== idea.title)
    .slice(0, 4)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: idea.title,
    description: idea.description,
    author: {
      '@type': 'Person',
      name: idea.author || 'FoundersPrime',
    },
    articleSection: idea.category,
    keywords: (idea.tags || []).join(', '),
    mainEntityOfPage: `https://www.foundersprime.com/ideas/${idea.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'FoundersPrime',
      url: 'https://www.foundersprime.com',
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.foundersprime.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Ideas',
        item: 'https://www.foundersprime.com/ideas',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: idea.title,
        item: `https://www.foundersprime.com/ideas/${idea.slug}`,
      },
    ],
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50 dark:bg-[#000000] text-[#1a1a1a] dark:text-white">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbLd]) }}
          />

          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs">
            <ol className="flex flex-wrap items-center gap-1 text-gray-500">
              <li>
                <Link href="/" className="hover:text-black dark:hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/ideas" className="hover:text-black dark:hover:text-white">
                  Ideas
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-black dark:text-white font-semibold line-clamp-1">{idea.title}</li>
            </ol>
          </nav>

          <article className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0f0f0f] p-6 md:p-10 shadow-sm">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-700 dark:text-amber-300 font-mono text-[10px] font-bold uppercase">
                {idea.category}
              </span>
              {idea.source && (
                <span className="px-2.5 py-1 rounded-full border border-white/10 bg-black/5 dark:bg-white/5 font-mono text-[10px] font-bold uppercase text-gray-600 dark:text-gray-300">
                  {idea.source}
                </span>
              )}
              <div className="ml-auto">
                <IdeaSaveButton ideaId={idea.slug} variant="full" />
              </div>
            </div>

            <h1 className="font-heading text-3xl md:text-4xl font-black tracking-tight mb-4">
              {idea.title}
            </h1>

            {idea.tags && idea.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {idea.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md border border-gray-200 dark:border-white/10 text-[11px] font-mono text-gray-600 dark:text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h2 className="font-mono text-lg font-bold">Overview</h2>
              <p className="font-sans text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {idea.description}
              </p>
            </div>

            {idea.author && (
              <p className="mt-8 font-mono text-xs text-gray-500">
                Source / author: <span className="text-gray-800 dark:text-gray-200">{idea.author}</span>
              </p>
            )}

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/ideas"
                className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-white/15 font-mono text-xs font-bold uppercase hover:bg-gray-50 dark:hover:bg-white/5"
              >
                ← All ideas
              </Link>
              <Link
                href="/deals"
                className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-accent-yellow text-black font-mono text-xs font-bold uppercase"
              >
                Browse deals
              </Link>
            </div>
          </article>

          {related.length > 0 && (
            <section className="mt-12">
              <h2 className="font-mono text-sm font-bold uppercase tracking-wide text-gray-500 mb-4">
                Related ideas in {idea.category}
              </h2>
              <ul className="space-y-3">
                {related.map((r) => {
                  const slug = ideaSlugFromTitle(r.title)
                  return (
                    <li key={slug}>
                      <Link
                        href={`/ideas/${slug}`}
                        className="block rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0f0f0f] px-4 py-3 hover:border-amber-400/50 transition-colors"
                      >
                        <span className="font-mono text-sm font-bold">{r.title}</span>
                        <span className="block font-sans text-xs text-gray-500 line-clamp-2 mt-1">
                          {r.description}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
