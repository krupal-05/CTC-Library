/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#4c7c9b', // From Figma screenshot
        'brand-dark': '#1e293b', 
      }
    },
  },
  plugins: [],
}
