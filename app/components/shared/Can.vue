<template>
  <component :is="wrapper">
    <slot v-if="allowed"></slot>
    <slot name="else" v-else></slot>
  </component>
</template>

<script setup>
const props = defineProps({
  I: { type: String, required: true },
  a: { type: String, required: true },
  attributes: { type: Object, default: null },
  as: { type: String, default: 'template' } // 'div', 'span', or 'template'
})

const { can } = usePermission()
const allowed = computed(() => can(props.I, props.a, props.attributes))
const wrapper = computed(() => props.as === 'template' ? 'div' : props.as) // template can't have multiple logic slots easily in some versions, using div/span is safer
</script>
