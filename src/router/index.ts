import { createRouter, createWebHistory } from 'vue-router';
const Login = () => import('@/pages/Login.vue');
const Home = () => import('@/pages/Home/index.vue');

const routes = [
  {
    path: '/',
    redirect: { name: 'login' },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router