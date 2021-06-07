const colors = require("tailwindcss/colors");

module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  darkMode: "class",
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
      dark: {
        light: "#eebbc3",
        border: "#404660",
        DEFAULT: "#292d3e",
      },
    },
    backgroundSize: {
      header: "80% 100%",
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: "#B45309",
              "&:hover": {
                color: "#8B5CF6",
              },
            },
            img: {
              "margin-left": "auto",
              "margin-right": "auto",
              "box-shadow":
                "2px 2px 0 #707070, 4px 4px 0 #a8a8a8, 6px 6px 0 #d3d3d3",
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
            code: {
              backgroundColor: "#fdf6e3",
              padding: ".1em",
              "border-radius": ".3em",
            },
            pre: {
              "box-shadow": "4px 4px 0 #B45309",
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.200"),
            strong: {
              color: theme("colors.gray.200"),
            },
            "ol > li::before": {
              color: theme("colors.gray.400"),
            },
            "ul > li::before": {
              backgroundColor: theme("colors.gray.400"),
            },
            hr: {
              borderColor: theme("colors.gray.200"),
            },
            blockquote: {
              color: theme("colors.gray.200"),
              borderLeftColor: theme("colors.gray.400"),
            },
            ul: {
              color: theme("colors.gray.200"),
            },
            ol: {
              color: theme("colors.gray.200"),
            },
            p: {
              color: theme("colors.gray.200"),
            },
            h1: {
              color: theme("colors.gray.200"),
            },
            h2: {
              color: theme("colors.gray.200"),
            },
            h3: {
              color: theme("colors.gray.200"),
            },
            h4: {
              color: theme("colors.gray.200"),
            },
            a: {
              color: "#eebbc3 !important",
              "&:hover": {
                color: "#c19199 !important",
              },
            },
            code: {
              backgroundColor: "#fdf6e3",
              padding: ".1em",
              "border-radius": ".3em",
            },
            pre: {
              backgroundColor: theme("colors.gray.800"),
              "box-shadow": "4px 4px 0 #eebbc3",
            },
          },
        },
      }),
      colors: {
        "dark-copy": "#fffffe",
        highlight: "#8B5CF6",
        "light-highlight": "#fffffe",
      },
      backgroundImage: (theme) => ({
        "header-pattern":
          "linear-gradient(#0135d000 70%,rgba(180, 83, 9, 0.29) 70%)",
      }),
    },
  },
  variants: {
    extend: {
      typography: ["dark"],
      backgroundColor: ["checked"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
