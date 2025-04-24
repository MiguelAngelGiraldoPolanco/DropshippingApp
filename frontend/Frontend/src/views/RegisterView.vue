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
          <input type="adress" id="adress" v-model="adress" required />
        </div>
        <button type="submit" class="register-button">Register</button>
      </form>
    </div>
  </template>
  
  <script>
import { usePostData } from '../composables/usePostData';

export default {
  name: 'RegisterForm',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      adress: '',
      phoneError: false,  // <-- Aquí
      response: null,
    };
  },
  methods: {
    formatPhone(e) {
      this.phone = this.phone.replace(/\s+/g, '').replace(/[^0-9+]/g, '');

      if (!this.phone.startsWith('+34')) {
        this.phone = '+34' + this.phone.replace(/^(\+34)/, '');
      }

      const phoneDigits = this.phone.replace(/\D/g, '');

      // Actualizamos el error antes de usarlo
      const isValid = phoneDigits.length === 12; // +34 (3) + 9 dígitos

       // Disable form submission if the phone number is invalid
       if (!this.phoneError) {
        e.target.setCustomValidity('');
      } else {
        e.target.setCustomValidity('Phone must be +34 followed by 9 digits.');
      }
    },
    handlePhoneInvalid(e) {
      this.phoneError = true;
      e.target.setCustomValidity("El número debe empezar con +34 y tener 9 dígitos.");
    },
    async handleRegister() {
      
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      if (!this.firstName || !this.lastName || !this.email || !this.password || !this.phone || !this.adress) {
        alert('Please fill in all fields!');
        return;
      }

      const { postData, response, error } = usePostData();
      try{
        const serverResponse = await postData('http://localhost:3005/api/v1/customers', {
          name: this.firstName,
          lastName: this.lastName,
          phone: this.phone,
          address: this.adress,
          user: {
            email: this.email,
            password: this.password
          }
        });
        console.log('Registro exitoso!', serverResponse);
        this.$router.push('/'); // Redirigir a la página de inicio de sesión
      }catch (error) {
        console.log("Error en el registro:", error.message); // ✅ Este sí lo ves en pantalla
        alert(error.message); // o usa un modal, toast, etc.
      }
      
    },
  },
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
  </style>
  