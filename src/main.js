import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

// import ui libs
import 'flowbite'
import './assets/main.css'

// initialize axios
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:5000'
// intercept all 401 responses and redirect to login
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      router.push('/logout')
    }
    return Promise.reject(error)
  }
)

// initialize state store
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
