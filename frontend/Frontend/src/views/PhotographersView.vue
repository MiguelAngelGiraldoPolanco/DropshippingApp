<script setup>
import { ref, onMounted } from 'vue';
import { useGetData } from '@/composables/useGetData';

const { getData, datos } = useGetData();

  getData(`http://localhost:3005/api/v1/photographers`);

console.log(datos);
</script>

<template>
  <div class="photographers-view">
    <h1>Lista de Fotógrafos</h1>

    <div v-if="!datos">No hay fotógrafos para mostrar.</div>

    <ul v-if="datos" class="photographer-list">
      <li
        v-for="photographer in datos"
        :key="photographer.id"
        class="photographer-card"
      >
        <img
          :src="photographer.imageUrl || 'https://via.placeholder.com/100'"
          alt="Foto de {{ photographer.customer?.name || 'Fotógrafo' }}"
          class="photographer-image"
        />
        <h2>{{ photographer.customer?.name }}</h2>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.photographers-view {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  font-family: 'Times New Roman', serif;
}

.photographer-list {
  list-style: none;
  padding: 0;
}

.photographer-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  gap: 15px;
  align-items: center;
  background: #fdfdfd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.photographer-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
