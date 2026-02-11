import { Plus, ArrowLeft, Crown, Users, MessageSquare, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function NewDiscussionHeader() {
  return (
    <div className="mb-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          href="/community"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#13b6ec] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Community
        </Link>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-[#13b6ec] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/community" className="hover:text-[#13b6ec] transition-colors">
          Community
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">New Discussion</span>
      </div>

      {/* Header */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="bg-[#13b6ec] border-3 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold font-mono text-black mb-3">
              START_DISCUSSION
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Share your questions, insights, or experiences with the FoundersPrime community. 
              Get advice from fellow founders and contribute to meaningful conversations.
            </p>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 border-3 border-blue-500 p-4 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)]">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-blue-800">Active Members</span>
            </div>
            <p className="text-2xl font-bold text-blue-800">1,234</p>
            <p className="text-sm text-blue-600">Online now</p>
          </div>

          <div className="bg-green-50 border-3 border-green-500 p-4 shadow-[3px_3px_0px_0px_rgba(34,197,94,1)]">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-green-600" />
              <span className="font-bold text-green-800">Avg Response</span>
            </div>
            <p className="text-2xl font-bold text-green-800">2.4h</p>
            <p className="text-sm text-green-600">First reply time</p>
          </div>

          <div className="bg-yellow-50 border-3 border-yellow-500 p-4 shadow-[3px_3px_0px_0px_rgba(234,179,8,1)]">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-yellow-600" />
              <span className="font-bold text-yellow-800">Pro+ Members</span>
            </div>
            <p className="text-2xl font-bold text-yellow-800">2,156</p>
            <p className="text-sm text-yellow-600">Expert contributors</p>
          </div>
        </div>

        {/* Pro+ Member Notice */}
        <div className="p-4 bg-yellow-50 border-3 border-yellow-500 shadow-[3px_3px_0px_0px_rgba(234,179,8,1)]">
          <div className="flex items-start gap-3">
            <Crown className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-bold text-yellow-800 mb-1">Pro+ Member Benefits</p>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Create discussions in all categories including Pro+ exclusive</li>
                <li>• Priority visibility in community feeds</li>
                <li>• Access to advanced formatting and media uploads</li>
                <li>• Direct mentions and notifications to other Pro+ members</li>
              </ul>
              <div className="mt-3">
                <Link 
                  href="/pricing"
                  className="text-sm text-[#13b6ec] hover:underline font-bold"
                >
                  Upgrade to Pro+ →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Community Guidelines Notice */}
        <div className="mt-6 p-4 bg-blue-50 border-3 border-blue-500 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)]">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-bold text-blue-800 mb-1">Before You Post</p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Search existing discussions to avoid duplicates</li>
                <li>• Choose the most appropriate category for your topic</li>
                <li>• Be specific and descriptive in your title</li>
                <li>• Follow our community guidelines and code of conduct</li>
              </ul>
              <div className="mt-3">
                <Link 
                  href="/community/guidelines"
                  className="text-sm text-[#13b6ec] hover:underline font-bold"
                >
                  Read Community Guidelines →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}