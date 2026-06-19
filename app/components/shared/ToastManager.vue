<template>
  <Teleport to="body">
    <div class="fixed top-5 right-5 z-[1000] space-y-3 w-[340px] pointer-events-none">
      <transition-group @before-enter="beforeEnter" @enter="enter" @leave="leave" :css="false">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto w-full group overflow-hidden"
        >
          <!-- Google-style Toast Card -->
          <div
            :class="['flex items-center gap-3 p-4 rounded-xl shadow-lg border', toastClasses(toast)]"
            style="background:#ffffff;"
          >
            <!-- Icon -->
            <div :class="['w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', iconBg(toast)]">
              <svg v-if="toast.type === 'success'" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
              <svg v-else-if="toast.type === 'error'" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <p class="text-[12px] font-semibold leading-snug truncate" style="color:#1f2937;">{{ toast.message }}</p>
            </div>

            <!-- Close -->
            <button
              @click="remove(toast.id)"
              class="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg transition-all flex-shrink-0"
              style="color:#9ca3af;"
              onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background=''"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <!-- Progress bar -->
            <div class="progress-bar absolute bottom-0 left-0 h-[3px] w-full rounded-b-xl" :style="{ backgroundColor: progressColor(toast) }"></div>
          </div>
        </div>
      </transition-group>
    </div>
  </Teleport>
</template>

<script setup>
import { useToast } from '~/composables/useToast'
import gsap from 'gsap'

const { toasts, remove } = useToast()

const beforeEnter = (el) => {
  gsap.set(el, { x: 60, opacity: 0, scale: 0.95 })
}

const enter = (el, done) => {
  const tl = gsap.timeline({ onComplete: done })
  tl.to(el, { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)' })
  const bar = el.querySelector('.progress-bar')
  if (bar) gsap.to(bar, { width: '0%', duration: 4, ease: 'linear' })
}

const leave = (el, done) => {
  gsap.to(el, { x: 60, opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.in', onComplete: done })
}

const toastClasses = (toast) => {
  switch (toast.type) {
    case 'success': return 'border-emerald-200'
    case 'error':   return 'border-red-200'
    default:        return 'border-blue-200'
  }
}

const iconBg = (toast) => {
  switch (toast.type) {
    case 'success': return 'bg-emerald-50'
    case 'error':   return 'bg-red-50'
    default:        return 'bg-blue-50'
  }
}

const progressColor = (toast) => {
  switch (toast.type) {
    case 'success': return '#10b981'
    case 'error':   return '#ef4444'
    default:        return '#3b82f6'
  }
}
</script>
