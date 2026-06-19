<template>
  <span 
    class="inline-flex items-center font-bold px-2 py-0.5 rounded-full whitespace-nowrap tracking-wide leading-none"
    :class="[
      sizeClasses[size],
      variantClasses[variant]
    ]"
  >
    <div v-if="dot" class="w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse" :class="dotColor"></div>
    <slot />
  </span>
</template>

<script setup>
const props = defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'xs' },
  dot: { type: Boolean, default: false }
})

const sizeClasses = {
  xs: 'text-[9px] uppercase',
  sm: 'text-[10px] uppercase',
  md: 'text-xs'
}

const variantClasses = {
  primary: 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400',
  success: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  warning: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  danger: 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
  info: 'bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400',
  slate: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
}

const dotColor = computed(() => {
  switch (props.variant) {
    case 'success': return 'bg-emerald-500'
    case 'danger': return 'bg-rose-500'
    case 'warning': return 'bg-amber-500'
    case 'primary': return 'bg-primary-500'
    default: return 'bg-slate-500'
  }
})
</script>
