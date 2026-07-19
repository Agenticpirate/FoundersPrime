'use client'

import { AlertTriangle } from 'lucide-react'

/** Identical markup — partial load error banner */
export default function AdminDashboardErrors({
  errors,
  onRetry,
}: {
  errors: { label: string; detail: string }[]
  onRetry: () => void
}) {
  return (
    <div className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
      <div className="flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[11px] font-bold text-amber-200 uppercase tracking-wide">
            Partial load
          </p>
          <ul className="mt-1.5 space-y-1">
            {errors.map((e) => (
              <li key={e.label} className="font-mono text-[11px] text-amber-100/90">
                <span className="font-black">{e.label}:</span> {e.detail}
              </li>
            ))}
          </ul>
          <p className="mt-2 font-mono text-[10px] text-amber-200/70">
            Confirm you&apos;re signed in as an admin and SUPABASE_SERVICE_ROLE_KEY is set.
          </p>
        </div>
        <button
          type="button"
          onClick={onRetry}
          className="shrink-0 font-mono text-[10px] font-bold uppercase text-amber-200 underline"
        >
          Retry
        </button>
      </div>
    </div>
  )
}
