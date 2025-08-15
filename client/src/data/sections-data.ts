import type { Section } from '@shared/schema';

export const SECTIONS_DATA: Omit<Section, 'id' | 'createdAt'>[] = [
  {
    title: "Unblock Your Personal Power",
    slug: "personal-power",
    description: "Transform limiting beliefs and unlock your entrepreneurial potential. Build the mindset foundation for brand success.",
    icon: "fas fa-unlock-alt",
    color: "#ff0095",
    phase: 1,
    promptCount: 15,
    insights: [
      "Before your brand gets dressed, designed, or developed, it needs a why so strong it shakes you awake.",
      "Write a manifesto that gives you goosebumps. That's the kind of energy your brand needs."
    ]
  },
  {
    title: "Unpack Your Big Idea", 
    slug: "big-idea",
    description: "It all starts with a big idea. Not a logo. Not a product. A pulse. Discover your why that shakes you awake.",
    icon: "fas fa-lightbulb",
    color: "#00b4d8",
    phase: 2,
    promptCount: 12,
    insights: [
      "This isn't about what you do. It's about the ripple effect of doing it.",
      "If you don't feel what you stand for, no one else will."
    ]
  },
  {
    title: "Unearth Market Trends",
    slug: "market-trends", 
    description: "Spot the trends before they hit. If you're chasing trends, you're already behind. See what's coming with real data.",
    icon: "fas fa-chart-line",
    color: "#007acc",
    phase: 3,
    promptCount: 18,
    insights: [
      "If you see the wave, you're already late.",
      "Use tools like Glimpse or Exploding Topics to surf the trend before it becomes a tidal wave."
    ]
  },
  {
    title: "Unlock Competitor Secrets",
    slug: "competitor-secrets",
    description: "Become the magician. You don't need to blend in. You need to break the mold. Find your edge and make it sharp.",
    icon: "fas fa-search",
    color: "#a855f7",
    phase: 4,
    promptCount: 14,
    insights: [
      "You don't copy the spell—you become the magician.",
      "Build a swipe file that's equal parts goldmine and battle plan."
    ]
  },
  {
    title: "Uncover Your Audience",
    slug: "audience",
    description: "Speak to the one. You're not for everyone—and that's your superpower. Get uncomfortably specific about your dream clients.",
    icon: "fas fa-users",
    color: "#10b981",
    phase: 5,
    promptCount: 16,
    insights: [
      "Your dream clients aren't everyone—they're someone.",
      "Write copy like you're whispering their secret thoughts back to them."
    ]
  },
  {
    title: "Unveil Your New Brand",
    slug: "new-brand", 
    description: "Dress the part. Your visuals are your brand's outfit—every pixel, palette, and photo tells a story. Look unforgettable.",
    icon: "fas fa-palette",
    color: "#f59e0b",
    phase: 6,
    promptCount: 22,
    insights: [
      "Looking 'professional' isn't enough. You've got to look unforgettable.",
      "Create a mood board that feels like your brand just walked into the room with purpose."
    ]
  },
  {
    title: "Flawlessly Execute to Win",
    slug: "execute",
    description: "Cast systems that scale. Systems are spells you cast once but feel forever. Make your brand work while you rest.",
    icon: "fas fa-rocket",
    color: "#ef4444",
    phase: 7,
    promptCount: 20,
    insights: [
      "Consistency isn't boring when it's beautiful and scalable.",
      "Build once, launch everywhere, and let your brand work while you rest."
    ]
  }
];
