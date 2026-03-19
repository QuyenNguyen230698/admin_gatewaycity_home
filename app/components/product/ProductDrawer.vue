<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="productStore.product" class="fixed inset-0 z-[60] flex items-center justify-end">
        <!-- Backdrop -->
        <div @click="productStore.reset()" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
        
        <!-- Drawer Content -->
        <Transition name="slide-right">
          <div v-if="productStore.product" class="relative w-full max-w-4xl h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col overflow-hidden animate-scale-in border-l border-slate-200 dark:border-slate-800">
            
            <div v-if="isLoading" class="absolute inset-0 z-[70] flex items-center justify-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <div class="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>

            <!-- Header -->
            <header class="h-20 flex flex-shrink-0 items-center justify-between px-8 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 z-10">
              <div class="flex items-center gap-4">
                <button @click="productStore.reset()" class="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div>
                  <h2 class="text-xl font-bold uppercase tracking-tight">{{ productStore.product?.title || 'Edit Product' }}</h2>
                  <p class="text-[10px] font-bold text-primary-500 uppercase">Product Configuration</p>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <button v-if="!isEditMode" @click="isEditMode = true" class="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:shadow-lg transition-all active:scale-95">
                  Edit Details
                </button>
                <div v-else class="flex items-center gap-2">
                   <button @click="isEditMode = false" class="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 hover:text-primary-500 transition-all">Cancel</button>
                   <button @click="saveEdit" class="px-6 py-2.5 rounded-xl bg-primary-600 text-white font-bold hover:shadow-lg shadow-primary-500/20 active:scale-95 transition-all">Save Changes</button>
                </div>
              </div>
            </header>

            <!-- Tabs Navigation -->
            <nav class="flex-shrink-0 flex gap-1 p-2 bg-slate-50/50 dark:bg-slate-800/20 border-b border-slate-100 dark:border-slate-800 overflow-x-auto scrollbar-hide">
              <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
                :class="['px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap', 
                activeTab === tab.id ? 'bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 shadow-sm border border-slate-200 dark:border-slate-700' : 'text-slate-500 hover:text-slate-700 hover:bg-white/50 dark:hover:bg-slate-800/50']">
                {{ tab.label }}
              </button>
            </nav>

            <!-- Scrollable Body -->
            <main class="flex-1 overflow-y-auto p-8 custom-scrollbar bg-white dark:bg-slate-900">
              
              <!-- Features Tab -->
              <div v-if="activeTab === 'features'" class="space-y-4 animate-fade-in shadow-inner p-1">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest">Property Features</h3>
                  <button v-if="isEditMode" @click="addFeature" class="text-xs font-bold text-primary-500 hover:underline">+ Add Link</button>
                </div>
                <div class="grid grid-cols-1 gap-3">
                  <div v-for="(item, idx) in productStore.product.features" :key="idx" class="group relative flex items-center gap-3 p-1 rounded-xl transition-all">
                    <div v-if="!isEditMode" class="w-full flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                       <span class="font-bold text-sm text-slate-700 dark:text-slate-300">{{ item.title }}</span>
                       <span class="text-sm text-slate-500">{{ item.des }}</span>
                    </div>
                    <div v-else class="w-full flex gap-2">
                       <input v-model="item.title" class="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-primary-500/20 outline-none" />
                       <input v-model="item.des" class="flex-[1.5] px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-primary-500/20 outline-none" />
                       <button @click="removeFeature(idx)" class="p-3 text-red-500 hover:bg-red-50 rounded-xl">✕</button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Images Tab -->
              <div v-if="activeTab === 'images'" class="space-y-6 animate-fade-in">
                 <div class="flex items-center justify-between">
                    <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest">Gallery Images</h3>
                    <button v-if="isEditMode" @click="addImage()" class="text-xs font-bold text-primary-500">+ Add New URL</button>
                 </div>
                 <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div v-for="(img, idx) in productStore.product.images" :key="idx" class="relative group aspect-square rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
                       <img :src="img" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                       <div v-if="isEditMode" class="absolute inset-x-0 bottom-0 p-2 bg-black/60 backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform">
                          <input v-model="productStore.product.images[idx]" class="w-full px-2 py-1 bg-white/20 text-white rounded text-[10px] outline-none placeholder:text-white/50" placeholder="Paste link..." />
                          <button @click="removeImage(idx)" class="mt-1 w-full text-[10px] py-1 bg-red-600 text-white rounded font-bold uppercase">Remove</button>
                       </div>
                    </div>
                 </div>
              </div>

              <!-- Blueprints Tab -->
              <div v-if="activeTab === 'blueprint'" class="animate-fade-in space-y-6">
                 <div class="flex items-center justify-between mb-4">
                   <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest">Building Blueprints</h3>
                   <button v-if="isEditMode" @click="addBlueprint()" class="text-xs font-bold text-primary-500">+ Add Stage</button>
                 </div>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div v-for="(item, idx) in productStore.product.blueprint" :key="idx" class="card-premium p-4 group">
                       <div class="flex items-center justify-between mb-4">
                          <input v-if="isEditMode" v-model="item.name" class="p-1 border border-slate-200 dark:border-slate-700 bg-transparent rounded font-bold text-sm w-1/2" />
                          <span v-else class="font-bold text-sm text-slate-900 dark:text-slate-100 uppercase tracking-tight">{{ item.name }}</span>
                          <button v-if="isEditMode" @click="removeBlueprint(idx)" class="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                       </div>
                       <div class="relative rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 mb-2">
                         <img :src="item.image" class="w-full aspect-[4/3] object-cover" />
                         <div v-if="isEditMode" class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <input v-model="item.image" class="w-4/5 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-lg text-xs" placeholder="Blueprint Link" />
                         </div>
                       </div>
                    </div>
                 </div>
              </div>

              <!-- Floors Logic -->
              <div v-if="['floor1','floor2','floor3','floor4'].includes(activeTab)" class="animate-fade-in space-y-8">
                 <div class="flex items-center justify-between mb-2 border-b border-primary-500 pb-2">
                    <div v-if="isEditMode" class="flex items-center gap-2">
                      <span class="text-xs font-bold text-primary-500 uppercase tracking-wider">Title:</span>
                      <input v-model="productStore.product[activeTab].name" class="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 border-none font-bold text-sm" />
                    </div>
                    <h3 v-else class="text-2xl font-extrabold uppercase tracking-tighter">{{ productStore.product[activeTab].name }}</h3>
                    <button v-if="isEditMode" @click="addFloorImg(activeTab)" class="text-sm font-bold text-primary-500 border-2 border-primary-500/20 px-4 py-1.5 rounded-xl hover:bg-primary-50 transition-all">+ Add Photo</button>
                 </div>

                 <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
                   <div v-for="(img, idx) in productStore.product[activeTab].image" :key="idx" class="relative group card-premium !p-2">
                      <img :src="img" class="w-full aspect-square object-cover rounded-xl" />
                      <div v-if="isEditMode" class="absolute inset-2 bg-black/50 backdrop-blur-md rounded-xl flex flex-col justify-center items-center p-4 gap-2 opacity-0 group-hover:opacity-100 transition-all">
                         <input v-model="productStore.product[activeTab].image[idx]" class="w-full p-2 bg-white/20 dark:bg-slate-800/20 text-[10px] rounded" placeholder="Image Link" />
                         <button @click="removeFloorImg(activeTab, idx)" class="w-full py-1.5 bg-red-600 text-white hover:bg-red-700 cursor-pointer font-bold rounded text-[10px]">DELETE</button>
                      </div>
                   </div>
                 </div>
              </div>

            </main>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const productStore = useProductStore();
const config = useRuntimeConfig();
const isLoading = ref(false);
const isEditMode = ref(false);
const activeTab = ref("features");

const tabs = [
  { id: 'features', label: 'Overview' },
  { id: 'images', label: 'Gallery' },
  { id: 'blueprint', label: 'Blueprints' },
  { id: 'floor1', label: 'Floor 1' },
  { id: 'floor2', label: 'Floor 2' },
  { id: 'floor3', label: 'Floor 3' },
  { id: 'floor4', label: 'Floor 4' }
]

const addFeature = () => { productStore.product.features.push({ title: '', des: '' }) }
const removeFeature = (i) => { productStore.product.features.splice(i, 1) }
const addImage = () => { productStore.product.images.push('') }
const removeImage = (i) => { productStore.product.images.splice(i, 1) }
const addBlueprint = () => { productStore.product.blueprint.push({ name: '', image: '' }) }
const removeBlueprint = (i) => { productStore.product.blueprint.splice(i, 1) }
const addFloorImg = (f) => { productStore.product[f].image.push('') }
const removeFloorImg = (f, i) => { productStore.product[f].image.splice(i, 1) }

const saveEdit = async () => {
  isLoading.value = true;
  try {
    await $fetch(`${config.public.apiBase}/products/createorupdate`, {
      method: 'POST',
      body: productStore.product
    });
    isEditMode.value = false;
    alert('Changes saved successfully!');
  } catch (error) {
    alert('Failed to save changes.');
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-right-enter-active, .slide-right-leave-active { transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-right-enter-from, .slide-right-leave-to { transform: translateX(100%); }

.scrollbar-hide::-webkit-scrollbar { display: none; }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
</style>