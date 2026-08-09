/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F7F1E4",
        bgElev: "#EFE6D2",
        bone: "#23281F",
        sand: "#746C5A",
        wine: "#2F4A3C",
        wineDeep: "#21362B",
        wineLight: "#4F7862",
        hairline: "rgba(35,40,31,0.14)"
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
