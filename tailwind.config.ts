import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,json}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#FFFFFF",
        paper: "#1D1D1F",
        muted: "#6E6E73",
        surface: "#FAFAFA",
        panel: "#F5F5F7",
        soft: "#F0F0F2",
        quiet: "#86868B",
        faint: "#AEAEB2",
        line: "#C7C7CC",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
