var { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ["var(--font-urbanist)", ...fontFamily.sans],
        gilroy: ["var(--font-gilroy)", ...fontFamily.sans],
      },
      colors: {
        background1: "#FFFFFF",
        background2: "#FAFAFA",
        background3: "#F5F5F5",
        border: "#F0F0F0",
        text1: "#1A1B22",
        text2: "#8B8B8B",
        text3: "#FFFFFF",
        primary: "#3A4EFF",
        "light-primary": "#6676FF",
        success: "#34A853",
        "light-success": "#F3FFD9",
        error: "#EA4335",
        "light-error": "#FFECEB",
        link: "#4285F4",
      },
    },
  },
  plugins: [],
};
