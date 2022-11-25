/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'EA': '#EAEAEA',
        'dots': "#645F5B",
        'side': "#FAF4EE"
      },
    },
  },
  plugins: [],
}