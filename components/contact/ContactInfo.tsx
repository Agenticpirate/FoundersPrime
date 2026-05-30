import Mandala from '@/components/ui/Mandala'

export default function ContactInfo() {
  const infoItems = [
    { icon: 'bolt', label: 'Response Time', value: '< 24 hours', accent: 'bg-primary/15 text-primary' },
    { icon: 'schedule', label: 'Hours', value: 'Mon–Fri · 9AM–6PM PST', accent: 'bg-accent-yellow/20 text-yellow-700' },
    { icon: 'public', label: 'Coverage', value: 'Global · 43+ countries', accent: 'bg-green-100 text-green-700' },
  ]

  const socials = [
    { platform: 'Twitter', handle: '@FoundersPrime', icon: 'alternate_email', url: 'https://twitter.com/foundersprime' },
    { platform: 'LinkedIn', handle: '/foundersprime', icon: 'work', url: '#' },
    { platform: 'GitHub', handle: '/foundersprime', icon: 'code', url: '#' },
    { platform: 'Discord', handle: 'Join the community', icon: 'forum', url: '#' }
  ]

  return (
    <div className="space-y-4">
      {/* Response promise — dark card */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-black border-2 border-black shadow-[6px_6px_0px_#ffd700] p-5 overflow-hidden fp-fade-up">
        <Mandala
          variant="orbital"
          colorClass="text-accent-yellow"
          opacity={0.12}
          speed={70}
          strokeWidth={0.7}
          className="absolute -top-10 -right-10 w-40 h-40"
        />
        <div className="relative">
          <div className="inline-flex items-center gap-1.5 border border-accent-yellow/40 bg-accent-yellow/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-accent-yellow mb-3">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
            Online now
          </div>
          <h3 className="font-mono text-lg font-black text-white uppercase leading-tight mb-1.5">
            We Reply to Everyone
          </h3>
          <p className="font-sans text-xs text-gray-400 leading-relaxed">
            No bots, no canned tickets. Every message lands with a real person on our team.
          </p>
        </div>
      </div>

      {/* Quick Info */}
      <div className="bg-white border-2 border-black shadow-[6px_6px_0px_#111] p-5 fp-fade-up" style={{ animationDelay: '0.05s' }}>
        <h3 className="font-mono text-sm font-black text-black mb-4 uppercase tracking-wide flex items-center gap-2">
          <span className="material-symbols-outlined !text-[18px]">info</span>
          Quick Info
        </h3>
        <div className="space-y-3">
          {infoItems.map(({ icon, label, value, accent }) => (
            <div key={label} className="flex items-center gap-3 border-b border-dashed border-black/10 pb-3 last:border-0 last:pb-0">
              <div className={`size-9 ${accent} border border-black/20 flex items-center justify-center flex-shrink-0`}>
                <span className="material-symbols-outlined !text-[18px]">{icon}</span>
              </div>
              <div>
                <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wide">{label}</p>
                <p className="font-mono text-sm text-gray-800 font-bold">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social */}
      <div className="bg-white border-2 border-black shadow-[6px_6px_0px_#111] p-5 fp-fade-up" style={{ animationDelay: '0.1s' }}>
        <h3 className="font-mono text-sm font-black text-black mb-4 uppercase tracking-wide flex items-center gap-2">
          <span className="material-symbols-outlined !text-[18px]">share</span>
          Follow Us
        </h3>
        <div className="space-y-2">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target={social.url !== '#' ? '_blank' : undefined}
              rel={social.url !== '#' ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-3 p-2.5 border-2 border-black bg-white hover:bg-accent-yellow hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#111] shadow-[2px_2px_0px_#111] transition-all group"
            >
              <div className="size-9 bg-black border-2 border-black flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                <span className="material-symbols-outlined text-white !text-[18px] group-hover:text-black transition-colors">{social.icon}</span>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-sm font-bold text-black leading-none">{social.platform}</p>
                <p className="font-mono text-[10px] text-gray-500 group-hover:text-black/70 truncate transition-colors">{social.handle}</p>
              </div>
              <span className="material-symbols-outlined !text-[16px] text-gray-300 ml-auto group-hover:text-black transition-colors">arrow_outward</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
