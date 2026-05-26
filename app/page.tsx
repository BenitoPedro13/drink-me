"use client"

import { useState, useCallback } from "react"
import { people, Person } from "@/app/data/people"
import IntroScreen from "@/app/components/IntroScreen"
import SelectionScreen from "@/app/components/SelectionScreen"
import DetailScreen from "@/app/components/DetailScreen"
import DecisionScreen from "@/app/components/DecisionScreen"
import ThanksScreen from "@/app/components/ThanksScreen"

type Screen = "intro" | "selection" | "detail" | "decision" | "thanks"

export default function Home() {
  const [screen, setScreen] = useState<Screen>("intro")
  const [fading, setFading] = useState(false)
  const [selected, setSelected] = useState<Person>(people[0])

  const goto = useCallback((next: Screen) => {
    setFading(true)
    setTimeout(() => {
      setScreen(next)
      setFading(false)
    }, 350)
  }, [])

  const handleSelect = useCallback((person: Person) => {
    setSelected(person)
    goto("detail")
  }, [goto])

  return (
    <div
      className="flex flex-col flex-1 w-full h-full"
      style={{
        opacity: fading ? 0 : 1,
        transition: "opacity 350ms ease",
        minHeight: "100dvh",
      }}
    >
      {screen === "intro" && (
        <IntroScreen onStart={() => goto("selection")} />
      )}
      {screen === "selection" && (
        <SelectionScreen people={people} onSelect={handleSelect} />
      )}
      {screen === "detail" && (
        <DetailScreen person={selected} onFilled={() => goto("decision")} />
      )}
      {screen === "decision" && (
        <DecisionScreen
          person={selected}
          onYes={() => goto("thanks")}
          onNo={() => goto("selection")}
        />
      )}
      {screen === "thanks" && (
        <ThanksScreen person={selected} onBack={() => goto("selection")} />
      )}
    </div>
  )
}
