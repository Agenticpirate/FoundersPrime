import Link from 'next/link'
import { User, Search, ArrowLeft } from 'lucide-react'

export default function UserNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 text-center">
          <div className="bg-red-500 border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block mb-6">
            <User className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold font-mono text-black mb-4">
            USER_NOT_FOUND
          </h1>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            The user profile you're looking for doesn't exist or may have been removed.
          </p>
          
          <div className="space-y-4">
            <Link 
              href="/community"
              className="block w-full bg-[#13b6ec] hover:bg-[#0ea5db] text-white font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
            >
              <div className="flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Browse Community
              </div>
            </Link>
            
            <Link 
              href="/"
              className="block w-full bg-gray-200 hover:bg-gray-100 text-black font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
            >
              <div className="flex items-center justify-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}