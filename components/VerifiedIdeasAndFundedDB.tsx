export default function VerifiedIdeasAndFundedDB() {
  const ideas = [
    {
      title: "AI Legal Compliance",
      category: "B2B SAAS",
      description: "Automated compliance checking for small businesses navigating new AI regulations."
    },
    {
      title: "CRM for Plumbers", 
      category: "VERTICAL",
      description: "Mobile-first CRM focused on dispatching, inventory, and quick invoicing."
    },
    {
      title: "Carbon API",
      category: "DEV TOOL", 
      description: "Simple REST API that developers can plug into e-commerce checkouts."
    }
  ]

  const fundedCompanies = [
    { name: "Vercel", round: "Series D", amount: "$250M" },
    { name: "Supabase", round: "Series B", amount: "$80M" },
    { name: "Railway", round: "Series A", amount: "$20M" },
    { name: "Resend", round: "Seed", amount: "$3M" },
    { name: "Cursor", round: "Seed", amount: "$8M" }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Verified Ideas */}
          <div className="bg-[#f6f6f8] neo-border p-6 md:p-8">
            <div className="flex justify-between items-end mb-8 border-b-2 border-black pb-4">
              <div>
                <h3 className="text-2xl font-bold mb-1 font-mono flex items-center gap-2">
                  <span className="material-symbols-outlined">lightbulb</span> VERIFIED_IDEAS
                </h3>
                <p className="text-gray-600 text-xs font-mono uppercase">Fresh problems needing solutions.</p>
              </div>
              <a className="text-black font-bold hover:underline font-mono text-sm" href="#">VIEW_ALL -&gt;</a>
            </div>
            <div className="space-y-4">
              {ideas.map((idea, index) => (
                <div key={index} className="bg-white border-2 border-black p-4 hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 transition-all cursor-pointer">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-base font-mono">{idea.title}</span>
                    <span className="text-xs font-bold bg-black text-white px-2 py-1 font-mono">{idea.category}</span>
                  </div>
                  <p className="text-sm text-gray-600">{idea.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Funded Database */}
          <div className="bg-black text-white neo-border p-6 md:p-8">
            <div className="flex justify-between items-end mb-8 border-b border-gray-700 pb-4">
              <div>
                <h3 className="text-2xl font-bold mb-1 font-mono flex items-center gap-2">
                  <span className="material-symbols-outlined">database</span> FUNDED_DB
                </h3>
                <p className="text-gray-400 text-xs font-mono uppercase">Recent capital injections.</p>
              </div>
              <a className="text-white font-bold hover:underline font-mono text-sm" href="#">ACCESS_DB -&gt;</a>
            </div>
            <div className="border border-white overflow-hidden">
              <table className="w-full text-left text-sm font-mono">
                <thead className="bg-white text-black">
                  <tr>
                    <th className="p-3 font-bold border-r border-black">ENTITY</th>
                    <th className="p-3 font-bold border-r border-black">ROUND</th>
                    <th className="p-3 font-bold">CAPITAL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {fundedCompanies.map((company, index) => (
                    <tr key={index} className="hover:bg-gray-900">
                      <td className="p-3 font-bold border-r border-gray-800">{company.name}</td>
                      <td className="p-3 border-r border-gray-800 text-gray-400">{company.round}</td>
                      <td className="p-3 text-green-400 font-bold">{company.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}