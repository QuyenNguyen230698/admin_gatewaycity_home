<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
    <div class="relative w-full max-w-md px-8 py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50">
      <!-- Decorative -->
      <div class="absolute -top-6 -left-6 w-12 h-12 bg-blue-500/10 rounded-full blur-xl"></div>
      <div class="absolute -bottom-8 -right-8 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl"></div>

      <!-- Logo -->
      <div class="flex justify-center mb-10">
        <div class="relative">
          <div class="absolute -inset-4 bg-blue-100/30 rounded-full blur"></div>
          <NuxtImg class="relative h-16 w-16" src="https://res.cloudinary.com/dpcigceaq/image/upload/v1765281506/Media%20Gateway%20City/iiingth1w5eatij5cju0.svg" alt="logo" format="webp" loading="eager" />
        </div>
      </div>

      <!-- Form -->
      <div class="space-y-8">
        <div class="text-center space-y-2">
          <h2 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p class="text-gray-600">Đăng nhập bằng tài khoản nội bộ</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Tài khoản</label>
            <input
              v-model="email"
              type="text"
              required
              autocomplete="email"
              placeholder="Nhập tài khoản email"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none bg-white/70 transition"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Mật khẩu</label>
            <input
              v-model="password"
              type="password"
              required
              autocomplete="current-password"
              placeholder="Nhập mật khẩu"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none bg-white/70 transition"
            />
          </div>

          <!-- Thông báo lỗi -->
          <transition name="fade">
            <div v-if="error" class="text-red-600 text-center text-sm bg-red-50 py-2.5 px-4 rounded-lg">
              {{ error }}
            </div>
          </transition>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Đang đăng nhập...
            </span>
            <span v-else>Đăng nhập</span>
          </button>
        </form>
      </div>

      <div class="mt-12 text-center text-sm text-gray-500">
        © 2025 Gateway City - Vĩnh Long. <strong>All rights reserved.</strong>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const config = useRuntimeConfig()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

// Kiểm tra session
const isLoginSessionValid = () => {
  const session = localStorage.getItem('loginSession')
  if (!session) return false

  try {
    const { expiry } = JSON.parse(session)
    return new Date().getTime() < expiry
  } catch {
    return false
  }
}

// Xử lý login
const handleLogin = async () => {
  error.value = ''
  loading.value = true

  await new Promise(resolve => setTimeout(resolve, 600))

  try {
    const response = await $fetch(`${config.public.apiBase}/users/login-admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })

    const { token, data: user } = response

    // ⏳ Set expiry sau 24h (hoặc 5 phút tuỳ bạn)
    const expiryTime = Date.now() + 30 * 60 * 1000

    // 🔥 LƯU TẤT CẢ VÀO 1 OBJECT
    const sessionData = {
      token,
      user,
      expiry: expiryTime
    }

    localStorage.setItem('loginSession', JSON.stringify(sessionData))

    // Điều hướng về trang news
    router.push('/')

  } catch (err) {
    error.value = 'Tài khoản hoặc mật khẩu không chính xác'
  } finally {
    loading.value = false
  }
}


// Tự động login nếu session còn hợp lệ
onMounted(() => {
  if (isLoginSessionValid()) {
    router.push('/')
  }
})
</script>


<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>