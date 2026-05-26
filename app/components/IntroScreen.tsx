"use client"

interface IntroScreenProps {
  onStart: () => void
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div
      className="relative flex flex-col items-center justify-center w-full flex-1 min-h-dvh bg-black cursor-pointer select-none overflow-hidden"
      onClick={onStart}
    >
      {/* Animated water ripple rings */}
      {[0, 1, 2, 3].map(i => (
        <div
          key={i}
          aria-hidden
          className="intro-ripple"
          style={{
            width: `${240 + i * 130}px`,
            height: `${240 + i * 130}px`,
            animationDelay: `${i * 1.25}s`,
            animationDuration: "5s",
          }}
        />
      ))}

      {/* A tiny drop icon */}
      <svg
        aria-hidden
        width="28"
        height="36"
        viewBox="0 0 28 36"
        className="mb-6 opacity-60"
      >
        <path
          d="M 14 2 Q 26 14 26 22 A 12 12 0 0 1 2 22 Q 2 14 14 2 Z"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      <h1
        className="relative text-center text-white leading-tight z-10"
        style={{ fontFamily: "var(--font-caveat)", fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
      >
        Would you drink me?
      </h1>
      <p
        className="relative mt-6 text-white/50 z-10"
        style={{ fontFamily: "var(--font-caveat)", fontSize: "clamp(1.1rem, 3vw, 1.8rem)" }}
      >
        Tap to start.
      </p>
    </div>
  )
}
