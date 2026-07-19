'use client'

import Link from 'next/link'
import { formatDateShort, formatMonthYear } from '@/lib/format-date'
import { Handshake, Lightbulb, Download, ArrowRight } from 'lucide-react'

type Sub = {
  plan: string
  label: string
  price: number
  createdAt: string | null
  email?: string | null
  periodEnd?: string | null
}

type Props = {
  loading: boolean
  recentSubscribers: Sub[]
}

/** Identical markup extracted from AdminDashboard — admin only */
export default function AdminDashboardAside({ loading, recentSubscribers }: Props) {
  return (
        <div className="flex flex-col gap-4">
          <section className="rounded-xl border border-white/10 bg-[#0d0e12] p-4 md:p-5">
            <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <h3 className="font-mono font-bold text-sm uppercase tracking-wider text-white">
                Recent paid
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              {(recentSubscribers).map((sub) => (
                <div
                  key={`${sub.email || 'anon'}-${sub.plan}-${sub.price}-${sub.label}`}
                  className="flex gap-3 items-center p-2.5 rounded-lg border border-white/5 bg-white/[0.02]"
                >
                  <div className="w-8 h-8 shrink-0 rounded-lg bg-accent-yellow/15 border border-accent-yellow/20 text-accent-yellow flex items-center justify-center font-mono text-[10px] font-black">
                    $
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[11px] text-zinc-100 truncate">
                      {sub.label} · ${sub.price}
                    </p>
                    <p className="font-mono text-[9px] text-zinc-400 mt-0.5 truncate">
                      {sub.email || '—'}
                    </p>
                    <p className="font-mono text-[9px] text-zinc-600 mt-0.5">
                      {sub.createdAt ? formatDateShort(sub.createdAt) : '—'}
                      {sub.periodEnd
                        ? ` · ends ${formatMonthYear(sub.periodEnd)}`
                        : ''}
                    </p>
                  </div>
                </div>
              ))}
              {!loading && (recentSubscribers).length === 0 && (
                <p className="text-center text-[10px] font-mono text-zinc-600 py-6 border border-dashed border-white/10 rounded-lg">
                  No paid subscriptions yet
                </p>
              )}
            </div>
            <Link
              href="/admin/users?role=founder"
              className="mt-3 flex items-center justify-center gap-1 min-h-[40px] rounded-lg border border-white/10 font-mono text-[10px] font-bold uppercase text-zinc-400 hover:text-accent-yellow hover:border-accent-yellow/30 transition-colors"
            >
              View all users <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </section>

          <section className="rounded-xl border border-white/10 bg-[#0d0e12] p-4 md:p-5">
            <h3 className="font-mono font-bold text-sm uppercase tracking-wider text-white mb-3">
              Shortcuts
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {[
                { href: '/deals', label: 'Live deals catalog', icon: Handshake },
                { href: '/ideas', label: 'Ideas hub', icon: Lightbulb },
                { href: '/pricing', label: 'Pricing page', icon: Download },
                { href: '/admin/ideas', label: 'Manage ideas list', icon: Lightbulb },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg border border-white/10 text-zinc-300 hover:border-accent-yellow/30 hover:text-white font-mono text-[11px] transition-colors"
                >
                  <l.icon className="w-3.5 h-3.5 text-zinc-500" />
                  {l.label}
                  <ArrowRight className="w-3 h-3 ml-auto text-zinc-600" />
                </Link>
              ))}
            </div>
          </section>
        </div>

  )
}
