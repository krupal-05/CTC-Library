/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1E3A8A',   // Deep Navy
        'secondary': '#3B82F6', // Royal Blue
        'accent': '#06B6D4',    // Cyan (using Tailwind default cyan-500 hex)
        'brand-blue': '#1E3A8A', // Mapping old brand-blue to new primary for consistency
        'brand-dark': '#0F172A', // Using a matching dark navy
      },
      animation: {
        'marquee-slower': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
