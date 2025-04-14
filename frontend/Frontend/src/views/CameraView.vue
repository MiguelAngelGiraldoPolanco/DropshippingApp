<script setup>

    import { useRoute } from 'vue-router'; 
    import { useGetData } from '@/composables/useGetData' 
    import Home from '@/components/Home.vue'
    import Paginacion from '@/components/Paginacion.vue'  
    import { useCounterStore } from "@/stores/counter";      
    import { storeToRefs } from "pinia"; 
    import { watchEffect } from 'vue';
    


    const useCounter = useCounterStore();  // Asignamos el Store 
    const { contador } = storeToRefs(useCounter); //referencia, prop comtutada 
    const { anyadir } = useCounter;
    
    const { getData, datos} = useGetData(); //Datos devueltos por el composable 

    const route = useRoute();
    contador.value = route.params.id;
// esta funcion de vue automaticamente carga la url si la variable cambia, (como la variable es reactiva esta funcion vuelve y hace la peticion a la api ) 
watchEffect(()=>{
    getData(`https://fakestoreapi.com/products/${contador.value}`); 
})

 console.log(datos) 
    
</script>
<template>
    <div v-if="datos">
        <h2>Articulo : {{ datos.title }}</h2>
        <h3>Descripcion: {{ datos.description }}</h3>
        <h3>Precio: {{ datos.price }}</h3>
        <img :src="datos.image" height="200" width="200">
        <br>
        <Home />
        <button @click="anyadir(datos)">Comprar</button>
        <Paginacion />
    </div>
    <h1 v-else>Articulo No Encontrado</h1>
</template>