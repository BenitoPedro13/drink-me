"use client"

import { Person } from "@/app/data/people"

interface DecisionScreenProps {
  person: Person
  onYes: () => void
  onNo: () => void
}

export default function DecisionScreen({ person, onYes, onNo }: DecisionScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white gap-6 px-6">
      {/* Small ID photo */}
      <div className="w-16 h-20 rounded border-2 border-gray-300 flex items-center justify-center text-3xl bg-gray-50">
        {person.flagEmoji}
      </div>

      {/* Question */}
      <h2
        className="text-center text-gray-800"
        style={{ fontFamily: "var(--font-caveat)", fontSize: "clamp(1.8rem, 5vw, 3rem)" }}
      >
        Would you drink me?
      </h2>

      {/* Cup (top-down view, full) */}
      <div className="flex items-center justify-center">
        <svg width="120" height="60" viewBox="0 0 120 60">
          <ellipse cx="60" cy="30" rx="54" ry="27" fill="#90d4f7" fillOpacity={0.5} stroke="#aaa" strokeWidth="2" />
          <ellipse cx="60" cy="30" rx="40" ry="18" fill="#90d4f7" fillOpacity={0.35} />
        </svg>
      </div>

      {/* Buttons */}
      <div className="flex gap-6 mt-2">
        <button
          onClick={onYes}
          className="px-10 py-3 rounded-full text-white font-bold tracking-widest uppercase transition-transform hover:scale-105 active:scale-95"
          style={{
            fontFamily: "var(--font-caveat)",
            fontSize: "1.3rem",
            background: "#3ba6c8",
          }}
        >
          Yes
        </button>
        <button
          onClick={onNo}
          className="px-10 py-3 rounded-full text-white font-bold tracking-widest uppercase transition-transform hover:scale-105 active:scale-95"
          style={{
            fontFamily: "var(--font-caveat)",
            fontSize: "1.3rem",
            background: "#e87878",
          }}
        >
          No
        </button>
      </div>
    </div>
  )
}
