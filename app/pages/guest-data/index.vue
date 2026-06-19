<template>
  <div class="h-full flex flex-col">

    <!-- Sticky Header -->
    <div class="px-8 py-6 border-b border-zinc-200 dark:border-zinc-800
                flex items-center justify-between shrink-0
                bg-white dark:bg-slate-900 sticky top-0 z-10">
      <div>
        <h1 class="text-2xl font-bold text-zinc-900 dark:text-white">Guest Data</h1>
        <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage customer leads and inquiries</p>
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
          placeholder="Search by name or email..." />
      </div>
      <div class="flex items-center gap-3">
        <button @click="refreshData"
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
        <p>Loading guest data...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="!filteredGuests.length"
        class="flex flex-col items-center justify-center h-64 text-zinc-400
               border-2 border-dashed border-zinc-200 dark:border-zinc-800
               rounded-xl bg-zinc-50/50 dark:bg-zinc-800/30">
        <div class="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
          <i class="bi bi-inbox text-2xl"></i>
        </div>
        <h3 class="text-zinc-900 dark:text-white font-medium mb-1">No guest data found</h3>
        <p class="text-sm">Customer leads will appear here once submitted.</p>
      </div>

      <!-- Table -->
      <div v-else class="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-700">
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">First Name</th>
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Last Name</th>
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Email</th>
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Phone</th>
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Note</th>
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Created At</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100 dark:divide-zinc-700">
            <tr v-for="item in filteredGuests" :key="item._id"
              class="group hover:bg-zinc-50 dark:hover:bg-zinc-700/30 transition-colors">
              <td class="px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">{{ item.firstName }}</td>
              <td class="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{{ item.lastName }}</td>
              <td class="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                <a :href="'mailto:' + item.email" class="hover:text-blue-600 transition-colors">{{ item.email }}</a>
              </td>
              <td class="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{{ item.phoneNumber }}</td>
              <td class="px-6 py-4 text-sm text-zinc-500 italic max-w-xs truncate">{{ item.note || '—' }}</td>
              <td class="px-6 py-4 text-xs text-zinc-400 font-mono">{{ formatDate(item.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-6 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-700 pt-4">
        <p class="text-sm text-zinc-500">
          Showing <span class="font-medium text-zinc-900 dark:text-white">{{ (currentPage - 1) * pageSize + 1 }}</span> to
          <span class="font-medium text-zinc-900 dark:text-white">{{ Math.min(currentPage * pageSize, totalRecords) }}</span> of
          <span class="font-medium text-zinc-900 dark:text-white">{{ totalRecords }}</span>
        </p>
        <div class="flex gap-2">
          <button @click="prevPage" :disabled="currentPage === 1"
            class="px-3 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm font-medium
                   hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            Previous
          </button>
          <button @click="nextPage" :disabled="currentPage === totalPages"
            class="px-3 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm font-medium
                   hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })

const config = useRuntimeConfig();

const currentPage = ref(1)
const pageSize = ref(12)
const totalRecords = ref(0)
const totalPages = computed(() => Math.ceil(totalRecords.value / pageSize.value))
const guestData = ref([])
const isLoading = ref(false)
const searchQuery = ref('')

const filteredGuests = computed(() => {
  if (!searchQuery.value) return guestData.value
  const q = searchQuery.value.toLowerCase()
  return guestData.value.filter(g =>
    g.firstName?.toLowerCase().includes(q) ||
    g.lastName?.toLowerCase().includes(q) ||
    g.email?.toLowerCase().includes(q)
  )
})

const nextPage = () => { if (currentPage.value < totalPages.value) { currentPage.value++; fetchData() } }
const prevPage = () => { if (currentPage.value > 1) { currentPage.value--; fetchData() } }

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

const refreshData = () => {
  currentPage.value = 1
  fetchData()
}

const fetchData = async () => {
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
    console.error('Error fetching guest data:', error);
    guestData.value = [];
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchData();
})
</script>