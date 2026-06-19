<template>
  <div class="h-screen w-screen overflow-hidden bg-black">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Root constraints for the Grok Universe
useHead({
  titleTemplate: (title) => title ? `${title} // Gateway Co Chien` : 'Gateway Co Chien Admin',
  bodyAttrs: {
    class: 'h-full overflow-hidden antialiased'
  }
})
</script>

<style>
/* Global high-performance transitions */
.page-enter-active, .page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
