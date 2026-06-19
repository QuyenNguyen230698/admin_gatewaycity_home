<template>
  <div class="h-full flex flex-col">

    <!-- Sticky Header -->
    <div class="px-8 py-6 border-b border-zinc-200 dark:border-zinc-800
                flex items-center justify-between shrink-0
                bg-white dark:bg-slate-900 sticky top-0 z-10">
      <div>
        <h1 class="text-2xl font-bold text-zinc-900 dark:text-white">Real Estate Products</h1>
        <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage property listings and building blueprints</p>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4
                bg-zinc-50/50 dark:bg-slate-900/50 shrink-0
                border-b border-zinc-200 dark:border-zinc-800">
      <div class="relative max-w-md w-full">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i class="bi bi-search text-zinc-400"></i>
        </div>
        <input v-model="searchQuery" type="text"
          class="w-full pl-10 pr-4 py-2.5
                 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700
                 rounded-lg text-sm focus:ring-2 focus:ring-black dark:focus:ring-white
                 outline-none transition-all dark:text-white placeholder-zinc-400 shadow-sm"
          placeholder="Search products..." />
      </div>
      <div class="flex items-center gap-3">
        <button @click="refreshProducts"
          class="w-9 h-9 flex items-center justify-center
                 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700
                 rounded-lg text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
          <i :class="['bi bi-arrow-clockwise', isLoading ? 'animate-spin' : '']"></i>
        </button>
      </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 overflow-auto px-8 py-4">

      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center h-64 text-zinc-400">
        <div class="w-8 h-8 border-2 border-zinc-300 border-t-zinc-600 rounded-full animate-spin mb-4"></div>
        <p>Loading products...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="!filteredProducts.length"
        class="flex flex-col items-center justify-center h-64 text-zinc-400
               border-2 border-dashed border-zinc-200 dark:border-zinc-800
               rounded-xl bg-zinc-50/50 dark:bg-zinc-800/30">
        <div class="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
          <i class="bi bi-inbox text-2xl"></i>
        </div>
        <h3 class="text-zinc-900 dark:text-white font-medium mb-1">No products found</h3>
        <p class="text-sm">Initialize your property catalog to start managing.</p>
      </div>

      <!-- Table -->
      <div v-else class="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-700">
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Preview</th>
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Property Title</th>
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Slug</th>
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Created At</th>
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100 dark:divide-zinc-700">
            <tr v-for="item in filteredProducts" :key="item._id"
              class="group hover:bg-zinc-50 dark:hover:bg-zinc-700/30 transition-colors">
              <td class="px-6 py-4">
                <div class="w-28 h-18 rounded-lg overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-700 bg-zinc-100">
                  <img :src="item.images?.[0]" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm font-bold text-zinc-900 dark:text-white tracking-tight">{{ item.title }}</div>
                <div class="text-xs text-green-600 font-semibold mt-1">
                  <span class="inline-flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 font-mono text-xs text-zinc-400 dark:text-zinc-500 max-w-xs truncate">{{ item.slug }}</td>
              <td class="px-6 py-4 text-xs text-zinc-400">{{ formatDate(item.createdAt) }}</td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click="openUpdateDrawer(item)"
                    class="w-8 h-8 flex items-center justify-center rounded-lg
                           hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                    <i class="bi bi-pencil text-sm"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

    <ProductDrawer />
    <ToastMessage ref="toastRef" :typeToast="currentToastType" :message="toastMessage" :show="showToast" :width="`w-2/3 lg:w-fit`" class="z-40" />
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })

const productStore = useProductStore();
const config = useRuntimeConfig();
const toastRef = ref(null);
const showToast = ref(false);
const currentToastType = ref("");
const toastMessage = ref("");
const isLoading = ref(false)
const productsData = ref([])
const searchQuery = ref('')

const filteredProducts = computed(() => {
  if (!searchQuery.value) return productsData.value
  return productsData.value.filter(p =>
    p.title?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    p.slug?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

const openUpdateDrawer = (item) => {
  productStore.setProduct(item);
}

const fetchDataProducts = async () => {
  isLoading.value = true;
  try {
    const response = await $fetch(`${config.public.apiBase}/products/list`, {
      method: 'GET'
    });
    productsData.value = response.result || []
  } catch (error) {
    console.error('Error fetching products:', error);
    productsData.value = [];
  } finally {
    isLoading.value = false;
  }
}

const refreshProducts = () => {
  fetchDataProducts()
}

onMounted(() => {
  fetchDataProducts()
})
</script>