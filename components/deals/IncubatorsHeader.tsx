import DealsHeader from './DealsHeader'

export default function IncubatorsHeader() {
  return (
    <DealsHeader
      parentSection={{ name: 'Programs', href: '/deals' }}
      currentSection="Incubators"
    />
  )
}
