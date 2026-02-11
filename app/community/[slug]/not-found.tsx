import Link from 'next/link'
import { MessageSquare, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto text-center">
        <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
          <div className="bg-red-500 border-3 border-black p-4 w-fit mx-auto mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <MessageSquare className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold font-mono text-black mb-4">
            DISCUSSION_NOT_FOUND
          </h1>
          
          <p className="text-gray-700 mb-6">
            The discussion you're looking for doesn't exist or may have been removed by the author or moderators.
          </p>
          
          <div className="space-y-4">
            <Link 
              href="/community"
              className="w-full bg-[#13b6ec] hover:bg-[#0ea5db] text-white font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Community
            </Link>
            
            <Link 
              href="/community?search=true"
              className="w-full bg-gray-200 hover:bg-gray-100 text-black font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search Discussions
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}