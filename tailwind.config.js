/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#071426",
        paper: "#f7f5ef",
        bluebell: "#8fbce6",
        chapel: "#4b9cd3",
        duke: "#012169",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        serif: ["Fraunces", "ui-serif", "Georgia", "serif"],
      },
      boxShadow: {
        quiet: "0 18px 60px rgba(7, 20, 38, 0.08)",
      },
    },
  },
  plugins: [],
};
