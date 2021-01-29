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
            ".series-index": {
              a: {
                color: "#334155",
                "text-decoration": "none",
                "&:hover": {
                  color: "#0369a1",
                },
              },
              "a.current": {
                "font-weight": "700",
              },
            },
            "li.task-list-item": {
              "padding-left": "0.8em",
              "& > input": {
                "margin-right": "0.8em",
                "margin-top": "0 !important",
                "margin-bottom": "0 !important",
              },
              "&:before": {
                display: "none",
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
