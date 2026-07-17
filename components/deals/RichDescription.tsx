'use client'

import { useState, useMemo } from 'react'

/**
 * Parses long markdown-ish description blocks (with • bullets, "Header:" lines,
 * blank-line paragraph separators) into a scannable visual layout.
 *
 * Long descriptions automatically get a "Show more" toggle so the section
 * doesn't dominate the page on load.
 */

type Block =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'bullets'; items: string[] }

function parseDescription(raw: string): Block[] {
  const lines = raw.split('\n')
  const blocks: Block[] = []
  let buffer: string[] = []
  let bulletBuffer: string[] = []

  const flushParagraph = () => {
    if (buffer.length > 0) {
      blocks.push({ type: 'paragraph', text: buffer.join(' ').trim() })
      buffer = []
    }
  }
  const flushBullets = () => {
    if (bulletBuffer.length > 0) {
      blocks.push({ type: 'bullets', items: [...bulletBuffer] })
      bulletBuffer = []
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) {
      flushParagraph()
      flushBullets()
      continue
    }
    // Bullet
    if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
      flushParagraph()
      bulletBuffer.push(line.replace(/^[•\-*]\s*/, '').trim())
      continue
    }
    // Heading: ends with ":" and is short-ish, no other colons
    const isHeading = /^[A-Z][^:]{1,80}:$/.test(line) || /^[A-Z][\w\s\-&'/]{1,50}\s*-\s*[\w\s,]+:$/.test(line)
    if (isHeading) {
      flushParagraph()
      flushBullets()
      blocks.push({ type: 'heading', text: line.replace(/:$/, '') })
      continue
    }
    flushBullets()
    buffer.push(line)
  }
  flushParagraph()
  flushBullets()
  return blocks
}

const PARAGRAPH_LIMIT = 3 // show first N blocks before truncating

export default function RichDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false)

  const blocks = useMemo(() => parseDescription(text), [text])
  const isLong = blocks.length > PARAGRAPH_LIMIT
  const visible = expanded || !isLong ? blocks : blocks.slice(0, PARAGRAPH_LIMIT)

  return (
    <div className="space-y-3 text-[13.5px] text-gray-700 dark:text-gray-300 leading-relaxed">
      {visible.map((block, i) => {
        if (block.type === 'heading') {
          return (
            <h3
              key={i}
              className="font-mono text-[11.5px] font-black uppercase tracking-[0.1em] text-black dark:text-white inline-flex items-center gap-2 pt-1 bg-accent-yellow/40 dark:bg-accent-yellow/20 border-2 border-black dark:border-white/10 px-2.5 py-1 rounded-sm"
            >
              <span className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full" />
              {block.text}
            </h3>
          )
        }
        if (block.type === 'bullets') {
          return (
            <ul key={i} className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-1.5">
              {block.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-[12.5px] leading-snug">
                  <span className="material-symbols-outlined text-amber-700 dark:text-accent-yellow flex-shrink-0 !text-[15px] mt-0.5">
                    check_circle
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          )
        }
        return (
          <p key={i} className="text-[13px] text-gray-800 dark:text-gray-200 leading-relaxed">
            {block.text}
          </p>
        )
      })}

      {isLong && (
        <div className="pt-2">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono font-black uppercase tracking-[0.1em] text-black dark:text-white bg-white dark:bg-white/5 border-2 border-black dark:border-white/10 px-3 py-1.5 rounded-sm shadow-[2px_2px_0px_#111] dark:shadow-none hover:bg-accent-yellow dark:hover:bg-accent-yellow dark:hover:text-black hover:shadow-[3px_3px_0px_#111] dark:hover:shadow-none hover:-translate-x-px hover:-translate-y-px transition-all"
          >
            <span>
              {expanded ? 'Show Less' : `Show More · ${blocks.length - PARAGRAPH_LIMIT} sections`}
            </span>
            <span
              className={`material-symbols-outlined !text-[14px] text-black dark:text-white transition-transform ${
                expanded ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
