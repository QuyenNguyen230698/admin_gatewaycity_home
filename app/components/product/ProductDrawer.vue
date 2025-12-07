<template>
    <div class="drawer drawer-end z-50">
        <input id="productGrid" type="checkbox" class="drawer-toggle" />
        <div class="drawer-side">
            <label for="productGrid" aria-label="close sidebar" class="drawer-overlay"></label>
            <div class="relative flex flex-col bg-base-200 text-base-content min-h-screen w-2/3 h-full ">
                <div v-if="isLoading" class="flex justify-center items-center h-full w-full absolute inset-0 z-50 bg-black/50">
                    <span class="loading loading-spinner loading-lg text-white"></span>
                </div>
                <!-- header -->
                <header class="sticky top-0 bg-white navbar flex items-center justify-between py-2 px-6">
                    <label for="productGrid" class="btn btn-lg btn-circle btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </label>

                    <h2 class="font-bold text-xl uppercase text-blue-500">Products Update</h2>

                    <div class="flex gap-3">

                        <!-- EDIT MODE OFF → SHOW EDIT BUTTON -->
                        <button 
                            v-if="!isEditMode"
                            @click="startEdit"
                            class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md">
                            Edit
                        </button>

                        <!-- EDIT MODE ON → SHOW SAVE + CANCEL -->
                        <template v-else>
                            <button 
                                @click="saveEdit"
                                class="px-4 py-2 bg-green-600 text-white rounded-md">Save</button>

                            <button 
                                @click="cancelEdit"
                                class="px-4 py-2 bg-gray-400 text-white rounded-md">Cancel</button>
                        </template>

                    </div>
                </header>

                <!-- Tab  -->
                <div class="flex gap-3 px-6 py-3 border-b border-base-200 bg-base-100">
                <button 
                    v-for="tab in ['features','images','blueprint','floor1','floor2','floor3']"
                    :key="tab"
                    @click="activeTab = tab"
                    class="btn btn-sm"
                    :class="activeTab === tab ? 'btn-primary text-white' : 'btn-ghost'"
                >
                    {{ tab }}
                </button>
                </div>

                <!-- main -->
                 <main class="flex-1 h-full overflow-y-auto bg-base-100 p-6">

                <!-- ⭐ FEATURES (ARRAY) -->
                <div v-if="activeTab === 'features'" class="p-6 space-y-4">
                <div v-for="(item, index) in productStore.getProduct?.features" 
                    :key="index" 
                    class="border p-4 rounded-md space-y-2"
                >
                    <div v-if="!isEditMode" class="flex gap-3">
                        <p class="font-semibold">{{ item.title }}</p>
                        <p>{{ item.des }}</p>
                    </div>

                    <div v-else class="flex gap-3">
                        <input 
                        v-model="item.title"
                        class="input input-bordered w-full"
                        placeholder="Title"
                        />
                        <input 
                        v-model="item.des"
                        class="input input-bordered w-full"
                        placeholder="Description"
                        />
                    </div>
                </div>
                </div>

                <!-- ⭐ IMAGE FEATURES (ARRAY) -->
                <div v-if="activeTab === 'images'" class="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="(img, idx) in productStore.getProduct.images" :key="idx">
                    <NuxtImg :src="img" class="rounded shadow" />

                    <!-- Edit -->
                    <input 
                    v-if="isEditMode"
                    v-model="productStore.getProduct.images[idx]"
                    class="input input-bordered w-full mt-2"
                    />
                </div>
                </div>

                <!-- ⭐ BLUEPRINT (ARRAY) -->
                <div v-if="activeTab === 'blueprint'" class="p-6 space-y-6">
                <div 
                    v-for="(item, index) in productStore.getProduct.blueprint"
                    :key="index"
                    class="border p-4 rounded-md"
                >

                    <!-- VIEW -->
                    <template v-if="!isEditMode">
                    <p class="font-semibold mb-2">{{ item.name }}</p>
                    <NuxtImg :src="item.image" class="w-full rounded" />
                    </template>

                    <!-- EDIT -->
                    <template v-else>
                    <input 
                        v-model="item.name"
                        class="input input-bordered w-full mb-2"
                        placeholder="Name"
                    />
                    <input 
                        v-model="item.image"
                        class="input input-bordered w-full"
                        placeholder="Image URL"
                    />
                    </template>

                </div>
                </div>

                <!-- ⭐ FLOOR1 / FLOOR2 / FLOOR3 (OBJECT) -->
                <div v-if="['floor1','floor2','floor3'].includes(activeTab)"
                class="p-6 space-y-6"
                >
                <div class="border p-4 rounded-md">

                    <label class="font-semibold">Name</label>
                    <div v-if="!isEditMode">{{ productStore.getProduct[activeTab].name }}</div>
                    <input 
                    v-else
                    v-model="productStore.getProduct[activeTab].name"
                    class="input input-bordered w-full"
                    />

                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div 
                        v-for="(img, idx) in productStore.getProduct[activeTab].image"
                        :key="idx"
                    >
                        <NuxtImg :src="img" class="rounded shadow" />

                        <input 
                        v-if="isEditMode"
                        v-model="productStore.getProduct[activeTab].image[idx]"
                        class="input input-bordered w-full mt-2"
                        />
                    </div>
                    </div>

                </div>
                </div>

                </main>

                <main class="flex-1 overflow-y-auto bg-base-100">
                <!-- Nếu không có dữ liệu -->
                <!-- <div v-if="!Array.isArray(imagesData) || imagesData.length === 0" class="text-center py-12 text-gray-500">
                Chưa có ảnh nào.
                </div> -->
                </main>
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
    <!-- <dialog ref="formShowHides" class="modal items-center h-auto bg-transparent">
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
    </dialog> -->
</template>

<script setup>
const productStore = useProductStore();
const isLoading = ref(false);

//#region Toast
const toastRef = ref(null);
const toastImageRef = ref(null);
const showToast = ref(false);
const showToastImage = ref(false);
const currentToastType = ref("");
const toastMessage = ref("");
const toastImageUrl = ref("");

const showMessageToast = (type, message, url = "") => {
  currentToastType.value = type;
  toastMessage.value = message;
  showToast.value = !url;
  showToastImage.value = !!url;
  toastImageUrl.value = url;

  if (url && toastImageRef.value) toastImageRef.value.show();
  else if (toastRef.value) toastRef.value.show();
};
//#endregion

// ⭐ FORM DATA – dữ liệu dùng để edit
const formProducts = ref({});

// ⭐ WATCH productStore.getProduct → khi có dữ liệu mới thì gán vào formProducts
watch(
  () => productStore.product,
  (newVal) => {
    if (newVal) {
      formProducts.value = productStore.product;
    }
  },
  { immediate: true } // load ngay lần đầu (nếu store đã có dữ liệu)
);

const isEditMode = ref(false);
const activeTab = ref("features");

// Nút bắt đầu edit
const startEdit = () => {
    isEditMode.value = true;
};

// Cancel edit → phục hồi store
const cancelEdit = () => {
  isEditMode.value = false;
};

// Lưu edit
const saveEdit = () => {
  isLoading.value = true;
  try {
    console.log(formProducts.value);
    showMessageToast("success", "Updated successfully");
    isEditMode.value = false;
  } catch (e) {
    showMessageToast("error", "Save failed");
  } finally {
    isLoading.value = false;
  }
};

const resetForm = () => {
  
};
</script>


<style lang="scss" scoped>

</style>