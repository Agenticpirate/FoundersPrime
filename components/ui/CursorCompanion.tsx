'use client'

import { useEffect, useRef, useState, useCallback, type CSSProperties } from 'react'

/** Short, logical founder mantras — scannable in the dice bubble. */
const FOUNDER_QUOTES = [
  // Classic / timeless
  "BUILD SOMETHING PEOPLE WANT",
  "DO THINGS THAT DON'T SCALE",
  "IDEAS ARE CHEAP. EXECUTION WINS",
  "IF YOU AREN'T EMBARRASSED, YOU LAUNCHED TOO LATE",
  "FALL IN LOVE WITH THE PROBLEM",
  "DEFAULT ALIVE > DEFAULT DEAD",
  "YOUR USERS HAVE THE ANSWERS",
  "FOCUS IS THE ULTIMATE LEVERAGE",
  "SOLVE YOUR OWN PROBLEM FIRST",
  "OUTBUILD. OUTSHIP. OUTLAST.",
  "SPEED IS THE ULTIMATE MOAT",
  "STOP PLANNING. START SHIPPING",
  "NO ONE IS COMING. BUILD IT.",
  "KEEP DEPLOYING. MARKET ANSWERS.",
  // Short punchy
  "SHIP TODAY",
  "RUNWAY IS OXYGEN",
  "TALK TO USERS",
  "CHARGE MONEY",
  "START UGLY",
  "PROOF > PITCH",
  "STAY SCRAPPY",
  "MOMENTUM COMPOUNDS",
  "ONE CUSTOMER. THEN TEN.",
  "REVENUE FIXES ALMOST ALL",
  "NARROW AND DEEP",
  "DISTRIBUTION IS PRODUCT",
  "MAKE IT EXIST FIRST",
  "WRITE IT DOWN",
  "ASK FOR THE SALE",
  "CONSTRAINTS CREATE GENIUS",
  "HIRE SLOW. SHIP FAST.",
  "CASH IS A FEATURE",
  "BE USEFUL. BE CLEAR.",
  "DOUBT IS LAZY. BUILD.",
  "ONE THING AT A TIME",
  "SELL BEFORE YOU SCALE",
  "CONSISTENCY BEATS TALENT",
  "LUCK FAVORS THE ACTIVE",
  "FAIL FAST. ITERATE FASTER.",
  "SHIPPING IS A SUPERPOWER",
  "GROWTH FOLLOWS VALUE",
  "SIMPLICITY SCALES",
  "THE FUTURE IS BUILT",
  "STAY HUNGRY. STAY SHIPPING.",
  "BUILD IN PUBLIC",
  "MAKE 1 PERSON LOVE IT",
  "CUT SCOPE. KEEP QUALITY.",
  "DEADLINES CREATE TRUTH",
  "MEASURE WHAT MATTERS",
  "UNDERDOG ENERGY ONLY",
]

type BubbleState = 'none' | 'hover' | 'rolling' | 'quote' | 'idle'

type ParticleKind = 'spark' | 'dollar'
type ParticleTone = 'yellow' | 'dark'

type BurstParticle = {
  id: number
  x: number
  y: number
  cx: number
  cy: number
  tone: ParticleTone
  kind: ParticleKind
  rot: number
  size: number
}

type TrailParticle = {
  id: number
  x: number
  y: number
  tone: ParticleTone
  kind: ParticleKind
  rot: number
  size: number
  /** Precomputed drift (avoid Math.random in render / hydration mismatch). */
  cx: number
  cy: number
}

export default function CursorCompanion() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isMoving, setIsMoving] = useState(false)
  const [currentValue, setCurrentValue] = useState(6)
  const [bubbleState, setBubbleState] = useState<BubbleState>('none')
  const [bubbleText, setBubbleText] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [activeDotIdx, setActiveDotIdx] = useState<number | null>(null)
  const [sparks, setSparks] = useState<BurstParticle[]>([])
  const [trail, setTrail] = useState<TrailParticle[]>([])

  const mouseRef = useRef({ x: 0, y: 0 })
  const posRef = useRef({ x: 0, y: 0 })
  const lastMoveTimeRef = useRef(0)
  const isMovingRef = useRef(false)
  const isHoveredRef = useRef(false)
  const isRollingRef = useRef(false)
  const rollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pulseIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const idleQuoteRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sparkIdRef = useRef(0)
  const trailIdRef = useRef(0)
  const lastTrailAtRef = useRef(0)

  /** Burst around dice — mix of yellow/dark sparks + tiny $ glyphs */
  const spawnSparks = useCallback((count = 10) => {
    const batch: BurstParticle[] = []
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4
      const dist = 14 + Math.random() * 28
      sparkIdRef.current += 1
      // ~35% tiny dollars, rest sparks
      const isDollar = i % 3 === 1 || Math.random() < 0.2
      batch.push({
        id: sparkIdRef.current,
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 8,
        cx: Math.cos(angle) * dist,
        cy: Math.sin(angle) * dist - 6,
        tone: isDollar ? 'yellow' : i % 3 === 0 ? 'dark' : 'yellow',
        kind: isDollar ? 'dollar' : 'spark',
        rot: (Math.random() - 0.5) * 40,
        size: isDollar ? 7 + Math.random() * 3 : 3,
      })
    }
    setSparks((prev) => [...prev.slice(-24), ...batch])
    window.setTimeout(() => {
      setSparks((prev) => prev.filter((s) => !batch.find((b) => b.id === s.id)))
    }, 620)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const isLargeScreen = window.innerWidth >= 1024
    if (isTouch || !isLargeScreen) return

    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }

      const dx = e.clientX - posRef.current.x
      const dy = e.clientY - posRef.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 22) {
        if (!isHoveredRef.current) {
          isHoveredRef.current = true
          setIsHovered(true)
        }
      } else {
        if (isHoveredRef.current) {
          isHoveredRef.current = false
          setIsHovered(false)
        }
        lastMoveTimeRef.current = Date.now()
        if (!isMovingRef.current) {
          isMovingRef.current = true
          setIsMoving(true)
        }

        // Micro trail while moving — yellow/dark sparks + tiny $ (throttled)
        const now = Date.now()
        if (now - lastTrailAtRef.current > 55 && distance > 6) {
          lastTrailAtRef.current = now
          const baseX = posRef.current.x
          const baseY = posRef.current.y
          const batch: TrailParticle[] = []

          // Always one spark
          trailIdRef.current += 1
          batch.push({
            id: trailIdRef.current,
            x: baseX + (Math.random() - 0.5) * 6,
            y: baseY + (Math.random() - 0.5) * 6,
            tone: trailIdRef.current % 4 === 0 ? 'dark' : 'yellow',
            kind: 'spark',
            rot: 0,
            size: 2.5 + Math.random() * 1.5,
            cx: (Math.random() - 0.5) * 16,
            cy: -8 - Math.random() * 18,
          })

          // Often a tiny $ alongside
          if (Math.random() < 0.55) {
            trailIdRef.current += 1
            batch.push({
              id: trailIdRef.current,
              x: baseX + (Math.random() - 0.5) * 10,
              y: baseY + (Math.random() - 0.5) * 8,
              tone: 'yellow',
              kind: 'dollar',
              rot: (Math.random() - 0.5) * 50,
              size: 7 + Math.random() * 4,
              cx: (Math.random() - 0.5) * 18,
              cy: -10 - Math.random() * 22,
            })
          }

          setTrail((prev) => [...prev.slice(-18), ...batch])
          const ids = new Set(batch.map((b) => b.id))
          window.setTimeout(() => {
            setTrail((prev) => prev.filter((t) => !ids.has(t.id)))
          }, 480)
        }
      }
    }

    const handleResize = () => {
      if (window.innerWidth < 1024) setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    let animFrame: number
    const tick = () => {
      const timeSinceMove = Date.now() - lastMoveTimeRef.current

      if (timeSinceMove > 500 && isMovingRef.current) {
        isMovingRef.current = false
        setIsMoving(false)
      }

      if (!isHoveredRef.current) {
        const targetX = mouseRef.current.x + 65
        const targetY = mouseRef.current.y + 65
        posRef.current.x += (targetX - posRef.current.x) * 0.05
        posRef.current.y += (targetY - posRef.current.y) * 0.05
      }

      if (containerRef.current) {
        const rx = Math.round(posRef.current.x)
        const ry = Math.round(posRef.current.y)
        containerRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      }

      animFrame = requestAnimationFrame(tick)
    }
    animFrame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animFrame)
      if (rollTimeoutRef.current) clearTimeout(rollTimeoutRef.current)
      if (pulseIntervalRef.current) clearInterval(pulseIntervalRef.current)
      if (idleQuoteRef.current) clearTimeout(idleQuoteRef.current)
    }
  }, [])

  // Hover bubble
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isRollingRef.current) return
    if (bubbleState === 'rolling' || bubbleState === 'quote') return

    if (isHovered) {
      setBubbleText('[ CLICK TO ROLL A MANTRA ]')
      setBubbleState('hover')
    } else if (bubbleState === 'hover') {
      setBubbleState('none')
    }
  }, [isHovered])

  // Idle pulse attractor
  useEffect(() => {
    if (pulseIntervalRef.current) {
      clearInterval(pulseIntervalRef.current)
      pulseIntervalRef.current = null
    }

    const shouldPulse =
      !isMoving && !isHovered && (bubbleState === 'none' || bubbleState === 'idle')

    if (shouldPulse) {
      let idx = 0
      setActiveDotIdx(0)
      pulseIntervalRef.current = setInterval(() => {
        idx = (idx + 1) % 6
        setActiveDotIdx(idx)
      }, 420)
    } else {
      setActiveDotIdx(null)
    }

    return () => {
      if (pulseIntervalRef.current) {
        clearInterval(pulseIntervalRef.current)
        pulseIntervalRef.current = null
      }
    }
  }, [isMoving, isHovered, bubbleState])

  // Occasional idle mantra — separate so bubbleState 'idle' doesn't cancel itself
  useEffect(() => {
    if (isMoving || isHovered || bubbleState === 'rolling' || bubbleState === 'quote') {
      return
    }
    if (bubbleState === 'idle') return

    const show = window.setTimeout(() => {
      if (isRollingRef.current || isHoveredRef.current || isMovingRef.current) return
      const q = FOUNDER_QUOTES[Math.floor(Math.random() * FOUNDER_QUOTES.length)]
      setBubbleText(`[ ${q} ]`)
      setBubbleState('idle')
      idleQuoteRef.current = setTimeout(() => {
        setBubbleState((s) => (s === 'idle' ? 'none' : s))
      }, 3400)
    }, 4800)

    return () => {
      window.clearTimeout(show)
    }
  }, [isMoving, isHovered, bubbleState])

  const handleRoll = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (isRollingRef.current) return

      isRollingRef.current = true
      setBubbleState('rolling')
      setBubbleText('[ ROLLING... ]')
      setActiveDotIdx(null)
      spawnSparks(6)
      if (pulseIntervalRef.current) {
        clearInterval(pulseIntervalRef.current)
        pulseIntervalRef.current = null
      }
      if (rollTimeoutRef.current) clearTimeout(rollTimeoutRef.current)

      let ticks = 0
      const rollTick = () => {
        if (ticks < 12) {
          setCurrentValue(Math.floor(Math.random() * 6) + 1)
          ticks++
          if (ticks % 3 === 0) spawnSparks(3)
          rollTimeoutRef.current = setTimeout(rollTick, 60)
        } else {
          const finalValue = Math.floor(Math.random() * 6) + 1
          setCurrentValue(finalValue)

          const randomQuote = FOUNDER_QUOTES[Math.floor(Math.random() * FOUNDER_QUOTES.length)]
          setBubbleText(`[ ${finalValue} · ${randomQuote} ]`)
          setBubbleState('quote')
          spawnSparks(14)

          rollTimeoutRef.current = setTimeout(() => {
            isRollingRef.current = false
            rollTimeoutRef.current = null
          }, 50)
        }
      }

      rollTimeoutRef.current = setTimeout(rollTick, 60)
    },
    [spawnSparks]
  )

  if (!isVisible) return null

  const renderDots = (val: number) => {
    const dotPositions: Record<number, { cls: string; dotIdx: number }[]> = {
      1: [{ cls: 'col-start-2 row-start-2 justify-self-center self-center', dotIdx: 0 }],
      2: [
        { cls: 'col-start-1 row-start-1 justify-self-center self-center', dotIdx: 0 },
        { cls: 'col-start-3 row-start-3 justify-self-center self-center', dotIdx: 1 },
      ],
      3: [
        { cls: 'col-start-1 row-start-1 justify-self-center self-center', dotIdx: 0 },
        { cls: 'col-start-2 row-start-2 justify-self-center self-center', dotIdx: 1 },
        { cls: 'col-start-3 row-start-3 justify-self-center self-center', dotIdx: 2 },
      ],
      4: [
        { cls: 'col-start-1 row-start-1 justify-self-center self-center', dotIdx: 0 },
        { cls: 'col-start-3 row-start-1 justify-self-center self-center', dotIdx: 1 },
        { cls: 'col-start-1 row-start-3 justify-self-center self-center', dotIdx: 2 },
        { cls: 'col-start-3 row-start-3 justify-self-center self-center', dotIdx: 3 },
      ],
      5: [
        { cls: 'col-start-1 row-start-1 justify-self-center self-center', dotIdx: 0 },
        { cls: 'col-start-3 row-start-1 justify-self-center self-center', dotIdx: 1 },
        { cls: 'col-start-2 row-start-2 justify-self-center self-center', dotIdx: 2 },
        { cls: 'col-start-1 row-start-3 justify-self-center self-center', dotIdx: 3 },
        { cls: 'col-start-3 row-start-3 justify-self-center self-center', dotIdx: 4 },
      ],
      6: [
        { cls: 'col-start-1 row-start-1 justify-self-center self-center', dotIdx: 0 },
        { cls: 'col-start-3 row-start-1 justify-self-center self-center', dotIdx: 1 },
        { cls: 'col-start-1 row-start-2 justify-self-center self-center', dotIdx: 2 },
        { cls: 'col-start-3 row-start-2 justify-self-center self-center', dotIdx: 3 },
        { cls: 'col-start-1 row-start-3 justify-self-center self-center', dotIdx: 4 },
        { cls: 'col-start-3 row-start-3 justify-self-center self-center', dotIdx: 5 },
      ],
    }

    const dots = dotPositions[val] ?? []
    const total = dots.length

    return (
      <div className="grid grid-cols-3 grid-rows-3 w-full h-full p-[2px] gap-px">
        {dots.map(({ cls, dotIdx }) => {
          const isActive = activeDotIdx !== null && activeDotIdx % total === dotIdx
          return (
            <div
              key={dotIdx}
              className={`w-[3px] h-[3px] rounded-full ${cls}`}
              style={{
                backgroundColor: '#ffd700',
                transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                boxShadow: isActive
                  ? '0 0 3px 1px rgba(255,215,0,0.85)'
                  : '0 0 0px 0px transparent',
                transform: isActive ? 'scale(1.25)' : 'scale(1)',
              }}
            />
          )
        })}
      </div>
    )
  }

  const isBubbleVisible = bubbleState !== 'none'
  const isQuoteLike = bubbleState === 'quote' || bubbleState === 'idle'

  const diceAnimClass =
    bubbleState === 'rolling'
      ? 'animate-[cyber-spin_0.55s_linear_infinite]'
      : isMoving
        ? 'animate-[cyber-wobble_0.4s_ease-in-out_infinite]'
        : 'animate-[cyber-float_2.5s_ease-in-out_infinite]'

  return (
    <>
      {/* Fixed trail: sparks + tiny $ in viewport coords */}
      {trail.map((t) =>
        t.kind === 'dollar' ? (
          <span
            key={t.id}
            className="cursor-dollar fixed z-[9998] pointer-events-none"
            style={
              {
                left: t.x,
                top: t.y,
                fontSize: t.size,
                '--cx': `${t.cx}px`,
                '--cy': `${t.cy}px`,
                '--rot': `${t.rot}deg`,
              } as CSSProperties
            }
            aria-hidden
          >
            $
          </span>
        ) : (
          <span
            key={t.id}
            className={`cursor-spark ${t.tone === 'yellow' ? 'cursor-spark--yellow' : 'cursor-spark--dark'} fixed z-[9998] pointer-events-none`}
            style={
              {
                left: t.x,
                top: t.y,
                width: t.size,
                height: t.size,
                '--cx': `${t.cx}px`,
                '--cy': `${t.cy}px`,
              } as CSSProperties
            }
          />
        )
      )}

      <div
        ref={containerRef}
        className="fixed top-0 left-0 z-[9999] will-change-transform -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none"
        /* Compact hit area — keep dice small so it never dominates the cursor */
        style={{ width: '24px', height: '24px' }}
      >
        {/* Burst around dice — sparks + tiny $ */}
        {sparks.map((s) =>
          s.kind === 'dollar' ? (
            <span
              key={s.id}
              className="cursor-dollar"
              style={
                {
                  left: `calc(50% + ${s.x}px)`,
                  top: `calc(50% + ${s.y}px)`,
                  fontSize: s.size,
                  '--cx': `${s.cx}px`,
                  '--cy': `${s.cy}px`,
                  '--rot': `${s.rot}deg`,
                } as CSSProperties
              }
              aria-hidden
            >
              $
            </span>
          ) : (
            <span
              key={s.id}
              className={`cursor-spark ${s.tone === 'yellow' ? 'cursor-spark--yellow' : 'cursor-spark--dark'}`}
              style={
                {
                  left: `calc(50% + ${s.x}px)`,
                  top: `calc(50% + ${s.y}px)`,
                  width: s.size,
                  height: s.size,
                  '--cx': `${s.cx}px`,
                  '--cy': `${s.cy}px`,
                } as CSSProperties
              }
            />
          )
        )}

        {/* Speech bubble */}
        <div
          className={`absolute top-[30px] left-1/2 text-accent-yellow font-mono text-[8.5px] font-bold uppercase tracking-[0.1em] whitespace-nowrap transition-all duration-255 pointer-events-none text-center max-w-[min(70vw,340px)] ${
            isQuoteLike ? 'cursor-quote-strike' : ''
          }`}
          style={{
            opacity: isBubbleVisible ? 1 : 0,
            transform: `translateX(-50%) translateY(${isBubbleVisible ? 0 : -3}px)`,
            textShadow:
              bubbleState === 'quote'
                ? '0 0 8px rgba(255,215,0,0.55), 0 0 18px rgba(255,215,0,0.25)'
                : '0 0 3px rgba(255,215,0,0.4)',
            background:
              bubbleState === 'quote' || bubbleState === 'idle'
                ? 'linear-gradient(90deg, transparent, rgba(0,0,0,0.55), transparent)'
                : 'transparent',
            padding: bubbleState === 'quote' || bubbleState === 'idle' ? '3px 8px' : 0,
            borderRadius: 4,
          }}
        >
          {bubbleText}
        </div>

        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={handleRoll}
            className={`rounded bg-[#0b0c0e]/95 border border-[#ffd700]/90 transition-all flex items-center justify-center cursor-pointer p-0 m-0 min-w-0 min-h-0 appearance-none leading-none box-border ${diceAnimClass}`}
            style={{
              /* Fixed 18px face — prevents browser default <button> sizing from inflating the dice */
              width: 18,
              height: 18,
              pointerEvents: 'auto',
              filter:
                isHovered && bubbleState !== 'rolling'
                  ? 'drop-shadow(0 0 5px rgba(255,215,0,0.8)) brightness(1.15)'
                  : bubbleState === 'rolling'
                    ? 'drop-shadow(0 0 6px rgba(255,215,0,0.85))'
                    : activeDotIdx !== null
                      ? 'drop-shadow(0 0 2px rgba(255,215,0,0.35))'
                      : 'none',
            }}
            title="Roll a founder mantra"
            aria-label="Roll a founder mantra"
          >
            {renderDots(currentValue)}
          </button>
        </div>

        <style jsx global>{`
          @keyframes cyber-float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-2px) rotate(2deg);
            }
          }
          @keyframes cyber-wobble {
            0%,
            100% {
              transform: translateY(-0.6px) rotate(-2deg);
            }
            50% {
              transform: translateY(0.6px) rotate(2deg);
            }
          }
          @keyframes cyber-spin {
            0% {
              transform: rotate(0deg) scale(0.9);
            }
            100% {
              transform: rotate(360deg) scale(0.9);
            }
          }
        `}</style>
      </div>
    </>
  )
}
