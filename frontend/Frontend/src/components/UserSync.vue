<template>
    <div v-if="isSignedIn && !syncDone">
      <!-- Opcional: puedes mostrar algo como "Sincronizando usuario..." -->
    </div>
  </template>
  
  <script setup>
  import { ref, watchEffect } from 'vue'
  import { useUser } from 'vue-clerk'
  import axios from 'axios'
  import { usePostData } from '../composables/usePostData';
  
  const { user, isSignedIn } = useUser()
  const syncDone = ref(false)
  const { postData } = usePostData();
  
  watchEffect(async () => {
    if (isSignedIn.value && user.value && !syncDone.value) {
        try {
            const serverResponse = await postData('http://localhost:3005/api/v1/customer', {
                name: user.value.firstName,
                lastName: user.value.lastName,
                user: {
                    email: user.value.emailAddresses[0].emailAddress,
                },
            });
            console.log('Registro exitoso!', serverResponse);
            router.push('/'); // Redirigir a la página de inicio de sesión
        } catch (error) {
            console.log('Error en el registro:', error.message);
            alert(error.message);
        }
      
    }
  })
  </script>
  