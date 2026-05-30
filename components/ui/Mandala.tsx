'use client'

/**
 * Mandala — reusable decorative ornament used across the site.
 *
 * Consolidates the spinning-mandala SVG that was previously duplicated
 * inline across every deals hero/stat/strategy component. Gives the whole
 * site one consistent, premium ornament with tunable variant, speed,
 * direction, size and color.
 *
 * Decorative only — always rendered aria-hidden and pointer-events-none.
 */

type MandalaVariant = 'rings' | 'orbital' | 'radial' | 'petal'
type MandalaDirection = 'cw' | 'ccw'

interface MandalaProps {
  /** Geometry preset. */
  variant?: MandalaVariant
  /** Tailwind text color class controlling the stroke (currentColor). */
  colorClass?: string
  /** Opacity 0–1 (applied via inline style for fine control). */
  opacity?: number
  /** Spin duration in seconds. Higher = slower. */
  speed?: number
  /** Spin direction. */
  direction?: MandalaDirection
  /** Stroke width of the SVG. */
  strokeWidth?: number
  /** Extra classes for the wrapper (size + position). */
  className?: string
}

export default function Mandala({
  variant = 'rings',
  colorClass = 'text-gray-900',
  opacity = 0.07,
  speed = 80,
  direction = 'cw',
  strokeWidth = 0.6,
  className = '',
}: MandalaProps) {
  const spinClass = direction === 'cw' ? 'mandala-spin-cw' : 'mandala-spin-ccw'

  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        className={`w-full h-full ${colorClass} ${spinClass}`}
        style={{ animationDuration: `${speed}s` }}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      >
        {variant === 'rings' && (
          <>
            <circle cx="100" cy="100" r="40" />
            <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
            <circle cx="100" cy="100" r="80" strokeDasharray="1 6" />
            <circle cx="100" cy="100" r="3" fill="currentColor" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <g key={deg} transform={`rotate(${deg} 100 100)`}>
                <line x1="100" y1="40" x2="100" y2="20" />
                <circle cx="100" cy="20" r="2" fill="currentColor" />
              </g>
            ))}
          </>
        )}

        {variant === 'orbital' && (
          <>
            <circle cx="100" cy="100" r="50" />
            <circle cx="100" cy="100" r="70" strokeDasharray="3 4" />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <g key={deg} transform={`rotate(${deg} 100 100)`}>
                <line x1="100" y1="50" x2="100" y2="30" />
                <circle cx="100" cy="30" r="1.8" fill="currentColor" />
              </g>
            ))}
            <circle cx="100" cy="100" r="2.5" fill="currentColor" />
          </>
        )}

        {variant === 'radial' && (
          <>
            <circle cx="100" cy="100" r="40" />
            <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="100"
                y1="100"
                x2={100 + Math.cos((i * Math.PI) / 6) * 90}
                y2={100 + Math.sin((i * Math.PI) / 6) * 90}
                strokeDasharray="3 4"
              />
            ))}
            <circle cx="100" cy="100" r="2" fill="currentColor" />
          </>
        )}

        {variant === 'petal' && (
          <>
            {[20, 35, 50, 65].map((r, i) => (
              <ellipse
                key={i}
                cx="100"
                cy="100"
                rx={r}
                ry={r / 1.8}
                transform={`rotate(${i * 30} 100 100)`}
              />
            ))}
            <circle cx="100" cy="100" r="2" fill="currentColor" />
          </>
        )}
      </svg>
    </div>
  )
}
