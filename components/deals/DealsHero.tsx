'use client'

export default function DealsHero() {
    return (
        <div className="relative mb-4 md:mb-5">
            {/* Decorative mandala — subtle background ornament */}
            <div className="absolute -top-8 -right-6 w-56 h-56 pointer-events-none opacity-[0.08] hidden md:block" aria-hidden="true">
                <svg viewBox="0 0 200 200" className="w-full h-full text-gray-900 deals-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
                    <circle cx="100" cy="100" r="40" />
                    <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
                    <circle cx="100" cy="100" r="80" strokeDasharray="1 6" />
                    <circle cx="100" cy="100" r="3" fill="currentColor" />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                        <g key={deg} transform={`rotate(${deg} 100 100)`}>
                            <line x1="100" y1="40" x2="100" y2="20" />
                            <circle cx="100" cy="20" r="2" fill="currentColor" />
                        </g>
                    ))}
                </svg>
            </div>

            {/* Compact unified hero strip */}
            <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                {/* Left: title block */}
                <div className="min-w-0 flex-1">
                    <div className="inline-flex items-center gap-1.5 mb-2.5 px-2.5 py-1 rounded-full bg-accent-yellow/15 border border-accent-yellow/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow animate-pulse" />
                        <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-gray-800">
                            Verified Opportunities
                        </span>
                    </div>
                    <h1 className="font-mono text-2xl md:text-3xl lg:text-[34px] font-black tracking-tight text-gray-900 leading-[1.05] mb-1.5">
                        Startup Deals &amp; Credits
                    </h1>
                    <p className="font-sans text-[13px] md:text-sm text-gray-600 leading-relaxed max-w-2xl">
                        Verified opportunities to save money and grow faster. Access{' '}
                        <span className="font-bold text-gray-900 bg-accent-yellow/30 px-1 rounded-sm">$2.4M+</span>{' '}
                        in cloud credits, SaaS discounts, grants, and more.
                    </p>
                </div>

                {/* Right: inline stat strip */}
                <div className="grid grid-cols-3 gap-2.5 lg:gap-3 lg:flex-shrink-0 lg:min-w-[560px]">
                    <StatCell
                        label="Active Deals"
                        value="523"
                        delta="Live now"
                        accent="text-sky-600"
                        icon="local_offer"
                        iconBg="bg-sky-100"
                        delay="0s"
                    />
                    <StatCell
                        label="Total Value"
                        value="$2.4M+"
                        delta="Across all deals"
                        accent="text-amber-600"
                        icon="payments"
                        iconBg="bg-accent-yellow/30"
                        highlight
                        delay="0.08s"
                    />
                    <StatCell
                        label="New This Week"
                        value="47"
                        delta="Latest adds"
                        accent="text-emerald-600"
                        icon="new_releases"
                        iconBg="bg-emerald-100"
                        delay="0.16s"
                    />
                </div>
            </div>

            <style jsx>{`
                @keyframes dealsMandalaSpin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                :global(.deals-mandala-spin) {
                    animation: dealsMandalaSpin 80s linear infinite;
                    transform-origin: center;
                }
                @media (prefers-reduced-motion: reduce) {
                    :global(.deals-mandala-spin) { animation: none; }
                }
            `}</style>
        </div>
    )
}

function StatCell({
    label,
    value,
    delta,
    accent,
    icon,
    iconBg,
    highlight = false,
    delay = '0s',
}: {
    label: string
    value: string
    delta: string
    accent: string
    icon: string
    iconBg: string
    highlight?: boolean
    delay?: string
}) {
    return (
        <div
            className={`relative group rounded-sm border-2 border-black overflow-hidden transition-all stat-cell-fade-in hover:-translate-x-px hover:-translate-y-px ${
                highlight
                    ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white shadow-[3px_3px_0px_rgba(255,221,0,0.55)] hover:shadow-[5px_5px_0px_rgba(255,221,0,0.55)]'
                    : 'bg-white shadow-[3px_3px_0px_#111] hover:shadow-[5px_5px_0px_#111]'
            }`}
            style={{ animationDelay: delay }}
        >
            {/* Inner subtle mandala for the highlighted card */}
            {highlight && (
                <div className="absolute -bottom-8 -right-8 w-28 h-28 pointer-events-none opacity-[0.18]" aria-hidden="true">
                    <svg viewBox="0 0 200 200" className="w-full h-full text-accent-yellow stat-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.7">
                        <circle cx="100" cy="100" r="50" />
                        <circle cx="100" cy="100" r="70" strokeDasharray="3 4" />
                        {[0, 60, 120, 180, 240, 300].map((deg) => (
                            <g key={deg} transform={`rotate(${deg} 100 100)`}>
                                <line x1="100" y1="50" x2="100" y2="30" />
                                <circle cx="100" cy="30" r="1.8" fill="currentColor" />
                            </g>
                        ))}
                        <circle cx="100" cy="100" r="2.5" fill="currentColor" />
                    </svg>
                </div>
            )}

            {/* Subtle shimmer on hover */}
            <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                    background: highlight
                        ? 'linear-gradient(115deg, transparent 35%, rgba(255,221,0,0.08) 50%, transparent 65%)'
                        : 'linear-gradient(115deg, transparent 35%, rgba(0,0,0,0.04) 50%, transparent 65%)',
                }}
            />

            <div className="relative p-3 md:p-3.5">
                <div className="flex items-start gap-2.5">
                    {/* Icon tile */}
                    <div className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-sm border-2 border-black flex-shrink-0 ${iconBg} ${highlight ? 'shadow-[1px_1px_0px_rgba(255,221,0,0.3)]' : 'shadow-[1px_1px_0px_#111]'}`}>
                        <span className={`material-symbols-outlined !text-[18px] md:!text-[20px] ${accent}`}>{icon}</span>
                    </div>

                    {/* Text block */}
                    <div className="min-w-0 flex-1">
                        <p className={`font-mono text-[8.5px] md:text-[9px] font-bold uppercase tracking-[0.14em] truncate ${highlight ? 'text-gray-400' : 'text-gray-500'}`}>
                            {label}
                        </p>
                        <p
                            className={`font-mono text-base md:text-lg lg:text-xl font-black leading-tight tabular-nums mt-0.5 ${
                                highlight
                                    ? 'bg-gradient-to-br from-accent-yellow to-amber-300 bg-clip-text text-transparent'
                                    : 'text-black'
                            }`}
                        >
                            {value}
                        </p>
                        {/* Delta line — desktop only, keeps mobile compact */}
                        <p className={`hidden lg:flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-wide font-semibold mt-1 ${highlight ? 'text-gray-400' : 'text-gray-500'}`}>
                            <span className={`w-1 h-1 rounded-full ${highlight ? 'bg-accent-yellow' : 'bg-gray-400'} ${highlight ? 'animate-pulse' : ''}`} />
                            <span className="truncate">{delta}</span>
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes statCellFadeIn {
                    from { opacity: 0; transform: translateY(6px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes statMandalaSpin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                :global(.stat-cell-fade-in) {
                    animation: statCellFadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) backwards;
                }
                :global(.stat-mandala-spin) {
                    animation: statMandalaSpin 60s linear infinite;
                    transform-origin: center;
                }
                @media (prefers-reduced-motion: reduce) {
                    :global(.stat-cell-fade-in),
                    :global(.stat-mandala-spin) { animation: none; }
                }
            `}</style>
        </div>
    )
}
