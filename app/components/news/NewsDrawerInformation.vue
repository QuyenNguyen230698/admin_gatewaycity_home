<template>
  <div class="drawer-side z-50">
    <label @click="close" aria-label="close sidebar" class="drawer-overlay"></label>
    <div class="menu p-0 m-0 flex min-h-screen w-3/4 lg:w-2/5 bg-base-200 text-base-content">
      <div class="flex flex-col h-screen overflow-y-auto">
        <!-- Header -->
        <div class="sticky top-0 bg-base-200 w-full px-10 mx-auto z-10 flex justify-between items-center py-4">
            <h2 class="font-bold text-xl uppercase text-blue-500">News & Events Information</h2>
            <span @click="close" class="btn btn-lg btn-circle btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </span>
        </div>

        <div class="max-w-4xl px-10 mx-auto w-full">
            <div class="space-y-8 w-full">
                <!-- Basic News Section -->
                <div class="bg-white/5 w-full">
                    <h3 class="text-lg font-semibold mb-4">Basic News & Events Information</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="col-span-2">
                            <label class="block text-sm font-medium mb-2">
                                Banner <span class="text-error">*</span>
                            </label>
                            <input v-model="formNews.src" type="text" 
                                placeholder="Enter URL path..." 
                                class="w-full px-3 py-2 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                                required />
                        </div>
                        <div class="col-span-2">
                            <label class="block text-sm font-medium mb-2">
                                Title <span class="text-error">*</span>
                            </label>
                            <input v-model="formNews.title" type="text" 
                                placeholder="Enter page title..." 
                                class="w-full px-3 py-2 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                                required />
                        </div>
                        <div class="col-span-2">
                            <label class="block text-sm font-medium mb-2">
                                Description <span class="text-error">*</span>
                            </label>
                            <textarea v-model="formNews.description" 
                                placeholder="Enter page description..." 
                                rows="3"
                                class="w-full px-3 py-2 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"></textarea>
                        </div>
                        <div class="col-span-2 md:col-span-1">
                            <label class="block text-sm font-medium mb-2">
                            Content <span class="text-error">*</span>
                            </label>
                            <select v-model="selectedTemplateId" 
                                    @change="updateBlogContent"
                                    class="w-full px-3 py-2 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                            <option value="">Select Template</option>
                            <option v-for="template in templates" :key="template._id" :value="template._id" class="truncate">({{ template.type }}) {{ template.name }}</option>
                            </select>
                        </div>
                        <div class="col-span-2 md:col-span-1">
                            <label class="block text-sm font-medium mb-2">
                                Type <span class="text-error">*</span>
                            </label>
                            <select v-model="formNews.type" 
                                class="w-full px-3 py-2 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                                <option value="">Select Type</option>
                                <option value="NEWS">NEWS</option>
                                <option value="EVENTS">EVENTS</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-html="htmlOutput"></div>

        <div class="sticky bottom-0 bg-base-200 w-full px-10 mx-auto z-10 flex gap-2 items-center justify-center py-4">
            <button @click="close" class="w-1/2 py-1 border border-blue-700 hover:bg-blue-700 hover:text-white duration-300 transition-all rounded">Cancel</button>
            <button @click="saveInformation" class="w-1/2 py-1 border border-white hover:border-blue-700 hover:bg-white hover:text-black bg-blue-700 text-white duration-300 transition-all rounded">Save</button>
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
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';

const informationStore = useInformationStore();
const config = useRuntimeConfig()
const isSaving = ref(false);
const selectedTemplateId = ref("");
const templates = ref([]);

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

const receiveInformation = computed(() => informationStore.getInformation);

const formNews = ref({
  _id: '',
  title: '',
  description: '',
  type: '',
  src: '',
  content: {},
})

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
  // Reset store
  informationStore.reset();
};

const htmlOutput = computed(() => {
  const design = formNews.value?.content?.design;
  
  // Bảo vệ: nếu không có design → trả về HTML trống hoặc placeholder
  if (!design || !design.body || !Array.isArray(design.body.rows)) {
    return `
      <!DOCTYPE html>
      <html><body>
        <div style="padding: 40px; text-align: center; color: #999; font-family: sans-serif;">
          Không có nội dung để hiển thị
        </div>
      </body></html>
    `;
  }

  return convertUnlayerToHtml(design);
});
function convertUnlayerToHtml(json) {
  // Đảm bảo json hợp lệ (phòng trường hợp vẫn bị undefined do lỗi khác)
  if (!json || !json.body || !Array.isArray(json.body.rows)) {
    console.warn('Invalid Unlayer JSON structure:', json);
    return '<!DOCTYPE html><html><body><p>Nội dung không hợp lệ</p></body></html>';
  }

  const generateStyles = (values, numColumns) => {
    const styles = [];
    if (numColumns === 1) styles.push('width: 100%;');
    else if (numColumns === 2) styles.push('width: 50%; float: left; box-sizing: border-box;');
    else if (numColumns === 3) styles.push('width: 33.33%; float: left; box-sizing: border-box;');
    else if (numColumns === 4) styles.push('width: 25%; float: left; box-sizing: border-box;');

    if (values.backgroundColor) styles.push(`background-color: ${values.backgroundColor};`);
    if (values.padding) styles.push(`padding: ${values.padding};`);
    if (values.borderRadius) styles.push(`border-radius: ${values.borderRadius};`);
    
    // Xử lý border an toàn hơn
    if (values.border) {
      const b = values.border;
      if (b.borderTopWidth) styles.push(`border-top: ${b.borderTopWidth} ${b.borderTopStyle || 'solid'} ${b.borderTopColor || '#000'};`);
      if (b.borderLeftWidth) styles.push(`border-left: ${b.borderLeftWidth} ${b.borderLeftStyle || 'solid'} ${b.borderLeftColor || '#000'};`);
      if (b.borderRightWidth) styles.push(`border-right: ${b.borderRightWidth} ${b.borderRightStyle || 'solid'} ${b.borderRightColor || '#000'};`);
      if (b.borderBottomWidth) styles.push(`border-bottom: ${b.borderBottomWidth} ${b.borderBottomStyle || 'solid'} ${b.borderBottomColor || '#000'};`);
    }

    return styles.join(' ');
  };

  const generateContentStyles = (values) => {
    const styles = [];
    const fontFamily = values.fontFamily?.value || values.fontFamily || '';
    if (fontFamily) styles.push(`font-family: ${fontFamily};`);
    if (values.fontSize) styles.push(`font-size: ${values.fontSize};`);
    if (values.fontWeight) styles.push(`font-weight: ${values.fontWeight};`);
    if (values.textAlign) styles.push(`text-align: ${values.textAlign};`);
    if (values.lineHeight) styles.push(`line-height: ${values.lineHeight};`);
    if (values.containerPadding) styles.push(`padding: ${values.containerPadding};`);
    if (values.color) styles.push(`color: ${values.color};`);
    return styles.join(' ');
  };

  const removeSpanTags = (text = '') => {
    return text.replace(/<span[^>]*>(.*?)<\/span>/g, '$1');
  };

  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Georama:wght@100;400;700&family=Quicksand:wght@300;400;700&display=swap');
        body { margin: 0; padding: 0; background-color: #FFFFFF; }
        .u_row { width: 100%; margin: 0 auto; overflow: hidden; clear: both; }
        .u_column { box-sizing: border-box; float: left; }
        img { max-width: 100%; height: auto; display: block; }
        table { border-collapse: collapse; width: 100%; }
      </style>
    </head>
    <body>
  `;

  try {
    json.body.rows.forEach(row => {
      const numColumns = Array.isArray(row.cells) ? row.cells.length : 1;
      html += `<div class="u_row" style="${generateStyles(row.values || {}, numColumns)}">`;

      (row.columns || []).forEach(column => {
        html += `<div class="u_column" style="${generateStyles(column.values || {}, numColumns)}">`;

        (column.contents || []).forEach(content => {
          if (content.type === 'text') {
            const text = (content.values?.text || '').replace(/<span[^>]*>/g, '').replace(/<\/span>/g, '');
            html += `<div style="${generateContentStyles(content.values || {})}">${text}</div>`;
          }
          else if (content.type === 'heading') {
            const tag = content.values?.headingType || 'h2';
            const cleanedText = removeSpanTags(content.values?.text || '');
            html += `<${tag} style="${generateContentStyles(content.values || {})}">${cleanedText}</${tag}>`;
          }
          else if (content.type === 'image') {
            const src = content.values?.src?.url || '';
            const alt = content.values?.altText || 'Image';
            html += `<div style="${generateContentStyles(content.values || {})}">
              <img src="${src}" alt="${alt}" style="width: 100%; height: auto; display: block;">
            </div>`;
          }
        });

        html += `</div>`;
      });

      html += `</div><div style="clear: both;"></div>`;
    });
  } catch (err) {
    console.error('Error rendering Unlayer HTML:', err);
    html += `<p style="color: red; padding: 20px;">Lỗi hiển thị nội dung</p>`;
  }

  html += `
    </body>
    </html>
  `;

  return html;
}

const close = () => {
  informationStore.closeInformationManually();
  clearForm();
};

// Hàm gọi API để lấy danh sách template
const fetchTemplates = async () => {
  try {
    const response = await $fetch(`${config.public.apiBase}/template-design/list`, {
      method: 'GET',
    });
    templates.value = response.data; // Lưu dữ liệu từ response.data
  } catch (error) {
    console.error('Lỗi khi lấy danh sách template:', error);
  }
};

// Hàm cập nhật blogs.content dựa trên template được chọn
const updateBlogContent = () => {
  const selectedTemplate = templates.value.find(
    template => template._id === selectedTemplateId.value
  );
  formNews.value.content = selectedTemplate ? { ...selectedTemplate } : {};
};

// Theo dõi blogs.content để cập nhật selectedTemplateId khi dữ liệu thay đổi
watch(
  () => formNews.value.content,
  (newContent) => {
    if (newContent && newContent._id && templates.value.length > 0) {
      const matchedTemplate = templates.value.find(
        template => template._id === newContent._id
      );
      selectedTemplateId.value = matchedTemplate ? newContent._id : '';
    } else {
      selectedTemplateId.value = '';
    }
  },
  { deep: true }
);

const validateForms = () => {
  if (!formNews.value.title) {
    showMessageToast('error', 'Please enter a title');
    return false;
  }
  if (!formNews.value.description) {
    showMessageToast('error', 'Please enter a description');
    return false;
  }
  if (!formNews.value.type) {
    showMessageToast('error', 'Please enter a type');
    return false;
  }
  if (!formNews.value.src) {
    showMessageToast('error', 'Please enter a Banner');
    return false;
  }
  if (!formNews.value.content) {
    showMessageToast('error', 'Please enter a content');
    return false;
  }
  return true;
}

const saveInformation = async () => {
  if (!validateForms()) return;
  try {
    const response = await $fetch(`${config.public.apiBase}/newandevents/createorupdate`, {
      method: 'POST',
      body: formNews.value,
    });
    showMessageToast('success', 'Save News & Events successfully');
    clearForm();
  } catch (error) {
    console.error('Lỗi khi lưu thông tin:', error);
    showMessageToast('error', 'Save News & Events failed');
  }
}

onMounted(fetchTemplates);

</script>

<style scoped lang="scss">
.drawer-side {
  transition: all 0.7s ease-in-out;
}

.menu {
  transition: transform 0.7s ease-in-out;
}

.shadow-t {
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.transition-text {
  transition: all 0.5s ease-in-out;
}

</style>
