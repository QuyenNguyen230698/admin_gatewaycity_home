<template>
  <div class="flex flex-col items-center w-full">
    <div ref="googleBtn" class="w-full flex justify-center min-h-[44px]">
       <div v-if="!scriptLoaded" class="w-full h-11 bg-slate-100 animate-pulse rounded-full flex items-center justify-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
         Initializing Google Login...
       </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  clientId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['success', 'error'])
const googleBtn = ref(null)
const scriptLoaded = ref(false)

const loadGoogleScript = () => {
  return new Promise((resolve, reject) => {
    if (window.google) {
      scriptLoaded.value = true
      return resolve()
    }
    
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => {
      scriptLoaded.value = true
      resolve()
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
}

const handleCredentialResponse = (response) => {
  if (response.credential) {
    emit('success', response.credential)
  } else {
    emit('error', 'No credential returned')
  }
}

onMounted(async () => {
  try {
    await loadGoogleScript()
    
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: props.clientId,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      })

      window.google.accounts.id.renderButton(googleBtn.value, {
        theme: 'outline',
        size: 'large',
        width: '100%',
        text: 'signin_with',
        shape: 'pill',
        logo_alignment: 'left'
      })

      // Optional: Display One Tap prompt
      // window.google.accounts.id.prompt()
    }
  } catch (error) {
    console.error('Google script failed to load:', error)
    emit('error', 'Google Identity Services failed to load')
  }
})
</script>
