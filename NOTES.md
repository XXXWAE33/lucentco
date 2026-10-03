# Lucent Clean Co. — Build Notes

Working notes for the redesign. Tracks what's done, what's blocked, and the
decisions that aren't obvious from reading the code.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion
**Last updated:** 2026-07-30

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build — the only reliable server/client check
npm run lint
npm run typecheck
npm test           # Vitest — pricing engine
```

> **Important:** stop the dev server *before* deleting `.next`. Removing it
> under a running server strips the compiled chunks and every
> `/_next/static/*` request 404s — the page then serves as unstyled HTML.
> Order that works: **stop → clear → build → clear → start.**

---

## Architecture decisions

### Pricing is a single source of truth
All money lives in `src/config/pricing.ts`. Pure functions (`calculateService`,
`calculateBasket`) compute every figure, covered by **32 Vitest tests** pinned
to the client's rate card. No component hardcodes a price. Change a rate in one
place and the homepage selector, basket, `/pricing` cards, WhatsApp prefills and
spec tables all follow.

### Server/client boundary
Non-component values exported from a `"use client"` module **cannot** be
imported by a server component — React marks them client references and the
build fails at prerender. This has bitten twice:

| Value | Now lives in |
|---|---|
| `darkContactPillClass` | `components/layout/pill-styles.ts` (plain module) |
| `serviceIcons` | `components/features/service-showcase/service-icons.ts` |

Both files carry a comment explaining why they must stay plain. **Typecheck and
lint pass on this bug** — only `npm run build` catches it.

### One gradient, one parent
The hero + section-two wash is a single `<Atmosphere>` positioned against a
shared wrapper, not per-section backgrounds. A gradient painted inside a
section-sized box guarantees a seam, because the seam *is* the box edge. Nothing
in that range may set its own `background-color`.

### Chrome height is a variable
`--announce-h` + `--header-h` in `globals.css`, consumed via `.pt-chrome` and
`scroll-mt-[calc(...)]`. Header height changes in one place; no page can end up
tucked underneath it.

### Mobile is recomposed, not shrunk
The hero reorders on mobile (`eyebrow → headline → sub → stats → CTAs → rating`)
so proof lands before the ask. Done with flex `order` + explicit
`lg:col-start`/`lg:row-start` grid placement — **one DOM serves both layouts**,
so they can't drift.

---

## ⚠️ Blockers — client input required

### Photography (biggest gap)
Every slot is built with `next/image`, correct aspect ratios, blur placeholders
and a designed fallback. Nothing 404s. Each appears the instant you flip
`available: true`.

| File | Size | Ratio |
|---|---|---|
| `/public/hero/hero-clean.jpg` | 2000×1500 | 4:3 |
| `/public/content/carpet-method.jpg` | 1800×1200 | 3:2 |
| `/public/content/couch-deodoriser.jpg` | 1200×1200 | 1:1 |
| `/public/content/inspection.jpg` | 1200×1200 | 1:1 |
| `/public/services/{carpet,couch,mattress,curtain,blinds,flood-damage}.jpg` | 1600×1000 | 16:10 |

Best subject: a close, well-lit detail shot **part-way through** the work, where
done-vs-not-done is visible. Wide room shots read as stock. Keep critical detail
out of the bottom third — a scrim sits there. Hero under ~400KB (it's the LCP
element).

Manifests: `src/config/homepage.ts`, `src/config/services-content.ts`.

### Unverified published claims
These are live at the owner's direction (supplied in the redesign brief) but are
**not yet substantiated**. Each has a `TODO(client)` at its definition.

| Claim | Where | Needs |
|---|---|---|
| `4.9★ · 127 Google Reviews` | `config/homepage.ts` | Must match the live Google Business Profile — one click to check, so a mismatch is a false claim |
| `2,400+ jobs` | `config/homepage.ts` | All-time, or since a given year? |
| `8+ years operating` | `config/homepage.ts` | Trading start year |
| Satisfaction / money-back guarantee | `config/faq.ts#not-satisfied` | Define precisely: re-clean, partial, or full refund? Over what window? Must match `/terms` |
| "Fully insured and certified" | `config/faq.ts#insured` | Insurer, policy number, certifying body |
| First-time customer discount | `config/faq.ts#discounts` | Amount, conditions, expiry |
| Same-day availability | `config/faq.ts#same-day` | Is it genuinely offered? Cut-off time? |
| Free cancellation ≤24h | `config/faq.ts#reschedule` | Confirm window; must match `/terms` |

`unverifiedFaqIds` in `config/faq.ts` lists the FAQ subset for a fast audit.
`suburbs` is the one self-verifying stat — derived from `serviceSuburbs.length`.

### Also outstanding
- **Testimonials** — `config/testimonials.ts`, all `placeholder: true`. Copy is
  written to read as obviously unfinished so it can't pass as invented social
  proof. Replace with attributable reviews, set `placeholder: false`.
- **Dry times** — carpet and mattress copy is deliberately non-specific.
  `TODO(client)` in `services-content.ts`.
- **GST** — prices render with no GST line. Australian consumer pricing must
  show a GST-inclusive total; confirm and add wording.
- **Legal review** — `/privacy` and `/terms` are plain-language and accurate to
  what the site does, but are not legal advice.

---

## Status

### Done
- Design system migrated to the supplied palette (`#1DB584`), Poppins + Inter,
  56px buttons / 24px pill radius, 3-tier elevation, 8px spacing grid
- Component library: `Button` `Card` `Badge` `Input`/`Textarea`/`Select`
  `Container` `Section` `OptimizedImage` `TestimonialCard`
- Homepage: hero + trust strip, book-with-confidence, services, why-lucent,
  quote tabs, how-we-work, quote journey, content cards, testimonial marquee,
  service area, CTA band
- `QuoteTabs` — one section, two tools behind an explicit choice, tab driven by
  URL hash so `#instant-quote` / `#build-your-clean` still deep-link correctly
- `/faq` — 17 Q&A, search + category filter, accessible accordion, FAQPage schema
- Routes: `/` `/services` `/pricing` `/faq` `/about` `/contact` `/privacy`
  `/terms` `/sitemap.xml` `/robots.txt` + 404
- A11y: skip link, `aria-expanded` accordions, `role="alert"` form errors,
  16px inputs (iOS zoom), 44px minimum tap targets, `prefers-reduced-motion`
  throughout, `aria-live` on filtered results
- Trust bar above header (static ≥sm, marquee <sm)
- LocalBusiness + FAQPage JSON-LD

### Verified

**Lighthouse — measured 2026-07-30**, production build (`npm start`), mobile
form factor, simulated throttling, headless Edge (Chromium).

| Route | Perf | A11y | Best Practices | SEO |
|---|---|---|---|---|
| `/` | **95** | **100** | **100** | **100** |
| `/faq` | **95** | **100** | **100** | **100** |
| `/pricing` | **95** | **100** | **100** | **100** |
| `/services` | **95** | **100** | **100** | **100** |

Core Web Vitals (`/`): FCP 1.7s · LCP 3.0s · **TBT 0ms** · **CLS 0.001** ·
Speed Index 1.7s.

Reproduce:
```bash
npm run build
npx cross-env CHROME_PATH="<path to chrome or msedge>" npm start   # port 3000
npx lighthouse http://localhost:3000 --form-factor=mobile \
  --screenEmulation.mobile --throttling-method=simulate \
  --chrome-flags="--headless=new" --view
```
> Lighthouse exits `1` on Windows with an EPERM removing its temp Chrome
> profile. That happens *after* the audit — the report is still written. Check
> the output file rather than the exit code.

LCP 3.0s is the weakest metric and is **expected to improve**, not worsen, when
real photography lands: the hero currently paints a CSS-gradient placeholder,
and the `priority` + `fetchpriority="high"` path only engages for a real
`<img>`.

**Other measurements**
- **0px horizontal overflow** at 375 / 390 / 414 / 768 / 1280
- **0** tap targets under 44px (excluding inline prose links — WCAG 2.5.8 exempt)
- `lg` buttons measure exactly **56px**
- Build green (15 routes) · lint clean · 32/32 tests

### Not done
- Service detail pages (`/services/[service]` × 5)
- Blog (`/blog`, `/blog/[slug]`)
- About team section + headshots
- Newsletter signup
- Quote-builder step progress indicator
- Component tests (see below)
- Component tests — all 32 tests cover pricing maths. Four bugs this cycle
  passed both typecheck and lint (two server/client boundary breaks, dead
  deep-links, stale scroll offsets). That's the gap worth closing.

---

## Gotchas

- **`next/image` needs `sizes`.** Without it the browser assumes `100vw` and
  pulls a desktop-width file onto a phone.
- **Marquee gap belongs *inside* the set.** The track translates exactly `-50%`,
  so each set must be exactly half the track width. A gap *between* sets leaves
  the loop half-a-gap short and it visibly jumps every cycle.
- **`overflow-x: clip`, not `hidden`.** `hidden` creates a scroll container and
  breaks the fixed header. `clip` contains the bleed and leaves `overflow-y`
  visible so the hero can crop past the top of the viewport.
- **Don't write files with PowerShell `-replace`.** It double-encodes UTF-8 and
  turns every em-dash into `â€"`. Use the Edit tool, or
  `[IO.File]::WriteAllText` with `UTF8Encoding $false`.
- **`getBoundingClientRect()` ignores clipping.** It returns the layout box even
  when an ancestor clips the element. Check against the nearest clipping
  ancestor — that's what caught the `/pricing` prices being cut off.
- **The brand green cannot carry white text.** `#1DB584` with white is
  **2.65:1** — it fails AA badly. `--accent` is therefore `#14855B`
  (emerald-700, 4.63:1 both ways). Use `emerald-500` for gradients, large
  numerals and decoration; never for small text or a solid fill behind white.
- **`<dl>` is strict.** Children must be `<dt>`/`<dd>`, optionally grouped in a
  plain `<div>` — no icons or extra wrappers inside the group — and `<dt>` must
  come first. Use `flex-col-reverse` to show the value above the label while
  keeping the required DOM order.
- **Heading level is contextual.** `FaqAccordion` takes `headingLevel`: 2 when
  it sits under the page `<h1>` (`/faq`), 3 when a section `<h2>` precedes it
  (`/pricing`). Skipping a level fails axe.
