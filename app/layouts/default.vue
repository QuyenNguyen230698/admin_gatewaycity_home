<template>
  <div class="drawer lg:drawer-open h-full min-h-screen overflow-hidden">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />

    <!-- Content -->
    <div class="drawer-content">
      <!-- Navbar -->
      <nav class="navbar w-full bg-base-300">
        <label for="my-drawer-4" class="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5"
            fill="none" stroke="currentColor" class="my-1.5 inline-block size-5">
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-12a2 2 0 0 1-2 -2z" />
            <path d="M9 4v16" />
            <path d="M14 10l2 2l-2 2" />
          </svg>
        </label>
        <div class="px-4 font-semibold">{{ pageTitle }}</div>
      </nav>

      <div class="w-full h-full">
        <slot />
      </div>
    </div>

    <!-- Sidebar -->
    <div class="drawer-side is-drawer-close:overflow-visible">
      <label for="my-drawer-4" class="drawer-overlay"></label>
      <div class="flex min-h-full flex-col bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
        <!-- Logo -->
        <div class="p-3 border-b border-base-300 text-center">
          <NuxtImg
            src="/logo.svg"
            alt="Gatewaycity Homes"
            width="120"
            height="120"
            class="mx-auto"
          />
        </div>
        <ul class="menu w-full grow">
          <li>
            <NuxtLink external
              href="/news"
              class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="my-1.5 inline-block size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
              </svg>
              <span class="is-drawer-close:hidden">News</span>
            </NuxtLink>
          </li>

          <li>
            <NuxtLink external
              href="/events"
              class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="my-1.5 inline-block size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
              </svg>
              <span class="is-drawer-close:hidden">Events</span>
            </NuxtLink>
          </li>

          <li>
            <NuxtLink
              href="/contents"
              class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="my-1.5 inline-block size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
              <span class="is-drawer-close:hidden">Contents</span>
            </NuxtLink>
          </li>

        </ul>
        <!-- Logout -->
        <div class="p-2 border-t border-base-300">
          <div class="flex items-center justify-between p-2">
            <div class="flex flex-col gap-1">
              <span class="font-bold text-xs is-drawer-close:hidden">{{ user.name }}</span>
              <span class="text-xs is-drawer-close:hidden">{{ user.role }}</span>
            </div>
            <button @click="openLogoutModal" class="btn btn-sm px-2 tooltip tooltip-right">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showLogoutModal" class="fixed inset-0 flex items-center justify-center p-6 z-50">
          <div class="bg-white p-8 rounded-lg max-w-md w-full shadow-2xl">
              <div class="flex flex-col gap-4">
                  <h6 class="text-xl font-semibold text-red-600 flex items-center gap-3 border-b border-base-300">
                      Logout
                  </h6>
                  <div class="flex justify-end gap-3">
                      <button 
                          @click="logout()"
                          class="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 focus:ring-2 focus:ring-red-300 transition-all duration-200"
                      >
                          Logout
                      </button>
                      <button 
                          @click="showLogoutModal = false" 
                          class="flex items-center gap-2 px-4 py-2 bg-slate-200 text-black text-sm font-medium rounded hover:bg-slate-300 focus:ring-2 focus:ring-slate-100 transition-all duration-200"
                      >
                          Close
                      </button>
                  </div>
              </div>
          </div>
      </div>

    <GeneralDrawer ref="drawerRef" />
  </div>
</template>

<script setup>
const route = useRoute()
const showLogoutModal = ref(false);
const user = ref({
  name: '',
  role: ''
});

// Tự động đổi tiêu đề theo route
const pageTitle = computed(() => {
  const path = route.path

  if (path.includes('/news')) return 'News (Tin tức)'
  if (path.includes('/events')) return 'Events (Sự kiện)'
  if (path.includes('/contents')) return 'Create Contents (Tạo nội dung)'

  return 'Admin Gatewaycity Homes'
})

const drawerRef = ref(null);

const openLogoutModal = () => {
  showLogoutModal.value = true;
};

const logout = () => {
  if (process.client) {
    localStorage.removeItem('loginSession')
  }
  navigateTo('/login')
}

onMounted(() => {
  const session = localStorage.getItem('loginSession')
  if (session) {
    const data = JSON.parse(session)
    user.value.name = data.user.name
    user.value.role = data.user.role
  }
  if (!session) {
    navigateTo('/login')
  }
})

</script>

<style scoped>
/* Khi sidebar thu gọn (mobile), ẩn chữ, chỉ hiện icon + tooltip */
@media (max-width: 1023px) {
  .hidden-lg\:inline {
    display: none !important;
  }
}
</style>