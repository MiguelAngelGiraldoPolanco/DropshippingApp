<template>
    <div class="cart-container">
      <div class="cart-items">
        <h1 class="title">Your Cart</h1>
        <div v-if="isEmpty" class="empty-cart">
          <h2>Cart is empty</h2>
          <p>Looks like you haven't added anything yet. Start shopping now!</p>
          <RouterLink to="/explore" class="register-button">Back to explore</RouterLink>
        </div>
        <table v-else class="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price (€)</th>
              <th>Qty</th>
              <th>Total (€)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.price * item.quantity }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="checkout-section">
        <h2>Payment</h2>
        <div v-if="!isAuthenticated">
          <p>Please log in to proceed with the payment.</p>
          <button @click="goToLogin" class="register-button">Login</button>
        </div>
        <div v-else>
          <p><strong>Total: €{{ totalPrice }}</strong></p>
          <form @submit.prevent="handlePayment">
            <div class="form-group">
              <label for="cardNumber">Card Number</label>
              <input type="text" id="cardNumber" v-model="cardNumber" required />
            </div>
            <div class="form-group">
              <label for="expiry">Expiry Date</label>
              <input type="text" id="expiry" placeholder="MM/YY" v-model="expiry" required />
            </div>
            <div class="form-group">
              <label for="cvc">CVC</label>
              <input type="text" id="cvc" v-model="cvc" required />
            </div>
            <button type="submit" class="register-button">Pay Now</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
<script>
  import { useCartStore } from '@/stores/cart';
  import { mapState } from 'pinia';

  export default {
    name: 'CartView',
    data() {
      return {
        cardNumber: '',
        expiry: '',
        cvc: ''
      };
    },
    computed: {
      ...mapState(useCartStore, ['items', 'totalPrice', 'isEmpty']),
      isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
      }
    },
    methods: {
      handlePayment() {
        alert('Payment processed!');
        // Aquí puedes vaciar el carrito o redirigir
      },
      goToLogin() {
        this.$router.push('/login');
      }
    }
  };
</script>
  
  <style scoped>
  .cart-container {
    display: flex;
    justify-content: space-between;
    padding: 2rem;
    gap: 2rem;
    margin-top: 3rem;
    flex-wrap: wrap;
  }
  
  .cart-items, .checkout-section {
    background-color: #fff;
    padding: 2rem;
    border: 1px solid black;
    border-radius: 12px;
    width: 45%;
    min-width: 300px;
    font-family: 'Georgia', serif;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: black;
  }
  
  .cart-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .cart-table th, .cart-table td {
    padding: 0.75rem;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }
  
  .empty-cart {
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  input {
    padding: 0.5rem;
    border: 1px solid black;
    border-radius: 6px;
    width: 100%;
    font-family: inherit;
  }
  
  .register-button {
    background-color: black;
    color: white;
    padding: 0.8rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
    text-decoration: none;
    margin-top: 0.8rem;
  }
  
  .register-button:hover {
    background-color: grey;
  }
  </style>
  