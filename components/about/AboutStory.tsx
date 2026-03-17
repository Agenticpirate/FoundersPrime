export default function AboutStory() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-10 md:mb-14">
      <div className="lg:col-span-8">
        <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8 md:p-10">
          <h2 className="font-mono text-3xl font-bold text-black mb-4 md:mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl">auto_stories</span>
            Our Story
          </h2>
          
          <div className="prose prose-neutral max-w-none">
            <p className="font-sans text-lg text-gray-700 leading-relaxed mb-6">
              FoundersPrime started in 2019 when our founder, Alex Chen, was building his second startup and spending countless hours researching deals, grants, and resources scattered across the internet. After securing over $200K in free credits and grants for his own company, he realized there had to be a better way.
            </p>
            
            <p className="font-sans text-lg text-gray-700 leading-relaxed mb-6">
              "I was spending 20+ hours a week just finding and applying for deals that could save my startup thousands of dollars," Alex recalls. "I thought, what if there was a single platform that aggregated all these opportunities and made them easily discoverable?"
            </p>
            
            <div className="bg-gray-50 border-2 border-gray-300 rounded-sm p-6 mb-6">
              <h3 className="font-mono text-xl font-bold mb-4">The Problem We Solved</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-lg mt-0.5">problem</span>
                  <span className="font-sans text-gray-700">Deals and grants were scattered across hundreds of websites</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-lg mt-0.5">schedule</span>
                  <span className="font-sans text-gray-700">Founders wasted weeks researching instead of building</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-lg mt-0.5">visibility_off</span>
                  <span className="font-sans text-gray-700">Many valuable opportunities remained hidden or expired</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-lg mt-0.5">help</span>
                  <span className="font-sans text-gray-700">No guidance on which deals were worth pursuing</span>
                </li>
              </ul>
            </div>
            
            <p className="font-sans text-lg text-gray-700 leading-relaxed mb-6">
              What started as a simple spreadsheet shared with friends quickly grew into a comprehensive platform. By 2021, we had cataloged over 1,000 deals and were helping hundreds of founders save time and money. Today, FoundersPrime serves over 50,000 founders worldwide and has facilitated access to over $2.8 billion in deals and credits.
            </p>
            
            <p className="font-sans text-lg text-gray-700 leading-relaxed">
              We're not just building a database—we're creating the infrastructure that helps founders focus on what matters most: building great products and serving customers.
            </p>
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-4 space-y-6">
        {/* Timeline */}
        <div className="bg-black text-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6">
          <h3 className="font-mono text-lg font-bold mb-4 text-primary">Our Journey</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary text-black size-8 flex items-center justify-center text-sm font-bold rounded-sm flex-shrink-0">
                19
              </div>
              <div>
                <p className="font-mono text-sm font-bold text-white">Founded</p>
                <p className="font-sans text-xs text-gray-300">Started as a personal spreadsheet</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary text-black size-8 flex items-center justify-center text-sm font-bold rounded-sm flex-shrink-0">
                20
              </div>
              <div>
                <p className="font-mono text-sm font-bold text-white">First 100 Users</p>
                <p className="font-sans text-xs text-gray-300">Launched beta platform</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary text-black size-8 flex items-center justify-center text-sm font-bold rounded-sm flex-shrink-0">
                21
              </div>
              <div>
                <p className="font-mono text-sm font-bold text-white">1K Deals</p>
                <p className="font-sans text-xs text-gray-300">Reached 1,000 cataloged deals</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary text-black size-8 flex items-center justify-center text-sm font-bold rounded-sm flex-shrink-0">
                22
              </div>
              <div>
                <p className="font-mono text-sm font-bold text-white">10K Users</p>
                <p className="font-sans text-xs text-gray-300">Community growth milestone</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary text-black size-8 flex items-center justify-center text-sm font-bold rounded-sm flex-shrink-0">
                23
              </div>
              <div>
                <p className="font-mono text-sm font-bold text-white">Series A</p>
                <p className="font-sans text-xs text-gray-300">$5M funding to scale platform</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary text-black size-8 flex items-center justify-center text-sm font-bold rounded-sm flex-shrink-0">
                24
              </div>
              <div>
                <p className="font-mono text-sm font-bold text-white">50K Users</p>
                <p className="font-sans text-xs text-gray-300">Global founder community</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recognition */}
        <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6">
          <h3 className="font-mono text-lg font-bold mb-4">Recognition</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-yellow-500">star</span>
              <div>
                <p className="font-mono text-sm font-bold">Product Hunt #1</p>
                <p className="font-sans text-xs text-gray-500">Product of the Day 2023</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-yellow-500">emoji_events</span>
              <div>
                <p className="font-mono text-sm font-bold">TechCrunch Startup</p>
                <p className="font-sans text-xs text-gray-500">Battlefield Finalist 2023</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-yellow-500">workspace_premium</span>
              <div>
                <p className="font-mono text-sm font-bold">Forbes 30 Under 30</p>
                <p className="font-sans text-xs text-gray-500">Founder recognition 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}