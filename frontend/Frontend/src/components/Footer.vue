<template>
    <footer>
      <p>&copy; 2023 Vintage Collection. All rights reserved.</p>
      <p>Follow us on social media for the latest updates.</p>
      <div class="social-icons">
        <Instagram />
        <Facebook />
        <X/>
        <Linkedin />
        <router-link to="/privacy-policy" >Privacy Policy</router-link>
      </div>
      
    </footer>
  </template>
  
  <script>
    import Facebook from './icons/Facebook.vue';
    import Instagram from './icons/Instagram.vue';
    import X from './icons/X.vue';
    import Linkedin from './icons/Linkedin.vue';

    
    export default {
      name: 'Footer',
      components: {
        Instagram,
        Facebook,
        X,
        Linkedin,
      },
    };
  </script>
  
  <style scoped>
  footer {
    text-align: center;
    background-color: #f4f4f4;
    padding: 1rem;
    margin-top: 2rem;
    clear: both;
  }
  .social-icons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin: 1rem 0;
}

.social-icons :deep(svg) {
  font-size: 2rem; /* Tamaño más grande */
  color: black; /* Iconos en negro */
  transition: transform 0.2s ease;
}

.social-icons :deep(svg):hover {
  transform: scale(1.2); /* Efecto de zoom al pasar el mouse */
}
  </style>
  