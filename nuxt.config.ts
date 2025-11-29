import { compression } from "vite-plugin-compression2";

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

  vite: {
    plugins: [compression()],
  },

  // TRỎ ĐÚNG ĐƯỜNG DẪN CSS
  css: [
    "./app/assets/css/main.css",
  ],

  modules: [
    "@pinia/nuxt",
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxtjs/tailwindcss"
  ],

pinia: {
    storesDirs: ['./stores/**'],   // Nuxt 4 khuyến khích dùng stores/ thay vì store/
  },
    postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      "@fullhuman/postcss-purgecss": {
        content: [
          "./components/**/*.{vue,js}",
          "./layouts/**/*.vue",
          "./pages/**/*.vue",
          "./plugins/**/*.{js,ts}",
          "./app.vue",
          "./error.vue",
          "./nuxt.config.{js,ts}",
          "./index.html",
          "./src/**/*.{vue,js,ts,jsx,tsx}",
        ],
        safelist: [
          "aos-init",
          "aos-animate",
          /^aos-/,
          /^data-aos-/,
          /^data-aos/,
          /^v3dp__/,
          /^e-/,
        ],
        defaultExtractor: (content: string) =>
          content.match(/[\w-/:]+(?<!:)/g) || [],
      },
    },
  },

  nitro: {
    serveStatic: true,
    // Example of setting cache headers for static files
    prerender: {
      routes: ["/"], // Pre-render the home route
    },

    routeRules: {
      // Apply caching headers to all routes
      "/**": {
        headers: {
          "Cache-Control": "public, max-age=2592000, immutable", // 30 days
        },
      },
    },
  },

  imports: {
    autoImport: true,
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.BASE_API,
    },
  },

});
