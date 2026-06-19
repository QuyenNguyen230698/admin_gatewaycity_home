<template>
  <div 
    class="animate-pulse bg-slate-200 dark:bg-slate-800"
    :class="[
      shapeClasses,
      className
    ]"
    :style="styleObj"
  ></div>
</template>

<script setup>
const props = defineProps({
  width: { type: String, default: '100%' },
  height: { type: String, default: '1rem' },
  shape: { type: String, default: 'rect' }, // rect, circle, text
  className: { type: String, default: '' }
})

const shapeClasses = computed(() => {
  if (props.shape === 'circle') return 'rounded-full'
  if (props.shape === 'text') return 'rounded h-3 w-3/4'
  return 'rounded-md'
})

const styleObj = computed(() => ({
  width: props.width,
  height: props.height
}))
</script>
