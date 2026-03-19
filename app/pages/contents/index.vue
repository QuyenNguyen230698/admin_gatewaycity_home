<template>
  <div class="hidden lg:flex flex-col w-full h-full overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm animate-fade-in">
      <!-- Header with buttons -->
      <header class="h-20 flex-shrink-0 flex items-center justify-between px-8 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 z-20">
          <div class="flex items-center gap-6">
              <div class="flex flex-col">
                  <h1 class="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 uppercase">Contents Designer</h1>
                  <p class="text-[10px] font-bold text-primary-500 uppercase tracking-widest leading-none">Unlayer Editor Integration</p>
              </div>

              <!-- Primary Actions -->
              <div class="flex items-center gap-3">
                  <div class="relative group">
                      <button @click="toggleImportMenu" class="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:shadow-lg transition-all active:scale-95">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                          Import
                      </button>
                      <div v-if="showImportMenu" class="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 py-2 z-50 animate-scale-in">
                          <button @click="showImportModal = true; showImportMenu = false" class="w-full px-4 py-2.5 text-left text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-3 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                              Library Designs
                          </button>
                      </div>
                  </div>
              </div>
          </div>

          <div class="flex items-center gap-4">
              <!-- Media Lib Toggle -->
              <button @click="openMediaLibrary" class="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 hover:shadow-md transition-all active:scale-90" title="Media Assets">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>

              <div class="h-8 w-px bg-slate-100 dark:bg-slate-800"></div>

              <button @click="showSaveModal = true" class="px-8 py-2.5 rounded-xl bg-primary-600 text-white text-xs font-bold uppercase tracking-wider hover:shadow-xl shadow-primary-600/20 transition-all active:scale-95 flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                 Save Design
              </button>
          </div>
      </header>
      
      <!-- Email Editor Container -->
      <div class="flex-1 relative bg-slate-100 dark:bg-slate-900 z-10">
          <EmailEditor
              class="w-full h-full"
              ref="emailEditor"
              :appearance="appearance"
              :min-height="minHeight"
              :locale="locale"
              :tools="tools"
              :options="options"
              @load="editorLoaded"
              @ready="editorReady"
          />
          <!-- Media Drawer component with ref -->
          <MediaDrawer ref="mediaDrawerRef" />
      </div>

      <!-- Modals (Re-implementation with Premium Design) -->
      <Teleport to="body">
        <!-- Import Designs Modal -->
        <Transition name="fade">
          <div v-if="showImportModal" class="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <div @click="showImportModal = false" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
              <div class="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden animate-scale-in">
                  <header class="px-10 py-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <h2 class="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Design Library</h2>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Import from your saved projects</p>
                      </div>
                      <button @click="showImportModal = false" class="p-3 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">✕</button>
                  </header>

                  <div class="p-10 space-y-6">
                      <div class="max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                         <div v-if="landingPages.length > 0" class="grid gap-3">
                            <div v-for="design in landingPages" :key="design._id" 
                               class="group flex items-center gap-4 p-5 bg-slate-50/50 dark:bg-slate-800/50 rounded-3xl border border-transparent hover:border-primary-500/50 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer shadow-sm">
                               <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-700 flex items-center justify-center text-primary-500 group-hover:scale-110 transition-transform">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                               </div>
                               <div class="flex-1" @click="importDesign(design)">
                                  <h4 class="font-bold text-slate-900 dark:text-slate-100">{{ design.name }}</h4>
                                  <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{{ new Date(design.createdAt).toLocaleDateString() }} • {{ design.type }}</p>
                               </div>
                               <button @click.stop="deleteDesign(design._id)" class="p-3 text-red-500 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-all">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                               </button>
                            </div>
                         </div>
                         <div v-else class="text-center py-20 opacity-40">
                            <p class="font-bold uppercase tracking-widest">No designs found</p>
                         </div>
                      </div>
                  </div>
              </div>
          </div>
        </Transition>

        <!-- Save Modal -->
        <Transition name="fade">
          <div v-if="showSaveModal" class="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <div @click="showSaveModal = false" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
              <div class="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden animate-scale-in">
                 <header class="px-10 py-8 border-b border-slate-100 dark:border-slate-800">
                    <h2 class="text-2xl font-black tracking-tight uppercase">Save Project</h2>
                    <p class="text-[10px] font-bold text-primary-500 uppercase tracking-widest mt-1">Snapshot your current design</p>
                 </header>
                 <div class="p-10 space-y-6">
                    <div class="space-y-2">
                       <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Design Name</label>
                       <input v-model="newDesignName" type="text" placeholder="e.g. Summer Campaign v1" 
                          class="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-4 focus:ring-primary-500/10 transition-all font-bold" />
                    </div>
                    <div class="flex gap-4">
                       <button @click="showSaveModal = false" class="flex-1 py-4 text-xs font-bold uppercase tracking-widest border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 hover:text-primary-500 transition-all">Discard</button>
                       <button @click="saveDesign(newDesignName || `Design_${Date.now()}`)" class="flex-[2] py-4 bg-primary-600 text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:shadow-xl shadow-primary-500/20 active:scale-95 transition-all">Publish</button>
                    </div>
                 </div>
              </div>
          </div>
        </Transition>
      </Teleport>

      <ToastMessage ref="toastRef" :typeToast="currentToastType" :message="toastMessage" :show="showToast" :width="`w-fit`" class="z-[110]" />
  </div>

  <div class="lg:hidden h-screen flex items-center justify-center bg-slate-950 p-10">
      <div class="text-center space-y-6">
          <div class="w-24 h-24 mx-auto rounded-[2rem] bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
             <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <h1 class="text-3xl font-black text-white uppercase tracking-tighter">Desktop Required</h1>
          <p class="text-slate-400 text-sm max-w-[250px] mx-auto font-medium">The content designer requires a larger viewport to function properly.</p>
          <button @click="$router.push('/')" class="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full">Back home</button>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { EmailEditor } from 'vue-email-editor';

const config = useRuntimeConfig();

// Refs
const emailEditor = ref(null);
const mediaDrawerRef = ref(null);
const toastRef = ref(null);

// UI States
const showImportModal = ref(false);
const showSaveModal = ref(false);
const showImportMenu = ref(false);
const savedDesigns = ref([]);
const newDesignName = ref('');
const designType = ref('landingPage');

// Toast States
const showToast = ref(false);
const currentToastType = ref("");
const toastMessage = ref("");

const showMessageToast = (type, message) => {
  currentToastType.value = type;
  toastMessage.value = message;
  showToast.value = true;
  if (toastRef.value) toastRef.value.show();
};

// Unlayer Config
const minHeight = '100%';
const locale = 'en';
const tools = { text: { enabled: true }, button: { enabled: true }, image: { enabled: true } };
const options = {
  id: 'editors',
  projectId: 277179,
  displayMode: 'email',
  defaultDevice: 'desktop',
  devices: ['desktop', 'mobile'],
  tabs: { dev: { enabled: false } },
  features: { branding: { enabled: false } },
};
const appearance = { theme: 'dark', panels: { tools: { dock: 'right' } } };

// Methods
const openMediaLibrary = () => {
    mediaDrawerRef.value?.open();
};

const loadSavedDesigns = async () => {
  try {
    const res = await $fetch(`${config.public.apiBase}/template-design/grid`, {
        method: 'POST',
        body: { sorted: [{ name: 'createdAt', direction: 'descending' }] }
      });
    savedDesigns.value = res.result || [];
  } catch (error) {
    savedDesigns.value = [];
  }
};

const landingPages = computed(() => savedDesigns.value.filter(d => d.type === 'landingPage'));

const deleteDesign = async (_id) => {
  if(!confirm('Are you sure?')) return;
  try {
    await $fetch(`${config.public.apiBase}/template-design/delete-design`, {
      method: 'DELETE',
      body: { _id },
    });
    await loadSavedDesigns();
    showMessageToast('success', 'Design deleted');
  } catch (error) {
    showMessageToast('error', 'Delete failed');
  }
};

const saveDesign = async (name, type = 'landingPage', _id = null) => {
  emailEditor.value?.editor.saveDesign(async (design) => {
    try {
      const cleanDesign = JSON.parse(JSON.stringify(design));
      const savedDesign = {
        _id, // Include _id for updates, null for new designs
        name,
        design: cleanDesign,
        type,
      };
      const result = await $fetch(`${config.public.apiBase}/template-design/save-design`, {
        method: 'POST',
        body: savedDesign,
      });
      
      newDesignName.value = '';
      designType.value = 'landingPage';
      showSaveModal.value = false;
      showMessageToast('success', `Design "${name}" (${type}) saved successfully!`);
      await loadSavedDesigns(); // Refresh the list after saving
    } catch (error) {
      showMessageToast('error', 'Save failed');
    }
  });
};

const importDesign = (design) => {
  try {
    if (!design || !design.design || typeof design.design !== 'object') {
      throw new Error('Invalid design format');
    }
    const cleanDesign = JSON.parse(JSON.stringify(design.design));
    emailEditor.value?.editor.loadDesign(cleanDesign, (error) => {
      if (error) {
        showMessageToast('error', 'Failed to load design. Design may be corrupted.');
      } 
    });
    newDesignName.value = design.name;
    designType.value = design.type;
    showImportModal.value = false;
  } catch (error) {
    showMessageToast('error', 'Failed to import design. Invalid format.');
  }
};

const toggleImportMenu = () => { showImportMenu.value = !showImportMenu.value; };

const editorLoaded = () => { console.log('Editor Loaded'); };
const editorReady = () => { /* Ready logic */ };

const closeMenus = (e) => {
  if (!e.target.closest('.group')) showImportMenu.value = false;
};

onMounted(() => {
  loadSavedDesigns();
  document.addEventListener('click', closeMenus);
});

onUnmounted(() => {
  document.removeEventListener('click', closeMenus);
});

defineExpose({ saveDesign, importDesign });
</script>

<style lang="scss">
#editors { background-color: #0f172a !important; }
.scale-in-enter-active { animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
</style>