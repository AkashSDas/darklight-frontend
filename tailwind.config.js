/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gtwalsheim: ["GTWalsheimPro", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Desktop
        "d-h1": "48.83px",
        "d-h2": "39.06px",
        "d-h3": "31.25px",
        "d-h4": "25.00px",
        "d-intro": "20.00px",
        "d-body1": "18.00px",
        "d-body2": "16.00px",
        "d-cap": "12.80px",
        "d-sm": "10.24px",

        // Tablet
        "t-h1": "36.62px",
        "t-h2": "29.30px",
        "t-h3": "23.44px",
        "t-h4": "18.75px",
        "t-intro": "18.75px",
        "t-body": "15.00px",
        "t-cap": "12.00px",
        "t-sm": "9.60px",

        // Mobile
        "m-h1": "30.52px",
        "m-h2": "24.41px",
        "m-h3": "19.53px",
        "m-h4": "19.53px",
        "m-intro": "15.63px	",
        "m-body": "12.50px",
        "m-cap": "10.00px",
        "m-sm": "8.00px",
      },
    },
  },
  plugins: [],
};
