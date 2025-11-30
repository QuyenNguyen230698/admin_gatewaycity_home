<template>
    <div class="drawer drawer-end z-50">
        <input id="media_library" type="checkbox" class="drawer-toggle" />
        <div class="drawer-side">
            <label for="media_library" aria-label="close sidebar" class="drawer-overlay"></label>
            <div class="relative flex flex-col bg-base-200 text-base-content min-h-screen w-1/2 h-full ">
                <header class="sticky top-0 bg-white flex items-center justify-between py-2 px-6 overflow-hidden">
                    <h2 class="font-bold text-xl uppercase text-blue-500">Media Library</h2>
                    <label  for="media_library" class="btn btn-lg btn-circle btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </label>
                </header>
                <main class="flex-1 overflow-y-auto">
                Content Upload
                </main>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.drawer-overlay {
    cursor: default !important;
}
</style>