/**
 * ═══════════════════════════════════════════════════════════════════════════
 * Service descriptions — process steps, differentiators and image slots.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Pricing lives in `pricing.ts` and ONLY in `pricing.ts`. This file holds the
 * descriptive copy that sits alongside it.
 *
 * The `Record<ServiceContentId, …>` type below is deliberate: add a service to
 * `pricing.ts` and TypeScript will refuse to compile until it has content here.
 * The two files cannot drift.
 *
 * ⚠️ COPY RULES OBSERVED IN THIS FILE
 * Every claim below is either (a) an accurate description of the method, or
 * (b) a fact already established elsewhere in this codebase (eco products,
 * fixed pricing, included deodoriser, volume discounts). No invented stats,
 * certifications, guarantees or dry-time promises. Anything that needs the
 * client to confirm is marked `TODO(client)` and kept OUT of the visible copy
 * until they do.
 */

import type { ServiceId } from "./pricing";

/** Priced services plus the inspection-only flood service. */
export type ServiceContentId = ServiceId | "flood-damage";

export type ProcessStep = {
  /** Short verb-led label, e.g. "Hot water extraction". */
  title: string;
  /** One or two sentences on what actually happens on site. */
  detail: string;
};

export type ServiceImageSlot = {
  /** Where the photo must live. See IMAGE MANIFEST at the bottom of this file. */
  src: string;
  /** Required. Describes the photo for screen readers and if the image fails. */
  alt: string;
  /**
   * Flip to `true` once the real file exists in /public/services.
   * While false, the UI renders a designed placeholder instead of a broken
   * image — nothing 404s and no layout shifts when the photo lands.
   */
  available: boolean;
};

export type ServiceContent = {
  /** 3–4 steps describing the job start to finish. */
  process: ProcessStep[];
  /** 1–2 lines on why this is worth more than the cheapest quote. */
  differentiators: string[];
  image: ServiceImageSlot;
};

/**
 * Shared blur placeholder — a soft brand-green wash, base64 SVG.
 * Once real photos land, replace per-image with a generated blurDataURL
 * (e.g. via `plaiceholder`) for a closer match. This is a safe default.
 */
export const SERVICE_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxMCI+PGZpbHRlciBpZD0iYiI+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMiIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSIxMCIgZmlsbD0iI2UzZWJlNCIvPjxnIGZpbHRlcj0idXJsKCNiKSI+PGVsbGlwc2UgY3g9IjQiIGN5PSIzIiByeD0iNiIgcnk9IjQiIGZpbGw9IiNjMmViZGEiLz48ZWxsaXBzZSBjeD0iMTMiIGN5PSI4IiByeD0iNiIgcnk9IjQiIGZpbGw9IiM5ZmJhYTQiLz48L2c+PC9zdmc+";

export const serviceContent: Record<ServiceContentId, ServiceContent> = {
  /* ───────────────────────────── carpet ─────────────────────────────── */
  carpet: {
    process: [
      {
        title: "Inspection",
        detail:
          "We walk the rooms with you first — checking fibre type, backing and how the carpet is laid, and flagging any pre-existing wear, bleaching or delamination before we start rather than after.",
      },
      {
        title: "Pre-treatment",
        detail:
          "Traffic lanes and individual stains are treated separately, matched to what caused them. Spots get dwell time to break down before extraction, because a single pass over an untreated stain just spreads it.",
      },
      {
        title: "Hot water extraction",
        detail:
          "Hot solution is injected into the pile and drawn straight back out under vacuum, lifting the grit that sits at the base of the fibres. This is the deep clean — not a surface shampoo.",
      },
      {
        title: "Drying",
        detail:
          "We finish with dry-suction passes to pull out as much residual moisture as the machine will take, so carpets are left damp rather than wet, and we tell you which rooms to keep off longest.",
        // TODO(client): confirm a typical dry-time window (and whether air movers
        // are standard or an add-on) before publishing any hours here.
      },
    ],
    differentiators: [
      "Hot water extraction, not a bonnet buff — we pull soil out of the carpet instead of moving it around the surface.",
      "Non-toxic, pet-safe products as standard, so there's no chemical smell in the room afterwards.",
    ],
    image: {
      src: "/services/carpet.jpg",
      alt: "Hot water extraction wand cleaning a light-coloured carpet, showing a clear cleaned strip",
      available: false,
    },
  },

  /* ───────────────────────────── couch ──────────────────────────────── */
  couch: {
    process: [
      {
        title: "Fabric identification",
        detail:
          "We check the manufacturer's cleaning code and test an unseen area first. Linens, velvets and viscose blends all behave differently under water, and getting this wrong is what causes shrinkage and watermarks.",
      },
      {
        title: "Pre-spray",
        detail:
          "A fabric-appropriate solution is worked into the cushions, arms and headrests — the areas that hold body oils — and left to dwell so the soil releases before we touch it with the machine.",
      },
      {
        title: "Extraction",
        detail:
          "Upholstery-specific tools draw the solution and dissolved soil back out at controlled moisture, so the filling underneath doesn't get saturated.",
      },
      {
        title: "Deodoriser",
        detail:
          "Every couch finishes with a deodorising treatment that neutralises odour at the source rather than masking it. This is included in the price on every couch job — never an upsell on the day.",
      },
    ],
    differentiators: [
      "Deodoriser is included on every couch clean, not quoted as an extra.",
      "We identify the fabric and test before any water touches it — the step that protects delicate upholstery from shrinking or marking.",
    ],
    image: {
      src: "/services/couch.jpg",
      alt: "Upholstery cleaning tool being drawn across a fabric sofa cushion",
      available: false,
    },
  },

  /* ──────────────────────────── mattress ────────────────────────────── */
  mattress: {
    process: [
      {
        title: "Vacuum",
        detail:
          "We start with a thorough dry vacuum of the surface, seams and edge piping, where dust, skin cells and dust-mite allergens collect most heavily.",
      },
      {
        title: "Sanitising treatment",
        detail:
          "An anti-allergen sanitising solution is applied across the sleeping surface and given time to work on the bacteria and mites that a vacuum alone can't reach.",
      },
      {
        title: "Extraction",
        detail:
          "The treatment and suspended soil are drawn back out under low-moisture extraction — enough to clean through the top layers without soaking the foam or springs underneath.",
      },
      {
        title: "Dry time",
        detail:
          "We deliberately keep moisture low so the mattress isn't out of action long, and we'll tell you before we leave when it's right to remake the bed.",
        // TODO(client): confirm the dry-time figure they're comfortable quoting
        // (varies with mattress construction and room ventilation).
      },
    ],
    differentiators: [
      "Low-moisture method — a mattress you can't dry properly is a mattress that grows mould, so we clean through the top layers rather than saturating it.",
      "Priced per mattress, so a single bed costs single-bed money instead of a flat room rate.",
    ],
    image: {
      src: "/services/mattress.jpg",
      alt: "Mattress being cleaned with an upholstery extraction tool in a bright bedroom",
      available: false,
    },
  },

  /* ──────────────────────────── curtain ─────────────────────────────── */
  curtain: {
    process: [
      {
        title: "On-site or take-away assessment",
        detail:
          "First we work out which way the curtains should be cleaned. Many can be done in place on the rail; heavily soiled, lined or delicate drapes come with us and are returned. You get told which before we begin, not after.",
      },
      {
        title: "Fabric-safe method",
        detail:
          "The method is matched to the fabric and its lining — the risk with curtains is shrinkage and sun-damaged fabric tearing under handling, so anything sun-perished gets flagged to you before we proceed.",
      },
      {
        title: "Clean",
        detail:
          "Dust, smoke residue and airborne grime are lifted from the body of the fabric, with extra attention at the header and hem where soiling concentrates.",
      },
      {
        title: "Rehanging",
        detail:
          "We rehang and dress the curtains — folds set, hems sitting straight — so they leave looking like they've been done, not just cleaned.",
      },
    ],
    differentiators: [
      "On-rail cleaning wherever the fabric allows, so your windows aren't bare for days.",
      "We check for sun damage before starting and tell you if a curtain is too perished to clean safely — rather than discovering it mid-job.",
    ],
    image: {
      src: "/services/curtain.jpg",
      alt: "Floor-length curtains being cleaned in place on the rail beside a window",
      available: false,
    },
  },

  /* ───────────────────────────── blinds ─────────────────────────────── */
  blind: {
    process: [
      {
        title: "Type assessment",
        detail:
          "We identify what you actually have — venetian, vertical, roller, honeycomb, timber or aluminium. The material dictates everything that follows, and it's the reason blinds can't be priced off a web form.",
      },
      {
        title: "Method matched to material",
        detail:
          "Different materials need different treatment. Timber and some honeycomb blinds can't be submerged at all; aluminium and PVC respond well to ultrasonic immersion, which cleans every slat and cord evenly.",
      },
      {
        title: "Clean and refit",
        detail:
          "Slats, cords and headrails are cleaned through, then the blinds are rehung and tested to confirm they draw and tilt properly before we finish.",
      },
      {
        title: "Why we quote by phone",
        detail:
          "Count, material, size and condition all move the price, and volume discounts apply from six blinds up. A two-minute call gets you an accurate number instead of an online estimate we'd have to revise on site.",
      },
    ],
    differentiators: [
      "We quote on the actual blinds rather than a generic online rate — and volume discounts start at six.",
      "The method is chosen per material, because submerging the wrong blind is how they end up warped.",
    ],
    image: {
      src: "/services/blinds.jpg",
      alt: "Close-up of venetian blind slats being cleaned",
      available: false,
    },
  },

  /* ─────────────────────── flood / water extraction ─────────────────── */
  "flood-damage": {
    process: [
      {
        title: "Call us first",
        detail:
          "Water damage gets worse by the hour. Call before you start pulling up carpet — how the first few hours are handled affects whether flooring can be saved at all.",
      },
      {
        title: "Moisture assessment",
        detail:
          "On arrival we establish how far the water has travelled and what it's reached — underlay, subfloor, skirting and wall cavities hold moisture long after the surface feels dry.",
      },
      {
        title: "Extraction and drying",
        detail:
          "Standing water is extracted first, then we set up to dry the structure itself, monitoring until readings come back down rather than stopping when it looks dry.",
      },
      {
        title: "Why we inspect before quoting",
        detail:
          "The cost depends on volume, how long the water has been sitting, the category of water and whether underlay or subfloor has to come up. No two jobs are alike, so a number given over the phone would be a guess.",
      },
    ],
    differentiators: [
      "We assess what the water has actually reached, not just what's visible on the surface.",
      "You get a written scope after inspection, so you know what's being dried and why before any work starts.",
    ],
    // TODO(client): confirm after-hours availability and response-time window —
    // this is the single strongest claim for emergency work, but only if true.
    // TODO(client): confirm whether they produce moisture reports for insurers.
    image: {
      src: "/services/flood-damage.jpg",
      alt: "Water extraction equipment drying a flood-affected room",
      available: false,
    },
  },
};

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * IMAGE MANIFEST — files to supply
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Drop these into /public/services/ then set `available: true` on the matching
 * entry above. No other code change is needed.
 *
 *   /public/services/carpet.jpg         1600 × 1000  (16:10)
 *   /public/services/couch.jpg          1600 × 1000  (16:10)
 *   /public/services/mattress.jpg       1600 × 1000  (16:10)
 *   /public/services/curtain.jpg        1600 × 1000  (16:10)
 *   /public/services/blinds.jpg         1600 × 1000  (16:10)
 *   /public/services/flood-damage.jpg   1600 × 1000  (16:10)
 *
 * Notes:
 *   • 16:10 matches the card aspect box; other ratios will be cropped centrally.
 *   • 1600px wide covers the largest rendered size (~760px) at 2× DPR.
 *   • Keep each file under ~300KB. WebP is fine — change the extension in `src`.
 *   • A gradient scrim sits over the lower half of each image, so avoid photos
 *     with critical detail along the bottom edge.
 */
