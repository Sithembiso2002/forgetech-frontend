import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          deep: "#1E3A6D",
          tech: "#00A8E8",
          gold: "#F5B11A",
          orange: "#F28C28",
          gray: "#8A8D91",
          navy: "#0B2447",
        },
        neutral: {
          offwhite: "#F8FAFC",
          charcoal: "#1F2937",
          slate: "#6B7280",
          border: "#E5E7EB",
        },
      },
    },
  },
  plugins: [],
};

export default config;