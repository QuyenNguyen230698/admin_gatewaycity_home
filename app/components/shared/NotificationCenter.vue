<template>
  <div class="relative">
    <button 
      class="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
      @click="isOpen = !isOpen"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
      <span v-if="unreadCount > 0" class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-950"></span>
    </button>

    <transition name="dropdown">
      <div v-if="isOpen" class="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50">
        <div class="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 class="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Notifications</h3>
          <span class="text-[10px] bg-primary-100 text-primary-600 px-2 py-0.5 rounded-full font-bold">{{ unreadCount }} New</span>
        </div>
        
        <div class="max-h-96 overflow-y-auto scrollable">
          <div v-for="note in notifications" :key="note.id" class="p-4 border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
            <div class="flex gap-3">
              <div class="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-blue-100 text-blue-600" :class="note.colorClass">
                <div class="w-4 h-4" v-html="note.icon"></div>
              </div>
              <div class="flex-1">
                <p class="text-xs font-bold text-slate-800 dark:text-slate-100">{{ note.title }}</p>
                <p class="text-[10px] text-slate-500 mt-0.5 line-clamp-2">{{ note.message }}</p>
                <p class="text-[9px] text-slate-400 mt-1 font-medium">{{ note.time }}</p>
              </div>
            </div>
          </div>
          
          <div v-if="notifications.length === 0" class="p-8 text-center">
            <p class="text-xs text-slate-400">No new notifications</p>
          </div>
        </div>
        
        <button class="w-full py-2.5 text-[11px] font-bold text-primary-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          View All Notifications
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
const isOpen = ref(false)
const unreadCount = ref(2)

const notifications = [
  { 
    id: 1, 
    title: 'System Update', 
    message: 'Version 2.4.0 deployment successful. New features added.', 
    time: '2 hours ago',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>',
    colorClass: 'bg-green-100 text-green-600'
  },
  { 
    id: 2, 
    title: 'New Guest Registration', 
    message: 'John Doe has registered a new account from the mobile app.', 
    time: '5 hours ago',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>',
    colorClass: 'bg-blue-100 text-blue-600'
  }
]
</script>
