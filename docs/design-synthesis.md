# RentWyse homepage — reference synthesis

## Materials reviewed before implementation

- `RentWyse_Lovable_Homepage_Build_Brief.pdf`: all six pages, including the eight locked content sections, homepage-only scope, accessibility, responsive behaviour and handoff requirements.
- `DESIGN (3).md` — Planpoint: white drafting-paper canvas, generous spacing, Inter, confident display hierarchy, pill controls, flat surfaces, restrained accent usage and minimal shadows.
- `DESIGN (4).md` — Copilot Money: midnight surfaces, a distinct display face, inset rather than heavy elevation, asymmetric floating objects, disciplined use of accent colour and generous section spacing.
- `PropDown - Property Landing Page - UIBundle.jpg`: deep teal bands alternating with white and warm light surfaces; compact navigation; photographic/cards-based rhythm; rounded feature panels; clear repeated actions.
- `Your business shouldn't stop because you've….jpg` (Lands & Homes): editorial headline scale, architectural circular framing, a central phone with overlapping tilted cards, light green accents and fine skyline linework.
- `Modern FinTech Website Design _ Sixpay Financial Platform UI_UX.jpg`: forest-dark hero, fresh lime actions, centered product composition, alternating light feature sections and generous image-led cards.

## Compatible principles

All five references establish a strong first-screen proposition, a deliberate display/body type contrast, rounded containers, controlled colour accents and generous breathing room. The property references add a recognizable rental context; the finance references make savings and payment progress feel approachable. Planpoint supplies restraint and clarity, while Copilot supplies depth and expressive composition.

The references also conflict: two prescribe different blue accents, one is almost entirely white, one almost entirely dark, and the images lean green/teal. Copying their literal tokens would create a collage. Instead, their shared principles are translated into one property-led evergreen palette, with lime as a rare emphasis. Body copy uses a readable regular weight rather than importing the dark reference's thin text at the expense of accessibility.

## Original RentWyse system

- Paper white and soft sage for the main canvas; deep evergreen for the hero, Tenant Score and final invitation.
- Lime for primary actions on dark surfaces; evergreen for actions on light surfaces. No unrelated candy colours or extra accent hues.
- Space Grotesk for structural, tightly tracked headings; Inter for readable body copy and controls.
- Pill actions, 24–32px containers, fine architectural rules, matte fills and very restrained shadows.
- An asymmetric hero with a conceptual phone and floating, slightly rotated feature cards; concentric framing and understated skyline linework connect the property and product stories.
- Different section compositions: four editorial steps, savings visual/text split, centered payment-plan composition, dark Tenant Score panel, landlord ledger illustration, benefit grid and centered final invitation.
- Slow, small hover/focus transitions only; reduced-motion support; no parallax or autoplay.

## Content and scope guardrails

The PDF is the only source of homepage wording. `src/content.ts` holds the approved strings without paraphrasing. Section identifiers are implementation metadata, not extra page copy. Conceptual interface illustrations contain abstract progress marks, bars, checks and the RentWyse brand mark only: no balances, scores, names, transactions, dates, ratings or invented labels.

This is one React homepage, with no additional routes, authentication, accounts, database, API, payment processing or operational dashboard. Navigation scrolls to homepage sections. Presentation CTAs lead to relevant explanatory sections rather than unavailable product flows. The footer contains only the brand and approved section names.
