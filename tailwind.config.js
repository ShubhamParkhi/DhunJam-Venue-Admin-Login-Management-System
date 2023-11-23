/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: "#030303",
        white: "#fff",
        thistle: "#f0c3f1",
        blueviolet: "#6741d9",
      },
      spacing: {},
      fontFamily: {
        "regular-font": "Poppins",
      },
    },
    fontSize: {
      base: "16px",
      "13xl": "32px",
      inherit: "inherit",
    },
    screens: {
      lg: {
        max: "1200px",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
