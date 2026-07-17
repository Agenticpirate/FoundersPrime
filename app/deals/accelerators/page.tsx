import { permanentRedirect } from 'next/navigation'

/** Canonical program hub lives under /programs/* */
export default function RedirectAcceleratorsPage() {
  permanentRedirect('/programs/accelerators')
}
