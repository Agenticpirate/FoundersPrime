'use client'

import Link from 'next/link'
import IdeaSaveButton, { ideaIdFromTitle } from './IdeaSaveButton'
import { CardHoverGlow, cardHoverClass, cardTitleHoverClass } from '@/components/ui/card-hover'

interface IdeaCardProps {
  idea: {
    title: string
    description: string
    category: string
    tags: string[]
    author: string
    source: string
    itchScore?: string
  }
  index?: number
}

const CATEGORY_CONFIG: Record<
  string,
  { icon: string; bg: string; text: string; border: string }
> = {
  'AI Tools': { icon: 'auto_awesome', bg: 'bg-violet-500/12', text: 'text-violet-600 dark:text-violet-300', border: 'border-violet-500/20' },
  'AI Infrastructure': { icon: 'memory', bg: 'bg-purple-500/12', text: 'text-purple-600 dark:text-purple-300', border: 'border-purple-500/20' },
  'AI Software': { icon: 'smart_toy', bg: 'bg-fuchsia-500/12', text: 'text-fuchsia-600 dark:text-fuchsia-300', border: 'border-fuchsia-500/20' },
  'AI Consulting': { icon: 'psychology', bg: 'bg-violet-500/12', text: 'text-violet-600 dark:text-violet-300', border: 'border-violet-500/20' },
  Fintech: { icon: 'account_balance', bg: 'bg-accent-yellow/15', text: 'text-amber-700 dark:text-accent-yellow', border: 'border-accent-yellow/25' },
  FinTech: { icon: 'account_balance', bg: 'bg-accent-yellow/15', text: 'text-amber-700 dark:text-accent-yellow', border: 'border-accent-yellow/25' },
  SaaS: { icon: 'cloud', bg: 'bg-sky-500/12', text: 'text-sky-600 dark:text-sky-300', border: 'border-sky-500/20' },
  Services: { icon: 'design_services', bg: 'bg-blue-500/12', text: 'text-blue-600 dark:text-blue-300', border: 'border-blue-500/20' },
  GovTech: { icon: 'account_balance', bg: 'bg-cyan-500/12', text: 'text-cyan-700 dark:text-cyan-300', border: 'border-cyan-500/20' },
  Manufacturing: { icon: 'precision_manufacturing', bg: 'bg-orange-500/12', text: 'text-orange-600 dark:text-orange-300', border: 'border-orange-500/20' },
  Industrial: { icon: 'factory', bg: 'bg-amber-500/12', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-500/20' },
  Healthcare: { icon: 'favorite', bg: 'bg-rose-500/12', text: 'text-rose-600 dark:text-rose-300', border: 'border-rose-500/20' },
  Healthtech: { icon: 'health_and_safety', bg: 'bg-red-500/12', text: 'text-red-600 dark:text-red-300', border: 'border-red-500/20' },
  EdTech: { icon: 'school', bg: 'bg-yellow-500/12', text: 'text-yellow-700 dark:text-yellow-300', border: 'border-yellow-500/20' },
  'E-commerce': { icon: 'shopping_bag', bg: 'bg-pink-500/12', text: 'text-pink-600 dark:text-pink-300', border: 'border-pink-500/20' },
  'Consumer Services': { icon: 'person', bg: 'bg-indigo-500/12', text: 'text-indigo-600 dark:text-indigo-300', border: 'border-indigo-500/20' },
  'B2B Services': { icon: 'business', bg: 'bg-violet-500/12', text: 'text-violet-600 dark:text-violet-300', border: 'border-violet-500/20' },
  Logistics: { icon: 'local_shipping', bg: 'bg-lime-600/12', text: 'text-lime-700 dark:text-lime-300', border: 'border-lime-600/20' },
  Transportation: { icon: 'directions_car', bg: 'bg-stone-500/12', text: 'text-stone-600 dark:text-stone-300', border: 'border-stone-500/20' },
  Hardware: { icon: 'developer_board', bg: 'bg-zinc-500/12', text: 'text-zinc-600 dark:text-zinc-300', border: 'border-zinc-500/20' },
  'Real Estate': { icon: 'home', bg: 'bg-amber-600/12', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-600/20' },
  Housing: { icon: 'apartment', bg: 'bg-yellow-600/12', text: 'text-yellow-700 dark:text-yellow-400', border: 'border-yellow-600/20' },
  Automotive: { icon: 'directions_car', bg: 'bg-red-600/12', text: 'text-red-600 dark:text-red-400', border: 'border-red-600/20' },
  'Food & Beverage': { icon: 'restaurant', bg: 'bg-amber-500/12', text: 'text-amber-700 dark:text-accent-yellow', border: 'border-amber-500/20' },
  Career: { icon: 'work', bg: 'bg-slate-500/12', text: 'text-slate-600 dark:text-slate-300', border: 'border-slate-500/20' },
  Travel: { icon: 'flight', bg: 'bg-sky-600/12', text: 'text-sky-700 dark:text-sky-400', border: 'border-sky-600/20' },
  'Home Services': { icon: 'handyman', bg: 'bg-orange-600/12', text: 'text-orange-700 dark:text-orange-400', border: 'border-orange-600/20' },
}

function getCategoryConfig(category: string) {
  return (
    CATEGORY_CONFIG[category] || {
      icon: 'lightbulb',
      bg: 'bg-accent-yellow/12',
      text: 'text-amber-700 dark:text-accent-yellow',
      border: 'border-accent-yellow/25',
    }
  )
}

/** Stable pseudo-signal from title when itchScore missing */
export function getSignalScore(title: string, itchScore?: string): number {
  if (itchScore) {
    const n = parseInt(itchScore, 10)
    if (!Number.isNaN(n)) return Math.min(99, Math.max(1, n))
  }
  let hash = 0
  for (let i = 0; i < title.length; i++) hash = ((hash << 5) - hash + title.charCodeAt(i)) | 0
  return 75 + (Math.abs(hash) % 25)
}

function getSourceLabel(source: string): string {
  if (source.includes('YC')) return 'YC'
  if (source.includes('Razorpay')) return 'Razorpay'
  if (source.includes('AI') || source.includes('PDF')) return 'AI brief'
  return source || 'FoundersPrime'
}

export default function IdeaCard({ idea, index = 0 }: IdeaCardProps) {
  const cfg = getCategoryConfig(idea.category)
  const signal = getSignalScore(idea.title, idea.itchScore)
  const srcLabel = getSourceLabel(idea.source)
  const slug = ideaIdFromTitle(idea.title)

  return (
    <article
      className={`idea-card group flex flex-col h-full rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-gradient-to-b dark:from-[#121212] dark:to-[#0a0a0a] ${cardHoverClass}`}
      style={{ animationDelay: `${Math.min(index, 9) * 0.035}s` }}
    >
      <CardHoverGlow />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-accent-yellow/45 transition-all duration-300 z-[1]"
      />

      <div className="relative flex flex-col flex-1 p-4 md:p-[1.1rem]">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2 mb-3.5">
          <div
            className={`w-9 h-9 rounded-xl ${cfg.bg} border ${cfg.border} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}
          >
            <span className={`material-symbols-outlined !text-[17px] ${cfg.text}`}>{cfg.icon}</span>
          </div>
          <IdeaSaveButton
            ideaId={slug}
            variant="icon"
            className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center border border-black/[0.06] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] active:bg-accent-yellow active:border-accent-yellow active:text-black md:hover:bg-accent-yellow md:hover:border-accent-yellow text-gray-400 md:hover:text-black rounded-lg transition-all duration-150 disabled:opacity-60"
          />
        </div>

        {/* Category + source */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
          <span
            className={`px-1.5 py-0.5 font-mono text-[9px] font-bold rounded-md border uppercase tracking-wide ${cfg.bg} ${cfg.text} ${cfg.border}`}
          >
            {idea.category}
          </span>
          <span className="px-1.5 py-0.5 font-mono text-[9px] font-bold rounded-md border uppercase tracking-wide bg-black/[0.03] dark:bg-white/[0.04] text-gray-500 dark:text-gray-400 border-black/[0.05] dark:border-white/10">
            {srcLabel}
          </span>
        </div>

        {/* Title + description — whole card body navigates */}
        <Link href={`/ideas/${slug}`} className="block flex-1 group/link">
          <h3
            className={`font-mono text-[13.5px] font-bold text-gray-900 dark:text-white leading-snug mb-2 line-clamp-2 min-h-[2.55rem] ${cardTitleHoverClass}`}
          >
            {idea.title}
          </h3>
          <p className="font-sans text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-4">
            {idea.description}
          </p>
        </Link>

        {/* Signal bar */}
        <div className="mb-3.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Signal
            </span>
            <span className="font-mono text-[10px] font-bold tabular-nums text-gray-700 dark:text-gray-300">
              {signal}%
            </span>
          </div>
          <div
            className="h-1 rounded-full bg-black/[0.05] dark:bg-white/[0.06] overflow-hidden"
            role="meter"
            aria-label={`Signal strength ${signal} percent`}
            aria-valuenow={signal}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-yellow/70 to-accent-yellow transition-all duration-500"
              style={{ width: `${signal}%` }}
            />
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex items-center gap-2 pt-3 border-t border-black/[0.05] dark:border-white/[0.07] mt-auto">
          {(idea.tags || []).slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="hidden xs:inline-flex px-1.5 py-0.5 font-mono text-[9px] font-semibold rounded text-gray-400 dark:text-gray-500 truncate max-w-[72px]"
            >
              {tag}
            </span>
          ))}
          <div className="flex-1" />
          <Link
            href={`/ideas/${slug}`}
            className="inline-flex h-10 min-h-[40px] items-center justify-center gap-1.5 px-3.5 bg-gray-900 dark:bg-white text-white dark:text-black active:bg-accent-yellow active:text-black md:hover:bg-accent-yellow md:hover:text-black dark:md:hover:bg-accent-yellow font-mono text-[10px] font-black uppercase tracking-wide rounded-lg transition-colors leading-none shrink-0"
          >
            Explore
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" className="block shrink-0" aria-hidden>
              <path
                d="M2.5 7h9M7.5 3.5 11 7l-3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes ideaCardFadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .idea-card {
          animation: ideaCardFadeIn 0.32s cubic-bezier(0.22, 1, 0.36, 1) backwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .idea-card {
            animation: none;
          }
        }
      `}</style>
    </article>
  )
}
