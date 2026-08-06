/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0D0D0F",
        bgElev: "#18181B",
        bone: "#F5F1E8",
        sand: "#A39B8B",
        wine: "#C6A15B",
        wineDeep: "#A67F3D",
        wineLight: "#E0C48C",
        hairline: "rgba(245,241,232,0.12)"
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
