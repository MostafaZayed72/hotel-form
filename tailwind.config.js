/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        one: {
          DEFAULT: '#1E3A8A', 
        },
        second: {
          DEFAULT: '#fec433', 
        },
      },
    },
  },
  plugins: [],
};
