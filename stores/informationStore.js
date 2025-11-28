import { defineStore } from 'pinia';

export const useInformationStore = defineStore('information', {
  state: () => ({
    isOpen: false,
    information : null,
  }),

  getters: {
    isInformationOpen: (state) => state.isOpen,
    getInformation: (state) => state.information,
  },

  actions: {
    setIsOpen(value) {
      this.isOpen = value;
    },
    setInformation(value) {
      this.information = value;
    },
    reset(){
      this.information = null;
    },
    closeInformationManually(){
      this.isOpen = false;
      this.information = null;
    }
  },
});