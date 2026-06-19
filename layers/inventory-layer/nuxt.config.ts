export default defineNuxtConfig({
  // Nuxt 4 Layer for Inventory Micro-service
  components: [
    { path: '~/layers/inventory-layer/app/components', pathPrefix: false }
  ],
  dir: {
    app: 'app'
  }
})
