/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // fontSize: {
    //   // xxl : '2rem',
    // },
    colors: {
      'dark-light': '#252945',
      'dark': '#1E2139',
      'dark-violet': '#7C5DFA',
      'light-violet': '#9277FF',
      'tint-violet': '#494E6E',
      'light-gray': '#888EB0',
      'light-white': '#F8F8FB',
      'paid': '#33D69F',
      'pending': '#FF8F00',
      'draft': '#373B53',
      'icon-hover': '#DFE3FA'
    },
    fontFamily: {
      'spartan': ['League Spartan', 'sans-serif']
    },
    extend: {
      // padding: {
      //   '40%': '40%'
      // }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}