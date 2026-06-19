<template>
  <!-- Ivy Admin Layout — Pattern A (default.vue) -->
  <div class="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-900">

    <!-- ===================== SIDEBAR ===================== -->
    <aside
      class="bg-white dark:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-700
             flex flex-col transition-all duration-300 z-20 relative flex-shrink-0"
      :class="[isSidebarExpanded ? 'w-64' : 'w-20']"
    >
      <!-- Logo Area -->
      <div
        class="h-16 flex items-center justify-center px-4 border-b border-zinc-200 dark:border-zinc-700 cursor-pointer shrink-0"
        @click="router.push('/')"
      >
        <div class="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-[#1C351C] shadow-md">
          <NuxtImg
            src="https://res.cloudinary.com/dpcigceaq/image/upload/v1781874951/AdminAssets/htbspgp5pevgh953qwuk.png"
            class="w-7 h-7 object-contain"
          />
        </div>
        <div v-if="isSidebarExpanded" class="ml-3 flex flex-col leading-tight overflow-hidden">
          <span class="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Gateway</span>
          <span class="text-sm font-bold tracking-tight text-zinc-900 dark:text-white">Co Chien</span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-1 custom-scrollbar">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center px-3 py-2.5 rounded-xl
                 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white
                 transition-all group relative"
          active-class="bg-black dark:bg-white text-white dark:text-black shadow-sm"
        >
          <i :class="[item.icon, 'text-xl shrink-0']"></i>
          <span
            class="ml-3 text-[13px] font-medium transition-all whitespace-nowrap"
            :class="{ 'w-0 opacity-0 overflow-hidden ml-0': !isSidebarExpanded }"
          >
            {{ item.label }}
          </span>
        </NuxtLink>
      </nav>

      <!-- User Footer -->
      <div class="p-3 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/30 shrink-0">
        <div v-if="isSidebarExpanded" class="flex items-center gap-3 px-2 py-1.5">
          <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600
                      flex items-center justify-center text-zinc-600 dark:text-zinc-200 font-bold text-sm shrink-0">
            <img v-if="user.avatar" :src="user.avatar" class="w-full h-full rounded-full object-cover" />
            <span v-else>{{ (user.username || 'U')[0] }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-semibold text-zinc-900 dark:text-white truncate">{{ user.username }}</p>
            <p class="text-[10px] text-zinc-500 truncate">{{ user.email }}</p>
          </div>
          <button @click="logout" class="text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors" title="Sign out">
            <i class="bi bi-box-arrow-right text-base"></i>
          </button>
        </div>
        <!-- Collapsed: just logout icon -->
        <button v-else @click="logout"
          class="w-full flex items-center justify-center h-9 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all"
          title="Sign out">
          <i class="bi bi-box-arrow-right text-base"></i>
        </button>
      </div>
    </aside>

    <!-- ===================== MAIN FRAME ===================== -->
    <main class="flex-1 flex flex-col min-w-0 overflow-hidden bg-zinc-50 dark:bg-zinc-900">

      <!-- Mobile Overlay -->
      <transition name="fade">
        <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-black/30 z-[90] backdrop-blur-sm lg:hidden" @click="isMobileMenuOpen = false"></div>
      </transition>

      <!-- ====== APP HEADER ====== -->
      <header
        class="h-16 bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700
               flex items-center justify-between px-4 shrink-0
               sticky top-0 z-30 shadow-sm"
      >
        <!-- Left -->
        <div class="flex items-center gap-4">
          <!-- Sidebar Toggle -->
          <button
            @click="isSidebarExpanded = !isSidebarExpanded"
            class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700
                   text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <i class="bi bi-list text-xl"></i>
          </button>

          <!-- Divider -->
          <div class="h-6 w-px bg-zinc-200 dark:bg-zinc-700"></div>

          <!-- App Launcher -->
          <NuxtLink to="/" title="App Center"
            class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700
                   text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
            <i class="bi bi-grid-3x3-gap-fill text-xl"></i>
          </NuxtLink>

          <!-- Breadcrumb + Page Title -->
          <div class="flex flex-col ml-2">
            <div class="flex items-center text-xs text-zinc-500 space-x-1">
              <span>Admin</span>
              <span>/</span>
              <span>{{ pageTitle }}</span>
            </div>
            <h1 class="text-sm font-bold text-zinc-900 dark:text-white leading-tight">{{ pageTitle }}</h1>
          </div>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-2">
          <!-- Notifications -->
          <button class="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700
                         text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
            <i class="bi bi-bell text-lg"></i>
            <div class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 border-2 border-white dark:border-zinc-800"></div>
          </button>

          <!-- User Avatar Dropdown -->
          <div class="relative">
            <button
              @click="showUserDropdown = !showUserDropdown"
              class="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full transition-all border
                     border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800
                     hover:bg-zinc-50 dark:hover:bg-zinc-700"
            >
              <img v-if="user.avatar" :src="user.avatar" class="w-7 h-7 rounded-full object-cover flex-shrink-0" />
              <div v-else class="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold bg-black">
                {{ (user.username || 'U')[0] }}
              </div>
              <i class="bi bi-chevron-down text-[10px] text-zinc-400"></i>
            </button>

            <!-- Dropdown -->
            <transition name="fade">
              <div
                v-if="showUserDropdown"
                class="absolute top-full right-0 mt-2 w-72 rounded-2xl overflow-hidden z-[110]
                       bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700
                       shadow-xl shadow-zinc-200/50 dark:shadow-zinc-900/50"
              >
                <!-- User Info -->
                <div class="p-5 flex flex-col items-center border-b border-zinc-100 dark:border-zinc-700">
                  <img v-if="user.avatar" :src="user.avatar" class="w-16 h-16 rounded-full object-cover mb-3 ring-2 ring-zinc-100" />
                  <div class="text-center">
                    <p class="text-sm font-bold text-zinc-900 dark:text-white">{{ user.username }}</p>
                    <p class="text-xs mt-0.5 text-zinc-500">{{ user.email }}</p>
                    <span class="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full text-xs font-medium
                                 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-600">
                      <i class="bi bi-shield-check text-blue-600"></i>
                      {{ user.roles?.[0] || 'Admin' }}
                    </span>
                  </div>
                </div>
                <!-- Actions -->
                <div class="p-2">
                  <button
                    @click="logout"
                    class="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all text-left
                           text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <i class="bi bi-box-arrow-right text-base"></i>
                    Sign out
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </header>

      <!-- ====== CONTENT AREA ====== -->
      <div class="flex-1 overflow-y-auto relative scroll-smooth bg-zinc-50 dark:bg-zinc-900 custom-scrollbar">
        <slot />
      </div>

      <!-- Global Toasts -->
      <SharedToastManager />
    </main>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const isSidebarExpanded = ref(true);
const isMobileMenuOpen = ref(false);
const showUserDropdown = ref(false);
const user = ref({
  email: "operator@gatewaycity.com",
  roles: ["ADMIN"],
  avatar: "https://i.pravatar.cc/150?u=4",
  username: "Quyen Nguyen",
});

const navItems = [
  { path: "/", label: "Dashboard", icon: "bi bi-grid-fill" },
  { path: "/products", label: "Products", icon: "bi bi-box-seam" },
  { path: "/contents", label: "Contents", icon: "bi bi-file-earmark-richtext" },
  { path: "/news", label: "News", icon: "bi bi-newspaper" },
  { path: "/permissions", label: "Permissions", icon: "bi bi-shield-check" },
];

const isActive = (item) => {
  if (item.path === "/") return route.path === "/";
  return route.path.startsWith(item.path);
};

const pageTitle = computed(() => {
  const current = navItems.find((item) => isActive(item) && item.path !== "/");
  if (!current && route.path === "/") return "Dashboard";
  return current ? current.label : "Admin Panel";
});

const logout = () => {
  if (process.client) localStorage.removeItem("loginSession");
  navigateTo("/login");
};

onMounted(() => {
  if (process.client) {
    const session = localStorage.getItem("loginSession");
    if (session) {
      try {
        const data = JSON.parse(session);
        if (data.user) user.value = { ...user.value, ...data.user };
      } catch {}
    }
  }
});
</script>
