import IdeasGrid from './IdeasGrid'
import IdeasSidebar from './IdeasSidebar'

export default function IdeasContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8">
        <IdeasGrid />
      </div>
      <div className="lg:col-span-4">
        <IdeasSidebar />
      </div>
    </div>
  )
}