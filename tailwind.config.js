/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FAF6F0',
          100: '#F7F2EB',
          200: '#EAE1D4',
          300: '#DCCEB8',
          400: '#C2AE92',
          900: '#1A1612',
        },
        medical: {
          50: '#FEF8EE',
          100: '#FDF0D5',
          200: '#FCD34D',
          300: '#F59E0B',
          400: '#D97706',
          500: '#C27803',
          600: '#9A5B02',
          700: '#78350F',
          800: '#451A03',
          900: '#290F02',
        },
        therapy: {
          50: '#FDFBF7',
          100: '#F9F6F0',
          200: '#EADBC8',
          800: '#8c765c',
          900: '#5c4b37',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
