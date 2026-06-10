# The Lighting Squad — Functional Requirements & Developer Handoff

**Repo:** `lightingsquad` · **Stack:** Next.js 14.2.35 (App Router), React 19, TypeScript, Tailwind, Radix/shadcn
**Audience:** Engineers picking up the codebase
**Doc date:** 2026-06-09
**Source of truth:** the code as it stands on `main`. Where copy/marketing docs (`PRICING.md`, `COPY_CONTENT.md`) disagree with the code, **the code wins** and is documented here. Items marked ⚠️ are known gaps/tech-debt to address.

---

## 1. What this app is

A single-page-style booking funnel for a Nashville lighting/electrical handyman business. A visitor builds a multi-service order, enters contact + scheduling info, and lands on a confirmation page. There is **no backend and no auth** — all state lives in `localStorage`; "submission" is simulated client-side.

Business facts: phone (615) 880-6701 · email info@thelightingsquad.com (custom-request emails go to **hello@**thelightingsquad.com) · service area Nashville & Middle TN · hours Mon–Sat 7AM–6PM · brand gold `#FFCB00`, navy `#112337`.

---

## 2. Route map (read this first)

The funnel is a single linear path. Three orphaned pages that forked off during development — `/estimate/services2`, `/estimate/payment`, `/estimate/compare` — **were deleted** (see §9); the funnel below is everything that remains.

| Route | File | Status |
|-------|------|--------|
| `/` | `app/page.tsx` | **Live** — `redirect()` → `/estimate/services` |
| `/estimate` | `app/estimate/page.tsx` | redirect → `/estimate/services` |
| `/estimate/services` | `app/estimate/services/page.tsx` | **Step 1** — service catalog |
| `/estimate/customer` | `app/estimate/customer/page.tsx` | **Step 2** — info + scheduling |
| `/estimate/confirmation` | `app/estimate/confirmation/page.tsx` | **Step 3** — terminal confirmation page |

**Live funnel:** `services → customer → confirmation`. The customer page's "continue" goes **straight to `/estimate/confirmation`** — there is **no payment step**, by design (the order is quoted/scheduled, not charged online). See §9 if online payment is ever needed.

Marketing pages (standalone, not in the funnel): `/home`, `/services`, `/services/{bathroom-fan,duct-cleaning,regular-cleaning,coil-cleaning}`, `/annual-service`, `/upgrades`.

---

## 3. State contract — the `estimateData` object

All funnel steps read/write **one** `localStorage` key, `estimateData` (JSON). Each step augments it. A second key, `bookingConfirmation`, is the snapshot the confirmation page renders. Keys:

| localStorage key | Written by | Read by | Cleared by |
|---|---|---|---|
| `estimateData` | services, customer | services, customer | header logo click |
| `bookingConfirmation` | customer | confirmation | confirmation (after render) |
| `previousAddresses` | address-autocomplete | address-autocomplete | — |

### Shape after **step 1** (`services/page.tsx`)
```jsonc
{
  "source": "services",                       // literal string; set on checkout
  "services": {
    "selectedServices": ["light-fixture", "single-camera", "single-camera"], // canonical ids, repeated per unit for quantities
    "ladderFeeServices": ["light-fixture"],   // canonical ids that opted into the ladder fee
    "totalPrice": 500,                         // number; line subtotal + (anyLadder ? 400 : 0)
    "isSubscription": false
  },
  "services2": { "cart": { /* serviceId -> CartConfig, see below */ } } // rich cart for refresh-restore
}
```
> Note: `services2` here is a **localStorage key name only** — a leftover from the deleted route. The live `services/page.tsx` still reads/writes `estimateData.services2.cart`. Rename when convenient, but it's harmless.
`CartConfig` (the editable per-card state, keyed by **catalog `id`**, not canonical id):
```ts
interface CartConfig {
  variantId?: string                       // for kind:"variant"
  attributes: Record<string, string>       // non-pricing notes, e.g. { placement: "outdoor" }
  quantity?: number                         // for kind:"quantity" or per-unit variants
  ladderFee: boolean                        // opted-in $400 flat fee
  needsMount?: boolean                      // TV "I need a wall mount" note
}
```

### Shape after **step 2** (`customer/page.tsx`) — adds `customer`
```ts
interface CustomerData {
  firstName: string; lastName: string; email: string; phone: string
  streetAddress: string; city: string; state: string; zipCode: string
  preferredDate?: Date          // serialized to JSON string; re-`new Date()`-d on load
  timeWindow: string
  termsAccepted?: boolean
  appliedPromoCode?: string | null
  promoDiscount?: number         // absolute $ amount
  phoneVerified?: boolean
}
```
On continue, the customer page writes the merged object to **both** `estimateData` and `bookingConfirmation`, then routes to confirmation.

---

## 4. The canonical-ID system (and its ⚠️ drift)

Catalog cards carry a human `id` (e.g. `tv-mounting`). Each priced choice maps to a **canonical id** (e.g. `tv-small`) that downstream pages key off. `canonicalIdsFor()` expands a cart entry into a flat array, **repeating the canonical id once per unit** for quantity/per-unit items (downstream pages sum duplicates). The ladder fee is a single flat `LADDER_FEE = 400`, flagged via `ladderFeeServices` (any non-empty ⇒ one $400 line).

There are **three independent hardcoded registries of canonical ids** that must agree but have drifted:

1. `app/estimate/services/page.tsx` — `catalog` (the live source).
2. `app/estimate/confirmation/page.tsx` — `availableServices` (id→name→**price**) **and** a separate `serviceDetails` (id→name→icon).
3. `lib/estimate-pricing.ts` — `ESTIMATE_PRICE_IDS` (which ids are "from $X" estimates); only `formatServicePrice` is still consumed (see §7).

⚠️ **Known drift:** the live catalog emits `tv-xl`, `picture-hanging-item`, `permanent-led-s/m/l/xl`, and `single-camera`×N for cameras. Confirmation's `availableServices` covers these, but its `serviceDetails` (name+icon) map is **missing `tv-xl` and `picture-hanging-item`** and still lists stale `picture-hanging-standard` / `permanent-led-home`. Result: certain line items can render without a name/icon. **Recommended fix:** extract a single shared service registry (e.g. `lib/catalog.ts`) consumed by all three, and delete the duplicates. This is the highest-value cleanup in the repo.

---

## 5. Live catalog (authoritative — `services/page.tsx`)

Pricing kinds: `fixed` (set price) · `quantity` (`unitPrice × qty`, bounded) · `variant` (pick one; a variant may be `perUnit` with its own stepper). `startingPrice()` drives the collapsed-card "from" headline.

### Lighting
| Card `id` | Name | Kind | Canonical id(s) | Price | Ladder |
|---|---|---|---|---|---|
| light-fixture | Light Fixture Install | fixed | light-fixture | $150 | ✓ |
| smart-switch | Smart Switch / Dimmer | fixed | smart-switch | $125 | |
| outlet-switch | Outlet / Dimmer Upgrade | fixed | outlet-switch | $100 | |
| led-bulb | LED Bulb Upgrade | quantity | led-bulb-per-fixture | $17 × (1–40, def 1) | |
| fixture-cleaning | Fixture / Chandelier Cleaning | fixed | fixture-cleaning | $150 | ✓ |
| exterior-bulb | Exterior Bulb Replacement | fixed | exterior-bulb-replacement | $150 | |
| outdoor-lighting | Outdoor Lighting | variant | landscape-basic / landscape-custom | $850 / $2,500 | |
| garage-hex | Garage Hex Lighting | variant | garage-hex-1car / -2car | $700 / $1,150 | |
| permanent-led | Permanent LED Lighting | variant | permanent-led-s/m/l/xl | $1,500 / 3,000 / 4,500 / 6,000 ($30/ft) | |

### Installation
| Card `id` | Name | Kind | Canonical id(s) | Price | Ladder |
|---|---|---|---|---|---|
| tv-mounting | TV Mounting (`mountOption`) | variant | tv-small / tv-large / tv-xl | $200 / 350 / 400 | |
| ceiling-fan | Ceiling Fan Install | fixed | ceiling-fan | $185 | ✓ |
| doorbell | Ring Doorbell Install | fixed | doorbell | $150 | |
| security-cameras | Security Cameras | quantity (+placement attr) | single-camera × N | $175 × (1–6, def 1) | ✓ |
| audio-system | Audio System Install | variant | soundbar / surround-sound | $200 / $600 | ✓ |
| picture-hanging | Picture & Art Hanging | variant | picture-hanging-item (perUnit $45, 1–20) / picture-hanging-gallery | $45/ea / $237 | ✓ |

---

## 6. Functional requirements by step

### Step 1 — `/estimate/services`
- **FR-1.1** Render `catalog` grouped into `Lighting` and `Installation` sections (responsive 1/2/3-col grid).
- **FR-1.2** Card click: configurable cards (variant/quantity) expand inline; otherwise add to cart. In-cart cards show remove + expanded controls.
- **FR-1.3** Support the three pricing kinds (§5); `perUnit` variants and `quantity` services show a stepper bounded by min/max.
- **FR-1.4** Per-card opt-in `$400` ladder fee where `hasLadderFee`; `mountOption` adds a no-price "needs wall mount" note (`needsMount`).
- **FR-1.5** Sticky cart: item count, line items w/ remove, running total = subtotal + (any ladder ? 400 : 0). Labels: fixed = `$X`, configurable = `from $X`.
- **FR-1.6** Search filters by name/description (case-insensitive) with empty state.
- **FR-1.7** Persist cart to `estimateData.services2.cart` on every change (refresh-restore via `defaultConfig` re-hydration).
- **FR-1.8** Custom request box → `mailto:hello@thelightingsquad.com` with prefilled subject/body (`handleRequestSubmit`); transient "sent" state (4s).
- **FR-1.9** Checkout writes `selectedServices` / `ladderFeeServices` / `totalPrice` / `source:"services"` and routes to `/estimate/customer`.

### Step 2 — `/estimate/customer`
- **FR-2.1** Guard: if no `estimateData` or no `.services`, redirect to `/estimate/services`. Pre-fill from `estimateData.customer` if present.
- **FR-2.2** Collect `CustomerData` (§3). Address via `AddressAutocomplete` (autocomplete + geolocation + recent-address history).
- **FR-2.3** Date picker excludes past dates, weekends, and US holidays (`getAvailableDates`, 60-day window). Changing the date clears a now-unavailable `timeWindow`.
- **FR-2.4** Time-window select; some slots marked unavailable per date (`getUnavailableSlots`).
- **FR-2.5** ⚠️ Phone OTP: `handlePhoneVerification` / `handleOtpVerification` are **simulated** (6-digit, 30s resend, `setTimeout`). `phoneVerified` is **not** required by `isFormComplete`.
- **FR-2.6** Promo codes (in **this** page): valid = `SAVE10` (10%), `SAVE20` (20%), `FIRST15` (15%); discount computed on resolved service+add-on subtotal, stored as absolute `promoDiscount`.
- **FR-2.7** `isFormComplete` requires the 8 contact fields + `preferredDate` + `timeWindow`. ⚠️ `termsAccepted` is in the type but **not** enforced.
- **FR-2.8** Continue writes merged data to `estimateData` **and** `bookingConfirmation`, routes to `/estimate/confirmation`.

### Step 3 — `/estimate/confirmation`
- **FR-3.1** Read `bookingConfirmation`; if absent, show empty/guard state.
- **FR-3.2** Resolve `selectedServices` → names/prices via `availableServices`; sum duplicates for quantities; render ladder fee as a flat $400 line (`large-ladder-fee`), never "from".
- **FR-3.3** Show appointment, customer/property details, and a 3-step "what's next". "Return to Home" → `/`. Clear `bookingConfirmation` after render.

> The order is never charged online: confirmation presents every line as an on-site estimate. The deleted `/estimate/payment` page held the card form and the payable-vs-estimate split; if online payment is reintroduced, it slots between `customer` and `confirmation` (see §9).

---

## 7. `lib/estimate-pricing.ts`
Pure helpers around `ESTIMATE_PRICE_IDS: Set<string>` (canonical ids billed on-site / shown as "from $X"):
- **`formatServicePrice(id, price)`** (`"$X"` vs `"from $X"`) — **live**; imported by `customer` and `confirmation`.
- ⚠️ `isEstimatePrice(id)`, `splitByPayment(items) → {payable, estimate}`, `ladderAppliesToPayable(ids)` — **now dead**: their only consumer was the deleted payment page. Safe to remove, or keep if online payment is reintroduced (§9).
- ⚠️ `ESTIMATE_PRICE_IDS` predates the live catalog (no `tv-xl`, `picture-hanging-item`); fold into the shared registry from §4.

---

## 8. Components & integrations

| File | Role | ⚠️ Notes |
|---|---|---|
| `components/header.tsx` | Centered logo; click **clears `estimateData`** and routes to `/estimate/services`; fades on scroll | logo click silently wipes an in-progress order |
| `components/ui/address-autocomplete.tsx` | Address field: debounced (300ms) suggestions, browser Geolocation, recent-address history (≤5) | **Mocked** — suggestions & reverse-geocode are hardcoded Nashville data; wire to Google Places |
| `components/review-harvest-widget.tsx` | Injects an external review embed | Placeholder; needs embed code |
| `components/{hero,services,process,gallery,contact,footer,scroll-to-top}.tsx` | Marketing building blocks; `contact` form routes to `/estimate` | static |
| `@vercel/analytics` | dependency present | not explicitly mounted |
| Phone OTP | — | **simulated** in customer page (`setTimeout`); no SMS provider |
| Payment processor | — | none — no payment step in the live funnel (§9) |

---

## 9. Decisions needed before further work
1. ~~**Funnel shape**~~ — **Resolved:** the orphaned `services2` / `payment` / `compare` routes were deleted; the live funnel is `services → customer → confirmation` with no online charge. If payment is ever needed, reintroduce a step between `customer` and `confirmation` (the deleted payment page is recoverable from git history) and revive the `splitByPayment` helpers in §7.
2. **Single source of truth:** consolidate the service registries (§4) — biggest correctness win; fixes the `serviceDetails` drift.
3. **Real integrations:** Google Places (address) and an OTP/SMS provider — replace the two simulations.
4. **Backend:** nothing persists server-side; bookings exist only in the originating browser. Need an API + datastore to actually receive a booking, and email/SMS confirmation.
5. **Validation/guards:** enforce `termsAccepted`; consider requiring `phoneVerified`; server-side service-area validation.
6. **Catalog vs. marketing copy:** `PRICING.md` / `COPY_CONTENT.md` are stale relative to the code (different services/prices). Decide which is canonical and reconcile.

---

## 10. Run it
```bash
pnpm install      # lockfile is pnpm; package.json scripts use next
pnpm dev          # http://localhost:3000 → redirects to /estimate/services
pnpm build && pnpm start
pnpm lint
```
No environment variables are required today (no live integrations). `next.config.mjs` is minimal; images are unoptimized webp/SVG under `public/services/`.

---

_Derived from `app/`, `components/`, `lib/estimate-pricing.ts`. Route status and the canonical-ID drift were verified against the code, not the marketing docs._
