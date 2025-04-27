<template>
    <div class="add-button">
      <button @click="addItemToCart">Add</button>
    </div>
  </template>
  
  <script>
  import { useCartStore } from '@/stores/cart.js';
  
  export default {
    name: 'CartButton',
    props: {
      product: {
        type: Object,
        required: true
      }
    },
    setup(props) {
      const cart = useCartStore();
  
      function addItemToCart() {
        cart.addItem(props.product);
        console.log('Item added to cart:', props.product);
      }
  
      return {
        addItemToCart
      };
    }
  };
  </script>
  
  <style scoped>
  .add-button button{
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
  