/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F2BD24',
          50: '#FAFAFA',
          100: '#F5F0E8',
          200: '#F2F0E8',
          300: '#F0EDD6',
          400: '#E8E0CF',
          500: '#F2BD24',
          600: '#9C874A',
          700: '#8C8059',
        },
        neutral: {
          50: '#FFFFFF',
          100: '#FCFAF7',
          200: '#F5F0E8',
          300: '#E8E0CF',
          400: '#9C874A',
          500: '#8C8059',
        },
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

