'use client'

import { useEffect, useState } from 'react'
import { nextDropTime, dropWindowMs } from '@/lib/flash-schedule'

interface FlashCountdownProps {
  /** Absolute end time (ISO). Takes priority over durationHours / nextDrop. */
  endsAt?: string
  /** Rolling countdown length in hours, computed from when the page loads. */
  durationHours?: number
  /** Count down to the next Monday or Thursday 00:00 (drop schedule). */
  nextDrop?: boolean
  /** 'hero' = big stat boxes, 'inline' = compact "Ends in 02d : 14h …", 'chip' = mini pill. */
  variant?: 'hero' | 'inline' | 'chip'
  /** Called when remaining time updates (hero card progress). */
  onTick?: (remainingMs: number, totalMs: number) => void
}

interface Remaining {
  days: number
  hours: number
  mins: number
  secs: number
  done: boolean
  remainingMs: number
}

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, '0')
}

function diff(targetMs: number): Remaining {
  const ms = targetMs - Date.now()
  if (ms <= 0) {
    return { days: 0, hours: 0, mins: 0, secs: 0, done: true, remainingMs: 0 }
  }
  const total = Math.floor(ms / 1000)
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    mins: Math.floor((total % 3600) / 60),
    secs: total % 60,
    done: false,
    remainingMs: ms,
  }
}

function FlipDigit({
  value,
  label,
  showColon,
  urgent,
}: {
  value: string
  label: string
  showColon?: boolean
  urgent?: boolean
}) {
  return (
    <div className="relative flex flex-col items-center min-w-0">
      {/* Clean digit — no middle seam, no heavy boxed flip-clock frame */}
      <div
        className={`relative w-full rounded-lg md:rounded-xl overflow-hidden transition-colors duration-300 ${
          urgent
            ? 'bg-red-500/[0.08] border border-red-400/25'
            : 'bg-white/[0.04] border border-white/[0.08]'
        }`}
      >
        <div
          key={value}
          className={`relative font-mono font-black text-[18px] sm:text-[28px] md:text-[36px] tabular-nums leading-none text-center py-2 sm:py-3 md:py-3.5 px-0.5 tracking-tight ${
            urgent ? 'text-red-300' : 'text-white'
          }`}
          style={{
            textShadow: urgent
              ? '0 0 16px rgba(248,113,113,0.4)'
              : '0 0 18px rgba(255,215,0,0.12)',
          }}
        >
          {value}
        </div>
      </div>

      <div
        className={`font-mono text-[7px] sm:text-[9px] font-black uppercase tracking-[0.14em] mt-1 ${
          urgent ? 'text-red-400' : 'text-accent-yellow/90'
        }`}
      >
        {label}
      </div>

      {showColon && (
        <span
          className={`hidden sm:block absolute -right-[7px] top-[14px] font-mono text-sm font-black ${
            urgent ? 'text-red-400/50' : 'text-accent-yellow/40'
          }`}
          aria-hidden
        >
          :
        </span>
      )}
    </div>
  )
}

export default function FlashCountdown({
  endsAt,
  durationHours,
  nextDrop,
  variant = 'inline',
  onTick,
}: FlashCountdownProps) {
  // targetMs is resolved on the client only, so SSR/CSR markup stays identical
  // (we render placeholders until mounted) — no hydration mismatch.
  const [targetMs, setTargetMs] = useState<number | null>(null)
  const [windowMs, setWindowMs] = useState(3.5 * 24 * 3600 * 1000)
  const [rem, setRem] = useState<Remaining | null>(null)

  useEffect(() => {
    let resolved: number
    if (endsAt) {
      resolved = new Date(endsAt).getTime()
    } else if (nextDrop) {
      resolved = nextDropTime(new Date())
    } else {
      resolved = Date.now() + (durationHours ?? 24) * 3600 * 1000
    }
    setTargetMs(resolved)
    setWindowMs(nextDrop ? dropWindowMs(resolved) : (durationHours ?? 24) * 3600 * 1000)
    const r = diff(resolved)
    setRem(r)
    onTick?.(r.remainingMs, nextDrop ? dropWindowMs(resolved) : (durationHours ?? 24) * 3600 * 1000)
  }, [endsAt, durationHours, nextDrop, onTick])

  useEffect(() => {
    if (targetMs == null) return
    const id = setInterval(() => {
      const r = diff(targetMs)
      setRem(r)
      onTick?.(r.remainingMs, windowMs)
    }, 1000)
    return () => clearInterval(id)
  }, [targetMs, windowMs, onTick])

  const units = [
    { value: rem?.days, label: 'Days' },
    { value: rem?.hours, label: 'Hrs' },
    { value: rem?.mins, label: 'Mins' },
    { value: rem?.secs, label: 'Secs' },
  ]

  const urgent = Boolean(rem && !rem.done && rem.remainingMs < 6 * 3600 * 1000)

  if (variant === 'hero') {
    return (
      <div
        className="grid grid-cols-4 gap-1 sm:gap-2.5"
        role="timer"
        aria-label="Time until next flash deal drop"
        aria-live="polite"
      >
        {units.map((u, i) => (
          <FlipDigit
            key={u.label}
            value={rem ? pad(u.value ?? 0) : '--'}
            label={u.label}
            showColon={i < 3}
            urgent={urgent && i >= 2}
          />
        ))}
      </div>
    )
  }

  if (variant === 'chip') {
    if (rem?.done) {
      return (
        <span className="font-mono text-[10px] font-bold text-red-400 uppercase">Expired</span>
      )
    }
    return (
      <span className="font-mono text-[10px] font-bold tabular-nums text-gray-700 dark:text-zinc-300">
        {rem ? pad(rem.days) : '--'}d {rem ? pad(rem.hours) : '--'}h {rem ? pad(rem.mins) : '--'}m
      </span>
    )
  }

  // inline variant
  return (
    <span className="font-mono text-[11px] font-bold tabular-nums" aria-label="Time remaining">
      {rem?.done ? (
        <span className="text-red-400">Expired</span>
      ) : (
        <>
          Ends in {rem ? pad(rem.days) : '--'}d : {rem ? pad(rem.hours) : '--'}h :{' '}
          {rem ? pad(rem.mins) : '--'}m : {rem ? pad(rem.secs) : '--'}s
        </>
      )}
    </span>
  )
}
