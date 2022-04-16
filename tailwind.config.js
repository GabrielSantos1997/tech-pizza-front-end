const colors = require('tailwindcss/colors');

delete colors.lightBlue;

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      primary: 'black',
      secondary: 'black',
      lightBlue: colors.sky,
      blueGray: {
        100: 'rgb(241, 245, 249)',
        200: 'rgb(226, 232, 240)',
        300: 'rgb(203, 213, 225)',
        400: 'rgb(148, 163, 184)',
        500: 'rgb(100, 116, 139)',
        600: 'rgb(71, 85, 105)',
        700: 'rgb(51, 65, 85)',
        800: 'rgb(30, 41, 59)',
      },
    },
    extend: {
      width: {
        '1/13': `${(1 / 13).toFixed(6) * 100}%`,
        '2/13': `${(2 / 13).toFixed(6) * 100}%`,
        '3/13': `${(3 / 13).toFixed(6) * 100}%`,
        '4/13': `${(4 / 13).toFixed(6) * 100}%`,
        '5/13': `${(5 / 13).toFixed(6) * 100}%`,
        '6/13': `${(6 / 13).toFixed(6) * 100}%`,
        '7/13': `${(7 / 13).toFixed(6) * 100}%`,
        '8/13': `${(8 / 13).toFixed(6) * 100}%`,
        '9/13': `${(9 / 13).toFixed(6) * 100}%`,
        '10/13': `${(10 / 13).toFixed(6) * 100}%`,
        '11/13': `${(11 / 13).toFixed(6) * 100}%`,
        '12/13': `${(12 / 13).toFixed(6) * 100}%`,
        '13/13': `${(13 / 13).toFixed(6) * 100}%`,
      },
    },
  },

  variants: {
    extend: {},
  },
  plugins: [],
};
