<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useGetData } from '@/composables/useGetData';
import CalendlyWidget from '@/components/CalendlyWidget.vue';


const route = useRoute();
const { getData, datos } = useGetData();

const photographerId = route.params.id;
getData(`http://localhost:3005/api/v1/photographs/photographer/${photographerId}/photos`);

const selectedPhoto = ref(null);
const isModalOpen = ref(false);

function openModal(photo) {
  selectedPhoto.value = photo;
  isModalOpen.value = true;
}

function closeModal() {
  selectedPhoto.value = null;
  isModalOpen.value = false;
}

const showCalendly = ref(false);

</script>

<template>
  <div class="photographer-detail">
    <div class="photos-section" v-if="datos && datos.length">
      <h2>Fotografías</h2>
      <div class="photo-grid">
        <div
          v-for="photo in datos"
          :key="photo.id"
          class="photo-card"
          @click="openModal(photo)"
        >
          <img :src="photo.imageUrl" :alt="photo.title" class="photo-img" />
          <h3>{{ photo.title }}</h3>
          <p>{{ photo.description }}</p>
        </div>
      </div>
    </div>

    <div v-else-if="datos && !datos.length">
      <p>No hay fotografías registradas para este fotógrafo.</p>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">×</button>
        <img :src="selectedPhoto.imageUrl" :alt="selectedPhoto.title" class="modal-img" />
        <h3>{{ selectedPhoto.title }}</h3>
        <p>{{ selectedPhoto.description }}</p>
      </div>
    </div>
    <div>
 
  <CalendlyWidget />
</div>
  </div>
</template>

<style scoped>
.photographer-detail {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  font-family: 'Georgia', serif;
}

.photos-section {
  margin-top: 2rem;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.photo-card {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s;
  cursor: pointer;
}

.photo-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
}

.photo-card:hover {
  transform: scale(1.02);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 1rem;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 12px;
  max-width: 700px;
  width: 100%;
  max-height: 90%;
  overflow-y: auto;
  position: relative;
  text-align: center;
  animation: fadeIn 0.3s ease;
}

.modal-img {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
  margin-bottom: 15px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 26px;
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
}

/* Responsive media queries */
@media (max-width: 768px) {
  .photo-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }

  .modal-img {
    max-height: 300px;
  }

  .modal-content {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .photo-grid {
    grid-template-columns: 1fr;
  }

  .photo-card {
    padding: 10px;
  }

  .modal-content h3,
  .modal-content p {
    font-size: 1rem;
  }

  .close-btn {
    font-size: 22px;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
