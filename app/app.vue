<template>
  <html data-theme="light">
    <NuxtLayout :name="layout">
     <NuxtPage />
   </NuxtLayout>
  </html>
</template>

<script setup>
const route = useRoute();
const layout = computed(() => {
if (route.path.startsWith('/login')) {
   return 'blank';
 }
 else if (route.path.startsWith('/callback')) {
   return 'blank';
 }
 return 'default';
});
</script>
