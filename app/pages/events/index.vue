<template>
  <div class="overflow-x-auto bg-base-100 h-full">
    <div class="flex items-center px-6 py-2 border-b border-base-200">
      <button @click="openEditDrawer" class="btn text-xs">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <span>Add News</span>
      </button>
    </div>

    <table class="table table-zebra w-full">
      <thead>
        <tr class="bg-base-200 text-left text-xs uppercase">
          <th class="w-20 text-center">Action</th>
          <th class="w-72">Banner</th>
          <th class="w-72">Title</th>
          <th class="w-72">Description</th>
          <th class="w-36 text-center">Status</th>
          <th class="w-36 text-center">Type</th>
          <th class="w-72">Slug</th>
          <th class="w-72">Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in newsData.reverse()" :key="item._id" class="hover:bg-base-200 transition">
          <!-- Cột 1: Dropdown 3 chấm -->
          <td class="text-center">
            <div class="dropdown dropdown-bottom dropdown-start">
              <label tabindex="0" class="btn btn-ghost btn-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </label>
              <div class="flex flex-col dropdown-content menu z-20 w-24 bg-base-300 p-1 shadow rounded">
                <button class="hover:bg-stone-300 cursor-pointer py-1 px-3">Update</button>
                <button class="hover:bg-stone-300 cursor-pointer py-1 px-3">Draft</button>
                <button class="hover:bg-stone-300 cursor-pointer py-1 px-3">Delete</button>
              </div>
            </div>
          </td>

          <!-- Cột 2: Hình ảnh (200px) -->
          <td>
            <div class="w-52 overflow-hidden">
              <img :src="item.src" :alt="item.title" class="object-cover w-full h-28" />
            </div>
          </td>

          <!-- Cột 3: Title -->
          <td class="text-xs max-w-xs truncate">{{ item.title }}</td>

          <!-- Cột 4: Description -->
          <td class="text-xs text-base-content/80 truncate max-w-xs">{{ item.description }}</td>

          <!-- Cột 5: Status -->
          <td class="text-center">
            <div class="badge badge-xs" :class="{
              'badge-success': item.status === 'published',
              'badge-warning': item.status === 'drafted',
              'badge-error': item.status === 'archived'
            }">
              {{ item.status.toUpperCase() }}
            </div>
          </td>

          <!-- Cột 6: Type -->
          <td class="text-center">
            <div class="badge badge-outline badge-info badge-xs">
              {{ item.type }}
            </div>
          </td>

          <!-- Cột 7: Slug -->
          <td class="font-mono text-xs text-base-content/70 break-all max-w-xs truncate">
            {{ item.slug }}
          </td>

          <!-- Cột 8: Created At -->
          <td class="text-xs text-nowrap">
            {{ formatDate(item.createdAt) }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Nếu không có dữ liệu -->
    <div v-if="newsData.length === 0" class="text-center py-12 text-gray-500">
      Chưa có tin tức nào.
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
const eventStore = useEventStore();
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

const newsData = ref([
  {
    _id: '68abd3e98587e969d74a1bbe',
    slug: "su-kien-khoi-cong-trung-tam-thuong-mai-nghin-ti-tai-gateway-city-2",
    src: 'https://res.cloudinary.com/dgkceewlq/image/upload/v1734690254/samples/landscapes/girl-urban-view.jpg',
    type: 'EVENTS',
    status: 'archived',
    createdAt: '2025-08-25T03:09:29.943Z',
    content: '',
    title: 'SỰ KIỆN – KHỞI CÔNG TRUNG TÂM THƯƠNG MẠI “NGHÌN TỈ” TẠI GATEWAY CITY 2',
    description: 'Ngày 2/8/2025, tại khu đô thị Gateway City Vĩnh Long đã diễn ra lễ khởi công Trung tâm Thương mại SenseFesti với tổng vốn đầu tư gần 1.000 tỉ đồng, do Saigon Co.op (SCID) kết hợp cùng Tập đoàn Thành Đô phát triển. Đây sẽ là một trong những tổ hợp mua sắm – giải trí – ẩm thực hiện đại nhất miền Tây, đồng thời là tiện ích thương mại trọng điểm của Gateway City.'
  },
  {
    _id: '68abd3e98587e969d74a1bbe',
    slug: "su-kien-khoi-cong-trung-tam-thuong-mai-nghin-ti-tai-gateway-city",
    src: 'https://res.cloudinary.com/dgkceewlq/image/upload/v1734690255/samples/landscapes/beach-boat.jpg',
    type: 'EVENTS',
    status: 'published',
    createdAt: '2025-08-25T03:09:29.943Z',
    content: '',
    title: 'SỰ KIỆN – KHỞI CÔNG TRUNG TÂM THƯƠNG MẠI “NGHÌN TỈ” TẠI GATEWAY CITY',
    description: 'Ngày 2/8/2025, tại khu đô thị Gateway City Vĩnh Long đã diễn ra lễ khởi công Trung tâm Thương mại SenseFesti với tổng vốn đầu tư gần 1.000 tỉ đồng, do Saigon Co.op (SCID) kết hợp cùng Tập đoàn Thành Đô phát triển. Đây sẽ là một trong những tổ hợp mua sắm – giải trí – ẩm thực hiện đại nhất miền Tây, đồng thời là tiện ích thương mại trọng điểm của Gateway City.'
  },
])

const openEditDrawer = () => {
  console.log('openEditDrawer');
  eventStore.setInformation('dataNews');
  eventStore.setIsOpen(true);
};

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

// Xác nhận xóa (có thể mở modal)
const confirmDelete = (item) => {
  if (confirm(`Bạn có chắc chắn muốn xóa tin: "${item.title}"?`)) {
    // Xử lý xóa ở đây (gọi API)
    alert('Đã xóa: ' + item.title)
  }
}
</script>

<style scoped>

</style>