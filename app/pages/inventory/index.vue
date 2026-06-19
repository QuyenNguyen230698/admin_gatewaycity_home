<template>
  <div class="h-full flex flex-col bg-white">
    <div class="px-8 py-6 border-b border-[--color-google-border] flex items-center justify-between shrink-0 sticky top-0 z-10 bg-white">
      <div>
        <h1 class="text-2xl font-normal text-[--color-google-text-main]">Inventory Management</h1>
        <p class="text-sm text-[--color-google-text-sub] mt-1">Manage stock levels, pricing, and product availability</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="bg-[#1a73e8] hover:bg-[#1765cc] text-white px-5 py-2 rounded-md text-sm font-medium transition-shadow hover:shadow-sm">
          + Add Product
        </button>
      </div>
    </div>

    <div class="px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#f8f9fa] shrink-0 border-b border-[--color-google-border]">
      <div class="relative max-w-md w-full">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i class="bi bi-search text-gray-400"></i>
        </div>
        <input v-model="searchQuery" type="text"
          class="w-full pl-10 pr-4 py-2 rounded-lg border border-[--color-google-border] bg-white text-sm focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] outline-none transition-all text-[--color-google-text-main] shadow-sm"
          placeholder="Search by product name or SKU..." />
      </div>
      
      <div class="flex items-center gap-3">
        <select v-model="categoryFilter"
          class="bg-white border border-[--color-google-border] rounded-md px-3 py-2 text-sm text-[--color-google-text-main] outline-none focus:border-[#1a73e8]">
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>
    </div>

    <div class="flex-1 overflow-auto px-8 py-6">
      <div class="border border-[--color-google-border] rounded-xl overflow-hidden bg-white">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#f8f9fa] border-b border-[--color-google-border]">
              <th class="px-6 py-4 text-xs font-semibold text-[--color-google-text-sub] uppercase">Product Details</th>
              <th class="px-6 py-4 text-xs font-semibold text-[--color-google-text-sub] uppercase">SKU</th>
              <th class="px-6 py-4 text-xs font-semibold text-[--color-google-text-sub] uppercase">Category</th>
              <th class="px-6 py-4 text-xs font-semibold text-[--color-google-text-sub] uppercase text-right">Stock</th>
              <th class="px-6 py-4 text-xs font-semibold text-[--color-google-text-sub] uppercase text-right">Price</th>
              <th class="px-6 py-4 text-xs font-semibold text-[--color-google-text-sub] uppercase">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[--color-google-border]">
            <tr v-for="item in filteredInventory" :key="item.id" class="hover:bg-gray-50/50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                    <i class="bi bi-box text-gray-400"></i>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-[--color-google-text-main]">{{ item.name }}</div>
                    <div class="text-xs text-gray-400">ID: #{{ item.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm font-mono text-[--color-google-text-sub]">{{ item.sku }}</td>
              <td class="px-6 py-4">
                <span class="text-sm text-[--color-google-text-main]">{{ item.category }}</span>
              </td>
              <td class="px-6 py-4 text-right">
                <span class="text-sm font-medium" :class="item.stock < 10 ? 'text-red-600' : 'text-[--color-google-text-main]'">
                  {{ item.stock }}
                </span>
              </td>
              <td class="px-6 py-4 text-right text-sm font-medium text-[--color-google-text-main]">
                ${{ item.price.toLocaleString() }}
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                  :class="{
                    'bg-green-50 text-green-700 border-green-100': item.stock > 10,
                    'bg-amber-50 text-amber-700 border-amber-100': item.stock <= 10 && item.stock > 0,
                    'bg-red-50 text-red-700 border-red-100': item.stock === 0,
                  }">
                  {{ item.stock === 0 ? 'Out of Stock' : (item.stock <= 10 ? 'Low Stock' : 'In Stock') }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })

const inventory = ref([])
const searchQuery = ref('')
const categoryFilter = ref('')

const filteredInventory = computed(() => {
  let data = inventory.value
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    data = data.filter(i => 
      i.name.toLowerCase().includes(q) || 
      i.sku.toLowerCase().includes(q)
    )
  }
  if (categoryFilter.value) {
    data = data.filter(i => i.category === categoryFilter.value)
  }
  return data
})

onMounted(() => {
  // Dữ liệu mẫu Inventory (Mock Data)
  const categories = ['Electronics', 'Furniture', 'Accessories']
  const products = [
    'MacBook Pro M3', 'Herman Miller Chair', 'Keychron K2 Keyboard', 
    'Dell UltraSharp Display', 'Logitech MX Master 3S', 'Standing Desk'
  ]
  
  inventory.value = Array.from({ length: 50 }).map((_, i) => ({
    id: 1000 + i,
    name: products[i % products.length] + ' - ' + (i + 1),
    sku: `SKU-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
    category: categories[i % categories.length],
    stock: Math.floor(Math.random() * 100),
    price: Math.floor(Math.random() * 2000) + 50,
  }))
})
</script>

<style scoped>
/* Biến màu theo yêu cầu refactor */
:root {
  --color-google-bg: #ffffff;
  --color-google-border: #e0e2e6;
  --color-google-text-main: #1f1f1f;
  --color-google-text-sub: #5f6368;
}
</style>