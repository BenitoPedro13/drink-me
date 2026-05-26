# Screen Design Notes

## Screen 1 — Intro
- Full black background
- Center: "Would you drink me?" in Caveat font, large, white
- Below: "Tap to start." smaller, white, slight opacity
- Click/tap anywhere → fade to Screen 2

## Screen 2 — Selection
- White background
- Small top label: "Would you drink me?" (tiny, gray)
- Horizontal carousel of bottles — drag/swipe to scroll
  - Each bottle: SVG jug outline + small ID photo card on top
  - Center bottle is highlighted (scale 1.1, subtle shadow)
  - "CHOOSE ME" label floats above center bottle
- SELECT button below carousel (activates on centered bottle)

## Screen 3 — Detail (After Selection)
- White background
- Left: ID card (portrait photo placeholder + name, flag, age, occupation)
- Center: Large bottle SVG — transparent body, objects floating inside at set positions
- Bottom center: faucet/tap + empty cup below it
- Click tap → water drip animation + audio → cup fills over ~2s → auto-advance

## Screen 4 — Decision
- White background
- Top center: person's small ID photo
- Center text: "Would you drink me?"
- Center: cup (top-down circle view) with water
- Left: YES button (teal/blue)
- Right: NO button (salmon/pink)
- YES → Screen 5
- NO → back to Screen 2 (selection)

## Screen 5 — Thanks
- Deep red background (#cc1111)
- Center: person's ID photo (larger)
- Below: thanks text in their language (Caveat font, white)
- Below: "— [Name] —" (white)
- Auto-plays voice memo audio if provided
- Tap anywhere → back to Screen 2 (selection)
