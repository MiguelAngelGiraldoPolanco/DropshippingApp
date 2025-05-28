<template>
    <SignedOut>
      <SignInButton />
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
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
  
      <RouterLink to="/register" class="nav-link">Register</RouterLink>
    </div>
</template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useClerk } from '@clerk/vue';
  import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/vue'
  
  const email = ref('');
  const password = ref('');
  const router = useRouter();
  const clerk = useClerk();
  
  const handleLogin = async () => {
    try {
      await clerk.signIn.create({
        identifier: email.value,
        password: password.value,
      });
  
      await clerk.setActive({
        session: clerk.session?.id,
      });
  
      const user = await clerk.user;
  
      alert(`Bienvenido, ${user.firstName || user.emailAddresses[0].emailAddress}`);
      router.push('/');
    } catch (err) {
      console.error('Login failed:', err);
      alert('Credenciales incorrectas o error en Clerk');
    }
  };
  </script>
  
  <style scoped>
  /* mismo estilo que tu login original */
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
  