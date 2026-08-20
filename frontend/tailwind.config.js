/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0A1628",
          900: "#0F1F38",
          800: "#16294A",
          700: "#1E3A5F",
        },
        brand: {
          600: "#1B4F8C",
          500: "#2563A6",
          400: "#3B82C4",
        },
        surface: "#FFFFFF",
        canvas: "#F5F7FA",
        border: "#E2E8F0",
        critical: "#DC2626",
        high: "#EA580C",
        medium: "#D97706",
        low: "#16A34A",
        ink: {
          900: "#0F172A",
          600: "#475569",
          400: "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "18px",
        control: "10px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,31,56,0.04), 0 4px 12px rgba(15,31,56,0.06)",
        raised: "0 2px 4px rgba(15,31,56,0.06), 0 8px 24px rgba(15,31,56,0.10)",
      },
      keyframes: {
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.8)", opacity: "0" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
      },
      animation: {
        "pulse-ring": "pulseRing 2s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [],
}
