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
          <label for="dob">Date of Birth</label>
          <input type="date" id="dob" v-model="dob" required />
        </div>
        <button type="submit" class="register-button">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RegisterForm',
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        dob: '',
      };
    },
    methods: {
      handleRegister() {
        if (this.password !== this.confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
        // Aquí podrías conectar con tu backend
        console.log('Registro:', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          dob: this.dob,
        });
        alert('Registration successful (mock)!');
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
  