<template>
    <div class="register-container">
      <h2>Registro con Google</h2>
      
      <button @click="signInWithGoogle">Iniciar con Google</button>
  
      <div v-if="user && !formVisible">
        <p>Bienvenido {{ user.name }} ({{ user.email }})</p>
        <button @click="formVisible = true">Completar registro</button>
      </div>
  
      <form v-if="formVisible" @submit.prevent="registerWithExtraFields">
        <input v-model="lastName" type="text" placeholder="Apellido" required />
        <input v-model="address" type="text" placeholder="Dirección" required />
        <input v-model="phone" type="tel" placeholder="Teléfono" required />
        <button type="submit">Enviar</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useGoogleAuth } from '@/composables/useGoogleAuth';
  import axios from 'axios';
  
  const { user, signInWithGoogle } = useGoogleAuth();
  const formVisible = ref(false);
  
  const lastName = ref('');
  const address = ref('');
  const phone = ref('');
  
  const registerWithExtraFields = async () => {
    if (!user.value) return;
  
    const payload = {
      name: user.value.name,
      email: user.value.email,
      lastName: lastName.value,
      address: address.value,
      phone: phone.value,
    };
  
    try {
      await axios.post('http://localhost:3005/api/v1/customers', payload);
      alert('Registro completado correctamente');
    } catch (error) {
      console.error('Error al registrar:', error.message);
      alert('Error al registrar usuario');
    }
  };
  </script>
  
  <style scoped>
  .register-container {
    width: 350px;
    margin: auto;
    padding: 2rem;
  }
  </style>
  