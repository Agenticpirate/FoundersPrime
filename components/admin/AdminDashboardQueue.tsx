'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { formatDateShort } from '@/lib/format-date'

export type AdminQueueRow = {
  id: string
  company_name?: string
  status?: string
  category?: string
  deal_value?: string | number
  featured_requested?: boolean
  created_at?: string
  submitter_email?: string | null
}

type Props = {
  loading: boolean
  pendingList: AdminQueueRow[]
}

/** Identical markup — admin attention queue */
export default function AdminDashboardQueue({ loading, pendingList }: Props) {
  return (
    <section className="rounded-xl border border-white/10 bg-[#0d0e12] p-4 md:p-5">

            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <h3 className="font-mono font-bold text-sm uppercase tracking-wider text-white">
                Attention queue
              </h3>
              <Link
                href="/admin/submissions"
                className="font-mono text-[10px] font-bold uppercase text-accent-yellow inline-flex items-center gap-1 hover:text-yellow-300"
              >
                All submissions <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {loading && (
              <p className="font-mono text-[11px] text-zinc-500 py-6 text-center">Loading…</p>
            )}
            {!loading && pendingList.length === 0 && (
              <div className="py-8 text-center border border-dashed border-white/10 rounded-lg">
                <p className="font-mono text-[11px] text-zinc-500">
                  No pending submissions — queue clear
                </p>
                <Link
                  href="/submit-deal"
                  className="inline-block mt-2 font-mono text-[10px] text-accent-yellow hover:underline"
                >
                  Open public submit form →
                </Link>
              </div>
            )}
            <div className="space-y-2">
              {pendingList.map((s) => (
                <Link
                  key={s.id}
                  href={`/admin/submissions/${s.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:border-accent-yellow/30 hover:bg-white/[0.03] transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-xs font-bold text-white truncate">
                      {s.company_name || 'Untitled'}
                      {s.featured_requested && (
                        <span className="ml-2 text-[9px] text-accent-yellow">★ Featured</span>
                      )}
                    </p>
                    <p className="font-mono text-[10px] text-zinc-500 mt-0.5 truncate">
                      {s.category || '—'}
                      {s.deal_value != null && s.deal_value !== ''
                        ? ` · $${s.deal_value}`
                        : ''}
                      {s.submitter_email ? ` · ${s.submitter_email}` : ''}
                      {s.created_at
                        ? ` · ${formatDateShort(s.created_at)}`
                        : ''}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] font-bold uppercase text-black bg-accent-yellow px-2.5 py-1.5 rounded-md">
                    Review
                  </span>
                </Link>
              ))}
            </div>

    </section>
  )
}
