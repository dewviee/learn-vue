import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/Home/Home.vue'
import AboutPage from '@/pages/About/About.vue'
import Login from '@/pages/Login/Login.vue'

export const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/login', component: Login, public: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
