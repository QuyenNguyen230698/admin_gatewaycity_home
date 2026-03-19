<template>
  <div class="space-y-8 pb-12">
    <!-- Welcome Section -->
    <section class="relative overflow-hidden rounded-3xl bg-slate-900 p-8 sm:p-12 text-white shadow-2xl">
      <div class="relative z-10 max-w-2xl animate-fade-in">
        <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Welcome to <span class="text-primary-400">Gateway City</span> Dashboard
        </h1>
        <p class="text-lg text-slate-300 mb-8 leading-relaxed">
          Manage your real estate listings, news updates, and customer inquiries all in one powerful, modern platform.
        </p>
        <div class="flex flex-wrap gap-4">
          <NuxtLink to="/products" class="px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 font-bold transition-all shadow-lg shadow-primary-500/20 active:scale-95">
            Manage Products
          </NuxtLink>
          <NuxtLink to="/news" class="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold transition-all border border-slate-700 active:scale-95">
            Post News
          </NuxtLink>
        </div>
      </div>
      
      <!-- Abstract Background Element -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-primary-600/20 rounded-full blur-[120px]"></div>
      <div class="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px]"></div>
    </section>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="(stat, idx) in stats" :key="idx" 
        class="card-premium p-6 group animate-slide-up" :style="{ animationDelay: `${idx * 100}ms` }">
        <div class="flex items-center justify-between mb-4">
          <div :class="['p-3 rounded-xl', stat.color]">
            <div v-html="stat.icon" class="w-6 h-6"></div>
          </div>
          <span class="text-xs font-bold text-green-500 flex items-center bg-green-500/10 px-2 py-1 rounded-full">
            +{{ stat.trend }}%
          </span>
        </div>
        <h3 class="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">
          {{ stat.label }}
        </h3>
        <p class="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          {{ stat.value }}
        </p>
        <div class="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-4">
          <div class="h-full bg-primary-500 transition-all duration-1000 group-hover:scale-x-110 origin-left" 
            :style="{ width: stat.progress + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- Secondary Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="card-premium p-8 h-80 flex flex-col justify-between animate-fade-in" style="animation-delay: 400ms">
        <div>
          <h3 class="text-xl font-bold mb-2">Latest Registered Guests</h3>
          <p class="text-slate-500 text-sm mb-6">Overview of last 3 registration activities</p>
          <div class="space-y-4">
             <div v-for="i in 3" :key="i" class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                <div class="flex-1 space-y-1">
                   <div class="h-4 bg-slate-100 dark:bg-slate-800 rounded-md w-3/4"></div>
                   <div class="h-3 bg-slate-50 dark:bg-slate-800/50 rounded-md w-1/2"></div>
                </div>
             </div>
          </div>
        </div>
        <NuxtLink to="/guest-data" class="text-primary-500 font-bold text-sm hover:underline mt-4 inline-block">View all data →</NuxtLink>
      </div>

      <div class="card-premium p-8 h-80 flex flex-col justify-center items-center text-center animate-fade-in" style="animation-delay: 500ms">
        <div class="w-20 h-20 rounded-2xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-500 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h3 class="text-xl font-bold mb-2">Create New Content</h3>
        <p class="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-xs">Start building your community by sharing new project updates or news articles.</p>
        <NuxtLink to="/contents" class="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold transition-all hover:ring-4 hover:ring-slate-900/10 dark:hover:ring-white/10">
          Open Editor
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
})

const stats = [
  { 
    label: 'Total Products', 
    value: '24', 
    trend: '12', 
    progress: 65, 
    color: 'bg-blue-500/10 text-blue-600',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>'
  },
  { 
    label: 'Guest Leads', 
    value: '156', 
    trend: '24', 
    progress: 82, 
    color: 'bg-purple-500/10 text-purple-600',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>'
  },
  { 
    label: 'News Articles', 
    value: '42', 
    trend: '5', 
    progress: 45, 
    color: 'bg-orange-500/10 text-orange-600',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>'
  },
  { 
    label: 'Active Users', 
    value: '8.4k', 
    trend: '31', 
    progress: 90, 
    color: 'bg-green-500/10 text-green-600',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>'
  }
]
</script>