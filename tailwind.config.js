/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "radial-mask":
          "radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0) 31.77%, #000000 100%)",
      },
      fontFamily: {
        gtwalsheim: ["GTWalsheimPro", "system-ui", "sans-serif"],
        gilroy: ["Gilroy", "system-ui", "sans-serif"],
        urbanist: ["Urbanist", "system-ui", "sans-serif"],
        syne: ["Syne", "system-ui", "sans-serif"],
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
      colors: {
        grey0: "#FCFCFC",
        grey1: "#F7F7F7",
        grey2: "#EDEDED",
        grey3: "#E3E3E3",
        grey4: "#DEDEDE",
        grey5: "#DCDEE3",
        grey6: "#8A8F99",
        grey7: "#494C53",
        grey8: "#131313",
        purple0: "#EDEEFF",
        purple1: "#DBDCFF",
        purple2: "#3D44FF",
        purple3: "#373DE5",
        purple4: "#3136CC",
        blue0: "#EDF6FF",
        blue1: "#DBEDFF",
        blue2: "#2383E2",
        blue3: "#0075D3",
        blue4: "#0068C3",
        red0: "#FFEDED",
        red1: "#FFDBDB",
        red2: "#EB5757",
        green0: "#F1FFED",
        green1: "#E2FFDB",
        green2: "#11BF6D",
      },
      boxShadow: {
        sm: "0px 4px 8px 0px rgba(0, 0, 0, 0.12)",
        md: "0px 6px 12px 0px rgba(0, 0, 0, 0.12)",
        lg: "0px 8px 16px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
