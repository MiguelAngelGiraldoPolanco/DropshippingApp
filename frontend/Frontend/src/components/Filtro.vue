<script setup>
import { ref } from 'vue';
import { useGetData } from '../composables/useGetData';

const { getData, datos: categoriasData } = useGetData();
getData(`http://localhost:3005/api/v1/categories`);

const categoriaSeleccionada = ref('');
const precioMax = ref(3500);
const anioFabricacion = ref(2007);

defineEmits(['onFiltrar']);
</script>

<template>
  <div class="filtros">
    <h3>Filtros</h3>

    <!-- Categorías -->
    <div class="campo">
      <label>Categorías:</label>
      <div class="radio-group">
        <label v-for="categoria in categoriasData" :key="categoria.id" class="radio-item">
          <input 
            type="radio" 
            name="categoria" 
            :value="categoria.name" 
            v-model="categoriaSeleccionada"
          />
          {{ categoria.name }}
        </label>
      </div>
    </div>

    <!-- Precio con slider -->
    <div class="campo">
      <label>Precio máximo: {{ precioMax }} €</label>
      <input 
        v-model="precioMax" 
        type="range" 
        min="25" 
        max="3500" 
        step="10"
      />
      <div class="range-values">
        <span>25 €</span>
        <span>3500 €</span>
      </div>
    </div>

    <!-- Año con slider -->
    <div class="campo">
      <label>Año de fabricación: {{ anioFabricacion }}</label>
      <input 
        v-model="anioFabricacion" 
        type="range" 
        min="1940" 
        max="2007" 
        step="1"
      />
      <div class="range-values">
        <span>1940</span>
        <span>2007</span>
      </div>
    </div>

    <button 
      class="filtrar-btn" 
      @click="$emit('onFiltrar', { categoria: categoriaSeleccionada, precioMax, anioFabricacion })"
    >
      Filtrar
    </button>
  </div>
</template>

<style scoped>
.filtros {
  background-color: #fdfdfd;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 500px;
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

.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: normal;
  cursor: pointer;
}

input[type="radio"] {
  accent-color: black;
  cursor: pointer;
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
</style>
