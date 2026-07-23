import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";

/** Body / UI typeface. */
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/** Display / heading typeface (Vercel Geist). Exposes `--font-geist`. */
export const geist = GeistSans;
