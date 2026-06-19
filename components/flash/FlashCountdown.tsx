'use client'

import { useEffect, useState } from 'react'

interface FlashCountdownProps {
  /** Absolute end time (ISO). Takes priority over durationHours / nextDrop. */
  endsAt?: string
  /** Rolling countdown length in hours, computed from when the page loads. */
  durationHours?: number
  /** Count down to the next Monday or Thursday 00:00 (drop schedule). */
  nextDrop?: boolean
  /** 'hero' = big stat boxes, 'inline' = compact "Ends in 02d : 14h …". */
  variant?: 'hero' | 'inline'
}

interface Remaining {
  days: number
  hours: number
  mins: number
  secs: number
  done: boolean
}

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, '0')
}

function nextDropTime(from: Date): number {
  // Drops happen Monday (1) and Thursday (4) at local 00:00.
  const target = new Date(from)
  target.setHours(0, 0, 0, 0)
  for (let i = 1; i <= 7; i++) {
    const candidate = new Date(target)
    candidate.setDate(target.getDate() + i)
    const day = candidate.getDay()
    if (day === 1 || day === 4) return candidate.getTime()
  }
  return target.getTime() + 24 * 3600 * 1000
}

function diff(targetMs: number): Remaining {
  const ms = targetMs - Date.now()
  if (ms <= 0) return { days: 0, hours: 0, mins: 0, secs: 0, done: true }
  const total = Math.floor(ms / 1000)
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    mins: Math.floor((total % 3600) / 60),
    secs: total % 60,
    done: false,
  }
}

export default function FlashCountdown({
  endsAt,
  durationHours,
  nextDrop,
  variant = 'inline',
}: FlashCountdownProps) {
  // targetMs is resolved on the client only, so SSR/CSR markup stays identical
  // (we render placeholders until mounted) — no hydration mismatch.
  const [targetMs, setTargetMs] = useState<number | null>(null)
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
    setRem(diff(resolved))
  }, [endsAt, durationHours, nextDrop])

  useEffect(() => {
    if (targetMs == null) return
    const id = setInterval(() => setRem(diff(targetMs)), 1000)
    return () => clearInterval(id)
  }, [targetMs])

  const units = [
    { value: rem?.days, label: 'Days', short: 'd' },
    { value: rem?.hours, label: 'Hrs', short: 'h' },
    { value: rem?.mins, label: 'Mins', short: 'm' },
    { value: rem?.secs, label: 'Secs', short: 's' },
  ]

  if (variant === 'hero') {
    return (
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5" role="timer" aria-label="Time until next flash deal drop">
        {units.map((u) => (
          <div
            key={u.label}
            className="rounded-lg bg-black/50 border border-accent-yellow/40 px-1.5 py-2.5 sm:px-2 sm:py-3 text-center"
          >
            <div className="font-mono font-black text-2xl sm:text-3xl md:text-[34px] text-white tabular-nums leading-none">
              {rem ? pad(u.value ?? 0) : '--'}
            </div>
            <div className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.16em] text-accent-yellow mt-1.5">
              {u.label}
            </div>
          </div>
        ))}
      </div>
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
