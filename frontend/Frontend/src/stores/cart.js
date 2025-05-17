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
      
      const quantityToAdd = product.quantity || 1; // Si no pasa quantity, asumimos 1
    
      if (existing) {
        existing.quantity += quantityToAdd;
      } else {
        this.items.push({ ...product, quantity: quantityToAdd });
      }
    },
    clearCart() {
      this.items = [];
    }
  }
});
