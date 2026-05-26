"use client"

import { useState, useEffect, useCallback } from "react"
import { Person } from "@/app/data/people"
import Bottle from "./Bottle"

interface DetailScreenProps {
  person: Person
  onFilled: () => void
}

export default function DetailScreen({ person, onFilled }: DetailScreenProps) {
  const [waterLevel, setWaterLevel] = useState(0)
  const [filling, setFilling] = useState(false)
  const [dripping, setDripping] = useState(false)
  const [cupLevel, setCupLevel] = useState(0)

  const handleTap = useCallback(() => {
    if (filling) return
    setFilling(true)
    setDripping(true)

    // Play a soft tone via Web Audio API
    try {
      const ctx = new AudioContext()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.setValueAtTime(440, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 1.5)
      gain.gain.setValueAtTime(0.15, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5)
      osc.start()
      osc.stop(ctx.currentTime + 1.5)
    } catch {
      // audio not available
    }

    // Fill water level over ~2s
    const start = Date.now()
    const duration = 2000
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const level = Math.min(100, (elapsed / duration) * 100)
      setWaterLevel(level)
      setCupLevel(level)
      if (level >= 100) {
        clearInterval(interval)
        setDripping(false)
        setTimeout(onFilled, 600)
      }
    }, 30)
  }, [filling, onFilled])

  // Reset when person changes
  useEffect(() => {
    setWaterLevel(0)
    setCupLevel(0)
    setFilling(false)
    setDripping(false)
  }, [person.id])

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full h-full bg-white gap-6 px-6 py-8 overflow-auto">

      {/* ID card */}
      <div className="flex flex-col items-center md:items-start gap-2 md:w-48 flex-shrink-0">
        {/* Photo placeholder */}
        <div
          className="w-28 h-36 md:w-36 md:h-44 rounded-md border-2 border-gray-300 flex items-center justify-center text-5xl bg-gray-50"
          aria-label={`${person.name} photo placeholder`}
        >
          {person.flagEmoji}
        </div>
        <div className="text-center md:text-left mt-2">
          <p
            className="text-gray-900 font-semibold"
            style={{ fontFamily: "var(--font-caveat)", fontSize: "1.5rem" }}
          >
            {person.name}
          </p>
          <p
            className="text-gray-500"
            style={{ fontFamily: "var(--font-caveat)", fontSize: "1.1rem" }}
          >
            {person.age} · {person.country}
          </p>
          <p
            className="text-gray-500"
            style={{ fontFamily: "var(--font-caveat)", fontSize: "1rem" }}
          >
            {person.occupation}
          </p>
        </div>
      </div>

      {/* Bottle + tap + cup */}
      <div className="flex flex-col items-center gap-0 flex-shrink-0">
        <Bottle person={person} variant="large" waterLevel={waterLevel} />

        {/* Faucet / tap */}
        <button
          onClick={handleTap}
          disabled={filling}
          className="mt-1 flex flex-col items-center gap-0 group disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Turn on tap to fill cup"
        >
          {/* Tap handle */}
          <div
            className={`w-10 h-5 rounded-full border-2 border-gray-700 bg-gray-200 group-hover:bg-gray-300 transition-colors ${!filling ? "tap-pulse" : ""}`}
          />
          {/* Spout */}
          <div className="w-1.5 h-6 bg-gray-700 rounded-b" />

          {/* Drip */}
          {dripping && (
            <div className="w-2 h-3 rounded-full bg-[#90d4f7] drip" />
          )}
        </button>

        {/* Cup (top-down ellipse view) */}
        <div className="mt-4 relative flex items-center justify-center">
          <svg width="80" height="40" viewBox="0 0 80 40">
            {/* Cup rim */}
            <ellipse cx="40" cy="20" rx="36" ry="18" fill="none" stroke="#aaa" strokeWidth="2" />
            {/* Water fill */}
            {cupLevel > 0 && (
              <ellipse
                cx="40"
                cy="20"
                rx={36 * (cupLevel / 100)}
                ry={18 * (cupLevel / 100)}
                fill="#90d4f7"
                fillOpacity={0.65}
              />
            )}
          </svg>
        </div>
      </div>
    </div>
  )
}
