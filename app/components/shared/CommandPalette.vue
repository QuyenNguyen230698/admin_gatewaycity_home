<template>
  <Teleport to="body">
    <transition name="fade">
      <div 
        v-if="modelValue" 
        class="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 bg-slate-950/40 backdrop-blur-sm"
        @click.self="$emit('update:modelValue', false)"
      >
        <div 
          class="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col animate-scale-in"
          @click.stop
        >
          <!-- Search Input -->
          <div class="flex items-center gap-4 px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              ref="searchInput"
              v-model="query"
              type="text" 
              placeholder="Search for commands, pages, or data..." 
              class="flex-1 bg-transparent border-none outline-none text-base text-slate-800 dark:text-slate-100 placeholder-slate-400 py-1"
              @keydown.esc="$emit('update:modelValue', false)"
            />
            <div class="flex items-center gap-1">
               <span class="text-[10px] font-bold text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">ESC</span>
            </div>
          </div>

          <!-- Results -->
          <div class="flex-1 overflow-y-auto max-h-[60vh] scrollable py-2">
            <!-- Recent / Suggestions -->
            <div v-if="!query" class="px-3">
              <p class="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quick Actions</p>
              <div v-for="action in quickActions" :key="action.id" class="px-1">
                <button 
                  class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left group"
                  @click="runAction(action)"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors" v-html="action.icon"></div>
                    <div>
                      <h4 class="text-sm font-medium text-slate-700 dark:text-slate-200">{{ action.title }}</h4>
                      <p class="text-[11px] text-slate-400">{{ action.description }}</p>
                    </div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>

            <!-- Search Results placeholder -->
            <div v-else class="px-6 py-12 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-slate-200 dark:text-slate-800 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <p class="text-sm text-slate-500">Searching for "<span class="text-slate-800 dark:text-slate-200 font-medium">{{ query }}</span>"...</p>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center gap-6 text-[11px] text-slate-400">
             <div class="flex items-center gap-1.5"><span class="px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold">↑↓</span> to navigate</div>
             <div class="flex items-center gap-1.5"><span class="px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold">⏎</span> to select</div>
             <div class="flex items-center gap-1.5"><span class="px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold">esc</span> to close</div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const query = ref('')
const searchInput = ref(null)

const quickActions = [
  { id: 'new-news', title: 'New Article', description: 'Create a new news or media item', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>', path: '/news/create' },
  { id: 'new-product', title: 'New Product', description: 'Add a new product to the list', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>', path: '/products/create' },
  { id: 'settings', title: 'System Settings', description: 'Manage application configuration', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>', path: '/settings' },
]

const runAction = (action) => {
  if (action.path) navigateTo(action.path)
  emit('update:modelValue', false)
}

watch(() => props.modelValue, (val) => {
  if (val) {
    query.value = ''
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
})
</script>

<style scoped>
.scrollable::-webkit-scrollbar {
  width: 4px;
}
.scrollable::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.dark .scrollable::-webkit-scrollbar-thumb {
  background: #334155;
}
</style>
