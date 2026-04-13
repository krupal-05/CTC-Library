/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#002059',
        'primary_container': '#13357b',
        'on_primary': '#ffffff',
        'surface': '#f8f9fa',
        'surface_container_low': '#f3f4f5',
        'surface_container_lowest': '#ffffff',
        'on_surface': '#191c1d',
        'outline_variant': 'rgba(25, 28, 29, 0.2)',
        'accent': '#06B6D4', // keeping accent if needed elsewhere
        'secondary': '#3B82F6', // keeping secondary if needed elsewhere
        'tertiary_container': '#d8e2ff',
        'on_tertiary_container': '#001a41',
        'error_container': '#ffdad6',
        'on_error_container': '#410002',
      },
      fontFamily: {
        'serif': ['"Noto Serif"', 'serif'],
        'sans': ['"Public Sans"', 'sans-serif'],
        'mono': ['"Inter"', 'monospace'],
        display: ['"Noto Serif"', 'serif'],
        body: ['"Public Sans"', 'sans-serif'],
        label: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'marquee-slower': 'marquee 25s linear infinite',
        'scroll-vertical': 'scroll-vertical 15s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scroll-vertical': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      }
    },
  },
  plugins: [],
}