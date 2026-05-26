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
  const width = isLarge ? 180 : 80
  const height = isLarge ? 320 : 140

  // Water fill height as a fraction of the bottle body
  const bodyTopY = isLarge ? 80 : 35
  const bodyBottomY = isLarge ? 290 : 125
  const bodyHeight = bodyBottomY - bodyTopY
  const waterHeight = (waterLevel / 100) * bodyHeight
  const waterY = bodyBottomY - waterHeight

  const cx = width / 2
  const neckTopY = isLarge ? 30 : 14
  const neckBottomY = isLarge ? 80 : 35
  const neckHalfW = isLarge ? 22 : 10
  const bodyHalfW = isLarge ? 60 : 27
  const capH = isLarge ? 18 : 8
  const rx = isLarge ? 10 : 5  // corner radius on body

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-label={`${person.name}'s bottle`}
    >
      {/* Clip path for water inside bottle body */}
      <defs>
        <clipPath id={`bottle-clip-${person.id}-${variant}`}>
          <rect
            x={cx - bodyHalfW + 2}
            y={bodyTopY + 1}
            width={(bodyHalfW - 2) * 2}
            height={bodyHeight - 2}
            rx={rx - 1}
          />
        </clipPath>
      </defs>

      {/* Bottle cap */}
      <rect
        x={cx - neckHalfW + 2}
        y={neckTopY - capH}
        width={(neckHalfW - 2) * 2}
        height={capH}
        rx={3}
        fill={person.bottleAccent}
      />

      {/* Neck */}
      <rect
        x={cx - neckHalfW}
        y={neckTopY}
        width={neckHalfW * 2}
        height={neckBottomY - neckTopY}
        fill="none"
        stroke="#222"
        strokeWidth={isLarge ? 2 : 1.5}
      />

      {/* Body outline */}
      <rect
        x={cx - bodyHalfW}
        y={bodyTopY}
        width={bodyHalfW * 2}
        height={bodyHeight}
        rx={rx}
        fill="none"
        stroke="#222"
        strokeWidth={isLarge ? 2 : 1.5}
      />

      {/* Water fill */}
      {waterLevel > 0 && (
        <rect
          x={cx - bodyHalfW + 2}
          y={waterY}
          width={(bodyHalfW - 2) * 2}
          height={waterHeight}
          fill="#90d4f7"
          fillOpacity={0.7}
          clipPath={`url(#bottle-clip-${person.id}-${variant})`}
          className={waterLevel > 0 ? "water-fill" : ""}
        />
      )}

      {/* Objects (large variant only) */}
      {isLarge && person.objects.map((obj, i) => {
        const objX = cx - bodyHalfW + (obj.x / 100) * (bodyHalfW * 2)
        const objY = bodyTopY + (obj.y / 100) * bodyHeight
        const delay = i * 0.4
        return (
          <text
            key={obj.label}
            x={objX}
            y={objY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={22}
            className="float"
            style={{ animationDelay: `${delay}s`, "--rotate": `${obj.rotate}deg` } as React.CSSProperties}
            clipPath={`url(#bottle-clip-${person.id}-${variant})`}
          >
            {obj.emoji}
          </text>
        )
      })}
    </svg>
  )
}
