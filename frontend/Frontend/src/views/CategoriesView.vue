<script setup>
import { useRoute } from "vue-router"; 
import { useGetData } from '../composables/useGetData';
import AddButton from "../components/AddButton.vue";

const route = useRoute();
const { getData, datos } = useGetData();

const cagtegoryId = route.params.id;
console.log(cagtegoryId);

getData(`http://localhost:3005/api/v1/categories/${cagtegoryId}/products`);
console.log(datos);

</script>

<template>
  <div class="explore-layout">
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

.filtros-col {
  flex: 1;
  max-width: 200px;
}

.productos-col {
  flex: 3;
}

.products-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
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
