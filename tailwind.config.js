/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-in': 'bounce-in .25s linear'
      },
      keyframes: {
        "bounce-in": {
          '50%, 60%': {
            transform: 'scale(1.05)'
          }
        }
      }
    },
  },
  plugins: [require('prettier-plugin-tailwindcss')],
};
