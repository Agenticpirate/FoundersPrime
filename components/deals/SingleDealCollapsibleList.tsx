'use client'

import { useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { Reveal } from '@/components/ui/premium-motion'
import { premiumEase } from '@/lib/premium-motion-variants'

/* ─── Collapsible list section ───────────────────────────── */
export default function SingleDealCollapsibleList({
  icon,
  title,
  count,
  items,
  maxVisible,
  renderItem,
  listMode = 'div',
  gridClass,
}: {
  icon: string
  title: string
  count: number
  items: any[]
  maxVisible: number
  renderItem: (item: any, index: number) => JSX.Element
  listMode?: 'ul' | 'div'
  gridClass: string
}) {
  const [expanded, setExpanded] = useState(false)
  const reduceMotion = useReducedMotion()
  const isLong = items.length > maxVisible
  const visible = expanded || !isLong ? items : items.slice(0, maxVisible)
  const Container: any = listMode === 'ul' ? 'ul' : 'div'

  return (
    <Reveal>
    <section className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#0c0c0c] p-5 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
        <h2 className="flex items-center gap-2.5 font-mono text-[13px] md:text-sm font-black uppercase tracking-[0.08em] text-black dark:text-white">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-accent-yellow/90 shadow-sm">
            <span className="material-symbols-outlined text-black !text-[16px]">{icon}</span>
          </span>
          {title}
        </h2>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded-md border border-black/[0.06] dark:border-white/10">
          {count} items
        </span>
      </div>
      <Container className={gridClass}>
        {visible.map((item, i) => {
          const stableKey =
            typeof item === 'string'
              ? item
              : item && typeof item === 'object'
                ? String((item as { title?: string; description?: string }).title ||
                    (item as { description?: string }).description ||
                    JSON.stringify(item).slice(0, 48))
                : `item-${i}`
          return (
          <m.div
            key={stableKey}
            // Keep <ul> → <li> semantics: contents makes the wrapper layout-transparent
            className={listMode === 'ul' ? 'contents' : undefined}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10px' }}
            transition={{ delay: Math.min(i, 8) * 0.04, duration: 0.32, ease: premiumEase }}
          >
            {renderItem(item, i)}
          </m.div>
          )
        })}
      </Container>
      {isLong && (
        <div className="pt-3 mt-3 border-t border-black/[0.06] dark:border-white/[0.08]">
          <button type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-[0.1em] text-black dark:text-white bg-gray-50 dark:bg-white/5 border border-black/[0.08] dark:border-white/10 px-3 py-1.5 rounded-lg hover:bg-accent-yellow hover:text-black hover:border-accent-yellow/50 transition-all"
          >
            <span>
              {expanded ? 'Show Less' : `Show All ${count}`}
            </span>
            <span
              className={`material-symbols-outlined !text-[14px] transition-transform duration-300 ${
                expanded ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
        </div>
      )}
    </section>
    </Reveal>
  )
}