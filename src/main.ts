import { createApp } from 'vue';
import './assets/style/index.css'
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

//自定义指令监听元素宽高是否发生改变
app.directive('resize', {
  mounted(el, binding) {
    let width = '', height = '';
    function isReize() {
      if (document.defaultView) {
        const style = document.defaultView.getComputedStyle(el);
        if (width !== style.width || height !== style.height) {
          binding.value();  // 关键
        }
        width = style.width;
        height = style.height;
      }
    }
    el.__vueSetInterval__ = setInterval(isReize, 300);
  },
  unmounted(el) {
    clearInterval(el.__vueSetInterval__);
  }
})
app.directive('location', {
  mounted(el, binding) {
    let x = 0, y = 0;
    function isLocation() {
      if (el.getBoundingClientRect()) {
        const { x: ex, y: ey } = el.getBoundingClientRect();
        if (x !== ex || y !== ey) {
          binding.value();  // 关键
        }
        x = ex;
        y = ey;
      }
    }
    el.__vueSetInterval__ = setInterval(isLocation, 300);
  },
  unmounted(el) {
    clearInterval(el.__vueSetInterval__);
  }
})
