<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div 
        v-for="field in schema" 
        :key="field.id" 
        :class="field.fullWidth ? 'md:col-span-2' : ''"
      >
        <!-- Text / Password / Email / Number -->
        <div v-if="['text', 'password', 'email', 'number', 'tel', 'url'].includes(field.type)">
          <BaseInput
            v-model="formData[field.id]"
            :label="field.label"
            :type="field.type"
            :placeholder="field.placeholder"
            :required="field.required"
            :error="errors[field.id]"
          >
            <template #icon v-if="field.icon">
              <div class="w-4 h-4" v-html="field.icon"></div>
            </template>
          </BaseInput>
        </div>

        <!-- Textarea -->
        <div v-else-if="field.type === 'textarea'" class="space-y-1">
          <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
            {{ field.label }}
            <span v-if="field.required" class="text-red-500">*</span>
          </label>
          <textarea
            v-model="formData[field.id]"
            :placeholder="field.placeholder"
            class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-sm focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all min-h-[120px]"
            :class="{ 'border-red-400': errors[field.id] }"
          ></textarea>
           <p v-if="errors[field.id]" class="text-[11px] text-red-500 mt-1 ml-1 font-medium">{{ errors[field.id] }}</p>
        </div>

        <!-- Select -->
        <div v-else-if="field.type === 'select'" class="space-y-1">
           <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
            {{ field.label }}
            <span v-if="field.required" class="text-red-500">*</span>
          </label>
          <div class="relative">
            <select
              v-model="formData[field.id]"
              class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 appearance-none transition-all cursor-pointer"
              :class="{ 'border-red-400': errors[field.id] }"
            >
              <option value="" disabled>{{ field.placeholder || 'Select an option' }}</option>
              <option v-for="opt in field.options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
            <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
               <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
           <p v-if="errors[field.id]" class="text-[11px] text-red-500 mt-1 ml-1 font-medium">{{ errors[field.id] }}</p>
        </div>

        <!-- Checkbox / Switch -->
        <div v-else-if="field.type === 'switch'" class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
           <div>
             <h4 class="text-sm font-bold text-slate-700 dark:text-slate-200">{{ field.label }}</h4>
             <p class="text-[11px] text-slate-500">{{ field.description }}</p>
           </div>
           <button 
             type="button"
             class="w-10 h-6 rounded-full transition-colors relative"
             :class="formData[field.id] ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600'"
             @click="formData[field.id] = !formData[field.id]"
           >
             <div 
               class="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform"
               :class="formData[field.id] ? 'translate-x-4' : ''"
             ></div>
           </button>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
      <BaseButton variant="secondary" @click="$emit('cancel')">Cancel</BaseButton>
      <BaseButton type="submit" :loading="loading" class="min-w-[120px]">
        {{ submitLabel || 'Submit' }}
      </BaseButton>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  schema: { type: Array, required: true },
  initialData: { type: Object, default: () => ({}) },
  loading: { type: Boolean, default: false },
  submitLabel: String
})

const emit = defineEmits(['submit', 'cancel'])

const formData = ref({})
const errors = ref({})

// Initialize form data
onMounted(() => {
  props.schema.forEach(field => {
    formData.value[field.id] = props.initialData[field.id] ?? field.defaultValue ?? (field.type === 'switch' ? false : '')
  })
})

const handleSubmit = () => {
  errors.value = {}
  
  // Basic validation
  props.schema.forEach(field => {
    if (field.required && !formData.value[field.id]) {
      errors.value[field.id] = `${field.label} is required`
    }
  })
  
  if (Object.keys(errors.value).length === 0) {
    emit('submit', { ...formData.value })
  }
}
</script>
