import { Inter, Poppins } from "next/font/google";

/**
 * Body / UI typeface.
 *
 * `display: "swap"` is deliberate — text paints immediately in the fallback
 * and reflows when the webfont lands, rather than holding the page blank.
 */
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/**
 * Display / heading typeface.
 *
 * Only the three weights the design system actually uses are requested
 * (600 for H3, 700 for H1/H2) plus 500 for chips — every extra weight is
 * another font file on the critical path.
 */
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});
