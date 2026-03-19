<template>
  <div class="h-full flex flex-col space-y-4 animate-fade-in text-slate-900 dark:text-slate-100">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
      <div class="flex items-center gap-3">
        <div class="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <div>
          <h2 class="text-2xl font-bold">News & Media</h2>
          <p class="text-sm text-slate-500">Create and manage your articles and events</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button @click="refreshNews" class="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" :class="['w-5 h-5', isLoading ? 'animate-spin' : '']" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
        <button @click="openEditDrawer" class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-lg shadow-primary-600/20 transition-all active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Create News</span>
        </button>
      </div>
    </div>

    <!-- Content Table -->
    <div class="flex-1 min-h-0 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
      <div class="overflow-x-auto flex-1 scrollable">
        <table class="w-full text-left border-collapse">
          <thead class="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800/80 backdrop-blur-md">
            <tr>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800 w-20 text-center">Action</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800">Banner</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800">Title</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800">Status</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800">Type</th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800">Created At</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
            <tr v-for="item in newsData" :key="item._id" class="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
              <td class="px-6 py-4 text-center">
                <div class="relative inline-block text-left group/dots">
                  <button class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                  <div class="absolute left-0 mt-2 w-48 rounded-2xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 opacity-0 invisible group-focus-within/dots:opacity-100 group-focus-within/dots:visible transition-all">
                    <button @click="openUpdateDrawer(item)" class="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2">
                       <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                       Edit Article
                    </button>
                    <button @click="statusUpdate(item._id, 'published')" class="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2">
                       <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                       Publish
                    </button>
                    <button @click="statusUpdate(item._id, 'drafted')" class="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2">
                       <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                       Set to Draft
                    </button>
                    <div class="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>
                    <button @click="deleteNews(item._id)" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                       <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                       Delete
                    </button>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="w-24 h-16 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 bg-slate-100">
                  <img :src="item.src" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="max-w-xs xl:max-w-md">
                  <div class="text-sm font-bold truncate">{{ item.title }}</div>
                  <div class="text-xs text-slate-500 truncate mt-1">{{ item.description }}</div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span :class="['px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase', 
                  item.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                  item.status === 'drafted' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                  'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400']">
                  {{ item.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                 <span class="text-xs font-semibold px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
                   {{ item.type }}
                 </span>
              </td>
              <td class="px-6 py-4 text-xs font-mono text-slate-400">
                {{ formatDate(item.createdAt) }}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="!isLoading && (!newsData || newsData.length === 0)" class="flex flex-col items-center justify-center py-24 text-center">
           <div class="w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
           </div>
           <h3 class="text-lg font-bold">No articles found</h3>
           <p class="text-slate-500 max-w-xs mx-auto mt-2">Get started by creating your first news post or event update.</p>
           <button @click="openEditDrawer" class="mt-6 px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl active:scale-95 transition-all">Create Now</button>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 0" class="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div class="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">
          Showing <span class="text-slate-900 dark:text-slate-100">{{ (currentPage - 1) * pageSize + 1 }}-{{ Math.min(currentPage * pageSize, totalRecords) }}</span>
        </div>
        
        <div class="flex items-center gap-1">
          <button @click="prevPage" :disabled="currentPage === 1" class="p-2 rounded-xl hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 disabled:opacity-30 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" 
            :class="['w-10 h-10 flex items-center justify-center text-xs font-bold rounded-xl transition-all', page === currentPage ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20 scale-110' : 'hover:bg-white dark:hover:bg-slate-800 text-slate-500 border border-transparent hover:border-slate-200']">
            {{ page }}
          </button>

          <button @click="nextPage" :disabled="currentPage === totalPages" class="p-2 rounded-xl hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 disabled:opacity-30 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Spinner Loading -->
    <Teleport to="body">
       <div v-if="isLoading" class="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/5 backdrop-blur-[2px]">
          <div class="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
       </div>
    </Teleport>

    <ToastMessage ref="toastRef" :typeToast="currentToastType" :message="toastMessage" :show="showToast" :width="`w-2/3 lg:w-fit`" class="z-40" />
  </div>
</template>

<script setup>
const informationStore = useInformationStore();
const toastRef = ref(null);
const showToast = ref(false);
const currentToastType = ref("");
const toastMessage = ref("");

const showMessageToast = (type, message) => {
  currentToastType.value = type;
  toastMessage.value = message;
  showToast.value = true;
  if (toastRef.value) toastRef.value.show();
};

const currentPage = ref(1)
const pageSize = ref(10)
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
const newsData = ref([])
const isLoading = ref(false)

const openEditDrawer = () => {
  informationStore.setInformation(null);
  informationStore.setIsOpen(true);
};

const openUpdateDrawer = (item) => {
    informationStore.setInformation(item);
    informationStore.setIsOpen(true);
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

const refreshNews = () => {
  currentPage.value = 1
  fetchDataNews()
}

const fetchDataNews = async () => {
  isLoading.value = true;
  try {
    const response = await $fetch(`${config.public.apiBase}/newandevents/list`, {
      method: 'POST',
      body: {
        skip: (currentPage.value - 1) * pageSize.value,
        take: pageSize.value,
        requiresCounts: true,
        sorted: [{ name: 'createdAt', direction: 'descending' }]
      }
    });
    newsData.value = response.result || []
    totalRecords.value = response.count || 0
  } catch (error) {
    console.error('Error fetching news:', error);
    newsData.value = [];
  } finally {
    isLoading.value = false;
  }
}

const deleteNews = async (_id) => {
  if (!confirm('Are you sure you want to delete this news?')) return;
  isLoading.value = true;
  try {
    await $fetch(`${config.public.apiBase}/newandevents/delete`, {
      method: 'DELETE',
      body: { _id }
    });
    fetchDataNews();
    showMessageToast('success', 'Deleted successfully');
  } catch (error) {
    showMessageToast('error', 'Delete failed');
  } finally {
    isLoading.value = false;
  }
}

const statusUpdate = async (_id, status) => {
  isLoading.value = true;
  try {
    await $fetch(`${config.public.apiBase}/newandevents/update-status`, {
      method: 'POST',
      body: { _id, status }
    });
    fetchDataNews();
    showMessageToast('success', 'Status updated');
  } catch (error) {
    showMessageToast('error', 'Update failed');
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchDataNews();
})
</script>