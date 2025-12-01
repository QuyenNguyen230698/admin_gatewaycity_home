<template>
  <div class="drawer-side z-50">
    <label @click="close" aria-label="close sidebar" class="drawer-overlay"></label>
    <div class="menu p-0 m-0 flex min-h-screen w-3/4 lg:w-2/5 bg-base-200 text-base-content">
      <div class="w-full flex flex-col h-screen overflow-y-auto">
        <!-- Header -->
        <div class="sticky top-0 z-10 bg-base-200 w-full px-10 mx-auto flex justify-between items-center py-4">
            <h2 class="font-bold text-xl uppercase text-blue-500">Events Information</h2>
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
                    <h3 class="text-lg font-semibold mb-4">Basic News Information</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="col-span-2">
                            <label class="block text-sm font-medium mb-2">
                                Banner <span class="text-error">*</span>
                            </label>
                            <input v-model="formEvents.src" type="text" 
                                placeholder="Enter URL path..." 
                                class="w-full px-3 py-2 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                                required />
                        </div>
                        <div class="col-span-2">
                            <label class="block text-sm font-medium mb-2">
                                Title <span class="text-error">*</span>
                            </label>
                            <input v-model="formEvents.title" type="text" 
                                placeholder="Enter page title..." 
                                class="w-full px-3 py-2 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                                required />
                        </div>
                        <div class="col-span-2">
                            <label class="block text-sm font-medium mb-2">
                                Description <span class="text-error">*</span>
                            </label>
                            <textarea v-model="formEvents.description" 
                                placeholder="Enter page description..." 
                                rows="3"
                                class="w-full px-3 py-2 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"></textarea>
                        </div>
                        <div class="col-span-2 md:col-span-1 hidden">
                            <label class="block text-sm font-medium mb-2">
                                Type <span class="text-error">*</span>
                            </label>
                            <select v-model="formEvents.type" 
                                class="w-full text-xs px-3 py-2 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';

const eventStore = useEventStore()
const isSaving = ref(false);

const receiveEvent = computed(() => eventStore.getEvent);

const formEvents = ref({
  title: '',
  description: '',
  type: 'EVENTS',
  src: '',
  content: '',
})

watch(receiveEvent, (newValue) => {
  if (newValue) {
    formEvents.value = {
      title: newValue.title || '',
      description: newValue.description || '',
      type: newValue.type || 'EVENTS',
      src: newValue.src || '',
      content: newValue.content || ''
    };
  }
}, { immediate: true });

const clearForm = () => {
  formEvents.value = {
    title: '',
    description: '',
    type: 'EVENTS',
    src: '',
    content: ''
  };
  // Reset store
  eventStore.reset();
};

const htmlOutput = computed(() => {
  if (formEvents.value.content) {
    return formEvents.value.content;
  }
  return '';
})

function convertUnlayerToHtml(json) {
  // Hàm hỗ trợ để tạo inline style từ object values
  const generateStyles = (values, numColumns) => {
    const styles = [];
    // Tính toán chiều rộng cột dựa trên số lượng cột
    if (numColumns === 1) {
      styles.push('width: 100%;');
    } else if (numColumns === 2) {
      styles.push('width: 50%; float: left; box-sizing: border-box;');
    } else if (numColumns === 3) {
      styles.push('width: 33.33%; float: left; box-sizing: border-box;');
    } else if (numColumns === 4) {
      styles.push('width: 25%; float: left; box-sizing: border-box;');
    }
    if (values.backgroundColor) styles.push(`background-color: ${values.backgroundColor};`);
    if (values.padding) styles.push(`padding: ${values.padding};`);
    if (values.border) {
      if (values.border.borderTopWidth) styles.push(`border-top: ${values.border.borderTopWidth} ${values.border.borderTopStyle};`);
      if (values.border.borderLeftWidth) styles.push(`border-left: ${values.border.borderLeftWidth} ${values.border.borderLeftStyle};`);
      if (values.border.borderRightWidth) styles.push(`border-right: ${values.border.borderRightWidth} ${values.border.borderRightStyle};`);
      if (values.border.borderBottomWidth) styles.push(`border-bottom: ${values.border.borderBottomWidth} ${values.border.borderBottomStyle};`);
    }
    if (values.borderRadius) styles.push(`border-radius: ${values.borderRadius};`);
    return styles.join(' ');
  };

  // Hàm hỗ trợ để tạo style cho nội dung
  const generateContentStyles = (values) => {
    const styles = [];
    // Thay đổi fontFamily
    let fontFamily = values.fontFamily?.value || '';
    if (fontFamily.includes('Montserrat')) {
      fontFamily = "'Geoform-regular',sans-serif";
    } else if (fontFamily.includes('Lato')) {
      fontFamily = "'Quicksand',sans-serif";
    }
    if (fontFamily) styles.push(`font-family: ${fontFamily};`);
    if (values.fontSize) styles.push(`font-size: ${values.fontSize};`);
    if (values.fontWeight) styles.push(`font-weight: ${values.fontWeight};`);
    if (values.textAlign) styles.push(`text-align: ${values.textAlign};`);
    if (values.lineHeight) styles.push(`line-height: ${values.lineHeight};`);
    if (values.containerPadding) styles.push(`padding: ${values.containerPadding};`);
    return styles.join(' ');
  };

  // Hàm loại bỏ thẻ <span> và giữ lại nội dung bên trong
  const removeSpanTags = (text) => {
    return text.replace(/<span>(.*?)<\/span>/g, '$1');
  };

  // Bắt đầu tạo HTML
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @import url('https://fonts.googleapis.com/css?family=Georama:100,700');
        @import url('https://fonts.googleapis.com/css?family=Quicksand:100,700');
        body { margin: 0; padding: 0; background-color: #FFFFFF; }
        .u_row { width: 100% ; margin: 0 auto; overflow: hidden; }
        .u_column { box-sizing: border-box; }
        img { max-width: 100%; height: auto; }
      </style>
    </head>
    <body>
  `;

  // Duyệt qua các rows
  json.body.rows.forEach(row => {
    const numColumns = row.cells.length;
    html += `<div class="u_row" style="${generateStyles(row.values)}">`;
    // Duyệt qua các columns trong row
    row.columns.forEach(column => {
      html += `<div class="u_column" style="${generateStyles(column.values, numColumns)}">`;
      // Duyệt qua các contents trong column
      column.contents.forEach(content => {
        if (content.type === 'text') {
          html += `<div class="u_content_text" style="${generateContentStyles(content.values)}">${content.values.text}</div>`;
        } else if (content.type === 'heading') {
          // Loại bỏ thẻ <span> khỏi nội dung tiêu đề
          const cleanedText = removeSpanTags(content.values.text);
          html += `<${content.values.headingType} class="u_content_heading" style="${generateContentStyles(content.values)}">${cleanedText}</${content.values.headingType}>`;
        } else if (content.type === 'image') {
          html += `<div class="u_content_image" style="${generateContentStyles(content.values)}"><img src="${content.values.src.url}" alt="${content.values.altText}" style="display: block; margin: 0 auto;"></div>`;
        }
      });
      html += `</div>`;
    });
    html += `</div>`;
  });

  html += `
    </body>
    </html>
  `;
  return html;
}

const close = () => {
  eventStore.closeEventManually();
  clearForm();
};

const saveInformation = () => {
  eventStore.closeEventManually();
  clearForm();
};

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