"use client"

import { Person } from "@/app/data/people"

interface BottleProps {
  person: Person
  variant?: "small" | "large"
  waterLevel?: number  // 0–100
  className?: string
}

export default function Bottle({ person, variant = "small", waterLevel = 0, className = "" }: BottleProps) {
  const isLarge = variant === "large"
  const s = isLarge ? 2 : 1

  const W = 90 * s
  const H = 165 * s
  const cx = 45 * s
  const stroke = isLarge ? 2 : 1.5

  // Cap
  const capHalfW = 10 * s
  const capY1 = 3 * s
  const capY2 = 13 * s

  // Neck & shoulder → body bezier
  const neckHalfW = 11 * s
  const bodyHalfW = 35 * s
  const bodyTopY = 60 * s
  const bodyBottomY = 155 * s
  const bodyRx = 10 * s
  const sC1Y = 36 * s   // bezier ctrl 1 (stays narrow)
  const sC2Y = 50 * s   // bezier ctrl 2 (reaches body width)

  // Water region inside body
  const waterTop = bodyTopY
  const waterBottom = bodyBottomY - bodyRx
  const waterH = waterBottom - waterTop
  const fillH = (waterLevel / 100) * waterH
  const fillY = waterBottom - fillH

  const clipId = `bc-${person.id}-${variant}`
  const gradId = `gg-${person.id}-${variant}`

  // Smooth bottle path: neck → bezier shoulder → straight body → rounded bottom
  const path = [
    `M ${cx - neckHalfW} ${capY2}`,
    `L ${cx + neckHalfW} ${capY2}`,
    `C ${cx + neckHalfW} ${sC1Y}, ${cx + bodyHalfW} ${sC2Y}, ${cx + bodyHalfW} ${bodyTopY}`,
    `L ${cx + bodyHalfW} ${bodyBottomY - bodyRx}`,
    `Q ${cx + bodyHalfW} ${bodyBottomY} ${cx} ${bodyBottomY}`,
    `Q ${cx - bodyHalfW} ${bodyBottomY} ${cx - bodyHalfW} ${bodyBottomY - bodyRx}`,
    `L ${cx - bodyHalfW} ${bodyTopY}`,
    `C ${cx - bodyHalfW} ${sC2Y}, ${cx - neckHalfW} ${sC1Y}, ${cx - neckHalfW} ${capY2}`,
    `Z`,
  ].join(" ")

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      aria-label={`${person.name}'s bottle`}
      overflow="visible"
    >
      <defs>
        {/* Clip water & highlights to body interior */}
        <clipPath id={clipId}>
          <rect
            x={cx - bodyHalfW + stroke}
            y={bodyTopY}
            width={(bodyHalfW - stroke) * 2}
            height={bodyBottomY - bodyTopY}
            rx={bodyRx}
          />
        </clipPath>

        {/* Horizontal glass sheen gradient */}
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.72)" />
          <stop offset="16%"  stopColor="rgba(255,255,255,0.18)" />
          <stop offset="55%"  stopColor="rgba(255,255,255,0.0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.07)" />
        </linearGradient>
      </defs>

      {/* ── Glass body (fill only, no stroke yet) ── */}
      <path
        d={path}
        fill="rgba(232,246,255,0.45)"
        stroke="none"
      />

      {/* ── Water fill (clipped, person accent color) ── */}
      {waterLevel > 0 && (
        <rect
          x={cx - bodyHalfW + stroke}
          y={fillY}
          width={(bodyHalfW - stroke) * 2}
          height={fillH}
          fill={person.bottleAccent}
          fillOpacity={0.55}
          clipPath={`url(#${clipId})`}
        />
      )}

      {/* ── Floating objects (large only, above water) ── */}
      {isLarge && person.objects.map((obj, i) => {
        const ox = (cx - bodyHalfW + stroke * 3) + (obj.x / 100) * ((bodyHalfW - stroke * 3) * 2)
        const oy = bodyTopY + stroke * 3 + (obj.y / 100) * (waterH - stroke * 6)
        return (
          <text
            key={obj.label}
            x={ox}
            y={oy}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={24}
            className="float"
            style={{
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.3}s`,
              "--rotate": `${obj.rotate}deg`,
              userSelect: "none",
            } as React.CSSProperties}
            clipPath={`url(#${clipId})`}
          >
            {obj.emoji}
          </text>
        )
      })}

      {/* ── Glass sheen gradient overlay ── */}
      <path
        d={path}
        fill={`url(#${gradId})`}
        stroke="none"
        pointerEvents="none"
      />

      {/* ── Left body highlight strip ── */}
      <rect
        x={cx - bodyHalfW + 5 * s}
        y={bodyTopY + 12 * s}
        width={4 * s}
        height={55 * s}
        rx={2 * s}
        fill="rgba(255,255,255,0.62)"
        clipPath={`url(#${clipId})`}
        pointerEvents="none"
      />

      {/* ── Crisp outline on top ── */}
      <path
        d={path}
        fill="none"
        stroke="#1e1e1e"
        strokeWidth={stroke}
        strokeLinejoin="round"
      />

      {/* ── Cap ── */}
      <rect
        x={cx - capHalfW}
        y={capY1}
        width={capHalfW * 2}
        height={capY2 - capY1}
        rx={3 * s}
        fill={person.bottleAccent}
      />
      {/* Cap highlight */}
      <rect
        x={cx - capHalfW + 2 * s}
        y={capY1 + 2 * s}
        width={7 * s}
        height={capY2 - capY1 - 4 * s}
        rx={2 * s}
        fill="rgba(255,255,255,0.38)"
        pointerEvents="none"
      />

      {/* ── Neck collar ring ── */}
      <rect
        x={cx - neckHalfW - s}
        y={capY2 - s}
        width={(neckHalfW + s) * 2}
        height={3 * s}
        rx={1.5 * s}
        fill={person.bottleAccent}
        opacity={0.55}
      />
    </svg>
  )
}
