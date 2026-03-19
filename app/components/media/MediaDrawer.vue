<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-[60] flex items-center justify-end">
        <!-- Backdrop -->
        <div @click="closeDrawer" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
        
        <!-- Drawer -->
        <Transition name="slide-right">
          <div v-if="isOpen" class="relative w-full max-w-4xl h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col overflow-hidden border-l border-slate-200 dark:border-slate-800">
            
            <div v-if="isLoading" class="absolute inset-0 z-[70] flex items-center justify-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <div class="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>

            <!-- Header -->
            <header class="h-20 flex flex-shrink-0 items-center justify-between px-8 border-b border-slate-100 dark:border-slate-800">
              <div class="flex items-center gap-4">
                <div class="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 class="text-xl font-bold tracking-tight">Media Library</h2>
                  <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Asset Management</p>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <button @click="refreshImages" class="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" :class="['w-5 h-5', isLoading ? 'animate-spin' : '']" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button @click="closeDrawer" class="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400">
                   <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </header>

            <!-- Toolbar -->
            <div class="px-8 py-4 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
               <div class="relative w-64 group">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input type="text" placeholder="Search assets..." class="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" />
               </div>

               <button @click="isUploadModalOpen = true" class="flex items-center gap-2 px-6 py-2 rounded-xl bg-primary-600 text-white text-sm font-bold hover:shadow-lg shadow-primary-500/20 active:scale-95 transition-all">
                 <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                 <span>Upload Assets</span>
               </button>
            </div>

            <!-- Main Content -->
            <main class="flex-1 overflow-y-auto p-8 custom-scrollbar">
               <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  <div v-for="item in imagesData" :key="item._id" class="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm animate-fade-in hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                     <img :src="item.secure_url" class="w-full h-full object-cover" />
                     
                     <!-- Overlay -->
                     <div class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] flex flex-col justify-end p-3">
                        <div class="bg-white dark:bg-slate-800 rounded-xl p-2 shadow-xl space-y-1">
                           <div class="text-[10px] font-bold truncate text-slate-700 dark:text-slate-200">{{ item.display_name }}</div>
                           <div class="flex items-center justify-between gap-1">
                              <button @click="copyImageUrl(item.secure_url)" class="flex-1 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-500 hover:text-primary-500 transition-colors flex items-center justify-center">
                                 <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                              </button>
                              <button @click="viewImage(item.secure_url)" class="flex-1 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-500 hover:text-blue-500 transition-colors flex items-center justify-center">
                                 <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                              </button>
                              <button @click="deleteSingleImage(item.public_id)" class="flex-1 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center">
                                 <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <!-- Empty State -->
               <div v-if="!isLoading && (!imagesData || imagesData.length === 0)" class="flex flex-col items-center justify-center py-32 text-center">
                  <div class="w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 mb-6">
                     <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <h3 class="text-lg font-bold">Your library is empty</h3>
                  <p class="text-slate-500 text-sm mt-2">Start uploading images to use them across your content.</p>
                  <button @click="isUploadModalOpen = true" class="mt-6 px-8 py-2.5 bg-primary-600 text-white font-bold rounded-xl active:scale-95 transition-all">Upload First Asset</button>
               </div>
            </main>

            <!-- Footer / Pagination -->
            <footer v-if="totalPages > 1" class="h-16 flex flex-shrink-0 items-center justify-between px-8 bg-slate-50 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-800">
               <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Showing {{ (currentPage - 1) * pageSize + 1 }}-{{ Math.min(currentPage * pageSize, totalRecords) }}
               </div>
               <div class="flex items-center gap-1">
                  <button @click="prevPage" :disabled="currentPage === 1" class="p-2 rounded-lg hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button v-for="p in visiblePages" :key="p" @click="goToPage(p)"
                     :class="['w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg transition-all', p === currentPage ? 'bg-primary-600 text-white shadow-lg' : 'hover:bg-white dark:hover:bg-slate-700 text-slate-500']">
                     {{ p }}
                  </button>
                  <button @click="nextPage" :disabled="currentPage === totalPages" class="p-2 rounded-lg hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                  </button>
               </div>
            </footer>

          </div>
        </Transition>
      </div>
    </Transition>

    <!-- Upload Modal -->
    <Transition name="fade">
       <div v-if="isUploadModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div @click="isUploadModalOpen = false" class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>
          <div class="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
             <header class="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h3 class="text-lg font-bold">Upload Assets</h3>
                <button @click="isUploadModalOpen = false" class="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 font-bold transition-all">✕</button>
             </header>

             <div class="p-8">
                <div @dragover.prevent @drop.prevent="handleDrop" 
                   :class="['relative h-64 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all duration-300', 
                   isDragging ? 'border-primary-500 bg-primary-50/30' : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30']">
                   
                   <input type="file" multiple @change="handleFileSelection" class="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />

                   <template v-if="selectedFiles.length === 0">
                      <div class="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center text-primary-500 mb-4">
                         <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                      </div>
                      <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Drop files to upload</p>
                      <p class="text-xs text-slate-500 mt-1">PNG, JPG, SVG up to 10MB</p>
                   </template>

                   <div v-else class="w-full h-full overflow-y-auto px-4 py-4 grid grid-cols-3 gap-3">
                      <div v-for="(file, i) in selectedFiles" :key="i" class="relative aspect-square rounded-xl overflow-hidden shadow-sm">
                         <img :src="getFilePreview(file)" class="w-full h-full object-cover" />
                         <button @click.stop="removeFile(i)" class="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                      </div>
                   </div>
                </div>

                <div class="mt-8 flex gap-3">
                   <button @click="isUploadModalOpen = false" class="flex-1 py-3 border border-slate-200 dark:border-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all">Discard</button>
                   <button @click="submitUpload" :disabled="selectedFiles.length === 0 || isLoading" class="flex-[2] py-3 bg-primary-600 text-white font-bold rounded-2xl hover:shadow-lg shadow-primary-500/20 disabled:opacity-50 transition-all">
                      <span v-if="isLoading" class="flex items-center justify-center gap-2">
                         <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                         Uploading...
                      </span>
                      <span v-else>Start Upload ({{ selectedFiles.length }})</span>
                   </button>
                </div>
             </div>
          </div>
       </div>
    </Transition>

    <ToastMessage ref="toastRef" :typeToast="currentToastType" :message="toastMessage" :show="showToast" :width="`w-2/3 lg:w-fit`" class="z-40" />
  </Teleport>
</template>

<script setup>
const config = useRuntimeConfig();

// State
const isOpen = ref(false);
const isUploadModalOpen = ref(false);
const isLoading = ref(false);
const isDragging = ref(false);
const imagesData = ref([]);
const selectedFiles = ref([]);

// Pagination
const currentPage = ref(1);
const pageSize = ref(12);
const totalRecords = ref(0);
const totalPages = computed(() => Math.ceil(totalRecords.value / pageSize.value));

const visiblePages = computed(() => {
  const range = 2;
  let start = Math.max(1, currentPage.value - range);
  let end = Math.min(totalPages.value, currentPage.value + range);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

// Toast
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

// Actions
const closeDrawer = () => {
   isOpen.value = false;
   // Clear state if needed
};

// Handlers for Drawer Toggle (assuming used in layouts or components)
defineExpose({
  open: () => { isOpen.value = true; fetchDataImage(); },
  close: () => { isOpen.value = false; }
});

const handleFileSelection = (e) => {
   const files = Array.from(e.target.files);
   selectedFiles.value = [...selectedFiles.value, ...files].slice(0, 10);
};

const removeFile = (i) => selectedFiles.value.splice(i, 1);
const getFilePreview = (file) => URL.createObjectURL(file);

const fetchDataImage = async () => {
    isLoading.value = true;
    try {
        const res = await $fetch(`${config.public.apiBase}/cloudinary/list`, {
            method: 'POST',
            body: {
                skip: (currentPage.value - 1) * pageSize.value,
                take: pageSize.value,
                requiresCounts: true,
                sorted: [{ name: 'createdAt', direction: 'descending' }]
            }
        });
        imagesData.value = res.result || [];
        totalRecords.value = res.count || 0;
    } catch (e) {
        console.error(e);
    } finally {
        isLoading.value = false;
    }
};

const refreshImages = () => { currentPage.value = 1; fetchDataImage(); };

const copyImageUrl = (url) => {
    navigator.clipboard.writeText(url);
    showMessageToast('success', 'URL copied to clipboard!');
};

const viewImage = (url) => window.open(url, '_blank');

const deleteSingleImage = async (id) => {
    if (!confirm('Permanent delete?')) return;
    isLoading.value = true;
    try {
        await $fetch(`${config.public.apiBase}/cloudinary/delete`, {
            method: 'DELETE',
            body: { public_id: id }
        });
        fetchDataImage();
        showMessageToast('success', 'Deleted successfully');
    } catch (e) {
        showMessageToast('error', 'Delete failed');
    } finally {
        isLoading.value = false;
    }
};

const submitUpload = async () => {
    isLoading.value = true;
    const formData = new FormData();
    selectedFiles.value.forEach(f => formData.append('images', f));
    formData.append('folder', 'AdminAssets');

    try {
        await $fetch(`${config.public.apiBase}/cloudinary/upload`, {
            method: 'POST',
            body: formData
        });
        isUploadModalOpen.value = false;
        selectedFiles.value = [];
        fetchDataImage();
        showMessageToast('success', 'Upload complete!');
    } catch (e) {
        showMessageToast('error', 'Upload failed');
    } finally {
        isLoading.value = false;
    }
};

const goToPage = (p) => { currentPage.value = p; fetchDataImage(); };
const prevPage = () => { if(currentPage.value > 1) { currentPage.value--; fetchDataImage(); } };
const nextPage = () => { if(currentPage.value < totalPages.value) { currentPage.value++; fetchDataImage(); } };

onMounted(() => {
    // Listen for custom event to open media library if needed
    window.addEventListener('open-media-library', () => { isOpen.value = true; fetchDataImage(); });
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-right-enter-active, .slide-right-leave-active { transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-right-enter-from, .slide-right-leave-to { transform: translateX(100%); }

.scale-in-enter-active { animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes scaleIn { 
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
</style>