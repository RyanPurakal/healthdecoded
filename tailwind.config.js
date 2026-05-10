/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        beige: '#e6ecf0',
        'beige-light': '#e6ecf0',
        'beige-dark': '#c8dae8',
      },
    },
  },
  plugins: [],
};
