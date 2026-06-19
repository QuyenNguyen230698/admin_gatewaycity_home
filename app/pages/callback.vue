<template>
  <div class="h-screen w-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans antialiased">
    
    <LoginThreeBackground class="z-0" />

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse z-1"></div>

    <div class="relative z-10 w-full max-w-sm flex flex-col items-center">
       
       <div class="mb-10 relative flex items-center justify-center">
          <svg class="animate-spin h-16 w-16 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-10" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle>
            <path class="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          
          <NuxtImg class="absolute h-6 w-6 opacity-80" src="https://res.cloudinary.com/dpcigceaq/image/upload/v1765281506/Media%20Gateway%20City/iiingth1w5eatij5cju0.svg" alt="logo" />
       </div>

       <div class="text-center space-y-4 w-full">
          <div class="space-y-2">
             <p class="text-[22px] font-medium tracking-tight text-gray-900">
               {{ mainMessage }}
             </p>
             <div class="flex items-center justify-center gap-2">
                <span class="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce"></span>
                <h1 class="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600/80">
                  {{ subStatus }}
                </h1>
             </div>
          </div>
       </div>

       <div class="mt-12 w-full h-10 overflow-hidden opacity-40">
          <div ref="logContainer" class="text-[9px] font-medium text-gray-400 uppercase space-y-1 text-center">
             <div v-for="(log, i) in logItems" :key="i" class="leading-relaxed">{{ log }}</div>
          </div>
       </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'

definePageMeta({ layout: false })

const router = useRouter()
const logContainer = ref(null)
const mainMessage = ref('Authenticating...')
const subStatus = ref('Verifying identity')

const logItems = ref([
  'Initialising Security Kernel...',
  'Connecting to Google Gateway...',
  'Retrieving Session Tokens...',
  'Validating Admin Credentials...',
  'Handshaking with API...',
  'Loading Personal Workspace...',
  'Link Established.'
])

onMounted(() => {
  if (process.server) return

  // Kiểm tra Session
  const session = useCookie('loginSession')
  
  if (!session.value) {
    mainMessage.value = 'Identity Mismatch'
    subStatus.value = 'Redirecting to login'
    setTimeout(() => router.push('/login'), 1500)
    return
  }

  // Animation logic
  const tl = gsap.timeline({
    onComplete: () => {
      setTimeout(() => {
        router.push('/')
      }, 800)
    }
  })

  // Giả lập các giai đoạn thông báo
  tl.to({}, { duration: 1, onStart: () => {
    mainMessage.value = 'Authenticating...'
    subStatus.value = 'Secure handshake'
  }})
  .to({}, { duration: 1, onStart: () => {
    mainMessage.value = 'Syncing Workspace...'
    subStatus.value = 'Loading permissions'
  }})
  .to({}, { duration: 1, onStart: () => {
    mainMessage.value = 'Access Granted'
    subStatus.value = 'Redirecting to dashboard'
  }})

  // Cuộn log đồng bộ
  gsap.to(logContainer.value, {
     y: -100,
     duration: 3,
     ease: "power1.inOut"
  })

  // Hiệu ứng Fade in
  gsap.from('.relative', {
    opacity: 0,
    y: 15,
    duration: 1,
    ease: 'expo.out'
  })
})
</script>

<style scoped>
.font-sans {
  font-family: 'Google Sans', 'Roboto', sans-serif;
}
</style>