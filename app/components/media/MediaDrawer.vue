<template>
    <div class="drawer drawer-end z-50">
        <input id="media_library" type="checkbox" class="drawer-toggle" />
        <div class="drawer-side">
            <label for="media_library" aria-label="close sidebar" class="drawer-overlay"></label>
            <div class="relative flex flex-col bg-base-200 text-base-content min-h-screen w-2/3 h-full ">
                <div v-if="isLoading" class="flex justify-center items-center h-full w-full absolute inset-0 z-50 bg-black/50">
                    <span class="loading loading-spinner loading-lg text-white"></span>
                </div>
                <!-- header -->
                <header class="sticky top-0 bg-white flex items-center justify-between py-2 px-6 overflow-hidden">
                    <h2 class="font-bold text-xl uppercase text-blue-500">Media Library</h2>
                    <label  for="media_library" class="btn btn-lg btn-circle btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </label>
                </header>
                <!-- Button  -->
                <div class="flex items-center gap-4 px-6 py-2 border-b border-base-200">
                    <div @click="actionCreateimages" class="cursor-pointer flex gap-2 btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                           <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        <span>Upload Images</span>
                    </div>
                    <div @click="refreshImages" class="cursor-pointer flex gap-2 btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                        <span>Refresh</span>
                    </div>
                </div>
                <!-- main -->
                <main class="flex-1 overflow-y-auto bg-base-100">
                    <table class="table table-zebra w-full">
                    <thead>
                        <tr class="bg-white text-left text-xs uppercase">
                        <th class="w-20 text-center border-r">Action</th>
                        <th class="w-72 border-r">Image</th>
                        <th class="w-72 border-r">Name</th>
                        <th class="w-72">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in imagesData" :key="item._id" class="hover:bg-base-200 transition">
                        <!-- Cột 1: Dropdown 3 chấm -->
                        <td class="text-center">
                            <div class="dropdown dropdown-bottom dropdown-start">
                            <label tabindex="0" class="btn btn-ghost btn-md">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </label>
                            <div class="flex flex-col dropdown-content menu z-20 w-24 bg-base-300 p-1 shadow rounded">
                                <button @click="deleteSingleImage(item.public_id)" class="hover:bg-stone-300 cursor-pointer py-1 px-3">Delete</button>
                            </div>
                            </div>
                        </td>

                        <!-- Cột 2: Hình ảnh (200px)-->
                        <td>
                            <div class="relative group overflow-hidden w-52 h-full bg-gray-300 m-2 rounded px-3 flex flex-col">
                                <div class="h-20 overflow-hidden rounded-lg p-2">
                                <div class="w-full h-full flex items-center justify-center p-1">
                                    <img 
                                    :src="item.secure_url" 
                                    :alt="item.display_name" 
                                    class="h-16 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                </div>
                                <div class="flex justify-center gap-2 mb-1">
                                    <button
                                    @click="viewImage(item.secure_url)"
                                    class="text-gray-700 hover:text-blue-500 w-8 h-8 rounded-full shadow-lg flex justify-center items-center"
                                    style="background-color: #ffffff;"
                                    title="View Image"
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    </button>
                                    <button
                                    @click="copyImageUrl(item.secure_url)"
                                    class="text-gray-700 hover:text-green-500 w-8 h-8 rounded-full shadow-lg flex justify-center items-center"
                                    style="background-color: #ffffff;"
                                    title="Copy Link"
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                                    </svg>
                                    </button>
                                </div>
                            </div>
                        </td>

                        <!-- Cột 3: Name -->
                        <td class="text-xs max-w-xs truncate">{{ item.display_name }}</td>

                        <!-- Cột 4: Created At -->
                        <td class="text-xs text-nowrap">
                            {{ formatDate(item.createdAt) }}
                        </td>
                        </tr>
                    </tbody>
                    </table>
                <!-- Nếu không có dữ liệu -->
                <div v-if="!Array.isArray(imagesData) || imagesData.length === 0" class="text-center py-12 text-gray-500">
                Chưa có ảnh nào.
                </div>
                </main>
                <!-- Pagination -->
                <div
                  v-if="totalPages > 1"
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
                    images
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

                <ToastMessage
                ref="toastRef"
                :typeToast="currentToastType"
                :message="toastMessage"
                :show="showToast"
                :width="`w-2/3 lg:w-fit`"
                class="z-40"
                />
            </div>
        </div>
    </div>
    <dialog ref="formShowHides" class="modal items-center h-auto bg-transparent">
        <div class="modal-box relative max-w-2xl w-full p-6 bg-white rounded-xl shadow-2xl">
        <button
            @click="closeModal"
            class="absolute right-4 top-4 text-black hover:text-black transition-colors"
        >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <section class="flex flex-col gap-6">
            <h2 class="text-2xl font-semibold text-black text-center">Upload Images</h2>

            <div
            class="relative w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 transition-all duration-300 hover:border-blue-400"
            >
            <input
                id="dropzone-file"
                type="file"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/svg+xml,image/png,image/jpeg,image/gif"
                multiple
                @change="handleFileSelectionDialog"
            />

            <div
                v-if="selectedFilesDialog.length === 0"
                class="flex flex-col items-center justify-center h-full text-slate-50"
            >
                <svg class="w-10 h-10 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
                </svg>
                <p class="text-sm font-medium">
                Drag & drop your images here or <span class="text-blue-500 hover:underline">click to upload</span>
                </p>
                <p class="text-xs mt-1">Supported formats: SVG, PNG, JPG, GIF (Max 10 images, under 10MB/image)</p>
            </div>

            <div v-else class="relative w-full h-full overflow-y-auto">
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
                <div v-for="(file, index) in selectedFilesDialog" :key="index" class="relative">
                    <NuxtImg
                    v-if="getImageUrl(file)"
                    :src="getImageUrl(file)"
                    class="w-full h-32 object-cover ring-2 ring-gray-200 rounded-lg"
                    alt="Image Preview"
                    />
                    <button
                    @click="removeImageDialog(index)"
                    class="absolute top-1 right-1 p-0 btn btn-sm btn-circle bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200"
                    title="Remove Image"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    </button>
                </div>
                </div>
            </div>
            </div>

            <div class="flex justify-center">
            <button
                :disabled="disabledBtnSubmit || selectedFilesDialog.length === 0"
                @click="submitForm"
                class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                <span v-if="disabledBtnSubmit" class="flex items-center justify-center gap-2">
                <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"></path>
                </svg>
                Uploading...
                </span>
                <span v-else>Upload Images</span>
            </button>
            </div>
        </section>
        </div>
    </dialog>
</template>

<script setup>
//#region Toast
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
//#endregion

const isLoading = ref(true);
const config = useRuntimeConfig();
const formShowHides = ref(null);
const disabledBtnSubmit = ref(false);
const selectedFilesDialog = ref([]);
const isClient = process.client;
const imagesData = ref([])
//#region Pagination state
const currentPage = ref(1)
const pageSize = ref(10) // số item / trang
const totalRecords = ref(0)
const totalPages = computed(() =>
  Math.ceil(totalRecords.value / pageSize.value)
)

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  fetchDataImage()
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchDataImage()
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchDataImage()
  }
}
const visiblePages = computed(() => {
  const range = 2
  let start = Math.max(1, currentPage.value - range)
  let end = Math.min(totalPages.value, currentPage.value + range)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

//#endregion

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

const openModal = () => {
  formShowHides.value.showModal();
};

const closeModal = () => {
  formShowHides.value.close();
  selectedFilesDialog.value = [];
};

const actionCreateimages = () => {
  openModal();
};

const getImageUrl = (file) => {
  if (isClient && file && file instanceof File && typeof URL !== "undefined" && URL.createObjectURL) {
    return URL.createObjectURL(file);
  }
  return "";
};

const handleFileSelectionDialog = async (event) => {
  const files = Array.from(event.target.files).filter((file) => file instanceof File);
  if (files.length + selectedFilesDialog.value.length > 10) {
    showMessageToast("error", "You can upload a maximum of 10 images.");
    event.target.value = "";
    return;
  }
  files.forEach((file) => {
    if (file.size > 10 * 1024 * 1024) {
      showMessageToast("error", `File ${file.name} exceeds 10MB limit.`);
      return;
    }
    if (!selectedFilesDialog.value.some((f) => f.name === file.name)) {
      selectedFilesDialog.value.push(file);
    }
  });
  event.target.value = "";
};

const removeImageDialog = (index) => {
  selectedFilesDialog.value.splice(index, 1);
};

const viewImage = (url) => {
      if (!url) {
        showMessageToast("error", "URL Image Not Existed!")
        return;
      }
    window.open(url, '_blank');
}

const copyImageUrl = (url) => {
      if (!url) {
        showMessageToast("error", "URL Image Not Existed!")
        return;
      }
      navigator.clipboard.writeText(url).then(() => {
        showMessageToast("success", "URL Image Copied!");
      }).catch(err => {
        showMessageToast("error", "Failed to copy URL Image!");
        console.error("Failed to copy: ", err);
      });
}

const fetchDataImage = async () => {
  isLoading.value = true

  try {
    const response = await $fetch(`${config.public.apiBase}/cloudinary/list`, {
      method: 'POST',
      body: {
        skip: (currentPage.value - 1) * pageSize.value,
        take: pageSize.value,
        requiresCounts: true,
        sorted: [
          { name: 'createdAt', direction: 'descending' }
        ]
      }
    })

    imagesData.value = response.result || []
    totalRecords.value = response.count || 0

  } catch (error) {
    console.error('Error fetching images:', error)
    imagesData.value = []
  } finally {
    isLoading.value = false
  }
}

const refreshImages = () => {
  currentPage.value = 1
  fetchDataImage()
}


const submitForm = async () => {
  if (!selectedFilesDialog.value || selectedFilesDialog.value.length === 0) {
    showMessageToast("error", "Vui lòng chọn ít nhất một hình ảnh.");
    return;
  }

  disabledBtnSubmit.value = true;

  // Tạo FormData chứa tất cả file
  const formData = new FormData();
  
  selectedFilesDialog.value.forEach((file, index) => {
    formData.append("images", file); // "images" là tên field, multer sẽ nhận mảng
  });

  // Có thể thêm metadata nếu cần
  formData.append("folder", "Media Gateway City");
  formData.append("metadata", JSON.stringify({ type: "images" }));

  try {
    const response = await $fetch(`${config.public.apiBase}/cloudinary/upload`, {
      method: "POST",
      body: formData,
    });

    closeModal();
    showMessageToast("success", `Đã tải lên thành công ${response.data.length} hình ảnh!`);
    fetchDataImage();

  } catch (error) {
    console.error("Upload failed:", error);
    showMessageToast("error", "Tải lên thất bại. Vui lòng thử lại.");
  } finally {
    disabledBtnSubmit.value = false;
    selectedFilesDialog.value = [];
  }
};

const deleteSingleImage = async (public_id) => {
    isLoading.value = true;
  try {
    const response = await $fetch(`${config.public.apiBase}/cloudinary/delete`, {
      method: "DELETE",
      body: JSON.stringify({ public_id }),
    });
    if (imagesData.value.length === 1 && currentPage.value > 1) {
      currentPage.value--
    }
    showMessageToast("success", "Xóa hình ảnh thành công!");
    fetchDataImage();
  } catch (error) {
    console.error("Delete failed:", error);
    showMessageToast("error", "Xóa hình ảnh thất bại. Vui lòng thử lại.");
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchDataImage();
})

</script>

<style lang="scss" scoped>
.drawer-overlay {
    cursor: default !important;
}
</style>