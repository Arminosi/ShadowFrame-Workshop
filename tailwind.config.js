/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./constants.tsx",
    "./types.ts",
  ],
  safelist: [
    // Tool card colors - needed for dynamic class names
    'text-fuchsia-400',
    'text-cyan-400',
    'text-emerald-400',
    'text-amber-400',
    'text-rose-400',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scrolling': 'scrolling 1s linear infinite',
        'traverse': 'traverse 4s linear infinite',
        'flow-gradient': 'flow-gradient 2s linear infinite',
        'flow-gradient-text': 'flow-text 5s linear infinite',
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        scrolling: {
          '0%': { transform: 'translateX(-8px)' },
          '100%': { transform: 'translateX(0)' },
        },
        traverse: {
          '0%': { transform: 'translateX(0px) scale(0.75)' },
          '50%': { transform: 'translateX(16px) scale(1.25)' },
          '100%': { transform: 'translateX(32px) scale(0.75)' },
        },
        'flow-gradient': {
          '0%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'flow-text': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
