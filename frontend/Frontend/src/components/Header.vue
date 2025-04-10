<template>
    <header>  
      <div class="wrapper">   
        <h1>VINTAGE COLLECTION</h1>     
        <nav>
          <button><RouterLink to="/" class="nav-link">Home</RouterLink></button>
          <button><RouterLink to="/" class="nav-link">Explore</RouterLink></button>
          <button><RouterLink to="/about" class="nav-link">Sign Up</RouterLink></button>
          <button><RouterLink to="/about" class="nav-link">Register</RouterLink></button>
        </nav>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: 'Header',
  };
  </script>
  
  <style scoped>
  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    flex-wrap: wrap;
  }
  
  h1 {
    font-family: 'Times New Roman', Times, serif;
    font-weight: bold;
    color: black;
    margin: 0;
    font-size: 1.8rem;
  }
  
  nav {
    display: flex;
    gap: 0.8rem;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  
  button {
    font-family: 'Times New Roman', Times, serif;
    background-color: black;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-weight: bold;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #333;
  }
  
  .nav-link {
    color: white;
    text-decoration: none;
  }
  
  .nav-link:hover {
    text-decoration: none;
  }
  </style>
  