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
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
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
