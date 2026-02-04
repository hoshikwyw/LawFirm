import type { Config } from "tailwindcss";

/**
 * Resonant Stark — High-end law firm portfolio theme
 * Deep Charcoal, Soft Bone, Muted Gold
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "deep-charcoal": "#1A1A1A",
        "soft-bone": "#F5F5F7",
        "muted-gold": "#C5A059",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        premium: "0 4px 6px -1px rgba(26, 26, 26, 0.04), 0 10px 20px -5px rgba(26, 26, 26, 0.06)",
        "premium-lg": "0 10px 25px -5px rgba(26, 26, 26, 0.06), 0 20px 40px -10px rgba(26, 26, 26, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
