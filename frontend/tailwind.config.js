/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2153dbff',   // Deep Navy
        'secondary': '#3B82F6', // Royal Blue
        'accent': '#06B6D4',    // Cyan
        'brand-blue': '#1E3A8A', 
        'brand-dark': '#0F172A', 
      },
      animation: {
        // Horizontal scroll for headers/tickers
        'marquee-slower': 'marquee 25s linear infinite',
        // Your new vertical scroll for the News Box
        'scroll-vertical': 'scroll-vertical 15s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        // Added the vertical logic here
        'scroll-vertical': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      }
    },
  },
  plugins: [],
}