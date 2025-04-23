<template>
    <div class="steps-container">
      <div class="step_one">
        <picture>
          <source srcset="../assets/images/step1Image.webp" type="image/webp" width="100%" height="auto">
          <img src="../assets/images/step1Image.jpg" alt="cameras" width="100%" height="auto">
        </picture>
        <h3>Step 1: Browse our</h3>
        <p>Find your dream camera or explore by category.</p>
      </div>
      <div class="step_two">
        <picture>
          <source srcset="../assets/images/step2Image.webp" type="image/webp" width="100%" height="auto">
          <img src="../assets/images/step2Image.jpg" alt="cart" width="100%" height="auto">
        </picture>
        <h3>Step 2: View</h3>
        <p>Choose your favorite camera. Capture memories with a touch of nostalgia.</p>
      </div>
      <div class="step_three">
        <picture>
          <source srcset="../assets/images/step3Images.webp" type="image/webp" width="100%" height="auto">
          <img src="../assets/images/step3Images.jpg" alt="women">
        </picture>
        <h3>Step 3: Add to cart</h3>
        <p>Complete your purchase. Get ready to embark on journey through time.</p>
      </div>
    </div>
</template>
  
<script>
  export default {
    name: 'Steps',
  };
</script>

<style scoped>
.steps-container {
  display: flex;
  gap: 1rem;
  margin-top: 4rem;
  flex-wrap: wrap;
}

.step_one, .step_two, .step_three {
  background-color: #f4f4f4;
  border-radius: 10px;
  text-align: center;
  width: 30%;
  margin-bottom: 2rem;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19); /* Sombra difuminada */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Animación para hover */
}

.step_one:hover, .step_two:hover, .step_three:hover {
  transform: translateY(-5px); /* Efecto de levantamiento */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 12px 24px rgba(0, 0, 0, 0.25); /* Sombra más intensa */
}

.step_one img, .step_two img, .step_three img {
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-bottom: 0.5rem;
  border-radius: 10px 10px 0 0; /* Bordes redondeados solo en la parte superior */
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
  