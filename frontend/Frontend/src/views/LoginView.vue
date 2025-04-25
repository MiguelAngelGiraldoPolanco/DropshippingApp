<template>
    <div class="login-container">
      <h2 class="title">Login</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" class="login-button">Log In</button>
        <RouterLink to="/register" class="nav-link">Register</RouterLink>
      </form>
    </div>
  </template>
  
  <script>
import { usePostData } from '../composables/usePostData';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      const { postData } = usePostData();
      try {
        const { response } = await postData('http://localhost:3005/api/v1/auth/login', {
          email: this.email,
          password: this.password,
        });

        console.log('Full response:', response );

        const { token, user } = response.data;
        
        auth.login(token,user);

        alert(`Bienvenido, ${user.name}`);
        this.$router.push('/');
      } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        alert('Credenciales incorrectas o error en servidor');
      }

      console.log('Email:', this.email);
      console.log('Password:', this.password);
    },
  },
};
</script>
  
  <style scoped>
  .login-container {
    width: 300px;
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
  
  .login-form {
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
  
  .login-button {
    background-color: black;
    color: white;
    padding: 0.6rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  
  .login-button:hover {
    background-color: grey;
  }
  </style>
  