import { createApp } from 'vue';
import './assets/style'
import App from './App.vue'
import router from './router'
import "animate.css"
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
