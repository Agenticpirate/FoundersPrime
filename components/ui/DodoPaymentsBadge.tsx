import Image from 'next/image'
import Link from 'next/link'

type Variant = 'pill' | 'inline'

interface DodoPaymentsBadgeProps {
  variant?: Variant
  className?: string
  /** @deprecated no longer used — single icon + text only (no double logo) */
  forceDarkWordmark?: boolean
}

/**
 * Official Dodo Payments brand mark (icon from dodopayments.com/brand).
 * One icon only — no separate wordmark that also contains the bird.
 */
export default function DodoPaymentsBadge({
  variant = 'pill',
  className = '',
}: DodoPaymentsBadgeProps) {
  if (variant === 'inline') {
    return (
      <Link
        href="https://dodopayments.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-2 ${className}`}
        aria-label="Payments powered by Dodo Payments"
      >
        <span className="relative flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#C6FE1E]">
          <Image
            src="/logos/dodo-favicon.svg"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
            unoptimized
          />
        </span>
        <span className="font-mono text-[10px] text-gray-500">
          Secured by{' '}
          <span className="font-semibold text-gray-700 dark:text-gray-300">Dodo Payments</span>
        </span>
      </Link>
    )
  }

  return (
    <Link
      href="https://dodopayments.com"
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2.5 rounded-full border border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] pl-2 pr-3.5 py-1.5 hover:border-black/15 dark:hover:border-white/20 transition-colors ${className}`}
      aria-label="Payments powered by Dodo Payments"
    >
      {/* Single brand icon — do not also render wordmark (it includes the bird again) */}
      <span className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#C6FE1E] ring-1 ring-black/10">
        <Image
          src="/logos/dodo-favicon.svg"
          alt=""
          width={28}
          height={28}
          className="h-7 w-7 object-contain"
          unoptimized
        />
      </span>
      <span className="flex flex-col items-start leading-none gap-1">
        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-gray-400 dark:text-gray-500">
          Payments powered by
        </span>
        <span className="font-mono text-[12px] font-bold tracking-tight text-gray-900 dark:text-white">
          Dodo Payments
        </span>
      </span>
    </Link>
  )
}
