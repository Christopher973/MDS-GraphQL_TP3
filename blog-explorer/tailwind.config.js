/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#212E53",
        secondary: "#4A919E",
        tertiary: "#BED3C3",
        accent1: "#EBACA2",
        accent2: "#CE6A6B",
      },
    },
  },
  plugins: [],
};
