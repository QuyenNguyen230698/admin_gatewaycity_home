<template>
  <div class="h-full flex flex-col">

    <!-- Sticky Header -->
    <div class="px-8 py-6 border-b border-zinc-200 dark:border-zinc-800
                flex items-center justify-between shrink-0
                bg-white dark:bg-slate-900 sticky top-0 z-10">
      <div>
        <h1 class="text-2xl font-bold text-zinc-900 dark:text-white">
          Quản lý Nhân sự
          <span class="ml-2 px-2 py-0.5 text-xs font-bold bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full align-middle">
            {{ users.length }} Users
          </span>
        </h1>
        <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Quản lý tài khoản, chức vụ và phân quyền truy cập hệ thống.</p>
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
          placeholder="Tìm theo email..." />
      </div>
      <div class="flex items-center gap-3">
        <button @click="fetchUsers"
          class="w-9 h-9 flex items-center justify-center
                 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700
                 rounded-lg text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
          <i class="bi bi-arrow-clockwise"></i>
        </button>
      </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 overflow-auto px-8 py-4">

      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center h-64 text-zinc-400">
        <div class="w-8 h-8 border-2 border-zinc-300 border-t-zinc-600 rounded-full animate-spin mb-4"></div>
        <p>Loading users...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="!filteredUsers.length"
        class="flex flex-col items-center justify-center h-64 text-zinc-400
               border-2 border-dashed border-zinc-200 dark:border-zinc-800
               rounded-xl bg-zinc-50/50 dark:bg-zinc-800/30">
        <div class="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
          <i class="bi bi-people text-2xl"></i>
        </div>
        <h3 class="text-zinc-900 dark:text-white font-medium mb-1">No users found</h3>
        <p class="text-sm">Try adjusting your search</p>
      </div>

      <!-- Table -->
      <div v-else class="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-700">
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Hồ sơ</th>
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Loại tài khoản</th>
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Vị trí</th>
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Trạng thái</th>
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Phân quyền</th>
              <th class="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100 dark:divide-zinc-700">
            <tr v-for="user in filteredUsers" :key="user._id"
              class="group hover:bg-zinc-50 dark:hover:bg-zinc-700/30 transition-colors">

              <!-- Profile -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="relative">
                    <img v-if="user.avatar" :src="user.avatar"
                      class="w-10 h-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-700 shadow-sm" />
                    <div v-else
                      class="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600
                             flex items-center justify-center text-zinc-600 dark:text-zinc-200 font-bold text-sm">
                      {{ (user.username || user.email || '?')[0].toUpperCase() }}
                    </div>
                    <img v-if="user.googleId"
                      src="https://res.cloudinary.com/dpcigceaq/image/upload/v1741069754/google-icon_v1.svg"
                      class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border border-white dark:border-zinc-800 bg-white" />
                  </div>
                  <div class="flex flex-col">
                    <span class="text-sm font-semibold text-zinc-900 dark:text-white">{{ user.username || 'N/A' }}</span>
                    <span class="text-xs text-zinc-500">{{ user.email }}</span>
                  </div>
                </div>
              </td>

              <!-- Account Type -->
              <td class="px-6 py-4">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border"
                  :class="user.googleId
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-600'">
                  <span class="w-1.5 h-1.5 rounded-full" :class="user.googleId ? 'bg-green-500' : 'bg-zinc-400'"></span>
                  {{ user.googleId ? 'Google' : 'Local' }}
                </span>
              </td>

              <!-- Position -->
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  {{ user.position || 'Staff' }}
                </span>
              </td>

              <!-- Status Toggle -->
              <td class="px-6 py-4">
                <button
                  @click="toggleUserStatus(user)"
                  :class="['w-11 h-6 transition-all rounded-full relative focus:outline-none',
                    user.status === 'ACTIVE' ? 'bg-black dark:bg-white' : 'bg-zinc-300 dark:bg-zinc-600']"
                >
                  <div :class="['w-5 h-5 rounded-full absolute top-0.5 transition-all shadow-sm',
                    user.status === 'ACTIVE' ? 'left-[22px] bg-white dark:bg-black' : 'left-0.5 bg-white']"></div>
                </button>
              </td>

              <!-- Permissions -->
              <td class="px-6 py-4">
                <span v-if="isAdmin(user)"
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                  <i class="bi bi-shield-shaded text-amber-600"></i>
                  ALL Apps (Admin)
                </span>
                <span v-else class="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                  {{ appCount(user) }} Apps
                </span>
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click="openEditModal(user)"
                    class="w-8 h-8 flex items-center justify-center rounded-lg
                           hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                    <i class="bi bi-pencil text-sm"></i>
                  </button>
                  <button @click="deleteUser(user)"
                    class="w-8 h-8 flex items-center justify-center rounded-lg
                           hover:bg-red-50 dark:hover:bg-red-900/20 text-zinc-500 hover:text-red-600 transition-colors">
                    <i class="bi bi-trash text-sm"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Edit Modal -->
    <PermissionsEditModal
      v-model="showEditModal"
      :user="selectedUser"
      @save="handleSave"
    />

    <UIConfirmModal
      v-model="showDeleteConfirm"
      title="Xác nhận xóa"
      message="Bạn có chắc chắn muốn xóa nhân sự này? Hành động này sẽ chuyển trạng thái sang INACTIVE."
      type="danger"
      confirmText="Xóa ngay"
      @confirm="handleConfirmDelete"
    />
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })

import { ref, computed, onMounted } from 'vue'

const config = useRuntimeConfig()
const users = ref([])
const searchQuery = ref('')
const showEditModal = ref(false)
const selectedUser = ref(null)
const showDeleteConfirm = ref(false)
const userToDelete = ref(null)
const isLoading = ref(false)

const fetchUsers = async () => {
  isLoading.value = true
  try {
    const session = localStorage.getItem('loginSession')
    const token = session ? JSON.parse(session).token : ''
    const response = await $fetch(`${config.public.apiBase}/users/find-user`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: { status: { $ne: 'DELETED' } }
    })
    users.value = response.data || []
  } catch (err) {
    console.error('Error fetching users:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => { fetchUsers() })

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  return users.value.filter(u => u.email.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

const isAdmin = (user) => {
  const roles = Array.isArray(user.roles) ? user.roles : [user.roles]
  return roles.includes('ADMIN')
}

const appCount = (user) => {
  const permissions = Array.isArray(user.permissions) ? user.permissions : []
  return permissions.length
}

const openEditModal = (user) => {
  selectedUser.value = { ...user }
  showEditModal.value = true
}

const handleSave = async (updatedData) => {
  try {
    const session = localStorage.getItem('loginSession')
    const token = session ? JSON.parse(session).token : ''
    const response = await $fetch(`${config.public.apiBase}/users/update`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: updatedData
    })
    if (response.result) {
      toast.success('Cập nhật người dùng thành công!')
      showEditModal.value = false
      fetchUsers()
    } else {
      toast.error(response.message || 'Cập nhật thất bại')
    }
  } catch (err) {
    toast.error('Lỗi khi lưu thay đổi')
  }
}

const toggleUserStatus = async (user) => {
  try {
    const session = localStorage.getItem('loginSession')
    const token = session ? JSON.parse(session).token : ''
    const newStatus = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    await $fetch(`${config.public.apiBase}/users/update`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: { email: user.email, status: newStatus }
    })
    user.status = newStatus
    toast.success(`Đã chuyển trạng thái sang ${newStatus}`)
  } catch (err) {
    toast.error('Lỗi khi đổi trạng thái')
  }
}

const deleteUser = (user) => {
  userToDelete.value = user
  showDeleteConfirm.value = true
}

const handleConfirmDelete = async () => {
  if (!userToDelete.value) return
  showDeleteConfirm.value = false
  try {
    const session = localStorage.getItem('loginSession')
    const token = session ? JSON.parse(session).token : ''
    await $fetch(`${config.public.apiBase}/users/delete`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: { email: userToDelete.value.email, status: 'INACTIVE' }
    })
    toast.success('Đã chuyển nhân sự vào danh sách đã xóa (Inactive)')
    fetchUsers()
  } catch (err) {
    toast.error('Lỗi khi xóa nhân sự')
  } finally {
    userToDelete.value = null
  }
}
</script>
