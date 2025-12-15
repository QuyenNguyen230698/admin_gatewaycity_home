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
      },
      bodyAttrs: {
        class: "h-full",
      },
      title: "Admin Gateway City",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/Logo.svg" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/Logo.svg" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/Logo.svg" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/Logo.svg" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
        { name: "description", content: "Admin Gateway City" },
        { name: "keywords", content: "Admin Gateway City, Gatewaycity, Homes" },
        { name: "author", content: "Admin Gateway City" },
        { name: "robots", content: "index, follow" },
        { name: "theme-color", content: "#FFFFFF" },
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "default" },
        { name: "apple-mobile-web-app-title", content: "Admin Gateway City" },
        { property: "og:title", content: "Admin Gateway City" },
        { property: "og:description", content: "Admin Gateway City" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `https://gatewaycityhomes.com` },
        {
          property: "og:image",
          content: ``,
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@gatewaycityhomes" },
        { name: "twitter:title", content: "Admin Gateway City" },
        { name: "twitter:description", content: "Admin Gateway City" },
        {
          name: "twitter:image",
          content: ``,
        },
      ],
    },
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
      failOnError: false     // không dừng build nếu có lỗi nhỏ
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
