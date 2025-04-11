<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  }
};
</script>

<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<style>
body {
  font-family: 'Georgia', serif; /* Fuente vintage */
  background-color: whitesmoke; /* Fondo beige */
  color: #333; /* Color del texto */
  margin: 0;
  padding: 0;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

footer {
  margin-top: auto;
  font-size: 1rem;
  text-align: center;
  padding: 1rem;
}
</style>
