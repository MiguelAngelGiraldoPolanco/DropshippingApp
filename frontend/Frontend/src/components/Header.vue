<template>
  <header>
    <div class="wrapper">
      <div class="logo">
        <Camera />
        <h1>VINTAGE COLLECTION</h1>
      </div>
      <button class="menu-toggle" @click="toggleMenu">☰</button>
      <nav :class="{ open: isMenuOpen.value }">
        <RouterLink to="/explore" class="nav-link">Explore</RouterLink>

        <div v-if="!auth.isAuthenticated" class="nav-link">
          <RouterLink to="/login" class="nav-link">Login</RouterLink>
        </div>

        <RouterLink v-if="auth.isAuthenticated" to="/dashboard" class="nav-link">Dashboard</RouterLink>
        <button
          v-if="auth.isAuthenticated"
          class="nav-link"
          @click="logoutUser"
        >
          LogOut
        </button>

        <div class="logo">
          <Car />
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Camera from './icons/Camera.vue';
import Car from './icons/Car.vue';

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const auth = useAuthStore();
const router = useRouter();

const logoutUser = () => {
  auth.logout();
  router.push('/');
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  flex-wrap: wrap;
}

h1 {
  font-family: 'Times New Roman', Times, serif;
  font-weight: bold;
  color: black;
  margin: 0;
  font-size: 1.8rem;
}

nav {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.nav-link {
  background-color: black;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-family: 'Times New Roman', Times, serif;
  font-weight: bold;
  text-decoration: none;
}

.nav-link:hover {
  background-color: #333;
}

.menu-toggle {
  display: none;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
}

.logo {
  display: flex;
  justify-content: left;
  gap: 1rem;
  margin: 0.1rem 0;
}

.logo :deep(svg) {
  font-size: 2rem;
  color: black;
  transition: transform 0.2s ease;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  nav {
    display: none;
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
  }

  nav.open {
    display: flex;
  }

  .nav-link {
    width: 100%;
    text-align: center;
    margin-bottom: 0.5rem;
  }
}
</style>
