const colors = require("tailwindcss/colors");

module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    fontFamily: {
      primary: ["halyard-display", "sans-serif"],
      copy: ["ff-tisa-sans-web-pro", "sans-serif"],
    },
    colors: {
      white: colors.white,
      gray: colors.blueGray,
      yellow: colors.amber,
      blue: colors.lightBlue,
    },
    extend: {
      screens: {
        dark: { raw: "(prefers-color-scheme: dark)" },
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: "#d9376e",
              "&:hover": {
                color: "#ff8e3c",
              },
            },
            pre: {
              "box-shadow": "4px 4px 0 #d9376e",
            },
          },
        },
      },
      colors: {
        "dark-copy": "#fffffe",
        highlight: "#ff8e3c",
        "light-highlight": "#fffffe",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
