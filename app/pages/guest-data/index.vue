<template>
  <div class="h-full flex flex-col space-y-4 animate-fade-in">
    <!-- Header Actions -->
    <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
      <div class="flex items-center gap-3">
        <div class="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600">
           <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
           </svg>
        </div>
        <div>
          <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Guest Data</h2>
          <p class="text-xs text-slate-500">Manage customer leads and inquiries</p>
        </div>
      </div>

      <button @click="refreshData" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95">
        <svg xmlns="http://www.w3.org/2000/svg" :class="['w-4 h-4', isLoading ? 'animate-spin' : '']" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>Refresh</span>
      </button>
    </div>

    <!-- Table Container -->
    <div class="flex-1 min-h-0 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
      <div class="overflow-x-auto flex-1 custom-scrollbar">
        <table class="w-full text-left border-collapse">
          <thead class="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800/50 backdrop-blur-md">
            <tr>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800">First Name</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800">Last Name</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800">Email</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800">Phone</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800">Note</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800">Created At</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
            <tr v-for="item in guestData" :key="item._id" class="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
              <td class="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">{{ item.firstName }}</td>
              <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{{ item.lastName }}</td>
              <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                <a :href="'mailto:' + item.email" class="hover:text-primary-500 transition-colors">{{ item.email }}</a>
              </td>
              <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{{ item.phoneNumber }}</td>
              <td class="px-6 py-4 text-sm text-slate-500 italic max-w-xs truncate">{{ item.note || '-' }}</td>
              <td class="px-6 py-4 text-xs text-slate-400 font-mono">{{ formatDate(item.createdAt) }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="!isLoading && (!guestData || guestData.length === 0)" class="flex flex-col items-center justify-center py-20 text-center">
           <div class="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
           </div>
           <p class="text-slate-500 font-medium">No guest data found.</p>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 0" class="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div class="text-xs text-slate-500 font-medium tracking-tight">
          Showing <span class="text-slate-900 dark:text-slate-200">{{ (currentPage - 1) * pageSize + 1 }}-{{ Math.min(currentPage * pageSize, totalRecords) }}</span> of <span class="text-slate-900 dark:text-slate-200">{{ totalRecords }}</span> entries
        </div>
        
        <div class="flex items-center gap-1">
          <button @click="prevPage" :disabled="currentPage === 1" class="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          <div class="flex items-center gap-1 mx-2">
            <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" 
              :class="['w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg transition-all', page === currentPage ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400']">
              {{ page }}
            </button>
          </div>

          <button @click="nextPage" :disabled="currentPage === totalPages" class="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div v-if="isLoading" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/10 backdrop-blur-[1px]">
       <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div class="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <span class="text-sm font-bold">Refreshing data...</span>
       </div>
    </div>

    <ToastMessage ref="toastRef" :typeToast="currentToastType" :message="toastMessage" :show="showToast" :width="`w-2/3 lg:w-fit`" class="z-40" />
  </div>
</template>

<script setup>
const toastRef = ref(null);
const showToast = ref(false);
const currentToastType = ref("");
const toastMessage = ref("");

const currentPage = ref(1)
const pageSize = ref(12)
const totalRecords = ref(0)
const totalPages = computed(() => Math.ceil(totalRecords.value / pageSize.value))

const visiblePages = computed(() => {
  const range = 2
  let start = Math.max(1, currentPage.value - range)
  let end = Math.min(totalPages.value, currentPage.value + range)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  fetchDataNews()
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchDataNews()
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchDataNews()
  }
}

const config = useRuntimeConfig();
const guestData = ref([])
const isLoading = ref(false)

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

const refreshData = () => {
  currentPage.value = 1
  fetchDataNews()
}

const fetchDataNews = async () => {
  isLoading.value = true;
  try {
    const response = await $fetch(`${config.public.apiBase}/quoteprices/list`, {
      method: 'POST',
      body: {
        skip: (currentPage.value - 1) * pageSize.value,
        take: pageSize.value,
        requiresCounts: true,
        sorted: [{ name: 'createdAt', direction: 'descending' }]
      }
    });

    guestData.value = response.result || []
    totalRecords.value = response.count || 0
  } catch (error) {
    console.error('Error fetching data:', error);
    guestData.value = [];
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchDataNews();
})
</script>