import { createApp } from 'vue'
import './style.css'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import App from './app.vue'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
app.mount('#app')
