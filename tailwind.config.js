/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49'
        },
        secondary: {
          100: '#f3e5f5',
          200: '#e1bee7',
          300: '#ce93d8',
          400: '#ba68c8',
          500: '#ab47bc',
          600: '#9c27b0',
          700: '#8e24aa',
          800: '#7b1fa2',
          900: '#4a148c'
        },
        theme: {
          100: '#ebb40f',
          200: '#f5d178',
          300: '#edb44d',
          400: '#dc7332',
          500: '#a51604',
          600: '#df2e38'
        }
      }
    }
  },
  plugins: []
}
