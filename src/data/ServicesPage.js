// You can make one entry per service (home-cleaning, plumbing-leak, etc)
// Reuse your local images in /public like "/cleaning/cleaning-1.png" etc.

export const SERVICE_PAGES = {
  "home-cleaning": {
    title: "House Cleaning",
    shortTitle: "House Cleaning",
    rating: 4.8,
    reviewsCount: 27096,
    recommendation: "3 hours",
    hero: {
      image: "/cleaning/cleaning-1.png",
      alt: "House cleaning service",
    },

    included: [
      {
        title: "Bedroom, Living Room & Common Areas",
        image: "/cleaning/cleaning-2.png",
        bullets: [
          "Dust all accessible surfaces",
          "Wipe mirrors and glass fixtures",
          "Clean floor surfaces",
          "Take out garbage and recycling",
        ],
      },
      {
        title: "Bathroom Cleaning",
        image: "/cleaning/cleaning-3.png",
        bullets: [
          "Wash and sanitize toilet, shower, tub and sink",
          "Dust all accessible surfaces",
          "Wipe mirrors and glass fixtures",
          "Clean floor surfaces",
          "Take out garbage and recycling",
        ],
      },
      {
        title: "Kitchen Cleaning",
        image: "/cleaning/cleaning-1.png",
        bullets: [
          "Dust all accessible surfaces",
          "Load dishwasher with dirty dishes (if any)",
          "Wipe exterior of stove, oven and fridge",
          "Clean floor surfaces",
          "Take out garbage and recycling",
        ],
      },
    ],

    extrasImage: "/cleaning/cleaning-2.png",
    extras: ["Inside cabinets", "Inside fridge", "Inside oven", "Laundry wash & dry", "Interior windows"],

    pros: [
      {
        name: "Sharonda H.",
        rating: 5.0,
        jobs: 179,
        avatar: "/avatars/pro-1.jpg", // put in /public/avatars
        quote: "Deep, thorough cleaning and attention to details. I love making homes feel fresh.",
      },
      {
        name: "Maurilda D.",
        rating: 5.0,
        jobs: 351,
        avatar: "/avatars/pro-2.jpg",
        quote: "I guarantee quality work and great references. I handle small and large homes.",
      },
      {
        name: "Angelique B.",
        rating: 5.0,
        jobs: 1053,
        avatar: "/avatars/pro-3.jpg",
        quote: "Punctual and detail-oriented. I’ll be happy to clean for you and earn your trust.",
      },
    ],

    sampleReviews: [
      { name: "Sara", rating: 5, text: "Super clean and fast. Loved the result." },
      { name: "Yassine", rating: 5, text: "Very professional. Will book again." },
      { name: "Imane", rating: 4, text: "Great service, especially the kitchen." },
    ],

    pricingTeaser: [
      { title: "Standard Clean", from: 199, duration: "2–3h", desc: "Perfect for weekly or routine cleaning." },
      { title: "Deep Clean", from: 399, duration: "4–6h", desc: "More time on details, corners and buildup." },
      { title: "Move In/Out", from: 499, duration: "5–7h", desc: "Ideal before moving or after renovation." },
    ],
  },

  // Example: plumbing
  "fix-a-leak": {
    title: "Plumbing • Fix a Leak",
    shortTitle: "Leak Repair",
    rating: 4.7,
    reviewsCount: 8421,
    recommendation: "1–2 hours",
    hero: { image: "/plumbing-1.png", alt: "Plumbing leak repair" },

    included: [
      {
        title: "Leak diagnosis",
        image: "/plumbing-2.png",
        bullets: ["Identify the leak source", "Explain the fix before starting", "Check nearby fittings and seals"],
      },
      {
        title: "Repair & sealing",
        image: "/plumbing-1.png",
        bullets: ["Tighten/replace small fittings", "Seal where needed", "Basic leak stop (non-structural)"],
      },
      {
        title: "Final check",
        image: "/plumbing-3.png",
        bullets: ["Test water flow", "Clean the area", "Quick prevention tips"],
      },
    ],

    extras: ["Replace faucet (if needed)", "Unclog drain", "Silicone reseal", "Toilet fix", "Pressure check"],
    extrasImage: "/plumbing-2.png",

    pros: [],
    sampleReviews: [
      { name: "Hassan", rating: 5, text: "Solved it quickly. No more dripping." },
      { name: "Nadia", rating: 4, text: "On time and clean work." },
    ],

    pricingTeaser: [
      { title: "Leak Repair", from: 159, duration: "1–2h", desc: "Most small leaks and fitting fixes." },
      { title: "Emergency Visit", from: 249, duration: "ASAP", desc: "Priority support for urgent situations." },
    ],
  },
};
