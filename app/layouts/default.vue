<template>
  <div class="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans">
    
    <!-- Modern Sidebar -->
    <aside 
      :class="[
        'relative flex flex-col transition-all duration-300 ease-in-out border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-30',
        isSidebarExpanded ? 'w-72' : 'w-20'
      ]"
    >
      <!-- Logo Section -->
      <div class="flex items-center justify-between h-16 px-4 border-b border-slate-100 dark:border-slate-800/50">
        <div class="flex items-center gap-3 overflow-hidden">
          <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-primary-500 shadow-lg shadow-primary-500/20">
            <NuxtImg
              src="https://res.cloudinary.com/dpcigceaq/image/upload/v1765281506/Media%20Gateway%20City/iiingth1w5eatij5cju0.svg"
              alt="Logo"
              width="24"
              height="24"
              class="brightness-0 invert"
            />
          </div>
          <span v-if="isSidebarExpanded" class="font-bold text-lg tracking-tight whitespace-nowrap animate-fade-in text-slate-800 dark:text-slate-100">
            Gateway City
          </span>
        </div>
        <!-- <button 
          @click="toggleSidebar" 
          class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
        >
          <svg v-if="isSidebarExpanded" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button> -->
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollable">
        <div v-for="item in navItems" :key="item.path">
          <NuxtLink 
            :to="item.path"
            class="group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200"
            :class="[
              route.path.startsWith(item.path) 
                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
            ]"
          >
            <div 
              class="flex-shrink-0"
              :class="route.path.startsWith(item.path) ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'"
              v-html="item.icon"
            ></div>
            <span v-if="isSidebarExpanded" class="whitespace-nowrap animate-fade-in text-sm font-medium tracking-wide">
              {{ item.label }}
            </span>
            <div v-if="!isSidebarExpanded" class="absolute left-16 px-2 py-1 ml-4 text-xs font-semibold text-white bg-slate-900 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
              {{ item.label }}
            </div>
          </NuxtLink>
        </div>
      </nav>

      <!-- User Profile & Settings -->
      <div class="p-4 border-t border-slate-100 dark:border-slate-800/50">
        <div class="flex items-center gap-3" :class="isSidebarExpanded ? '' : 'justify-center'">
          <div v-if="isSidebarExpanded" class="flex flex-col min-w-0 flex-1">
            <span class="text-sm font-semibold truncate dark:text-slate-200">{{ user?.email || 'Admin' }}</span>
            <span class="text-xs text-slate-500 truncate uppercase">{{ user?.roles || 'Super Admin' }}</span>
          </div>
          <button 
            @click="openLogoutModal" 
            class="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-600 transition-colors"
            title="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Top Header -->
      <header class="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-20">
        <div class="flex items-center gap-4">
          <button 
            @click="toggleSidebar" 
            class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <svg v-if="isSidebarExpanded" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
          <h1 class="text-xl font-bold text-slate-800 dark:text-slate-100">
            {{ pageTitle }}
          </h1>
        </div>
        
        <div class="flex items-center gap-4">
          <!-- Quick Search -->
          <div class="hidden md:flex items-center px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-500/50 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search..." class="ml-2 bg-transparent border-none outline-none text-sm text-slate-700 dark:text-slate-300 w-48" />
          </div>

          <!-- Theme Toggle -->
          <button class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
        </div>
      </header>

      <!-- Slot Area -->
      <main class="flex-1 overflow-auto p-6 bg-slate-50 dark:bg-slate-950 custom-scrollbar">
        <div class="max-w-7xl mx-auto h-full animate-fade-in">
          <slot />
        </div>
      </main>
    </div>

    <!-- Modals -->
    <Teleport to="body">
      <div v-if="showLogoutModal" class="fixed inset-0 z-[60] flex items-center justify-center p-4 backdrop-blur-sm bg-black/40 animate-fade-in">
        <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm p-6 animate-scale-in border border-slate-200 dark:border-slate-800">
          <div class="flex flex-col items-center text-center gap-4">
            <div class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100">Sign Out</h3>
              <p class="text-sm text-slate-500 mt-1">Are you sure you want to sign out?</p>
            </div>
            <div class="flex gap-3 w-full mt-2">
              <button @click="showLogoutModal = false" class="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">Cancel</button>
              <button @click="logout" class="flex-1 px-4 py-2 rounded-xl bg-red-600 text-white shadow-lg shadow-red-600/20">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <GeneralDrawer ref="drawerRef" />
  </div>
</template>

<script setup>
const route = useRoute()
const isSidebarExpanded = ref(true)
const showLogoutModal = ref(false)

const user = ref({ email: '', roles: '' })

const navItems = [
  { path: '/news', label: 'News & Media', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>' },
  { path: '/products', label: 'Products', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>' },
  { path: '/contents', label: 'Editor', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>' },
  { path: '/guest-data', label: 'Guests', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>' }
]

const pageTitle = computed(() => {
  const currentNav = navItems.find(item => route.path.startsWith(item.path))
  return currentNav ? currentNav.label : 'Admin Dashboard'
})

const toggleSidebar = () => { isSidebarExpanded.value = !isSidebarExpanded.value }
const openLogoutModal = () => { showLogoutModal.value = true }
const logout = () => {
  if (process.client) localStorage.removeItem('loginSession')
  navigateTo('/login')
}

onMounted(() => {
  if (!process.client) return
  const session = localStorage.getItem('loginSession')
  if (!session) return navigateTo('/login')
  try {
    const data = JSON.parse(session)
    if (data.user) {
      user.value.email = data.user.email || ''
      user.value.roles = data.user.roles || ''
    } else navigateTo('/login')
  } catch (e) { navigateTo('/login') }
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
</style>