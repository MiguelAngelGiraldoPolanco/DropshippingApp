<script setup>
import { onMounted } from 'vue'
const CANDLY_URL_APP = import.meta.env.VITE_CALENDLY_URL

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://assets.calendly.com/assets/external/widget.js'
  script.async = true
  document.head.appendChild(script)

  script.onload = () => {
    window.Calendly.initInlineWidget({
      url: CANDLY_URL_APP,
      parentElement: document.getElementById('calendly-widget'),
      prefill: {},
      utm: {}
    })
  }
})
</script>

<template>
    <h1>Agendar una cita con el fotógrafo</h1>
    
  <div id="calendly-widget" style="min-width:320px;height:630px;"></div>
</template>
<style scoped>
.calendar-wrapper {
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  max-width: 800px;
  margin: 0 auto;
}

.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.calendar-frame {
  min-width: 320px;
  height: 630px;
  border: 2px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
}
</style>