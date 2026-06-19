<template>
  <div class="activity-timeline space-y-0 px-2">
    <div v-for="(item, idx) in activities" :key="item.id" class="flex gap-4 group">
       <!-- Time Pillar -->
       <div class="flex flex-col items-center">
          <div 
            class="w-3 h-3 rounded-full border-2 transition-colors"
            :class="[
              idx === 0 ? 'border-primary-600 bg-primary-600 shadow-[0_0_8px_rgba(26,115,232,0.4)]' : 'border-[#DADCE0] dark:border-slate-700 bg-white dark:bg-slate-900 group-hover:border-primary-400'
            ]"
          ></div>
          <div 
            v-if="idx !== activities.length - 1"
            class="flex-1 w-px bg-[#DADCE0] dark:bg-slate-800 my-1"
          ></div>
       </div>
       
       <!-- Content -->
       <div class="pb-8 flex-1">
          <div class="flex items-center justify-between mb-1">
            <h5 class="text-sm font-bold text-[#3C4043] dark:text-slate-100">
               {{ item.user }} 
               <span class="font-normal text-slate-500 mx-1">/</span> 
               <span class="text-primary-600 uppercase text-[10px] tracking-widest">{{ item.action }}</span>
            </h5>
            <span class="text-[10px] font-bold text-slate-400 tabular-nums uppercase">{{ formatTime(item.timestamp) }}</span>
          </div>

          <p class="text-xs text-slate-600 dark:text-slate-400 mb-3">{{ item.description }}</p>

          <!-- Change Diff (Conditional) -->
          <div v-if="item.diff && Object.keys(item.diff).length > 0" class="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-[#DADCE0] dark:border-slate-800 space-y-1.5">
             <div v-for="(val, key) in item.diff" :key="key" class="text-[11px] grid grid-cols-[80px_1fr] items-center gap-2">
                <span class="text-slate-500 font-medium truncate uppercase tracking-tighter">{{ key }}</span>
                <div class="flex items-center gap-2 overflow-hidden">
                    <span class="text-rose-500/80 line-through truncate max-w-[120px]">{{ val.old || 'n/a' }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    <span class="text-emerald-600 font-bold truncate">{{ val.new }}</span>
                </div>
             </div>
          </div>
       </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  activities: { type: Array, required: true }
})

const formatTime = (ts) => {
  // Simple mock formatting, in real app use dayjs
  return ts
}
</script>

<style scoped>
.activity-timeline {
  font-family: 'Inter', -apple-system, sans-serif;
}
</style>
