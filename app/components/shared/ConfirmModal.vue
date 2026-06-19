<template>
  <Teleport to="body">
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
      :css="false"
    >
      <div v-if="modelValue" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="modal-backdrop absolute inset-0 bg-slate-900/60 backdrop-blur-md opacity-0"></div>
        
        <!-- Modal Content -->
        <div class="modal-box relative bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] w-full max-w-sm overflow-hidden border border-white/20 dark:border-slate-800/50 opacity-0 scale-90">
          <div class="p-8 text-center space-y-6">
            <!-- Icon -->
            <div :class="['modal-icon w-20 h-20 rounded-[2rem] mx-auto flex items-center justify-center translate-y-4 opacity-0', iconBgClass]">
              <slot name="icon">
                <svg v-if="type === 'danger'" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </slot>
            </div>
            
            <div class="space-y-2">
              <h3 class="modal-title text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight translate-y-4 opacity-0">{{ title }}</h3>
              <p class="modal-desc text-sm text-slate-500 font-medium leading-relaxed translate-y-4 opacity-0">{{ message }}</p>
            </div>

            <div class="modal-buttons flex gap-3 pt-4 translate-y-4 opacity-0">
              <button @click="$emit('update:modelValue', false)" class="flex-1 px-6 py-3.5 rounded-2xl text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-100 dark:border-slate-800">
                {{ cancelText }}
              </button>
              <button @click="$emit('confirm')" :class="['flex-1 px-6 py-3.5 rounded-2xl text-white font-black uppercase tracking-widest text-xs shadow-xl transition-all active:scale-95', confirmBtnClass]">
                {{ confirmText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { computed, ref } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  modelValue: Boolean,
  title: { type: String, default: 'Xác nhận' },
  message: { type: String, default: 'Bạn có chắc chắn muốn thực hiện hành động này?' },
  confirmText: { type: String, default: 'Xác nhận' },
  cancelText: { type: String, default: 'Hủy' },
  type: { type: String, default: 'info' },
})

const emit = defineEmits(['update:modelValue', 'confirm'])

// GSAP Animations
const backdrop = ref(null)
const modalBox = ref(null)
const iconRef = ref(null)
const titleRef = ref(null)
const descRef = ref(null)
const buttonsRef = ref(null)

const beforeEnter = (el) => {
  const backdropEl = el.querySelector('.modal-backdrop')
  const modalBoxEl = el.querySelector('.modal-box')
  const iconEl = el.querySelector('.modal-icon')
  const titleEl = el.querySelector('.modal-title')
  const descEl = el.querySelector('.modal-desc')
  const buttonsEl = el.querySelector('.modal-buttons')

  gsap.set(backdropEl, { opacity: 0 })
  gsap.set(modalBoxEl, { opacity: 0, scale: 0.9 })
  gsap.set([iconEl, titleEl, descEl, buttonsEl], { opacity: 0, y: 15 })
}

const enter = (el, done) => {
  const backdropEl = el.querySelector('.modal-backdrop')
  const modalBoxEl = el.querySelector('.modal-box')
  const iconEl = el.querySelector('.modal-icon')
  const titleEl = el.querySelector('.modal-title')
  const descEl = el.querySelector('.modal-desc')
  const buttonsEl = el.querySelector('.modal-buttons')

  const tl = gsap.timeline({ onComplete: done })
  
  tl.to(backdropEl, { opacity: 1, duration: 0.5, ease: 'power2.out' })
  tl.to(modalBoxEl, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.3')
  tl.to([iconEl, titleEl, descEl, buttonsEl], {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power3.out'
  }, '-=0.4')
}

const leave = (el, done) => {
  const backdropEl = el.querySelector('.modal-backdrop')
  const modalBoxEl = el.querySelector('.modal-box')
  const iconEl = el.querySelector('.modal-icon')
  const titleEl = el.querySelector('.modal-title')
  const descEl = el.querySelector('.modal-desc')
  const buttonsEl = el.querySelector('.modal-buttons')

  const tl = gsap.timeline({ onComplete: done })
  
  tl.to([buttonsEl, descEl, titleEl, iconEl], {
    opacity: 0,
    y: 10,
    duration: 0.3,
    stagger: 0.05,
    ease: 'power2.in'
  })
  tl.to(modalBoxEl, { scale: 0.9, opacity: 0, duration: 0.4, ease: 'power2.in' }, '-=0.2')
  tl.to(backdropEl, { opacity: 0, duration: 0.4 }, '-=0.3')
}

const iconBgClass = computed(() => {
  switch (props.type) {
    case 'danger': return 'bg-red-50 dark:bg-red-900/20'
    case 'warning': return 'bg-amber-50 dark:bg-amber-900/20'
    default: return 'bg-blue-50 dark:bg-blue-900/20'
  }
})

const confirmBtnClass = computed(() => {
  switch (props.type) {
    case 'danger': return 'bg-red-600 shadow-red-600/30 hover:bg-red-700'
    case 'warning': return 'bg-amber-500 shadow-amber-500/30 hover:bg-amber-600'
    default: return 'bg-blue-600 shadow-blue-600/30 hover:bg-blue-700'
  }
})
</script>
