import ResourcesGrid from './ResourcesGrid'
import ResourcesSidebar from './ResourcesSidebar'

export default function ResourcesContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8">
        <ResourcesGrid />
      </div>
      <div className="lg:col-span-4">
        <ResourcesSidebar />
      </div>
    </div>
  )
}