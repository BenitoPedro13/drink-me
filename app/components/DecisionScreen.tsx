"use client"

import { Person } from "@/app/data/people"

interface DecisionScreenProps {
  person: Person
  onYes: () => void
  onNo: () => void
}

export default function DecisionScreen({ person, onYes, onNo }: DecisionScreenProps) {
  const glassClipId = `dg-${person.id}`
  // Trapezoidal glass: top 96px wide, bottom 68px wide
  const glassPath = "M 12 7 L 108 7 L 94 73 Q 94 78 60 78 Q 26 78 26 73 Z"

  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 min-h-dvh gap-6 px-6 bg-white">
      {/* Badge */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-sm"
        style={{ background: `${person.bottleAccent}22`, border: `2.5px solid ${person.bottleAccent}66` }}
      >
        {person.flagEmoji}
      </div>

      {/* Question */}
      <h2
        className="text-center text-gray-800"
        style={{ fontFamily: "var(--font-caveat)", fontSize: "clamp(1.8rem, 5vw, 3rem)" }}
      >
        Would you drink me?
      </h2>

      {/* Full glass of person's colored water */}
      <svg width="120" height="84" viewBox="0 0 120 84">
        <defs>
          <clipPath id={glassClipId}>
            <path d={glassPath} />
          </clipPath>
        </defs>

        {/* Water fill — full glass */}
        <rect x="0" y="0" width="120" height="84"
          fill={person.bottleAccent}
          fillOpacity="0.52"
          clipPath={`url(#${glassClipId})`}
        />

        {/* Water surface ellipse (slight depth) */}
        <ellipse cx="60" cy="10" rx="44" ry="7"
          fill={person.bottleAccent}
          fillOpacity="0.35"
          clipPath={`url(#${glassClipId})`}
        />

        {/* Glass body outline */}
        <path
          d={glassPath}
          fill="rgba(200,235,255,0.06)"
          stroke="#c0c0c0"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Rim ellipse */}
        <ellipse cx="60" cy="7" rx="48" ry="8"
          fill="rgba(245,252,255,0.55)"
          stroke="#bbb"
          strokeWidth="2"
        />

        {/* Glass highlight */}
        <path d="M 18 20 L 23 60"
          stroke="rgba(255,255,255,0.72)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* Buttons */}
      <div className="flex gap-6 mt-2">
        <button
          onClick={onYes}
          className="px-10 py-3 rounded-full text-white font-bold tracking-widest uppercase transition-transform hover:scale-105 active:scale-95"
          style={{
            fontFamily: "var(--font-caveat)",
            fontSize: "1.3rem",
            background: person.bottleAccent,
          }}
        >
          Yes
        </button>
        <button
          onClick={onNo}
          className="px-10 py-3 rounded-full font-bold tracking-widest uppercase transition-transform hover:scale-105 active:scale-95 border-2"
          style={{
            fontFamily: "var(--font-caveat)",
            fontSize: "1.3rem",
            color: "#555",
            borderColor: "#ccc",
          }}
        >
          No
        </button>
      </div>
    </div>
  )
}
