<template>
  <div class="overflow-x-auto bg-base-100 h-full relative">
    <div v-if="isLoading" class="flex justify-center items-center h-full w-full absolute inset-0 z-50 bg-black/50">
        <span class="loading loading-spinner loading-lg text-white"></span>
    </div>
    <div class="flex items-center gap-4 px-6 py-2 border-b border-base-200">
      <div @click="openEditDrawer" class="cursor-pointer flex gap-2 btn btn-ghost hidden">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <span>Create News</span>
      </div>
      <div @click="refreshData" class="cursor-pointer flex gap-2 btn btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        <span>Refresh</span>
      </div>
    </div>

    <table class="table table-zebra w-full">
      <thead>
        <tr class="bg-base-200 text-left text-xs uppercase">
          <th class="w-20 text-center border-r">Action</th>
          <th class="w-72 border-r">First Name</th>
          <th class="w-72 border-r">Last Name</th>
          <th class="w-72 border-r">Email</th>
          <th class="w-72 border-r">Phone</th>
          <th class="w-72 border-r">Note</th>
          <th class="w-72">Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in guestData" :key="item._id" class="hover:bg-base-200 transition h-10">
          <!-- Cột 1: Dropdown 3 chấm -->
          <td class="text-center">
            <div class="dropdown dropdown-bottom dropdown-start hidden">
              <label tabindex="0" class="btn btn-ghost btn-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </label>
              <div class="flex flex-col dropdown-content menu z-20 w-24 bg-base-300 p-1 shadow rounded">
                <button @click="statusUpdate(item._id, 'drafted')" class="hover:bg-stone-300  py-0.5 px-3">Draft</button>
              </div>
            </div>
          </td>
          
          <td class="text-xs max-w-xs truncate">{{ item.firstName }}</td>
          <td class="text-xs max-w-xs truncate">{{ item.lastName }}</td>
          <td class="text-xs max-w-xs truncate">{{ item.email }}</td>
          <td class="text-xs max-w-xs truncate">{{ item.phoneNumber }}</td>
          <td class="text-xs max-w-xs truncate">{{ item.note }}</td>

          <td class="text-xs text-nowrap">
            {{ formatDate(item.createdAt) }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Nếu không có dữ liệu -->
    <div v-if="!Array.isArray(guestData) || guestData.length === 0" class="text-center py-12 text-gray-500">
      Chưa có tin tức nào.
    </div>
     <!-- Pagination -->
     <div v-if="totalPages > 0"
                  class="sticky bottom-0 bg-base-100 border-t border-base-300 px-6 py-3 flex items-center justify-between"
                >
                  <!-- Info -->
                  <div class="text-sm text-gray-500">
                    Showing
                    <span class="font-medium">
                      {{ (currentPage - 1) * pageSize + 1 }}
                    </span>
                    -
                    <span class="font-medium">
                      {{ Math.min(currentPage * pageSize, totalRecords) }}
                    </span>
                    of
                    <span class="font-medium">{{ totalRecords }}</span>
                    Data Guest
                  </div>

                  <!-- Controls -->
                  <div class="flex gap-1">
                    <button
                      class="btn btn-xs btn-ghost"
                      :disabled="currentPage === 1"
                      @click="prevPage"
                    >
                      «
                    </button>

                    <div
                      v-for="page in visiblePages"
                      :key="page"
                      class="btn btn-xs btn-ghost"
                      :class="page === currentPage ? 'font-bold btn btn-xs btn-ghost' : ''"
                      @click="goToPage(page)"
                    >
                      {{ page }}
                    </div>

                    <button
                      class="btn btn-xs btn-ghost"
                      :disabled="currentPage === totalPages"
                      @click="nextPage"
                    >
                      »
                    </button>
                  </div>
     </div>
  </div>
      <ToastMessage
      ref="toastRef"
      :typeToast="currentToastType"
      :message="toastMessage"
      :show="showToast"
      :width="`w-2/3 lg:w-fit`"
      class="z-40"
    />
</template>

<script setup>

  // Toast
const toastRef = ref(null);
const toastImageRef = ref(null); // Thêm ref cho ToastImage
const showToast = ref(false);
const showToastImage = ref(false); // Thêm biến để điều khiển hiển thị của ToastImage
const currentToastType = ref("");
const toastMessage = ref("");
const toastImageUrl = ref(""); // Thêm biến để lưu URL cho ToastImage
const showMessageToast = (type, message, url = "") => {
  currentToastType.value = type;
  toastMessage.value = message;
  showToast.value = !url; // Chỉ hiển thị Toast nếu không có URL
  showToastImage.value = !!url; // Hiển thị ToastImage nếu có URL
  toastImageUrl.value = url; // Gán URL cho ToastImage

  if (url !== "") {
    if (toastImageRef.value) {
      // Hiển thị ToastImage khi showMessageToast được gọi
      toastImageRef.value.show();
    }
  } else {
    if (toastRef.value) {
      toastRef.value.show();
    }
  }
};

//#region Pagination state
const currentPage = ref(1)
const pageSize = ref(12) // số item / trang
const totalRecords = ref(0)
const totalPages = computed(() =>
  Math.ceil(totalRecords.value / pageSize.value)
)

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
const visiblePages = computed(() => {
  const range = 2
  let start = Math.max(1, currentPage.value - range)
  let end = Math.min(totalPages.value, currentPage.value + range)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

//#endregion

const config = useRuntimeConfig();
const guestData = ref([])
const isLoading = ref(false)

// Format ngày đẹp
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
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
        sorted: [
          { name: 'createdAt', direction: 'descending' }
        ]
      }
    });

    guestData.value = Array.isArray(response.result) 
      ? response.result
      : (response.result && Array.isArray(response.result.items) ? response.result.items : []);

    guestData.value = response.result || []
    totalRecords.value = response.count || 0
  } catch (error) {
    console.error('Error fetching news:', error);
    guestData.value = [];
  } finally {
    isLoading.value = false;
  }
}

onMounted( async () => {
  await fetchDataNews();
})

</script>

<style scoped>
.dropdown .dropdown-content {
  pointer-events: none;
}

.dropdown.dropdown-open .dropdown-content,
.dropdown:focus-within .dropdown-content {
  pointer-events: auto;
}
</style>