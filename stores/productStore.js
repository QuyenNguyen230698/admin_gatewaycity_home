import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', {
  state: () => ({
    isOpen: false,
    product : null,
  }),

  getters: {
    isProductOpen: (state) => state.isOpen,
    getProduct: (state) => state.product,
  },

  actions: {
    setIsOpen(value) {
      this.isOpen = value;
    },
    setProduct(value) {
      this.product = value;
    },
    reset(){
      this.product = null;
    },
    closeProductManually(){
      this.isOpen = false;
      this.product = null;
    }
  },
});