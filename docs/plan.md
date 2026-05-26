# "Would you drink me?" — Build Plan

## What we're building
An interactive art website by Lusa (@soolibo). Visitors choose a person represented as a water bottle, learn about them, tap the faucet to fill a cup, decide whether to "drink" (accept them as they are), and receive a thank-you in their language.

---

## Screen Flow

```
[1] Intro         → tap anywhere
[2] Selection     → slide to choose bottle, press SELECT
[3] Detail        → read about the person, click tap to fill cup
[4] Decision      → YES (drink) or NO (go back)
[5] Thanks        → red screen, "thanks for drinking me", voice audio
                    tap to go back to Selection
```

---

## File Structure

```
app/
  layout.tsx           — add Caveat (handwriting) font
  globals.css          — keyframe animations (water fill, drip)
  page.tsx             — state machine (client component)
  data/
    people.ts          — Person type + sample people array
  components/
    IntroScreen.tsx
    SelectionScreen.tsx
    DetailScreen.tsx
    DecisionScreen.tsx
    ThanksScreen.tsx
    Bottle.tsx          — reusable SVG bottle (small + large variants)
public/
  audio/               — placeholder folder for voice memos + water SFX
docs/
  plan.md              — this file
  screens.md           — per-screen design notes
  data-schema.md       — Person data structure
```

---

## Build Order

1. `data/people.ts` — Person type + 4 sample people (Maeve, Kenji, Amara, Sofia)
2. `globals.css` — water-fill keyframe, drip animation
3. `layout.tsx` — add Caveat font, update metadata
4. `components/Bottle.tsx` — SVG water jug (small for carousel, large for detail)
5. `components/IntroScreen.tsx` — black bg, handwriting text, tap to start
6. `components/SelectionScreen.tsx` — horizontal carousel, SELECT button
7. `components/DetailScreen.tsx` — person info card + large bottle + tap faucet
8. `components/DecisionScreen.tsx` — cup top-view + YES / NO
9. `components/ThanksScreen.tsx` — red bg + thanks text + audio
10. `page.tsx` — wire all screens with fade transitions

---

## Key Tech Decisions

| Concern | Decision |
|---|---|
| State | `useState` step machine in `page.tsx` |
| Transitions | CSS `opacity` fade (700ms) between screens |
| Font | Caveat (Google Font via `next/font/google`) for handwriting feel |
| Animations | CSS keyframes in `globals.css` (no animation lib) |
| Water fill | `setInterval` incrementing a `waterLevel` state 0→100, CSS `scaleY` |
| Carousel | CSS scroll-snap + drag/touch handlers |
| Audio | HTML `<audio>` elements; placeholders until real files provided |
| Bottle SVG | Inline SVG path (carboy/dispenser shape), objects as hand-drawn SVG icons |

---

## Person Data Shape

```ts
interface Person {
  id: string
  name: string
  country: string
  flagEmoji: string
  age: number
  occupation: string
  objects: { label: string; emoji: string; x: number; y: number; rotate: number }[]
  thanksText: string       // "Thanks for drinking me" in their language
  thanksLanguage: string
  bottleAccent: string     // hex — bottle cap color
  audioPath?: string       // e.g. "/audio/maeve.mp3"
}
```

---

## Decisions (locked in)

- **Objects**: hand-drawn SVG icons (not emoji) — matches Lusa's illustration style
- **Audio SFX**: Web Audio API tone (no placeholder files needed)
- **NO action**: brief "maybe another time" screen before returning to selection
- **Layout**: mobile-first, but fully responsive and great on desktop too
