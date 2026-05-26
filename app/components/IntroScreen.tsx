"use client"

interface IntroScreenProps {
  onStart: () => void
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full bg-black cursor-pointer select-none"
      onClick={onStart}
    >
      <h1
        className="text-center text-white leading-tight"
        style={{ fontFamily: "var(--font-caveat)", fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
      >
        Would you drink me?
      </h1>
      <p
        className="mt-6 text-white/60"
        style={{ fontFamily: "var(--font-caveat)", fontSize: "clamp(1.1rem, 3vw, 1.8rem)" }}
      >
        Tap to start.
      </p>
    </div>
  )
}
