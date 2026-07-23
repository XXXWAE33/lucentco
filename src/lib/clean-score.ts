/**
 * Clean Score assessment engine.
 *
 * ⚠️ SWAP POINT FOR REAL VISION AI ⚠️
 * `analyzeCleanliness` is the single integration boundary. Today it returns a
 * deterministic mock derived from the file (so the same photo always scores the
 * same, which feels real). To go live, replace the body of `analyzeCleanliness`
 * with a call to a vision model (e.g. Claude with an image) that returns the
 * same `CleanScoreResult` shape — nothing else in the app needs to change.
 */

export type CategoryScore = {
  id: string;
  label: string;
  score: number; // 0–100
  note: string;
};

export type Rating = "sparkling" | "good" | "fair" | "needs-attention";

export type ServiceTier = {
  id: string;
  name: string;
  blurb: string;
};

export type CleanScoreResult = {
  overall: number; // 0–100
  rating: Rating;
  categories: CategoryScore[];
  tier: ServiceTier;
  summary: string;
};

const CATEGORY_DEFS: { id: string; label: string }[] = [
  { id: "surfaces", label: "Surfaces & benchtops" },
  { id: "floors", label: "Floors" },
  { id: "dust", label: "Dust & cobwebs" },
  { id: "clutter", label: "Clutter & tidiness" },
  { id: "fixtures", label: "Fixtures & glass" },
];

function seedFromFile(file: File): number {
  let h = 2166136261;
  const s = `${file.name}|${file.size}|${file.lastModified}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (n: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, n));

function categoryNote(score: number): string {
  if (score >= 85) return "Looking great";
  if (score >= 70) return "Could be freshened up";
  if (score >= 55) return "Some attention needed";
  return "Needs a deep clean";
}

function ratingFor(overall: number): Rating {
  if (overall >= 85) return "sparkling";
  if (overall >= 70) return "good";
  if (overall >= 55) return "fair";
  return "needs-attention";
}

function tierFor(overall: number): ServiceTier {
  if (overall >= 85)
    return {
      id: "maintenance",
      name: "Maintenance clean",
      blurb:
        "Your space is already in great shape — a light recurring clean will keep it that way.",
    };
  if (overall >= 70)
    return {
      id: "standard",
      name: "Standard clean",
      blurb:
        "A thorough standard clean will lift this back to sparkling across every surface.",
    };
  if (overall >= 55)
    return {
      id: "deep",
      name: "Deep clean",
      blurb:
        "We'd recommend a one-off deep clean to reset the space before regular upkeep.",
    };
  return {
    id: "intensive",
    name: "End-of-lease deep clean",
    blurb:
      "This space needs our most intensive package — ideal for bond cleans or a full reset.",
  };
}

/** Deterministic mock scoring from the file's fingerprint. */
function computeCleanScore(file: File): CleanScoreResult {
  const rand = mulberry32(seedFromFile(file));
  const base = 42 + rand() * 50; // 42–92

  const categories: CategoryScore[] = CATEGORY_DEFS.map((c) => {
    const score = Math.round(clamp(base + (rand() - 0.5) * 34, 18, 99));
    return { ...c, score, note: categoryNote(score) };
  });

  const overall = Math.round(
    categories.reduce((sum, c) => sum + c.score, 0) / categories.length,
  );

  const rating = ratingFor(overall);
  const summary =
    rating === "sparkling"
      ? "Impressively clean — only light upkeep required."
      : rating === "good"
        ? "In good shape, with a few areas that could shine more."
        : rating === "fair"
          ? "A solid base, but several areas would benefit from a deeper clean."
          : "Plenty of opportunity here — a thorough reset will make a big difference.";

  return { overall, rating, categories, tier: tierFor(overall), summary };
}

/**
 * Analyse a room photo and return a clean-score assessment.
 * MOCK today (deterministic + simulated latency). Replace internals with a real
 * vision-AI call to go live — keep the return shape identical.
 */
export function analyzeCleanliness(
  file: File,
  opts: { delayMs?: number } = {},
): Promise<CleanScoreResult> {
  const { delayMs = 2200 } = opts;
  return new Promise((resolve) => {
    setTimeout(() => resolve(computeCleanScore(file)), delayMs);
  });
}
