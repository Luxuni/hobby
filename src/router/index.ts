import { createRouter, createWebHistory } from 'vue-router';
const Login = () => import('@/pages/Login.vue');

const routes = [
  {
    path: '/',
    redirect: { name: 'login' },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router