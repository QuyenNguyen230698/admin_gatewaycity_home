<template>
  <div class="flex items-center flex-wrap gap-2">
    <!-- Active Filter Tags -->
    <div 
        v-for="filter in activeFilters" 
        :key="filter.id" 
        class="group flex items-center gap-2 pl-3 pr-2 py-1 bg-[#E8F0FE] text-[#1A73E8] border border-[#1A73E8]/10 rounded-full text-[11px] font-bold transition-all hover:bg-[#D2E3FC] animate-scale-in"
    >
        <span class="opacity-70 uppercase tracking-tighter">{{ filter.label }}:</span>
        <span class="truncate max-w-[120px]">{{ filter.value }}</span>
        <button 
           @click="$emit('remove', filter.id)"
           class="p-0.5 rounded-full hover:bg-[#1A73E8] hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
    </div>

    <!-- Add Filter Trigger -->
    <div class="relative">
        <button 
            @click="showPicker = !showPicker"
            class="flex items-center gap-2 h-7 px-3 border border-[#DADCE0] dark:border-slate-800 rounded-lg text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-slate-400 transition-all cursor-pointer"
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Smar Filter
        </button>

        <!-- Mock Picker Dropdown -->
        <div v-if="showPicker" class="absolute left-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 border border-[#DADCE0] dark:border-slate-800 rounded-xl shadow-xl z-50 p-2 animate-scale-in">
             <div class="text-[10px] font-bold text-slate-400 p-2 uppercase tracking-widest">Available Fields</div>
             <div 
                v-for="field in availableFields" 
                :key="field.id"
                @click="selectField(field)"
                class="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
             >
                <div class="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                   <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>
                </div>
                <span class="text-xs font-medium text-slate-700 dark:text-slate-200">{{ field.label }}</span>
             </div>
        </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  activeFilters: { type: Array, default: () => [] },
  availableFields: { type: Array, required: true }
})

const emit = defineEmits(['add', 'remove'])
const showPicker = ref(false)

const selectField = (field) => {
    // Mock selecting - in real app would open value input
    emit('add', { id: field.id, label: field.label, value: 'New Filter' })
    showPicker.value = false
}

// Close on click outside
if (process.client) {
    window.addEventListener('click', (e) => {
        if (!e.target.closest('.smart-filter-container')) {
            showPicker.value = false
        }
    })
}
</script>
