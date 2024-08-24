import type { Router } from 'vue-router'
import { routes } from '../router'

export function setupAuthGuard(router: Router) {
  const publicRoutes = routes.filter((route) => route.public).map((route) => route.path)

  router.beforeEach((to, from, next) => {
    if (!publicRoutes.includes(to.path) && !isAuthenticated()) {
      next('/login')
    } else {
      next()
    }
  })
}

function isAuthenticated(): boolean {
  return !!localStorage.getItem('accessToken')
}
