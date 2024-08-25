import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/Home/Home.vue'
import AboutPage from '@/pages/About/About.vue'
import Login from '@/pages/Auth/Login/Login.vue'
import { setupAuthGuard } from './guards/auth.guard'

const routes: TRoute[] = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/login', component: Login, public: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

setupAuthGuard(router)

export default router
