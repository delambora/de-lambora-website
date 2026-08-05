/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],

  theme: {
    extend: {
      colors: {
        // Main backgrounds
        bg: "#F8F6F2",
        bgElev: "#FFFFFF",

        // Text
        bone: "#1F1F1F",
        sand: "#6F6B64",

        // Brand Colours
        wine: "#6D213C",
        wineDeep: "#57182F",
        wineLight: "#8B3652",

        // Borders
        hairline: "#E6E0D8"
      },

      fontFamily: {
        serif: ["Fraunces", "serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"]
      }
    }
  },

  plugins: []
};
