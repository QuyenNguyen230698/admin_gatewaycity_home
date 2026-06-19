<template>
  <div class="min-h-full p-8 bg-slate-50 dark:bg-slate-900">

    <!-- Header Section -->
    <div class="mb-10 flex items-end justify-between">
      <div>
        <h1 class="text-4xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent tracking-tight">
          Gateway Co Chien Admin
        </h1>
        <p class="text-lg text-slate-500 mt-1">
          Chào mừng trở lại, <span class="font-semibold text-slate-700 dark:text-slate-300">Gateway Co Chien</span> 👋
        </p>
      </div>
      <div class="text-slate-400 text-sm font-medium hidden sm:block">
        {{ currentDate }}
      </div>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      <div v-for="(stat, idx) in stats" :key="idx"
        class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm"
            :class="stat.bg">
            <i :class="[stat.icon, 'text-lg']"></i>
          </div>
          <span class="text-xs font-bold text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">
            ▲ {{ stat.trend }}%
          </span>
        </div>
        <div class="text-2xl font-bold text-zinc-900 dark:text-white">{{ stat.value }}</div>
        <div class="text-xs text-zinc-500 uppercase tracking-wider mt-1">{{ stat.label }}</div>
      </div>
    </div>

    <!-- App Cards Grid -->
    <div class="mb-6">
      <h2 class="text-xl font-bold text-zinc-900 dark:text-white mb-1">Modules</h2>
      <p class="text-sm text-slate-500 mb-6">Truy cập nhanh các ứng dụng quản trị</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <NuxtLink
        v-for="app in appModules" :key="app.path"
        :to="app.path"
        class="group relative bg-white dark:bg-slate-800 rounded-3xl p-6
               border border-slate-200 dark:border-slate-700
               hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
        :class="`hover:border-${app.color}-500/50`"
      >
        <!-- BG Decoration blob -->
        <div
          class="absolute top-0 right-0 w-32 h-32 rounded-bl-[100px] -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150"
          :class="`bg-gradient-to-br from-${app.color}-500/10 to-${app.color2}-500/10`"
        ></div>

        <div class="relative z-10">
          <!-- Icon + Status Badge -->
          <div class="flex items-start justify-between mb-6">
            <div
              class="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg
                     group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
              :class="`bg-gradient-to-br from-${app.color}-600 to-${app.color2}-600`"
            >
              <i :class="[app.icon, 'text-3xl']"></i>
            </div>
            <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wide border border-green-200">
              Online
            </span>
          </div>

          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors"
              :class="`group-hover:text-${app.color}-600`">
            {{ app.label }}
          </h3>
          <p class="text-sm text-slate-500 mb-6 line-clamp-2 h-10 leading-relaxed">{{ app.description }}</p>

          <div class="flex items-center text-sm font-bold" :class="`text-${app.color}-600`">
            Access App
            <i class="bi bi-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
})

const currentDate = computed(() => {
  return new Date().toLocaleDateString('vi-VN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })
})

const stats = [
  { label: 'Inventory Items', value: '2.4K', trend: '12.4', icon: 'bi bi-archive', bg: 'bg-blue-600' },
  { label: 'Products', value: '156', trend: '24.1', icon: 'bi bi-box-seam', bg: 'bg-orange-600' },
  { label: 'News Articles', value: '42', trend: '5.2', icon: 'bi bi-newspaper', bg: 'bg-purple-600' },
  { label: 'Guest Leads', value: '8.4K', trend: '31.2', icon: 'bi bi-people', bg: 'bg-emerald-600' },
]

const appModules = [
  {
    path: '/products',
    label: 'Products',
    description: 'Manage property listings and building blueprints.',
    icon: 'bi bi-box-seam',
    color: 'orange',
    color2: 'red',
  },
  {
    path: '/inventory',
    label: 'Inventory',
    description: 'Track and manage inventory stock across all warehouses.',
    icon: 'bi bi-archive',
    color: 'blue',
    color2: 'indigo',
  },
  {
    path: '/product-3d',
    label: '3D Viewer',
    description: 'Explore 3D models and virtual property tours.',
    icon: 'bi bi-box',
    color: 'indigo',
    color2: 'purple',
  },
  {
    path: '/contents',
    label: 'Contents',
    description: 'Design and publish landing pages and email campaigns.',
    icon: 'bi bi-file-earmark-richtext',
    color: 'rose',
    color2: 'pink',
  },
  {
    path: '/news',
    label: 'News & Media',
    description: 'Create and manage articles, events and announcements.',
    icon: 'bi bi-newspaper',
    color: 'purple',
    color2: 'pink',
  },
  {
    path: '/guest-data',
    label: 'Guests',
    description: 'Manage customer leads, inquiries and contact data.',
    icon: 'bi bi-people',
    color: 'emerald',
    color2: 'teal',
  },
  {
    path: '/permissions',
    label: 'Permissions',
    description: 'Control user access, roles and app permissions.',
    icon: 'bi bi-shield-check',
    color: 'indigo',
    color2: 'purple',
  },
  {
    path: '/audit-logs',
    label: 'Audit Logs',
    description: 'Monitor system activity and security events.',
    icon: 'bi bi-clock-history',
    color: 'slate',
    color2: 'zinc',
  },
]
</script>