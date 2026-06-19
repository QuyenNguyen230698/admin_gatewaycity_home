<template>
  <div class="h-full flex flex-col">

    <!-- Sticky Header -->
    <div class="px-8 py-6 border-b border-zinc-200 dark:border-zinc-800
                flex items-center justify-between shrink-0
                bg-white dark:bg-slate-900 sticky top-0 z-10">
      <div>
        <h1 class="text-2xl font-bold text-zinc-900 dark:text-white">Contents Designer</h1>
        <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Unlayer Email Editor Integration</p>
      </div>
      <div class="flex items-center gap-3">
        <!-- Import button -->
        <div class="relative">
          <button @click="toggleImportMenu"
            class="bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300
                   px-4 py-2 rounded-lg font-medium text-sm border border-zinc-200 dark:border-zinc-700
                   hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors flex items-center gap-2">
            <i class="bi bi-upload"></i> Import
          </button>
          <div v-if="showImportMenu"
            class="absolute top-full right-0 mt-2 w-52 bg-white dark:bg-zinc-800 rounded-xl shadow-xl
                   border border-zinc-200 dark:border-zinc-700 py-2 z-50">
            <button @click="showImportModal = true; showImportMenu = false"
              class="w-full px-4 py-2.5 text-left text-sm font-medium text-zinc-700 dark:text-zinc-300
                     hover:bg-zinc-50 dark:hover:bg-zinc-700 flex items-center gap-3 transition-colors">
              <i class="bi bi-collection text-zinc-400"></i>
              Library Designs
            </button>
          </div>
        </div>

        <!-- Media Library -->
        <button @click="openMediaLibrary"
          class="w-9 h-9 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700
                 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
          <i class="bi bi-images text-base"></i>
        </button>

        <!-- Divider -->
        <div class="h-6 w-px bg-zinc-200 dark:bg-zinc-700"></div>

        <!-- Save -->
        <button @click="showSaveModal = true"
          class="bg-black dark:bg-white text-white dark:text-black
                 px-4 py-2 rounded-lg font-medium text-sm
                 hover:opacity-80 transition-opacity flex items-center gap-2 shadow-lg">
          <i class="bi bi-floppy"></i> Save Design
        </button>
      </div>
    </div>

    <!-- Editor Area (desktop only) -->
    <div class="hidden lg:flex flex-1 relative overflow-hidden bg-zinc-100 dark:bg-zinc-900">
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
      <MediaDrawer ref="mediaDrawerRef" />
    </div>

    <!-- Mobile Fallback -->
    <div class="lg:hidden flex-1 flex items-center justify-center bg-zinc-950 p-10">
      <div class="text-center space-y-6">
        <div class="w-20 h-20 mx-auto rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
          <i class="bi bi-display text-3xl"></i>
        </div>
        <h2 class="text-2xl font-bold text-white">Desktop Required</h2>
        <p class="text-zinc-400 text-sm max-w-[250px] mx-auto">The content designer requires a larger viewport to function properly.</p>
      </div>
    </div>

    <!-- Modals -->
    <Teleport to="body">
      <!-- Import Library Modal -->
      <Transition name="fade">
        <div v-if="showImportModal" class="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div @click="showImportModal = false" class="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"></div>
          <div class="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden">
            <div class="px-8 py-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <h2 class="text-xl font-bold text-zinc-900 dark:text-white">Design Library</h2>
                <p class="text-xs text-zinc-500 mt-0.5">Import from your saved projects</p>
              </div>
              <button @click="showImportModal = false"
                class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
            <div class="p-8">
              <div class="max-h-[400px] overflow-y-auto custom-scrollbar space-y-3">
                <div v-if="landingPages.length > 0">
                  <div v-for="design in landingPages" :key="design._id"
                    class="group flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl
                           border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500
                           transition-all cursor-pointer">
                    <div class="w-10 h-10 rounded-lg bg-white dark:bg-zinc-700 flex items-center justify-center text-zinc-500 group-hover:scale-110 transition-transform">
                      <i class="bi bi-file-earmark-richtext text-lg"></i>
                    </div>
                    <div class="flex-1" @click="importDesign(design)">
                      <h4 class="font-semibold text-zinc-900 dark:text-white text-sm">{{ design.name }}</h4>
                      <p class="text-xs text-zinc-400 mt-0.5">{{ new Date(design.createdAt).toLocaleDateString() }} • {{ design.type }}</p>
                    </div>
                    <button @click.stop="deleteDesign(design._id)"
                      class="w-8 h-8 flex items-center justify-center rounded-lg
                             hover:bg-red-50 dark:hover:bg-red-900/20 text-zinc-400 hover:text-red-600 transition-colors
                             opacity-0 group-hover:opacity-100">
                      <i class="bi bi-trash text-sm"></i>
                    </button>
                  </div>
                </div>
                <div v-else class="text-center py-16 text-zinc-400">
                  <i class="bi bi-inbox text-3xl mb-3 block"></i>
                  <p class="text-sm">No designs found</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Save Modal -->
      <Transition name="fade">
        <div v-if="showSaveModal" class="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div @click="showSaveModal = false" class="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"></div>
          <div class="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden">
            <div class="px-8 py-6 border-b border-zinc-200 dark:border-zinc-800">
              <h2 class="text-xl font-bold text-zinc-900 dark:text-white">Save Design</h2>
              <p class="text-xs text-zinc-500 mt-0.5">Snapshot your current design</p>
            </div>
            <div class="p-8 space-y-6">
              <div class="space-y-2">
                <label class="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Design Name</label>
                <input v-model="newDesignName" type="text" placeholder="e.g. Summer Campaign v1"
                  class="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700
                         outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm
                         dark:text-white placeholder-zinc-400" />
              </div>
              <div class="flex gap-3">
                <button @click="showSaveModal = false"
                  class="flex-1 py-2.5 text-sm font-medium border border-zinc-200 dark:border-zinc-700 rounded-lg
                         hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300">
                  Cancel
                </button>
                <button @click="saveDesign(newDesignName || `Design_${Date.now()}`)"
                  class="flex-[2] py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-lg
                         hover:opacity-80 transition-opacity shadow-lg">
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <SharedConfirmModal
      v-model="showDeleteConfirm"
      title="Xác nhận xóa"
      message="Bạn có chắc chắn muốn xóa bản thiết kế này? Không thể khôi phục sau khi xóa."
      type="danger"
      @confirm="handleConfirmDelete"
    />
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })

import { ref, onMounted, onUnmounted, computed } from 'vue';
import { EmailEditor } from 'vue-email-editor';

const config = useRuntimeConfig();

const emailEditor = ref(null);
const mediaDrawerRef = ref(null);
const showImportModal = ref(false);
const showSaveModal = ref(false);
const showImportMenu = ref(false);
const showDeleteConfirm = ref(false);
const idToDelete = ref(null);
const savedDesigns = ref([]);
const newDesignName = ref('');
const designType = ref('landingPage');

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

const openMediaLibrary = () => { mediaDrawerRef.value?.open(); };

const loadSavedDesigns = async () => {
  try {
    const res = await $fetch(`${config.public.apiBase}/template-design/grid`, {
      method: 'POST',
      body: { sorted: [{ name: 'createdAt', direction: 'descending' }] }
    });
    savedDesigns.value = res.result || [];
  } catch {
    savedDesigns.value = [];
  }
};

const landingPages = computed(() => savedDesigns.value.filter(d => d.type === 'landingPage'));

const deleteDesign = (_id) => {
  idToDelete.value = _id;
  showDeleteConfirm.value = true;
};

const handleConfirmDelete = async () => {
  if (!idToDelete.value) return;
  showDeleteConfirm.value = false;
  try {
    await $fetch(`${config.public.apiBase}/template-design/delete-design`, {
      method: 'DELETE',
      body: { _id: idToDelete.value },
    });
    await loadSavedDesigns();
    toast.success('Xóa thiết kế thành công');
  } catch {
    toast.error('Lỗi khi xóa thiết kế');
  } finally {
    idToDelete.value = null;
  }
};

const saveDesign = async (name, type = 'landingPage', _id = null) => {
  emailEditor.value?.editor.saveDesign(async (design) => {
    try {
      const cleanDesign = JSON.parse(JSON.stringify(design));
      await $fetch(`${config.public.apiBase}/template-design/save-design`, {
        method: 'POST',
        body: { _id, name, design: cleanDesign, type },
      });
      newDesignName.value = '';
      designType.value = 'landingPage';
      showSaveModal.value = false;
      toast.success(`Thiết kế "${name}" đã được lưu!`);
      await loadSavedDesigns();
    } catch {
      toast.error('Lưu thiết kế thất bại');
    }
  });
};

const importDesign = (design) => {
  try {
    if (!design?.design || typeof design.design !== 'object') throw new Error('Invalid design format');
    const cleanDesign = JSON.parse(JSON.stringify(design.design));
    emailEditor.value?.editor.loadDesign(cleanDesign, (error) => {
      if (error) toast.error('Lỗi khi tải thiết kế vào bộ chỉnh sửa.');
    });
    newDesignName.value = design.name;
    designType.value = design.type;
    showImportModal.value = false;
  } catch {
    toast.error('Không thể nhập thiết kế này.');
  }
};

const toggleImportMenu = () => { showImportMenu.value = !showImportMenu.value; };
const editorLoaded = () => { console.log('Editor Loaded'); };
const editorReady = () => {};

const closeMenus = (e) => {
  if (!e.target.closest('.relative')) showImportMenu.value = false;
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
</style>