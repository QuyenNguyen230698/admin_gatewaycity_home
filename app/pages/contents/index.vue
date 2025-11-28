<template>
  <div class="hidden lg:flex flex-col w-full h-full overflow-hidden bg-sand-50 font-sans">
      <!-- Header with buttons -->
      <div class="flex items-center justify-between px-6 py-2 bg-white border-b border-olive-200 shadow-sm">
          <div class="grow place-items-center flex items-center justify-between gap-3 w-full">
              <!-- Primary Action Buttons -->
              <div class="flex items-center justify-start gap-3">

              <!-- <button 
                  @click="exportHtml"
                  class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-300 transition-all duration-200 shadow-sm"
              >
                  <i class="bi bi-file-code"></i> Export
              </button> -->
             

              <!-- Dropdown for Import/JSON Actions -->
              <div class="relative">
                  <button 
                      class="flex items-center gap-2 px-4 py-2 bg-red-500 text-black text-sm font-medium rounded-md hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 transition-all duration-200 shadow-sm"
                      @click="toggleImportMenu"
                  >
                      <i class="bi bi-box-arrow-in-down"></i> Import
                      <i class="bi bi-chevron-down"></i>
                  </button>
                  <div 
                      v-if="showImportMenu"
                      class="absolute left-0 mt-2 w-48 bg-white border border-olive-200 rounded-md shadow-lg z-40"
                  >
                      <button 
                          @click="showImportModal = true; showImportMenu = false"
                          class="w-full flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-sand-100 transition-all duration-200"
                      >
                          <i class="bi bi-box-arrow-in-down"></i> Import Design
                      </button>
                      <button 
                          @click="showImportJsonModal = true; showImportMenu = false"
                          class="w-full flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-sand-100 transition-all duration-200"
                      >
                          <i class="bi bi-filetype-json"></i> Import JSON
                      </button>
                  </div>
              </div>

              <!-- Dropdown for View Actions -->
              <div class="relative">
                  <button 
                      class="flex items-center gap-2 px-4 py-2 bg-gray-100 text-black text-sm font-medium rounded-md hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 transition-all duration-200 shadow-sm"
                      @click="toggleViewMenu"
                  >
                      <i class="bi bi-eye"></i> View
                      <i class="bi bi-chevron-down"></i>
                  </button>
                  <div 
                      v-if="showViewMenu"
                      class="absolute left-0 mt-2 w-48 bg-white border border-olive-200 rounded-md shadow-lg z-40"
                  >
                      <button 
                          @click="viewHtml"
                          class="w-full flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-sand-100 transition-all duration-200"
                      >
                          <i class="bi bi-eye"></i> View HTML
                      </button>
                      <button 
                          @click="viewJson"
                          class="w-full flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-sand-100 transition-all duration-200"
                      >
                          <i class="bi bi-filetype-json"></i> View JSON
                      </button>
                  </div>
              </div>
              <button 
                  @click="openSendEmailTest"
                  class="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-300 transition-all duration-200 shadow-sm"
              >
                  <i class="bi bi-envelope"></i> Test Email
              </button>
              </div>
              <button 
                  @click="showSaveModal = true"
                  class="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 transition-all duration-200 shadow-sm"
              >
                  <i class="bi bi-floppy"></i> Save
              </button>
              
          </div>
          <div class="divider divider-horizontal"></div>
      </div>
      
      <!-- Email Editor -->
      <div class="relative z-10 flex flex-col w-full h-full overflow-hidden bg-sand-50">
          <EmailEditor
              class="w-full h-full overflow-y-auto z-10"
              ref="emailEditor"
              :appearance="appearance"
              :min-height="minHeight"
              :locale="locale"
              :tools="tools"
              :options="options"
              @load="editorLoaded"
              @ready="editorReady"
          />
          <!-- <div v-if="isHiddenBrand" :style="{backgroundColor: '#EEEEEE'}" class="absolute bottom-0 left-2/3 right-0 z-40 flex min-h-12 items-center justify-between"></div> -->
      </div>
     
      

      <!-- Import Modal -->
      <div v-if="showImportModal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-6 z-50">
          <div class="bg-white p-8 rounded-2xl max-w-lg w-full shadow-2xl border border-olive-200">
              <div class="flex items-center justify-between mb-6">
                  <h2 class="text-xl font-semibold text-black flex items-center gap-3">
                      <i class="bi bi-box-arrow-in-down text-red-600 text-lg"></i> Import Design
                  </h2>
                  <button @click="showImportModal = false" class="text-black hover:text-black transition-colors">
                      <i class="bi bi-x-lg text-lg"></i>
                  </button>
              </div>
              <!-- Tab navigation -->
              <div class="flex border-b border-sand-200 mb-4">
                <button 
                  class="px-4 py-2 text-sm font-medium"
                  :class="activeTab === 'emailTemplate' ? 'border-b-2 border-indigo-600 text-black' : 'text-olive-900'"
                  @click="activeTab = 'emailTemplate'"
                >
                  Email Template
                </button>
                <button 
                  class="px-4 py-2 text-sm font-medium"
                  :class="activeTab === 'landingPage' ? 'border-b-2 border-indigo-600 text-black' : 'text-olive-900'"
                  @click="activeTab = 'landingPage'"
                >
                  Landing Page
                </button>
              </div>
              <div v-if="activeTab === 'emailTemplate'" class="max-h-96 overflow-y-auto mb-6 border border-sand-200 rounded bg-sand-50">
                  <div 
                      v-for="(design, index) in emailTemplates" 
                      :key="index" 
                      class="flex items-center gap-4 px-5 py-4 hover:bg-slate-100 cursor-pointer border-b border-sand-200 text-sm text-black hover:text-olive-900 transition-colors"
                      @click="importDesign(design)"
                  >
                    <i class="bi bi-file-earmark text-black"></i>
                    <span class="font-medium flex-1" @click="importDesign(design)">{{ design.name }}</span>
                    <span class="text-xs text-black">{{ new Date(design.createdAt).toLocaleString() }}</span>
                    <i class="bi bi-trash text-olive-900 hover:text-red-700 ml-4" @click.stop="deleteDesign(design._id)"></i>
                  </div>
                  <div v-if="!savedDesigns.length" class="px-5 py-4 text-black text-sm flex items-center gap-3">
                      <i class="bi bi-info-circle"></i> No designs found
                  </div>
              </div>
              <div v-if="activeTab === 'landingPage'" class="max-h-96 overflow-y-auto mb-6 border border-sand-200 rounded bg-sand-50">
                  <div 
                      v-for="(design, index) in landingPages" 
                      :key="index" 
                      class="flex items-center gap-4 px-5 py-4 hover:bg-slate-100 cursor-pointer border-b border-sand-200 text-sm text-black hover:text-olive-900 transition-colors"
                      @click="importDesign(design)"
                  >
                    <i class="bi bi-file-earmark-medical text-black"></i>
                    <span class="font-medium flex-1" @click="importDesign(design)">{{ design.name }}</span>
                    <span class="text-xs text-black">{{ new Date(design.createdAt).toLocaleString() }}</span>
                    <i class="bi bi-trash text-olive-900 hover:text-red-700 ml-4" @click.stop="deleteDesign(design._id)"></i>
                  </div>
                  <div v-if="!savedDesigns.length" class="px-5 py-4 text-black text-sm flex items-center gap-3">
                      <i class="bi bi-info-circle"></i> No designs found
                  </div>
              </div>
              <div class="flex justify-end">
                  <button 
                      @click="showImportModal = false" 
                      class="flex items-center gap-2 px-4 py-2 bg-slate-200 text-black text-sm font-medium rounded hover:bg-slate-300 focus:ring-2 focus:ring-slate-100 transition-all duration-200"
                  >
                      <i class="bi bi-x-circle"></i> Close
                  </button>
              </div>
          </div>
      </div>

      <!-- Import JSON Modal -->
      <div v-if="showImportJsonModal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-6 z-50">
          <div class="bg-white p-8 rounded-2xl max-w-lg w-full shadow-2xl border ">
              <div class="flex items-center justify-between mb-6">
                  <h2 class="text-xl font-semibold text-black flex items-center gap-3">
                      <i class="bi bi-filetype-json text-black text-lg"></i> Import JSON Design
                  </h2>
                  <button @click="showImportJsonModal = false" class="text-black hover:text-black transition-colors">
                      <i class="bi bi-x-lg text-lg"></i>
                  </button>
              </div>
              <div class="mb-6">
                  <textarea 
                      v-model="jsonInput" 
                      placeholder="Paste your JSON design here"
                      class="w-full h-48 px-4 py-3 border border-sand-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-olive-500 transition-all duration-200 bg-slate-50 text-black resize-none"
                  ></textarea>
              </div>
              <div class="flex justify-end gap-4">
                  <button 
                      @click="importJsonDesign"
                      class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 focus:ring-2 focus:ring-green-300 transition-all duration-200"
                  >
                      <i class="bi bi-check-circle"></i> Import
                  </button>
                  <button 
                      @click="showImportJsonModal = false" 
                      class="flex items-center gap-2 px-4 py-2 bg-slate-200 text-black text-sm font-medium rounded hover:bg-slate-300 focus:ring-2 focus:ring-slate-100 transition-all duration-200"
                  >
                      <i class="bi bi-x-circle"></i> Close
                  </button>
              </div>
          </div>
      </div>

      <!-- View HTML Modal -->
      <div v-if="showHtmlModal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-6 z-50">
          <div class="bg-white p-8 rounded-2xl max-w-3xl w-full shadow-2xl border">
              <div class="flex items-center justify-between mb-6">
                  <h2 class="text-xl font-semibold text-black flex items-center gap-3">
                      <i class="bi bi-eye text-black text-lg"></i> View HTML
                  </h2>
                  <button @click="showHtmlModal = false" class="text-black hover:text-black transition-colors">
                      <i class="bi bi-x-lg text-lg"></i>
                  </button>
              </div>
              <div class="mb-6">
                  <textarea 
                      v-model="htmlOutput" 
                      readonly
                      class="w-full h-96 px-4 py-3 border border-sand-300 rounded text-sm bg-slate-50 text-black focus:outline-none transition-all duration-200 resize-none font-mono"
                  ></textarea>
              </div>
              <div class="flex justify-end gap-4">
                  <button 
                      @click="copyHtmlToClipboard"
                      class="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded hover:bg-teal-700 focus:ring-2 focus:ring-teal-300 transition-all duration-200"
                  >
                      <i class="bi bi-clipboard"></i> Copy to Clipboard
                  </button>
                  <button 
                      @click="showHtmlModal = false" 
                      class="flex items-center gap-2 px-4 py-2 bg-slate-200 text-black text-sm font-medium rounded hover:bg-slate-300 focus:ring-2 focus:ring-slate-100 transition-all duration-200"
                  >
                      <i class="bi bi-x-circle"></i> Close
                  </button>
              </div>
          </div>
      </div>

      <!-- View JSON Modal -->
      <div v-if="showJsonModal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-6 z-50">
          <div class="bg-white p-8 rounded-2xl max-w-3xl w-full shadow-2xl border">
              <div class="flex items-center justify-between mb-6">
                  <h2 class="text-xl font-semibold text-black flex items-center gap-3">
                      <i class="bi bi-filetype-json text-black text-lg"></i> View JSON
                  </h2>
                  <button @click="showJsonModal = false" class="text-black hover:text-black transition-colors">
                      <i class="bi bi-x-lg text-lg"></i>
                  </button>
              </div>
              <div class="mb-6">
                  <textarea 
                      v-model="jsonOutput" 
                      readonly
                      class="w-full h-96 px-4 py-3 border border-sand-300 rounded text-sm bg-slate-50 text-black focus:outline-none transition-all duration-200 resize-none font-mono"
                  ></textarea>
              </div>
              <div class="flex justify-end gap-4">
                  <button 
                      @click="copyJsonToClipboard"
                      class="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded hover:bg-teal-700 focus:ring-2 focus:ring-teal-300 transition-all duration-200"
                  >
                      <i class="bi bi-clipboard"></i> Copy to Clipboard
                  </button>
                  <button 
                      @click="showJsonModal = false" 
                      class="flex items-center gap-2 px-4 py-2 bg-slate-200 text-black text-sm font-medium rounded hover:bg-slate-300 focus:ring-2 focus:ring-slate-100 transition-all duration-200"
                  >
                      <i class="bi bi-x-circle"></i> Close
                  </button>
              </div>
          </div>
      </div>

      <!-- Save Modal -->
      <div v-if="showSaveModal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-6 z-50">
          <div class="bg-white p-8 rounded-2xl max-w-lg w-full shadow-2xl border">
              <div class="flex items-center justify-between mb-6">
                  <h2 class="text-xl font-semibold text-black flex items-center gap-3">
                      <i class="bi bi-floppy text-indigo-600 text-lg"></i> Save Design
                  </h2>
                  <button @click="showSaveModal = false" class="text-black hover:text-black transition-colors">
                      <i class="bi bi-x-lg text-lg"></i>
                  </button>
              </div>
              <div class="mb-6">
                  <input 
                      v-model="newDesignName" 
                      type="text" 
                      placeholder="Enter design name"
                      class="w-full px-4 py-2 border border-sand-300 text-black rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 bg-slate-50 mb-4"
                  >
                  <select 
                      v-model="designType" 
                      class="w-full px-4 py-2 border border-sand-300 text-black rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 bg-slate-50"
                  >
                      <option value="emailTemplate">Email Template</option>
                      <option value="landingPage">Landing Page</option>
                  </select>
              </div>
              <div class="max-h-96 overflow-y-auto mb-6 border border-sand-200 rounded bg-sand-50">
                  <div 
                      v-for="(design, index) in savedDesigns" 
                      :key="index" 
                      class="flex items-center gap-4 px-5 py-4 hover:bg-sand-100 cursor-pointer border-b border-sand-200 text-sm text-black hover:bg-slate-100 transition-colors"
                      @click="updateExistingDesign(design)"
                  >
                      <i class="bi bi-file-earmark text-black"></i> 
                      <span class="font-medium">{{ design.name }} ({{ design.type }})</span>
                      <span class="text-xs text-black ml-auto">({{ new Date(design.createdAt).toLocaleString() }})</span>
                  </div>
                  <div v-if="!savedDesigns.length" class="px-5 py-4 text-black text-sm flex items-center gap-3">
                      <i class="bi bi-info-circle"></i> No designs found
                  </div>
              </div>
              <div class="flex justify-end gap-4">
                  <button 
                      @click="saveDesign(newDesignName || `Thiết_kế_${Date.now()}`, designType)"
                      class="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 transition-all duration-200"
                  >
                      <i class="bi bi-floppy"></i> Save
                  </button>
                  <button 
                      @click="showSaveModal = false" 
                      class="flex items-center gap-2 px-4 py-2 bg-slate-200 text-black text-sm font-medium rounded hover:bg-slate-300 focus:ring-2 focus:ring-slate-100 transition-all duration-200"
                  >
                      <i class="bi bi-x-circle"></i> Close
                  </button>
              </div>
          </div>
      </div>

      <!-- Send Test Email Modal -->
      <div v-if="showTestEmailModal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-6 z-50">
          <div class="bg-white p-8 rounded-2xl max-w-lg w-full shadow-2xl border">
              <div class="flex items-center justify-between mb-6">
                  <h2 class="text-xl font-semibold text-black flex items-center gap-3">
                      <i class="bi bi-envelope text-purple-600 text-lg"></i> Send Test Email
                  </h2>
                  <button @click="showTestEmailModal = false" class="text-black hover:text-black transition-colors">
                      <i class="bi bi-x-lg text-lg"></i>
                  </button>
              </div>
              <div class="mb-6 space-y-4">
                  <div>
                      <label class="block text-sm font-medium text-black mb-1">Recipient Email</label>
                      <input 
                          v-model="testEmailTo" 
                          type="email" 
                          placeholder="Enter recipient email (e.g., test@example.com)"
                          class="w-full px-4 py-2 border border-sand-300 text-black rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 bg-slate-50"
                      >
                  </div>
                  <div>
                      <label class="block text-sm font-medium text-black mb-1">Subject</label>
                      <input 
                          v-model="testEmailSubject" 
                          type="text" 
                          placeholder="Enter email subject"
                          class="w-full px-4 py-2 border border-sand-300 text-black rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 bg-slate-50"
                      >
                  </div>
                  <div>
                      <label class="block text-sm font-medium text-black mb-1">Campaign Name</label>
                      <input 
                          v-model="testEmailCampaign" 
                          type="text" 
                          placeholder="Enter campaign name (e.g., Test Campaign)"
                          class="w-full px-4 py-2 border border-sand-300 text-black rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 bg-slate-50"
                      >
                  </div>
              </div>
              <div class="flex justify-end gap-4">
                  <button 
                      @click="sendTestEmail"
                      class="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded hover:bg-purple-700 focus:ring-2 focus:ring-purple-300 transition-all duration-200"
                  >
                      <i class="bi bi-envelope-check"></i> Send
                  </button>
                  <button 
                      @click="showTestEmailModal = false" 
                      class="flex items-center gap-2 px-4 py-2 bg-slate-200 text-black text-sm font-medium rounded hover:bg-slate-300 focus:ring-2 focus:ring-slate-100 transition-all duration-200"
                  >
                      <i class="bi bi-x-circle"></i> Close
                  </button>
              </div>
          </div>
      </div>

      <!-- Media Library Modal -->
      <ejs-toast ref="notificationToast" :position="{ X: 'right', Y: 'Top' }">
      </ejs-toast>
  </div>
  <div class="lg:hidden">
    <div class="overflow-hidden flex flex-col flex-grow h-fit items-center justify-center w-full bg-gray-50">
        <div class="max-w-md w-full mx-auto p-8 flex flex-col items-center justify-center h-full">
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                <div class="p-8">
                    <div class="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full mb-6">
                        <i class="bi bi-shield-lock text-2xl text-red-500"></i>
                    </div>
                    <h1 class="text-5xl font-bold text-center text-red-500 mb-2">403</h1>
                    <h2 class="text-xl font-semibold text-center text-gray-800 mb-4">Access Denied</h2>
                    <p class="text-gray-600 text-center mb-8">This page is not available on mobile and tablet device</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { EmailEditor } from 'vue-email-editor';
//#region QuyenNC ( toast ejs )
const {$ej2ToastMessage} = useNuxtApp(); 
const notificationToast = ref(null);
const showToastMessage = (type, message) => {
    notificationToast.value.show(
      $ej2ToastMessage.message({
        type: type,
        customContent: message
      }));
}
//#endregion

// Configuration data
const config = useRuntimeConfig()
const minHeight = '100%';
const locale = 'en';
const projectId = 277179;
const isHiddenBrand = ref(false)
const tools = {
  text: { enabled: true },
  button: { enabled: true },
  image: { enabled: true },
};
const options = {
  id: 'editors',
  projectId: 277179,
  displayMode: 'email',
  defaultDevice: 'desktop',
  devices: ['desktop', 'mobile'],
  tabs: { dev: { enabled: false } },
  user: { id: 1 },
  features: { branding: { enabled: false } },
};
const appearance = {
  theme: 'light',
  panels: { tools: { dock: 'right' } },
};

// Reactive variables
const emailEditor = ref(null);
const showImportModal = ref(false);
const showSaveModal = ref(false);
const showImportJsonModal = ref(false);
const showHtmlModal = ref(false);
const showJsonModal = ref(false);
const showTestEmailModal = ref(false);
const showImportMenu = ref(false);
const showViewMenu = ref(false);
const savedDesigns = ref([]);
const newDesignName = ref('');
const designType = ref('emailTemplate');
const jsonInput = ref('');
const htmlOutput = ref('');
const jsonOutput = ref('');
const testEmailTo = ref('');
const testEmailSubject = ref('');
const testEmailCampaign = ref('Test Campaign');

// Load saved designs
const loadSavedDesigns = async () => {
  try {
    const result = await $fetch(`${config.public.apiBase}/template-design/list`, {
        method: 'GET',
      });
    savedDesigns.value = result.data;
  } catch (error) {
    console.error('Error loading designs from Server:', error);
    savedDesigns.value = [];
  }
};

const activeTab = ref('emailTemplate');
// Lọc và đảo ngược savedDesigns theo type
const emailTemplates = computed(() => {
  return [...savedDesigns.value]
    .filter(design => design.type === 'emailTemplate')
    .reverse();
});

const landingPages = computed(() => {
  return [...savedDesigns.value]
    .filter(design => design.type === 'landingPage')
    .reverse();
});

const deleteDesign = async (_id) => {
  try {
    const result = await $fetch(`${config.public.apiBase}/template-design/delete-design`, {
      method: 'DELETE',
      body: { _id },
    });
    await loadSavedDesigns();
    showToastMessage('success', 'Design deleted successfully!');
  } catch (error) {
    console.error('Error deleting design from Server:', error);
    showToastMessage('error', 'Failed to delete design. Please try again.');
  }
};

// Methods
const editorLoaded = () => {
  console.log('Editor Loaded');
};

const editorReady = () => {
  isHiddenBrand.value = true
};

const toggleImportMenu = () => {
  showImportMenu.value = !showImportMenu.value;
  showViewMenu.value = false;
};

const toggleViewMenu = () => {
  showViewMenu.value = !showViewMenu.value;
  showImportMenu.value = false;
};

const saveDesign = async (name, type = designType.value, _id = null) => {
  if (!name) {
    showToastMessage('error', 'Please enter a design name');
    return;
  }
  
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
      designType.value = 'emailTemplate';
      showSaveModal.value = false;
      showToastMessage('success', `Design "${name}" (${type}) saved successfully!`);
      await loadSavedDesigns(); // Refresh the list after saving
    } catch (error) {
      showToastMessage('error', 'Failed to save design. Please try again.');
    }
  });
};

// Updated method to handle updating an existing design
const updateExistingDesign = (existingDesign) => {
  const name = newDesignName.value || existingDesign.name; // Use new name if provided, else keep existing
  const type = designType.value; // Use the selected type from the modal
  saveDesign(name, type, existingDesign._id); // Pass _id for update
};

const exportHtml = () => {
  emailEditor.value?.editor.exportHtml((data) => {
    console.log(data.html);
  });
};

const viewJson = () => {
  showViewMenu.value = false
  emailEditor.value?.editor.saveDesign((design) => {
    try {
      jsonOutput.value = JSON.stringify(design, null, 2);
      showJsonModal.value = true;
    } catch (error) {
      showToastMessage('error', 'Failed to create JSON. Please try again.');
    }
  });
};

const copyJsonToClipboard = () => {
  try {
    navigator.clipboard.writeText(jsonOutput.value).then(() => {
      showToastMessage('success', 'JSON copied to clipboard!');
    }).catch(() => {
      showToastMessage('error', 'Failed to copy JSON to clipboard.');
    });
  } catch (error) {
    showToastMessage('error', 'Failed to copy JSON to clipboard.');
  }
};

const importDesign = (design) => {
  try {
    if (!design || !design.design || typeof design.design !== 'object') {
      throw new Error('Invalid design format');
    }
    const cleanDesign = JSON.parse(JSON.stringify(design.design));
    emailEditor.value?.editor.loadDesign(cleanDesign, (error) => {
      if (error) {
        showToastMessage('error', 'Failed to load design. Design may be corrupted.');
      } 
    });
    newDesignName.value = design.name;
    designType.value = design.type;
    showImportModal.value = false;
  } catch (error) {
    showToastMessage('error', 'Failed to import design. Please select a valid design.');
  }
};

const importJsonDesign = () => {
  try {
    if (!jsonInput.value) {
      showToastMessage('error', 'Please paste a valid JSON design.');
      return;
    }
    const parsedDesign = JSON.parse(jsonInput.value);
    if (typeof parsedDesign !== 'object') {
      throw new Error('Invalid JSON format');
    }
    emailEditor.value?.editor.loadDesign(parsedDesign, (error) => {
      if (error) {
        showToastMessage('error', 'Failed to load JSON design. Design may be corrupted.');
      } else {
        showToastMessage('success', 'JSON design imported successfully!');
      }
    });
    showImportJsonModal.value = false;
    jsonInput.value = '';
  } catch (error) {
    showToastMessage('error', 'Failed to import JSON design. Please ensure JSON is valid.');
  }
};

const viewHtml = () => {
  showViewMenu.value = false
  emailEditor.value?.editor.exportHtml((data) => {
    try {
      htmlOutput.value = data.html;
      showHtmlModal.value = true;
    } catch (error) {
      showToastMessage('error', 'Failed to create HTML. Please try again.');
    }
  });
};

const copyHtmlToClipboard = () => {
  try {
    navigator.clipboard.writeText(htmlOutput.value).then(() => {
      showToastMessage('success', 'HTML copied to clipboard!');
    }).catch(() => {
      showToastMessage('error', 'Failed to copy HTML to clipboard.');
    });
  } catch (error) {
    showToastMessage('error', 'Failed to copy HTML to clipboard.');
  }
};

const openSendEmailTest = () => {
  emailEditor.value?.editor.exportHtml((data) => {
    try {
      htmlOutput.value = data.html;
      showTestEmailModal.value = true;
    } catch (error) {
      showToastMessage('error', 'Failed to create HTML. Please try again.');
    }
  });
};

const sendTestEmail = async () => {
  if (!testEmailTo.value || !testEmailSubject.value || !testEmailCampaign.value) {
    showToastMessage('error', 'Please fill in all required fields: email, subject, campaign, and design.');
    return;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(testEmailTo.value)) {
    showToastMessage('error', 'Please enter a valid email address.');
    return;
  }
  try {
    const response = await $fetch(`${config.public.apiBase}/email/send-test-email`, {
      method: 'POST',
      body: {
        to: testEmailTo.value,
        subject: testEmailSubject.value,
        htmlContent: htmlOutput.value,
        campaign: testEmailCampaign.value,
        nameQueue: 'TestEmailQueue',
      },
      onResponseError({ response }) {
        console.error('Lỗi fetch:', response.status, response.statusText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      },
    });

    if (response.result) {
      showToastMessage('success', 'Test email sent successfully!');
    } else {
      showToastMessage('error', response.message || 'Failed to send test email.');
    }

    showTestEmailModal.value = false;
    testEmailTo.value = '';
    htmlOutput.value = '';
    testEmailSubject.value = '';
    testEmailCampaign.value = 'Test Campaign';
  } catch (error) {
    console.error('Error in sendTestEmail:', error);
    showToastMessage('error', 'Failed to send test email: ' + error.message);
  }
};

// Lifecycle hooks
onMounted(() => {
  loadSavedDesigns();
  document.addEventListener('click', closeMenus);
});

onUnmounted(() => {
  document.removeEventListener('click', closeMenus);
});

const closeMenus = (event) => {
  if (!event.target.closest('.relative')) {
    showImportMenu.value = false;
    showViewMenu.value = false;
  }
};

// Expose methods
defineExpose({
  saveDesign,
  exportHtml,
  viewJson,
  importDesign,
  importJsonDesign,
  viewHtml,
  copyHtmlToClipboard,
  copyJsonToClipboard,
  sendTestEmail
});
</script>

<style lang="scss">
#editors {
  background-color: #222222 !important;
}
</style>