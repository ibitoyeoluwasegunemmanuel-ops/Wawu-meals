import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        char: {
          950: "#0F0C0B", // deepest background, table-top
          900: "#171210", // primary dark background
          800: "#221A16", // raised dark surface
          700: "#2E2420"  // dark surface hover / borders
        },
        plate: {
          DEFAULT: "#F4EEE1", // warm ivory "plate" surface
          soft: "#EDE4D2",
          line: "#DCD0B8"
        },
        pepper: {
          50: "#FDECE8",
          200: "#F4B3A4",
          400: "#EC6B4E",
          500: "#E8442E", // primary brand red
          600: "#C7331F",
          700: "#9E2818"
        },
        gold: {
          300: "#EBCB8A",
          400: "#DEB35C",
          500: "#D0A03A", // palm-oil gold accent
          600: "#AC7F27"
        },
        ink: "#1A1512"
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "Arial Narrow Bold", "sans-serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      borderRadius: {
        card: "1.25rem",
        pill: "999px"
      },
      boxShadow: {
        plate: "0 10px 30px -12px rgba(0,0,0,0.55)",
        lift: "0 4px 14px -4px rgba(0,0,0,0.4)"
      },
      backgroundImage: {
        "radial-fade": "radial-gradient(circle at 50% 0%, rgba(232,68,46,0.16), transparent 60%)"
      }
    }
  },
  plugins: []
};

export default config;
