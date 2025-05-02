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
    </form>
    <!-- Botón para registrar con Google -->
    <button @click="handleGoogleRegister" class="google-button">Registrar con Google</button>
    <RouterLink to="/register" class="nav-link">Register</RouterLink>
  </div>
</template>

<script>
import { usePostData } from '../composables/usePostData';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Asegúrate de importar useRouter

export default {
  name: 'LoginForm',
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter(); // Acceder a la instancia de router
    const auth = useAuthStore();

    const handleGoogleRegister = () => {
      router.push('/registro-google'); // Redirigir correctamente a la ruta de registro
    };

    const handleLogin = async () => {
      const { postData } = usePostData();
      try {
        const { response } = await postData('http://localhost:3005/api/v1/auth/login', {
          email: email.value,
          password: password.value,
        });

        console.log('Full response:', response);

        const { token, user } = response.data;

        auth.login(token, user);

        alert(`Bienvenido, ${user.name}`);
        router.push('/'); // Redirigir al inicio después de un login exitoso
      } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        alert('Credenciales incorrectas o error en servidor');
      }

      console.log('Email:', email.value);
      console.log('Password:', password.value);
    };

    return {
      email,
      password,
      handleGoogleRegister,
      handleLogin
    };
  }
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

.google-button {
  background-color: #fff;
  color: #444;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.5rem;
  margin-top: 1rem;
  font-weight: bold;
  cursor: pointer;
}

.google-button:hover {
  background-color: #eee;
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
