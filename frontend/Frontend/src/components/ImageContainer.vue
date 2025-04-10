<template>
    <div class="image-container">
      <img src="../assets/images/homeImages.jpg" alt="Vintage Camera">
      <h1 class="overlay-text">Discover your perfect vintage camera</h1>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ImageContainer',
  };
  </script>
  
  <style scoped>
  .image-container {
    position: relative;
    width: 100%;
    height: 80vh;
    overflow: hidden;
  }
  
  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .overlay-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Times New Roman', Times, serif;
    font-weight: bold;
    color: white;
    font-size: 2.5rem;
    text-align: center;
    z-index: 10;
  }
  </style>
  