/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#CC0C39",
          100: "#d1244d",
          200: "#d63d61",
          300: "#db5574",
          400: "#CC0C39",
          500: "#b80b33",
          600: "#a30a2e",
          700: "#8f0828",
        },
        secondary: {
          DEFAULT: "#2874F0",
          100: "#3e82f2",
          200: "#d63d61",
          300: "#699ef5",
          400: "#2874F0",
          500: "#2468d8",
          600: "#205dc0",
          700: "#1c51a8",
        },
        // dark to light
        text: {
          DEFAULT: "#1E1E1E",
          200: "#252526",
          300: "#3C3C3C",
          400: "#4B4B4B",
        },
        // dark to light
        gray: {
          DEFAULT: "#808080",
          100: "#A9A9A9",
          200: "#BEBEBE",
          300: "#C0C0C0",
          400: "#D3D3D3",
        },
      },
    },
  },
  plugins: [],
});
