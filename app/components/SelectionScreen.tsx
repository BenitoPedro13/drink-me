"use client"

import { useRef, useState, useEffect } from "react"
import { Person } from "@/app/data/people"
import Bottle from "./Bottle"

interface SelectionScreenProps {
  people: Person[]
  onSelect: (person: Person) => void
}

export default function SelectionScreen({ people, onSelect }: SelectionScreenProps) {
  const [centeredIndex, setCenteredIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const itemWidth = 140

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollLeft = 0

    const handleScroll = () => {
      const idx = Math.round(el.scrollLeft / itemWidth)
      setCenteredIndex(Math.max(0, Math.min(idx, people.length - 1)))
    }

    el.addEventListener("scroll", handleScroll, { passive: true })
    return () => el.removeEventListener("scroll", handleScroll)
  }, [people.length])

  const scrollTo = (idx: number) => {
    scrollRef.current?.scrollTo({ left: idx * itemWidth, behavior: "smooth" })
  }

  const selected = people[centeredIndex]

  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 min-h-dvh bg-white select-none">
      {/* Top label */}
      <p
        className="text-gray-300 mb-8 tracking-widest uppercase"
        style={{ fontFamily: "var(--font-caveat)", fontSize: "0.85rem", letterSpacing: "0.2em" }}
      >
        Would you drink me?
      </p>

      {/* "Choose me" */}
      <div className="relative mb-3 h-8 flex items-center justify-center">
        <span
          className="text-gray-500 tracking-wide"
          style={{ fontFamily: "var(--font-caveat)", fontSize: "1.2rem" }}
        >
          Choose me
        </span>
      </div>

      {/* Carousel */}
      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-white to-transparent" />

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 px-[calc(50%-70px)] py-4 scroll-smooth"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
          }}
        >
          {people.map((person, idx) => {
            const isCentered = idx === centeredIndex
            return (
              <div
                key={person.id}
                className="flex flex-col items-center flex-shrink-0 cursor-pointer"
                style={{
                  width: itemWidth,
                  scrollSnapAlign: "center",
                  transform: isCentered ? "scale(1.1)" : "scale(0.88)",
                  opacity: isCentered ? 1 : 0.45,
                  transition: "transform 300ms ease, opacity 300ms ease",
                }}
                onClick={() => scrollTo(idx)}
              >
                {/* Pre-filled bottle (75% water level) */}
                <Bottle person={person} variant="small" waterLevel={75} />

                {/* Name + flag */}
                <p
                  className="mt-2 text-center text-gray-700"
                  style={{ fontFamily: "var(--font-caveat)", fontSize: "1.1rem" }}
                >
                  {person.flagEmoji} {person.name}
                </p>

                {/* Accent dot for selected */}
                <div
                  className="mt-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: isCentered ? "6px" : "4px",
                    height: isCentered ? "6px" : "4px",
                    background: isCentered ? person.bottleAccent : "transparent",
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* SELECT button — uses person's accent color */}
      <button
        className="mt-8 px-10 py-3 rounded-full text-white font-semibold tracking-widest uppercase transition-all hover:opacity-90 active:scale-95"
        style={{
          fontFamily: "var(--font-caveat)",
          fontSize: "1.2rem",
          background: selected.bottleAccent,
          boxShadow: `0 4px 18px ${selected.bottleAccent}44`,
        }}
        onClick={() => onSelect(people[centeredIndex])}
      >
        Select
      </button>
    </div>
  )
}
