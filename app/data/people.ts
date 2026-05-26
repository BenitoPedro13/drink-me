export interface PersonObject {
  label: string
  emoji: string
  x: number  // percentage from left
  y: number  // percentage from top
  rotate: number
}

export interface Person {
  id: string
  name: string
  country: string
  flagEmoji: string
  age: number
  occupation: string
  objects: PersonObject[]
  thanksText: string
  thanksLanguage: string
  bottleAccent: string
  audioPath?: string
}

export const people: Person[] = [
  {
    id: "maeve",
    name: "Maeve",
    country: "Ireland",
    flagEmoji: "🇮🇪",
    age: 28,
    occupation: "Marine biologist",
    objects: [
      { label: "Seashell", emoji: "🐚", x: 20, y: 25, rotate: -12 },
      { label: "Book", emoji: "📖", x: 60, y: 40, rotate: 8 },
      { label: "Tea", emoji: "🍵", x: 35, y: 65, rotate: -5 },
      { label: "Compass", emoji: "🧭", x: 70, y: 20, rotate: 15 },
    ],
    thanksText: "Go raibh maith agat as mé a ól",
    thanksLanguage: "Irish",
    bottleAccent: "#2d9e6b",
  },
  {
    id: "kenji",
    name: "Kenji",
    country: "Japan",
    flagEmoji: "🇯🇵",
    age: 34,
    occupation: "Jazz musician",
    objects: [
      { label: "Trumpet", emoji: "🎺", x: 25, y: 30, rotate: 10 },
      { label: "Vinyl", emoji: "💿", x: 65, y: 55, rotate: -8 },
      { label: "Ramen", emoji: "🍜", x: 40, y: 70, rotate: 5 },
      { label: "Notebook", emoji: "📓", x: 15, y: 60, rotate: -15 },
    ],
    thanksText: "飲んでくれてありがとう",
    thanksLanguage: "Japanese",
    bottleAccent: "#e85d4a",
  },
  {
    id: "amara",
    name: "Amara",
    country: "Ghana",
    flagEmoji: "🇬🇭",
    age: 25,
    occupation: "Fashion designer",
    objects: [
      { label: "Needle", emoji: "🪡", x: 30, y: 35, rotate: -20 },
      { label: "Sunflower", emoji: "🌻", x: 60, y: 25, rotate: 12 },
      { label: "Sewing", emoji: "✂️", x: 20, y: 65, rotate: -8 },
      { label: "Fabric", emoji: "🎨", x: 70, y: 60, rotate: 18 },
    ],
    thanksText: "Meda wo ase sɛ wonomee me",
    thanksLanguage: "Twi",
    bottleAccent: "#f5a623",
  },
  {
    id: "sofia",
    name: "Sofia",
    country: "Brazil",
    flagEmoji: "🇧🇷",
    age: 31,
    occupation: "Architect",
    objects: [
      { label: "Blueprint", emoji: "📐", x: 25, y: 40, rotate: 8 },
      { label: "Plant", emoji: "🌿", x: 65, y: 30, rotate: -10 },
      { label: "Coffee", emoji: "☕", x: 45, y: 68, rotate: 5 },
      { label: "Camera", emoji: "📷", x: 70, y: 55, rotate: -15 },
    ],
    thanksText: "Obrigada por me beber",
    thanksLanguage: "Portuguese",
    bottleAccent: "#6b4fa0",
  },
]
