const colors = require('tailwindcss/colors');

module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    fontFamily: {
			'primary': ['halyard-display', 'sans-serif']
    },
    borderWidth: {
      '20': '20px'
    },
    extend: {
      screens: {
        'dark': {'raw': '(prefers-color-scheme: dark)'},
      },
      colors: {
        'dark-copy': '#fffffe',
        'highlight': '#ff8e3c',
        'light-highlight': '#fffffe'
      }
    },
  },
  variants: {},
  plugins: [],
}
