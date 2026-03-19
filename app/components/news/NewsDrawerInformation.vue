<template>
  <div class="flex flex-col h-full bg-white dark:bg-slate-900 overflow-hidden">
    <!-- Header (Optional if parent has one, but we keep our styled one) -->
    <header class="h-20 flex-shrink-0 px-8 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 z-10">
       <div class="flex items-center gap-4">
          <!-- <button @click="close" class="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 font-bold transition-all">✕</button> -->
          <div>
            <h2 class="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 uppercase">Article Editor</h2>
            <p class="text-[10px] font-bold text-primary-500 uppercase tracking-widest leading-none">News & Events Management</p>
          </div>
       </div>
       <div class="flex items-center gap-2">
          <button @click="close" class="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-bold hover:bg-slate-50 hover:text-primary-500 transition-all">Cancel</button>
          <button @click="saveInformation" class="px-8 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-bold hover:shadow-lg shadow-primary-600/20 active:scale-95 transition-all">Save Changes</button>
       </div>
    </header>

    <!-- Scrollable Content -->
    <main class="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-50/30 dark:bg-slate-900/50">
       <div class="space-y-8 max-w-xl mx-auto">
          
          <!-- Form Section -->
          <section class="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm animate-fade-in">
             <div class="space-y-2">
                <label class="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                   Banner URL <span class="text-red-500">*</span>
                </label>
                <input v-model="formNews.src" type="text" placeholder="https://..." 
                   class="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all" />
                <div v-if="formNews.src" class="mt-2 relative aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner">
                   <img :src="formNews.src" class="w-full h-full object-cover" />
                   <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
             </div>

             <div class="space-y-2">
                <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">Article Title <span class="text-red-500">*</span></label>
                <input v-model="formNews.title" type="text" placeholder="Enter headline..." 
                   class="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-bold text-lg" />
             </div>

             <div class="space-y-2">
                <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">Lead / Description <span class="text-red-500">*</span></label>
                <textarea v-model="formNews.description" rows="4" placeholder="Brief summary of the article..." 
                   class="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all text-sm leading-relaxed"></textarea>
             </div>

             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                   <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">Category <span class="text-red-500">*</span></label>
                   <select v-model="formNews.type" class="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all appearance-none cursor-pointer">
                      <option value="">Select Type</option>
                      <option value="NEWS">News Item</option>
                      <option value="EVENTS">Event</option>
                   </select>
                </div>
                <div class="space-y-2">
                   <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">Template <span class="text-red-500">*</span></label>
                   <select v-model="selectedTemplateId" @change="updateBlogContent" class="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all appearance-none cursor-pointer">
                      <option value="">Custom Design</option>
                      <option v-for="template in templates" :key="template._id" :value="template._id">
                         ({{ template.type }}) {{ template.name }}
                      </option>
                   </select>
                </div>
             </div>
          </section>

          <!-- Preview Section -->
          <section v-if="htmlOutput" class="space-y-4">
             <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Live Preview</h3>
             <div class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-2xl p-4">
                <div class="w-full p-px bg-slate-100 rounded-2xl overflow-hidden min-h-[400px]">
                   <div v-html="htmlOutput" class="unlayer-preview"></div>
                </div>
             </div>
          </section>
       </div>
    </main>
    
    <ToastMessage ref="toastRef" :typeToast="currentToastType" :message="toastMessage" :show="showToast" :width="`w-2/3 lg:w-fit`" class="z-[100]" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

const informationStore = useInformationStore();
const config = useRuntimeConfig();
const selectedTemplateId = ref("");
const templates = ref([]);

//#region Toast
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
//#endregion

const receiveInformation = computed(() => informationStore.getInformation);

const formNews = ref({
  _id: '',
  title: '',
  description: '',
  type: '',
  src: '',
  content: {},
});

watch(receiveInformation, (newValue) => {
  if (newValue) {
    formNews.value = {
      _id: newValue._id || '',
      title: newValue.title || '',
      description: newValue.description || '',
      type: newValue.type || '',
      src: newValue.src || '',
      content: newValue.content || {}
    };
  }
}, { immediate: true });

const clearForm = () => {
  formNews.value = {
    _id: '',
    title: '',
    description: '',
    type: '',
    src: '',
    content: {}
  };
  informationStore.reset();
};

const close = () => {
  informationStore.closeInformationManually();
  clearForm();
};

// HTML Conversion Logic (Restored from old logic)
const htmlOutput = computed(() => {
  const design = formNews.value?.content?.design;
  if (!design || !design.body || !Array.isArray(design.body.rows)) {
    return `
      <div style="padding: 40px; text-align: center; color: #999; font-family: sans-serif;">
        Không có nội dung để hiển thị
      </div>
    `;
  }
  return convertUnlayerToHtml(design);
});

function convertUnlayerToHtml(json) {
  if (!json?.body?.rows) return '<html><body>Nội dung không hợp lệ</body></html>';

  const generateRowStyles = (values = {}) => {
    const styles = ['width:100%;clear:both;overflow:hidden;'];
    if (values.backgroundColor) styles.push(`background:${values.backgroundColor};`);
    if (values.padding) styles.push(`padding:${values.padding};`);
    return styles.join('');
  };

  const generateColumnStyles = (values = {}, cols = 1) => {
    const widthMap = { 1: '100%', 2: '50%', 3: '33.33%', 4: '25%', 5: '20%', 6: '16.66%' };
    const styles = ['float:left;', 'box-sizing:border-box;', `width:${widthMap[cols] || '100%'};` ];
    if (values.padding) styles.push(`padding:${values.padding};`);
    if (values.backgroundColor) styles.push(`background:${values.backgroundColor};`);
    return styles.join('');
  };

  const generateContentStyles = (v = {}) => {
    const s = [];
    if (v.fontFamily?.value) s.push(`font-family:${v.fontFamily.value};`);
    if (v.fontSize) s.push(`font-size:${v.fontSize};`);
    if (v.fontWeight) s.push(`font-weight:${v.fontWeight};`);
    if (v.textAlign) s.push(`text-align:${v.textAlign};`);
    if (v.lineHeight) s.push(`line-height:${v.lineHeight};`);
    if (v.containerPadding) s.push(`padding:${v.containerPadding};`);
    if (v.color) s.push(`color:${v.color};`);
    return s.join('');
  };

  const cleanSpan = (html = '') => html.replace(/<span[^>]*>/g, '').replace(/<\/span>/g, '');

  let html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{margin:0;padding:0;background:#fff}img{max-width:100%;display:block}</style></head><body>`;

  json.body.rows.forEach(row => {
    const cols = row.cells?.length || 1;
    html += `<div style="${generateRowStyles(row.values)}">`;
    row.columns?.forEach(col => {
      html += `<div style="${generateColumnStyles(col.values, cols)}">`;
      col.contents?.forEach(c => {
        if (c.type === 'text') html += `<div style="${generateContentStyles(c.values)}">${cleanSpan(c.values.text)}</div>`;
        if (c.type === 'heading') {
          const tag = c.values.headingType || 'h2';
          html += `<${tag} style="${generateContentStyles(c.values)}">${cleanSpan(c.values.text)}</${tag}>`;
        }
        if (c.type === 'image') html += `<img src="${c.values?.src?.url || ''}" style="${generateContentStyles(c.values)}">`;
        if (c.type === 'button') {
          const href = c.values?.href?.values?.href || '#';
          const target = c.values?.href?.values?.target || '_self';
          const colors = c.values.buttonColors || {};
          html += `<div style="text-align:${c.values.textAlign || 'left'};${c.values.containerPadding || ''}"><a href="${href}" target="${target}" style="display:inline-block;background:${colors.backgroundColor || '#000'};color:${colors.color || '#fff'};padding:${c.values.padding || '10px 20px'};border-radius:${c.values.borderRadius || '4px'};text-decoration:none;font-size:${c.values.fontSize || '14px'};">${cleanSpan(c.values.text)}</a></div>`;
        }
      });
      html += `</div>`;
    });
    html += `</div><div style="clear:both"></div>`;
  });
  html += '</body></html>';
  return html;
}

const fetchTemplates = async () => {
  try {
    const response = await $fetch(`${config.public.apiBase}/template-design/list`);
    templates.value = response.data || [];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách template:', error);
  }
};

const updateBlogContent = () => {
  const selectedTemplate = templates.value.find(t => t._id === selectedTemplateId.value);
  formNews.value.content = selectedTemplate ? { ...selectedTemplate } : {};
};

watch(() => formNews.value.content, (newContent) => {
  if (newContent && newContent._id && templates.value.length > 0) {
    const matchedTemplate = templates.value.find(t => t._id === newContent._id);
    selectedTemplateId.value = matchedTemplate ? newContent._id : '';
  } else {
    selectedTemplateId.value = '';
  }
}, { deep: true });

const validateForms = () => {
  if (!formNews.value.title) { showMessageToast('error', 'Please enter a title'); return false; }
  if (!formNews.value.description) { showMessageToast('error', 'Please enter a description'); return false; }
  if (!formNews.value.type) { showMessageToast('error', 'Please enter a type'); return false; }
  if (!formNews.value.src) { showMessageToast('error', 'Please enter a Banner'); return false; }
  if (!formNews.value.content || Object.keys(formNews.value.content).length === 0) { showMessageToast('error', 'Please select a content template'); return false; }
  return true;
};

const saveInformation = async () => {
  if (!validateForms()) return;
  try {
    await $fetch(`${config.public.apiBase}/newandevents/createorupdate`, {
      method: 'POST',
      body: formNews.value,
    });
    showMessageToast('success', 'Save News & Events successfully');
    close();
    // Re-fetch news list if needed (usually handled by the parent)
  } catch (error) {
    showMessageToast('error', 'Save News & Events failed');
  }
};

onMounted(fetchTemplates);
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
.unlayer-preview { font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.6; color: #334155; }
</style>
