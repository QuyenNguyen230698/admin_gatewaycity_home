<template>
  <div class="drawer-side z-50">
    <label @click="close" aria-label="close sidebar" class="drawer-overlay"></label>
    <div class="menu p-0 m-0 flex min-h-screen w-3/4 lg:w-2/5 bg-base-200 text-base-content">
      <div class="w-full px-10 mx-auto flex flex-col h-screen bg-1414">
        <!-- Header -->
        <div class="sticky top-0 z-10 bg-1414 flex justify-between items-center pt-10 pb-5">
          <h2 class="text-lg md:text-xl lg:text-2xl font-bold flex gap-2 items-center uppercase font-bold-sans text-white">
            Edit Information
          </h2>
          <button @click="close" class="btn btn-ghost btn-circle" aria-label="Close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="white"
              class="size-4 md:size-5 lg:size-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Main Content -->
        <div class="flex-1 overflow-y-auto flex flex-col items-start justify-start gap-6">
            <p>Main Content</p>
        </div>

        <!-- Footer -->
        <div class="sticky bottom-0 z-10 w-full flex justify-between items-center py-5">
            <button @click="close" class="btn btn-ghost btn-sm tooltip tooltip-right" data-tip="Close">
                Close
            </button>
            <button @click="saveInformation" class="btn btn-primary btn-sm tooltip tooltip-right" data-tip="Save">
                Save
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';

const informationStore = useInformationStore();
const config = useAppConfig();
const isSaving = ref(false);

const close = () => {
  informationStore.closeInformationManually();
};

</script>

<style scoped lang="scss">
.drawer-side {
  transition: all 0.7s ease-in-out;
}

.menu {
  transition: transform 0.7s ease-in-out;
}

.shadow-t {
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.transition-text {
  transition: all 0.5s ease-in-out;
}

</style>