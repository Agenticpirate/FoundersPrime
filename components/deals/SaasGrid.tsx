import Link from 'next/link'

export default function SaasGrid() {
    const categories = [
        {
            name: 'Productivity',
            slug: 'productivity',
            count: 34,
            examples: 'Notion, Airtable, Coda, Monday.com, Asana...',
            icon: 'task_alt',
            bgBase: 'bg-white',
            iconBg: 'bg-secondary/30'
        },
        {
            name: 'Marketing',
            slug: 'marketing',
            count: 41,
            examples: 'HubSpot, Mailchimp, Brevo, ActiveCampaign...',
            icon: 'campaign',
            bgBase: 'bg-white',
            iconBg: 'bg-primary/20'
        },
        {
            name: 'Sales & CRM',
            slug: 'sales-crm',
            count: 28,
            examples: 'Salesforce, Pipedrive, Close, Apollo...',
            icon: 'attach_money',
            bgBase: 'bg-white',
            iconBg: 'bg-red-100'
        },
        {
            name: 'Customer Support',
            slug: 'customer-support',
            count: 22,
            examples: 'Intercom, Zendesk, Freshdesk, Help Scout...',
            icon: 'support_agent',
            bgBase: 'bg-white',
            iconBg: 'bg-purple-100'
        },
        {
            name: 'Analytics',
            slug: 'analytics',
            count: 19,
            examples: 'Mixpanel, Amplitude, Segment, Heap...',
            icon: 'bar_chart',
            bgBase: 'bg-white',
            iconBg: 'bg-blue-100'
        },
        {
            name: 'Development',
            slug: 'development',
            count: 31,
            examples: 'GitHub, GitLab, Vercel, Netlify...',
            icon: 'code',
            bgBase: 'bg-white',
            iconBg: 'bg-gray-200'
        },
        {
            name: 'Design',
            slug: 'design',
            count: 18,
            examples: 'Figma, Canva, Webflow, Framer...',
            icon: 'palette',
            bgBase: 'bg-white',
            iconBg: 'bg-pink-100'
        },
        {
            name: 'Communication',
            slug: 'communication',
            count: 10,
            examples: 'Slack, Zoom, Loom, Krisp...',
            icon: 'chat',
            bgBase: 'bg-white',
            iconBg: 'bg-green-100'
        }
    ]

    return (
        <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
                <h2 className="font-mono text-2xl font-bold text-black border-b-3 border-black pb-1">
                    Browse by Category
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <Link key={cat.slug} className="group block" href={`/deals/${cat.slug}`}>
                        <div className={`h-full ${cat.bgBase} border-2 border-black p-5 shadow-[4px_4px_0px_0px_#1a1a1a] transition-all duration-200 group-hover:shadow-[6px_6px_0px_0px_#1a1a1a] group-hover:-translate-y-0.5 group-hover:-translate-x-0.5 relative`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-2 ${cat.iconBg} border border-black rounded-sm`}>
                                    <span className="material-symbols-outlined text-xl text-black">{cat.icon}</span>
                                </div>
                                <span className="bg-black text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase">
                                    {cat.count} Deals
                                </span>
                            </div>

                            <h3 className="font-mono text-lg font-bold uppercase mb-2 group-hover:text-primary transition-colors">
                                {cat.name}
                            </h3>

                            <div className="font-sans text-xs font-medium text-gray-600 mb-4 h-8 overflow-hidden line-clamp-2">
                                {cat.examples}
                            </div>

                            <div className="flex items-center text-black font-mono font-bold text-xs uppercase group-hover:underline mt-auto">
                                View Category <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
