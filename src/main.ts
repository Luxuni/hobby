import {createApp} from 'vue';
import './assets/style'
import App from './App.vue'
import router from './router'
import "animate.css"
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(router)
app.mount('#app')
