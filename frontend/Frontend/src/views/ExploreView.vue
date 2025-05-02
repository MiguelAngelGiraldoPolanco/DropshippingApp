<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from "vue-router"; 
import { useGetData } from '@/composables/useGetData';
import AddButton from "../components/AddButton.vue";

const router = useRouter();
const route = useRoute();

const priceMin = ref(Number(route.query.price_min) || 25);
const priceMax = ref(Number(route.query.price_max) || 3200);

const { getData, datos } = useGetData();

// Reactivamente escucha cambios y actualiza productos + URL
watchEffect(() => {
  // Actualiza la URL sin recargar
  router.replace({ 
    query: { 
      ...route.query,
      price_min: priceMin.value,
      price_max: priceMax.value
    }
  });

  // Obtiene datos filtrados
  getData(`http://localhost:3005/api/v1/products?price_min=${priceMin.value}&price_max=${priceMax.value}`);
});
</script>

<template>
  <div class="explore-layout">
    <!-- Filtros a la izquierda -->
    <aside class="filtros">
      <div class="campo">
        <label>Precio Minimo: {{ priceMin }} €</label>
        <input 
          v-model="priceMin" 
          type="range" 
          min="25" 
          max="3200" 
          step="30"
        />
        <div class="range-values">
          <span>25 €</span>
          <span>3200 €</span>
        </div>
      </div>
      <div class="campo">
        <label>Precio Maximo: {{ priceMax }} €</label>
        <input 
          v-model="priceMax" 
          type="range" 
          min="25" 
          max="3200" 
          step="30"
        />
        <div class="range-values">
          <span>25 €</span>
          <span>3200 €</span>
        </div>
      </div>
    </aside>

    <!-- Productos a la derecha -->
    <section class="productos-col">
      <div class="products-container" v-if="datos">    
        <div v-for="dato in datos" :key="dato.id" class="product-card">      
          <router-link :to="`/camera/${dato.id}`">   
            <img :src="dato.image" alt="camera" class="product-image" />
          </router-link> 
          <h3>{{ dato.name }}</h3>
          <p class="price">Precio: {{ dato.price }} €</p>
          <AddButton :product="dato" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>

.explore-layout {
  display: flex;
  gap: 5rem;
  padding: 2rem;
  align-items: flex-start;
}

.filtros {
  background-color: #fdfdfd;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 50%;
  max-width: 200px;
  margin: 0 auto 2rem auto;
  font-family: 'Times New Roman', serif;
}

.campo {
  margin-bottom: 2rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.6rem;
  color: #333;
}

input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  background: #ccc;
  border-radius: 3px;
  outline: none;
  margin-top: 0.3rem;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: black;
  cursor: pointer;
  transition: background 0.3s ease;
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: black;
  cursor: pointer;
  transition: background 0.3s ease;
}

.range-values {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #555;
  margin-top: 0.3rem;
}

.filtrar-btn {
  margin-top: 0.8rem;
  padding: 0.6rem 1.2rem;
  border: none;
  background-color: #000;
  color: white;
  font-size: 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.filtrar-btn:hover {
  background-color: #333;
}

.productos-col {
  flex: 3;
}

.products-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: flex-start;
}

.product-card {
  background-color: #fdfdfd;
  border-radius: 12px;
  text-align: center;
  width: 280px;
  padding: 1rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.25);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.3rem;
  margin: 0.5rem 0;
  color: #222;
  font-family: 'Times New Roman', serif;
}

.price, .stock {
  font-size: 1rem;
  color: #555;
  margin: 0.25rem 0;
  font-family: 'Times New Roman', serif;
}

a {
  text-decoration: none;
}

@media (max-width: 768px) {
  .explore-layout {
    flex-direction: column;
  }

  .filtros-col,
  .productos-col {
    width: 100%;
  }

  .products-container {
    justify-content: center;
  }

  .product-card {
    width: 90%;
  }
}
</style>
