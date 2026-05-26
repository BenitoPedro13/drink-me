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
      className="flex flex-col items-center justify-center w-full h-full cursor-pointer select-none gap-8 px-6"
      style={{ background: "#cc1111" }}
      onClick={onBack}
    >
      {/* Photo placeholder */}
      <div className="w-28 h-36 rounded-md border-2 border-white/40 flex items-center justify-center text-6xl bg-white/10">
        {person.flagEmoji}
      </div>

      {/* Thanks text */}
      <p
        className="text-center text-white leading-snug"
        style={{ fontFamily: "var(--font-caveat)", fontSize: "clamp(1.8rem, 6vw, 3.5rem)" }}
      >
        {person.thanksText}
      </p>

      {/* Name */}
      <p
        className="text-white/80"
        style={{ fontFamily: "var(--font-caveat)", fontSize: "clamp(1.2rem, 3vw, 2rem)" }}
      >
        — {person.name} —
      </p>

      {/* Language note */}
      <p
        className="text-white/40 text-sm tracking-widest uppercase"
        style={{ fontFamily: "var(--font-caveat)", fontSize: "0.9rem" }}
      >
        in {person.thanksLanguage}
      </p>

      {/* Tap hint */}
      <p
        className="absolute bottom-8 text-white/40"
        style={{ fontFamily: "var(--font-caveat)", fontSize: "1rem" }}
      >
        Tap to continue
      </p>

      {/* Audio */}
      {person.audioPath && (
        <audio ref={audioRef} src={person.audioPath} />
      )}
    </div>
  )
}
