<template>
  <div class="enterprise-machine flex flex-col h-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 animate-fade-in group">
    
    <!-- Header Command Line -->
    <div class="h-14 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-950/40 backdrop-blur-xl z-20">
       <div class="flex items-center gap-6">
          <div class="flex flex-col">
             <span class="text-[9px] font-black text-zinc-600 uppercase tracking-widest leading-none">Processor Status</span>
             <div class="flex items-center gap-1.5 mt-1">
                <div class="w-1 h-1 rounded-full bg-blue-500 animate-pulse"></div>
                <span class="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Nominal</span>
             </div>
          </div>
          
          <div class="h-6 w-px bg-zinc-800 hidden md:block"></div>

          <!-- Active Selection (Context Bar) -->
          <transition name="dropdown">
            <div v-if="selectedIds.length > 0" class="flex items-center gap-3 bg-zinc-100 text-black px-3 py-1.5 rounded-lg shadow-2xl animate-scale-in">
              <span class="text-[9px] font-black uppercase tracking-widest">{{ selectedIds.length }} Selected</span>
              <div class="flex items-center gap-1.5 border-l border-black/10 pl-3">
                 <button @click="$emit('bulk-delete', selectedIds)" class="text-[9px] font-black uppercase hover:text-red-600 transition-colors">Abort</button>
                 <button @click="$emit('bulk-status', selectedIds)" class="text-[9px] font-black uppercase hover:text-blue-600 transition-colors ml-2">Sync</button>
              </div>
            </div>
          </transition>
       </div>

       <!-- Global Commands -->
       <div class="flex items-center gap-3">
          <button @click="handleExport" class="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-700 hover:text-white transition-all border border-zinc-700/50">
             Export Data
          </button>
          <slot name="actions"></slot>
       </div>
    </div>

    <!-- Smart Logic Center (Filters) -->
    <div class="px-6 py-4 flex flex-wrap items-center gap-4 bg-zinc-900/50 border-b border-zinc-800/30">
       <div class="relative w-full max-w-sm group">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-zinc-100 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input 
            v-model="search"
            type="text" 
            placeholder="Search thousands of data nodes..." 
            class="w-full h-9 pl-9 pr-4 bg-zinc-950/50 border border-zinc-800/50 rounded-xl text-xs font-bold text-zinc-100 placeholder-zinc-700 focus:border-zinc-500 focus:ring-4 ring-zinc-500/5 transition-all outline-none"
          />
       </div>

       <div class="h-4 w-px bg-zinc-800"></div>

       <!-- Filter Tags -->
       <div class="flex-1 overflow-x-auto scrollable">
          <SmartFilter 
            :activeFilters="activeFilters" 
            :availableFields="availableFields" 
            @add="f => $emit('add-filter', f)" 
            @remove="id => $emit('remove-filter', id)" 
          />
       </div>
    </div>

    <!-- High-Glow Virtual Body -->
    <div class="flex-1 relative overflow-hidden">
      <!-- Loading Shimmer -->
      <div v-if="loading" class="h-full space-y-px mt-px">
         <div v-for="i in 10" :key="i" class="h-12 bg-zinc-900/50 border-b border-zinc-800/20 animate-pulse"></div>
      </div>

      <!-- Virtual Content -->
      <RecycleScroller
        v-else-if="useVirtualScroll && filteredData.length > 0"
        class="h-full scrollable"
        :items="filteredData"
        :item-size="48"
        key-field="id"
        v-slot="{ item }"
      >
        <div 
          class="flex items-center px-6 border-b border-zinc-800/20 hover:bg-zinc-800/40 transition-colors group/row"
          :class="selectedIds.includes(item.id) && 'bg-blue-500/5'"
        >
          <div v-if="selectable" class="w-8 flex-shrink-0">
             <input type="checkbox" :checked="selectedIds.includes(item.id)" @change="toggleSelect(item)" class="rounded bg-zinc-800 border-zinc-700 text-zinc-100 focus:ring-zinc-400 transition-all">
          </div>
          
          <div 
            v-for="col in columns" 
            :key="col.key" 
            class="flex-1 px-4 text-[12px] font-bold text-zinc-500 group-hover/row:text-zinc-200 transition-colors truncate italic"
            :style="{ flexBasis: col.width || 'auto', textAlign: col.align || 'left' }"
          >
             <slot :name="`cell-${col.key}`" :row="item" :value="item[col.key]">
                {{ item[col.key] }}
             </slot>
          </div>

          <div class="w-16 flex justify-end opacity-0 group-hover/row:opacity-100 transition-opacity">
            <button class="text-zinc-600 hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg></button>
          </div>
        </div>
      </RecycleScroller>

      <!-- Paged Body (Fallback) -->
      <div v-else-if="!useVirtualScroll" class="h-full overflow-auto scrollable">
         <table class="w-full text-left border-collapse">
            <thead class="sticky top-0 bg-zinc-950 z-10 border-b border-zinc-800">
               <tr>
                  <th v-if="selectable" class="px-6 py-3 w-8"><input type="checkbox" @change="toggleSelectAll"></th>
                  <th v-for="col in columns" :key="col.key" class="px-6 py-3 text-[9px] font-black text-zinc-600 uppercase tracking-widest">{{ col.label }}</th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="item in paginatedData" :key="item.id" class="border-b border-zinc-800/10 hover:bg-zinc-800/30 transition-colors">
                  <td v-if="selectable" class="px-6 py-3"><input type="checkbox" :checked="selectedIds.includes(item.id)" @change="toggleSelect(item)"></td>
                  <td v-for="col in columns" :key="col.key" class="px-6 py-3 text-[12px] font-bold text-zinc-400 group-hover:text-zinc-100 italic">
                     <slot :name="`cell-${col.key}`" :row="item" :value="item[col.key]">{{ item[col.key] }}</slot>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>

      <!-- Static Halted Center -->
      <div v-if="!loading && filteredData.length === 0" class="absolute inset-0 flex items-center justify-center bg-zinc-950/20">
         <div class="text-center animate-scale-in">
            <h4 class="text-[10px] font-black italic uppercase text-zinc-600 tracking-[0.4em]">Node Idle</h4>
            <p class="text-[9px] text-zinc-800 font-bold uppercase tracking-widest mt-2">No matching data nodes found.</p>
         </div>
      </div>
    </div>

    <!-- Diagnostic Bar -->
    <div class="h-8 border-t border-zinc-800/50 px-6 flex items-center justify-between bg-zinc-950 px-2 text-[8px] font-black text-zinc-700 uppercase tracking-widest">
       <div class="flex items-center gap-4">
          <span>Packets: <span class="text-zinc-500">{{ filteredData.length }}</span></span>
          <span>Buffer: <span class="text-zinc-500">64KB</span></span>
       </div>
       <div v-if="!useVirtualScroll" class="flex gap-4">
          <button @click="currentPage--" :disabled="currentPage === 1" class="hover:text-zinc-200">Prev</button>
          <span>Page {{ currentPage }} / {{ totalPages }}</span>
          <button @click="currentPage++" :disabled="currentPage === totalPages" class="hover:text-zinc-200">Next</button>
       </div>
    </div>
  </div>
</template>

<script setup>
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const props = defineProps({
  data: { type: Array, default: () => [] },
  columns: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  selectable: { type: Boolean, default: false },
  useVirtualScroll: { type: Boolean, default: true },
  pageSize: { type: Number, default: 50 },
  activeFilters: { type: Array, default: () => [] },
  availableFields: { type: Array, default: () => [] }
})

const emit = defineEmits(['add-filter', 'remove-filter', 'selection-change', 'bulk-delete', 'bulk-status'])
const search = ref('')
const selectedIds = ref([])
const currentPage = ref(1)

const filteredData = computed(() => {
  let result = [...props.data]
  if (search.value) {
    const s = search.value.toLowerCase()
    result = result.filter(row => Object.values(row).some(v => String(v).toLowerCase().includes(s)))
  }
  return result
})
const totalPages = computed(() => Math.ceil(filteredData.value.length / props.pageSize))
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize
  return filteredData.value.slice(start, start + props.pageSize)
})

const toggleSelect = (item) => {
  const idx = selectedIds.value.indexOf(item.id)
  if (idx > -1) selectedIds.value.splice(idx, 1)
  else selectedIds.value.push(item.id)
  emit('selection-change', selectedIds.value)
}

const toggleSelectAll = (e) => {
  selectedIds.value = e.target.checked ? filteredData.value.map(i => i.id) : []
  emit('selection-change', selectedIds.value)
}

const handleExport = () => {
  const csv = "data:text/csv;charset=utf-8," + props.columns.map(c => c.label).join(",") + "\n" + filteredData.value.map(r => props.columns.map(c => r[c.key]).join(",")).join("\n")
  const link = document.createElement("a"); link.setAttribute("href", encodeURI(csv)); link.setAttribute("download", "machine_export.csv"); document.body.appendChild(link); link.click();
}
watch(search, () => { currentPage.value = 1 })
</script>
