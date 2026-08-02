import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          deep: "#122d5e",
          tech: "#1558e9",
          gold: "#F5B11A",
          gray: "#8A8D91",
          navy: "#021733",
          nav: "#020964",
          DEFAULT: '#030d29',
          deeper: '#1a2a3a',       // for footer overlays / gradients
        
        },
        neutral: {
          offwhite: "#F8FAFC",
          charcoal: "#1F2937",
          slate: "#6B7280",
          border: "#E5E7EB",
        },
      },
      fontFamily: {
        // Kaushan Script for headings (uses CSS variable set in layout.tsx)
        kaushan: ['var(--font-kaushan)', 'cursive'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 10px 30px #041520',
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
};
export default config;