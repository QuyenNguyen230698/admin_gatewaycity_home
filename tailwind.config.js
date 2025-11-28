// tailwind.config.js → CHẮN CHẮN CHẠY

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit", // Just-in-Time mode for Tailwind CSS
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./nuxt.config.{js,ts}",
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    container: { center: true },
    extend: {
      zIndex: { '1500': '1500' },
      fontSize: {
        'h1': '3.25rem',
        'h2': '2.5rem',
        'h3': '2rem',
        'h4': '1.5rem',
        'h5': '1.25rem',
        'h6': '1rem',
        'p': '1rem',
        'span': '0.875rem',
        'small': '0.75rem',
      },
      fontWeight: {
        'h1': '300', 'h2': '300', 'h3': '500',
        'h4': '500', 'h5': '600', 'h6': '600',
      },
      lineHeight: { 'p': '1.625' },
      colors: { small: '#6B7280' },
      animation: { fadeIn: 'fadeIn 1s ease-in-out' },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('daisyui'),
    require('tailwindcss-animated'),
    require('tailwind-scrollbar')({ nocompatible: true })
  ],
  daisyui: {
    themes: ["light"],
    darkTheme: "light",
  }
}