<template>
  <div class="cart-container">
    <div class="cart-items">
      <h1 class="title">Photographers</h1>  
        <RouterLink to="/photographers" class="nav-link">
        <picture>
          <source srcset="../assets/images/photographers.webp" type="image/webp" />
          <img src="../assets/images/photographers.webp" alt="cameras" />
        </picture>
        </RouterLink>  
    </div>

    <div class="checkout-section">
      <h2>Cameras</h2>
      <RouterLink to="/explore" class="nav-link">
        <picture>
          <source srcset="../assets/images/cameras.webp" type="image/webp" />
          <img src="../assets/images/cameras.webp" alt="cameras" />
        </picture>
        </RouterLink>  
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.cart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  height: 100vh;
  padding: 0;
  box-sizing: border-box;
  
}

.cart-items,
.checkout-section {
  background-color: #f4f4f4;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2),
              0 6px 20px rgba(0, 0, 0, 0.19);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  font-family: 'Times New Roman', Times, serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 320px;
  min-width: 220px;
  max-width: 340px;
  text-align: center;
}

.cart-items:hover,
.checkout-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3),
              0 12px 24px rgba(0, 0, 0, 0.25);
}

.title,
.checkout-section h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: black;
  margin-bottom: 1rem;
  font-family: 'Times New Roman', Times, serif;
  letter-spacing: 1px;
}

.cart-items img,
.checkout-section img {
  width: 300px;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 0.5rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

@media (max-width: 900px) {
  .cart-container {
    flex-direction: column;
    align-items: center;
    height: auto;
    padding: 2rem 0;
  }
  .cart-items,
  .checkout-section {
    width: 90%;
    max-width: 340px;
    margin-bottom: 2rem;
  }
  .cart-items img,
  .checkout-section img {
    width: 140px;
    height: 140px;
  }
}
</style>
