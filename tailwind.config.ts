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
        /* ---- Brand scales (eco-modern green) ---- */
        sage: {
          50: "#f3f6f3",
          100: "#e3ebe4",
          200: "#c6d7c9",
          300: "#9fbaa4",
          400: "#739a7b",
          500: "#527d5b",
          600: "#3f6447",
          700: "#345139",
          800: "#2c4230",
          900: "#263829",
          950: "#131f15",
        },
        emerald: {
          50: "#ecfdf3",
          100: "#d1fadf",
          200: "#a6f3c2",
          300: "#6ce69b",
          400: "#34d176",
          500: "#10b95b",
          600: "#04984a",
          700: "#03793d",
          800: "#075f33",
          900: "#074e2c",
          950: "#002c17",
        },
        mint: {
          50: "#f2fbf7",
          100: "#e0f5ec",
          200: "#c2ebda",
          300: "#9bdcc2",
          400: "#6ac6a3",
          500: "#43ab86",
          600: "#318a6c",
          700: "#296e58",
          800: "#245848",
          900: "#1f483b",
          950: "#0e2922",
        },
        ink: {
          50: "#f7f8f7",
          100: "#eef0ee",
          200: "#dadfdb",
          300: "#b9c1bb",
          400: "#8c968f",
          500: "#677269",
          600: "#515b53",
          700: "#424a44",
          800: "#383e3a",
          900: "#2f3431",
          950: "#1a1d1b",
        },

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
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-geist-sans)", "var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        /* Fluid display sizes for confident headings */
        "fluid-hero": ["clamp(2.75rem, 6vw, 5.25rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "fluid-h1": ["clamp(2.25rem, 4.5vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "fluid-h2": ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "fluid-h3": ["clamp(1.375rem, 2vw, 1.875rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "eyebrow": ["0.8125rem", { lineHeight: "1", letterSpacing: "0.14em" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        section: "clamp(4rem, 9vw, 8rem)",
        "section-sm": "clamp(3rem, 6vw, 5rem)",
      },
      maxWidth: {
        prose: "68ch",
        content: "1240px",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(38, 56, 41, 0.04), 0 4px 16px rgba(38, 56, 41, 0.06)",
        card: "0 1px 3px rgba(38, 56, 41, 0.05), 0 10px 30px -10px rgba(38, 56, 41, 0.12)",
        lifted: "0 2px 6px rgba(38, 56, 41, 0.06), 0 24px 48px -16px rgba(38, 56, 41, 0.20)",
        glow: "0 0 0 1px rgba(16, 185, 91, 0.18), 0 12px 32px -8px rgba(16, 185, 91, 0.32)",
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
          "0%": { boxShadow: "0 0 0 0 rgba(16, 185, 91, 0.45)" },
          "70%": { boxShadow: "0 0 0 12px rgba(16, 185, 91, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(16, 185, 91, 0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s var(--ease-out-soft) both",
        "shimmer": "shimmer 1.6s infinite",
        "pulse-ring": "pulse-ring 2s var(--ease-out-soft) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
