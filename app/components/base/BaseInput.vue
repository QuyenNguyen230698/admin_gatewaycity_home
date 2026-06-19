<template>
  <div class="space-y-1.5" :class="{ 'opacity-50 pointer-events-none': disabled }">
    <label v-if="label" :for="id" class="block text-sm font-medium text-[--color-google-text-main] ml-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative group">
      <div v-if="$slots.icon" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[--color-google-primary] transition-colors">
        <slot name="icon" />
      </div>

      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="w-full bg-white border transition-all duration-300 outline-none placeholder:text-gray-400"
        :class="[
          $slots.icon ? 'pl-10 pr-4' : 'px-4',
          error 
            ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
            : 'border-[--color-google-border] focus:border-[--color-google-primary] focus:ring-1 focus:ring-[--color-google-primary]',
          sizeClasses[size]
        ]"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
      
      <p v-if="error" class="text-[11px] text-red-500 mt-1 ml-1 font-medium transition-all animate-fade-in">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  id: { type: String, default: () => `input-${Math.random().toString(36).substr(2, 9)}` },
  size: { type: String, default: 'md' },
  error: String,
  disabled: Boolean,
  required: Boolean
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const sizeClasses = {
  sm: 'py-1.5 text-xs rounded-[--radius-google-sm]',
  md: 'py-2.5 text-sm rounded-[--radius-google-sm]',
  lg: 'py-3.5 text-base rounded-[--radius-google-sm]'
}
</script>
