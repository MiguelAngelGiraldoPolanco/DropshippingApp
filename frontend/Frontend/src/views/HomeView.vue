<script setup>
import ImageContainer from '../components/ImageContainer.vue'
import Steps from '../components/Steps.vue'
import Categories from '../components/Categories.vue'

defineOptions({
  name: 'Home'
})
</script>

<template>
  <div>
    <ImageContainer />
    <Steps />
    <Categories />
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
