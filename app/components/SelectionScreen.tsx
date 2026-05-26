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
  const itemWidth = 140  // px per bottle slot

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    // Scroll to center the first item on mount
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

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white select-none">
      {/* Top label */}
      <p
        className="text-gray-400 mb-8 tracking-widest uppercase text-sm"
        style={{ fontFamily: "var(--font-caveat)", fontSize: "1rem" }}
      >
        Would you drink me?
      </p>

      {/* "CHOOSE ME" float label */}
      <div className="relative mb-2 h-8 flex items-center justify-center">
        <span
          className="text-gray-700 font-semibold tracking-wide"
          style={{ fontFamily: "var(--font-caveat)", fontSize: "1.25rem" }}
        >
          Choose me
        </span>
      </div>

      {/* Carousel */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient fades on sides */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-white to-transparent" />

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
                  transform: isCentered ? "scale(1.1)" : "scale(0.9)",
                  opacity: isCentered ? 1 : 0.55,
                  transition: "transform 300ms ease, opacity 300ms ease",
                }}
                onClick={() => scrollTo(idx)}
              >
                <Bottle person={person} variant="small" />
                <p
                  className="mt-2 text-center text-gray-700"
                  style={{ fontFamily: "var(--font-caveat)", fontSize: "1.1rem" }}
                >
                  {person.flagEmoji} {person.name}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* SELECT button */}
      <button
        className="mt-8 px-10 py-3 rounded-full border-2 border-gray-800 text-gray-800 font-semibold tracking-widest uppercase hover:bg-gray-800 hover:text-white transition-colors"
        style={{ fontFamily: "var(--font-caveat)", fontSize: "1.2rem" }}
        onClick={() => onSelect(people[centeredIndex])}
      >
        Select
      </button>
    </div>
  )
}
