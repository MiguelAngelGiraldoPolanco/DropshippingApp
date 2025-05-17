<template>
    <div class="pay-view">
        <h1>Estamos Procesando su pago en breve le confirmaremos</h1>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h2>Resumen de la compra</h2>
                <ul>
                    <li v-for="(item, index) in items" :key="index">
                        {{ item.name }} - {{ formatPrice(item.price) }}
                        <button @click="removeItem(index)">Eliminar</button>
                    </li>
                </ul>
                <p>Total: {{ formatPrice(totalPrice) }}</p>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <h2>Detalles de pago</h2>
                <p>Nombre: {{ user.name }}</p>
                <p>Email: {{ user.email }}</p>
                <p>Dirección: {{ user.address }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>

</script>
<style>

</style>