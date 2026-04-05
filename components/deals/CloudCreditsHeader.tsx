import DealsHeader from './DealsHeader'

export default function CloudCreditsHeader() {
  return (
    <DealsHeader
      parentSection={{ name: 'Deals', href: '/deals' }}
      currentSection="Cloud Credits"
    />
  )
}
