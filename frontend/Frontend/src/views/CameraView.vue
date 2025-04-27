<script setup>
import { useRoute } from 'vue-router'; 
import { useGetData } from '@/composables/useGetData'; 
import { watchEffect } from 'vue';  
import AddButton from '../components/AddButton.vue';

const { getData, datos } = useGetData();
const route = useRoute(); 

watchEffect(() => {
  const id = route.params.id;
  if (id) {
    getData(`http://localhost:3005/api/v1/products/${id}`); 
  }
});

console.log(datos);
</script>

<template>
  <div v-if="datos" class="product-detail-container">
    <!-- Imagen a la izquierda -->
    <div class="product-image-box">
      <img :src="datos.image" alt="camera" class="product-image" />
    </div>

    <!-- Info del producto en el centro -->
    <div class="product-info">
      <h2 class="product-name">{{ datos.name }}</h2>
      <p class="product-description">{{ datos.description }}</p>
      <p class="product-price">Precio: <strong>{{ datos.price }} €</strong></p>
      <p class="product-estado">Estado: {{ datos.estado }}</p>
      <p class="product-fabricacion">Año de fabricación: {{ datos.fabricacion }}</p>
      <p class="product-stock">Stock disponible: {{ datos.stock }}</p>
      <p class="product-marca">Marca: {{ datos.marca }}</p>
      <p class="product-modelo">Modelo: {{ datos.modelo }}</p>
      <AddButton :product="datos" />
    </div>

    <!-- Espacio para componente futuro (agregar al carrito) -->
    <div class="product-action-box">
      <!-- Aquí luego insertas tu componente del carrito -->
      <p style="text-align:center; color:gray;">[Espacio para botón de añadir al carrito]</p>
    </div>
  </div>

  <h1 v-else>Artículo No Encontrado</h1>
</template>

<style scoped>
.product-detail-container {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.product-image-box {
  flex: 1;
  min-width: 250px;
  max-width: 400px;
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.product-info {
  flex: 2;
  min-width: 300px;
  max-width: 600px;
  font-family: 'Times New Roman', Times, serif;
  color: #222;
}

.product-info h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.product-info p {
  font-size: 1.1rem;
  margin: 0.3rem 0;
}

.product-action-box {
  flex: 1;
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  border-left: 2px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  min-height: 300px;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.05);
}

@media (max-width: 768px) {
  .product-detail-container {
    flex-direction: column;
    align-items: center;
  }

  .product-action-box {
    width: 100%;
    border-left: none;
    border-top: 2px solid #ddd;
  }
}
</style>
