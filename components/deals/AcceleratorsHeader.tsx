import DealsHeader from './DealsHeader'

export default function AcceleratorsHeader() {
  return (
    <DealsHeader
      parentSection={{ name: 'Programs', href: '/deals' }}
      currentSection="Accelerators"
    />
  )
}
