<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="informationStore.isOpen" class="fixed inset-0 z-50 flex items-center justify-end">
        <!-- Backdrop -->
        <div @click="closeInformation" class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>
        
        <!-- Drawer Content -->
        <Transition name="slide-right">
          <div v-if="informationStore.isOpen" class="relative w-full max-w-2xl h-full bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col">
            <header class="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
              <h2 class="text-lg font-bold">Details</h2>
              <button @click="closeInformation" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>
            
            <div class="flex-1 overflow-y-auto scrollbar-hide">
              <NewsDrawerInformation @close="closeInformation" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const informationStore = useInformationStore();

const isAnyDrawerOpen = computed(() => informationStore.isOpen);

defineExpose({ isAnyDrawerOpen });

const closeInformation = () => {
  informationStore.setIsOpen(false);
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-right-enter-active, .slide-right-leave-active { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.slide-right-enter-from, .slide-right-leave-to { transform: translateX(100%); }

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
