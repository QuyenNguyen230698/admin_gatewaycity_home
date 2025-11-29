import { defineStore } from 'pinia';

export const useEventStore = defineStore('event', {
  state: () => ({
    isOpen: false,
    event : null,
  }),

  getters: {
    isEventOpen: (state) => state.isOpen,
    getEvent: (state) => state.event,
  },

  actions: {
    setIsOpen(value) {
      this.isOpen = value;
    },
    setEvent(value) {
      this.event = value;
    },
    reset(){
      this.event = null;
    },
    closeEventManually(){
      this.isOpen = false;
      this.event = null;
    }
  },
});