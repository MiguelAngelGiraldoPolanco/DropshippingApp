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

    <div v-if="datos" class="photographer-list">
      <div
        v-for="photographer in datos"
        :key="photographer.id"
        class="photographer-card"
      >
        <router-link :to="`/photographers/${photographer.id}`" class="photographer-link">
          <img
            :src="photographer.imageUrl || 'https://via.placeholder.com/100'"
            :alt="`Foto de ${photographer.customer?.name || 'Fotógrafo'}`"
            class="photographer-image"
          />
          <div class="photographer-info">
            <h2 class="photographer-name">{{ photographer.customer?.name }}</h2>
            <p class="photographer-bio">{{ photographer.bio || 'Biografía no disponible.' }}</p>

            <!-- Estrellas de calificación -->
            <div class="photographer-rating">
              <span v-for="n in 5" :key="n" class="star">★</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>


<style scoped>
.photographers-view {
  max-width: 900px;
  margin: auto;
  padding: 20px;
  font-family: 'Times New Roman', serif;
}

.photographer-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.photographer-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.photographer-card:hover {
  transform: translateY(-2px);
}

.photographer-link {
  display: flex;
  gap: 20px;
  padding: 20px;
  text-decoration: none;
  color: inherit;
}

.photographer-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.photographer-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.photographer-name {
  margin: 0;
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
}

.photographer-bio {
  margin: 8px 0;
  color: #666;
  font-size: 0.95rem;
}

.photographer-rating {
  margin-top: 5px;
}

.star {
  color: gold;
  font-size: 1.2rem;
}

/* Responsive */
@media (max-width: 600px) {
  .photographer-link {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .photographer-image {
    width: 90px;
    height: 90px;
  }

  .photographer-info {
    align-items: center;
  }

  .photographer-name {
    font-size: 1.2rem;
  }

  .photographer-bio {
    font-size: 0.9rem;
  }
}
</style>
