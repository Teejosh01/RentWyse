# RentWyse

A single-page, responsive homepage for RentWyse, built from the supplied product/design brief and visual references.

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4 with a custom RentWyse design token layer
- Lucide icons
- Self-hosted Inter and Space Grotesk variable fonts
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

This creates `RentWyse-Homepage-Preview.html` at the repository root. Download or copy that single file and open it directly in Chrome; JavaScript, CSS, fonts and the favicon are embedded, so no server or internet connection is required. It is the same homepage, not a separate page or product flow.

## Checks

With the development server running:

```bash
npm test
```

The browser smoke tests check:

- All eight approved sections, in order, at 1440, 1280, 1024, 834, 768, 600, 430, 390, 375 and 320px
- Exact visible homepage copy against `tests/approved-content.json`, extracted from the supplied PDF
- No horizontal overflow
- Same-page anchor navigation and sticky-header offsets
- Mobile navigation open/close, Escape handling and link selection
- Comfortable CTA tap targets
- Reduced-motion behaviour
- axe WCAG A/AA and best-practice scans at desktop and mobile widths
- No browser errors or failed assets

Set `TEST_URL` to test a different running server. Set `CHROMIUM_PATH` to use an existing Chromium executable; otherwise the tests use the npm-distributed headless browser.

## Content and design notes

- `src/content.ts` contains the locked approved copy. Do not rewrite it.
- `docs/design-synthesis.md` records how the supplied MD files and image references were combined.
- Product visuals are static, conceptual illustrations only. They contain no invented balances, scores, names, transactions, dates or ratings.
- Calls to action are presentation elements that scroll to relevant homepage explanations; they do not start unavailable product flows.
