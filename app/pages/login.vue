<template>
  <div class="h-screen w-screen overflow-hidden bg-[#f8f9fa] flex items-center justify-center p-6 relative font-sans antialiased">
    
    <LoginThreeBackground class="z-0" />
    
    <div class="absolute inset-0 pointer-events-none z-10 opacity-[0.01] bg-[linear-gradient(#4285f4_1px,transparent_1px)] bg-[length:100%_4px]"></div>

    <div ref="loginContainer" 
         class="relative z-20 w-full max-w-md p-10 bg-white/80 backdrop-blur-xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] opacity-0 transform translate-y-8 rounded-2xl">
      
      <header class="text-center mb-10">
        <div class="flex justify-center mb-6">
           <div class="w-20 h-20 rounded-full bg-white border border-gray-100 flex items-center justify-center relative shadow-sm group">
              <div class="absolute inset-0 rounded-full border border-blue-500 animate-ping opacity-10"></div>
              <NuxtImg class="h-12 w-12 relative z-10 object-contain group-hover:scale-110 transition-transform"
                       src="https://res.cloudinary.com/dpcigceaq/image/upload/v1781874951/AdminAssets/htbspgp5pevgh953qwuk.png"
                       alt="Gateway Co Chien" />
           </div>
        </div>
        <h2 class="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 mb-2">Secure Access</h2>
        <h1 class="text-2xl font-semibold text-gray-900 tracking-tight">System Login</h1>
      </header>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <SharedBaseInput
          v-model="email"
          label="Email Address"
          placeholder="name@company.com"
          type="text"
          :error="loginError"
          class="google-input"
        />

        <SharedBaseInput
          v-model="password"
          label="Password"
          placeholder="••••••••"
          type="password"
        />

        <div class="pt-2">
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium py-3 rounded-lg transition-all shadow-md disabled:opacity-50"
          >
            <span v-if="!loading">Sign In</span>
            <span v-else>Processing...</span>
          </button>
        </div>

        <div class="relative flex items-center gap-4 py-2">
          <div class="flex-1 h-[1px] bg-gray-200"></div>
          <span class="text-[10px] font-medium text-gray-400 uppercase">Identity Provider</span>
          <div class="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        <div class="flex justify-center">
          <LoginGoogleSignIn 
            :clientId="config.public.googleClientId" 
            @success="handleGoogleSuccess"
            @error="err => loginError = err"
          />
        </div>
      </form>

      <footer class="mt-10 text-center text-[11px] text-gray-400 flex flex-col items-center gap-1">
         <span class="font-medium">© 2026 Gateway Co Chien</span>
         <div class="flex gap-3 opacity-70">
            <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Core Optimal</span>
            <span>Encrypted Link</span>
         </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'

definePageMeta({
  layout: false
})

const router = useRouter()
const config = useRuntimeConfig()

const loginContainer = ref(null)
const email = ref('')
const password = ref('')
const loading = ref(false)
const loginError = ref('')

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

const handleLogin = async () => {
  loginError.value = ''
  loading.value = true
  try {
    const response = await $fetch(`${config.public.apiBase}/users/login-admin`, {
      method: 'POST',
      body: JSON.stringify({ email: email.value, password: password.value }),
    })
    saveSession(response.token, response.data)
    router.push('/callback')
  } catch (err) {
    loginError.value = 'Cipher Mismatch. Access Denied.'
  } finally {
    loading.value = false
  }
}

const handleGoogleSuccess = async (idToken) => {
  loginError.value = ''
  loading.value = true
  try {
    const response = await $fetch(`${config.public.apiBase}/auth/google/login`, {
      method: 'POST',
      body: JSON.stringify({ idToken }),
    })
    if (response.result) {
      saveSession(response.token, response.data)
      router.push('/callback')
    } else {
      loginError.value = response.message || 'Bridge Failed.'
    }
  } catch (err) {
    loginError.value = 'Infrastructure Link Timeout.'
  } finally {
    loading.value = false
  }
}

const saveSession = (token, user) => {
  const sessionData = { token, user, expiry: Date.now() + 86400000 }
  localStorage.setItem('loginSession', JSON.stringify(sessionData))
}

onMounted(() => {
  gsap.to(loginContainer.value, {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: 'expo.out',
    delay: 0.3
  })

  if (isLoginSessionValid()) {
    router.push('/')
  }
})
</script>

<style scoped>
.glass-effect {
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(20px);
}
</style>