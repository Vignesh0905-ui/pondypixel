/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#05070D',
          'bg-dark': '#080A12',
          surface: '#0D101C',
          purple: '#7C3CFF',
          violet: '#9B5CFF',
          blue: '#35A7FF',
          cyan: '#20D9FF',
          magenta: '#D946EF',
          text: '#F7F7FF',
          muted: '#9CA3B8',
          border: 'rgba(124, 60, 255, 0.2)',
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
