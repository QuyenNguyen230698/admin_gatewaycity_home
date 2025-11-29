<template>
  <div class="drawer-side z-50">
    <label @click="close" aria-label="close sidebar" class="drawer-overlay"></label>
    <div class="menu p-0 m-0 flex min-h-screen w-3/4 lg:w-2/5 bg-base-200 text-base-content">
      <div class="w-full px-10 mx-auto flex flex-col h-screen bg-1414">
        <!-- Header -->
        <div class="sticky top-0 z-10 bg-1414 flex justify-between items-center pt-10 pb-5">
          <h2 class="text-lg md:text-xl lg:text-2xl font-bold flex gap-2 items-center uppercase font-bold-sans text-white">
            Edit Information
          </h2>
          <button @click="close" class="btn btn-ghost btn-circle" aria-label="Close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="white"
              class="size-4 md:size-5 lg:size-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Main Content -->
        <div class="flex-1 overflow-y-auto flex flex-col items-start justify-start gap-6">
            <p>Main Content</p>
        </div>

        <!-- Footer -->
        <div class="sticky bottom-0 z-10 w-full flex justify-between items-center py-5">
            <button @click="close" class="btn btn-ghost btn-sm tooltip tooltip-right" data-tip="Close">
                Close
            </button>
            <button @click="saveInformation" class="btn btn-primary btn-sm tooltip tooltip-right" data-tip="Save">
                Save
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';

const informationStore = useInformationStore();
const config = useAppConfig();
const isSaving = ref(false);

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
  informationStore.closeInformationManually();
};

const saveInformation = () => {
  informationStore.closeInformationManually();
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
