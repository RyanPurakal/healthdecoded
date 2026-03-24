/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'beige': '#f5f3f0',
        'beige-light': '#f8f6f3',
        'beige-dark': '#e8e6e3',
      },
    },
  },
  plugins: [],
};
