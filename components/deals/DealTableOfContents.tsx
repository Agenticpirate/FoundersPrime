'use client'

import { List, MessageSquare, Info, CheckCircle, Users, Lightbulb, HelpCircle } from 'lucide-react'

interface DealTableOfContentsProps {
  commentCount?: number
}

export default function DealTableOfContents({ commentCount = 0 }: DealTableOfContentsProps) {
  const sections = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'whats-included', label: 'What\'s Included', icon: CheckCircle },
    { id: 'eligibility', label: 'Eligibility', icon: Users },
    { id: 'how-to-apply', label: 'How to Apply', icon: List },
    { id: 'pro-tips', label: 'Pro Tips', icon: Lightbulb },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'comments', label: `Comments (${commentCount})`, icon: MessageSquare }
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 sticky top-24">
      <h3 className="text-lg font-bold font-mono text-black mb-4">
        TABLE_OF_CONTENTS
      </h3>
      
      <nav className="space-y-2">
        {sections.map((section) => {
          const IconComponent = section.icon
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="w-full flex items-center gap-3 p-2 text-left hover:bg-gray-50 border-2 border-transparent hover:border-gray-200 transition-all group"
            >
              <IconComponent className="w-4 h-4 text-gray-600 group-hover:text-[#13b6ec]" />
              <span className="text-sm font-medium text-gray-800 group-hover:text-[#13b6ec]">
                {section.label}
              </span>
            </button>
          )
        })}
      </nav>
      
      <div className="mt-6 pt-4 border-t-2 border-gray-200">
        <p className="text-xs text-gray-500 mb-2">Quick Actions</p>
        <div className="space-y-2">
          <button className="w-full bg-[#13b6ec] hover:bg-[#0ea5db] text-white font-bold py-2 px-3 text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            Apply Now
          </button>
          <button className="w-full bg-gray-200 hover:bg-gray-100 text-black font-bold py-2 px-3 text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            Save Deal
          </button>
        </div>
      </div>
    </div>
  )
}