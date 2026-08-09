/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FBF7F0",
        bgElev: "#F2E9DB",
        bone: "#201C17",
        sand: "#776F60",
        wine: "#B8502F",
        wineDeep: "#964226",
        wineLight: "#D97A4F",
        hairline: "rgba(32,28,23,0.16)"
      },
      fontFamily: {
        serif: ["'Playfair Display'", "serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"]
      }
    }
  },
  plugins: []
};
