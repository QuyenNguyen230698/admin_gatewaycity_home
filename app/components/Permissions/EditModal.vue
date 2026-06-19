<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-[70] flex items-center justify-center p-4 backdrop-blur-md bg-black/40">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-scale-in">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
          <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100">Cấu hình người dùng</h3>
          <button @click="$emit('update:modelValue', false)" class="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <!-- Basic Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-slate-100 dark:border-slate-800 pb-8">
            <div class="space-y-1">
              <label class="text-xs font-bold text-slate-500 uppercase ml-1">Email</label>
              <div class="px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 font-medium">
                {{ user.email }}
              </div>
            </div>
            
            <div class="space-y-1">
              <label class="text-xs font-bold text-slate-500 uppercase ml-1">Vị trí (Position)</label>
              <select v-model="formData.position" class="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-4 focus:ring-primary-500/10 transition-all outline-none">
                <option value="Staff">Staff</option>
                <option value="Manager">Manager</option>
                <option value="Developer">Developer</option>
                <option value="Accountant">Accountant</option>
                <option value="HR">HR</option>
              </select>
            </div>
          </div>

          <!-- Role & Scope (RBAC/ABAC) -->
          <div class="space-y-4">
             <h4 class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
               Vai trò & Phạm vi (RBAC / ABAC)
             </h4>
             
             <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label class="text-[10px] font-bold text-slate-400 uppercase ml-1">Primary Role</label>
                  <select v-model="formData.roles[0]" class="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-4 focus:ring-primary-500/10 outline-none font-bold text-primary-600">
                    <option value="USER">Standard User</option>
                    <option value="ADMIN">Super Admin</option>
                    <option value="MANAGER">Manager</option>
                    <option value="ACCOUNTANT">Accountant</option>
                    <option value="HR_MANAGER">HR Manager</option>
                  </select>
                </div>

                <div class="space-y-1">
                  <label class="text-[10px] font-bold text-slate-400 uppercase ml-1">Data Scope</label>
                  <select v-model="formData.scope" class="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-4 focus:ring-primary-500/10 outline-none font-bold text-amber-600">
                    <option value="Global">Global (Toàn công ty)</option>
                    <option value="Department">Department (Phòng ban)</option>
                    <option value="Self">Self (Cá nhân)</option>
                  </select>
                </div>
             </div>
          </div>

          <!-- Granular Permissions -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21.355r-.078-.023a20.27 20.27 0 00-1.178-.499c-.897-.31-2.07-.754-3.325-1.284-2.51-1.061-5.107-2.312-5.107-2.312a1 1 0 01-.512-.862V7.155a1 1 0 01.554-.894l8.125-3.847a1 1 0 01.894 0l8.125 3.847a1 1 0 01.554.894v7.24a1 1 0 01-.512.862s-2.596 1.251-5.107 2.312c-1.255.53-2.428.974-3.325 1.284a20.27 20.27 0 00-1.178.499l-.078.023z" /></svg>
                Quyền hạn chi tiết
              </h4>
              <p v-if="isAdmin" class="text-[9px] text-amber-600 font-bold bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">FULL ACCESS ENABLED</p>
            </div>

            <div v-if="!isAdmin" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div 
                v-for="perm in availablePermissions" 
                :key="perm.id"
                @click="togglePermission(perm.id)"
                :class="[
                  'p-3 rounded-xl border transition-all cursor-pointer group flex flex-col gap-2',
                  formData.permissions.includes(perm.id)
                    ? 'bg-primary-50 dark:bg-primary-900/10 border-primary-200 dark:border-primary-800'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-primary-300'
                ]"
              >
                <div class="flex items-center justify-between">
                  <span class="text-[11px] font-bold" :class="formData.permissions.includes(perm.id) ? 'text-primary-700 dark:text-primary-300' : 'text-slate-700 dark:text-slate-300'">
                    {{ perm.label }}
                  </span>
                  <div v-if="formData.permissions.includes(perm.id)" class="w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
                  </div>
                </div>
                <p class="text-[9px] text-slate-400 font-medium leading-tight">{{ perm.description }}</p>
              </div>
            </div>

            <div v-else class="p-12 text-center bg-slate-50 dark:bg-slate-800/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
               <div class="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
               </div>
               <h5 class="text-sm font-bold text-slate-800 dark:text-slate-100">Administrator Mode</h5>
               <p class="text-xs text-slate-500 mt-1 max-w-xs mx-auto">This user has full access to all system modules and actions across all scopes.</p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3 bg-slate-50/50 dark:bg-slate-800/50">
          <button @click="$emit('update:modelValue', false)" class="px-6 py-2 rounded-xl text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">Hủy</button>
          <button 
            @click="handleSave" 
            :disabled="saving"
            class="px-8 py-2 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50"
          >
            <span v-if="saving">Đang lưu...</span>
            <span v-else>Lưu thay đổi</span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  user: Object
})

const emit = defineEmits(['update:modelValue', 'save'])

const config = useRuntimeConfig()
const saving = ref(false)
const allApps = ref([])
const formData = ref({
  position: 'Staff',
  status: 'ACTIVE',
  scope: 'Self',
  is_verified: false,
  roles: ['USER'],
  permissions: []
})

const availablePermissions = [
  { id: 'user.create', label: 'Create User', description: 'Allow creating new team members' },
  { id: 'user.edit', label: 'Edit User', description: 'Modify existing user details' },
  { id: 'invoice.view', label: 'View Invoices', description: 'Access to financial records' },
  { id: 'report.export', label: 'Export Reports', description: 'Download system data' },
  { id: 'news.publish', label: 'Publish News', description: 'Make news articles public' },
  { id: 'product.manage', label: 'Manage Products', description: 'CRUD operations on products' },
]

const isAdmin = computed(() => formData.value.roles.includes('ADMIN'))

watch(() => props.user, (newVal) => {
  if (newVal) {
    formData.value = {
      position: newVal.position || 'Staff',
      status: newVal.status || 'ACTIVE',
      scope: newVal.scope || 'Self',
      is_verified: newVal.is_verified || false,
      roles: Array.isArray(newVal.roles) ? [...newVal.roles] : [newVal.roles || 'USER'],
      permissions: Array.isArray(newVal.permissions) ? [...newVal.permissions] : []
    }
  }
}, { immediate: true })

const fetchApps = async () => {
  try {
    const session = localStorage.getItem('loginSession')
    const token = session ? JSON.parse(session).token : ''

    const response = await $fetch(`${config.public.apiBase}/permissions/list`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    allApps.value = response.result || []
  } catch (error) {
    console.error('Error fetching apps:', error)
  }
}

onMounted(() => {
  fetchApps()
})

const toggleAdminRole = (toAdmin) => {
  if (toAdmin) {
    if (!formData.value.roles.includes('ADMIN')) {
      formData.value.roles = ['ADMIN']
    }
  } else {
    formData.value.roles = ['USER']
  }
}

const togglePermission = (permId) => {
  const index = formData.value.permissions.indexOf(permId)
  if (index === -1) {
    formData.value.permissions.push(permId)
  } else {
    formData.value.permissions.splice(index, 1)
  }
}

const toggleApp = (appId) => {
  togglePermission(appId)
}

const handleSave = async () => {
  saving.value = true
  try {
    if (formData.value.roles.length === 0) formData.value.roles = ['USER']
    
    emit('save', {
      email: props.user.email,
      ...formData.value
    })
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
</style>
