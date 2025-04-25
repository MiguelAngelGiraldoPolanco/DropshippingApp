<script setup>
import { useRoute } from "vue-router"; 
import { useGetData } from '../composables/useGetData';


const { getData, datos } = useGetData();
const route = useRoute();

getData(`http://localhost:3005/api/v1/categories`);
console.log(datos);

</script>

<template>
    <div class="categories-wrapper">
        <div class="section-title">
            <h1>Categories</h1>
        </div>
    <div class="steps-container" v-if="datos">
      <div v-for= "dato in datos" :key="dato.id" class="step_one">
        <router-link :to="`/categories/${dato.id}`">   
            <img :src="dato.image" alt="camera" class="product-image" />
        </router-link> 
        <h3>{{ dato.name }}</h3>
      </div>
    </div>
</div>
</template>
  

<style scoped>
.categories-wrapper {
  width: 100%;
}

.steps-container {
    display: flex;
    gap: 1rem;
    margin-top: 4rem;
    flex-wrap: wrap;
    margin-bottom: 10rem;
}

.section-title {
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.section-title h1 {
  font-size: 2rem;
  font-weight: bold;
  color: black;
}

.step_one, .step_two, .step_three {
  background-color: #f4f4f4;
  border-radius: 10px;
  text-align: center;
  width: 18.8%;
  margin-bottom: 1rem;
  padding: 0.1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19); /* Sombra difuminada */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Animación para hover */
}


.step_one:hover, .step_two:hover, .step_three:hover {
  transform: translateY(-5px); /* Efecto de levantamiento */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 12px 24px rgba(0, 0, 0, 0.25); /* Sombra más intensa */
}

.step_one img {
  width: 100%;
  height: 200px; /* Altura fija para uniformidad */
  object-fit: cover;
  object-position: center;
  margin-bottom: 0.5rem;
  border-radius: 10px 10px 0 0;
}

h3 {
  font-family: 'Times New Roman', Times, serif;
  font-weight: bold;
  font-size: 1.5rem;
  color: black;
}

p {
  font-family: 'Times New Roman', Times, serif;
  font-size: 1rem;
  color: black;
}

@media (max-width: 768px) {
  .steps-container {
    flex-direction: column;
    align-items: center;
  }

  .step_one, .step_two, .step_three {
    width: 80%;
    margin-bottom: 1rem;
  }
}
</style>
  