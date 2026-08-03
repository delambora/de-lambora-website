/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#1C1916",
        bgElev: "#262119",
        bone: "#F3EEE3",
        sand: "#A79C86",
        wine: "#8B3A3A",
        wineDeep: "#6E2A2A",
        wineLight: "#B25C5C",
        hairline: "rgba(243,238,227,0.14)"
      },
      fontFamily: {
        serif: ["Fraunces", "serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"]
      }
    }
  },
  plugins: []
};
