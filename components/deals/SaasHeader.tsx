import DealsHeader from './DealsHeader'

export default function SaasHeader() {
  return (
    <DealsHeader
      parentSection={{ name: 'Deals', href: '/deals' }}
      currentSection="SaaS Discounts"
    />
  )
}
