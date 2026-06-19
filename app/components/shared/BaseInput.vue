<template>
  <div class="space-y-1.5" :class="{ 'opacity-50 pointer-events-none': disabled }">
    <!-- Label row -->
    <div class="flex items-center justify-between px-0.5">
      <label v-if="label" :for="id" class="text-[11px] font-semibold tracking-wide" style="color:#374151;">
        {{ label }}
        <span v-if="required" class="text-red-500 ml-0.5">*</span>
      </label>
      <span v-if="error" class="text-[10px] font-medium text-red-500">{{ error }}</span>
    </div>

    <!-- Input wrapper -->
    <div class="relative group">
      <div v-if="$slots.icon" class="absolute left-3 top-1/2 -translate-y-1/2 z-10 transition-colors" style="color:#9ca3af;">
        <slot name="icon" />
      </div>

      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="w-full border rounded-lg text-[13px] transition-all duration-200 outline-none"
        :class="[$slots.icon ? 'pl-9 pr-4' : 'px-3', sizeClasses[size]]"
        :style="error
          ? 'border-color:#f87171; background:#fff; color:#111827;'
          : 'border-color:#e0e3e8; background:#f8f9fa; color:#111827;'"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="e => { e.target.style.borderColor='#1a73e8'; e.target.style.background='#fff'; e.target.style.boxShadow='0 0 0 3px rgba(26,115,232,0.12)'; $emit('focus', e) }"
        @blur="e => { e.target.style.borderColor=error?'#f87171':'#e0e3e8'; e.target.style.background='#f8f9fa'; e.target.style.boxShadow=''; $emit('blur', e) }"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  type: { type: String, default: "text" },
  placeholder: String,
  id: { type: String, default: () => `input-${Math.random().toString(36).substr(2, 9)}` },
  size: { type: String, default: "md" },
  error: String,
  disabled: Boolean,
  required: Boolean,
});

const emit = defineEmits(["update:modelValue", "focus", "blur"]);

const sizeClasses = {
  sm: "py-1.5",
  md: "py-2.5",
  lg: "py-3.5",
};
</script>
