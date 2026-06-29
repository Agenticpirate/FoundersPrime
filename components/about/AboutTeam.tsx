export default function AboutTeam() {
  const team = [
    {
      name: 'Alex Chen',
      role: 'Founder & CEO',
      bio: 'Serial entrepreneur with 2 exits. Previously built and sold a fintech startup. Stanford CS, ex-Google.',
      avatar: 'A',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Sarah Kim',
      role: 'Co-founder & CTO',
      bio: 'Former engineering lead at Stripe. Expert in scalable systems and data infrastructure. MIT EECS.',
      avatar: 'S',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Marcus Johnson',
      role: 'Head of Product',
      bio: 'Product leader with 8+ years at early-stage startups. Previously PM at Notion and Figma.',
      avatar: 'M',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Head of Growth',
      bio: 'Growth expert who scaled 3 startups from 0 to $10M ARR. Former growth lead at Airtable.',
      avatar: 'E',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'David Park',
      role: 'Head of Data',
      bio: 'Data scientist and ML engineer. PhD in Computer Science from Berkeley. Ex-Palantir.',
      avatar: 'D',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Lisa Wang',
      role: 'Head of Community',
      bio: 'Community builder who grew developer communities at GitHub and Discord. Expert in founder engagement.',
      avatar: 'L',
      linkedin: '#',
      twitter: '#'
    }
  ]

  return (
    <div className="mb-10 md:mb-14">
      <div className="text-center mb-6 md:mb-4 md:mb-6">
        <h2 className="font-mono text-4xl font-bold text-black mb-6">
          Meet Our Team
        </h2>
        <p className="font-sans text-lg text-gray-600 max-w-3xl mx-auto">
          We&apos;re a team of experienced founders, operators, and builders who are passionate about helping other entrepreneurs succeed. We&apos;ve been in your shoes and understand the challenges you face.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {team.map((member, index) => (
          <div key={index} className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-6 hover:translate-y-[-2px] transition-transform">
            <div className="text-center mb-4">
              <div className="size-20 bg-gray-100 border-2 border-black rounded-sm flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-2xl text-gray-600">{member.avatar}</span>
              </div>
              <h3 className="font-mono text-xl font-bold text-black mb-1">
                {member.name}
              </h3>
              <p className="font-mono text-sm text-primary font-bold mb-3">
                {member.role}
              </p>
            </div>
            
            <p className="font-sans text-sm text-gray-700 leading-relaxed mb-4">
              {member.bio}
            </p>
            
            <div className="flex justify-center gap-3">
              <a 
                href={member.linkedin}
                className="p-2 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors"
              >
                <span className="material-symbols-outlined text-lg">work</span>
              </a>
              <a 
                href={member.twitter}
                className="p-2 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors"
              >
                <span className="material-symbols-outlined text-lg">alternate_email</span>
              </a>
            </div>
          </div>
        ))}
      </div>
      
      {/* Join Team CTA */}
      <div className="mt-12 bg-primary/10 border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8 text-center">
        <h3 className="font-mono text-2xl font-bold text-black mb-4">
          Join Our Team
        </h3>
        <p className="font-sans text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          We&apos;re always looking for passionate people who understand the startup journey. If you&apos;re excited about helping founders build the next generation of great companies, we&apos;d love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-primary hover:bg-black hover:text-white border-2 border-black text-black font-mono font-bold rounded-sm transition-all">
            View Open Positions
          </button>
          <button className="px-6 py-3 bg-white hover:bg-gray-100 border-2 border-black text-black font-mono font-bold rounded-sm transition-all">
            Send Us Your Resume
          </button>
        </div>
      </div>
    </div>
  )
}