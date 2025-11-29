<template>
    <!-- Information -->
    <div class="drawer drawer-end">
        <input id="btn-information" type="checkbox" class="drawer-toggle" v-model="informationStore.isOpen"
            @change="informationStore.setIsOpen($event.target.checked)" />
        <div class="drawer-content"></div>
        <NewsDrawerInformation @close="closeInformation" />
    </div>

    <!-- Event -->
    <div class="drawer drawer-end">
        <input id="btn-event" type="checkbox" class="drawer-toggle" v-model="eventStore.isOpen"
            @change="eventStore.setIsOpen($event.target.checked)" />
        <div class="drawer-content"></div>
        <EventsDrawerInformation @close="closeEvent" />
    </div>

</template>

<script setup>
const informationStore = useInformationStore();
const eventStore = useEventStore();
// Computed property để kiểm tra xem có drawer nào đang mở hay không
const isAnyDrawerOpen = computed(() => {
    return (
        informationStore.isOpen || eventStore.isOpen
    );
});
// Export biến cho component cha
defineExpose({
    isAnyDrawerOpen
});

const closeInformation = () => {
    informationStore.setIsOpen(false);
};
const closeEvent = () => {
    eventStore.setIsOpen(false);
};
onMounted(() => {

});
</script>

<style lang="scss" >
.drawer-custom-top .drawer-top>.drawer-toggle:checked~.drawer-side>*:not(.drawer-overlay) {
    transform: translateY(0%);
}

.drawer-custom-top .drawer-top>.drawer-toggle~.drawer-side>*:not(.drawer-overlay) {
    transform: translateY(-100%);
}

.drawer-custom-top .drawer-side>*:not(.drawer-overlay) {
    transform: translateY(-100%);
}


/* New center-to-full-page drawer styles  For image */
.drawer-custom-center .drawer-side > *:not(.drawer-overlay) {
    transform: scale(0.5);
    opacity: 0;
    transform-origin: center;
    transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.5);
    width: 100%;
    height: 100%;
}

.drawer-custom-center .drawer-toggle:checked ~ .drawer-side > *:not(.drawer-overlay) {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
}

/* Ensure overlay covers the entire screen */
.drawer-custom-center .drawer-overlay {
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
}

.drawer-custom-center .drawer-toggle:checked ~ .drawer-overlay {
    opacity: 1;
}
</style>
