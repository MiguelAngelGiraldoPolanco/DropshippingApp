import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { clerkPlugin } from '@clerk/vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faInstagram, faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faCameraRetro, faCartShopping } from '@fortawesome/free-solid-svg-icons';

library.add(faInstagram, faFacebook, faTwitter, faLinkedin, faCameraRetro, faCartShopping)

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

const app = createApp(App)
app.use(clerkPlugin, { publishableKey: PUBLISHABLE_KEY })
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
