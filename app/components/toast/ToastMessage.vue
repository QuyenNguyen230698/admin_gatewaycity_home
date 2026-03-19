<template>
  <Teleport to="body">
    <Transition name="toast-slide">
      <div v-if="visible" :class="[positionClass, widthClass]" class="fixed z-[9999] px-4">
        <div :class="[typeClass, 'flex items-center gap-4 p-4 rounded-2xl shadow-2xl backdrop-blur-md border animate-in fade-in zoom-in duration-300']">
          
          <!-- Icon Circle -->
          <div :class="iconBgClass" class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-inner">
             <svg v-if="typeToast === 'success'" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
             <svg v-else-if="typeToast === 'error'" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
             <svg v-else-if="typeToast === 'warning'" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
             <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>

          <!-- Message -->
          <div class="flex-1 min-w-0">
             <h4 class="text-xs font-bold uppercase tracking-widest opacity-80">{{ typeToast || 'Message' }}</h4>
             <p class="text-sm font-bold truncate">{{ message }}</p>
          </div>

          <!-- Close Button -->
          <button @click="closeToast" class="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  typeToast: { type: String, default: 'info' },
  message: { type: String, default: '' },
  show: { type: Boolean, required: true },
  width: { type: String, default: 'w-80' },
  position: { type: String, default: 'top-center' },
  customTop: { type: String, default: 'top-10' }
});

const visible = ref(false);

const widthClass = computed(() => props.width);

const typeClass = computed(() => {
  switch (props.typeToast) {
    case 'success': return 'bg-green-500/90 text-white border-green-400/50';
    case 'error': return 'bg-red-500/90 text-white border-red-400/50';
    case 'warning': return 'bg-amber-500/90 text-white border-amber-400/50';
    case 'info': return 'bg-primary-600/90 text-white border-primary-500/50';
    default: return 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700';
  }
});

const iconBgClass = computed(() => {
  switch (props.typeToast) {
    case 'success': return 'bg-green-400';
    case 'error': return 'bg-red-400';
    case 'warning': return 'bg-amber-400';
    case 'info': return 'bg-primary-500';
    default: return 'bg-slate-400';
  }
});

const positionClass = computed(() => {
  const top = props.customTop || 'top-10';
  switch (props.position) {
    case 'top-start': return `${top} left-10`;
    case 'top-end': return `${top} right-10`;
    case 'bottom-start': return 'bottom-10 left-10';
    case 'bottom-end': return 'bottom-10 right-10';
    default: return `${top} left-1/2 -translate-x-1/2`;
  }
});

const showToast = () => {
  visible.value = true;
  setTimeout(closeToast, 4000);
};

const closeToast = () => {
  visible.value = false;
};

watch(() => props.show, (newVal) => {
  if (newVal) showToast();
});

defineExpose({ show: showToast, close: closeToast });
</script>

<style scoped>
.toast-slide-enter-active, .toast-slide-leave-active { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.toast-slide-enter-from { opacity: 0; transform: translate(-50%, -20px) scale(0.9); }
.toast-slide-leave-to { opacity: 0; transform: translate(-50%, -10px) scale(0.9); }

/* Overriding position transform for centers since transition might conflict */
.fixed[class*="left-1/2"] {
  left: 50% !important;
  transform: translateX(-50%) !important;
}
</style>
