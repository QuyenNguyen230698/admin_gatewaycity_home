<template>
  <div class="overflow-x-auto bg-base-100 h-full relative">
    <div v-if="isLoading" class="flex justify-center items-center h-full w-full absolute inset-0 z-50 bg-black/50">
        <span class="loading loading-spinner loading-lg text-white"></span>
    </div>
    <div class="flex items-center gap-4 px-6 py-2 border-b border-base-200">
        <label for="productGrid" class="cursor-pointer flex gap-2 btn btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
          </svg>
          <span>Create Product</span>
        </label>
      <div @click="refreshProducts" class="cursor-pointer flex gap-2 btn btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        <span>Refresh</span>
      </div>
    </div>

    <table class="table table-zebra w-full">
      <thead>
        <tr class="bg-base-200 text-left text-xs uppercase">
          <th class="w-20 text-center border-r">Action</th>
          <th class="w-72 border-r">Banner</th>
          <th class="w-72 border-r">Title</th>
          <th class="w-72 border-r">Slug</th>
          <th class="w-72">Created At</th>
        </tr>
      </thead>
      <tbody>
         Product Info
      </tbody>
    </table>

    <!-- Nếu không có dữ liệu -->
    <div v-if="!Array.isArray(productsData) || productsData.length === 0" class="text-center py-12 text-gray-500">
      Chưa có tin tức nào.
    </div>
    <ProductDrawer />
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

const isLoading = ref(false)
const productsData = ref([    
    {
        slug: 'biet-thu-don-lap',
        title: 'Biệt Thự Đơn Lập',
        features: [
            {title: 'TỔNG DIỆN TÍCH ĐẤT', des: '188m2 - 238m2'},
            {title: 'TỔNG DIỆN TÍCH SÀN SỬ DỤNG (*)', des: '340m2 - 360m2'},
            {title: 'SỐ TẦNG', des: '1 Trệt, 2 Lầu'},
            {title: 'SỐ PHÒNG', des: '4 Phòng Ngủ - 5 WC'},
        ],
        images: [
            '/image/sanpham/bietthudonlap/banner-donlap.png',
            '/image/sanpham/bietthudonlap/banner-donlap.png',
            '/image/sanpham/bietthudonlap/banner-donlap.png'
        ],
        blueprint: [
            {name:'VỊ TRÍ', image:'/image/sanpham/bietthudonlap/Vi-tri-don-lap.jpg'},
            {name:'TẦNG 01', image:'/image/sanpham/bietthudonlap/Tang-1-don-lap.png'},
            {name:'TẦNG 02', image:'/image/sanpham/bietthudonlap/Tang-2-don-lap.png'},
            {name:'TẦNG 03', image:'/image/sanpham/bietthudonlap/Tang-3-don-lap.png'},
        ],
        floor1: {
            name: 'TẦNG 01',
            image: [
                '/image/sanpham/bietthudonlap/Tang1/T1_PHONG-BEP-3-of-4.jpg',
                '/image/sanpham/bietthudonlap/Tang1/T1_PHONG-BEP-4-of-4.jpg',
                '/image/sanpham/bietthudonlap/Tang1/T1_PHONG-KHACH-1-of-5.jpeg',
                '/image/sanpham/bietthudonlap/Tang1/T1_PHONG-KHACH-3-of-5.jpg',
                '/image/sanpham/bietthudonlap/Tang1/T1_PHONG-NGU-01-1-of-4.jpg',
            ]
        },
        floor2: {
            name: 'TẦNG 02',
            image: [
                '/image/sanpham/bietthudonlap/Tang2/T2_PHONG-NGU-02-1-of-4.jpg',
                '/image/sanpham/bietthudonlap/Tang2/T2_PHONG-NGU-03-1-of-4.jpg',
                '/image/sanpham/bietthudonlap/Tang2/T2_PHONG-NGU-MASTER-1-of-4.jpg',
                '/image/sanpham/bietthudonlap/Tang2/T2_PHONG-THAY-DO-2-of-2.jpg',
                '/image/sanpham/bietthudonlap/Tang2/tang-2_wc-2.jpg',
            ]
        },
        floor3: {
            name: 'TẦNG 03',
            image: [
                '/image/sanpham/bietthudonlap/Tang3/tang-3_ktv-2-of-2.jpg',
                '/image/sanpham/bietthudonlap/Tang3/tang-3_phong-ngu-1-of-2.jpg',
                '/image/sanpham/bietthudonlap/Tang3/tang-3_phong-tho-1-of-2.jpg',
            ]
        }
    },
    {
        slug: 'biet-thu-song-lap',
        title: 'Biệt Thự Song Lập',
        features: [
        {title: 'TỔNG DIỆN TÍCH ĐẤT', des: '200m2 - 300m2'},
        {title: 'TỔNG DIỆN TÍCH SÀN SỬ DỤNG (*)', des: '400m2 - 450m2'},
        {title: 'SỐ TẦNG', des: '1 Trệt, 2 Lầu'},
        {title: 'SỐ PHÒNG', des: '4 Phòng Ngủ - 5 WC'},
        ],
        images: [
            '/image/gatewaycity/biet-thu-song-lap.jpg',
            '/image/gatewaycity/biet-thu-song-lap.jpg',
            '/image/gatewaycity/biet-thu-song-lap.jpg'
        ],
        blueprint: [],
        floor1: '',
        floor2: '',
        floor3: ''
    },
    {
        slug: 'nha-pho-thuong-mai',
        title: 'Nhà Phố Thương Mại',
        features: [
            {title: 'TỔNG DIỆN TÍCH ĐẤT', des: '188m2 - 238m2'},
            {title: 'TỔNG DIỆN TÍCH SÀN SỬ DỤNG (*)', des: '340m2 - 360m2'},
            {title: 'SỐ TẦNG', des: '1 Trệt, 2 Lầu'},
            {title: 'SỐ PHÒNG', des: '4 Phòng Ngủ - 5 WC'},
        ],
        images: [
            '/image/gatewaycity/thanh-pho-thuong-mai.jpg',
            '/image/gatewaycity/thanh-pho-thuong-mai.jpg',
            '/image/gatewaycity/thanh-pho-thuong-mai.jpg'
        ],
        blueprint: [],
        floor1: '',
        floor2: '',
        floor3: ''
    }
])

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

const refreshProducts = () => {
  
}

</script>

<style lang="scss" scoped>

</style>