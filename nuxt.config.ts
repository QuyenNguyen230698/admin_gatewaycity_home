import { compression } from "vite-plugin-compression2";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  // Enable Nuxt 4 Architecture natively
  future: {
    compatibilityVersion: 4
  },

  devtools: { enabled: false },

  extends: [
     './layers/inventory-layer'
  ],

  devServer: {
    port: 7878,
    host: 'localhost'
  },

  // Let Nuxt 4 handle component auto-discovery automatically
  // No need for restricted path overrides, which were breaking sub-folder imports.
  components: [
     { path: '~/components', pathPrefix: true }
  ],

  app: {
    head: {
      htmlAttrs: { 'data-theme': 'light' },
      bodyAttrs: { class: "h-full" },
      title: "Gateway Co Chien Admin",
      link: [
        { rel: "icon", type: "image/x-icon", href: "https://res.cloudinary.com/dpcigceaq/image/upload/v1781874951/AdminAssets/htbspgp5pevgh953qwuk.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "https://res.cloudinary.com/dpcigceaq/image/upload/v1781874951/AdminAssets/htbspgp5pevgh953qwuk.png" },
        { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" }
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Gateway Co Chien Admin" },
        { name: "author", content: "Gateway Co Chien" },
        { name: "robots", content: "noindex, nofollow" },
        { name: "theme-color", content: "#1C351C" },
        { name: "apple-mobile-web-app-title", content: "Gateway Co Chien Admin" },
        { property: "og:title", content: "Gateway Co Chien Admin" },
        { property: "og:description", content: "Gateway Co Chien Admin" },
        { property: "og:site_name", content: "Gateway Co Chien" },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://res.cloudinary.com/dpcigceaq/image/upload/v1781874951/AdminAssets/htbspgp5pevgh953qwuk.png" },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  vite: {
    plugins: [ compression(), tailwindcss() ],
  },

  css: [ "~/assets/css/main.css" ],

  modules: [ "@pinia/nuxt", "@nuxt/image", "@nuxt/fonts" ],

  // Updated stores directory for Nuxt 4 structure
  pinia: {
    storesDirs: ['./stores/**'],
  },

  nitro: {
    serveStatic: true,
    prerender: { routes: ["/"], failOnError: false },
  },

  imports: {
    autoImport: true,
    dirs: [ '~/composables/**' ]
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.BASE_API || 'http://localhost:4000',
      googleClientId: process.env.GOOGLE_CLIENT_ID || 'dummy-client-id',
    },
  },
});
