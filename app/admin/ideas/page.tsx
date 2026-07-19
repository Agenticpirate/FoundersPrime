'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminStatCard from '@/components/admin/ui/AdminStatCard'
import ideasData from '@/data/startup_ideas.json'
import { ideaIdFromTitle } from '@/lib/ideas'

type Idea = {
  title: string
  description: string
  category: string
  source: string
  tags?: string[]
}

export default function AdminIdeasPage() {
  const ideas = ideasData as Idea[]
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')

  const categories = useMemo(() => {
    const c = new Set(ideas.flatMap((i) => (i.category ? [i.category] : [])))
    return Array.from(c).sort()
  }, [ideas])

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    return ideas.filter((i) => {
      if (category && i.category !== category) return false
      if (!query) return true
      return (
        i.title.toLowerCase().includes(query) ||
        i.description.toLowerCase().includes(query) ||
        (i.tags || []).some((t) => t.toLowerCase().includes(query))
      )
    })
  }, [ideas, q, category])

  return (
    <>
      <AdminHeader
        title="Ideas hub"
        subtitle="Catalog viewer — edit source data/startup_ideas.json to change content"
      />
      <div className="p-4 md:p-6 flex-1 bg-[#090a0f] text-white">
        <div className="mb-4 rounded-xl border border-white/10 bg-[#0d0e12] p-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Source of truth
            </p>
            <p className="font-mono text-[12px] text-zinc-300 mt-0.5">
              Ideas are loaded from{' '}
              <code className="text-accent-yellow">data/startup_ideas.json</code> — edit the file
              and redeploy to change the catalog.
            </p>
          </div>
          <Link
            href="/ideas"
            className="shrink-0 inline-flex items-center justify-center min-h-[44px] px-4 rounded-lg bg-accent-yellow text-black font-mono text-[11px] font-black uppercase"
          >
            Open live hub
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          <AdminStatCard label="Total ideas" value={ideas.length} accent="yellow" />
          <AdminStatCard label="Markets" value={categories.length} accent="sky" />
          <AdminStatCard label="Showing" value={filtered.length} />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search ideas…"
            className="flex-1 min-h-[44px] px-3 py-2 rounded-lg border border-white/10 bg-[#0d0e12] text-white font-mono text-sm focus:outline-none focus:border-accent-yellow/40"
          />
          <select
            aria-label="Filter ideas by market"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="min-h-[44px] px-3 py-2 rounded-lg border border-white/10 bg-[#0d0e12] text-white font-mono text-sm"
          >
            <option value="">All markets</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#0d0e12] overflow-hidden">
          <div className="max-h-[70vh] overflow-y-auto divide-y divide-white/5">
            {filtered.slice(0, 200).map((idea) => {
              const slug = ideaIdFromTitle(idea.title)
              return (
                <div
                  key={idea.title}
                  className="p-3.5 md:p-4 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 hover:bg-white/[0.02]"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-sm font-bold text-white">{idea.title}</p>
                    <p className="mt-1 font-sans text-[12px] text-zinc-500 line-clamp-2">
                      {idea.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="px-1.5 py-0.5 rounded border border-white/10 text-[9px] font-mono text-accent-yellow">
                        {idea.category}
                      </span>
                      <span className="px-1.5 py-0.5 rounded border border-white/10 text-[9px] font-mono text-zinc-500">
                        {idea.source}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/ideas/${slug}`}
                    className="shrink-0 inline-flex items-center justify-center min-h-[40px] px-3 rounded-lg border border-white/15 text-zinc-300 font-mono text-[10px] font-bold uppercase hover:border-accent-yellow/40 hover:text-accent-yellow"
                  >
                    View
                  </Link>
                </div>
              )
            })}
            {filtered.length === 0 && (
              <p className="p-8 text-center font-mono text-sm text-zinc-500">No ideas match</p>
            )}
            {filtered.length > 200 && (
              <p className="p-3 text-center font-mono text-[10px] text-zinc-600">
                Showing first 200 of {filtered.length} — refine search
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
