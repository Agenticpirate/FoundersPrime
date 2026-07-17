interface AdminStatCardProps {
  label: string
  value: string | number
  hint?: string
  accent?: 'yellow' | 'emerald' | 'sky' | 'red' | 'zinc'
}

const accentMap = {
  yellow: 'text-accent-yellow',
  emerald: 'text-emerald-400',
  sky: 'text-sky-400',
  red: 'text-red-400',
  zinc: 'text-zinc-100',
}

export default function AdminStatCard({
  label,
  value,
  hint,
  accent = 'zinc',
}: AdminStatCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0d0e12] p-3.5 md:p-4">
      <p className="font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
        {label}
      </p>
      <p
        className={`font-mono text-xl md:text-2xl font-black tabular-nums leading-none ${accentMap[accent]}`}
      >
        {value}
      </p>
      {hint && <p className="mt-1.5 font-mono text-[9px] text-zinc-500">{hint}</p>}
    </div>
  )
}
