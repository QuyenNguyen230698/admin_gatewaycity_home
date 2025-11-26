import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: false },

  devServer: {
    port: 7878,
  },

  app: {
    head: {
      htmlAttrs: {
        'data-theme': 'light'
      }
    }
  },

  // DÙNG TAILWIND 4 → CHỈ CẦN VITE PLUGIN
  vite: {
    plugins: [tailwindcss()],
  },

  // TRỎ ĐÚNG ĐƯỜNG DẪN CSS
  css: [
    './app/assets/css/tailwind.css'
  ],

  modules: [],

});
