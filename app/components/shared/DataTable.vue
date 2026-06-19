<template>
  <div class="enterprise-card overflow-hidden flex flex-col h-full animate-fade-in">
    <!-- Selection Info (Bulk Actions) -->
    <transition name="dropdown">
      <div v-if="selectedIds.length > 0" class="px-6 py-3 bg-primary-600 text-white flex items-center justify-between sticky top-0 z-20">
         <div class="flex items-center gap-4">
            <span class="text-xs font-bold">{{ selectedIds.length }} items selected</span>
            <div class="h-4 w-px bg-white/20"></div>
            <div class="flex items-center gap-2">
               <button @click="$emit('bulk-delete', selectedIds)" class="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-[11px] font-bold transition-all">Delete All</button>
               <button @click="$emit('bulk-status', selectedIds)" class="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-[11px] font-bold transition-all">Change Status</button>
            </div>
         </div>
         <button @click="selectedIds = []" class="text-white/70 hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
         </button>
      </div>
    </transition>

    <!-- Table Header (Action Bar) -->
    <div class="px-6 py-4 border-b border-[#DADCE0] dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div class="flex items-center gap-4 flex-1">
        <div class="relative w-full max-w-[240px] group">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input 
            v-model="search"
            type="text" 
            placeholder="Search resources..." 
            class="w-full h-8 pl-9 pr-4 py-2 text-xs bg-[#F1F3F4] dark:bg-slate-800 border-none rounded-lg focus:ring-4 focus:ring-primary-600/10 placeholder-slate-400 transition-all font-medium"
          />
        </div>
        <div class="h-4 w-px bg-[#DADCE0] dark:bg-slate-800"></div>
        <SmartFilter :activeFilters="activeFilters" :availableFields="availableFields" @add="addFilter" @remove="removeFilter" />
        <slot name="filters"></slot>
      </div>

      <div class="flex items-center gap-2">
        <BaseButton variant="outline" size="sm" @click="$emit('export')">
          <template #left-icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          </template>
          Export
        </BaseButton>
        <slot name="actions"></slot>
      </div>
    </div>

    <!-- Main Table -->
    <div class="flex-1 overflow-x-auto overflow-y-auto scrollable">
      <table class="w-full text-left border-collapse">
        <thead class="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10 border-b border-[#DADCE0] dark:border-slate-800 transition-all">
          <tr>
            <th v-if="selectable" class="px-6 py-4 w-10">
              <input type="checkbox" class="rounded border-slate-300 text-primary-600 focus:ring-primary-600" @change="toggleSelectAll($event)">
            </th>
            <th 
              v-for="col in columns" 
              :key="col.key" 
              class="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.1em] cursor-pointer group select-none"
              :class="col.align === 'right' ? 'text-right' : ''"
              @click="handleSort(col)"
            >
              <div class="flex items-center gap-2" :class="col.align === 'right' ? 'justify-end' : ''">
                {{ col.label }}
                <div v-if="col.sortable" class="text-slate-300 group-hover:text-primary-600 transition-colors">
                  <svg v-if="sortKey !== col.key" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                  <svg v-else-if="sortOrder === 'asc'" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M7 11l5-5m0 0l5 5m-5-5v12" /></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 13l-5 5m0 0l-5-5m5 5V6" /></svg>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#F1F3F4] dark:divide-slate-800/50">
          <!-- Loading State (Skeleton) -->
          <template v-if="loading">
             <tr v-for="i in 5" :key="i">
                <td v-if="selectable" class="px-6 py-4"><BaseSkeleton width="16px" height="16px" /></td>
                <td v-for="col in columns" :key="col.key" class="px-6 py-4">
                   <BaseSkeleton width="80%" height="8px" shape="text" />
                </td>
             </tr>
          </template>

          <template v-else>
            <tr 
                v-for="(row, index) in paginatedData" 
                :key="row.id || index" 
                class="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all group"
            >
                <td v-if="selectable" class="px-6 py-4">
                <input type="checkbox" :checked="selectedIds.includes(row.id)" class="rounded border-slate-300 text-primary-600 focus:ring-primary-600" @change="toggleSelect(row)">
                </td>
                <td 
                v-for="col in columns" 
                :key="col.key" 
                class="px-6 py-4 text-[13px] text-[#3C4043] dark:text-slate-300 whitespace-nowrap"
                :class="col.align === 'right' ? 'text-right' : ''"
                >
                <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
                    {{ row[col.key] }}
                </slot>
                </td>
            </tr>
          </template>

          <!-- Empty State -->
          <tr v-if="!loading && paginatedData.length === 0">
            <td :colspan="selectable ? columns.length + 1 : columns.length" class="px-6 py-16 text-center">
              <div class="flex flex-col items-center">
                <div class="w-12 h-12 rounded-full bg-[#F1F3F4] dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                </div>
                <h4 class="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">No matching results</h4>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Table Footer (Pagination) -->
    <div class="px-6 py-3 border-t border-[#DADCE0] dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-bold bg-[#F8F9FA] dark:bg-slate-900/10">
      <div class="uppercase tracking-tighter">
        Showing <span class="text-slate-900 dark:text-slate-100">{{ (currentPage - 1) * pageSize + 1 }}</span>- 
        <span class="text-slate-900 dark:text-slate-100">{{ Math.min(currentPage * pageSize, filteredData.length) }}</span> / 
        <span class="text-slate-900 dark:text-slate-100">{{ filteredData.length }}</span> Total
      </div>
      
      <div class="flex items-center gap-2">
        <button 
          :disabled="currentPage === 1"
          class="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          @click="currentPage--"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div class="flex items-center gap-1">
          <button 
            v-for="page in displayedPages" 
            :key="page"
            class="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
            :class="currentPage === page ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800'"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
        </div>
        <button 
           :disabled="currentPage === totalPages"
          class="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          @click="currentPage++"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: { type: Array, default: () => [] },
  columns: { type: Array, required: true },
  selectable: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  pageSize: { type: Number, default: 10 },
  activeFilters: { type: Array, default: () => [] },
  availableFields: { type: Array, default: () => [] }
})

const emit = defineEmits(['export', 'selection-change', 'add-filter', 'remove-filter', 'bulk-delete', 'bulk-status'])

const search = ref('')
const sortKey = ref('')
const sortOrder = ref('asc')
const currentPage = ref(1)
const selectedIds = ref([])

const addFilter = (f) => emit('add-filter', f)
const removeFilter = (id) => emit('remove-filter', id)

const filteredData = computed(() => {
  let result = [...props.data]
  
  if (search.value) {
    const s = search.value.toLowerCase()
    result = result.filter(row => 
      Object.values(row).some(val => String(val).toLowerCase().includes(s))
    )
  }
  
  if (sortKey.value) {
    result.sort((a, b) => {
      const v1 = a[sortKey.value]
      const v2 = b[sortKey.value]
      if (v1 < v2) return sortOrder.value === 'asc' ? -1 : 1
      if (v1 > v2) return sortOrder.value === 'asc' ? 1 : -1
      return 0
    })
  }
  
  return result
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize
  return filteredData.value.slice(start, start + props.pageSize)
})

const totalPages = computed(() => Math.ceil(filteredData.value.length / props.pageSize))

const displayedPages = computed(() => {
  const pages = []
  for (let i = 1; i <= totalPages.value; i++) {
    pages.push(i)
  }
  return pages
})

const handleSort = (col) => {
  if (!col.sortable) return
  if (sortKey.value === col.key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = col.key
    sortOrder.value = 'asc'
  }
}

const toggleSelect = (row) => {
  const idx = selectedIds.value.indexOf(row.id)
  if (idx > -1) selectedIds.value.splice(idx, 1)
  else selectedIds.value.push(row.id)
  emit('selection-change', selectedIds.value)
}

const toggleSelectAll = (e) => {
  if (e.target.checked) {
    selectedIds.value = paginatedData.value.map(r => r.id).filter(Boolean)
  } else {
    selectedIds.value = []
  }
  emit('selection-change', selectedIds.value)
}

watch(search, () => {
  currentPage.value = 1
})
</script>
