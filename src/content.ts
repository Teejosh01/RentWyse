// Approved homepage copy extracted verbatim from the supplied build brief.
// Do not rewrite these strings. Layout and visual line breaks live in components.

export const content = [
  {
    number: "01",
    label: "HERO",
    id: "hero",
    heading: "Save Rent Smart. Pay Rent Easy.",
    description: "From building your rent savings to making payments, RentWyse puts you in control of your rent journey.",
    bullets: [
    ],
    ctas: ["Get Started"],
  },
  {
    number: "02",
    label: "HOW RENTWYSE WORKS",
    id: "how-rentwyse-works",
    heading: "Rent smarter. One step at a time.",
    description: "Renting doesn't have to feel overwhelming. RentWyse helps you plan, save and pay your rent through a simple, connected process.",
    bullets: [
      "01. Set your rent goal — Decide how much you need for rent and set a savings target that works for you.",
      "02. Save at your pace — Put money aside gradually and watch your rent savings grow towards your target.",
      "03. Choose a payment plan — Explore payment options that work for you and agree on a rent payment schedule with your landlord.",
      "04. Pay and stay on track — Make your rent payments, monitor your progress and build your Tenant Score over time.",
    ],
    ctas: [],
  },
  {
    number: "03",
    label: "RENT SAVINGS",
    id: "rent-savings",
    heading: "Your next rent starts with what you save today.",
    description: "Take the pressure off rent season. Set a savings goal, put money aside at your own pace and gradually build towards your next rent payment.",
    bullets: [
      "Set a rent savings target that suits your needs.",
      "Save gradually towards your target.",
      "Track your savings progress in one place.",
      "Put your accumulated savings towards your rent payments.",
    ],
    ctas: ["Start Saving"],
  },
  {
    number: "04",
    label: "FLEXIBLE RENT PAYMENTS",
    id: "flexible-rent-payments",
    heading: "Rent doesn't have to come all at once.",
    description: "Big rent payments can be overwhelming. RentWyse helps you break your rent into instalments through payment plans agreed upon with your landlord.",
    bullets: [
      "Explore flexible rent payment options.",
      "Agree on a payment schedule with your landlord.",
      "Use your rent savings towards your payments.",
      "Keep track of every payment and outstanding balance.",
    ],
    ctas: ["Explore Flexible Rent"],
    note: "Payment plans are subject to landlord approval.",
  },
  {
    number: "05",
    label: "TENANT SCORE",
    id: "tenant-score",
    heading: "Build a rental record that speaks for you.",
    description: "Your rent payment history matters. RentWyse helps you build a record based on your rental payment behaviour, giving landlords more insight into your reliability as a tenant.",
    bullets: [
      "Build your rental payment history.",
      "Track your payment consistency.",
      "Improve your Tenant Score over time.",
      "Build trust with prospective landlords.",
    ],
    ctas: ["Build Your Tenant Score"],
  },
  {
    number: "06",
    label: "FOR LANDLORDS",
    id: "for-landlords",
    heading: "Make rent management easier.",
    description: "RentWyse gives landlords a simpler way to manage rent payments, monitor tenant payment progress and keep track of their rental income.",
    bullets: [
      "Keep track of tenant rent payments.",
      "Monitor outstanding rent balances.",
      "Review agreed payment plans.",
      "Access payment records and transaction history.",
    ],
    ctas: ["Get Started as a Landlord"],
  },
  {
    number: "07",
    label: "WHY RENTWYSE?",
    id: "why-rentwyse",
    heading: "A better way to handle rent.",
    description: "Renting, saving and managing payments shouldn't be stressful. RentWyse brings the tools you need to make your rent journey simpler and more organised.",
    bullets: [
      "Save with purpose — Build towards your next rent payment by saving at your own pace.",
      "Enjoy payment flexibility — Explore rent payment plans that give you more room to pay over time, with your landlord's approval.",
      "Stay in control — Monitor your savings, payments and progress in one place.",
      "Build rental trust — Develop a record of responsible rent payments over time.",
    ],
    ctas: ["Get Started"],
  },
  {
    number: "08",
    label: "FINAL CALL TO ACTION",
    id: "final-cta",
    heading: "Your next rent starts with RentWyse.",
    description: "Start saving towards your rent, explore flexible payment plans and take control of how you pay. RentWyse makes it easier to plan ahead and stay on top of your rent.",
    bullets: [
    ],
    ctas: ["Get Started", "Explore RentWyse"],
  },
] as const

export type Section = (typeof content)[number]
export type FeatureBullet = { number?: string; title: string; detail: string }

export function splitFeature(text: string): FeatureBullet {
  const match = text.match(/^(?:(\d{2})\. )?(.+?) — (.+)$/)
  if (!match) return { title: text, detail: '' }
  return { number: match[1], title: match[2], detail: match[3] }
}
