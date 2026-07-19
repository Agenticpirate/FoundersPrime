'use client'

import Link from 'next/link'
import IdeaSaveButton from './IdeaSaveButton'
import { getSignalScore, ideaIdFromTitle } from '@/lib/ideas'
import {
  CardHoverGlowShell,
  cardHoverClass,
  cardTitleHoverClass,
} from '@/components/ui/card-hover'
import { cardTitle, cardDescription } from '@/lib/card-text'

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

function getSourceLabel(source: string): string {
  if (source.includes('YC')) return 'YC'
  if (source.includes('Razorpay')) return 'Razorpay'
  if (source.includes('AI') || source.includes('PDF')) return 'AI'
  return source?.slice(0, 12) || 'FP'
}

/**
 * Mobile-compact idea card — matches All Deals density:
 * fixed height, 2-col friendly, short title/desc, signal + Explore bar.
 */
export default function IdeaCard({ idea, index = 0 }: IdeaCardProps) {
  const cfg = getCategoryConfig(idea.category)
  const signal = getSignalScore(idea.title, idea.itchScore)
  const srcLabel = getSourceLabel(idea.source)
  const slug = ideaIdFromTitle(idea.title)
  const shortTitle = cardTitle(idea.title, 34)
  const shortDesc = cardDescription(idea.description, 64)

  return (
    <article
      className={`idea-card group relative h-[168px] md:h-[196px] flex flex-col rounded-xl md:rounded-2xl min-w-0 border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-gradient-to-b dark:from-[#121212] dark:to-[#0a0a0a] overflow-visible ${cardHoverClass}`}
      style={{ animationDelay: `${Math.min(index, 9) * 0.03}s` }}
    >
      <CardHoverGlowShell />

      <div className="relative z-[1] flex flex-col flex-1 p-2.5 md:p-3.5 min-w-0">
        {/* Top: icon + category + save */}
        <div
          className="shrink-0 pr-1 min-w-0 mb-1.5"
          style={{
            display: 'grid',
            gridTemplateColumns: '32px minmax(0, 1fr) auto',
            columnGap: 8,
            alignItems: 'center',
          }}
        >
          <div
            className={`w-8 h-8 rounded-lg ${cfg.bg} border ${cfg.border} flex items-center justify-center flex-shrink-0`}
          >
            <span className={`material-symbols-outlined !text-[15px] ${cfg.text}`}>{cfg.icon}</span>
          </div>
          <div className="min-w-0 flex items-center gap-1 overflow-hidden">
            <span
              className={`px-1.5 py-0.5 font-mono text-[7px] md:text-[8px] font-bold rounded-md border uppercase tracking-wide truncate max-w-full ${cfg.bg} ${cfg.text} ${cfg.border}`}
            >
              {idea.category}
            </span>
            <span className="hidden sm:inline-flex px-1.5 py-0.5 font-mono text-[7px] md:text-[8px] font-bold rounded-md border uppercase tracking-wide bg-black/[0.03] dark:bg-white/[0.04] text-gray-500 dark:text-gray-400 border-black/[0.05] dark:border-white/10 shrink-0">
              {srcLabel}
            </span>
          </div>
          <IdeaSaveButton
            ideaId={slug}
            variant="icon"
            className="p-1 min-h-[28px] min-w-[28px] flex items-center justify-center border border-black/[0.06] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] active:bg-accent-yellow active:border-accent-yellow active:text-black md:hover:bg-accent-yellow md:hover:border-accent-yellow text-gray-400 md:hover:text-black rounded-md transition-all duration-150 disabled:opacity-60 shrink-0"
          />
        </div>

        <Link href={`/ideas/${slug}`} className="block flex-1 min-w-0 group/link">
          <h3
            className={`font-bold text-[11px] md:text-[13px] text-gray-900 dark:text-white leading-[1.2] line-clamp-2 h-[1.65rem] md:h-[2.35rem] ${cardTitleHoverClass}`}
            title={idea.title}
          >
            {shortTitle}
          </h3>
          <p
            className="mt-1 text-[10px] md:text-[11px] leading-[1.3] h-[1.3rem] md:h-[2.6rem] text-gray-500 dark:text-gray-400 line-clamp-1 md:line-clamp-2 overflow-hidden"
            title={idea.description}
          >
            {shortDesc}
          </p>
        </Link>

        {/* Signal + Explore — same density as deal value/CTA bar */}
        <div className="mt-auto shrink-0 w-full min-w-0 pt-1.5">
          <div className="w-full flex items-center justify-between gap-1.5 h-8 md:h-9 rounded-lg border border-black/[0.06] dark:border-white/10 bg-gray-50 dark:bg-white/[0.04] pl-2 md:pl-2.5 pr-0.5 md:pr-1 min-w-0">
            <div className="min-w-0 flex-1 flex items-center gap-1.5">
              <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-gray-400 shrink-0">
                Signal
              </span>
              <div
                className="h-1 flex-1 max-w-[48px] rounded-full bg-black/[0.05] dark:bg-white/[0.06] overflow-hidden"
                role="meter"
                aria-label={`Signal strength ${signal} percent`}
                aria-valuenow={signal}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent-yellow/70 to-accent-yellow"
                  style={{ width: `${signal}%` }}
                />
              </div>
              <span className="font-mono text-[9px] md:text-[10px] font-bold tabular-nums text-amber-700 dark:text-accent-yellow shrink-0">
                {signal}%
              </span>
            </div>
            <Link
              href={`/ideas/${slug}`}
              className="shrink-0 inline-flex h-6 md:h-7 items-center justify-center gap-0.5 md:gap-1 bg-[#000000] text-white border border-[#FFD500]/40 text-[8px] md:text-[9px] font-bold uppercase tracking-wide px-1.5 md:px-2.5 rounded-md shadow-sm group-hover:bg-[#FFD500] group-hover:text-black group-hover:border-[#FFD500] hover:bg-[#FFD500] hover:text-black hover:border-[#FFD500] transition-all duration-200 leading-none"
            >
              <span className="leading-none md:hidden">Open</span>
              <span className="leading-none hidden md:inline">Explore</span>
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" className="block shrink-0" aria-hidden>
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
      </div>

      <style jsx>{`
        @keyframes ideaCardFadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .idea-card {
          animation: ideaCardFadeIn 0.28s cubic-bezier(0.22, 1, 0.36, 1) backwards;
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
