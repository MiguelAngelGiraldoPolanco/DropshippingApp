<template>
  <div class="add-button">
    <button @click="addItemToCart">Add</button>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart.js';
import { defineProps } from 'vue';

// Recibir la prop "product"
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

// Acceder al store del carrito
const cart = useCartStore();

// Función para agregar al carrito
function addItemToCart() {
  cart.addItem(props.product);
  console.log('Item added to cart:', props.product);
}
</script>

<style scoped>
.add-button button {
  margin-top: 0.8rem;
  padding: 0.6rem 1.2rem;
  border: none;
  background-color: #000;
  color: white;
  font-size: 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-button button:hover {
  background-color: #333;
}
</style>
