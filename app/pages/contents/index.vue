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
                      class="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 transition-all duration-200 shadow-sm"
                      @click="toggleImportMenu"
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                      </svg>
                      Import
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                  </button>
                  <div 
                      v-if="showImportMenu"
                      class="absolute left-0 mt-2 w-48 bg-white border border-olive-200 rounded-md shadow-lg z-40"
                  >
                      <button 
                          @click="showImportModal = true; showImportMenu = false"
                          class="w-full flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-sand-100 transition-all duration-200"
                      >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
                          </svg>
                          Import Design
                      </button>
                      <!-- <button 
                          @click="showImportJsonModal = true; showImportMenu = false"
                          class="w-full flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-sand-100 transition-all duration-200"
                      >
                          <i class="bi bi-filetype-json"></i> Import JSON
                      </button> -->
                  </div>
              </div>

              <!-- Dropdown for View Actions -->
              <!-- <div class="relative">
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
              </div> -->
              <!-- <button 
                  @click="openSendEmailTest"
                  class="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-300 transition-all duration-200 shadow-sm"
              >
                  <i class="bi bi-envelope"></i> Test Email
              </button> -->
              </div>
              <button 
                  @click="showSaveModal = true"
                  class="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 transition-all duration-200 shadow-sm"
              >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
              </svg>
                  Save
              </button>
              
          </div>
          <div class="divider divider-horizontal"></div>
          <div class="flex w-fit h-full grow place-items-center  items-center justify-center">
            <label for="media_library" class="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
              </svg>
            </label>
          </div>
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
          <div class="relative z-40">
            <MediaDrawer  />
          </div>
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
                <!-- <button 
                  class="px-4 py-2 text-sm font-medium"
                  :class="activeTab === 'emailTemplate' ? 'border-b-2 border-indigo-600 text-black' : 'text-olive-900'"
                  @click="activeTab = 'emailTemplate'"
                >
                  Email Template
                </button> -->
                <button 
                  class="px-4 py-2 text-sm font-medium"
                  :class="activeTab === 'landingPage' ? 'border-b-2 border-indigo-600 text-black' : 'text-olive-900'"
                  @click="activeTab = 'landingPage'"
                >
                  Landing Page
                </button>
              </div>
              <!-- <div v-if="activeTab === 'emailTemplate'" class="max-h-96 overflow-y-auto mb-6 border border-sand-200 rounded bg-sand-50">
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
              </div> -->
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
                    <svg @click="deleteDesign(design._id)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-olive-900 hover:text-red-700 ml-4 cursor-pointer">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

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
      <!-- <div v-if="showImportJsonModal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-6 z-50">
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
      </div> -->

      <!-- View HTML Modal -->
      <!-- <div v-if="showHtmlModal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-6 z-50">
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
      </div> -->

      <!-- View JSON Modal -->
      <!-- <div v-if="showJsonModal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-6 z-50">
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
      </div> -->

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
                      Save
                  </button>
                  <button 
                      @click="showSaveModal = false" 
                      class="flex items-center gap-2 px-4 py-2 bg-slate-200 text-black text-sm font-medium rounded hover:bg-slate-300 focus:ring-2 focus:ring-slate-100 transition-all duration-200"
                  >
                      Close
                  </button>
              </div>
          </div>
      </div>

      <!-- Send Test Email Modal -->
      <!-- <div v-if="showTestEmailModal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-6 z-50">
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
      </div> -->

      <!-- Media Library toast -->
      <ToastMessage
        ref="toastRef"
        :typeToast="currentToastType"
        :message="toastMessage"
        :show="showToast"
        :width="`w-2/3 lg:w-fit`"
        class="z-40"
      />
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
//#region QuyenNC ( toast )
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
const designType = ref('landingPage');
const jsonInput = ref('');
const htmlOutput = ref('');
const jsonOutput = ref('');
const testEmailTo = ref('');
const testEmailSubject = ref('');
const testEmailCampaign = ref('Test Campaign');

// Load saved designs
const loadSavedDesigns = async () => {
  try {
    const result = await $fetch(`${config.public.apiBase}/template-design/grid`, {
        method: 'POST',
        body: {
          sorted: [
            { name: 'createdAt', direction: 'descending' }
          ]
        }
      });
    savedDesigns.value = result.result;
  } catch (error) {
    console.error('Error loading designs from Server:', error);
    savedDesigns.value = [];
  }
};

const activeTab = ref('landingPage');
// Lọc và đảo ngược savedDesigns theo type
const emailTemplates = computed(() => {
  return [...savedDesigns.value]
    .filter(design => design.type === 'emailTemplate')
});

const landingPages = computed(() => {
  return [...savedDesigns.value]
    .filter(design => design.type === 'landingPage')
});

const deleteDesign = async (_id) => {
  try {
    const result = await $fetch(`${config.public.apiBase}/template-design/delete-design`, {
      method: 'DELETE',
      body: { _id },
    });
    await loadSavedDesigns();
    showMessageToast('success', 'Design deleted successfully!');
  } catch (error) {
    console.error('Error deleting design from Server:', error);
    showMessageToast('error', 'Failed to delete design. Please try again.');
  }
};

// Methods
const editorLoaded = () => {
  console.log('Editor Loaded');
};

const editorReady = () => {
  isHiddenBrand.value = true
};

const saveDesign = async (name, type = designType.value, _id = null) => {
  if (!name) {
    showMessageToast('error', 'Please enter a design name');
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
      designType.value = 'landingPage';
      showSaveModal.value = false;
      showMessageToast('success', `Design "${name}" (${type}) saved successfully!`);
      await loadSavedDesigns(); // Refresh the list after saving
    } catch (error) {
      showMessageToast('error', 'Failed to save design. Please try again.');
    }
  });
};

// Updated method to handle updating an existing design
const updateExistingDesign = (existingDesign) => {
  const name = newDesignName.value || existingDesign.name; // Use new name if provided, else keep existing
  const type = designType.value; // Use the selected type from the modal
  saveDesign(name, type, existingDesign._id); // Pass _id for update
};

const toggleImportMenu = () => {
  showImportMenu.value = !showImportMenu.value;
  showViewMenu.value = false;
};

const toggleViewMenu = () => {
  showViewMenu.value = !showViewMenu.value;
  showImportMenu.value = false;
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
      showMessageToast('error', 'Failed to create JSON. Please try again.');
    }
  });
};

const copyJsonToClipboard = () => {
  try {
    navigator.clipboard.writeText(jsonOutput.value).then(() => {
      showMessageToast('success', 'JSON copied to clipboard!');
    }).catch(() => {
      showMessageToast('error', 'Failed to copy JSON to clipboard.');
    });
  } catch (error) {
    showMessageToast('error', 'Failed to copy JSON to clipboard.');
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
        showMessageToast('error', 'Failed to load design. Design may be corrupted.');
      } 
    });
    newDesignName.value = design.name;
    designType.value = design.type;
    showImportModal.value = false;
  } catch (error) {
    showMessageToast('error', 'Failed to import design. Please select a valid design.');
  }
};

const importJsonDesign = () => {
  try {
    if (!jsonInput.value) {
      showMessageToast('error', 'Please paste a valid JSON design.');
      return;
    }
    const parsedDesign = JSON.parse(jsonInput.value);
    if (typeof parsedDesign !== 'object') {
      throw new Error('Invalid JSON format');
    }
    emailEditor.value?.editor.loadDesign(parsedDesign, (error) => {
      if (error) {
        showMessageToast('error', 'Failed to load JSON design. Design may be corrupted.');
      } else {
        showMessageToast('success', 'JSON design imported successfully!');
      }
    });
    showImportJsonModal.value = false;
    jsonInput.value = '';
  } catch (error) {
    showMessageToast('error', 'Failed to import JSON design. Please ensure JSON is valid.');
  }
};

const viewHtml = () => {
  showViewMenu.value = false
  emailEditor.value?.editor.exportHtml((data) => {
    try {
      htmlOutput.value = data.html;
      showHtmlModal.value = true;
    } catch (error) {
      showMessageToast('error', 'Failed to create HTML. Please try again.');
    }
  });
};

const copyHtmlToClipboard = () => {
  try {
    navigator.clipboard.writeText(htmlOutput.value).then(() => {
      showMessageToast('success', 'HTML copied to clipboard!');
    }).catch(() => {
      showMessageToast('error', 'Failed to copy HTML to clipboard.');
    });
  } catch (error) {
    showMessageToast('error', 'Failed to copy HTML to clipboard.');
  }
};

const openSendEmailTest = () => {
  emailEditor.value?.editor.exportHtml((data) => {
    try {
      htmlOutput.value = data.html;
      showTestEmailModal.value = true;
    } catch (error) {
      showMessageToast('error', 'Failed to create HTML. Please try again.');
    }
  });
};

const sendTestEmail = async () => {
  if (!testEmailTo.value || !testEmailSubject.value || !testEmailCampaign.value) {
    showMessageToast('error', 'Please fill in all required fields: email, subject, campaign, and design.');
    return;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(testEmailTo.value)) {
    showMessageToast('error', 'Please enter a valid email address.');
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
      showMessageToast('success', 'Test email sent successfully!');
    } else {
      showMessageToast('error', response.message || 'Failed to send test email.');
    }

    showTestEmailModal.value = false;
    testEmailTo.value = '';
    htmlOutput.value = '';
    testEmailSubject.value = '';
    testEmailCampaign.value = 'Test Campaign';
  } catch (error) {
    console.error('Error in sendTestEmail:', error);
    showMessageToast('error', 'Failed to send test email: ' + error.message);
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