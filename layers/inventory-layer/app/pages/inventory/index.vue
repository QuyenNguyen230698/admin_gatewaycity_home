<template>
  <div class="space-y-8 animate-fade-in relative z-10">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-black text-brand tracking-tighter italic">INVENTORY HUB</h2>
        <p class="text-sm text-slate-500 font-bold uppercase tracking-widest mt-1">Warehouse Management System / VN-SOUTH-01</p>
      </div>
      <div class="flex items-center gap-3">
         <BaseButton variant="primary" size="md">
            <template #left-icon>
               <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
            </template>
            Add New Item
         </BaseButton>
         <BaseButton variant="outline" size="md">Advanced Filter</BaseButton>
      </div>
    </div>

    <!-- Alert Banner (Smart Alert) -->
    <div class="enterprise-card p-4 bg-amber-50 border-amber-200 flex items-center justify-between gap-6 shadow-xl shadow-amber-900/5 group hover:border-amber-400 transition-all">
       <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
             <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <div class="flex flex-col">
             <span class="text-sm font-black text-amber-900 uppercase italic">Threshold Alert! 🚨</span>
             <p class="text-xs text-amber-700 font-medium">There are <span class="font-black">3 items</span> currently under the low-stock safety point (10 items). Replenishment required.</p>
          </div>
       </div>
       <BaseButton variant="warning" size="sm">Replenish All</BaseButton>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
       <!-- Table Section -->
       <div class="xl:col-span-3 space-y-6">
          <UIDataTable 
            :data="products" 
            :columns="columns"
            selectable
            @bulk-delete="handleBulkDelete"
            @bulk-status="handleBulkStatus"
          >
            <template #cell-stock="{ value }">
               <div class="flex flex-col gap-1 w-32">
                  <div class="flex justify-between items-center text-[10px] font-bold">
                     <span :class="value < 15 ? 'text-rose-600' : 'text-slate-500'">{{ value }} / 100</span>
                  </div>
                  <div class="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                     <div class="h-full rounded-full transition-all duration-1000" :style="{ width: value + '%', background: value < 15 ? '#f43f5e' : '#1A73E8' }"></div>
                  </div>
               </div>
            </template>

            <template #cell-price="{ value }">
               <span class="font-bold text-slate-800 tabular-nums">${{ value.toFixed(2) }}</span>
            </template>

            <template #cell-status="{ value }">
               <BaseBadge :variant="value === 'In Stock' ? 'success' : 'danger'" dot>{{ value }}</BaseBadge>
            </template>
          </UIDataTable>
       </div>

       <!-- Activity Sidebar -->
       <div class="space-y-6">
          <div class="enterprise-card p-6 bg-white space-y-6">
             <h4 class="text-xs font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-3 flex items-center justify-between">
                Recent Movements
                <span class="text-[9px] px-1.5 bg-blue-100 text-blue-600 rounded">LIVE</span>
             </h4>
             <UIActivityTimeline :activities="recentActivities" />
          </div>

          <!-- Optimization Recommendation -->
          <div class="p-6 rounded-3xl bg-emerald-600 text-white space-y-3 relative overflow-hidden group">
             <div class="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
             <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                <span class="text-xs font-black uppercase tracking-widest">AI Suggestion</span>
             </div>
             <p class="text-[11px] font-bold text-emerald-100 italic leading-snug">Item #7 is performing 40% better this week. Consider increasing production to avoid stock-out.</p>
          </div>
       </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'admin'
})

const columns = [
  { key: 'sku', label: 'SKU Code', sortable: true },
  { key: 'name', label: 'Product Name', sortable: true },
  { key: 'category', label: 'Category' },
  { key: 'price', label: 'Unit Price', align: 'right', sortable: true },
  { key: 'stock', label: 'Current Stock', sortable: true },
  { key: 'status', label: 'Availability' },
]

const products = ref([
  { id: 1, sku: 'PROD-001', name: 'Neural Processor X1', category: 'Hardware', price: 299.99, stock: 85, status: 'In Stock' },
  { id: 2, sku: 'PROD-002', name: 'Quantum Sensor Array', category: 'Optics', price: 1250.00, stock: 8, status: 'Low Stock' },
  { id: 3, sku: 'PROD-003', name: 'Liquid Cooling Unit', category: 'Infrastructure', price: 89.50, stock: 112, status: 'In Stock' },
  { id: 4, sku: 'PROD-004', name: 'Cybernetic Link V4', category: 'Biotech', price: 4500.00, stock: 4, status: 'Low Stock' },
  { id: 5, sku: 'PROD-005', name: 'Data Relay Module', category: 'Comm', price: 120.00, stock: 56, status: 'In Stock' },
  { id: 6, sku: 'PROD-006', name: 'Fusion Cell Compact', category: 'Energy', price: 850.00, stock: 9, status: 'Low Stock' },
])

const recentActivities = ref([
  { id: 101, user: 'Admin Steve', action: 'UPDATE_STOCK', description: 'Restocked Neural Processor X1 (+20 items)', timestamp: '2m ago', diff: { stock: { old: 65, new: 85 } } },
  { id: 102, user: 'Manager Lisa', action: 'CHANGE_PRICE', description: 'Adjusted price for Quantum Sensor Array', timestamp: '15m ago', diff: { price: { old: 1100, new: 1250 } } },
  { id: 103, user: 'System Bot', action: 'ALERT', description: 'Item "Fusion Cell" dropped below threshold (10)', timestamp: '1h ago' }
])

const handleBulkDelete = (ids) => {
  console.log('Deleting products:', ids)
}

const handleBulkStatus = (ids) => {
  console.log('Changing status for:', ids)
}
</script>
