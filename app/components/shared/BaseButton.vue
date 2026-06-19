<template>
  <button
    class="inline-flex items-center justify-center font-medium tracking-tight transition-all duration-200 focus:outline-none focus-visible:ring-2 disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden select-none"
    :class="[sizeClasses[size], variantClasses[variant], pill ? 'rounded-full' : 'rounded-lg', { 'w-full': block }]"
    :type="type"
    :disabled="loading || disabled"
  >
    <!-- Loading spinner -->
    <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-3.5 w-3.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
    </svg>

    <slot name="left-icon" />
    <span :class="{ 'ml-1.5': $slots['left-icon'] && !loading }" class="relative z-10 leading-none">
      <slot />
    </span>
    <slot name="right-icon" />
  </button>
</template>

<script setup>
defineProps({
  variant:  { type: String, default: "primary" },
  size:     { type: String, default: "md" },
  type:     { type: String, default: "button" },
  loading:  { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  pill:     { type: Boolean, default: false },
  block:    { type: Boolean, default: false },
});

const sizeClasses = {
  xs: "px-2.5 py-1   text-[10px]",
  sm: "px-3   py-1.5 text-[11px]",
  md: "px-4   py-2   text-[12px]",
  lg: "px-5   py-2.5 text-[13px]",
  xl: "px-7   py-3   text-[14px]",
};

/* Google / Antigravity variants */
const variantClasses = {
  /* Blue filled — main CTA */
  primary:
    "ag-gradient-btn text-white shadow-sm hover:shadow-md focus-visible:ring-blue-400",

  /* Outlined Google-style */
  secondary:
    "bg-white text-gray-700 border border-[#dadce0] hover:bg-gray-50 hover:border-blue-400 focus-visible:ring-blue-400",

  /* Ghost / soft */
  outline:
    "bg-transparent text-blue-700 border border-blue-600 hover:bg-blue-50 focus-visible:ring-blue-400",

  ghost:
    "bg-transparent text-gray-600 hover:bg-gray-100 focus-visible:ring-gray-300",

  /* Semantic */
  danger:
    "bg-red-600 text-white hover:bg-red-700 shadow-sm focus-visible:ring-red-400",

  "danger-soft":
    "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 focus-visible:ring-red-300",

  success:
    "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm focus-visible:ring-emerald-400",

  "success-soft":
    "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 focus-visible:ring-emerald-300",
};
</script>
