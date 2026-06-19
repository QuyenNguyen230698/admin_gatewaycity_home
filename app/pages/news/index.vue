<template>
  <div class="h-full flex flex-col">

    <!-- Sticky Header -->
    <div class="px-8 py-6 border-b border-zinc-200 dark:border-zinc-800
                flex items-center justify-between shrink-0
                bg-white dark:bg-slate-900 sticky top-0 z-10">
      <div>
        <h1 class="text-2xl font-bold text-zinc-900 dark:text-white">News & Media</h1>
        <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Create and manage your articles and events</p>
      </div>
      <button @click="openEditDrawer"
        class="bg-black dark:bg-white text-white dark:text-black
               px-4 py-2 rounded-lg font-medium text-sm
               hover:opacity-80 transition-opacity flex items-center gap-2 shadow-lg">
        <i class="bi bi-plus-lg"></i> Create News
      </button>
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
          placeholder="Search articles..." />
      </div>
      <div class="flex items-center gap-3">
        <select v-model="statusFilter"
          class="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700
                 rounded-lg px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300
                 outline-none focus:ring-2 focus:ring-zinc-500">
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="drafted">Draft</option>
        </select>
        <button @click="refreshNews"
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
        <p>Loading articles...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="!filteredNews.length"
        class="flex flex-col items-center justify-center h-64 text-zinc-400
               border-2 border-dashed border-zinc-200 dark:border-zinc-800
               rounded-xl bg-zinc-50/50 dark:bg-zinc-800/30">
        <div class="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
          <i class="bi bi-inbox text-2xl"></i>
        </div>
        <h3 class="text-zinc-900 dark:text-white font-medium mb-1">No articles found</h3>
        <p class="text-sm">Get started by creating your first news post or event update.</p>
        <button @click="openEditDrawer"
          class="mt-4 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity">
          Create Now
        </button>
      </div>

      <!-- Table -->
      <div v-else class="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-700">
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Banner</th>
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Title</th>
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Type</th>
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Created At</th>
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100 dark:divide-zinc-700">
            <tr v-for="item in filteredNews" :key="item._id"
              class="group hover:bg-zinc-50 dark:hover:bg-zinc-700/30 transition-colors">
              <td class="px-6 py-4">
                <div class="w-24 h-16 rounded-lg overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-700 bg-zinc-100">
                  <img :src="item.src" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="max-w-xs">
                  <div class="text-sm font-semibold text-zinc-900 dark:text-white truncate">{{ item.title }}</div>
                  <div class="text-xs text-zinc-500 truncate mt-0.5">{{ item.description }}</div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border"
                  :class="item.status === 'published'
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : item.status === 'drafted'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-zinc-100 text-zinc-700 border-zinc-200'">
                  <span class="w-1.5 h-1.5 rounded-full"
                    :class="item.status === 'published' ? 'bg-green-500' : item.status === 'drafted' ? 'bg-amber-500' : 'bg-zinc-400'"></span>
                  {{ item.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  {{ item.type }}
                </span>
              </td>
              <td class="px-6 py-4 text-xs text-zinc-400 font-mono">{{ formatDate(item.createdAt) }}</td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click="openUpdateDrawer(item)"
                    class="w-8 h-8 flex items-center justify-center rounded-lg
                           hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                    <i class="bi bi-pencil text-sm"></i>
                  </button>
                  <button @click="statusUpdate(item._id, item.status === 'published' ? 'drafted' : 'published')"
                    class="w-8 h-8 flex items-center justify-center rounded-lg
                           hover:bg-green-50 dark:hover:bg-green-900/20 text-zinc-500 hover:text-green-600 transition-colors"
                    :title="item.status === 'published' ? 'Set to Draft' : 'Publish'">
                    <i :class="item.status === 'published' ? 'bi bi-pause-circle text-sm' : 'bi bi-check-circle text-sm'"></i>
                  </button>
                  <button @click="deleteNews(item._id)"
                    class="w-8 h-8 flex items-center justify-center rounded-lg
                           hover:bg-red-50 dark:hover:bg-red-900/20 text-zinc-500 hover:text-red-600 transition-colors">
                    <i class="bi bi-trash text-sm"></i>
                  </button>
                </div>
              </td>
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

    <!-- Modals -->
    <UIConfirmModal
      v-model="showDeleteConfirm"
      title="Delete News"
      message="Are you sure you want to delete this news article? This action cannot be undone."
      type="danger"
      @confirm="handleConfirmDelete"
    />
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })

const informationStore = useInformationStore();
const config = useRuntimeConfig();

const showDeleteConfirm = ref(false)
const idToDelete = ref(null)
const searchQuery = ref('')
const statusFilter = ref('')
const newsData = ref([])
const isLoading = ref(false)

const currentPage = ref(1)
const pageSize = ref(10)
const totalRecords = ref(0)
const totalPages = computed(() => Math.ceil(totalRecords.value / pageSize.value))

const filteredNews = computed(() => {
  let data = newsData.value
  if (searchQuery.value) {
    data = data.filter(n =>
      n.title?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      n.description?.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  if (statusFilter.value) {
    data = data.filter(n => n.status === statusFilter.value)
  }
  return data
})

const nextPage = () => { if (currentPage.value < totalPages.value) { currentPage.value++; fetchDataNews() } }
const prevPage = () => { if (currentPage.value > 1) { currentPage.value--; fetchDataNews() } }

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

const deleteNews = (_id) => {
  idToDelete.value = _id
  showDeleteConfirm.value = true
}

const handleConfirmDelete = async () => {
  if (!idToDelete.value) return
  showDeleteConfirm.value = false
  isLoading.value = true;
  try {
    await $fetch(`${config.public.apiBase}/newandevents/delete`, {
      method: 'POST',
      body: { _id: idToDelete.value }
    });
    fetchDataNews();
    toast.success('Xóa bài viết thành công!');
  } catch (error) {
    toast.error('Lỗi khi xóa bài viết.');
  } finally {
    isLoading.value = false;
    idToDelete.value = null
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
    toast.success('Đã cập nhật trạng thái');
  } catch (error) {
    toast.error('Cập nhật trạng thái thất bại');
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchDataNews();
})
</script>