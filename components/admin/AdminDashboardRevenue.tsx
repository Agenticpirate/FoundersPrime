'use client'

type PlanRow = { plan: string; label: string; subscribers: number; revenue: number }

type Props = {
  loading: boolean
  revenue: number
  totalSubscribers: number
  planBreakdown: PlanRow[]
  fmt: (n: number) => string
  money: (n: number) => string
}

/** Identical markup — admin revenue by plan */
export default function AdminDashboardRevenue({
  loading,
  revenue,
  totalSubscribers,
  planBreakdown,
  fmt,
  money,
}: Props) {
  return (
    <section className="rounded-xl border border-white/10 bg-[#0d0e12] p-4 md:p-5">
      <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
        <h3 className="font-mono font-bold text-sm uppercase tracking-wider text-white">
          Revenue by plan
        </h3>
        <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase">
          Active subs
        </span>
      </div>
      <div className="rounded-lg border border-white/10 bg-[#121318] p-4 mb-4 text-center">
        <p className="font-mono text-[9px] text-zinc-500 uppercase mb-1">Realized revenue</p>
        <p className="font-black text-3xl font-mono text-emerald-400">
          {money(revenue)}
        </p>
        <p className="font-mono text-[10px] text-zinc-500 mt-1">
          {fmt(totalSubscribers)} subscriber(s) · excl. tax · list-price fallback
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-[11px] md:text-xs">
          <thead className="border-b border-white/10 text-zinc-500">
            <tr>
              <th className="p-2.5 font-bold uppercase">Plan</th>
              <th className="p-2.5 font-bold uppercase">Subs</th>
              <th className="p-2.5 font-bold uppercase">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {planBreakdown.map((r) => (
              <tr key={r.plan} className="hover:bg-white/[0.03]">
                <td className="p-2.5 font-bold text-zinc-200">{r.label}</td>
                <td className="p-2.5 text-zinc-400 tabular-nums">{r.subscribers}</td>
                <td className="p-2.5 font-bold text-emerald-400 tabular-nums">
                  ${r.revenue.toLocaleString('en-US')}
                </td>
              </tr>
            ))}
            {!loading && planBreakdown.length === 0 && (
              <tr>
                <td colSpan={3} className="p-5 text-center text-zinc-500">
                  No subscription data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
