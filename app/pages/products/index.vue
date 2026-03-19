<template>
  <div class="h-full flex flex-col space-y-6 animate-fade-in text-slate-900 dark:text-slate-100">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
      <div class="flex items-center gap-3">
        <div class="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <div>
          <h2 class="text-2xl font-bold">Real Estate Products</h2>
          <p class="text-sm text-slate-500">Manage property listings and building blueprints</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button @click="refreshProducts" class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" :class="['w-4 h-4', isLoading ? 'animate-spin' : '']" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Refresh</span>
        </button>
      </div>
    </div>

    <!-- Inventory Grid/Table -->
    <div class="flex-1 min-h-0 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
       <div class="overflow-x-auto flex-1 custom-scrollbar">
          <table class="w-full text-left border-collapse">
            <thead class="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800/80 backdrop-blur-md">
              <tr>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800 w-20 text-center">Action</th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800">Preview</th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800">Property Title</th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800">Slug</th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800">Created At</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              <tr v-for="item in productsData" :key="item._id" class="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors h-24">
                <td class="px-6 py-4 text-center">
                   <button @click="openUpdateDrawer(item)" class="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-primary-500 hover:text-white transition-all text-slate-500">
                     <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                     </svg>
                   </button>
                </td>
                <td class="px-6 py-4">
                  <div class="w-32 h-20 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 bg-slate-100">
                    <img :src="item.images[0]" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                </td>
                <td class="px-6 py-4">
                   <div class="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight">{{ item.title }}</div>
                   <div class="text-[10px] text-primary-500 font-bold mt-1 uppercase">Active Project</div>
                </td>
                <td class="px-6 py-4 font-mono text-xs text-slate-400 break-all max-w-xs">{{ item.slug }}</td>
                <td class="px-6 py-4 text-xs text-slate-400">{{ formatDate(item.createdAt) }}</td>
              </tr>
            </tbody>
          </table>

          <!-- Empty State -->
          <div v-if="!isLoading && (!productsData || productsData.length === 0)" class="flex flex-col items-center justify-center py-24 text-center">
             <div class="w-20 h-20 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-200 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
             </div>
             <h3 class="text-lg font-bold">No products available</h3>
             <p class="text-slate-500 text-sm mt-2">Initialize your property catalog to start managing.</p>
          </div>
       </div>
    </div>

    <!-- Spinner Loading -->
    <Teleport to="body">
       <div v-if="isLoading" class="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/10 backdrop-blur-[2px]">
          <div class="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
       </div>
    </Teleport>

    <ProductDrawer />
    <ToastMessage ref="toastRef" :typeToast="currentToastType" :message="toastMessage" :show="showToast" :width="`w-2/3 lg:w-fit`" class="z-40" />
  </div>
</template>

<script setup>
const productStore = useProductStore();
const config = useRuntimeConfig();

const toastRef = ref(null);
const showToast = ref(false);
const currentToastType = ref("");
const toastMessage = ref("");

const isLoading = ref(false)
const productsData = ref([])

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
    const response = await $fetch(`${config.public.apiBase}/products/list`);
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

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
</style>