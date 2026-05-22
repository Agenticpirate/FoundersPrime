import Link from 'next/link'

export default function VerifiedIdeasAndFundedDB() {
  const ideas = [
    {
      title: 'AI Compliance Co-pilot',
      category: 'B2B SaaS',
      description: 'Automated compliance checking for SMBs navigating new AI regulations. EU AI Act, US executive orders.',
      tags: ['AI', 'B2B', 'RegTech'],
    },
    {
      title: 'CRM for Trades',
      category: 'Vertical SaaS',
      description: 'Mobile-first CRM for plumbers, electricians, HVAC — dispatching, inventory, and quick invoicing.',
      tags: ['Mobile', 'SMB', 'Operations'],
    },
    {
      title: 'Carbon-aware API',
      category: 'Dev Tool',
      description: 'Plug-and-play API that adds carbon offsetting to e-commerce checkouts. Scope 1, 2, and 3 ready.',
      tags: ['API', 'Climate', 'Dev'],
    },
  ]

  const fundedCompanies = [
    { name: 'Vercel', round: 'Series E', amount: '$250M', sector: 'DevTool' },
    { name: 'Supabase', round: 'Series C', amount: '$80M', sector: 'Backend' },
    { name: 'Cursor', round: 'Series B', amount: '$60M', sector: 'AI / IDE' },
    { name: 'Resend', round: 'Series A', amount: '$25M', sector: 'Email' },
    { name: 'Railway', round: 'Series A', amount: '$20M', sector: 'Infra' },
  ]

  return (
    <section className="relative py-8 md:py-14 bg-gradient-to-b from-gray-50 to-white border-b-2 border-black overflow-hidden grid-bg">
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8">
          {/* Verified Ideas */}
          <div className="relative bg-white border-2 border-black p-5 md:p-8 shadow-[5px_5px_0px_#111] overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent-yellow/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-end mb-5 md:mb-6 border-b-2 border-black pb-4 gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border border-black mb-2">
                  <span className="material-symbols-outlined text-[12px]">lightbulb</span>
                  Validated demand
                </span>
                <h3 className="text-xl md:text-2xl font-black font-mono uppercase tracking-tight">
                  Verified Ideas
                </h3>
                <p className="text-gray-600 text-[11px] md:text-xs font-sans mt-0.5">
                  Stop guessing. Start with problems people are paying to solve.
                </p>
              </div>
              <Link
                href="/ideas"
                className="font-mono font-black text-xs uppercase tracking-wider text-black hover:text-accent-yellow flex items-center gap-1 transition-colors"
              >
                View all
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>

            <div className="relative space-y-3">
              {ideas.map((idea, index) => (
                <Link
                  key={index}
                  href="/ideas"
                  className="block bg-white border-2 border-black p-4 hover:bg-accent-yellow hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#111] transition-all cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                    <span className="font-black font-mono text-sm md:text-base uppercase tracking-tight">{idea.title}</span>
                    <span className="text-[10px] font-mono font-black bg-black text-white px-2 py-0.5 uppercase tracking-wider">{idea.category}</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-2">{idea.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {idea.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono font-bold text-gray-500 bg-gray-100 group-hover:bg-white border border-gray-200 px-1.5 py-0.5 uppercase tracking-wider"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Funded Database */}
          <div className="relative bg-black text-white border-2 border-black p-5 md:p-8 shadow-[5px_5px_0px_#111] overflow-hidden mt-3 lg:mt-0">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-green-500/20 rounded-full blur-3xl pointer-events-none" />
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-end mb-5 md:mb-6 border-b border-white/20 pb-4 gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-green-400 text-black font-mono text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border border-black mb-2">
                  <span className="material-symbols-outlined text-[12px]">trending_up</span>
                  Capital flow
                </span>
                <h3 className="text-xl md:text-2xl font-black font-mono uppercase tracking-tight flex items-center gap-2">
                  Funded DB
                </h3>
                <p className="text-gray-400 text-[11px] md:text-xs font-sans mt-0.5">
                  Who's writing checks. What's hot. Where the money is moving.
                </p>
              </div>
              <Link
                href="/startups"
                className="font-mono font-black text-xs uppercase tracking-wider text-white hover:text-accent-yellow flex items-center gap-1 transition-colors"
              >
                Access DB
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>

            <div className="relative border border-white/20 overflow-hidden overflow-x-auto bg-white/5">
              <table className="w-full text-left text-xs md:text-sm font-mono whitespace-nowrap">
                <thead className="bg-white text-black">
                  <tr>
                    <th className="p-3 font-black border-r border-black uppercase tracking-wider text-[10px] md:text-xs">Entity</th>
                    <th className="p-3 font-black border-r border-black uppercase tracking-wider text-[10px] md:text-xs">Round</th>
                    <th className="p-3 font-black border-r border-black uppercase tracking-wider text-[10px] md:text-xs hidden sm:table-cell">Sector</th>
                    <th className="p-3 font-black uppercase tracking-wider text-[10px] md:text-xs">Capital</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {fundedCompanies.map((company, index) => (
                    <tr key={index} className="hover:bg-white/5 transition-colors">
                      <td className="p-3 font-black border-r border-white/10">{company.name}</td>
                      <td className="p-3 border-r border-white/10 text-gray-400">{company.round}</td>
                      <td className="p-3 border-r border-white/10 text-gray-400 hidden sm:table-cell">{company.sector}</td>
                      <td className="p-3 text-green-400 font-black">{company.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="relative mt-4 flex items-center justify-between">
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Updated daily
              </span>
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">1,000+ in DB</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
