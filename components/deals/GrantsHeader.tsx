import DealsHeader from './DealsHeader'

export default function GrantsHeader() {
  return (
    <DealsHeader
      parentSection={{ name: 'Programs', href: '/deals' }}
      currentSection="Grants"
    />
  )
}
