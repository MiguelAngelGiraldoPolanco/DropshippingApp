<template>
  <div class="cart-container">
    <div class="cart-items">
      <h1 class="title">Your Cart</h1>
      <div v-if="success" class="empty-cart">
        <h2>Pago Realizado Con exito</h2>
        <RouterLink to="/explore" class="register-button">Back to explore</RouterLink>
      </div>
      <div v-else-if="isEmpty" class="empty-cart">
        <h2>Cart is empty</h2>
        <p>Looks like you haven't added anything yet. Start shopping now!</p>
        <RouterLink to="/explore" class="register-button">Back to explore</RouterLink>
      </div>
      <div v-else class="table-wrapper">
        <table class="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>
              <img :src="item.image" alt="Product Image" style="width: 80px; height: auto; border-radius: 8px;">
            </td>
            <td>{{ item.name }}</td>
            <td>{{ formatPrice(item.price) }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ formatPrice(item.price * item.quantity) }}</td>
            <td>
              <button @click="removeItem(index)" class="delete-button">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  

    <div class="checkout-section">
      <h2>Payment</h2>
      <div v-if="!isSignedIn">
        <p>Please log in to proceed with the payment.</p>
      </div>
      <div v-else>
        <p><strong>Data:</strong></p>
        <form @submit.prevent="handlePayment">  
          <label for="adress">Adress</label>
          <input type="text" id="adress" v-model="adress" placeholder="Avenida Siempreviva 742" required>

          <label for="phone">Phone</label>
          <input type="number" id="phone" v-model="phone" placeholder="123 123 123" required>
            
          <p><strong>Total: {{ formatPrice(totalPrice) }}</strong></p>
                
          <button v-if="!isEmpty" @click="checkout" class="register-button">Checkout</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePostData } from '../composables/usePostData';
import { useAuth, useUser} from '@clerk/vue'
const { user , isLoaded } = useUser()


const { getToken, isSignedIn } = useAuth()

const cartStore = useCartStore();
const router = useRouter();

const { postData } = usePostData();

const puedeEnviar = computed(() => {
  return adress.value.trim() !== '' && phone.value.trim() !== '';
})

const phone = ref('');
const adress = ref('');
// const cvc = ref('');

const items = computed(() => cartStore.items);
const totalPrice = computed(() => cartStore.totalPrice);
const isEmpty = computed(() => cartStore.isEmpty);


const props = defineProps({
  success: {
    type: String,
    default: null,
  },
});

function formatPrice(price) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price);
}

function handlePayment() {
  alert('Payment processed!');
  cartStore.clearCart();  // Opcional: limpiar carrito tras pagar
  router.push('/');       // Opcional: volver al home
}

function removeItem(index) {
  cartStore.items.splice(index, 1);
}

const checkout = async () => {
  try {
    
  //    if (!puedeEnviar.value) {
  //   alert('Por favor, completa todos los campos requeridos antes de continuar.');
  //   return;
  // }


    if (!isLoaded.value) {
      alert('La información del usuario aún no está disponible. Intenta de nuevo en unos segundos.');
      return;
    }

    // Obtener el token primero
    const token = await getToken.value();

    if (!token) {
      alert('No estás autenticado');
      return;
    }
     // O usa otro campo si es necesario, dependiendo de la estructura del token
    const email = user.value?.primaryEmailAddress?.emailAddress ||
                  (user.value?.emailAddresses?.[0]?.emailAddress) ||
                  null;

    console.log('Email:', email);


    if (!email) {
      alert('No se pudo obtener el correo electrónico');
      return;
    }

    // Hacer la solicitud con el token
    const { response } = await postData(
      'http://localhost:3005/api/v1/payments/create-checkout-session',
      {
        items: items.value,
        email: email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Comprobar si la respuesta tiene la URL de la sesión de pago
    if (response.data.url) {
      window.location.href = response.data.url;
    } else {
      alert('Error al crear la sesión de pago');
    }
  } catch (error) {
    // Manejar errores
    alert('Error: ' + error.message);
  }
};



</script>

<style scoped>
/* Tus estilos de antes, copiados tal cual */

.cart-container {
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  gap: 2rem;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.checkout-section {
  flex: 1;
  display: flex;
  flex-direction: column; /* Para que los elementos se apilen (título, inputs, botón) */
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 2rem;
  height: 400px;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
  width: 25%; 
  border: 1px solid black;
  font-family: 'Georgia', serif;
  border-radius: 12px;
}

.cart-items {
  background-color: #fff;
  padding: 2rem;
  border: 1px solid black;
  border-radius: 12px;
  width: 45%;
  min-width: 300px;
  font-family: 'Georgia', serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.table-wrapper {
  width: 100%;
  overflow-x: auto; /* Hace que en móviles puedas hacer scroll horizontal */
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px; /* Opcional: asegura que no se encoja demasiado */
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
  text-align: center;
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

.delete-button {
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: red;
}
</style>
