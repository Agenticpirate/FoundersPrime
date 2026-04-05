import Link from 'next/link'

const categories = [
    { name: 'Productivity', slug: 'productivity', count: 34, examples: 'Notion, Airtable, Monday', icon: 'task_alt', iconBg: 'bg-yellow-100' },
    { name: 'Marketing', slug: 'marketing', count: 41, examples: 'HubSpot, Mailchimp, Brevo', icon: 'campaign', iconBg: 'bg-orange-100' },
    { name: 'Sales & CRM', slug: 'sales-crm', count: 28, examples: 'Salesforce, Pipedrive, Close', icon: 'attach_money', iconBg: 'bg-red-100' },
    { name: 'Support', slug: 'customer-support', count: 22, examples: 'Intercom, Zendesk, Freshdesk', icon: 'support_agent', iconBg: 'bg-purple-100' },
    { name: 'Analytics', slug: 'analytics', count: 19, examples: 'Mixpanel, Amplitude, Segment', icon: 'bar_chart', iconBg: 'bg-blue-100' },
    { name: 'Dev Tools', slug: 'development', count: 31, examples: 'GitHub, Vercel, Netlify', icon: 'code', iconBg: 'bg-gray-100' },
    { name: 'Design', slug: 'design', count: 18, examples: 'Figma, Canva, Webflow', icon: 'palette', iconBg: 'bg-pink-100' },
    { name: 'Comms', slug: 'communication', count: 10, examples: 'Slack, Zoom, Loom', icon: 'chat', iconBg: 'bg-green-100' },
]

export default function SaasGrid() {
    return (
        <div className="mb-4">
            <h2 className="font-mono text-sm md:text-xl font-bold text-black mb-3 border-b-2 border-black pb-1.5">
                Browse by Category
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                {categories.map((cat) => (
                    <Link key={cat.slug} className="group block" href={`/deals?category=${cat.slug}`}>
                        <div className="h-full bg-white border-2 border-black p-2.5 md:p-4 shadow-[2px_2px_0px_#111] hover:shadow-[3px_3px_0px_#111] hover:-translate-y-0.5 transition-all">
                            <div className="flex justify-between items-start mb-2">
                                <div className={`p-1.5 ${cat.iconBg} border border-black/10 rounded-sm`}>
                                    <span className="material-symbols-outlined text-sm md:text-lg text-black">{cat.icon}</span>
                                </div>
                                <span className="bg-black text-white font-mono text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                                    {cat.count}
                                </span>
                            </div>
                            <h3 className="font-mono text-xs md:text-sm font-bold uppercase mb-0.5 group-hover:text-primary transition-colors">
                                {cat.name}
                            </h3>
                            <p className="text-[9px] md:text-xs text-gray-500 line-clamp-1">{cat.examples}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
