<template>
    <div class="drawer drawer-end z-50">
        <input id="productGrid" type="checkbox" class="drawer-toggle" />
        <div class="drawer-side">
            <label for="productGrid" aria-label="close sidebar" class="drawer-overlay"></label>
            <div class="relative flex flex-col bg-base-200 text-base-content min-h-screen w-full md:w-2/3 h-full ">
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

                    <h2 class="font-bold text-xl uppercase text-indigo-500">Products Update</h2>

                    <div class="flex gap-2">

                        <!-- EDIT MODE OFF → SHOW EDIT BUTTON -->
                        <div 
                            v-if="!isEditMode"
                            @click="startEdit"
                            class="flex items-center gap-2 px-4 py-1 bg-indigo-600 text-white hover:bg-indigo-700 rounded cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                            Edit
                        </div>

                        <!-- EDIT MODE ON → SHOW SAVE + CANCEL -->
                        <template v-else>
                            <div 
                                @click="saveEdit"
                                class="px-4 py-1 bg-green-600 text-white hover:bg-green-700 rounded cursor-pointer flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                </svg>
                                Save
                            </div>

                            <div 
                                @click="cancelEdit"
                                class="px-4 py-1 bg-gray-400 text-white hover:bg-gray-500 rounded cursor-pointer flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                Cancel
                            </div>
                        </template>

                    </div>
                </header>

                <!-- Tab  -->
                <div class="flex px-6 py-3 border-b bg-base-100 w-full overflow-x-auto scrollable">
                    <div v-for="tab in ['features','images','blueprint','floor1','floor2','floor3']"
                        :key="tab"
                        @click="activeTab = tab"
                        class="btn"
                        :class="activeTab === tab ? 'text-indigo-600' : 'btn-ghost'"
                    >
                        {{ tab }}
                    </div>
                </div>

                <!-- main -->
                 <main class="h-full overflow-y-auto bg-base-100 ">

                <!-- ⭐ FEATURES (ARRAY) -->
                <div v-if="activeTab === 'features'" class="p-6 space-y-2">
                <!-- Button Add -->
                <div 
                    v-if="isEditMode"
                    @click="addFeature()"
                    class="btn btn-ghost cursor-pointer"
                >
                    + Add Feature
                </div>

                <div 
                    v-for="(item, index) in productStore.getProduct?.features" 
                    :key="index" 
                    class="relative flex gap-2 w-full items-center"
                >

                    <!-- VIEW -->
                    <div v-if="!isEditMode" class="gap-2 w-full grid grid-cols-2">
                      <p class="font-semibold text-sm col-span-1 p-1 border rounded-md bg-gray-200">{{ item.title }}</p>
                      <p class="text-sm col-span-1 p-1 border rounded-md bg-gray-200">{{ item.des }}</p>
                    </div>

                    <!-- EDIT -->
                    <div v-else class="grid grid-cols-2 gap-2 w-full">
                      <input v-model="item.title" class="input text-sm input-bordered rounded-md col-span-1 w-full" placeholder="Title" />
                      <input v-model="item.des" class="input text-sm input-bordered rounded-md col-span-1 w-full" placeholder="Description" />
                    </div>

                                        <!-- Delete -->
                    <div 
                    v-if="isEditMode"
                    @click="removeFeature(index)"
                    class="btn btn-xs btn-error"
                    >✕</div>
                </div>
                </div>

                <!-- ⭐ IMAGE FEATURES (ARRAY) -->
                <div v-if="activeTab === 'images'" class="p-6 space-y-4">

                <div 
                    v-if="isEditMode"
                    @click="addImage()"
                    class="btn btn-ghost cursor-pointer"
                >+ Add Image</div>

                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div v-for="(img, idx) in productStore.getProduct.images" :key="idx" class="relative">

                    <!-- Delete -->
                    <div 
                        v-if="isEditMode"
                        @click="removeImage(idx)"
                        class="p-1 text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer rounded-full absolute top-2 right-2 z-10"
                    ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    </div>

                    <NuxtImg :src="img" class="rounded shadow w-full aspect-square object-cover" />

                    <input 
                        v-if="isEditMode"
                        v-model="productStore.getProduct.images[idx]"
                        class="input input-bordered w-full mt-2 text-sm"
                        placeholder="Image URL"
                    />
                    </div>
                </div>

                </div>

                <!-- ⭐ BLUEPRINT (ARRAY) -->
                <div v-if="activeTab === 'blueprint'" class="p-6 space-y-6">

                <div 
                    v-if="isEditMode"
                    @click="addBlueprint()"
                    class="btn btn-ghost cursor-pointer"
                >+ Add Blueprint</div>

                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div v-for="(item, index) in productStore.getProduct.blueprint"
                    :key="index"
                    class="border border-gray-400 shadow p-2 rounded-md space-y-2 relative"
                >
                    <!-- Delete -->
                    <button 
                    v-if="isEditMode"
                    @click="removeBlueprint(index)"
                    class="p-1 text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer rounded-full absolute top-2 right-2 z-10"
                    ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg></button>

                    <!-- VIEW -->
                    <template v-if="!isEditMode">
                    <p class="font-semibold text-sm mb-2">{{ item.name }}</p>
                    <NuxtImg :src="item.image" class="w-full rounded aspect-square object-cover" />
                    </template>

                    <!-- EDIT -->
                    <template v-else>
                    <input 
                        v-model="item.name"
                        class="input input-bordered border-gray-400 shadow text-sm w-full"
                        placeholder="Name"
                    />
                    <NuxtImg :src="item.image" class="w-full rounded aspect-square object-cover mt-2" />
                    <input 
                        v-model="item.image"
                        class="input input-bordered text-sm w-full mt-2"
                        placeholder="Image URL"
                    />
                    </template>
                </div>
                </div>
                </div>

                <!-- ⭐ FLOOR1 / FLOOR2 / FLOOR3 (OBJECT) -->
                <div v-if="['floor1','floor2','floor3','floor4'].includes(activeTab)" class="p-6 space-y-6">
                <div class="border p-4 rounded-md space-y-4">

                    <!-- Name -->
                    <div>
                    <label class="font-semibold">Name</label>
                    <div v-if="!isEditMode" class="text-sm p-1 border rounded-md bg-gray-200">{{ productStore.getProduct[activeTab].name }}</div>
                    
                    <input 
                        v-else
                        v-model="productStore.getProduct[activeTab].name"
                        class="input input-bordered w-full text-sm p-1 rounded-md"
                    />
                    </div>

                    <!-- Add Image -->
                    <div 
                    v-if="isEditMode"
                    @click="addFloorImg(activeTab)"
                    class="btn btn-ghost cursor-pointer"
                    >+ Add Image</div>

                    <!-- Images grid -->
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div 
                        v-for="(img, idx) in productStore.getProduct[activeTab].image"
                        :key="idx"
                        class="relative"
                    >
                        <!-- Delete -->
                        <button 
                        v-if="isEditMode"
                        @click="removeFloorImg(activeTab, idx)"
                        class="p-1 text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer rounded-full absolute top-2 right-2 z-10"
                        ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg></button>

                        <NuxtImg :src="img" class="rounded shadow w-full aspect-square object-cover" />

                        <input 
                        v-if="isEditMode"
                        v-model="productStore.getProduct[activeTab].image[idx]"
                        class="input input-bordered text-sm w-full mt-2"
                        placeholder="Image URL"
                        />
                    </div>
                    </div>

                </div>
                </div>

                </main>

                <main class="flex-1 overflow-y-auto bg-base-100">
                <!-- Nếu không có dữ liệu -->
                <div v-if="!Array.isArray(productStore.product) || imagesData.length === 0" class="text-center py-12 text-gray-500">
                Chưa có thông tin nào.
                </div>
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
const config = useRuntimeConfig();
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
const formProducts = ref({
    _id: "",
    features: [],
    images: [],
    blueprint: [],
    floor1: { name:'TẦNG 01',image: [] },
    floor2: { name:'TẦNG 02',image: [] },
    floor3: { name:'TẦNG 03',image: [] },
    floor4: { name:'TẦNG 04',image: [] }
});

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

const addFeature = () => {
  formProducts.value.features.push({ title: '', des: '' })
}
const removeFeature = (i) => {
  formProducts.value.features.splice(i, 1)
}

const addImage = () => {
  formProducts.value.images.push('')
}
const removeImage = (i) => {
  formProducts.value.images.splice(i, 1)
}

const addBlueprint = () => {
  formProducts.value.blueprint.push({ name: '', image: '' })
}
const removeBlueprint = (i) => {
  formProducts.value.blueprint.splice(i, 1)
}

const addFloorImg = (floor) => {
  formProducts.value[floor].image.push('')
}
const removeFloorImg = (floor, i) => {
  formProducts.value[floor].image.splice(i, 1)
}


// Lưu edit
const saveEdit = async() => {
  isLoading.value = true;
  try {
    const response = await $fetch(`${config.public.apiBase}/products/createorupdate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formProducts.value)
    });
    showMessageToast("success", "Updated successfully");
    isEditMode.value = false;

  } catch (error) {
    console.error('Error fetching products:', error);
    showMessageToast("error", "Save failed");
  } finally {
    isLoading.value = false;
  }
};

</script>


<style lang="scss" scoped>
  .scrollable {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .scrollable::-webkit-scrollbar {
    display: none;
  }
</style>