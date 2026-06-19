<template>
  <div class="h-full flex flex-col">

    <!-- Sticky Header -->
    <div class="px-8 py-6 border-b border-zinc-200 dark:border-zinc-800
                flex items-center justify-between shrink-0
                bg-white dark:bg-slate-900 sticky top-0 z-10">
      <div>
        <h1 class="text-2xl font-bold text-zinc-900 dark:text-white">Audit Logs</h1>
        <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Real-time system activity monitoring</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800 flex items-center gap-2">
          <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span class="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Live Syncing</span>
        </div>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4
                bg-zinc-50/50 dark:bg-slate-900/50 shrink-0
                border-b border-zinc-200 dark:border-zinc-800">
      <div class="relative max-w-md w-full">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i class="bi bi-search text-zinc-400"></i>
        </div>
        <input v-model="searchQuery" type="text"
          class="w-full pl-10 pr-4 py-2.5
                 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700
                 rounded-lg text-sm focus:ring-2 focus:ring-black dark:focus:ring-white
                 outline-none transition-all dark:text-white placeholder-zinc-400 shadow-sm"
          placeholder="Search logs..." />
      </div>
      <div class="flex items-center gap-3">
        <select v-model="actionFilter"
          class="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700
                 rounded-lg px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300
                 outline-none focus:ring-2 focus:ring-zinc-500">
          <option value="">All Actions</option>
          <option value="CREATE">CREATE</option>
          <option value="UPDATE">UPDATE</option>
          <option value="DELETE">DELETE</option>
          <option value="LOGIN">LOGIN</option>
          <option value="LOGOUT">LOGOUT</option>
        </select>
      </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 overflow-auto px-8 py-4">

      <!-- Empty State -->
      <div v-if="!filteredLogs.length"
        class="flex flex-col items-center justify-center h-64 text-zinc-400
               border-2 border-dashed border-zinc-200 dark:border-zinc-800
               rounded-xl bg-zinc-50/50 dark:bg-zinc-800/30">
        <div class="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
          <i class="bi bi-clock-history text-2xl"></i>
        </div>
        <h3 class="text-zinc-900 dark:text-white font-medium mb-1">No logs found</h3>
        <p class="text-sm">Try adjusting your search or filters</p>
      </div>

      <!-- Table -->
      <div v-else class="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-700">
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Timestamp</th>
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Action</th>
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Description</th>
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">IP</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100 dark:divide-zinc-700">
            <tr v-for="log in filteredLogs" :key="log.id"
              class="group hover:bg-zinc-50 dark:hover:bg-zinc-700/30 transition-colors">
              <td class="px-6 py-4">
                <span class="font-mono text-xs text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                  {{ log.timestamp }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center text-xs font-bold uppercase text-zinc-600 dark:text-zinc-300">
                    {{ log.user.charAt(0) }}
                  </div>
                  <span class="text-sm font-medium text-zinc-800 dark:text-zinc-200">{{ log.user }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold uppercase"
                  :class="{
                    'bg-green-50 text-green-700 border border-green-200': log.action === 'CREATE',
                    'bg-red-50 text-red-700 border border-red-200': log.action === 'DELETE',
                    'bg-blue-50 text-blue-700 border border-blue-200': log.action === 'LOGIN',
                    'bg-amber-50 text-amber-700 border border-amber-200': log.action === 'UPDATE',
                    'bg-zinc-100 text-zinc-600 border border-zinc-200': log.action === 'LOGOUT',
                  }">
                  {{ log.action }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400 max-w-xs truncate">{{ log.description }}</td>
              <td class="px-6 py-4 font-mono text-xs text-zinc-400">{{ log.ip }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })

const logs = ref([])
const searchQuery = ref('')
const actionFilter = ref('')

const filteredLogs = computed(() => {
  let data = logs.value
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    data = data.filter(l =>
      l.user.toLowerCase().includes(q) ||
      l.description.toLowerCase().includes(q) ||
      l.ip.toLowerCase().includes(q)
    )
  }
  if (actionFilter.value) {
    data = data.filter(l => l.action === actionFilter.value)
  }
  return data
})

onMounted(() => {
  setTimeout(() => {
    const actions = ['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT']
    const users = ['Steve.Jobs', 'Bill.Gates', 'Elon.Musk', 'Linus.Torvs']
    logs.value = Array.from({ length: 200 }).map((_, i) => ({
      id: i + 1,
      timestamp: new Date(Date.now() - i * 60000).toISOString().replace('T', ' ').slice(0, 19),
      user: users[i % users.length],
      action: actions[i % actions.length],
      description: `Executed system directive index_${i * 133} with priority LEVEL_${i % 5}`,
      ip: `192.168.1.${10 + i % 240}`
    }))
  }, 300)
})
</script>
