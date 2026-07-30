import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  safelist: [
    {
      pattern: /bg-(sage|emerald|mint|ink)-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1240px",
      },
    },
    extend: {
      colors: {
        /* ────────────────────────────────────────────────────────────────
         * BRAND SCALES — retuned 2026-07-29 to the supplied design system.
         *
         * Anchor values from the brief:
         *   Primary Green  #1DB584  → emerald-500
         *   Primary Hover  #19A770  → emerald-600
         *   Dark Green     #2D5F4F  → sage-700
         *   Light Green    #E8F0ED  → sage-100
         *   V. Light Green #F8FBFA  → sage-50
         *
         * Scale NAMES are unchanged on purpose. Renaming them would mean
         * rewriting several hundred class references across every component
         * for zero visual gain; retuning the values migrates the whole site
         * in one place.
         * ──────────────────────────────────────────────────────────────── */
        sage: {
          50: "#f8fbfa",
          100: "#e8f0ed",
          200: "#cfe0d9",
          300: "#a9c7bc",
          400: "#7ba697",
          500: "#55897a",
          600: "#3e6e60",
          700: "#2d5f4f",
          800: "#264e42",
          900: "#1f4036",
          950: "#102520",
        },
        emerald: {
          50: "#ecfbf5",
          100: "#d2f5e8",
          200: "#a8ebd3",
          300: "#6fdcb8",
          400: "#3fc79c",
          500: "#1db584",
          600: "#19a770",
          700: "#14855b",
          800: "#126a4a",
          900: "#10573e",
          950: "#063124",
        },
        mint: {
          50: "#f4fcf8",
          100: "#e4f7ee",
          200: "#c7eedd",
          300: "#9de0c6",
          400: "#6acda9",
          500: "#3eb48c",
          600: "#2c9273",
          700: "#25755e",
          800: "#205e4d",
          900: "#1b4d40",
          950: "#0c2b23",
        },
        /* Neutrals — Gray 100/500/700/900 anchors come from the brief. */
        ink: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#888888",
          600: "#666666",
          700: "#444444",
          800: "#2a2a2a",
          900: "#1a1a1a",
          950: "#0f0f0f",
        },

        /* Status colours, straight from the brief. */
        success: "#10b981",
        error: "#ef4444",
        warning: "#f59e0b",
        info: "#3b82f6",

        /* ---- Semantic tokens (CSS-variable driven) ---- */
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        canvas: "hsl(var(--canvas) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        border: "hsl(var(--border) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
      },
      fontFamily: {
        /* Body = Inter, headings = Poppins, per the design system. */
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        /*
         * Design-system type scale.
         * The clamp CEILING is the brief's desktop size; the FLOOR is the
         * explicit mobile size, chosen for a 375px screen rather than inherited
         * from the desktop ramp.
         *
         *   H1 48px / 700 / -1px   → fluid-h1   (32px on mobile)
         *   H2 32px / 700 / -0.5px → fluid-h2   (24px on mobile)
         *   H3 20px / 600 / 0      → fluid-h3
         *   Label 12px / 600 / +1.5px all-caps → eyebrow
         *
         * `fluid-hero` sits above the brief's H1 for the landing headline only.
         */
        "fluid-hero": ["clamp(2.5rem, 6vw, 4rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "fluid-h1": ["clamp(2rem, 5vw, 3rem)", { lineHeight: "1.2", letterSpacing: "-0.021em" }],
        "fluid-h2": ["clamp(1.5rem, 3vw, 2rem)", { lineHeight: "1.3", letterSpacing: "-0.0156em" }],
        "fluid-h3": ["1.25rem", { lineHeight: "1.4", letterSpacing: "0" }],
        body: ["1rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        "eyebrow": ["0.75rem", { lineHeight: "1.3", letterSpacing: "0.125em" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        /* Mobile floor ≈ half the desktop ceiling. */
        section: "clamp(3rem, 9vw, 8rem)",
        "section-sm": "clamp(2.25rem, 6vw, 5rem)",
      },
      maxWidth: {
        prose: "68ch",
        content: "1240px",
      },
      borderRadius: {
        /* Inputs 8px · buttons 24px (pill) · cards 16px · containers 20px. */
        input: "0.5rem",
        btn: "1.5rem",
        card: "1rem",
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1rem",
        "4xl": "1.25rem",
      },
      boxShadow: {
        /*
         * Elevation system from the brief:
         *   1 cards  0 4px 12px rgba(0,0,0,.08)
         *   2 hover  0 8px 24px rgba(0,0,0,.12)
         *   3 modals 0 20px 60px rgba(0,0,0,.15)
         * `soft`/`card`/`lifted` are kept as aliases so existing usage maps
         * onto the new scale without a site-wide rename.
         */
        "elevation-1": "0 4px 12px rgba(0, 0, 0, 0.08)",
        "elevation-2": "0 8px 24px rgba(0, 0, 0, 0.12)",
        "elevation-3": "0 20px 60px rgba(0, 0, 0, 0.15)",
        soft: "0 2px 8px rgba(0, 0, 0, 0.06)",
        card: "0 4px 12px rgba(0, 0, 0, 0.08)",
        lifted: "0 8px 24px rgba(0, 0, 0, 0.12)",
        glow: "0 0 0 1px rgba(29, 181, 132, 0.18), 0 8px 24px -4px rgba(29, 181, 132, 0.32)",
        "inset-line": "inset 0 0 0 1px rgba(255, 255, 255, 0.6)",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "shimmer": {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(29, 181, 132, 0.45)" },
          "70%": { boxShadow: "0 0 0 12px rgba(29, 181, 132, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(29, 181, 132, 0)" },
        },
        /* Marquee: the track holds two identical sets, so -50% lands exactly
           on the start of the duplicate — a seamless loop with no reset jump. */
        marquee: {
          from: { transform: "translate3d(0, 0, 0)" },
          to: { transform: "translate3d(-50%, 0, 0)" },
        },
        "marquee-reverse": {
          from: { transform: "translate3d(-50%, 0, 0)" },
          to: { transform: "translate3d(0, 0, 0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s var(--ease-out-soft) both",
        "shimmer": "shimmer 1.6s infinite",
        "pulse-ring": "pulse-ring 2s var(--ease-out-soft) infinite",
        marquee: "marquee var(--marquee-duration, 64s) linear infinite",
        "marquee-reverse":
          "marquee-reverse var(--marquee-duration, 64s) linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
