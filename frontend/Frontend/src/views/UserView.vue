<script setup>
    import { computed } from 'vue';
    import { useGetData } from '../composables/useGetData';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const { getData, datos } = useGetData();

    const customer = computed(() => {
        const token = localStorage.getItem('token');
        return token ? JSON.parse(atob(token.split('.')[1])) : null;
    });

    getData(`http://localhost:3005/api/v1/customers/${customer.value.sub}`)

    console.log(datos);
</script>
<template>
    <div v-if="datos">
        <h1>Hola {{ datos.name }}</h1>
        <p>Tu movil es: {{ datos.phone }}</p>
        <p>Tu dirección es: {{ datos.address }}</p>
    </div>
</template>