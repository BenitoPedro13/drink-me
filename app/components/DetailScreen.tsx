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

  useEffect(() => {
    setWaterLevel(0)
    setCupLevel(0)
    setFilling(false)
    setDripping(false)
  }, [person.id])

  // Cup interior clip path points (trapezoidal glass, wider at top)
  const cupClipId = `cup-${person.id}`
  const cupW = 80
  const cupH = 64
  // Glass shape: top width 68px (x=6..74), bottom width 46px (x=17..63), bottom corners rounded
  const cupPath = "M 6 5 L 74 5 L 63 58 Q 63 63 40 63 Q 17 63 17 58 Z"

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full flex-1 min-h-dvh gap-6 px-6 py-8 overflow-auto bg-white">

      {/* ID card */}
      <div className="flex flex-col items-center md:items-start gap-2 md:w-48 flex-shrink-0">
        <div
          className="w-28 h-36 md:w-36 md:h-44 rounded-xl flex items-center justify-center text-5xl"
          style={{ background: `${person.bottleAccent}18`, border: `2px solid ${person.bottleAccent}44` }}
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
            className="text-gray-400"
            style={{ fontFamily: "var(--font-caveat)", fontSize: "1rem" }}
          >
            {person.occupation}
          </p>
        </div>
      </div>

      {/* Bottle + faucet + cup column */}
      <div className="flex flex-col items-center gap-0 flex-shrink-0">
        <Bottle person={person} variant="large" waterLevel={waterLevel} />

        {/* Faucet button */}
        <button
          onClick={handleTap}
          disabled={filling}
          className="mt-1 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none"
          aria-label="Turn on tap to fill cup"
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            className={!filling ? "tap-pulse" : ""}
          >
            {/* Intake pipe from bottle */}
            <rect x="36" y="0" width="8" height="16" rx="4" fill="#b5b5b5" />

            {/* Valve body */}
            <rect x="22" y="12" width="36" height="20" rx="10" fill="#cecece" stroke="#aaa" strokeWidth="1.5" />
            {/* Valve sheen */}
            <ellipse cx="37" cy="18" rx="10" ry="5" fill="rgba(255,255,255,0.45)" />

            {/* T-bar handle */}
            <rect x="10" y="19" width="60" height="6" rx="3" fill="#9a9a9a" />
            <circle cx="10"  cy="22" r="5.5" fill="#888" />
            <circle cx="70"  cy="22" r="5.5" fill="#888" />

            {/* Outlet pipe */}
            <rect x="36" y="30" width="8" height="24" rx="4" fill="#b5b5b5" />

            {/* Nozzle */}
            <rect x="29" y="52" width="22" height="10" rx="5" fill="#a5a5a5" stroke="#999" strokeWidth="1" />

            {/* Drip */}
            {dripping && (
              <ellipse cx="40" cy="70" rx="3.5" ry="5" fill={person.bottleAccent} fillOpacity="0.9" className="drip" />
            )}
          </svg>
        </button>

        {/* Cup (side-view glass) */}
        <div className="mt-3 flex items-center justify-center">
          <svg width={cupW} height={cupH} viewBox={`0 0 ${cupW} ${cupH}`}>
            <defs>
              <clipPath id={cupClipId}>
                <path d={cupPath} />
              </clipPath>
            </defs>

            {/* Water fill rising from bottom */}
            {cupLevel > 0 && (
              <rect
                x="0"
                y={cupH - (58 * cupLevel / 100)}
                width={cupW}
                height={58 * cupLevel / 100}
                fill={person.bottleAccent}
                fillOpacity="0.55"
                clipPath={`url(#${cupClipId})`}
              />
            )}

            {/* Glass body */}
            <path
              d={cupPath}
              fill="rgba(200,235,255,0.08)"
              stroke="#c0c0c0"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Rim ellipse (3D depth) */}
            <ellipse cx="40" cy="5" rx="34" ry="5.5"
              fill="rgba(240,250,255,0.55)"
              stroke="#b8b8b8"
              strokeWidth="1.5"
            />

            {/* Glass highlight */}
            <line x1="11" y1="14" x2="14" y2="50"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
