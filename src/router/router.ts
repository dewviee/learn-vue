import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/Home/Home.vue'
import AboutPage from '@/pages/About/About.vue'
import Login from '@/pages/Auth/Login/Login.vue'
import { setupAuthGuard } from './guards/auth.guard'
import Register from '@/pages/Auth/Register/Register.vue'
import type { TRoute } from '@/types/router.type'

const routes: TRoute[] = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/login', component: Login, public: true },
  { path: '/register', component: Register, public: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

setupAuthGuard(router, routes)

export default router
