'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const FOUNDER_QUOTES = [
  "BUILD SOMETHING PEOPLE WANT",
  "DO THINGS THAT DON'T SCALE",
  "SHIPPING IS YOUR ONLY SUPERPOWER",
  "IDEAS ARE CHEAP. EXECUTION IS EVERYTHING",
  "IF YOU aren't EMBARRASSED, YOU LAUNCHED TOO LATE",
  "LUCK FAVORS THE ACTIVE FOUNDER",
  "THE ONLY METRIC THAT MATTERS IS USER LOVE",
  "FAIL FAST, ITERATE FASTER",
  "FIND 100 PEOPLE WHO ABSOLUTELY LOVE YOU",
  "FALL IN LOVE WITH THE PROBLEM, NOT THE SOLUTION",
  "ONE SHIPPED FEATURE > TEN PLANNED DREAMS",
  "CONSISTENCY BEATS TALENT EVERY SINGLE DAY",
  "DEFAULT ALIVE > DEFAULT DEAD",
  "YOUR USERS HAVE ALL THE ANSWERS",
  "FOCUS IS THE ULTIMATE LEVERAGE",
  "SOLVE YOUR OWN PROBLEM FIRST",
  "A BAD PLAN IS BETTER THAN NO PLAN AT ALL",
  "OBSTACLES ARE THE WAY FORWARD",
  "OUTBUILD. OUTSHIP. OUTLAST.",
  "DOUBT IS LAZY. KEEP CODING",
  "NO REVENUE, NO MERCY",
  "SIMPLICITY IS THE ULTIMATE SCALE",
  "GROWTH IS A SYMPTOM OF VALUE",
  "THE FUTURE IS BUILT, NOT PREDICTED",
  "STOP PLANNING. START SHIPPING",
  "NO ONE IS COMING TO SAVE YOU. BUILD IT.",
  "SPEED IS THE ULTIMATE MOAT",
  "KEEP DEPLOYING. THE MARKET WILL ANSWER.",
]

type BubbleState = 'none' | 'hover' | 'rolling' | 'quote'

export default function CursorCompanion() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isMoving, setIsMoving] = useState(false)
  const [currentValue, setCurrentValue] = useState(6)
  const [bubbleState, setBubbleState] = useState<BubbleState>('none')
  const [bubbleText, setBubbleText] = useState("")
  const [isHovered, setIsHovered] = useState(false)
  const [activeDotIdx, setActiveDotIdx] = useState<number | null>(null)

  // Refs — never cause re-renders, safe to read from rAF tick and event handlers
  const mouseRef = useRef({ x: 0, y: 0 })
  const posRef = useRef({ x: 0, y: 0 })
  const lastMoveTimeRef = useRef(0)
  const isMovingRef = useRef(false)
  const isHoveredRef = useRef(false)
  const isRollingRef = useRef(false)
  const rollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pulseIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // ── mount-once effect — empty deps prevents infinite listener re-registration ──
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
    }
  }, []) // ← CRITICAL: empty deps — runs exactly once on mount

  // ── hover bubble — only depends on isHovered, not bubbleState ──────────────
  useEffect(() => {
    if (isRollingRef.current) return
    if (bubbleState === 'rolling' || bubbleState === 'quote') return

    if (isHovered) {
      setBubbleText("[ CLICK DICE TO ROLL ]")
      setBubbleState('hover')
    } else {
      setBubbleState('none')
    }
  }, [isHovered]) // bubbleState intentionally excluded to avoid feedback loop

  // ── idle pulse attractor: cycles a glowing dot when dice is idle ──────────
  useEffect(() => {
    if (pulseIntervalRef.current) {
      clearInterval(pulseIntervalRef.current)
      pulseIntervalRef.current = null
    }

    const shouldPulse = !isMoving && !isHovered && bubbleState === 'none'

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

  // ── roll handler ────────────────────────────────────────────────────────────
  const handleRoll = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (isRollingRef.current) return

    isRollingRef.current = true
    setBubbleState('rolling')
    setBubbleText("[ ROLLING... ]")
    setActiveDotIdx(null)
    if (pulseIntervalRef.current) {
      clearInterval(pulseIntervalRef.current)
      pulseIntervalRef.current = null
    }
    if (rollTimeoutRef.current) clearTimeout(rollTimeoutRef.current)

    let ticks = 0
    const rollTick = () => {
      if (ticks < 10) {
        setCurrentValue(Math.floor(Math.random() * 6) + 1)
        ticks++
        rollTimeoutRef.current = setTimeout(rollTick, 70)
      } else {
        const finalValue = Math.floor(Math.random() * 6) + 1
        setCurrentValue(finalValue)

        const randomQuote = FOUNDER_QUOTES[Math.floor(Math.random() * FOUNDER_QUOTES.length)]
        setBubbleText(`[ ROLL: ${finalValue} · ${randomQuote} ]`)
        setBubbleState('quote')

        // Release lock after a tiny delay to ensure state flush completes
        rollTimeoutRef.current = setTimeout(() => {
          isRollingRef.current = false
          rollTimeoutRef.current = null
        }, 50)
      }
    }

    rollTimeoutRef.current = setTimeout(rollTick, 70)
  }, [])

  if (!isVisible) return null

  // ── dot renderer with per-dot idle glow ─────────────────────────────────────
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
      <div className="grid grid-cols-3 grid-rows-3 w-full h-full p-1 gap-px">
        {dots.map(({ cls, dotIdx }) => {
          const isActive = activeDotIdx !== null && (activeDotIdx % total) === dotIdx
          return (
            <div
              key={dotIdx}
              className={`w-1 h-1 rounded-full ${cls}`}
              style={{
                backgroundColor: '#ffd700',
                transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                boxShadow: isActive
                  ? '0 0 5px 2px rgba(255,215,0,0.9), 0 0 10px 3px rgba(255,215,0,0.5)'
                  : '0 0 0px 0px transparent',
                transform: isActive ? 'scale(1.45)' : 'scale(1)',
              }}
            />
          )
        })}
      </div>
    )
  }

  const isBubbleVisible = bubbleState !== 'none'

  const diceAnimClass =
    bubbleState === 'rolling'
      ? 'animate-[cyber-spin_0.6s_linear_infinite]'
      : isMoving
      ? 'animate-[cyber-wobble_0.4s_ease-in-out_infinite]'
      : 'animate-[cyber-float_2.5s_ease-in-out_infinite]'

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 z-[9999] will-change-transform -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none"
      style={{ width: '28px', height: '28px' }}
    >
      {/* Speech bubble */}
      <div
        className="absolute top-[28px] left-1/2 -translate-x-1/2 text-accent-yellow font-mono text-[8.5px] font-bold uppercase tracking-[0.1em] whitespace-nowrap transition-all duration-255 pointer-events-none text-center"
        style={{
          opacity: isBubbleVisible ? 1 : 0,
          transform: `translateX(-50%) translateY(${isBubbleVisible ? 0 : -3}px)`,
          textShadow: '0 0 3px rgba(255,215,0,0.4)',
        }}
      >
        {bubbleText}
      </div>

      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <div
          onClick={handleRoll}
          className={`w-5.5 h-5.5 rounded bg-[#0b0c0e]/95 border border-[#ffd700]/90 transition-all flex items-center justify-center cursor-pointer ${diceAnimClass}`}
          style={{
            pointerEvents: 'auto',
            filter:
              isHovered && bubbleState !== 'rolling'
                ? 'drop-shadow(0 0 4px rgba(255,215,0,0.7)) brightness(1.15)'
                : activeDotIdx !== null
                ? 'drop-shadow(0 0 2px rgba(255,215,0,0.35))'
                : 'none',
          }}
        >
          {renderDots(currentValue)}
        </div>
      </div>

      <style jsx global>{`
        @keyframes cyber-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-2px) rotate(2deg); }
        }
        @keyframes cyber-wobble {
          0%, 100% { transform: translateY(-0.6px) rotate(-2deg); }
          50% { transform: translateY(0.6px) rotate(2deg); }
        }
        @keyframes cyber-spin {
          0%   { transform: rotate(0deg) scale(0.9); }
          100% { transform: rotate(360deg) scale(0.9); }
        }
      `}</style>
    </div>
  )
}
