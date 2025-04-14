<script setup>
    import { RouterLink,useRoute } from "vue-router"; 
    // import { useFavoritoStore } from '@/stores/favoritos';
    import { useGetData } from '../composables/useGetData';
    
    // const useFavorito = useFavoritoStore();
    // const { anyadir } = useFavorito;
    
    const route = useRoute();
    const { getData, datos } = useGetData(); //Datos devueltos por el composable

    getData(`https://api.coingecko.com/api/v3/coins/${route.params.id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`)
   
    console.log(datos);

</script>

<template>
    <!-- <div v-if="datos">
        <h1>{{ datos.id }}</h1>
        <p>Nombre: {{ datos.name }}</p>
        <p>Descripcion: {{ datos.description?.en }}</p>
        <img :src="datos.image?.large">
        <p>Valor Actual: USD {{ datos.market_data?.ath?.usd }}</p>
        <button @click="anyadir(datos)">
            Añadir a Favoritos
        </button>
    </div>        -->
    <h1>explore</h1>
</template>
