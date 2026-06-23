import { redirect } from 'next/navigation'

export default function RedirectIncubatorsPage() {
  redirect('/programs?type=incubators')
}
