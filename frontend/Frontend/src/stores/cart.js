import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  getters: {
    totalPrice: (state) => state.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    isEmpty: (state) => state.items.length === 0
  },
  actions: {
    addItem(product) {
      const existing = this.items.find(item => item.name === product.name);
      if (existing) {
        existing.quantity += product.quantity;
      } else {
        this.items.push({ ...product });
      }
    },
    clearCart() {
      this.items = [];
    }
  }
});
