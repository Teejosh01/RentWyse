# RentWyse

A single-page, responsive homepage for RentWyse, built from the supplied product/design brief and visual references.

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4 with a custom RentWyse design token layer
- Lucide icons
- Self-hosted Inter and Space Grotesk variable fonts, plus a 1.2 KB Inter subset holding only the naira sign (₦)
- Three optimised WebP photographs (about 270 KB in total)
- No backend, authentication, payment processing, accounts or additional page routes

## Run locally

```bash
npm install
npm run dev
```

The development server binds to `0.0.0.0:5173` and accepts the Arena preview host.

## Build

```bash
npm run build
npm run preview
```

## Standalone Chrome preview

```bash
npm run build:html
```

This creates `RentWyse-Homepage-Preview.html` at the repository root. Download or copy that single file and open it directly in Chrome; JavaScript, CSS, fonts, photographs and the favicon are embedded, so no server or internet connection is required. It is the same homepage, not a separate page or product flow. The build fails rather than produce a file with a missing image.

## Checks

With the development server running:

```bash
npm test
```

The browser smoke tests check:

- All eight approved sections, in order, at 1440, 1280, 1024, 834, 768, 600, 430, 390, 375 and 320px
- Exact visible homepage copy against `tests/approved-content.json`, extracted from the supplied PDF
- No horizontal overflow
- All three photographs load and are either described or marked decorative
- The naira sign is drawn from the page font rather than a system fallback
- Every product example is announced to assistive technology as an example, stays on screen and contains its text
- Same-page anchor navigation and sticky-header offsets
- Mobile navigation open/close, Escape handling and link selection
- Comfortable CTA tap targets
- Reduced-motion behaviour
- axe WCAG A/AA and best-practice scans at desktop and mobile widths
- Measured AA contrast of the final invitation's copy against the photograph behind it, which axe cannot evaluate
- No browser errors or failed assets

Set `TEST_URL` to test a different running server. Set `CHROMIUM_PATH` to use an existing Chromium executable; otherwise the tests use the npm-distributed headless browser.

## Content and design notes

- `src/content.ts` contains the locked approved copy. Do not rewrite it.
- Each section opens with its heading. The brief's section names (`label` in `src/content.ts`) identify sections in code and are not shown above the headings. Four of them serve as the header menu links.
- `docs/design-synthesis.md` records how the supplied MD files and image references were combined.
- Calls to action are presentation elements that scroll to relevant homepage explanations; they do not start unavailable product flows.

## Photographs and sample figures

The homepage mixes photographs with product examples. `src/components/Visuals.tsx` draws all of them.

| Section | Visual |
| --- | --- |
| Hero | Photograph of a tenant, with three small example cards |
| How RentWyse Works | Icons |
| Rent Savings | Example app screen |
| Flexible Rent Payments | Example payment plan |
| Tenant Score | Example score out of 100 |
| For Landlords | Photograph of a landlord, with an example rent overview |
| Why RentWyse? | Icons |
| Final invitation | Photograph of homes at dusk, behind the copy |

**The photographs are AI-generated.** They were made for this page and live in `src/assets/photos/`. The people shown are not real RentWyse customers and no real person is depicted. Replace a photograph by saving a new WebP under the same file name; keep the subject in roughly the same part of the frame, because the example cards are positioned to stay clear of faces and hands.

**The figures are samples, not real data.** Every name, amount, date and score comes from `src/sampleData.ts` and describes one made-up tenant and one made-up landlord. They are there to show what the product looks like in use. Edit that file to change them. Totals, percentages, progress bars and the first tenant's row in the landlord overview are calculated rather than typed, so those stay in step. The file does not check that a payment plan's instalments add up to the rent, so re-read the page after editing.

Rules the examples follow, so that sample figures never read as claims about the business:

- Figures appear only inside the product examples, never in the page's own wording.
- No customer counts, testimonials, ratings, interest rates, fees or returns are shown anywhere.
- Each example is announced to screen readers as an example, and its contents are excluded from the locked-copy check because they are not approved marketing copy.

### The naira sign

The bundled Latin font subsets do not contain ₦. Rather than ship the whole 85 KB extended-Latin file, the page loads a subset holding that one character. To regenerate it:

```bash
pip install fonttools brotli
python3 -m fontTools.subset \
  node_modules/@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2 \
  --unicodes=U+20A6 --flavor=woff2 --layout-features='' \
  --output-file=src/assets/fonts/inter-naira-wght-normal.woff2
```

Amounts are set in Inter. Space Grotesk has no naira sign, so headings must not contain one.
