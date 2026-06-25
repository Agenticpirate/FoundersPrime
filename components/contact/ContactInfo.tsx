import React from 'react'

export default function ContactInfo() {
  const trustStats = [
    { value: '< 24 hrs', label: 'AVG. RESPONSE TIME', icon: 'bolt', iconColor: 'text-amber-400' },
    { value: '7 days', label: 'MONITORED DAILY', icon: 'verified', iconColor: 'text-emerald-450' },
    { value: '100%', label: 'HUMAN TEAM', icon: 'support_agent', iconColor: 'text-blue-400' },
  ]

  const quickInfo = [
    { label: 'RESPONSE TIME', value: '< 24 hours', icon: 'bolt', bg: 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/25' },
    { label: 'HOURS', value: 'Mon-Fri • 9AM-6PM PST', icon: 'schedule', bg: 'bg-blue-400/10 text-blue-400 border border-blue-400/25' },
    { label: 'COVERAGE', value: 'Global • 43+ countries', icon: 'public', bg: 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/25' },
  ]

  const socials = [
    {
      platform: 'X (Twitter)',
      handle: '@FoundersPrime',
      url: 'https://x.com/foundersprime',
      bgClass: 'hover:bg-[#000000]/5 dark:hover:bg-[#ffffff]/5 hover:border-zinc-400 dark:hover:border-zinc-700 hover:shadow-[0_0_15px_rgba(255,255,255,0.06)]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-black dark:text-white" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      platform: 'LinkedIn',
      handle: 'foundersprime',
      url: 'https://linkedin.com/company/foundersprime',
      bgClass: 'hover:bg-[#0077b5]/10 hover:border-[#0077b5]/50 hover:shadow-[0_0_15px_rgba(0,119,181,0.15)]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0077b5]" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    },
    {
      platform: 'Instagram',
      handle: '@FoundersPrime',
      url: 'https://instagram.com/foundersprime',
      bgClass: 'hover:bg-[#e1306c]/10 hover:border-[#e1306c]/50 hover:shadow-[0_0_15px_rgba(225,48,108,0.15)]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#e1306c]" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      )
    },
    {
      platform: 'Threads',
      handle: '@FoundersPrime',
      url: 'https://www.threads.net/@foundersprime',
      bgClass: 'hover:bg-zinc-800/10 dark:hover:bg-zinc-100/10 hover:border-zinc-400 dark:hover:border-zinc-700 hover:shadow-[0_0_15px_rgba(255,255,255,0.06)]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-black dark:text-white" fill="currentColor">
          <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 013.02.142c-.126-.742-.375-1.332-.74-1.756-.5-.582-1.274-.88-2.3-.886h-.027c-.824 0-1.942.227-2.656 1.298l-1.687-1.135c.954-1.41 2.503-2.187 4.354-2.187h.04c3.087.018 4.924 1.911 5.108 5.214.105.043.21.088.31.135 1.4.66 2.426 1.658 2.967 2.886.752 1.708.823 4.494-1.444 6.722-1.732 1.703-3.835 2.474-6.802 2.493zm1.327-9.469c-.235 0-.474.007-.717.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.272 10.272 0 00-2.237-.221z" />
        </svg>
      )
    }
  ]

  return (
    <div className="space-y-6 fp-fade-up">
      {/* WHY REACH OUT? */}
      <div className="bg-white dark:bg-[#08080a] border border-gray-200 dark:border-zinc-800/80 rounded-2xl p-5 shadow-lg">
        <h3 className="font-mono text-[9px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-4">
          Guaranteed Service Standards
        </h3>
        <div className="space-y-3.5">
          {trustStats.map(({ value, label, icon, iconColor }) => (
            <div key={label} className="flex items-center justify-between gap-3 p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-900/35 transition-colors">
              <div className="flex items-center gap-3">
                <div className="size-8 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center rounded-lg flex-shrink-0 border border-zinc-200/50 dark:border-zinc-805">
                  <span className={`material-symbols-outlined !text-[18px] ${iconColor}`}>{icon}</span>
                </div>
                <span className="font-sans text-sm font-bold text-gray-900 dark:text-white">{value}</span>
              </div>
              <span className="font-mono text-[9px] text-gray-400 dark:text-zinc-500 tracking-wider text-right">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ONLINE NOW */}
      <div className="relative bg-white dark:bg-[#08080a] border border-gray-200 dark:border-yellow-400/20 rounded-2xl p-5 overflow-hidden group hover:border-yellow-400/40 transition-all duration-300 shadow-lg">
        <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-[0.02] group-hover:opacity-[0.06] transition-opacity duration-300">
          <svg className="w-20 h-20 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/25 rounded-full mb-3">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="font-mono text-[9px] font-black uppercase tracking-wider text-green-400">
            Realtime Desk Active
          </span>
        </div>
        <h3 className="font-heading text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1.5">
          Real Human Response
        </h3>
        <p className="font-sans text-[11.5px] text-gray-500 dark:text-zinc-400 leading-relaxed">
          No robotic screening or automated ticket tiers. Every single message goes directly to our core engineering and operations partners.
        </p>
      </div>

      {/* QUICK INFO */}
      <div className="bg-white dark:bg-[#08080a] border border-gray-200 dark:border-zinc-800/80 rounded-2xl p-5 shadow-lg">
        <h3 className="font-mono text-[9px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined !text-[15px]">info</span>
          Quick Context
        </h3>
        <div className="space-y-4">
          {quickInfo.map(({ label, value, icon, bg }) => (
            <div key={label} className="flex items-center gap-3.5">
              <div className={`size-8 ${bg} flex items-center justify-center rounded-lg flex-shrink-0`}>
                <span className="material-symbols-outlined !text-[16px]">{icon}</span>
              </div>
              <div>
                <p className="font-mono text-[9px] font-bold text-gray-400 dark:text-zinc-500 tracking-widest uppercase">{label}</p>
                <p className="font-sans text-xs text-gray-900 dark:text-white mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOLLOW US */}
      <div className="bg-white dark:bg-[#08080a] border border-gray-200 dark:border-zinc-800/80 rounded-2xl p-5 shadow-lg">
        <h3 className="font-mono text-[9px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined !text-[15px]">hub</span>
          Social Channels
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col p-3 bg-gray-50 dark:bg-zinc-900/30 border border-gray-250/50 dark:border-zinc-800/50 rounded-xl transition-all duration-300 group ${social.bgClass}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 bg-white dark:bg-black/35 rounded-lg border border-zinc-200/40 dark:border-zinc-800">
                  {social.icon}
                </div>
                <span className="material-symbols-outlined !text-[12px] text-gray-400 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                  arrow_outward
                </span>
              </div>
              <p className="font-mono text-[8px] font-bold text-gray-400 dark:text-zinc-500 tracking-wider uppercase">
                {social.platform}
              </p>
              <p className="font-sans text-[11px] font-extrabold text-gray-900 dark:text-white truncate mt-0.5">
                {social.handle}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
