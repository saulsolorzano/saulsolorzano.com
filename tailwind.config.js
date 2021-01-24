const colors = require("tailwindcss/colors");

module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.ts",
    "./src/**/*.tsx",
    "./src/**/*.md",
  ],
  theme: {
    fontFamily: {
      primary: ["halyard-display", "sans-serif"],
      copy: ["ff-tisa-sans-web-pro", "sans-serif"],
    },
    colors: {
      white: colors.white,
      gray: colors.blueGray,
      violet: colors.violet,
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
              color: "#B45309",
              "&:hover": {
                color: "#8B5CF6",
              },
            },
            pre: {
              "box-shadow": "4px 4px 0 #B45309",
            },
          },
        },
      },
      colors: {
        "dark-copy": "#fffffe",
        highlight: "#8B5CF6",
        "light-highlight": "#fffffe",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
