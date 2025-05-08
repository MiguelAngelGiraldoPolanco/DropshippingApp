<template>
  <div class="register-container">
    <h2 class="title">Register</h2>
    <form @submit.prevent="handleRegister" class="register-form">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" v-model="firstName" required />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" v-model="lastName" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required />
      </div>
      <div class="form-group">
        <label for="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          v-model="phone"
          required
          :class="{ invalid: phoneError }"
          pattern="^(\+34)?[0-9]{9}$"
          @input="formatPhone"
        />
        <span v-if="phoneError" class="error-message">Phone must be +34 followed by 9 digits.</span>
      </div>
      <div class="form-group">
        <label for="adress">Adress</label>
        <input type="text" id="adress" v-model="adress" required />
      </div>
      <button type="submit" class="register-button">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePostData } from '../composables/usePostData';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const phone = ref('');
const adress = ref('');
const phoneError = ref(false);

const router = useRouter();
const { postData } = usePostData();

const formatPhone = (e) => {
  phone.value = phone.value.replace(/\s+/g, '').replace(/[^0-9+]/g, '');

  if (!phone.value.startsWith('+34')) {
    phone.value = '+34' + phone.value.replace(/^(\+34)/, '');
  }

  const phoneDigits = phone.value.replace(/\D/g, '');
  phoneError.value = phoneDigits.length !== 12;
  e.target.setCustomValidity(phoneError.value ? 'Phone must be +34 followed by 9 digits.' : '');
};

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!');
    return;
  }

  if (!firstName.value || !lastName.value || !email.value || !password.value || !phone.value || !adress.value) {
    alert('Please fill in all fields!');
    return;
  }

  try {
    const serverResponse = await postData('http://localhost:3005/api/v1/customers', {
      name: firstName.value,
      lastName: lastName.value,
      phone: phone.value,
      address: adress.value,
      user: {
        email: email.value,
        password: password.value,
      },
    });
    console.log('Registro exitoso!', serverResponse);
    router.push('/'); // Redirigir a la página de inicio de sesión
  } catch (error) {
    console.log('Error en el registro:', error.message);
    alert(error.message);
  }
};
</script>

<style scoped>
.register-container {
  width: 350px;
  margin: 5rem auto;
  padding: 2rem;
  background-color: white;
  border: 1px solid black;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Georgia', serif;
}

.title {
  text-align: center;
  margin-bottom: 1.5rem;
  color: black;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.3rem;
  font-weight: bold;
  color: black;
}

input {
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 6px;
  font-family: inherit;
}

.register-button {
  background-color: black;
  color: white;
  padding: 0.6rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.register-button:hover {
  background-color: grey;
}

.error-message {
  color: red;
  font-size: 0.8rem;
}
</style>
