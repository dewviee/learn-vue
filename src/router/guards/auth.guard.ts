import type { TRoute } from '@/types/router.type'
import type { Router } from 'vue-router'

export function setupAuthGuard(router: Router, routes: TRoute[]) {
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
