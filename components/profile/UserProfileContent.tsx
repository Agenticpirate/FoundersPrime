'use client'

import { useState } from 'react'
import { MessageSquare, ThumbsUp, Calendar, ExternalLink, CheckCircle, Clock, XCircle } from 'lucide-react'
import Link from 'next/link'

interface User {
  username: string
  displayName: string
  avatar: string
  badge: 'PRO' | 'PRO+' | 'VERIFIED' | 'ADMIN'
  title: string
  location: string
  website?: string
  twitter?: string
  linkedin?: string
  joinedDate: string
  bio: string
  stats: {
    points: number
    discussions: number
    comments: number
    helpfulAnswers: number
    dealsApplied: number
    creditsSecured: string
  }
  badges: Array<{
    name: string
    icon: string
    description: string
  }>
  recentActivity: Array<{
    type: 'comment' | 'discussion' | 'deal'
    title: string
    description: string
    timestamp: string
    link: string
  }>
  topDiscussions: Array<{
    title: string
    replies: number
    upvotes: number
    timestamp: string
    link: string
  }>
  dealActivity: Array<{
    deal: string
    status: 'Approved' | 'Pending' | 'Rejected'
    value: string
    appliedDate: string
    link: string
  }>
}

interface UserProfileContentProps {
  user: User
}

export default function UserProfileContent({ user }: UserProfileContentProps) {
  const [activeTab, setActiveTab] = useState<'activity' | 'discussions' | 'deals'>('activity')

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'comment': return MessageSquare
      case 'discussion': return MessageSquare
      case 'deal': return CheckCircle
      default: return MessageSquare
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'comment': return 'bg-blue-50 border-blue-500 text-blue-600'
      case 'discussion': return 'bg-green-50 border-green-500 text-green-600'
      case 'deal': return 'bg-yellow-50 border-yellow-500 text-yellow-600'
      default: return 'bg-gray-50 border-gray-500 text-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return CheckCircle
      case 'Pending': return Clock
      case 'Rejected': return XCircle
      default: return Clock
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'text-green-600 bg-green-50 border-green-500'
      case 'Pending': return 'text-yellow-600 bg-yellow-50 border-yellow-500'
      case 'Rejected': return 'text-red-600 bg-red-50 border-red-500'
      default: return 'text-gray-600 bg-gray-50 border-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-4 py-2 font-bold border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all ${activeTab === 'activity'
                ? 'bg-[#13b6ec] text-white'
                : 'bg-white text-black hover:bg-gray-50'
              }`}
          >
            Recent Activity
          </button>
          <button
            onClick={() => setActiveTab('discussions')}
            className={`px-4 py-2 font-bold border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all ${activeTab === 'discussions'
                ? 'bg-[#13b6ec] text-white'
                : 'bg-white text-black hover:bg-gray-50'
              }`}
          >
            Top Discussions
          </button>
          <button
            onClick={() => setActiveTab('deals')}
            className={`px-4 py-2 font-bold border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all ${activeTab === 'deals'
                ? 'bg-[#13b6ec] text-white'
                : 'bg-white text-black hover:bg-gray-50'
              }`}
          >
            Deal Activity
          </button>
        </div>
      </div>

      {/* Recent Activity Tab */}
      {activeTab === 'activity' && (
        <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
          <h3 className="text-xl font-bold font-mono text-black mb-6">
            RECENT_ACTIVITY
          </h3>

          <div className="space-y-6">
            {user.recentActivity.map((activity, index) => {
              const IconComponent = getActivityIcon(activity.type)
              return (
                <div key={index} className="flex items-start gap-4 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0">
                  <div className={`p-2 border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0 ${getActivityColor(activity.type)}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-black">{activity.title}</h4>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{activity.timestamp}</span>
                    </div>

                    <p className="text-gray-700 mb-3 leading-relaxed">
                      {activity.description}
                    </p>

                    <Link
                      href={activity.link}
                      className="inline-flex items-center gap-1 text-sm text-[#13b6ec] hover:underline font-bold"
                    >
                      View Details
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 text-center">
            <button className="bg-gray-200 hover:bg-gray-100 text-black font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
              Load More Activity
            </button>
          </div>
        </div>
      )}

      {/* Top Discussions Tab */}
      {activeTab === 'discussions' && (
        <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
          <h3 className="text-xl font-bold font-mono text-black mb-6">
            TOP_DISCUSSIONS
          </h3>

          <div className="space-y-4">
            {user.topDiscussions.map((discussion, index) => (
              <div key={index} className="bg-gray-50 border-3 border-gray-300 p-4 shadow-[3px_3px_0px_0px_rgba(107,114,128,1)] hover:shadow-[5px_5px_0px_0px_rgba(107,114,128,1)] transition-all">
                <div className="flex items-start justify-between mb-3">
                  <Link
                    href={discussion.link}
                    className="font-bold text-black hover:text-[#13b6ec] transition-colors flex-1"
                  >
                    {discussion.title}
                  </Link>
                  <span className="text-sm text-gray-500 ml-4">{discussion.timestamp}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{discussion.replies} replies</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{discussion.upvotes} upvotes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/deals"
              className="inline-block bg-[#13b6ec] hover:bg-[#0ea5db] text-white font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
            >
              Browse More Deals
            </Link>
          </div>
        </div>
      )}

      {/* Deal Activity Tab */}
      {activeTab === 'deals' && (
        <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
          <h3 className="text-xl font-bold font-mono text-black mb-6">
            DEAL_ACTIVITY
          </h3>

          <div className="space-y-4">
            {user.dealActivity.map((deal, index) => {
              const StatusIcon = getStatusIcon(deal.status)
              return (
                <div key={index} className="bg-gray-50 border-3 border-gray-300 p-4 shadow-[3px_3px_0px_0px_rgba(107,114,128,1)]">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Link
                          href={deal.link}
                          className="font-bold text-black hover:text-[#13b6ec] transition-colors"
                        >
                          {deal.deal}
                        </Link>
                        <div className={`flex items-center gap-1 px-2 py-1 text-xs font-bold border-2 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${getStatusColor(deal.status)}`}>
                          <StatusIcon className="w-3 h-3" />
                          <span>{deal.status}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Value: <strong>{deal.value}</strong></span>
                        <span>•</span>
                        <span>Applied: {deal.appliedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/deals"
              className="inline-block bg-[#13b6ec] hover:bg-[#0ea5db] text-white font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
            >
              Browse More Deals
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}