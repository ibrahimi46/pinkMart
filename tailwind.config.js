/** @type {import('tailwindcss').Config} */
import scrollbarHide from "tailwind-scrollbar-hide";

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // all files in app folder
    "./pages/**/*.{js,ts,jsx,tsx}", // in case you have pages folder
    "./components/**/*.{js,ts,jsx,tsx}", // components folder
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          900: "#6B250D",
          800: "#8C3111",
          700: "#B53F15",
          600: "#F5551B",
          500: "#FB432C",
          400: "#FF7A4B",
          300: "#FF9068",
          200: "#FFB398",
          100: "#FFCCB9",
          50: "#FFEEE9",
        },
        primary: {
          900: "#6C2358",
          800: "#83256B",
          700: "#A02B84",
          600: "#B6349A",
          500: "#DE57C4",
          400: "#EC86D8",
          300: "#F4B3E9",
          200: "#F9D5F4",
          100: "#FDEAFB",
          50: "#FEF5FD",
        },
        black: {
          900: "#000000",
          800: "#111111",
          700: "#282828",
          600: "#383838",
          500: "#4B4B4B",
          400: "#9D9FA1",
          300: "#BDBDBD",
          200: "#DDDDDD",
          100: "#F2F2F2",
          50: "#F9F9F9",
        },
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
    },
    fontWeight: {
      regular: "400",
      semibold: "600",
      bold: "700",
    },
    fontSize: {
      display1: ["140px", { lineHeight: "1" }],
      display2: ["110px", { lineHeight: "1.05" }],
      display3: ["98px", { lineHeight: "1.05" }],
      h2: ["84px", { lineHeight: "1.1" }],
      h1: ["63px", { lineHeight: "1.15" }],
      h3: ["54px", { lineHeight: "1.15" }],
      h4: ["42px", { lineHeight: "1.2" }],
      h5: ["34px", { lineHeight: "1.25" }],
      h6: ["28px", { lineHeight: "1.25" }],
      h7: ["20px", { lineHeight: "1.3" }],
      "body-2xl": ["20px", { lineHeight: "1.5" }],
      "body-xl": ["18px", { lineHeight: "1.6" }],
      "body-lg": ["16px", { lineHeight: "1.6" }],
      "body-md": ["14px", { lineHeight: "1.6" }],
      "body-sm": ["12px", { lineHeight: "1.6" }],
    },
  },
  plugins: [scrollbarHide],
};
