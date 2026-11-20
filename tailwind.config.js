/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkbg: {
          950: '#070D0C',
          900: '#0B1514',
          800: '#11221F',
          700: '#17302C',
        },
        emerald: {
          950: '#041E18',
          900: '#064E3B',
          800: '#065F46',
          700: '#047857',
          600: '#059669',
          500: '#10B981',
          400: '#34D399',
          300: '#6EE7B7',
          200: '#A7F3D0',
          100: '#D1FAE5',
        },
        pahadi: {
          terra: '#C2410C',
          ochre: '#F59E0B',
          pine: '#0D332B',
          deepPine: '#071F1A',
          mist: '#F1F5F9',
          gold: '#FBBF24',
          aipan: '#991B1B',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'Merriweather', 'serif'],
      },
      boxShadow: {
        'glow-emerald': '0 0 30px rgba(16, 185, 129, 0.25)',
        'glow-gold': '0 0 30px rgba(245, 158, 11, 0.25)',
        'glow-terra': '0 0 30px rgba(194, 65, 12, 0.25)',
      }
    },
  },
  plugins: [],
}
