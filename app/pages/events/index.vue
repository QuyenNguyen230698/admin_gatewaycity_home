<template>
  <div class="overflow-x-auto bg-base-100 h-full">
    <div class="flex items-center px-6 py-2 border-b border-base-200">
      <button @click="openEditDrawer" class="btn text-xs">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <span>Add News</span>
      </button>
    </div>

    <table class="table table-zebra w-full">
      <thead>
        <tr class="bg-base-200 text-left text-xs uppercase">
          <th class="w-20 text-center">Action</th>
          <th class="w-72">Banner</th>
          <th class="w-72">Title</th>
          <th class="w-72">Description</th>
          <th class="w-36 text-center">Status</th>
          <th class="w-36 text-center">Type</th>
          <th class="w-72">Slug</th>
          <th class="w-72">Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in newsData.reverse()" :key="item._id" class="hover:bg-base-200 transition">
          <!-- Cột 1: Dropdown 3 chấm -->
          <td class="text-center">
            <div class="dropdown dropdown-bottom dropdown-start">
              <label tabindex="0" class="btn btn-ghost btn-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </label>
              <div class="flex flex-col dropdown-content menu z-20 w-24 bg-base-300 p-1 shadow rounded">
                <button @click="openUpdateDrawer(item)" class="hover:bg-stone-300 cursor-pointer py-1 px-3">Update</button>
                <button class="hover:bg-stone-300 cursor-pointer py-1 px-3">Draft</button>
                <button class="hover:bg-stone-300 cursor-pointer py-1 px-3">Delete</button>
              </div>
            </div>
          </td>

          <!-- Cột 2: Hình ảnh (200px) -->
          <td>
            <div class="w-52 overflow-hidden">
              <img :src="item.src" :alt="item.title" class="object-cover w-full h-28" />
            </div>
          </td>

          <!-- Cột 3: Title -->
          <td class="text-xs max-w-xs truncate">{{ item.title }}</td>

          <!-- Cột 4: Description -->
          <td class="text-xs text-base-content/80 truncate max-w-xs">{{ item.description }}</td>

          <!-- Cột 5: Status -->
          <td class="text-center">
            <div class="badge badge-xs" :class="{
              'badge-success': item.status === 'published',
              'badge-warning': item.status === 'drafted',
              'badge-error': item.status === 'archived'
            }">
              {{ item.status.toUpperCase() }}
            </div>
          </td>

          <!-- Cột 6: Type -->
          <td class="text-center">
            <div class="badge badge-outline badge-info badge-xs">
              {{ item.type }}
            </div>
          </td>

          <!-- Cột 7: Slug -->
          <td class="font-mono text-xs text-base-content/70 break-all max-w-xs truncate">
            {{ item.slug }}
          </td>

          <!-- Cột 8: Created At -->
          <td class="text-xs text-nowrap">
            {{ formatDate(item.createdAt) }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Nếu không có dữ liệu -->
    <div v-if="newsData.length === 0" class="text-center py-12 text-gray-500">
      Chưa có tin tức nào.
    </div>
  </div>
      <ToastMessage
      ref="toastRef"
      :typeToast="currentToastType"
      :message="toastMessage"
      :show="showToast"
      :width="`w-2/3 lg:w-fit`"
      class="z-40"
    />
</template>

<script setup>
const eventStore = useEventStore();
  // Toast
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

const newsData = ref([
  {
    _id: '68abd3e98587e969d74a1bbe',
    slug: "su-kien-khoi-cong-trung-tam-thuong-mai-nghin-ti-tai-gateway-city-2",
    src: 'https://res.cloudinary.com/dgkceewlq/image/upload/v1734690254/samples/landscapes/girl-urban-view.jpg',
    type: 'EVENTS',
    status: 'archived',
    createdAt: '2025-08-25T03:09:29.943Z',
    content: '',
    title: 'SỰ KIỆN – KHỞI CÔNG TRUNG TÂM THƯƠNG MẠI “NGHÌN TỈ” TẠI GATEWAY CITY 2',
    description: 'Ngày 2/8/2025, tại khu đô thị Gateway City Vĩnh Long đã diễn ra lễ khởi công Trung tâm Thương mại SenseFesti với tổng vốn đầu tư gần 1.000 tỉ đồng, do Saigon Co.op (SCID) kết hợp cùng Tập đoàn Thành Đô phát triển. Đây sẽ là một trong những tổ hợp mua sắm – giải trí – ẩm thực hiện đại nhất miền Tây, đồng thời là tiện ích thương mại trọng điểm của Gateway City.'
  },
  {
    _id: '68abd3e98587e969d74a1bbe',
    slug: "su-kien-khoi-cong-trung-tam-thuong-mai-nghin-ti-tai-gateway-city",
    src: 'https://res.cloudinary.com/dgkceewlq/image/upload/v1734690255/samples/landscapes/beach-boat.jpg',
    type: 'EVENTS',
    status: 'published',
    createdAt: '2025-08-25T03:09:29.943Z',
    content: "<div style='background-color:#FFFFFF;color:#222222;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'><table role='presentation' style='margin:0 auto;max-width:100%;background-color:#FFFFFF' width='100%' align='center'><tbody><tr style='width:100%'><td><div style='font-weight:normal;padding:16px 0'>With the aim of solidifying its leading position in Vietnam and expanding into international markets, TranDuc participated in Sydney Build Expo 2025, a premier event showcasing advanced and sustainable construction solutions. As a top-tier enterprise in Vietnam, TranDuc presented its high-quality products, including engineered wood solutions, premium doors, and luxury prefabricated housing. TranDuc's participation in the expo underscores the company's commitment to promoting sustainable construction and collaborating with international businesses, particularly in the Australian market, which is experiencing strong growth in environmentally friendly building methods.</div><div style='padding:16px 0'><img class='e-rte-image e-imginline' style='outline:none;border:none;text-decoration:none;vertical-align:middle;display:inline-block;max-width:100%' src='https://imagedelivery.net/-tulz6ZB1FiuYVxo4sc-HQ/262b7ed0-ccf6-412c-5d5a-45acee324d00/2K' alt='Sample product'></div><div style='font-weight:normal;padding:16px 0'>Throughout the three-day event, TranDuc's booth garnered significant attention from a wide range of builders, architects, and developers from various countries. The standout solutions highlighted by TranDuc included:</div><div style='font-weight:normal;padding:16px 0'>Engineered Wood Solutions (Glulam &amp; CLT): TranDuc proudly stands as the first enterprise in Southeast Asia to own a CLT (Cross-Laminated Timber) production line – an advanced technology for producing high-strength, environmentally friendly wood components certified by the FSC. TranDuc's CLT products received high praise for their ability to minimize environmental impact and create sustainable structures.</div><div style='font-weight:normal;padding:16px 0'>Premium Door Solutions: TranDuc's exquisite door products offer superior aesthetics and exceptional performance in sound and thermal insulation. They are an ideal choice for high-end construction projects, meeting stringent international standards.</div><div style='font-weight:normal;padding:16px 0'>Luxury Prefabricated Housing Solutions: TranDuc showcased its range of high-end prefabricated houses, providing a solution that saves construction time and costs while ensuring high quality and aesthetic appeal. These products are a perfect choice for projects requiring high standards of sustainability and comfort.</div><div style='padding:16px 0'><img class='e-rte-image e-imginline' style='outline:none;border:none;text-decoration:none;vertical-align:middle;display:inline-block;max-width:100%' src='https://imagedelivery.net/-tulz6ZB1FiuYVxo4sc-HQ/c882f734-997a-4ad5-978d-cbbb3dbc7200/2K' alt='Sample product'></div><div style='font-weight:normal;padding:16px 0'>Australia is currently a frontrunner in adopting sustainable construction practices. At the expo, TranDuc had valuable opportunities to network and share its advanced building solutions with businesses in Sydney, supporting their journey towards sustainable development. Over the three days of the event, TranDuc's booth not only attracted strong interest from builders, architects, and developers but also fostered potential partnerships, opening doors for long-term growth in the Australian market and the Asia-Pacific region.</div><div style='font-weight:normal;padding:16px 0'>TranDuc is committed to continuously developing innovative and sustainable building solutions that meet stringent quality requirements and environmental protection standards. Participation in Sydney Build Expo 2025 marks a significant step in TranDuc's strategy for international expansion and market leadership. We are proud to bring building solutions that are not only advanced but also contribute to the sustainable development of the global construction industry.</div></td></tr></tbody></table></div>",
    title: 'SỰ KIỆN – KHỞI CÔNG TRUNG TÂM THƯƠNG MẠI “NGHÌN TỈ” TẠI GATEWAY CITY',
    description: 'Ngày 2/8/2025, tại khu đô thị Gateway City Vĩnh Long đã diễn ra lễ khởi công Trung tâm Thương mại SenseFesti với tổng vốn đầu tư gần 1.000 tỉ đồng, do Saigon Co.op (SCID) kết hợp cùng Tập đoàn Thành Đô phát triển. Đây sẽ là một trong những tổ hợp mua sắm – giải trí – ẩm thực hiện đại nhất miền Tây, đồng thời là tiện ích thương mại trọng điểm của Gateway City.'
  },
])

const openEditDrawer = () => {
  console.log('openEditDrawer');
  eventStore.setEvent('dataEvents');
  eventStore.setIsOpen(true);
};

// Format ngày đẹp
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const openUpdateDrawer = (item) => {
    eventStore.setEvent(item);
    eventStore.setIsOpen(true);
}

</script>

<style scoped>

</style>