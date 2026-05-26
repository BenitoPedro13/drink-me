"use client"

import { useEffect, useRef } from "react"
import { Person } from "@/app/data/people"

interface ThanksScreenProps {
  person: Person
  onBack: () => void
}

export default function ThanksScreen({ person, onBack }: ThanksScreenProps) {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (person.audioPath && audioRef.current) {
      audioRef.current.play().catch(() => {})
    }
  }, [person.audioPath])

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full flex-1 min-h-dvh cursor-pointer select-none gap-8 px-6 overflow-hidden"
      style={{ background: "#c41010" }}
      onClick={onBack}
    >
      {/* Subtle radial vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)" }}
      />

      {/* Circular flag badge */}
      <div
        className="relative w-24 h-24 rounded-full flex items-center justify-center text-5xl z-10"
        style={{
          background: "rgba(255,255,255,0.12)",
          border: "2.5px solid rgba(255,255,255,0.35)",
          boxShadow: "0 0 40px rgba(255,255,255,0.08)",
        }}
      >
        <span className="float">{person.flagEmoji}</span>
      </div>

      {/* Thanks text */}
      <p
        className="relative text-center text-white leading-snug z-10"
        style={{ fontFamily: "var(--font-caveat)", fontSize: "clamp(1.8rem, 6vw, 3.5rem)", maxWidth: "560px" }}
      >
        {person.thanksText}
      </p>

      {/* Name */}
      <p
        className="relative text-white/75 z-10"
        style={{ fontFamily: "var(--font-caveat)", fontSize: "clamp(1.2rem, 3vw, 2rem)" }}
      >
        — {person.name} —
      </p>

      {/* Language note */}
      <p
        className="relative text-white/35 tracking-widest uppercase z-10"
        style={{ fontFamily: "var(--font-caveat)", fontSize: "0.85rem" }}
      >
        in {person.thanksLanguage}
      </p>

      {/* Tap hint */}
      <p
        className="absolute bottom-8 text-white/35 z-10"
        style={{ fontFamily: "var(--font-caveat)", fontSize: "1rem" }}
      >
        Tap to continue
      </p>

      {person.audioPath && (
        <audio ref={audioRef} src={person.audioPath} />
      )}
    </div>
  )
}
